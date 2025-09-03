import React, { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { createCache, StyleProvider } from "@ant-design/cssinjs";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default function Root({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const updateTheme = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      setIsDarkMode(isDark);
    };

    // 初始化主题
    updateTheme();

    // 监听主题变化
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // 按照官方文档的内联样式方案
  const cache = React.useMemo(() => createCache(), []);

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#397e6a",
          },
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
