import React, { useLayoutEffect, useState, useMemo } from "react";
import { ConfigProvider, theme, App } from "antd";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { AuthProvider } from "@site/src/components/AuthContext";

// Dual-theme antd ConfigProvider — switches algorithm + dark-only brand tokens based on
// Docusaurus data-theme attribute. Universal tokens (radius, motion, components) apply
// in both modes; dark-only deep editorial bg/content apply only in dark mode.
// NOTE: main 分支用 antd 默认 runtime CSS 注入（不设 zeroRuntime/cssVar，否则 antd 全失样式）
// B+ token system — see docs/superpowers/specs/2026-05-07-ui-optimization-b-plus-design.md

function getInitialTheme(): boolean {
  if (ExecutionEnvironment.canUseDOM) {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }
  // SSR 时返回 true，匹配 Docusaurus 的 defaultMode: "dark"
  return true;
}

// antd locale 不注入：全项目暴露 antd 默认文案的只有 Pagination 的几个 aria-label / quickJumper
// 字符串（"Previous Page" / "Go to" 等），其他组件（Modal.confirm/Popconfirm/Empty/Form）
// 都已在 callsite 用 <Translate> 覆盖。引入 18 个 antd locale pack 换这点收益不划算
// （~150KB gzipped bundle 膨胀）。Pagination 默认英文可接受。
export default function Root({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useLayoutEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const updateTheme = () => {
      setIsDarkMode(document.documentElement.getAttribute("data-theme") === "dark");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const themeConfig = useMemo(() => {
    // Universal brand tokens — applied in both light and dark themes
    const universalToken = {
      colorPrimary: "#397e6a",
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 12,
      fontFamilyCode: 'ui-monospace, SFMono-Regular, "Menlo", "Cascadia Code", monospace',
      motionDurationFast: "0.12s",
      motionDurationMid: "0.2s",
      motionDurationSlow: "0.32s",
    };

    // Dark-only deep editorial bg/content — overrides antd dark algorithm defaults for refined feel.
    // Light mode uses antd defaultAlgorithm without these overrides.
    const darkOnlyToken = isDarkMode
      ? {
          colorBgLayout: "#0d0d0f",
          colorBgContainer: "#1a1a1e",
          colorBgElevated: "#23232a",
          colorBorderSecondary: "rgba(255,255,255,0.08)",
          colorText: "#ededed",
          colorTextSecondary: "rgba(255,255,255,0.6)",
          colorTextTertiary: "rgba(255,255,255,0.4)",
        }
      : {};

    return {
      token: { ...universalToken, ...darkOnlyToken },
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
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    };
  }, [isDarkMode]);

  return (
    <ConfigProvider theme={themeConfig}>
      <App className="app-root">
        <AuthProvider>{children}</AuthProvider>
      </App>
    </ConfigProvider>
  );
}
