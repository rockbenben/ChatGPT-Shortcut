import React from "react";
import { ConfigProvider, App } from "antd";

// Dark theme configuration with zero-runtime
// 注意：需先运行 `yarn gen:antd-css` 生成静态样式
const darkTheme = {
  zeroRuntime: true,
  cssVar: { key: "aishort" },
};

export default function Root({ children }) {
  return (
    <ConfigProvider theme={darkTheme}>
      <App className="app-root">{children}</App>
    </ConfigProvider>
  );
}
