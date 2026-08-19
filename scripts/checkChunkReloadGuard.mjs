/**
 * chunk 失败兜底的自检 —— 从上线源码抽出 utils/chunkReloadGuard.ts、
 * clientModules/chunkReload.js、utils/lazyRetry.ts 实测（桩掉 window / sessionStorage /
 * React / 时钟；.ts 用 ts.transpileModule 剥类型，不再手写正则转译器）。
 * 由 pretypecheck 调起（`yarn typecheck` 时自动跑），也可单独 `node scripts/checkChunkReloadGuard.mjs`。
 *
 * 这些逻辑坏了都不会让构建变红，只会在线上变成"刷新死循环"或"该刷不刷"：
 *   1. 冷却窗口：连刷只生效一次；过期后重新允许（否则该 tab 余生没有兜底）
 *   2. sessionStorage 抛异常（Safari 无痕）不得冒出去
 *   3. **已挂载时一律不刷**，且必须动态读取挂载状态 —— 换成模块作用域快照会让门禁永远失效，
 *      复活「鼠标扫过链接、网络抖一下，用户正在看的页面被整页重载」的实测回归
 *   4. 未挂载（首屏 preload 挂了、React 永不渲染）时必须刷 —— 本模块唯一的存在理由；
 *      <link> 走 href、<script> 走 src、字符串 rejection reason 三条路都要认得
 *   5. lazyRetry：chunk 失败才重试；「最终失败」不得被 React.lazy 永久缓存 ——
 *      主体组件红框的 "Try again"、装饰组件的下一次交互，都必须真的重新发请求
 *   6. lazyWithRetry 最终 chunk 失败先尝试整页刷新（页面反正要被 ErrorBoundary 整页替换），
 *      刷新已发起则挂起不闪红框；lazyOptional 降级为空但必须 console.error（否则真 bug
 *      和广告拦截器不可区分）
 *   7. 裸用 React.lazy 直接拦下 —— 约定只写在 CLAUDE.md 里挡不住下一个新组件
 */
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import ts from "typescript";

const GUARD_SRC = "src/utils/chunkReloadGuard.ts";
const MODULE_SRC = "src/clientModules/chunkReload.js";
const LAZY_SRC = "src/utils/lazyRetry.ts";

/** .ts → 可 eval 的函数体：真转译器剥类型，再摘掉 import/export（依赖全部经参数注入） */
const toEvalBody = (file) =>
  ts
    .transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
    })
    .outputText.replace(/^import[^\n]*\n/gm, "")
    .replace(/^export\s+/gm, "");

const guardCode = toEvalBody(GUARD_SRC);
const lazyBody = toEvalBody(LAZY_SRC);
const moduleCode = fs.readFileSync(MODULE_SRC, "utf8").replace(/^import[^\n]*\n/gm, "");

// —— 结构断言 ——————————————————————————————————————————————
assert.ok(moduleCode.includes("docusaurusRoot"), `${MODULE_SRC} 必须靠 window.docusaurusRoot 判断是否已挂载`);
// 该全局是 Docusaurus 内部实现，不是公开 API。升级把它改名后 appMounted() 会永远 false，
// 门禁失效但一切照常变绿 —— 用安装版指纹钉死（同 genAntdCss 的思路）
assert.ok(
  fs.readFileSync(path.join("node_modules", "@docusaurus", "core", "lib", "client", "clientEntry.js"), "utf8").includes("window.docusaurusRoot"),
  "安装的 @docusaurus/core clientEntry 里已找不到 window.docusaurusRoot —— chunkReload.js 的挂载判据失效了，升级 Docusaurus 时需换判据"
);
// 复用共享判定即可，@site 别名或相对路径都行
assert.ok(
  /from "(\.\/|@site\/src\/utils\/)chunkReloadGuard"/.test(fs.readFileSync(LAZY_SRC, "utf8")),
  `${LAZY_SRC} 必须复用 chunkReloadGuard 的 isChunkError，别再写第二个正则`
);
// 裸 React.lazy 扫描（约定的机械执法）
for (const f of fs.readdirSync("src", { recursive: true })) {
  const rel = String(f).replace(/\\/g, "/");
  if (!/\.(ts|tsx)$/.test(rel) || rel === "utils/lazyRetry.ts") continue;
  assert.ok(
    !fs.readFileSync(path.join("src", rel), "utf8").includes("React.lazy("),
    `src/${rel} 裸用了 React.lazy —— 走 lazyWithRetry / lazyOptional（见 src/utils/lazyRetry.ts 头注）`
  );
}

// —— 运行环境桩 ——————————————————————————————————————————————
function makeEnv({ storageThrows = false, mounted = false } = {}) {
  let now = 1_000_000;
  let reloads = 0;
  const store = new Map();
  const listeners = { error: [], unhandledrejection: [] };

  const sessionStorage = {
    getItem: (k) => {
      if (storageThrows) throw new Error("SecurityError");
      return store.has(k) ? store.get(k) : null;
    },
    setItem: (k, v) => {
      if (storageThrows) throw new Error("SecurityError");
      store.set(k, v);
    },
  };
  const win = {
    location: { reload: () => (reloads += 1) },
    docusaurusRoot: mounted ? {} : undefined,
    addEventListener: (type, fn) => listeners[type]?.push(fn),
  };

  const guard = new Function(
    "sessionStorage",
    "window",
    "Date",
    `${guardCode}\nreturn { reloadOnce, isChunkError, isChunkErrorText };`
  )(sessionStorage, win, { now: () => now });

  new Function("ExecutionEnvironment", "isChunkError", "isChunkErrorText", "reloadOnce", "window", moduleCode)(
    { canUseDOM: true },
    guard.isChunkError,
    guard.isChunkErrorText,
    guard.reloadOnce,
    win
  );
  assert.strictEqual(listeners.error.length, 1, "应注册 error 监听");
  assert.strictEqual(listeners.unhandledrejection.length, 1, "应注册 unhandledrejection 监听");

  return {
    ...guard,
    reloadCount: () => reloads,
    advance: (ms) => (now += ms),
    setMounted: (v) => (win.docusaurusRoot = v ? {} : undefined),
    // script 只有 src、link 只有 href —— 照实模拟，才能测到 `t.src || t.href` 两条分支
    fireResourceError: (tagName, url) =>
      listeners.error.forEach((fn) => fn({ target: tagName === "SCRIPT" ? { tagName, src: url } : { tagName, href: url } })),
    fireRejection: (reason) => listeners.unhandledrejection.forEach((fn) => fn({ reason })),
  };
}

const CHUNK_URL = "https://x.test/assets/js/837.4ee58c2d.js";
const CHUNK_ERR = "Loading chunk 837 failed.\n(error: https://x.test/assets/js/837.4ee58c2d.js)";

// 1：冷却窗口
{
  const g = makeEnv();
  assert.strictEqual(g.reloadOnce(), true, "首次应真的刷新");
  assert.strictEqual(g.reloadOnce(), false, "冷却窗口内必须拒绝，否则发版当天会刷新死循环");
  assert.strictEqual(g.reloadCount(), 1, "冷却窗口内不得再刷");
  g.advance(20_001);
  assert.strictEqual(g.reloadOnce(), true, "冷却过期后必须重新允许，否则该 tab 之后永远没有兜底");
}

// 2：sessionStorage 不可用时不抛，且仍然刷新
{
  const g = makeEnv({ storageThrows: true });
  assert.strictEqual(g.reloadOnce(), true, "读不到冷却记录时应放行刷新");
}

// 3：已挂载 → 任何 chunk 失败都不刷；且挂载状态必须是事发时动态读取的
{
  const g = makeEnv({ mounted: true });
  g.fireResourceError("SCRIPT", CHUNK_URL);
  g.fireResourceError("LINK", CHUNK_URL);
  g.fireRejection(new Error(CHUNK_ERR));
  assert.strictEqual(g.reloadCount(), 0, "已挂载时刷新 = 鼠标扫过链接就把当前页面整页重载");

  const late = makeEnv({ mounted: false }); // 模块求值时未挂载……
  late.setMounted(true); // ……随后 React 挂上（真实时序：clientModules 先于 renderApp 执行）
  late.fireResourceError("SCRIPT", CHUNK_URL);
  assert.strictEqual(late.reloadCount(), 0, "挂载状态被模块作用域快照住了：门禁在生产上永远失效，hover 回归复活");
}

// 4：未挂载 → 必须刷；script/link/字符串 reason 三条路都要认得
{
  const viaScript = makeEnv({ mounted: false });
  viaScript.fireResourceError("SCRIPT", CHUNK_URL);
  assert.strictEqual(viaScript.reloadCount(), 1, "首屏 chunk 挂了必须刷，否则用户停在点不动的死 HTML 上");

  const viaLink = makeEnv({ mounted: false });
  viaLink.fireResourceError("LINK", CHUNK_URL);
  assert.strictEqual(viaLink.reloadCount(), 1, "<link rel=preload as=script> 走 href，删掉 `|| t.href` 必须变红");

  const viaRejection = makeEnv({ mounted: false });
  viaRejection.fireRejection(new Error(CHUNK_ERR));
  assert.strictEqual(viaRejection.reloadCount(), 1, "首屏 preload 的 rejection 同样要刷");

  const viaStringReason = makeEnv({ mounted: false });
  viaStringReason.fireRejection(CHUNK_ERR); // reason 可以是裸字符串，不总是 Error
  assert.strictEqual(viaStringReason.reloadCount(), 1, "字符串 reason 走 String(err) 分支，删掉它必须变红");
}

// 5：第三方资源失败 / 恶意 reason 不关我们的事
{
  const g = makeEnv({ mounted: false });
  g.fireResourceError("SCRIPT", "https://s.newzone.top/tracker.js");
  g.fireRejection(new Error("Network request failed"));
  g.fireRejection(Object.create(null)); // String() 会抛的 null-prototype reason：判定函数不得跟着抛
  assert.strictEqual(g.reloadCount(), 0, "站外脚本/无关 rejection 不得触发整页刷新");
}

// 6：lazyRetry —— 用桩 React 驱动真实现，覆盖可重置外壳的全部终态
{
  // setImmediate 是宏任务：先排空全部微任务再触发 —— 凡是会 settle 的 promise 一定抢先
  const drain = () => new Promise((r) => setImmediate(r));
  const isPending = (p) => Promise.race([p.then(() => false, () => false), drain().then(() => true)]);

  const makeLazyEnv = ({ reloadResult = true } = {}) => {
    const calls = { reload: 0, consoleError: 0 };
    const React = {
      lazy: (loader) => ({ __loader: loader }), // 每次调用产出新对象 —— 身份变化 = 外壳已重置
      createElement: (type, props) => ({ type, props }),
    };
    const guard = new Function("sessionStorage", "window", "Date", `${guardCode}\nreturn { isChunkError };`)(
      { getItem: () => null, setItem: () => {} },
      { location: { reload() {} } },
      Date
    );
    const api = new Function(
      "React",
      "isChunkError",
      "reloadOnce",
      "setTimeout",
      "console",
      `${lazyBody}\nreturn { lazyWithRetry, lazyOptional };`
    )(React, guard.isChunkError, () => (calls.reload++, reloadResult), (fn) => fn(), { error: () => calls.consoleError++ });
    return { ...api, calls };
  };
  const scenario = (results) => {
    let i = 0;
    return { factory: () => (results[i] === "ok" ? (i++, Promise.resolve({ default: "REAL" })) : Promise.reject(results[i++])) };
  };
  const chunkErr = new Error(CHUNK_ERR);
  const codeBug = new Error("Cannot read properties of undefined (reading 'x')");

  // a) 成功：一次请求，外壳复用同一实例
  {
    const env = makeLazyEnv();
    const sc = scenario(["ok"]);
    const Shell = env.lazyWithRetry(() => sc.factory());
    const inner = Shell({}).type;
    assert.deepStrictEqual(await inner.__loader(), { default: "REAL" });
    assert.strictEqual(Shell({}).type, inner, "成功后不得重建实例（会白白重新请求）");
  }
  // b) 抖动一次 → 重试成功
  {
    const env = makeLazyEnv();
    const sc = scenario([chunkErr, "ok"]);
    const Shell = env.lazyWithRetry(() => sc.factory());
    assert.deepStrictEqual(await Shell({}).type.__loader(), { default: "REAL" }, "抖动一次应重试成功——这是本工具存在的理由");
  }
  // c) 主体组件两次 chunk 失败 + 刷新成功发起：promise 挂起（不闪红框），外壳已重置
  {
    const env = makeLazyEnv({ reloadResult: true });
    const sc = scenario([chunkErr, chunkErr]);
    const Shell = env.lazyWithRetry(() => sc.factory());
    const inner = Shell({}).type;
    const p = inner.__loader();
    await drain();
    assert.strictEqual(env.calls.reload, 1, "主体组件最终 chunk 失败必须尝试整页刷新（自愈发版陈旧）");
    assert.strictEqual(await isPending(p), true, "刷新已在路上时要挂起，settle 会闪一下红框再跳走");
    assert.notStrictEqual(Shell({}).type, inner, "最终失败后外壳必须重置");
  }
  // d) 主体组件两次 chunk 失败 + 冷却内刷不动：抛原错误，且下一次渲染真的重新请求
  {
    const env = makeLazyEnv({ reloadResult: false });
    const sc = scenario([chunkErr, chunkErr, "ok"]);
    const Shell = env.lazyWithRetry(() => sc.factory());
    const inner = Shell({}).type;
    await assert.rejects(inner.__loader(), (e) => e === chunkErr, "冷却内要原样抛出，让红框显示真实错误");
    const fresh = Shell({}).type;
    assert.notStrictEqual(fresh, inner, "React.lazy 永久缓存 rejection——不重置的话 Try again 永远秒崩");
    assert.deepStrictEqual(await fresh.__loader(), { default: "REAL" }, "重置后的 Try again 必须真的重新发请求并能成功");
  }
  // e) 主体组件模块自身抛错：不重试、不刷新、缓存该失败（重试一个必抛的模块只会把真错误延后）
  {
    const env = makeLazyEnv();
    const sc = scenario([codeBug]);
    const Shell = env.lazyWithRetry(() => sc.factory());
    const inner = Shell({}).type;
    await assert.rejects(inner.__loader(), (e) => e === codeBug);
    assert.strictEqual(env.calls.reload, 0, "代码 bug 刷新也治不好，不得刷");
    assert.strictEqual(Shell({}).type, inner, "代码 bug 不重置：重渲染重试必抛的模块只会刷屏");
  }
  // f) 装饰组件两次 chunk 失败：降级为空 + console.error + 重置（网络恢复后下一次交互能加载）
  {
    const env = makeLazyEnv();
    const sc = scenario([chunkErr, chunkErr, "ok"]);
    const Shell = env.lazyOptional(() => sc.factory());
    const inner = Shell({}).type;
    const mod = await inner.__loader();
    assert.strictEqual(mod.default(), null, "装饰组件失败要渲染成空，不得把整页 crash 掉");
    assert.strictEqual(env.calls.consoleError, 1, "静默 null 和广告拦截器不可区分，必须 console.error");
    assert.strictEqual(env.calls.reload, 0, "装饰组件不得整页刷新（会冲掉用户正在写的评论）");
    const fresh = Shell({}).type;
    assert.notStrictEqual(fresh, inner, "chunk 失败后要重置，否则分享按钮这个会话里永远弹空 Popover");
    assert.deepStrictEqual(await fresh.__loader(), { default: "REAL" }, "网络恢复后的下一次交互必须能加载出来");
  }
  // g) 装饰组件模块自身抛错：降级为空 + console.error，但不重置（避免每次渲染刷屏）
  {
    const env = makeLazyEnv();
    const sc = scenario([codeBug]);
    const Shell = env.lazyOptional(() => sc.factory());
    const inner = Shell({}).type;
    assert.strictEqual((await inner.__loader()).default(), null);
    assert.strictEqual(env.calls.consoleError, 1);
    assert.strictEqual(Shell({}).type, inner, "代码 bug 不重置");
  }
}

console.log("✓ chunkReload 兜底自检通过");
