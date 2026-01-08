<h1 align="center">
    <a href="https://www.aishort.top/">
        <img src="static/img/logo.png" alt="AiShort Logo" width="120" height="120" />
    </a>
    <br>
    AiShort (ChatGPT Shortcut) - 简单好用的 AI 提示词管理工具
</h1>

<p align="center">
    <a href="https://github.com/rockbenben/ChatGPT-Shortcut/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/rockbenben/ChatGPT-Shortcut?color=blue&label=License" alt="License" />
    </a>
    <a href="https://github.com/rockbenben/ChatGPT-Shortcut/stargazers">
        <img src="https://img.shields.io/github/stars/rockbenben/ChatGPT-Shortcut?style=social" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/rockbenben/ChatGPT-Shortcut/releases">
        <img src="https://img.shields.io/github/v/release/rockbenben/ChatGPT-Shortcut?color=green" alt="Version" />
    </a>
    <a href="https://discord.gg/PZTQfJ4GjX">
        <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=flat" alt="Discord" />
    </a>
</p>

<p align="center">
    <a href="./README.md">English</a> | 简体中文 | <a href="./README-lang/README-zh-hant.md">繁體中文</a> |
<a href="./README-lang/README-ja.md">日本語</a> |
<a href="./README-lang/README-ko.md">한국어</a> |
<a href="./README-lang/README-fr.md">Français</a> |
<a href="./README-lang/README-de.md">Deutsch</a> |
<a href="./README-lang/README-es.md">Español</a> |
<a href="./README-lang/README-it.md">Italiano</a> |
<a href="./README-lang/README-ru.md">Русский</a> |
<a href="./README-lang/README-pt.md">Português</a> |
<a href="./README-lang/README-ind.md">Indonesia</a> |
<a href="./README-lang/README-ar.md">العربية</a> |
<a href="./README-lang/README-tr.md">Türkçe</a> |
<a href="./README-lang/README-vi.md">Tiếng Việt</a> |
<a href="./README-lang/README-th.md">ภาษาไทย</a> |
<a href="./README-lang/README-hi.md">हिन्दी</a> |
<a href="./README-lang/README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>AiShort (ChatGPT Shortcut) 提供精选的 AI 提示词列表，是你的 AI 提示词指令管理工具，帮助你快速找到适用于各种场景的提示词，让生产力加倍！</em>
</p>

## ⚡ 30 秒快速开始

1. 打开 [aishort.top](https://www.aishort.top/)
2. 搜索或浏览你需要的提示词
3. 点击「复制」，粘贴到任意 AI 模型

![AiShort Interface](static/img/docs/interface-home.png)

就这么简单！更多功能请查看[使用手册](https://www.aishort.top/docs/guides/getting-started)。

## 为什么选择 AiShort？

AiShort（ChatGPT Shortcut）提供精选的 AI 提示词列表，帮助你快速找到适用于各种场景的提示词。

### 核心功能

🚀 **一键提示词** - 精选专业提示词，一键复制即用。

🔍 **智能搜索** - 通过标签筛选和关键词快速找到所需提示词。

🌍 **18 种语言** - 所有提示词提供多语言翻译，支持母语回复。

📦 **开箱即用** - 无需注册，访问即可使用。

### 高级功能（登录后）

📂 **我的收藏** - 收藏喜欢的提示词，支持拖拽排序和自定义标签。

✏️ **自定义提示词** - 创建、编辑和管理你自己的提示词。

🗳️ **社区互动** - 分享提示词到社区，参与投票。

📤 **导出备份** - 一键导出所有提示词为 JSON 文件。

🔐 **多种登录方式** - 支持账号密码、Google 和无密码邮件链接。

## 浏览器扩展

AiShort 扩展让你随时调用提示词库。支持 Chrome、Edge、Firefox，使用 `Alt + Shift + S` 快速唤出侧边栏。

- **Chrome**: [Chrome 应用商店](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Edge 扩展商店](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox 附加组件](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [下载地址](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

还提供油猴脚本 [ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)，可在任意网站使用 AiShort 侧边栏。

## 部署

支持通过 Vercel、Cloudflare Pages、Docker 或本地环境部署。详见[部署指南](https://www.aishort.top/docs/deploy)。

[![Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

## 同步更新

如果通过 Vercel 一键部署，可能会遇到持续提示更新的问题。这是因为 Vercel 默认创建新项目而非 fork。解决方法：

1. 删除原有仓库
2. 使用右上角 Fork 按钮 fork 本项目
3. 在 [Vercel](https://vercel.com/new) 重新选择 fork 的项目部署

### 自动更新

Fork 后，在 Actions 页面启用 Workflows 并激活 Upstream Sync Action，即可每日自动更新。

![自动更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

### 手动更新

参考 [GitHub 文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) 同步 fork 项目。

## 社群交流

欢迎加入社群交流想法与反馈：

<a href="https://t.me/aishort_top">
   <img src="https://img.shields.io/badge/Telegram-Group-blue?logo=telegram&style=for-the-badge" alt="Telegram" />
</a>
<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="Discord" />
</a>

![](https://img.newzone.top/qq963752577.jpg?imageMogr2/thumbnail/300x/format/webp)

---

⭐ Star 本项目，获取新功能更新通知！
