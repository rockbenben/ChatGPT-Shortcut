/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
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
      },
      collapsed: false,
      items: ["guides/interface", "guides/login-user", "guides/community", "guides/faq"],
    },
    {
      type: "category",
      label: "浏览器插件",
      link: {
        type: "generated-index",
      },
      collapsed: false,
      items: ["extension/README", "extension/usage", "extension/manual-chrome-extension", "extension/manual-chrome-extension-zip", "extension/firefox-extension-setting", "extension/faq"],
    },
    {
      type: "doc",
      id: "deploy",
    },
    {
      type: "category",
      label: "Policies",
      items: ["privacy-policy", "terms-of-service"],
    },
  ],
};

export default sidebars;
