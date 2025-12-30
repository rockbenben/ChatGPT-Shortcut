// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "AiShort - Advanced AI Agent & Prompt Platform | Build, Share, and Multiply Productivity with One Click",
  // tagline: '方便中文使用 ChatGPT 快捷指令',
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
    experimental_faster: true,
  },

  // Set the production url of your site here
  url: "https://www.aishort.top",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "rockbenben", // Usually your GitHub org/user name.
  projectName: "ChatGPT-Shortcut", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is English, you
  // may want to replace "zh" with "en".
  i18n: {
    defaultLocale: "zh",
    locales: ["en", "zh", "ja", "ko", "es", "fr", "de", "it", "ru", "pt", "hi", "ar", "bn"],
    localeConfigs: {
      ar: {
        direction: "rtl",
      },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          sidebarPath: "sidebars.js",
        },
        theme: {
          customCss: ["./src/css/antd.dark.css", "./src/css/custom.css"],
        },
        googleTagManager: {
          containerId: "GTM-MX524GTT",
        },
      }),
    ],
  ],
  plugins: [
    /*
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // /docs/oldDoc -> /docs/newDoc
          {
            to: "/",
            from: "/cn",
          },
        ],
      },
    ], */
  ],

  headTags: [
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            name: "AiShort",
            url: "https://www.aishort.top/",
            logo: "https://www.aishort.top/img/logo.png",
          },
          {
            "@type": "WebSite",
            name: "AiShort",
            url: "https://www.aishort.top/",
          },
        ],
      }),
    },
  ],
  scripts: [],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/logo.png",
      // autocorrect: false,
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        hideOnScroll: true,
        title: "AI Short",
        logo: {
          alt: "ChatGPT Shortcuts",
          src: "img/logo.svg",
          width: 32,
          height: 32,
        },
        items: [
          {
            to: "/community-prompts",
            label: "社区提示词",
            position: "left",
          },
          {
            to: "docs",
            label: "使用说明",
            position: "left",
          },
          {
            type: "dropdown",
            label: "应用工具",
            position: "left",
            items: [
              {
                label: "脚本扩展",
                to: "/docs/extension",
              },
              {
                label: "ToolsByAI",
                href: "https://tools.newzone.top/",
              },
              {
                label: "IMGPrompt",
                href: "https://prompt.newzone.top/app",
              },
              { type: "html", value: '<hr style="margin: 4px 0;">' },
              {
                label: "工具收藏",
                href: "https://nav.newzone.top",
              },
              {
                label: "Find on Product Hunt",
                href: "https://www.producthunt.com/posts/chatgpt-shortcut?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-chatgpt&#0045;shortcut",
              },
            ],
          },
          {
            to: "/feedback",
            label: "反馈建议",
            position: "left",
          },
          // remove the language dropdown from the navbar (if you only have one language)
          { type: "localeDropdown", position: "right" },
          {
            type: "dropdown",
            label: "支持",
            position: "right",
            items: [
              {
                label: "Telegram",
                href: "https://t.me/aishort_top",
                className: "header-tg-link",
              },
              {
                label: "Discord",
                href: "https://discord.gg/PZTQfJ4GjX",
                className: "header-discord-link",
              },
              {
                label: "QQ 群",
                href: "https://img.newzone.top/qq963752577.jpg?imageMogr2/format/webp",
                className: "header-qq-link",
              },
            ],
          },
          {
            title: "GitHub",
            href: "https://github.com/rockbenben/ChatGPT-Shortcut",
            position: "right",
            className: "header-github-link",
          },
        ],
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} AiShort (ChatGPT Shortcut)`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
