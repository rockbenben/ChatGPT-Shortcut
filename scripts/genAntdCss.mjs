import fs from "fs";
import React from "react";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider, theme as antdTheme } from "antd";

// 与 Root.tsx 共享 token + cssVar.key（必须一致才能让生成的 CSS 命中运行时的变量名），
// 但故意不带 zeroRuntime —— 提取器需要 antd 真的注册样式才有东西可提
// （cssinjs-utils genStyleUtils: 若 zeroRuntime=true 则短路 useStyleRegister，extract 出空文件）。
// Root.tsx 反过来必须设 zeroRuntime: true，避免运行时重复注入同一份样式。
// 必须与 Root.tsx 的 darkTheme token 完全一致（teal-ink 海沉绿 #397e6a）。
// 改这里后务必 `yarn gen:antd-css` 重新生成 antd.dark.css，否则按钮/hover 仍是旧色。
const darkTheme = {
  token: {
    colorPrimary: "#397e6a",
    // colorLink 默认派生自 colorInfo（蓝），不跟随 colorPrimary——Typography copyable
    // 图标、type="link" 按钮会漏出蓝色，必须显式对齐到提亮版品牌绿
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
  algorithm: antdTheme.darkAlgorithm,
  hashed: false,
  cssVar: { key: "aishort" },
};

// 提取所有组件的静态样式
const cssText = extractStyle((node) => React.createElement(ConfigProvider, { theme: darkTheme }, node));

// 写入文件
fs.writeFileSync("./src/css/antd.dark.css", cssText);

console.log("✅ antd.dark.css generated successfully!");
console.log(`   File size: ${(cssText.length / 1024).toFixed(2)} KB`);
