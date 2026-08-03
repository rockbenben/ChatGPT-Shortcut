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
 * ⚠ 不要把本文件连同 Root.tsx 的 zeroRuntime 一起 cherry-pick 到 main：
 * main 是双主题分支、走 antd 默认 runtime CSS 注入，既无 genAntdCss 也无
 * antd.dark.css 产出管线。带过去会让 antd 组件**全部失样式**
 * （main 的 Root.tsx 里那句「不设 zeroRuntime/cssVar，否则 antd 全失样式」即为此）。
 *
 * teal-ink 海沉绿 #397e6a：白字对比达标，无需墨字按钮 hack（磷光黄绿才需要）。
 * B+ token system — see docs/superpowers/specs/2026-05-07-ui-optimization-b-plus-design.md
 */
export const antdDarkTokens = {
  token: {
    colorPrimary: "#397e6a",
    // colorLink 默认派生自 colorInfo（蓝），不跟随 colorPrimary——Typography copyable
    // 图标、type="link" 按钮会漏出蓝色，必须显式对齐到提亮版品牌绿（dark-only 单主题）
    colorLink: "#57c2a3",
    colorBgLayout: "#14171a",
    colorBgContainer: "#1d2126",
    colorBgElevated: "#272d33",
    colorBorderSecondary: "rgba(255,255,255,0.08)",
    colorText: "#ededed",
    colorTextSecondary: "rgba(255,255,255,0.6)",
    colorTextTertiary: "rgba(255,255,255,0.4)",
    borderRadius: 6,
    borderRadiusSM: 4,
    borderRadiusLG: 12,
    fontFamilyCode: 'ui-monospace, SFMono-Regular, "Menlo", "Cascadia Code", monospace',
    motionDurationFast: "0.12s",
    motionDurationMid: "0.2s",
    motionDurationSlow: "0.32s",
  },
  components: {
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
  },
  hashed: false,
  cssVar: { key: "aishort" },
};
