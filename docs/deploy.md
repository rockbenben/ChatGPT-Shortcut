---
sidebar_label: 项目部署
title: AI Short 部署指南 | Vercel/Docker 一键部署配置
description: 快速部署 AI Short 提示词项目！支持 Vercel、Cloudflare、Docker 多种方式，含自定义配置与自动更新教程。
---

# 项目部署

> **目标读者**：想自部署或定制 AiShort 的开发者。普通用户直接用 [aishort.top](https://www.aishort.top) 即可，不需要看本文。

## 配置与自定义

AI Short 开源，可以自由修改网站标题、描述、提示词等内容：

- **网站标题和描述**：编辑 `docusaurus.config.js`

- **使用说明和介绍**：改 `docs/` 目录下的对应文件

- **主页提示词**：源数据在 `src/data/prompt.json`——一个数组，每个对象按 `zh` / `en` / `ja` 等语言代码键存放所有语言的版本。编辑该源文件后，运行下方的 `CodeUpdateHandler.py` 自动拆分生成各语言的 `prompt_<locale>.json`。新增提示词时，格式如下：

  ```json
  {
    "zh": {
      "title": "custom prompt",
      "prompt": "custom prompt",
      "description": "custom description",
      "remark": "custom mark"
    },
    "en": {
      "title": "custom prompt",
      "prompt": "custom prompt",
      "description": "custom description",
      "remark": "custom mark"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  ```

  **注意**：建议将 `id` 设置为 500 以上。新增的提示词不会有专属页面和评论区。如果需要为提示词添加专属页面，可以复制 `src/data/pages/prompt` 目录下的模板文件进行修改。

- **自定义后端**：项目默认连接一个共享后端。想自建后端，参考 `src/api` 中的接口说明。

  API 模块结构：

  ```
  src/api/
  ├── index.ts       # 统一导出入口
  ├── config.ts      # API URL 配置
  ├── client.ts      # Axios 客户端（含认证拦截器）
  ├── auth.ts        # 认证 API（登录/注册/OAuth）
  ├── prompts.ts     # 提示词 CRUD + 搜索 + 投票
  ├── favorites.ts   # 收藏操作
  ├── myspace.ts     # 我的空间数据（核心数据源）
  ├── comments.ts    # 评论系统
  └── user.ts        # 用户信息
  ```

  **缓存机制**：项目使用 `lscache` 结合 ETag 实现智能缓存。当服务器返回 304 Not Modified 时，直接复用本地缓存数据，减少数据传输。

- **多语言支持与部署**：完成多语言修改后，运行 `CodeUpdateHandler.py` 批量处理：

  ```bash
  python CodeUpdateHandler.py
  ```

  脚本会按预设规则拆分 `prompt.json`，并同步更新各语言版本的主页面和精选提示词页面。

## 离线部署（企业内网）

企业内网、政务网络等无法访问外网的环境，可使用 `offline` 分支。无需后端服务器，数据存储在浏览器本地。Vercel/Cloudflare Pages 部署时选择 `offline` 分支；Docker 部署：

```bash
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline
```

详细说明请参考[离线版文档](./guides/offline)。

## 部署说明

环境要求：

- [Node.js 20.0](https://nodejs.org/) 或更高版本
- 支持 macOS、Windows（含 WSL）和 Linux

### 本地部署

确保已安装 [Node.js](https://nodejs.org/)。

```shell
# 安装依赖
yarn

# 本地开发
yarn start

# 构建：生成静态产物到 `build` 目录
yarn build

# 修改 `docusaurus.config.js` 中的 `defaultLocale`，然后按需构建指定语言版本
yarn build --locale zh-Hans
yarn build --locale zh-Hant
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn
yarn build --locale ind
yarn build --locale th
yarn build --locale tr
yarn build --locale vi

# Deploy for multiple languages
yarn build --locale zh-Hans && yarn build --locale en
```

### Vercel 部署

点下方按钮一键部署到 Vercel：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **注意**：Vercel 免费版可能因内存不足报错。改单语言部署即可：

1. 进入 Vercel 项目，打开 **Settings**
2. 在 **Build & Deployment → Build Command** 右侧点 **Override**
3. 改成单语言命令：中文用 `yarn build --locale zh-Hans`，葡萄牙语用 `yarn build --locale pt`，其他类推

### Cloudflare Pages 部署

先 👉 [Fork 本项目](https://github.com/rockbenben/ChatGPT-Shortcut/fork)，再按以下步骤部署：

1. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)，选 **Create a project**
2. 绑定刚 Fork 的仓库
3. 配置构建：
   - **Build command**：`yarn build --locale zh-Hans`（按要部署的语言换 locale，葡萄牙语用 `yarn build --locale pt`）
   - **Output directory**：`build`
4. 点 **部署**，等待 Cloudflare Pages 构建完成

之后每次推新代码会自动触发构建和部署。

### Docker 部署

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

## 开启同步更新

Vercel 一键部署的项目可能一直提示存在更新——因为 Vercel 默认新建项目而非 fork，无法检测上游更新。解决方法：

1. 删除原仓库
2. 用页面右上角的 **Fork** 按钮 fork 本项目
3. 在 [Vercel 新项目页面](https://vercel.com/new) 的 Import Git Repository 处重新选择刚 fork 的项目并部署

### 打开自动更新

> 如果遇到 Upstream Sync 执行错误，请手动执行一次 Sync Fork！

Fork 后需手动在 Actions 页面启用 Workflows，并跑一次 Upstream Sync Action。启用后项目每天自动同步：

![自动更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![启用自动更新](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 手动更新代码

想手动立即更新？参考 [GitHub 同步 fork 文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)。

也可以给本项目 star / watch，及时获得新功能更新通知。
