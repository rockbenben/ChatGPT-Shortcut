// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
import { execSync } from "node:child_process";
import { communityPromptSitemapItems } from "./scripts/sitemapCommunityItems.mjs";

// 构建日期取 HEAD commit 时间而非 new Date()：
// Docusaurus 对每个 locale 构建都会重新求值本 config，new Date() 会让 18 个 locale 的
// schema.org datePublished/dateModified 各不相同（同一篇文档 18 个语言版本宣称 18 个发布时间），
// 且每次重新构建都漂移。commit 时间跨 locale/跨重建稳定，仅在内容真正变更时才变化。
// 非 git 环境（裸源码包构建）回退当前时间。
function resolveBuildDate() {
  try {
    return execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim() || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}
const buildDate = resolveBuildDate();

/** @type {import('@docusaurus/types').Config} */
const config = {
  // 仅保留品牌名（7 字符）；具体描述在各页面 Layout title 自定义。
  // 旧值 113 字符英文长 title 会让每个页面 <title> 被拼成 ~170 字符，Google SERP 截断 60。
  title: "AiShort",
  // tagline: '方便中文使用 ChatGPT 快捷指令',
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: "https://www.aishort.top",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // app boot 时跑的 client modules（SPA 路由切换不重触发）。
  // aiReferralTracker 把 AI 引擎来源 referrer 推到 GTM dataLayer，让 GA4 能单独分组
  clientModules: [require.resolve("./src/clientModules/aiReferralTracker.ts"), require.resolve("./src/clientModules/chunkReload.js")],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "rockbenben", // Usually your GitHub org/user name.
  projectName: "ChatGPT-Shortcut", // Usually your repo name.

  onBrokenLinks: "throw",

  // Build-time injected fields (via webpack DefinePlugin under the hood)
  // buildDate 用于 schema.org Article 的 datePublished / dateModified（HEAD commit 时间，见顶部 resolveBuildDate）
  customFields: {
    buildDate,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is English, you
  // may want to replace "zh" with "en".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["en", "zh-Hans", "zh-Hant", "ja", "ko", "es", "pt", "hi", "ind", "vi", "th", "fr", "de", "it", "ru", "ar", "tr", "bn"],
    localeConfigs: {
      ar: {
        direction: "rtl",
      },
      // 历史 URL 用 /ind/，但 ind 不是合法的 BCP 47 语言代码（标准印尼语是 id）
      // 用 htmlLang 把 <html lang> 和 hreflang 输出为 id，URL 路径保持 /ind/ 不动
      ind: {
        htmlLang: "id",
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
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: ["./src/css/antd.dark.css", "./src/css/custom.css"],
        },
        googleTagManager: {
          containerId: "GTM-MX524GTT",
        },
        // 裸 /community-prompt（无 ?id=）和各 locale 同名路径只渲染 Invalid prompt ID，
        // 没有索引价值；从 sitemap 排除，避免搜索引擎抓取无效页
        // 私有页（feedback/reset-password/user/）已在 robots.txt Disallow，
        // 同步在 sitemap 排除，避免给爬虫互相矛盾的信号
        sitemap: {
          // 2023+ Google 完全忽略 priority/changefreq，但仍读 lastmod；
          // 默认实现要求 route 有 sourceFilePath（从 git 取时间），动态生成的 pages 没有
          // → 用 createSitemapItems 回退：default 给不出 lastmod 的，用 buildDate 顶上
          lastmod: "date",
          ignorePatterns: [
            "/community-prompt",
            "/*/community-prompt",
            "/feedback",
            "/*/feedback",
            "/reset-password",
            "/*/reset-password",
            "/user/**",
            "/*/user/**",
          ],
          createSitemapItems: async ({ defaultCreateSitemapItems, ...rest }) => {
            const items = await defaultCreateSitemapItems(rest);
            const fallback = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
            const result = items.map((it) => ({ ...it, lastmod: it.lastmod || fallback }));
            // 社区提示词详情页 ?id=N（快照精选 ≤24 条，per-locale）→ scripts/sitemapCommunityItems.mjs
            result.push(...communityPromptSitemapItems(result, fallback));
            return result;
          },
        },
      }),
    ],
  ],
  plugins: [
    require.resolve("./plugin-gen-geo"),
    // auth-boot：在主 JS 包下载/水合之前，于 <head> 同步读 localStorage 的 token，
    // 给 <html> 打 data-auth-boot=in。配合 custom.css，让已登录用户在水合前看到的是骨架占位
    // 而非静态 HTML 里烤死的「免费登录」CTA——发版后冷缓存（主包重新下载的那几秒）尤其明显。
    // 仅检测 token 存在性即可驱动占位 UI；真伪/过期由水合后的 AuthProvider 兜底。未登录用户不打标记、零影响。
    function authBootFlagPlugin() {
      return {
        name: "auth-boot-flag",
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: "script",
                innerHTML: "(function(){try{if(localStorage.getItem('auth_token'))document.documentElement.setAttribute('data-auth-boot','in')}catch(e){}})();",
              },
            ],
          };
        },
      };
    },
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
        defer: "true",
        src: "https://s.newzone.top/tracker.js",
        "data-website-id": "680f4413-ce21-4754-a7d5-45e180e8cf69",
      },
    },
    // PWA manifest — 移动安装 + 部分 AI 答案引擎/搜索抓 manifest 识别站点身份
    {
      tagName: "link",
      attributes: { rel: "manifest", href: "/manifest.webmanifest" },
    },
    // iOS 主屏图标（Safari 收藏到主屏时显示）
    {
      tagName: "link",
      attributes: { rel: "apple-touch-icon", href: "/img/logo.png" },
    },
    // theme-color — 移动 Chrome 地址栏染色。磷光黄绿 accent 做整条地址栏太刺眼，
    // 改用页面石墨底色（同 antd colorBgLayout），地址栏与页面无缝衔接
    {
      tagName: "meta",
      attributes: { name: "theme-color", content: "#0c0e0f" },
    },
    // Apple Mobile Web App 全屏模式（PWA 安装到 iOS 主屏后用全屏 webview 启动）
    // 现代 iOS 16+ 会读 manifest 的 display: standalone，但保留这个 tag 兼容老版本
    {
      tagName: "meta",
      attributes: { name: "apple-mobile-web-app-capable", content: "yes" },
    },
  ],
  scripts: [],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/social-card.png",
      // Docusaurus 默认不发 og:site_name 与 og:image dims
      metadata: [
        { property: "og:site_name", content: "AiShort" },
        { property: "og:image:width", content: "1280" },
        { property: "og:image:height", content: "640" },
        { property: "og:image:type", content: "image/png" },
      ],
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
                label: "LegendTalk",
                href: "https://talk.newzone.top/",
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
                href: "https://img.newzone.top/qrcode/qq1092926837.jpg?imageMogr2/format/webp",
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
        copyright: `Copyright © ${new Date().getFullYear()} AiShort (ChatGPT Shortcut) · 用户内容仅代表作者本人`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
