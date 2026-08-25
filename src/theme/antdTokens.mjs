/**
 * antd 主题 token 的单一来源 —— Root.tsx（运行期 ConfigProvider）与
 * scripts/genAntdCss.mjs（构建期静态样式提取）共用。
 *
 * 两边**必须**是同一份 token，否则提取出的 antd.dark.css 与运行时变量名/取值对不上，
 * 按钮、hover 会停在旧色。差异只有一处，各自在自己那边加：
 *   - Root.tsx      → zeroRuntime: true（避免运行时重复注入同一份样式）
 *   - genAntdCss.mjs → 不带 zeroRuntime（cssinjs-utils 在 zeroRuntime 下会短路
 *                      useStyleRegister，提取出空文件）
 *
 * 改这里**不需要**手动重跑生成：指纹含本文件内容，各 pre* 钩子经 scripts/generate.mjs
 * 自动检测到并重建 src/css/antd.dark.css（该文件已不入库）。
 * 确需立刻重建可跑 `node scripts/genAntdCss.mjs`。
 *
 * .mjs 而非 .ts：genAntdCss.mjs 由裸 node 执行，不过 TS 编译。
 *
 * ============================ 明暗双主题 ============================
 * 拆成 universal / lightOnly / darkOnly 三层：品牌色与形状共用，两套底色各自覆盖。
 * 两侧的 colorBg* 都必须显式给全，让 antd 的容器色跟 custom.css 的三层底同源；
 * 缺哪一侧，那一侧就会退回 algorithm 的默认灰白，和站点底色对不上。
 *
 * 静态管线下切主题**不注入任何运行时样式**：cssVar 让组件规则只引用 var(--ant-*)，
 * 明暗两套变量都已静态存在于 antd.dark.css，切换只是换根元素上的 scope class
 * （CSS_VAR_KEY.dark / .light）。这正是 cssVar 相对 runtime 注入的价值所在。
 *
 * ⚠ 不要把本文件连同 Root.tsx 的 zeroRuntime 一起 cherry-pick 到 main：
 * main 走 antd 默认 runtime CSS 注入，既无 genAntdCss 也无 antd.dark.css 产出管线。
 * 带过去会让 antd 组件**全部失样式**（main 的 Root.tsx 里那句「不设 zeroRuntime/cssVar，
 * 否则 antd 全失样式」即为此）。
 *
 * teal-ink 海沉绿 #397e6a：白字对比达标，无需墨字按钮 hack（磷光黄绿才需要）。
 * B+ token system — see docs/superpowers/specs/2026-05-07-ui-optimization-b-plus-design.md
 */

/** cssVar scope key —— 每个模式一个，两套变量并存于同一份静态 CSS。 */
export const CSS_VAR_KEY = { dark: "aishort", light: "aishort-light" };

/** 明暗通用：品牌色、圆角、字体、动效。浅色模式只有这一层 + defaultAlgorithm。 */
const universalToken = {
  colorPrimary: "#397e6a",
  // colorLink 默认派生自 colorInfo（蓝），不跟随 colorPrimary——Typography copyable
  // 图标、type="link" 按钮会漏出蓝色，必须显式对齐到品牌绿。
  // 这里是浅色版；暗色在 darkOnlyToken 里提亮覆盖。
  colorLink: "#2d6454",
  borderRadius: 6,
  borderRadiusSM: 4,
  borderRadiusLG: 12,
  fontFamilyCode: 'ui-monospace, SFMono-Regular, "Menlo", "Cascadia Code", monospace',
  motionDurationFast: "0.12s",
  motionDurationMid: "0.2s",
  motionDurationSlow: "0.32s",
};

/**
 * 浅色专属：纸面三层底，覆盖 antd defaultAlgorithm 的默认值。
 * 与 custom.css 的 --ifm-background-* 纸面三层同源：
 *   page #f0f1ea < card/surface #f8f9f3 < elevated 纯白
 * 不覆盖的话 antd 会把 colorBgContainer 刷成纯白，按钮、Switch、Input 在微暖纸底上
 * 会明显发白跳出来，边框也会退回 antd 默认的 #d9d9d9 而不是站点的 hairline。
 * 纯白只留给 elevated（弹层、Modal、Dropdown），页面与控件都不刷白，减少眩光。
 */
const lightOnlyToken = {
  colorBgLayout: "#f0f1ea",
  colorBgContainer: "#f8f9f3",
  colorBgElevated: "#ffffff",
  colorBorderSecondary: "rgba(0,0,0,0.08)",
  colorTextSecondary: "rgba(0,0,0,0.6)",
  colorTextTertiary: "rgba(0,0,0,0.45)",
};

/**
 * 暗色专属：炭黑三层底与正文层级，覆盖 antd darkAlgorithm 的默认值。
 * 与 custom.css 的 --ifm-background-* 炭黑三层同源。
 * colorText 用 #ededed（~93%）而非近纯白，暗底上纯白会过亮。
 */
const darkOnlyToken = {
  colorLink: "#57c2a3", // 提亮版品牌绿，与 --site-color-tag-selected-text 同源
  colorBgLayout: "#14171a",
  colorBgContainer: "#1d2126",
  colorBgElevated: "#272d33",
  colorBorderSecondary: "rgba(255,255,255,0.08)",
  colorText: "#ededed",
  colorTextSecondary: "rgba(255,255,255,0.6)",
  colorTextTertiary: "rgba(255,255,255,0.4)",
};

const components = {
  Card: {
    headerBg: "transparent",
    paddingLG: 16,
  },
  Tag: {
    borderRadiusSM: 0,
  },
  Button: {
    borderRadius: 6,
  },
};

/**
 * 构造某个模式的 theme 配置（不含 algorithm —— 调用方各自传，避免本文件 import antd：
 * genAntdCss.mjs 要在指纹命中时跳过 antd 的 ~1.3s 模块加载）。
 */
export const antdThemeFor = (mode) => ({
  token: { ...universalToken, ...(mode === "dark" ? darkOnlyToken : lightOnlyToken) },
  components,
  hashed: false,
  cssVar: { key: CSS_VAR_KEY[mode] },
});

/** 指纹用：token 内容变了要触发 CSS 重建。 */
export const antdTokenFingerprint = { universalToken, lightOnlyToken, darkOnlyToken, components, CSS_VAR_KEY };
