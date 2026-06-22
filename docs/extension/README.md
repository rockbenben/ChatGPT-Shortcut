---
sidebar_label: 安装浏览器插件
title: AI Short 插件 | ChatGPT/Gemini/Claude 侧边栏 · Chrome/Edge/Firefox 安装
description: 在 ChatGPT、Gemini、Claude、豆包等 AI 对话页的侧边栏直接调用 AiShort 提示词，不用切换标签页复制粘贴。Chrome、Edge、Firefox 一键安装。
---

# 安装浏览器插件

AiShort (ChatGPT Shortcut) 扩展把提示词库直接嵌进 ChatGPT、Gemini、Claude、豆包等 AI 对话页的侧边栏，不用再切回 aishort.top 复制粘贴。支持 Chrome、Edge、Firefox，按 `Alt + Shift + S` 快速唤出。

## 安装方式

### 1. 应用商店（推荐，一键安装）

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)（装完需做一次[授权设置](./firefox-extension-setting)，否则在 ChatGPT 上不显示侧边栏）

### 2. 商店打不开？本地安装包

从以下渠道下载，再按对应教程安装：

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)
- **国内镜像**: [Alist 云盘](https://alist.newzone.top:9003/apps/ChatGPT%20Shortcut%20Extension)；[蓝奏云（密码: 1qow）](https://wwva.lanzouq.com/b01lsc9vi)

> 📖 安装教程：[CRX 文件](./manual-chrome-extension) · [ZIP 文件](./manual-chrome-extension-zip)

## 装好后

按 `Alt + Shift + S` 唤出，或点击工具栏图标。详细用法见[使用教程](./usage)。

## 油猴脚本（Tampermonkey）

除了插件形式，我们还提供了 [**ChatGPT Shortcut Anywhere 油猴脚本**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)。
油猴（Tampermonkey）是一款浏览器扩展，可以让用户运行自定义脚本来增强网页功能。

通过该脚本，你可以在任意网站调出 AiShort 侧边栏。但需注意，由于 ChatGPT 官方页面限制脚本注入，在该页面中，脚本将通过**弹窗**而非侧边栏的形式运行。

启用 AiShort 侧边栏后，你会在支持网页的右下角看到一个绿色图标开关。点击此图标，便可开启或关闭侧边栏。目前默认支持 ChatGPT、Gemini、Claude、豆包等。

![](/img/docs/zh/extension-sidebar.webp)
