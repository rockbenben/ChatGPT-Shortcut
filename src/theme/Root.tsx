import React, { useLayoutEffect, useState, useMemo } from "react";
import { ConfigProvider, theme, App } from "antd";
import "antd/dist/antd.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// 同步读取初始主题，避免 hydration 时的闪烁
function getInitialTheme(): boolean {
  if (ExecutionEnvironment.canUseDOM) {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }
  // SSR 时返回 true，匹配 Docusaurus 的 defaultMode: "dark"
  return true;
}

export default function Root({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useLayoutEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const updateTheme = () => {
      setIsDarkMode(document.documentElement.getAttribute("data-theme") === "dark");
    };

    // 初始化时同步一次（处理可能的 SSR 不匹配）
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const themeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: "#397e6a",
      },
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      zeroRuntime: true,
      hashed: false,
    }),
    [isDarkMode]
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <App className="app-root">{children}</App>
    </ConfigProvider>
  );
}
