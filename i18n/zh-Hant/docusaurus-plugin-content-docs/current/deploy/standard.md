---
sidebar_label: 標準部署
title: AI Short 標準部署 | 本地建置、Vercel、Cloudflare、Docker
description: AI Short 標準部署教程，復用官方共享後端，支持本地建置、Vercel 一鍵部署、Cloudflare Pages 與 Docker，開箱即用。
---

# 標準部署

復用官方共享後端，開箱即用。先 fork 本項目，再選一種方式部署。

**環境要求**：[Node.js 20.0](https://nodejs.org/) 或更高版本，支援 macOS、Windows（含 WSL）和 Linux。

![標準部署拓撲：fork 專案後，用本地建置、Vercel、Cloudflare Pages 或 Docker 任選一種方式部署，開箱即用地複用官方共享後端（登入、收藏、社群、評論、跨裝置同步）](/img/docs/zh/standard-deploy-topology.svg)

## 本地建置

```shell
# 安裝依賴
yarn

# 本地開發
yarn start

# 建置：分塊建置全部 18 種語言（一次建置會 OOM），產物在 build 目錄；只要一種語言見下方 --locale
yarn build
```

> **只建置部分語言**：用 `yarn build --locale <locale>`（如 `zh-Hans`、`en`、`ja`……完整 locale 列表見 `scripts/i18nLocales.mjs`）。多語言可串聯：`yarn build --locale zh-Hans && yarn build --locale en`。

## Vercel 部署

點下方按鈕一鍵部署到 Vercel：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **注意**：Vercel 免費版可能因記憶體不足報錯。改單語言部署即可——進入項目 **Settings → Build & Deployment → Build Command**，點 **Override**，改成單語言命令（中文 `yarn build --locale zh-Hans`，葡萄牙語 `yarn build --locale pt`，其他類推）。

## Cloudflare Pages 部署

先 👉 [Fork 本項目](https://github.com/rockbenben/ChatGPT-Shortcut/fork)，再按以下步驟部署：

1. 開啟 [Pages 建立頁](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages)，選 **Connect to Git**。若落到 Create a Worker 頁面，Pages 入口在底部的 **Get started**
2. 綁定剛 Fork 的儲存庫
3. 配置建置：
   - **Build command**：`yarn build --locale zh-Hans`（按要部署的語言換 locale，葡萄牙語用 `yarn build --locale pt`）
   - **Output directory**：`build`
   - **Environment variables**：`YARN_VERSION` = `1.22.22`
4. 點 **部署**，等待 Cloudflare Pages 建置完成

> **`YARN_VERSION` 不能省**：Cloudflare 的 v3 建置系統預設 Yarn 4.9.1，且不再像 v2 那樣從 `yarn.lock` 推斷版本。本倉庫是 Yarn Classic 的 v1 lockfile，不鎖版本就會被 Yarn 4 接管。Node 不用設 —— v3 預設 22.16.0，已滿足本專案要求的 20 以上。

之後每次推新程式碼會自動觸發建置和部署。

## Docker 部署

一行命令部署：

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

或用 `docker-compose`：

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
