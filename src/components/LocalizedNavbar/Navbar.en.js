const enNavbar = {
  hideOnScroll: true,
  title: "ChatGPT SC",
  logo: {
    alt: "ChatGPT Shortcuts",
    src: "img/logo.svg",
  },
  items: [
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

module.exports = enNavbar;
