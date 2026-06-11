import React, { useLayoutEffect, useState, useMemo } from "react";
import { ConfigProvider, theme, App } from "antd";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

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
    // Universal brand tokens — applied in both light and dark themes.
    // teal-ink 海沉绿 #397e6a：白字对比达标，dark 算法自动提亮，无需墨字按钮 hack。
    // colorLink 默认派生自 colorInfo（蓝），不跟随 colorPrimary——Typography copyable 图标、
    // type="link" 按钮会漏出蓝色，必须显式对齐到品牌绿（与 custom.css --ifm-link-color 同源）。
    const universalToken = {
      colorPrimary: "#397e6a",
      colorLink: "#2d6454", // light 链接/copyable 图标（dark 在 darkOnlyToken 提亮）
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 12,
      fontFamilyCode: 'ui-monospace, SFMono-Regular, "Menlo", "Cascadia Code", monospace',
      motionDurationFast: "0.12s",
      motionDurationMid: "0.2s",
      motionDurationSlow: "0.32s",
    };

    // Dark-only deep editorial bg/content — overrides antd dark algorithm defaults for refined feel.
    // 与 custom.css 的 --ifm-background-* 炭黑三层底同源。Light mode 走 antd defaultAlgorithm。
    const darkOnlyToken = isDarkMode
      ? {
          colorLink: "#57c2a3", // dark 链接/copyable 图标，提亮版品牌绿（与 --site-color-tag-selected-text 同源）
          colorBgLayout: "#14171a",
          colorBgContainer: "#1d2126",
          colorBgElevated: "#272d33",
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
      <App className="app-root">{children}</App>
    </ConfigProvider>
  );
}
