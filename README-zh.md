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

AiShort 提供一份简洁易用的 AI 指令列表，即使不了解提示词知识，也可以轻松地通过筛选和查询找到适合各种场景的提示词，从而提升你的生产力。

🚀 **一键提示词**：只需一键，即可获取由专家精选的各种提示词，发送给 ChatGPT 等 AI 语言模型，即可获得预期输出。

💻 **提升生产力**：通过使用优化过的提示词，你可以获得更精确、实用的反馈，从而有效提升生产效率。

🌍 **非英语优化**：为英文提示词提供了 12 种全球主流语言的翻译，并支持默认使用你的母语回复，从而方便非英语母语的用户理解和使用。

💾 **收藏提示词**：方便地收藏、编辑和管理你喜欢的提示词，以便将来使用。

🌐 **分享提示词**：分享你最喜欢的提示词，与他人协作，激发更多灵感。

🗳️ **社区投票系统**：与 Product Hunt 或 Reddit 类似，平台由社区驱动，最佳提示词将推送至首页。

📦 **开箱即用**：只需访问 https://www.aishort.top/ ，即可开始使用。

AiShort 的提示词来源包括网络精选、社区分享以及 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)。我们会定期更新，为你提供新的提示词和启发。如需了解如何使用 AiShort，请查阅我们的[使用手册](https://www.aishort.top/docs/guides/getting-started)。如需了解本项目的开发背景和初衷，你可以阅读 [AiShort 开发博客](https://newzone.top/posts/2023-02-27-chatgpt_shortcuts.html)。

欢迎加入我们的 Discord 和 QQ 群，一起交流想法和反馈。

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

![](https://img.newzone.top/qq736094782.jpg?imageMogr2/thumbnail/300x/format/webp)

## 浏览器扩展

AiShort（ChatGPT Shortcut）扩展兼容 Chrome、Edge、Firefox 及其他基于 Chromium 的浏览器。这款扩展不仅具备网页版 ChatGPT Shortcut 的功能，还增添了如侧边栏和自动激活窗口等独特特性。该扩展能够随 ChatGPT 或自定义页面自动启动，同时支持通过 `Alt+Shift+S` 快捷键手动激活。以下为下载渠道：

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)
- **国内下载**: [蓝奏云](https://wwva.lanzouq.com/b01lsc9vi),密码:1qow

此外，我们还提供了油猴脚本——[**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)，该脚本允许用户自定义匹配域名，在任意网站上使用 AiShort 侧边栏。但需注意，由于 ChatGPT 页面的脚本内容注入限制，脚本的侧边栏功能在 ChatGPT 页面上是通过弹窗来激活的。

## Deploy

### Deploy With Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

### Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build

# Update the `defaultLocale` in the `docusaurus.config.js` file, then perform a build for the desired language.
yarn build --locale zh
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn
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

## 网站修改

AI Short 是一个开源项目，你可以自由修改网站的名称和说明。

- 要更改页面名称，请编辑 `docusaurus.config.js` 文件。
- 要修改使用说明，请前往 `docs` 目录。
- 若要修改提示词，你可以在 `src/data/prompt.json` 中找到它们。如果你只需要修改单个语言，比如中文，可以直接编辑 `src/data/prompt_zh.json`。
- 目前，用户后端已连接到一个共用后台系统。如果需要，你可以自行建立后端，相关接口位于 `src/api.js` 文件中。

`CodeUpdateHandler.py` 是用于批量处理多语言部署的脚本。完成修改后，执行 `python CodeUpdateHandler.py`，它将根据规则将 `prompt.json` 拆分为多种语言，并同步各语言的主页面代码以及精选提示词的独立页面代码。
