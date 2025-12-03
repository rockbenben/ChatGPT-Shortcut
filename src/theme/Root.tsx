import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ConfigProvider, theme } from "antd";
import "antd/dist/antd.css";
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
    updateTheme();
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
      zeroRuntime: true,
      hashed: false,
    }),
    [isDarkMode]
  );

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
