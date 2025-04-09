---
description: 了解如何配置和自定义 AI Short，包括修改网站标题、描述、提示词以及后端部署，助您快速适配个性化需求。  
---

# 项目部署

## 配置与自定义

AI Short 是一个开源项目，你可以根据需求自由修改网站的标题、描述、提示词等内容。以下是常见的修改选项及操作说明：

- **修改网站标题和描述**  
  要更改网站的标题和描述信息，请编辑 `docusaurus.config.js` 配置文件。

- **修改项目的使用说明和介绍**  
  项目的使用说明和介绍文件位于 `docs` 目录下。打开该目录中的相关文件，进行必要的修改。

- **修改主页提示词**  
  主页提示词存储在 `src/data/prompt.json` 文件中。如果需要修改特定语言的提示词，例如中文，可以直接编辑 `src/data/prompt_zh.json` 文件。新增提示词时，格式如下：

  ```json
  {
    "zh": {
      "title": "custom prompt",
      "prompt": "custom prompt",
      "description": "custom description",
      "remark": "custom mark"
    },
    "website": null,
    "tags": [
      "music"
    ],
    "id": 500, 
    "weight": 1
  }
  ```

  **注意**：建议将 `id` 设置为 500 以上。新增的提示词不会有专属页面和评论区。如果需要为提示词添加专属页面，可以复制 `src/data/pages/prompt` 目录下的模板文件进行修改。

- **自定义后端**  
  当前项目已连接至一个共享的后台系统。如果你希望自行搭建后端，可以参考 `src/api.js` 文件中的接口说明。

- **多语言支持与部署**  
  在完成多语言修改后，你可以使用 `CodeUpdateHandler.py` 脚本进行批量处理。执行以下命令：

  ```bash
  python CodeUpdateHandler.py
  ```

  该脚本会根据预设规则拆分 `prompt.json` 文件，并同步更新各语言版本的主页面和精选提示词页面。

## 部署说明

System Requirements:

- [Node.js 18.0](https://nodejs.org/) or later.
- macOS, Windows (including WSL), and Linux are supported.

### 本地部署

确保你已安装 [Node.js](https://nodejs.org/)。

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build

# Update the `defaultLocale` in the `docusaurus.config.js` file, then perform a build for the desired language.
yarn build --locale zh
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
yarn build --locale zh && yarn build --locale en
```

### Vercel 部署

点击下方按钮，一键将 ChatGPT-Shortcut 部署到 Vercel 平台：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**注意**：Vercel 免费版可能会因内存不足而报错，遇到这种情况可以选择进行单语言部署。具体操作如下：

1. 进入刚刚部署的 Vercel 项目，打开 **Settings**。
2. 在 **Build & Deployment** 部分，找到 **Build Command**，然后点击右侧的 **Override**。
3. 修改部署命令。例如，如果需要部署中文版本，可以使用 `yarn build --locale zh`；如果需要部署葡萄牙语版本，则使用 `yarn build --locale pt`。

## Cloudflare Pages 部署

点击下方按钮或链接，Fork 本项目后，按说明在 Cloudflare Pages 上部署：

👉 [Fork 本项目](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

部署步骤：

1. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)，并选择 **"Create a project"**。
2. 绑定你刚刚 Fork 的仓库。
3. 配置构建命令：
   - **Build command**：`yarn build --locale zh`（根据要部署的语言选择合适的 locale，例如：葡萄牙语可使用 `yarn build --locale pt`）。
   - **Output directory**：`build`。
4. 点击 **部署**，等待 Cloudflare Pages 完成构建和部署。

Cloudflare Pages 也会在你每次推送新代码时自动触发构建和部署。

### Docker 部署

如果你熟悉 Docker，可以通过以下命令快速部署：

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

或者，你也可以使用 `docker-compose`：

```yml
version: "3.8"

services:
  docsify:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## 开启同步更新

如果你在 Vercel 上一键部署了自己的项目，可能会遇到一个问题，即总是提示存在更新。这是因为 Vercel 会默认为你创建一个新项目，而不是 fork 本项目，导致无法正确检测更新。建议按照以下步骤重新部署：

1. 删除原先的仓库；
2. 使用页面右上角的 fork 按钮，fork 本项目；
3. 在 [Vercel 新项目页面](https://vercel.com/new) 的 Import Git Repository 处重新选择刚刚 fork 的项目并部署。

### 打开自动更新

> 如果遇到 Upstream Sync 执行错误，请手动执行一次 Sync Fork！

当你 fork 项目之后，由于 GitHub 的限制，需要手动在你 fork 后的项目的 Actions 页面启用 Workflows，并启用 Upstream Sync Action。启用后，每天会自动执行更新：

![自动更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![启用自动更新](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 手动更新代码

如果想手动立即更新，可以查看 [GitHub 的文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)，了解如何让 fork 的项目与上游代码同步。

你可以给本项目点赞（star）/关注（watch），或者关注作者，以便及时获得新功能更新通知。
