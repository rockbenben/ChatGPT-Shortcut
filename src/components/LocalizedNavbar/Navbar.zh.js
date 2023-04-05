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
      label: "ChatGPT 使用说明",
      position: "left",
    },
    {
      to: "https://nav.newzone.top",
      label: "开源工具导航",
      position: "left",
    },
    {
      href: 'https://www.producthunt.com/posts/chatgpt-shortcut?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-chatgpt&#0045;shortcut',
      label: 'Find on Product Hunt',
      target: '_blank',
      position: 'left',
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
