# ChatGPTCN

[ChatGPTCN](https://newzone.top/chatgpt/) 是根据领域和功能划分的 ChatGPT 快捷指令表，可对提示词进行搜索筛选。提示词主要来自 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)，会定期同步更新。如果您需要自定义提示词，可以参考 [ChatGPT 官方案例](https://platform.openai.com/examples)进行调整，同时也欢迎[投稿](https://github.com/rockbenben/ChatGPTCN/issues/new)。

## 使用说明

通过标签、关键词筛选后，点击卡片右侧的「复制」获取提示词，将其粘贴到 ChatGPT，参考中文提示定制需求，即可得到指定领域的建议输出。

![image](https://user-images.githubusercontent.com/28252913/221302238-bbe4d0a4-712a-447c-b9be-b40e8c739b1d.png)

### 标签筛选

标签内容按照提示词的领域和功能划分，可以选择多个标签。标签区域右上方的按钮是标签筛选规则切换，默认状态为 OR，即筛选含任意一个选中标签的提示词。切换到 AND 后，代表筛选同时含所有选中标签的提示词。

### 关键词搜索

关键词搜索包括标题、简介和提示词内容。

搜索功能基于 Docusaurus 的 showcase，因此 bug 也相同。移动端支持中文输入，PC 端不支持中文输入法，需通过复制中文关键词来解决。一般情况下，建议使用英文搜索。该问题已提交到 Docusaurus，正在等待修复。目前对方的回复是尝试修复 `FWIW, you should not be using Chinese anyway, since the showcase is not localized.`。

## 为什么提示词用英文？

ChatGPTCN 是为中文母语人士使用 ChatGPT 而创建的，但不得不承认，相较于中文，ChatGPT 对英文的理解更为出色。即使是国内第一个对话式大型语言模型 MOSS，也承认 MOSS 的英文回答水平比中文高，建议使用英文。

虽然使用中文可能会得到不错的结果，但如果您再次输入相同的中文指令，结果可能会千差万别。因为 ChatGPT 对中文指令的理解每次都不同，所以建议大家还是使用英文提示词以保证输出效果。

## Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory 
yarn build
```
