<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="./README.md">English</a> | 中文 |
<a href="./README-lang/README-es.md">Español</a> |
<a href="./README-lang/README-ja.md">日本語</a> |
<a href="./README-lang/README-ko.md">한국어</a> |
<a href="./README-lang/README-fr.md">Français</a> |
<a href="./README-lang/README-de.md">Deutsch</a> |
<a href="./README-lang/README-it.md">Italiano</a> |
<a href="./README-lang/README-ru.md">Русский</a> |
<a href="./README-lang/README-pt.md">Português</a> |
<a href="./README-lang/README-ar.md">العربية</a> |
<a href="./README-lang/README-hi.md">हिन्दी</a> |
<a href="./README-lang/README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>ChatGPT Shortcut，让生产力加倍的 ChatGPT 快捷指令</em>
</p>

## Why use AiShort?

🚀 **流程简化**：AiShort 提供一份简便的指令列表，可迅速筛选和查询适应各种场景的提示词，从而帮助用户精简操作过程。

💻 **提升生产力**：用户可以通过使用优化过的提示词获得更精确、实用的反馈，进而提升生产效率。

🌍 **非英语优化**：虽然提示词仍以英文呈现，但已提供了中、日、韩等语言的翻译，并支持默认当前语言回复，方便非英语母语的用户理解和使用。

🎓 **适合新手**：对于初学者，只需复制并稍做修改提示词，然后发送给 ChatGPT，即可获取预期输出。

🆕 **定时更新**：AiShort 的提示词源自网络精选、用户投稿以及 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) ，并会定时更新，为用户带来新的提示词和思维启发。

📦 **开箱即用**：<https://www.aishort.top/>

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

你可以查看[使用手册](https://www.aishort.top/docs/guides/getting-started)来了解 AiShort 的使用方法。此外，你还可以阅读 [AiShort 开发博客](https://newzone.top/posts/2023-02-27-chatgpt_shortcuts.html) 了解本项目的开发思路和初衷。

## 浏览器扩展

ChatGPT Shortcut 浏览器扩展支持 Chrome 和 Edge，功能与网页版基本一致，并定期进行更新。

<a href="https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj">
  <img src="https://img.newzone.top/2023-06-05-12-28-49.png?imageMogr2/format/webp"  alt="Chrome" valign="middle" /></a>

<a href="https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin">
  <img src="https://img.newzone.top/2023-06-05-12-26-20.png?imageMogr2/format/webp" alt="Edge" valign="middle" /></a>

## Deploy

### Deploy With Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

### Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build
```

## 开启同步更新

如果你在 Vercel 上一键部署了自己的项目，可能会遇到一个问题，即总是提示存在更新。这是因为 Vercel 会默认为你创建一个新项目，而不是 fork 本项目，导致无法正确检测更新。建议按照以下步骤重新部署：

1. 删除原先的仓库；
2. 使用页面右上角的 fork 按钮，fork 本项目；
3. 在 [Vercel 新项目页面](https://vercel.com/new) 的 Import Git Repository 处重新选择刚刚 fork 的项目并部署。

### 打开自动更新

> 如果遇到 Upstream Sync 执行错误，请手动执行一次 Sync Fork！

当你 fork 项目之后，由于 GitHub 的限制，需要手动在你 fork 后的项目的 Actions 页面启用 Workflows，并启用 Upstream Sync Action。启用后，每天会自动执行更新：

![自动更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![启用自动更新](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 手动更新代码

如果想手动立即更新，可以查看 [GitHub 的文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)，了解如何让 fork 的项目与上游代码同步。

你可以给本项目点赞（star）/关注（watch），或者关注作者，以便及时获得新功能更新通知。
