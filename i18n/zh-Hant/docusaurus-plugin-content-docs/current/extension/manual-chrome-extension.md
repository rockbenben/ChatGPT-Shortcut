---
sidebar_label: Chrome CRX 安裝指南
title: AI Short Chrome CRX 安裝 | 開發者模式手動安裝
description: 通過 CRX 文件手動安裝 AI Short 插件，開啓開發者模式後拖拽安裝。含常見問題解決方案。
---

# Chrome CRX 插件本地安裝指南

> 本教程假設你已從[安裝入口](./README.md)下載並解壓了 CRX 安裝包（.crx 文件在解壓出的文件夾裏）。
>
> ⚠️ **兩個常見踩坑**：
> 1. 必須把 **`.crx` 文件**（解壓出來的）拖入擴展頁，不是 zip 安裝包本身
> 2. 必須**拖入**——別點「加載已解壓的擴展程序」按鈕（那是給 zip 版用的）

## 開啓開發者模式

打開 Chrome 的「管理擴展程序」頁面，並開啓「開發者模式」。

複製以下地址粘貼到瀏覽器地址欄，按回車打開。在頁面右上角開啓「開發者模式」。

```txt
chrome://extensions
```

![](https://img.newzone.top/2024-08-12-22-05-52.png?imageMogr2/format/webp)

## 安裝插件

安裝 ChatGPT Shortcut 插件（注意 ⚠️：需要拖入 .crx 文件，請勿點擊「加載已解壓的擴展程序」）

![](https://img.newzone.top/2024-08-12-22-16-38.png?imageMogr2/format/webp)

安裝成功後，可查看[插件使用教程](./usage.md)。

## 安裝遇到了問題？

1. Windows 用戶請檢查是否已經解壓縮了下載安裝包（而不是雙擊打開）？

2. 是否已經開啓了「開發者模式」？如果沒有，請參考第二步的操作。

3. 是否是將 crx 文件拖入到「擴展程序」頁面？注意 ⚠️：不要點擊「加載已解壓的擴展程序」，必須要拖入 crx 文件。

4. 瀏覽器不允許安裝 crx 文件？嘗試安裝 zip 文件吧！[點擊此處查看 zip 安裝教程](./manual-chrome-extension-zip.md)。
