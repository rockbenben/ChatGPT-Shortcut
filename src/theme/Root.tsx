import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ConfigProvider, theme } from "antd";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default function Root({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const updateTheme = useCallback(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    // 初始化主题
    updateTheme();

    // 监听主题变化
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [updateTheme]);

  const themeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: "#397e6a",
      },
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      cssVar: true,
      hashed: false,
    }),
    [isDarkMode]
  );

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
