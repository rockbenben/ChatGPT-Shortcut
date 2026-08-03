---
sidebar_label: Firefox 插件設置
title: AI Short Firefox 設置 | 原生側邊欄與快捷鍵
description: Firefox 版 AI Short 設置指南：自 v4.4.0 起與 Chrome 對齊，原生側邊欄免逐站授權，Alt+Shift+D 開關側邊欄。
---

# Firefox 插件設置

Firefox 版自 v4.4.0 起與 Chrome 版對齊：同樣是**側邊欄、彈窗、獨立視窗**三種顯示模式，提示詞庫隨擴展本地打包。

擴展只申請 `storage` 權限，不讀取也不修改你訪問的網頁，因此**不需要**再逐個網站授權。

> 舊版（v4.3 及以前）靠內容腳本把側邊欄注入 ChatGPT 頁面，裝完得右鍵圖標選「始終允許在此網站上運行」。新版已移除該機制，升級後可忽略這一步。

## 快捷鍵

- `Alt + Shift + S`：按當前顯示模式打開擴展
- `Alt + Shift + D`：開關 Firefox 原生側邊欄

在 `about:addons` → 右上角齒輪 → 「管理擴展快捷鍵」中可自定義。

## 設置界面

在 Firefox 工具欄上把 AI Short 固定出來（Pin to Toolbar），再從擴展中心進入 AI Short 的「選項」（Options），即可切換語言、顯示模式與深色模式。

各項設置的含義見[插件使用教程](./usage)。
