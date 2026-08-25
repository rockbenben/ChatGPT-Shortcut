// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
import { execSync } from "node:child_process";
import { communityPromptSitemapItems } from "./scripts/sitemapCommunityItems.mjs";
import { withPromptLastmod } from "./scripts/sitemapPromptLastmod.mjs";
// 语言列表单一数据源（与 scripts/buildPhased.mjs 共用，避免 config 与分段构建脱钩）
import { defaultLocale, locales } from "./scripts/i18nLocales.mjs";

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
  // aiReferralTracker 把 AI 引擎来源 referrer 推到 GTM dataLayer，让 GA4 能单独分组；
  // chunkReload 兜底首屏 chunk 加载失败（Docusaurus 只管路由切换的失败，首屏 preload 没有
  // .catch，挂了 React 永不挂载、页面成死壳），细节与实测结论见该文件头注
  clientModules: [require.resolve("./src/clientModules/aiReferralTracker.ts"), require.resolve("./src/clientModules/chunkReload.js")],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "rockbenben", // Usually your GitHub org/user name.
  projectName: "ChatGPT-Shortcut", // Usually your repo name.

  onBrokenLinks: "throw",

  // Build-time injected fields (via the bundler's DefinePlugin under the hood — Rspack here, via @docusaurus/faster)
  // buildDate 用于 schema.org Article 的 datePublished / dateModified（HEAD commit 时间，见顶部 resolveBuildDate）
  customFields: {
    buildDate,
  },

  // defaultLocale / locales 来自 scripts/i18nLocales.mjs（单一数据源，与分段构建共用）。
  // 增删语言只改那一处；不要在这里硬编码数组，否则会与 buildPhased 脱钩。
  i18n: {
    defaultLocale,
    locales,
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
          // Docker 构建（SKIP_GIT_INFO=true）无 .git：lastmod 设 null 跳过 git 取时间，
          // 全部走下面 createSitemapItems 的 fallback（今天），避免 "outside Git worktree" 中断
          lastmod: process.env.SKIP_GIT_INFO === "true" ? null : "date",
          ignorePatterns: ["/community-prompt", "/*/community-prompt", "/feedback", "/*/feedback", "/reset-password", "/*/reset-password", "/user/**", "/*/user/**"],
          createSitemapItems: async ({ defaultCreateSitemapItems, ...rest }) => {
            const items = await defaultCreateSitemapItems(rest);
            const fallback = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
            // prompt 详情页的薄壳不入库（现生成），git 时间已无意义 —— 改读 card JSON 的
            // dateModified，见 scripts/sitemapPromptLastmod.mjs
            const withPrompt = withPromptLastmod(items, fallback);
            const result = withPrompt.map((it) => ({ ...it, lastmod: it.lastmod || fallback }));
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
    // theme-classic 无条件把 lib/prism-include-languages.js 注册成 client module（见其
    // getClientModules），client module 走 eager 入口，于是那句 `import { Prism } from
    // 'prism-react-renderer'` 把 132 KB 单文件包拽进 main.js，全站每页都下载。
    // 实测 prism-react-renderer 82.6 KB + prismjs 26.6 KB，而它只负责注册
    // themeConfig.prism.additionalLanguages —— 本站一个都没配，纯空转。
    // 别名成 false（= 忽略该模块，产出空实现）。本站经 @docusaurus/faster 用的是 Rspack，
    // 其 ResolveAlias 类型显式含 false（config/types.d.ts），语义与 webpack 对齐——
    // 万一哪天关掉 faster 退回 webpack，这行也照常工作。代码高亮不受影响：真正渲染的 @theme/CodeBlock
    // 自己 import prism，只出现在 docs 的路由 chunk 里按需加载。
    // 两处失效都是硬报错而非静默胖回去，所以不需要额外的自检脚本：
    //   - theme-classic 改名/移除该文件 → require.resolve 抛
    //   - 有人配了 additionalLanguages（那些语言将不会被注册）→ 下面直接抛
    function dropPrismIncludeLanguagesClientModule(context) {
      // themeConfig 在 @ts-check 下是 unknown，这里只读一个字段，就地断言即可
      const prismConfig = /** @type {{ additionalLanguages?: string[] } | undefined} */ (context.siteConfig.themeConfig?.prism);
      const extra = prismConfig?.additionalLanguages ?? [];
      if (extra.length > 0) {
        throw new Error(
          `themeConfig.prism.additionalLanguages 配了 [${extra}]，但注册它们的 client module 被本插件去掉了，` +
            `代码块会静默退化成纯文本。要么清空该配置，要么删掉本插件（每页多背 ~109 KB）。`,
        );
      }
      return {
        name: "drop-prism-include-languages-client-module",
        configureWebpack(_config, isServer) {
          if (isServer) return {};
          return {
            resolve: {
              alias: { [require.resolve("@docusaurus/theme-classic/lib/prism-include-languages")]: false },
            },
          };
        },
      };
    },
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
    // theme-color — 移动 Chrome 地址栏染色。用页面炭黑底色（同 antd colorBgLayout），
    // 地址栏与页面无缝衔接
    {
      tagName: "meta",
      attributes: { name: "theme-color", content: "#14171a" },
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
      image: "/img/social-card.png",
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
        disableSwitch: false,
        // 跟随系统。SSR 只能按 defaultMode 渲染，data-theme 由 <head> 的预绘制脚本
        // 按 prefers-color-scheme 纠正，所以系统浅色的新访客首帧拿到的是「浅色页面 +
        // 构建期定死的 .aishort 暗色组件」。这一情形由 genAntdCss.mjs 生成的
        // `html[data-theme="light"] .aishort…` 选择器兜住；没有那条就别开这个。
        respectPrefersColorScheme: true,
      },
      navbar: {
        hideOnScroll: true,
        title: "AI Short",
        logo: {
          alt: "ChatGPT Shortcuts",
          src: "/img/logo.svg",
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
            to: "/docs",
            label: "使用说明",
            position: "left",
          },
          {
            type: "dropdown",
            label: "应用工具",
            position: "left",
            items: [
              {
                label: "AI 工具箱",
                href: "https://tools.newzone.top/",
              },
              {
                label: "AI 绘图提示词",
                href: "https://prompt.newzone.top/",
              },
              {
                label: "AI 思想家圆桌",
                href: "https://talk.newzone.top/",
              },
              {
                label: "浏览器插件",
                to: "/docs/extension",
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
