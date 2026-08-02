/**
 * useCopyToClipboard 的复制链路自检 —— 从上线源码抽出 writeClipboard 实测。
 * 由 pretypecheck 调起（`yarn typecheck` 时自动跑）。
 * 单独跑：`node scripts/checkClipboardFallback.mjs`——不另设 yarn 脚本，
 * 免得让人以为这份自检需要手动维护。
 *
 * 守住四条曾经真出过问题的性质：
 *   1. 安全上下文（https）走 navigator.clipboard.writeText，**不**触发兜底，且解析为 true
 *   2. 非安全上下文（离线版 http://192.168.x.x）navigator.clipboard 为 undefined，
 *      必须走兜底且**不得抛异常**。旧缺陷：`navigator.clipboard.writeText(t).catch(...)`
 *      会同步抛 TypeError，catch 挂不上，异常冲出 React 事件处理器。
 *   3. 兜底失败时必须解析为 **false**。旧缺陷：结果被丢弃、setCopied(true) 无条件执行，
 *      剪贴板没变按钮却显示「已复制」，用户粘贴到上一次的内容。
 *   4. 非字符串入参不得抛异常（copy-text-to-clipboard 对非 string 直接 throw TypeError，
 *      而卡片可能缺 prompt/description）。
 *
 * 不验 execCommand 本身能否成功：那需要真实用户激活，自动化产生不了 ——
 * 这正是兜底交给 copy-text-to-clipboard 而不是手写的原因。
 */
import fs from "node:fs";
import assert from "node:assert";

const SRC = "src/hooks/useCopyToClipboard.ts";
const src = fs.readFileSync(SRC, "utf8");

assert.ok(/import copy from "copy-text-to-clipboard"/.test(src), `${SRC} 应从 copy-text-to-clipboard 引入兜底`);
assert.ok(/navigator\.clipboard\?\.writeText/.test(src), `${SRC} 必须用可选链判存在，否则非安全上下文会同步抛 TypeError`);

// writeClipboard 依赖同文件的 safeCopy，两个都要抽出来，否则 new Function 里会 ReferenceError。
// 抽不到就 assert 失败（而不是静默放行）——实现改名/重构时会立刻暴露。
function extract(name) {
  const start = src.indexOf(`function ${name}`);
  assert.ok(start > 0, `源码里找不到 ${name}，检查脚本已与实现脱节，请同步更新`);
  return (
    src
      .slice(start, src.indexOf("\n}", start) + 2)
      // 极简 TS 类型剥离：只够处理这两个函数的签名。剥不干净会 SyntaxError 而非静默放行，方向是安全的。
      .replace(/:\s*Promise<[^>]*>/g, "")
      .replace(/:\s*(string|boolean|number|void)\b/g, "")
  );
}
const code = `${extract("safeCopy")}\n${extract("writeClipboard")}`;

/** 用给定的 navigator/copy 桩跑一次 writeClipboard，返回 {兜底次数, 解析值, 是否抛异常}。 */
async function run(navigatorStub, copyResult, ...rest) {
  // 用 rest 而非默认参数：显式传入的 undefined 会被默认值顶掉，测不到「非字符串入参」
  const input = rest.length ? rest[0] : "PAYLOAD";
  let fallback = 0;
  let native = null;
  const fn = new Function("navigator", "copy", `${code}; return writeClipboard;`)(navigatorStub(t => (native = t)), () => {
    fallback++;
    return copyResult;
  });
  try {
    // 必须先 await 再读 fallback：写成对象字面量里 { fallback, resolved: await ... }
    // 会在 await 之前就把 fallback 求值成 0
    const resolved = await fn(input);
    return { fallback, resolved, threw: null, native };
  } catch (e) {
    return { fallback, resolved: undefined, threw: e.constructor.name, native };
  }
}

const secure = (spy) => ({ clipboard: { writeText: (t) => (spy(t), Promise.resolve()) } });
const rejecting = () => ({ clipboard: { writeText: () => Promise.reject(new Error("denied")) } });
const insecure = () => ({});

const cases = [
  ["安全上下文(https)", await run(secure, true), { fallback: 0, resolved: true, threw: null }],
  ["非安全上下文(http内网)", await run(insecure, true), { fallback: 1, resolved: true, threw: null }],
  ["兜底失败须报 false", await run(insecure, false), { fallback: 1, resolved: false, threw: null }],
  ["权限被拒/文档失焦", await run(rejecting, true), { fallback: 1, resolved: true, threw: null }],
  ["非字符串入参不抛", await run(insecure, true, undefined), { fallback: 0, resolved: false, threw: null }],
];

let fail = 0;
for (const [label, got, want] of cases) {
  const ok = got.fallback === want.fallback && got.resolved === want.resolved && got.threw === want.threw;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(22)} 兜底=${got.fallback} 解析=${got.resolved} 异常=${got.threw ?? "无"}`);
}

// 安全上下文必须把文本原样交给原生 API
const secureRun = await run(secure, true);
assert.strictEqual(secureRun.native, "PAYLOAD", "安全上下文下应把文本原样传给 navigator.clipboard.writeText");
console.log("PASS  文本原样传给 navigator.clipboard.writeText");

if (fail) {
  console.error(`\n${fail} 项不合格`);
  process.exit(1);
}
console.log("\n剪贴板链路全部合格");
