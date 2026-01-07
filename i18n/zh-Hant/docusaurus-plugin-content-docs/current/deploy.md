---
sidebar_label: 項目部署
title: AI Short 部署指南 | Vercel/Docker 一鍵部署配置
description: 快速部署 AI Short 提示詞項目！支持 Vercel、Cloudflare、Docker 多種方式，含自定義配置與自動更新教程。
---

# 項目部署

## 配置與自定義

AI Short 是一個開源項目，你可以根據需求自由修改網站的標題、描述、提示詞等內容。以下是常見的修改選項及操作說明：

- **修改網站標題和描述**  
  要更改網站的標題和描述信息，請編輯 `docusaurus.config.js` 配置文件。

- **修改項目的使用說明和介紹**  
  項目的使用說明和介紹文件位於 `docs` 目錄下。打開該目錄中的相關文件，進行必要的修改。

- **修改主頁提示詞**  
  主頁提示詞存儲在 `src/data/prompt.json` 文件中。如果需要修改特定語言的提示詞，例如中文，可以直接編輯 `src/data/prompt_es.json` 文件。新增提示詞時，格式如下：

  ```json
  {
    "es": {
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

  **注意**：建議將 `id` 設置爲 500 以上。新增的提示詞不會有專屬頁面和評論區。如果需要爲提示詞添加專屬頁面，可以複製 `src/data/pages/prompt` 目錄下的模板文件進行修改。

- **自定義後端**  
  當前項目已連接至一個共享的後臺系統。如果你希望自行搭建後端，可以參考 `src/api` 文件夾中的接口說明。

  API 模塊結構：

  ```
  src/api/
  ├── index.ts       # 統一導出入口
  ├── config.ts      # API URL 配置
  ├── client.ts      # Axios 客戶端（含認證攔截器）
  ├── auth.ts        # 認證 API（登錄/註冊/OAuth）
  ├── prompts.ts     # 提示詞 CRUD + 搜索 + 投票
  ├── favorites.ts   # 收藏操作
  ├── myspace.ts     # 我的空間數據（核心數據源）
  ├── comments.ts    # 評論系統
  └── user.ts        # 用戶信息
  ```

  **緩存機制**：項目使用 `lscache` 結合 ETag 實現智能緩存。當服務器返回 304 Not Modified 時，直接複用本地緩存數據，減少數據傳輸。

- **多語言支持與部署**  
  在完成多語言修改後，你可以使用 `CodeUpdateHandler.py` 腳本進行批量處理。執行以下命令：

  ```bash
  python CodeUpdateHandler.py
  ```

  該腳本會根據預設規則拆分 `prompt.json` 文件，並同步更新各語言版本的主頁面和精選提示詞頁面。

## 部署說明

System Requirements:

- [Node.js 20.0](https://nodejs.org/) or later.
- macOS, Windows (including WSL), and Linux are supported.

### 本地部署

確保你已安裝 [Node.js](https://nodejs.org/)。

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build

# Update the `defaultLocale` in the `docusaurus.config.js` file, then perform a build for the desired language.
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

# Deploy for multiple languages
yarn build --locale zh-Hans && yarn build --locale en
```

### Vercel 部署

點擊下方按鈕，一鍵將 ChatGPT-Shortcut 部署到 Vercel 平臺：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**注意**：Vercel 免費版可能會因內存不足而報錯，遇到這種情況可以選擇進行單語言部署。具體操作如下：

1. 進入剛剛部署的 Vercel 項目，打開 **Settings**。
2. 在 **Build & Deployment** 部分，找到 **Build Command**，然後點擊右側的 **Override**。
3. 修改部署命令。例如，如果需要部署中文版本，可以使用 `yarn build --locale zh-Hans`；如果需要部署葡萄牙語版本，則使用 `yarn build --locale pt`。

### Cloudflare Pages 部署

點擊下方按鈕或鏈接，Fork 本項目後，按說明在 Cloudflare Pages 上部署：

👉 [Fork 本項目](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

部署步驟：

1. 登錄 [Cloudflare Pages](https://pages.cloudflare.com/)，並選擇 **"Create a project"**。
2. 綁定你剛剛 Fork 的倉庫。
3. 配置構建命令：
   - **Build command**：`yarn build --locale zh-Hans`（根據要部署的語言選擇合適的 locale，例如：葡萄牙語可使用 `yarn build --locale pt`）。
   - **Output directory**：`build`。
4. 點擊 **部署**，等待 Cloudflare Pages 完成構建和部署。

Cloudflare Pages 也會在你每次推送新代碼時自動觸發構建和部署。

### Docker 部署

如果你熟悉 Docker，可以通過以下命令快速部署：

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

或者，你也可以使用 `docker-compose`：

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## 開啓同步更新

如果你在 Vercel 上一鍵部署了自己的項目，可能會遇到一個問題，即總是提示存在更新。這是因爲 Vercel 會默認爲你創建一個新項目，而不是 fork 本項目，導致無法正確檢測更新。建議按照以下步驟重新部署：

1. 刪除原先的倉庫；
2. 使用頁面右上角的 fork 按鈕，fork 本項目；
3. 在 [Vercel 新項目頁面](https://vercel.com/new) 的 Import Git Repository 處重新選擇剛剛 fork 的項目並部署。

### 打開自動更新

> 如果遇到 Upstream Sync 執行錯誤，請手動執行一次 Sync Fork！

當你 fork 項目之後，由於 GitHub 的限制，需要手動在你 fork 後的項目的 Actions 頁面啓用 Workflows，並啓用 Upstream Sync Action。啓用後，每天會自動執行更新：

![自動更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![啓用自動更新](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 手動更新代碼

如果想手動立即更新，可以查看 [GitHub 的文檔](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)，瞭解如何讓 fork 的項目與上游代碼同步。

你可以給本項目點贊（star）/關注（watch），或者關注作者，以便及時獲得新功能更新通知。
