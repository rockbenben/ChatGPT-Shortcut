---
sidebar_label: 安裝瀏覽器插件
title: AI Short 插件 | ChatGPT/Gemini/Claude 側邊欄 · Chrome/Edge/Firefox 安裝
description: 在瀏覽器側邊欄直接調用 AiShort 提示詞，與 ChatGPT、Gemini、Claude 對話頁並排，不用切換標籤頁複製粘貼。Chrome、Edge、Firefox 一鍵安裝。
---

# 安裝瀏覽器插件

AI Short（ChatGPT Shortcut）擴展把 5000+ 提示詞隨擴展本地打包，以**側邊欄、彈窗、獨立視窗**三種形式貼著 ChatGPT、Gemini、Claude、DeepSeek 等對話頁使用，不用再切回 aishort.top 複製粘貼。支持 Chrome、Edge、Firefox，按 `Alt + Shift + S` 快速喚出。

## 安裝方式

### 1. 應用商店（推薦，一鍵安裝）

- **Chrome**: [Chrome Web Store](https://chromewebstore.google.com/detail/ai-short-ai-prompt-shortc/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/ai-short-ai-prompt-shor/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/firefox/addon/aishort/)（自 v4.4.0 起與 Chrome 版對齊，差異見 [Firefox 插件設置](./firefox-extension-setting)）

### 2. 商店打不開？本地安裝包

從以下渠道下載，再按對應教程安裝：

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)
- **國內鏡像**: [Alist 雲盤](https://alist.newzone.top:9003/apps/ChatGPT%20Shortcut%20Extension)；[藍奏雲（密碼: 1qow）](https://wwva.lanzouq.com/b01lsc9vi)

> 📖 安裝教程：[CRX 文件](./manual-chrome-extension) · [ZIP 文件](./manual-chrome-extension-zip)

## 裝好後

按 `Alt + Shift + S` 喚出，或點擊工具欄圖標。詳細用法見[使用教程](./usage)。

## 油猴腳本（Tampermonkey）

除了插件形式，我們還提供了 [**ChatGPT Shortcut Anywhere 油猴腳本**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)。
油猴（Tampermonkey）是一款瀏覽器擴展，可以讓用戶運行自定義腳本來增強網頁功能。

通過該腳本，您可以在任意網站調出 AiShort 側邊欄。但需注意，由於 ChatGPT 官方頁面限制腳本注入，在該頁面中，腳本將通過**彈窗**而非側邊欄的形式運行。

啓用 AiShort 側邊欄後，你會在支持網頁的右下角看到一個綠色圖標開關。點擊此圖標，便可開啓或關閉側邊欄。目前默認支持 ChatGPT、Gemini、Claude、豆包等。

![](/img/docs/extension-sidebar.webp)
