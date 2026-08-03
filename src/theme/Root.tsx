import React from "react";
import { ConfigProvider, theme, App } from "antd";
import { AuthProvider } from "@site/src/components/AuthContext";
import { useAntdLocale } from "./useAntdLocale";
import { antdDarkTokens } from "./antdTokens.mjs";

// Dark theme configuration with zero-runtime
// token 本体在 ./antdTokens.mjs（与 scripts/genAntdCss.mjs 共用），
// 静态样式 src/css/antd.dark.css 由 scripts/genAntdCss.mjs 经 scripts/generate.mjs
// 在 prestart/predev/pretypecheck/prebuild/predeploy 自动生成（不入库），改 token 无需手动重跑
const darkTheme = {
  ...antdDarkTokens,
  algorithm: theme.darkAlgorithm,
  // zeroRuntime 只在运行期加：提取器需要 antd 真的注册样式才有东西可提。
  // ⚠ 本行是分支专属：main（双主题）走 antd 默认 runtime 注入且没有静态 CSS 产出管线，
  // 把 zeroRuntime/cssVar 带过去会让 antd 组件全部失样式。
  zeroRuntime: true,
};

export default function Root({ children }) {
  const locale = useAntdLocale();

  return (
    <ConfigProvider theme={darkTheme} locale={locale}>
      <App className="app-root">
        <AuthProvider>{children}</AuthProvider>
      </App>
    </ConfigProvider>
  );
}
