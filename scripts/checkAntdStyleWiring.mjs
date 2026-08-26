/**
 * antd 样式供给链路的自检 —— 由 pretypecheck 调起（`yarn typecheck` 时自动跑），
 * 也可单独 `node scripts/checkAntdStyleWiring.mjs`。
 *
 * 守的是一条「坏了完全没有信号」的不变量：antd 组件的样式只能来自两条路之一，
 * 二者必须恰好开一条 ——
 *
 *   A. 运行时注入（antd 默认）：ConfigProvider 不设 zeroRuntime，antd 自己往 <head> 塞 <style>
 *   B. 构建期提取：Root.tsx 设 zeroRuntime，样式全部来自 genAntdCss.mjs 产出的静态表，
 *      并由 docusaurus.config.js 的 customCss 加载
 *
 * 两条都不开 = antd 组件【完全没有样式】。而这个坏法：
 *   - 构建 exit 0
 *   - typecheck 通过
 *   - 页面照常产出、SSR HTML 一切正常
 *   - 唯一可观察的差别是产物 assets/css 的体积（实测 484 KB → 108 KB）
 * 实际发生过一次：Root.tsx 换成了开 zeroRuntime 的版本，customCss 却还留着只加载
 * custom.css 的旧值，两条路同时断掉，直到比对产物体积才发现。
 *
 * 两条都开则是另一种浪费：静态表已经全量提供，运行时再注入一遍。
 */
import fs from "node:fs";
import assert from "node:assert";

const ROOT_SRC = "src/theme/Root.tsx";
const CONFIG_SRC = "docusaurus.config.js";
const GEN_SRC = "scripts/genAntdCss.mjs";
const ORCHESTRATOR = "scripts/generate.mjs";
const GITIGNORE = ".gitignore";
const ARTIFACT = "src/css/antd.dark.css";

const read = (f) => {
  assert.ok(fs.existsSync(f), `${f} 不存在 —— antd 样式链路自检无法进行`);
  return fs.readFileSync(f, "utf8");
};

/** 去掉行注释与块注释，避免把注释里提到的字样当成真配置 */
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");

const rootSrc = stripComments(read(ROOT_SRC));
const configSrc = stripComments(read(CONFIG_SRC));

// ── A/B 两条路各自的开关状态 ────────────────────────────────────────────────
const zeroRuntimeOn = /\bzeroRuntime\s*:\s*true\b/.test(rootSrc);

const customCssMatch = configSrc.match(/customCss\s*:\s*(\[[^\]]*\]|"[^"]*"|'[^']*')/);
assert.ok(customCssMatch, `${CONFIG_SRC} 里找不到 customCss —— 无法判断静态表是否被加载`);
const customCssRaw = customCssMatch[1];
const customCssList = [...customCssRaw.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
const staticSheetLoaded = customCssList.some((p) => p.includes("antd.dark.css"));

// ── 核心互斥断言 ────────────────────────────────────────────────────────────
assert.ok(
  zeroRuntimeOn === staticSheetLoaded,
  zeroRuntimeOn
    ? `${ROOT_SRC} 开了 zeroRuntime（antd 不再运行时注入样式），但 ${CONFIG_SRC} 的 customCss 没有加载 ${ARTIFACT}。\n` +
        `    当前 customCss = ${customCssRaw}\n` +
        `    → antd 组件将【完全没有样式】，而构建与 typecheck 都不会报错。\n` +
        `    修法：customCss: ["./${ARTIFACT}", "./src/css/custom.css"]`
    : `${CONFIG_SRC} 的 customCss 加载了 ${ARTIFACT}，但 ${ROOT_SRC} 没有开 zeroRuntime。\n` +
        `    → 静态表与运行时注入会同时生效，样式被提供两遍。\n` +
        `    修法：要么 Root.tsx 加 zeroRuntime: true，要么 customCss 去掉这份静态表。`,
);

// ── 走静态表这条路时，产出链路必须完整 ──────────────────────────────────────
if (staticSheetLoaded) {
  const antdIdx = customCssList.findIndex((p) => p.includes("antd.dark.css"));
  const customIdx = customCssList.findIndex((p) => p.includes("custom.css") && !p.includes("antd.dark.css"));
  assert.ok(
    customIdx === -1 || antdIdx < customIdx,
    `customCss 里 ${ARTIFACT} 必须排在 custom.css 之前，否则站点自定义样式会被 antd 的静态表覆盖。\n` +
      `    当前顺序：${JSON.stringify(customCssList)}`,
  );

  assert.ok(fs.existsSync(GEN_SRC), `customCss 加载了 ${ARTIFACT}，但生成器 ${GEN_SRC} 不存在 —— 该文件不入库，没有生成器就永远拿不到。`);

  const orchestrator = read(ORCHESTRATOR);
  assert.ok(
    orchestrator.includes("genAntdCss.mjs"),
    `${ORCHESTRATOR} 没有编排 genAntdCss.mjs —— pre* 钩子不会重新生成 ${ARTIFACT}，\n` +
      `    新克隆或 CI 上会因为文件缺失而构建失败。`,
  );

  const ignore = read(GITIGNORE);
  assert.ok(
    ignore.includes("antd.dark.css"),
    `${GITIGNORE} 没有忽略 ${ARTIFACT}。它是 (antd 版本 × token × 组件清单) 的纯派生物，\n` +
      `    入库后会在升版时静默过期：静态表与运行时 antd 脱节，按钮/hover 停在旧色而构建全绿。`,
  );

  // 生成器自身绝不能设 zeroRuntime：提取器需要 antd 真的注册样式才有东西可提，
  // 带上它会提取出一个空文件 —— 同样是构建全绿、组件没样式。
  const genSrc = stripComments(read(GEN_SRC));
  assert.ok(!/\bzeroRuntime\s*:\s*true\b/.test(genSrc), `${GEN_SRC} 不得设 zeroRuntime —— 提取器需要 antd 真的注册样式，带上它会提取出空文件。`);
}

console.log(`✓ antd 样式链路自检通过（${zeroRuntimeOn ? "构建期提取 + 静态表" : "antd 运行时注入"}）`);
