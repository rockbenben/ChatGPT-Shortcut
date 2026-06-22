---
sidebar_label: 開啟同步更新
title: AI Short 同步更新 | Fork 自動跟隨上游
description: 讓你的 AI Short fork 自動跟隨上游更新——解決 Vercel 部署不提示更新的問題，開啟 GitHub Actions 自動同步。
---

# 開啟同步更新

Vercel 一鍵部署的項目可能一直提示存在更新——因為 Vercel 預設新建項目而非 fork，無法偵測上游更新。解決方法：

1. 刪除原儲存庫
2. 用頁面右上角的 **Fork** 按鈕 fork 本項目
3. 在 [Vercel 新項目頁面](https://vercel.com/new) 的 Import Git Repository 處重新選擇剛 fork 的項目並部署

## 開啟自動更新

> 如果遇到 Upstream Sync 執行錯誤，請手動執行一次 Sync Fork！

Fork 後需手動在 Actions 頁面啟用 Workflows，並跑一次 Upstream Sync Action。啟用後項目每天自動同步：

![自動更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![啟用自動更新](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## 手動更新程式碼

想手動立即更新？參考 [GitHub 同步 fork 文檔](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)。

也可以給本項目 star / watch，及時獲得新功能更新通知。
