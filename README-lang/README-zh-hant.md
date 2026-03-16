<h1 align="center">
    <a href="https://www.aishort.top/">
        <img src="../static/img/logo.png" alt="AiShort Logo" width="120" height="120" />
    </a>
    <br>
    AiShort (ChatGPT Shortcut) - 簡單好用的 AI 提示詞管理工具
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
    <a href="../README.md">English</a> | <a href="../README-zh.md">简体中文</a> | 繁體中文 |
<a href="./README-ja.md">日本語</a> |
<a href="./README-ko.md">한국어</a> |
<a href="./README-fr.md">Français</a> |
<a href="./README-de.md">Deutsch</a> |
<a href="./README-es.md">Español</a> |
<a href="./README-it.md">Italiano</a> |
<a href="./README-ru.md">Русский</a> |
<a href="./README-pt.md">Português</a> |
<a href="./README-ind.md">Indonesia</a> |
<a href="./README-ar.md">العربية</a> |
<a href="./README-tr.md">Türkçe</a> |
<a href="./README-vi.md">Tiếng Việt</a> |
<a href="./README-th.md">ภาษาไทย</a> |
<a href="./README-hi.md">हिन्दी</a> |
<a href="./README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>AiShort (ChatGPT Shortcut) - 讓生產力加倍的 AI 提示詞工具</em>
</p>

## ⚡ 30 秒快速開始

1. 打開 [aishort.top](https://www.aishort.top/zh-Hant/)
2. 搜尋或瀏覽你需要的提示詞
3. 點擊「複製」，貼上到任意 AI 模型

![AiShort Interface](../static/img/docs/interface-home.png)

就這麼簡單！更多功能請查看[使用手冊](https://www.aishort.top/zh-Hant/docs/guides/getting-started)。

## 為什麼選擇 AiShort？

AiShort（ChatGPT Shortcut）提供精選的 AI 提示詞列表，幫助你快速找到適用於各種場景的提示詞。

### 核心功能

🚀 **一鍵提示詞** - 精選專業提示詞，一鍵複製即用。

🔍 **智能搜尋** - 通過標籤篩選和關鍵字快速找到所需提示詞。

🌍 **18 種語言** - 所有提示詞提供多語言翻譯，支持母語回覆。

📦 **開箱即用** - 無需註冊，訪問即可使用。

### 高級功能（登入後）

📂 **我的收藏** - 收藏喜歡的提示詞，支持拖曳排序和自定義標籤。

✏️ **自定義提示詞** - 創建、編輯和管理你自己的提示詞。

🗳️ **社群互動** - 分享提示詞到社群，參與投票。

📤 **匯出備份** - 一鍵匯出所有提示詞為 JSON 文件。

🔐 **多種登入方式** - 支持帳號密碼、Google 和無密碼郵件連結。

## 瀏覽器擴充功能

AiShort 擴充功能讓你隨時調用提示詞庫。支持 Chrome、Edge、Firefox，使用 `Alt + Shift + S` 快速喚出側邊欄。

- **Chrome**: [Chrome 應用商店](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Edge 擴充商店](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox 附加元件](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [下載位址](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

還提供油猴腳本 [ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)，可在任意網站使用 AiShort 側邊欄。

## 部署

支持通過 Vercel、Cloudflare Pages、Docker 或本地環境部署。詳見[部署指南](https://www.aishort.top/zh-Hant/docs/deploy)。

[![Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

## 同步更新

如果通過 Vercel 一鍵部署，可能會遇到持續提示更新的問題。這是因為 Vercel 默認創建新項目而非 fork。解決方法：

1. 刪除原有倉庫
2. 使用右上角 Fork 按鈕 fork 本項目
3. 在 [Vercel](https://vercel.com/new) 重新選擇 fork 的項目部署

### 自動更新

Fork 後，在 Actions 頁面啟用 Workflows 並激活 Upstream Sync Action，即可每日自動更新。

![自動更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

### 手動更新

參考 [GitHub 文檔](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) 同步 fork 項目。

## 社群交流

歡迎加入社群交流想法與反饋：

<a href="https://t.me/aishort_top">
   <img src="https://img.shields.io/badge/Telegram-Group-blue?logo=telegram&style=for-the-badge" alt="Telegram" />
</a>
<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="Discord" />
</a>

![](https://img.newzone.top/qrcode/qq1092926837.jpg?imageMogr2/thumbnail/300x/format/webp)

---

⭐ Star 本項目，獲取新功能更新通知！
