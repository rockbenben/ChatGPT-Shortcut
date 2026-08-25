/**
 * 生成 antd 的静态暗色样式 src/css/antd.dark.css（docusaurus.config.js 的 customCss 引用它）。
 *
 * 不入库、每次构建现生成：这份 CSS 是 (antd 版本 × antdTokens.mjs × 组件清单) 的纯派生物，
 * 但它曾**静默过期**——antd 从 6.5.1 被抬到 6.5.3 后没人重跑本脚本，
 * 静态 CSS 与运行时 antd 脱节，表现为按钮/hover 停在旧色，构建全绿、无任何报错。
 * dependabot 会持续抬 antd 版本，所以把它交给构建期生成，从根上消除这个失效模式。
 *
 * 首行写入指纹 `antd@<版本> tokens:<hash> comps:<hash>`，三者都没变就跳过提取：
 * 冷启动约 1.6s，稳态 176ms。产出是确定性的（同输入连跑三次 sha 相同），
 * 所以不会让 Docusaurus 产物的 content hash 抖动、白白让用户重下这份 CSS。
 *
 * @ant-design/static-style-extract 已放在 dependencies（不是 dev）：构建期真正需要它，
 * 留在 devDependencies 会让 --production / --omit=dev 的部署环境缺包而构建失败。
 *
 * 手动强制重生成：`node scripts/genAntdCss.mjs --force`（绕过指纹判定）。
 * 没有对应的 yarn 脚本——各 pre* 钩子经 scripts/generate.mjs 自动调用本模块的 run()，
 * 再留一个手动入口只会让人以为需要手动维护。
 *
 * ============================ 只提取用到的组件 ============================
 * extractStyle 默认渲染 antd **全部**组件，产出 994 KB；本项目只用 29 个，
 * 实测收窄后 397 KB（brotli 75 KB → 31 KB，首屏 425 KB → 382 KB，每页每语言都省）。
 *
 * 收窄会引入一类**静默失效**：组件不在清单里 → 渲染成无样式，而 tsc 和构建全绿。
 * 这里用三道措施把它堵死，缺一不可：
 *
 *   1. 清单**从 src 的 antd import 现推**，不手工维护（collectAntdComponents）。
 *      手工清单必然漂移，且漂移的表现正是上面那类静默失效。
 *   2. 清单 hash 并入**指纹**。新 import 一个组件 → 清单变 → 指纹变 → CSS 自动重生成。
 *      少了这一条，第 1 条等于没做：清单对了但 CSS 还是上一版的。
 *   3. IMPERATIVE_EXTRAS 兜住 import 语句里根本看不见的用法，并在提取后 assert
 *      它们确实在产出里（extractStyle 的 includes 语义若随 antd 升版改变，这里会炸）。
 */
// antd / react / static-style-extract 一律**延迟导入**：它们的模块加载本身就要 ~1.3s，
// 顶层 import 会让「指纹命中直接跳过」这条路径白白付掉这笔开销（实测 1639ms vs 1331ms，
// 只省 300ms）。放到指纹判定之后按需 import，稳态才真正接近零成本。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { antdThemeFor, antdTokenFingerprint, CSS_VAR_KEY } from "../src/theme/antdTokens.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "src", "css", "antd.dark.css");
const SRC = path.join(root, "src");

// src/pages/prompt/ 是 genPromptPages.mjs 产出的 5022 个薄壳（gitignore，可能不存在）。
// 它们由模板生成、不会引入模板之外的 antd 组件，扫了纯属浪费。
const SKIP_DIRS = new Set([path.join(SRC, "pages", "prompt")]);

// 从 antd 具名导入里剔除的非组件符号：给 extractStyle 的 includes 传这些会让它
// 试图把非组件当组件渲染。Grid/ConfigProvider 本就在提取器的 defaultBlackList 里。
const NON_COMPONENTS = new Set(["theme", "version", "Grid", "ConfigProvider"]);

/**
 * import 语句里**看不见**、但线上必须有样式的组件。每加一条都要写清楚理由——
 * 这份清单是纯人工的，是本方案唯一没被自动化覆盖的缺口。
 */
const IMPERATIVE_EXTRAS = [
  // message：20+ 处经 App.useApp() 命令式调用（Comments / HomePage / MySpace / CopyButton /
  // UserStatus / SecurityCard …），全项目**没有一处** `import { message } from "antd"`。
  // 漏了它 = 全站 toast 变成无样式裸文本，且 SSR 产物里查不出来（toast 不参与 SSR），
  // 是唯一一个「已在用、漏了就线上静默回归」的情况，所以必须硬编码在这里。
  "message",
];

// 【刻意不加进上面清单的两个，别顺手补】
//
// - notification：App.useApp() 三件套之一，但全项目零调用。
// - Select：从没直接 import；只有 Pagination 的尺寸切换器会内部渲染它，
//   而两处 Pagination（Comments.tsx、community-prompts.tsx）都写死 showSizeChanger={false}。
//
// 这两个的隐患都需要**有人新写代码**才触发（调 notification.open()、把 showSizeChanger 改成 true），
// 而 dev server 用的正是这份静态 CSS —— 写的人当场就会看到它没样式。是开发期可见的响失败，
// 不是线上静默回归，和 message 完全不同的风险等级。实测把这两个加回来要多 61,437 B raw
// （占产出的 13%），为一个当场就能发现的问题付这个价不值。真要用了，把它 import 进来
// 或加到上面清单即可，指纹会自动带着 CSS 一起重生成。

/** 递归收集 src 下的 .ts/.tsx（跳过生成的薄壳目录）。 */
function collectSourceFiles(dir, out = []) {
  if (SKIP_DIRS.has(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectSourceFiles(full, out);
    else if (/\.tsx?$/.test(entry.name) && !entry.name.endsWith(".d.ts")) out.push(full);
  }
  return out;
}

/**
 * 现推 includes 清单 = src 里所有 `import { ... } from "antd"` 的具名导入 ∪ IMPERATIVE_EXTRAS。
 *
 * 花括号内必须用 `[^}]*` 而不是 `[\s\S]*?`：前者天然跨行（字符类含换行）却越不过 `}`，
 * 多行 import 照样吃得到；后者会从文件里**更早**的 `import {` 一路懒惰匹配到第一个
 * `} from "antd"`，把中间所有 import 的符号全吞进清单（实测会把 useLocation、
 * ViewModeContext 之类当成 antd 组件喂给提取器）。`import type {}` 只带类型，排除。
 */
export function collectAntdComponents() {
  const found = new Set();
  const re = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*['"]antd['"]/g;
  for (const file of collectSourceFiles(SRC)) {
    const text = fs.readFileSync(file, "utf8");
    for (const m of text.matchAll(re)) {
      if (m[1]) continue; // import type — 无样式需求
      for (const raw of m[2].split(",")) {
        const name = raw.trim().split(/\s+as\s+/)[0].trim();
        if (name && !NON_COMPONENTS.has(name)) found.add(name);
      }
    }
  }
  for (const name of IMPERATIVE_EXTRAS) found.add(name);
  return [...found].sort();
}

/**
 * 剔除「没吃到 cssVar.key 的孤儿 scope」规则。
 *
 * antdTokens.mjs 配了 `cssVar: { key: "aishort" }`，正常产出的选择器就是裸 `.aishort`。
 * 但提取时 antd 还会额外吐出一份以 React `useId` 为 scope 的副本（`.css-var-_R_jv_` 之类）。
 * 那串 id 是**提取那一次渲染**的产物，运行时组件树位置不同、id 也不同——产物 HTML 里
 * grep 不到任何 `css-var-` 类，所以这些规则永远匹配不上任何元素，是纯死重量
 * （实测 32.5 KB raw / 3.2 KB brotli，比再加一整套浅色主题的变量块还贵）。
 *
 * 判定用「选择器含 css-var-」而不是硬编码那串 id：id 随 React 版本与组件清单变，
 * 写死下次就失效且是静默的。配了 key 之后凡是 `css-var-` 前缀的都属于这类孤儿。
 * 只删「选择器各段全是孤儿」的规则；若某天出现与存活 scope 混写的选择器，
 * 下面的 assert 会让构建硬失败，而不是悄悄删掉有用的样式。
 */
function pruneOrphanCssVarScopes(css) {
  const RULE = /[^{}]+\{[^{}]*\}/g;
  let removed = 0;
  let out = css;
  for (const rule of css.match(RULE) || []) {
    if (!rule.includes("css-var-")) continue;
    const parts = rule.slice(0, rule.indexOf("{")).split(",").map((s) => s.trim());
    if (!parts.every((p) => p.includes("css-var-"))) continue; // 混写：留着，交给下面的 assert
    out = out.replace(rule, "");
    removed += rule.length;
  }
  if (out.includes("css-var-")) {
    throw new Error(
      `[antd-css] 仍有 css-var- 孤儿 scope 未能剔除，可能是选择器与存活 scope 混写了。\n` +
        `        残留片段：${out.slice(Math.max(0, out.indexOf("css-var-") - 60), out.indexOf("css-var-") + 60)}`,
    );
  }
  if (removed) console.log(`[antd-css] 剔除孤儿 cssVar scope ${(removed / 1024).toFixed(1)} KB`);
  return out;
}

const components = collectAntdComponents();
const antdVersion = JSON.parse(fs.readFileSync(path.join(root, "node_modules", "antd", "package.json"), "utf8")).version;
const tokensHash = createHash("sha256").update(JSON.stringify(antdTokenFingerprint)).digest("hex").slice(0, 12);
const compsHash = createHash("sha256").update(components.join(",")).digest("hex").slice(0, 12);
// 本脚本自身也进指纹：组装逻辑（如 withPreHydrationLightScope）改了但 token/组件清单没变时，
// 上面两个 hash 都不动，本地那份 antd.dark.css 会静默停在旧产物上。CI 是全新 clone 所以不会中招，
// 恰恰因此本地才更容易带着陈旧 CSS 调试半天。
const selfHash = createHash("sha256").update(fs.readFileSync(fileURLToPath(import.meta.url))).digest("hex").slice(0, 12);
const stamp = `/* generated by scripts/genAntdCss.mjs — antd@${antdVersion} tokens:${tokensHash} comps:${compsHash} gen:${selfHash} — do not edit */`;

/**
 * 给浅色变量块补一条「hydration 之前也生效」的选择器。
 *
 * SSR 产物里 antd 元素的 scope class 是构建期定死的暗色 `.aishort`（首页 151 处，
 * `.aishort-light` 0 处）——静态站点没法知道来访者的主题。而 Docusaurus 在 <head> 里
 * 用预绘制脚本读 localStorage 立刻设 `data-theme`。两者相加的后果：**浅色用户刷新时，
 * 首帧页面已经是浅色纸面，antd 组件却还在用暗色 token（炭黑底），要等 React hydrate
 * 完 ConfigProvider 换 class 才纠正**。实测这个窗口在移动端约 1–2 秒，是肉眼可见的闪烁。
 * 它不产生布局位移，所以 CLS 查不出来；Lighthouse 用全新 profile 恒为暗色，也测不到。
 *
 * 解法是让同一份浅色取值在 `html[data-theme="light"] .aishort` 下也命中，
 * 不复制块体、只多一条选择器（raw ~1 KB，brotli 后可忽略）：
 *   `.aishort-light.ant-btn`  →  `.aishort-light.ant-btn, html[data-theme="light"] .aishort.ant-btn`
 *
 * 特异度是刻意的：新选择器 (0,3,1) 压过暗色的 `.aishort.ant-btn` (0,2,0)，
 * 所以 hydration 前浅色胜出；hydration 后元素只剩 `.aishort-light`，属性选择器不再匹配，
 * 由原选择器接管——两条都是浅色值，交接期不会有第二次跳色。
 * 暗色一侧完全不受影响：`html[data-theme="light"]` 永不匹配。
 */
function withPreHydrationLightScope(block) {
  const braceAt = block.indexOf("{");
  const selector = block.slice(0, braceAt);
  const body = block.slice(braceAt);
  const extra = selector
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.includes(`.${CSS_VAR_KEY.light}`))
    // 只替换 scope class 本身，后面的 .ant-xxx 复合部分原样保留
    .map((s) => `html[data-theme="light"] ${s.replaceAll(`.${CSS_VAR_KEY.light}`, `.${CSS_VAR_KEY.dark}`)}`);
  return extra.length > 0 ? `${selector},${extra.join(",")}${body}` : block;
}

export async function run({ force = false } = {}) {
  // 指纹未变则跳过提取（各 pre* 钩子都会经 scripts/generate.mjs 调到这里）
  if (!force && fs.existsSync(OUT) && fs.readFileSync(OUT, "utf8").startsWith(stamp)) {
    console.log(`[antd-css] up to date (antd@${antdVersion}, ${components.length} components)`);
    return;
  }

  const [{ default: React }, { extractStyle }, { ConfigProvider, theme: antdTheme }] = await Promise.all([
    import("react"),
    import("@ant-design/static-style-extract"),
    import("antd"),
  ]);

  // token 本体在 src/theme/antdTokens.mjs（与 Root.tsx 共用）。
  // 这里故意不带 zeroRuntime —— 提取器需要 antd 真的注册样式才有东西可提
  // （cssinjs-utils genStyleUtils: 若 zeroRuntime=true 则短路 useStyleRegister，extract 出空文件）。
  const extract = (mode, algorithm) =>
    extractStyle({
      customTheme: (node) => React.createElement(ConfigProvider, { theme: { ...antdThemeFor(mode), algorithm } }, node),
      includes: components,
    });

  const darkCss = pruneOrphanCssVarScopes(extract("dark", antdTheme.darkAlgorithm));

  // 浅色只追加「scope 到 light key 的变量块」：组件规则引用的是 var(--ant-*)，
  // 与算法无关（实测两套算法下逐字相同 2518 条），复用暗色那份即可。
  // 整份追加会白白多出 ~380 KB 重复规则；只取变量块的增量是 raw ~26 KB / brotli ~1.3 KB。
  const lightCss = pruneOrphanCssVarScopes(extract("light", antdTheme.defaultAlgorithm));
  const lightVarBlocks = (lightCss.match(/[^{}]+\{[^{}]*--ant-[^{}]*\}/g) || []).filter((b) =>
    b.slice(0, b.indexOf("{")).includes(CSS_VAR_KEY.light),
  );
  if (lightVarBlocks.length === 0) {
    throw new Error(`[antd-css] 浅色提取里找不到 .${CSS_VAR_KEY.light} 变量块，双主题会退化成只有暗色。`);
  }

  const cssText = darkCss + lightVarBlocks.map(withPreHydrationLightScope).join("");

  // 提取器把 includes 认没认，只能看产出。这几个族是命令式调用的，SSR 产物里查不到，
  // 所以这是唯一能发现「includes 语义随 antd 升版变了」的地方——静默降级在此变成硬失败。
  const REQUIRED_FAMILIES = [
    "ant-message", "ant-btn", "ant-modal", "ant-tooltip", "ant-dropdown-menu",
    // 两套 cssVar scope 都得在，否则切主题时有一边拿不到变量、组件会退回 antd 默认色
    CSS_VAR_KEY.dark, CSS_VAR_KEY.light,
  ];
  const absent = REQUIRED_FAMILIES.filter((f) => !cssText.includes(`.${f}`));
  if (absent.length > 0) {
    throw new Error(
      `[antd-css] 提取结果缺少必需的组件族：${absent.join(", ")}。\n` +
        `        includes 清单共 ${components.length} 项：${components.join(", ")}\n` +
        `        多半是 @ant-design/static-style-extract 的 includes 语义在升版后变了。\n` +
        `        排查前先用全量提取兜底：把 extractStyle 的参数换回 customTheme 单参形式。`,
    );
  }

  fs.writeFileSync(OUT, `${stamp}\n${cssText}`);

  console.log(`[antd-css] generated for antd@${antdVersion} — ${(cssText.length / 1024).toFixed(2)} KB (${components.length} components)`);
}

// 直接执行入口：node scripts/genAntdCss.mjs [--force]
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  await run({ force: process.argv.includes("--force") });
}
