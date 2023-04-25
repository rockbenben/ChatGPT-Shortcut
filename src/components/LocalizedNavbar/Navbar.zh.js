const zhNavbar = {
  hideOnScroll: true,
  title: "ChatGPT SC",
  logo: {
    alt: "ChatGPT Shortcuts",
    src: "img/logo.svg",
  },
  items: [
    {
      to: "https://newzone.top/posts/2023-02-27-chatgpt_shortcuts.html",
      label: "ChatGPT Shortcut 原理说明",
      position: "left",
    },
    {
      type: 'dropdown',
      label: '其他工具',
      position: 'left',
      items: [
        {
          label: "Chrome 扩展版",
          href: "https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj",
        },
        {
          label: 'IMGPrompt',
          href: 'https://prompt.newzone.top/',
        },
        {
          label: '文字处理',
          href: 'https://tools.newzone.top/',
        },
        {
          label: '工具收藏',
          href: 'https://nav.newzone.top',
        },
        {
          label: 'Find on Product Hunt',
          href: 'https://www.producthunt.com/posts/chatgpt-shortcut?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-chatgpt&#0045;shortcut',
        },
      ],
    },
    {
      to: "https://xq7pd3qu17.feishu.cn/share/base/form/shrcnK7oaSPaAcj1YAHfy4jo0Jh",
      label: "反馈/添加提示词",
      position: "left",
    },
    { type: "localeDropdown", position: "right" },
    {
      href: "https://github.com/rockbenben/ChatGPT-Shortcut",
      position: "right",
      className: "header-github-link",
    },
    {
      href: "https://discord.gg/PZTQfJ4GjX",
      position: "right",
      className: "header-discord-link",
    },
  ],
};

module.exports = zhNavbar;
