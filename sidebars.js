// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docs: [
    {
      type: "doc",
      id: "introduction",
    },
    {
      type: "doc",
      id: "guides/getting-started",
    },
    {
      type: "category",
      label: "使用指南",
      link: {
        type: "generated-index",
        // 必须显式 ASCII slug：不写时 Docusaurus 直接用中文 label 派生路径段，
        // 18 个 locale（含 en/de/ar）的 URL、canonical、sitemap 都会带 /docs/category/使用指南 这种简中段
        slug: "/category/guides",
      },
      collapsed: false,
      items: ["guides/interface", "guides/account", "guides/my-collection", "guides/user-prompts", "guides/community", "guides/faq"],
    },
    {
      type: "category",
      label: "项目部署",
      link: {
        type: "doc",
        id: "deploy",
      },
      collapsed: false,
      items: ["deploy/standard", "deploy/offline", "deploy/configuration", "deploy/sync-updates"],
    },
    {
      type: "category",
      label: "浏览器插件",
      link: {
        type: "generated-index",
        slug: "/category/extension",
      },
      collapsed: true,
      items: ["extension/README", "extension/usage", "extension/manual-chrome-extension", "extension/manual-chrome-extension-zip", "extension/firefox-extension-setting"],
    },
    {
      type: "category",
      label: "Policies",
      items: ["privacy-policy", "terms-of-service"],
    },
  ],
};

export default sidebars;
