import React, { useLayoutEffect, useState, useMemo } from "react";
import { ConfigProvider, theme, App } from "antd";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { AuthProvider } from "@site/src/components/AuthContext";

// Dual-theme antd ConfigProvider — switches algorithm + per-mode brand tokens based on
// Docusaurus data-theme attribute. Universal tokens (radius, motion, components) apply
// in both modes; Phosphor Index graphite bg/content tokens apply only in dark mode.
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
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 12,
      fontFamilyCode: 'ui-monospace, SFMono-Regular, "Menlo", "Cascadia Code", monospace',
      motionDurationFast: "0.12s",
      motionDurationMid: "0.2s",
      motionDurationSlow: "0.32s",
    };

    // Phosphor Index 双主题 brand token：dark = 石墨三层底 + 磷光黄绿 accent #d8ff4a；
    // light = 同 hue 74 暗化橄榄绿（白底上磷光绿对比度不可用）。与 custom.css 的
    // --ifm-color-primary / --site-color-tag-selected-* 保持同源。
    // colorLink 默认派生自 colorInfo（蓝），不跟随 colorPrimary——Typography copyable
    // 图标、type="link" 按钮会漏出蓝色，两种模式都必须显式对齐
    const modeToken = isDarkMode
      ? {
          colorPrimary: "#d8ff4a",
          colorLink: "#d8ff4a",
          colorBgLayout: "#0c0e0f",
          colorBgContainer: "#131619",
          colorBgElevated: "#1b1f22",
          colorBorderSecondary: "rgba(255,255,255,0.08)",
          colorText: "#ededed",
          colorTextSecondary: "rgba(255,255,255,0.6)",
          colorTextTertiary: "rgba(255,255,255,0.4)",
        }
      : {
          colorPrimary: "#657a1f",
          colorLink: "#526515",
          // 浅色"纸面"三层底（与 custom.css --ifm-background-* 同源）：
          // 页面不刷纯白减少眩光,纯白只留给 elevated 弹层
          colorBgLayout: "#f0f1ea",
          colorBgContainer: "#f8f9f3",
          colorBgElevated: "#ffffff",
        };

    return {
      token: { ...universalToken, ...modeToken },
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
          // 磷光黄绿 primary 亮度太高，白字对比度不达标 → 暗色主按钮文字用墨色；
          // 浅色橄榄绿底（#657a1f）白字 ~4.8:1 达标，走 antd 默认
          ...(isDarkMode ? { primaryColor: "#101213" } : {}),
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
