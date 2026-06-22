---
sidebar_label: 开启同步更新
title: AI Short 同步更新 | Fork 自动跟随上游
description: 让你的 AI Short fork 自动跟随上游更新——解决 Vercel 部署不提示更新的问题，开启 GitHub Actions 自动同步。
---

# 开启同步更新

Vercel 一键部署的项目可能一直提示存在更新——因为 Vercel 默认新建项目而非 fork，无法检测上游更新。解决方法：

1. 删除原仓库
2. 用页面右上角的 **Fork** 按钮 fork 本项目
3. 在 [Vercel 新项目页面](https://vercel.com/new) 的 Import Git Repository 处重新选择刚 fork 的项目并部署

## 打开自动更新

> 如果遇到 Upstream Sync 执行错误，请手动执行一次 Sync Fork！

Fork 后需手动在 Actions 页面启用 Workflows，并跑一次 Upstream Sync Action。启用后项目每天自动同步：

![自动更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![启用自动更新](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## 手动更新代码

想手动立即更新？参考 [GitHub 同步 fork 文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)。

也可以给本项目 star / watch，及时获得新功能更新通知。
