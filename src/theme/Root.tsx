import React from "react";
import { ConfigProvider, theme, App } from "antd";
import { AuthProvider } from "@site/src/components/AuthContext";

// Dark theme configuration with zero-runtime
// 注意：需先运行 `yarn gen:antd-css` 生成静态样式
// B+ token system — see docs/superpowers/specs/2026-05-07-ui-optimization-b-plus-design.md
const darkTheme = {
  token: {
    colorPrimary: "#397e6a",
    colorBgLayout: "#14171a",
    colorBgContainer: "#1d2126",
    colorBgElevated: "#272d33",
    colorBorderSecondary: "rgba(255,255,255,0.08)",
    colorText: "#ededed",
    colorTextSecondary: "rgba(255,255,255,0.6)",
    colorTextTertiary: "rgba(255,255,255,0.4)",
    borderRadius: 6,
    borderRadiusSM: 4,
    borderRadiusLG: 12,
    fontFamilyCode: 'ui-monospace, SFMono-Regular, "Menlo", "Cascadia Code", monospace',
    motionDurationFast: "0.12s",
    motionDurationMid: "0.2s",
    motionDurationSlow: "0.32s",
  },
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
  algorithm: theme.darkAlgorithm,
  zeroRuntime: true,
  cssVar: { key: "aishort" },
};

// antd locale 不注入：全项目暴露 antd 默认文案的只有 Pagination 的几个 aria-label / quickJumper
// 字符串（"Previous Page" / "Go to" 等），其他组件（Modal.confirm/Popconfirm/Empty/Form）
// 都已在 callsite 用 <Translate> 覆盖。引入 18 个 antd locale pack 换这点收益不划算
// （~150KB gzipped bundle 膨胀）。Pagination 默认英文可接受。
export default function Root({ children }) {
  return (
    <ConfigProvider theme={darkTheme}>
      <App className="app-root">
        <AuthProvider>{children}</AuthProvider>
      </App>
    </ConfigProvider>
  );
}
