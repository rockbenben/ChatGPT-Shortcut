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

AiShort(ChatGPT Shortcut) 提供了一份简洁易用的 AI 提示词列表，旨在帮助用户快速找到适用于不同场景的提示词，即使是提示词新手，也能轻松使用，全面提升学习和工作的效率。

🚀 **一键提示词**：精选各类专业提示词，只需一键操作即可发送给 ChatGPT、DeepSeek 等 AI 模型，快速获得理想答案。

💻 **提升生产力**：使用优化后的提示词，获得更精准、实用的反馈，高效完成学习和工作任务。

🌍 **多语言支持**：为英文提示词提供 12 种主流语言翻译，并支持默认使用母语回复，让非英语用户也能无障碍使用。

💾 **收藏与编辑**：可随时收藏、编辑和管理喜欢的提示词，方便日后调用。

📤 **导出备份**：一键导出所有提示词，支持 JSON 格式备份，方便迁移和本地保存。

🌟 **分享提示词**：与他人分享你喜欢的提示词，激发更多创意与灵感。

🗳️ **社区投票**：类似 Product Hunt 或 Reddit，由社区投票驱动，优秀提示词将推荐至首页。

📦 **开箱即用**：无需复杂配置，访问 [aishort.top](https://www.aishort.top/) 即可立即体验。

AiShort(ChatGPT Shortcut) 的提示词来源于网络精选、社区分享，以及 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)。我们会定期更新，持续为你带来新的提示词和灵感。如需了解详细使用方法，请查看[使用手册](https://www.aishort.top/docs/guides/getting-started)。

欢迎加入我们的社群，与大家一起交流想法与反馈：

<a href="https://t.me/aishort_top">
   <img src="https://img.shields.io/badge/Telegram-Group-blue?logo=telegram&style=for-the-badge" alt="join Telegram group" />
</a>

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

![](https://img.newzone.top/qq736094782.jpg?imageMogr2/thumbnail/300x/format/webp)

## 浏览器扩展

AiShort（ChatGPT Shortcut）扩展可以帮助您随时调用 AIShort 提示词库，提升工作与学习效率。它支持 Chrome、Edge、Firefox 等主流浏览器，并提供侧边栏与快捷键功能，您可以通过 `Alt + Shift + S` 快速唤出插件。以下为下载渠道：

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

此外，我们还提供了油猴脚本——[**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)，该脚本允许用户自定义匹配域名，在任意网站上使用 AiShort 侧边栏。但需注意，由于 ChatGPT 页面的脚本内容注入限制，脚本的侧边栏功能在 ChatGPT 页面上是通过弹窗来激活的。

## Deploy

关于如何通过 本地环境、Vercel、Cloudflare、Docker 进行部署，以及项目修改的详细步骤，请参考 [ChatGPT Shortcut 部署说明](https://www.aishort.top/docs/deploy)。

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

如果想手动立即更新，可以查看 [GitHub 文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)，了解如何让 fork 的项目与上游代码同步。

⭐ Star / 👀 关注此项目或关注作者，以便及时获得新功能更新通知。
