import React, { useLayoutEffect, useMemo, useState } from "react";
import { ConfigProvider, theme, App } from "antd";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { AuthProvider } from "@site/src/components/AuthContext";
import { useAntdLocale } from "./useAntdLocale";
import { antdThemeFor } from "./antdTokens.mjs";

// 明暗双主题 + zero-runtime 静态样式。
// token 本体在 ./antdTokens.mjs（与 scripts/genAntdCss.mjs 共用），静态样式
// src/css/antd.dark.css 由 scripts/genAntdCss.mjs 经 scripts/generate.mjs 在
// prestart/predev/pretypecheck/prebuild/predeploy 自动生成（不入库），改 token 无需手动重跑。
//
// 切主题为什么不需要运行时注入：cssVar 让组件规则只引用 var(--ant-*)，明暗两套变量
// 都已静态存在于 antd.dark.css，切换只是让 antd 给组件换一个 scope class
// （aishort / aishort-light）。所以 zeroRuntime 可以一直开着。
//
// ⚠ 用 MutationObserver 读 data-theme 而不是 useColorMode()：Root 位于 Docusaurus 的
// ColorModeProvider **外层**，在这里调 useColorMode 会抛「called outside the
// ColorModeProvider」。main 分支同因同解，两边保持同构便于 cherry-pick。
function getInitialDark(): boolean {
  if (ExecutionEnvironment.canUseDOM) {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }
  // SSR 时返回 true，匹配 docusaurus.config.js 的 colorMode.defaultMode: "dark"
  return true;
}

export default function Root({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDark);
  const locale = useAntdLocale();

  useLayoutEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const update = () => setIsDarkMode(document.documentElement.getAttribute("data-theme") === "dark");
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const themeConfig = useMemo(
    () => ({
      ...antdThemeFor(isDarkMode ? "dark" : "light"),
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      // zeroRuntime 只在运行期加：提取器需要 antd 真的注册样式才有东西可提。
      // ⚠ 本行是分支专属：main 走 antd 默认 runtime 注入且没有静态 CSS 产出管线，
      // 把 zeroRuntime/cssVar 带过去会让 antd 组件全部失样式。
      zeroRuntime: true,
    }),
    [isDarkMode],
  );

  return (
    <ConfigProvider theme={themeConfig} locale={locale}>
      <App className="app-root">
        <AuthProvider>{children}</AuthProvider>
      </App>
    </ConfigProvider>
  );
}
