# 项目部署

## Deploy With Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build
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

## 项目修改说明

AI Short 是一个开源项目，你可以自由修改网站的名称和说明。

- 要更改页面名称，请编辑 `docusaurus.config.js` 文件。
- 要修改使用说明，请前往 `docs` 目录。
- 若要修改提示词，你可以在 `src/data/prompt.json` 中找到它们。如果你只需要修改单个语言，比如中文，可以直接编辑 `src/data/prompt_zh.json`。
- 目前，用户后端已连接到一个共用后台系统。如果需要，你可以自行建立后端，相关接口位于 `src/api.js` 文件中。

`CodeUpdateHandler.py` 是用于批量处理多语言部署的脚本。完成修改后，执行 `python CodeUpdateHandler.py`，它将根据规则将 `prompt.json` 拆分为多种语言，并同步各语言的主页面代码以及精选提示词的独立页面代码。
