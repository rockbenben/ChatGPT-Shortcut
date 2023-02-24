# ChatGPTCN

本地搜索报错提示标题、简介和提示词。

缺点：搜索基于 Docusaurus 的 showcase 功能，因此不能直接使用中文输入法。但可以通过复制中文来解决。一般情况下，建议使用英文搜索。该问题已提交到 Docusaurus，正在等待修复。目前对方的回复是尝试修复 `FWIW, you should not be using Chinese anyway, since the showcase is not localized.`。

## 为什么用英文

ChatGPT 对英文的理解远好于中文。即使是国内推出的模型依然是建议用英文。

中文能得到比较好的结果可是你下次再输，他很有可能出来。结果是不一样的，因为票gpt用理解出了不同的一个效果，所以建议。大家还是用英文吧。

## 搜索功能

Docusaurus 的 showcase 是仅限于标题，我这为了搜索方便，把所有内容都放入搜索范围了。

## Installation

本地执行命令：

```shell
# Installation
yarn

# Local Development
yarn start

# Build
# This command generates static content into the `build` directory and can be served using any static contents hosting service.
yarn build
```
