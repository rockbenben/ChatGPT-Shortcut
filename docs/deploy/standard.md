---
sidebar_label: 标准部署
title: AI Short 标准部署 | 本地构建、Vercel、Cloudflare、Docker
description: AI Short 标准部署教程，复用官方共享后端，支持本地构建、Vercel 一键部署、Cloudflare Pages 与 Docker，开箱即用。
---

# 标准部署

复用官方共享后端，开箱即用。先 fork 本项目，再选一种方式部署。

**环境要求**：[Node.js 20.0](https://nodejs.org/) 或更高版本，支持 macOS、Windows（含 WSL）和 Linux。

![标准部署拓扑：fork 项目后，用本地构建、Vercel、Cloudflare Pages 或 Docker 任选一种方式部署，开箱即用地复用官方共享后端（登录、收藏、社区、评论、跨设备同步）](/img/docs/zh/standard-deploy-topology.svg)

## 本地构建

```shell
# 安装依赖
yarn

# 本地开发
yarn start

# 构建：分块构建全部 18 种语言（一次性构建会 OOM），产物在 build 目录；只要一种语言见下方 --locale
yarn build
```

> **只构建部分语言**：用 `yarn build --locale <locale>`（如 `zh-Hans`、`en`、`ja`……完整 locale 列表见 `scripts/i18nLocales.mjs`）。多语言可串联：`yarn build --locale zh-Hans && yarn build --locale en`。

## Vercel 部署

点下方按钮一键部署到 Vercel：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **注意**：Vercel 免费版可能因内存不足报错。改单语言部署即可——进入项目 **Settings → Build & Deployment → Build Command**，点 **Override**，改成单语言命令（中文 `yarn build --locale zh-Hans`，葡萄牙语 `yarn build --locale pt`，其他类推）。

## Cloudflare Pages 部署

先 👉 [Fork 本项目](https://github.com/rockbenben/ChatGPT-Shortcut/fork)，再按以下步骤部署：

1. 打开 [Pages 创建页](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages)，选 **Connect to Git**。若落到 Create a Worker 页面，Pages 入口在底部的 **Get started**
2. 绑定刚 Fork 的仓库
3. 配置构建：
   - **Build command**：`yarn build --locale zh-Hans`（按要部署的语言换 locale，葡萄牙语用 `yarn build --locale pt`）
   - **Output directory**：`build`
   - **Environment variables**：`YARN_VERSION` = `1.22.22`
4. 点 **部署**，等待 Cloudflare Pages 构建完成

> **`YARN_VERSION` 不能省**：Cloudflare 的 v3 构建系统默认 Yarn 4.9.1，且不再像 v2 那样从 `yarn.lock` 推断版本。本仓库是 Yarn Classic 的 v1 lockfile，不锁版本就会被 Yarn 4 接管。Node 不用设 —— v3 默认 22.16.0，已满足本项目要求的 20 以上。

之后每次推新代码会自动触发构建和部署。

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
