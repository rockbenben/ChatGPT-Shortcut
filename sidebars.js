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
      type: "category",
      label: "Guides",
      link: {
        type: "generated-index",
      },
      collapsed: false,
      items: ["guides/getting-started", "guides/login-user", "guides/community", "guides/extension", "guides/faq"],
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
