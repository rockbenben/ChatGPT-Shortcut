// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "AiShort(ChatGPT Shortcut)-AI Prompt Management,Productivity Tool",
  // tagline: '方便中文使用 ChatGPT 快捷指令',
  favicon: "https://img.newzone.top/aishort/favicon.ico",

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
  onBrokenMarkdownLinks: "warn",

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
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-YJY639H2J1",
          anonymizeIP: false,
        },
      }),
    ],
  ],
  plugins: [
    /* [
      "docusaurus2-plugin-google-adsense",
      {
        dataAdClient: "ca-pub-7585955822109216",
      },
    ], */
    "./plugins/piwik.js",
    "./plugins/instantpage.js",
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      metadata: [
        {
          name: "keywords",
          content: "prompt,aishort,ChatGPT Shortcut,ChatGPT SC,ChatGPT,AI prompts，提示词",
        },
      ],
      navbar: {
        hideOnScroll: true,
        title: "AI Short",
        logo: {
          alt: "ChatGPT Shortcuts",
          src: "https://img.newzone.top/aishort/logo.svg",
          width: 32,
          height: 32,
        },
        items: [
          {
            to: "docs",
            label: "📘 使用说明",
            position: "left",
          },
          {
            to: "/community-prompts",
            label: "🏘️ 社区提示词",
            position: "left",
          },
          {
            type: "dropdown",
            label: "🛠️ 应用工具",
            position: "left",
            items: [
              {
                label: "脚本扩展",
                to: "/docs/guides/extension",
              },
              {
                label: "IMGPrompt",
                href: "https://prompt.newzone.top/",
              },
              {
                label: "文字处理",
                href: "https://tools.newzone.top/json-translate",
              },
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
            type: "dropdown",
            label: "反馈建议",
            position: "left",
            items: [
              {
                label: "📝 提交反馈",
                to: "/feedback",
              },
              {
                label: "💬 加入 QQ 群",
                href: "https://img.newzone.top/qq736094782.jpg?imageMogr2/format/webp",
              },
              {
                label: "📺 加入 Discord",
                href: "https://discord.gg/PZTQfJ4GjX",
              },
            ],
          },
          // remove the language dropdown from the navbar (if you only have one language)
          { type: "localeDropdown", position: "right" },
          {
            title: "QQ Group",
            href: "https://qm.qq.com/q/sHgB9eqd6E",
            position: "right",
            className: "header-qq-link",
          },
          {
            title: "Discord",
            href: "https://discord.gg/PZTQfJ4GjX",
            position: "right",
            className: "header-discord-link",
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
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} AiShort (ChatGPT Shortcut)`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

      /* announcementBar: {
        id: 'announcement_bar',
        content: getAnnouncement(),
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      }, */
    }),
};

export default config;
