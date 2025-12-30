import fs from "fs";
import React from "react";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider, theme as antdTheme } from "antd";

// 与 Root.tsx 保持一致的暗色主题配置
const darkTheme = {
  token: {
    colorPrimary: "#397e6a",
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
