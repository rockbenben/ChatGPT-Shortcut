# ChatGPT Shortcut

[ChatGPT Shortcut](https://newzone.top/chatgpt/) 是根据领域和功能划分的 ChatGPT 快捷指令表，可通过标签筛选、关键词搜索和一键复制来使用提示词，旨在简化你的工作流程并提高生产力。

提示词来自精选和 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)，定期更新。如需自定义提示词，可以参考 ChatGPT Shortcut 和 [ChatGPT Prompt Examples](https://platform.openai.com/examples) 进行调整，同时也欢迎[投稿](https://github.com/rockbenben/ChatGPT-Shortcut/issues/new)。

## 使用说明

ChatGPT Shortcut 页面默认显示所有提示词。通过标签筛选、关键词搜索进行过滤，然后点击卡片右侧的「复制」获取提示词，将其粘贴到 ChatGPT，参考中文提示调整需求文本，即可得到指定领域的建议输出。

![image](https://user-images.githubusercontent.com/28252913/221407055-839e9a59-d084-4352-8716-fef6ef859673.png)

### 标签筛选

标签区按提示词的领域和功能进行划分，可根据不同场景和需求进行选择。与标签区右上方的「标签筛选规则切换」按钮配合使用，可进行多标签筛选。默认状态为 OR，即选中标签下的所有提示词。切换到 AND 后，将筛选出具备已选中的多个标签的提示词。

### 关键词搜索

关键词搜索范围包括提示词的标题、简介、内容和中文翻译。输入关键词后，提示词展示区将立即展示筛选出的内容。如果已选中标签，则关键词搜索仅限于标签筛选范围内。

### 展示区复制

通过标签筛选和关键词搜索，点击卡片右上方的「复制」按钮即可获取提示词，将其粘贴到 ChatGPT 中，参考中文提示调整需求文本，即可得到指定领域的回复。如果提示词中的中文备注没有解释清楚，可以点击提示词的绿色标题查看来源网页。

### 语言切换

默认情况下，提示词内容会显示为英文。如果你想查看中文释义，可以点击提示词内容将其切换到中文，再次点击即可切回英文。请注意，语言切换只在文字上点击有效，点击空白区域无效。

如果想让提示词默认显示为中文，你可以点击导航栏右侧的 `CN` 按钮。需要注意的是，即使切换到中文翻译，复制按钮也仅针对英文提示词复制。下方会有解释原因。

## 常见问题

### 为什么提示词用英文？

ChatGPT Shortcut 是为方便中文母语人士使用 ChatGPT 而创建的，但是提示词却全部是英文。这是因为相较于中文，ChatGPT 对英文的理解更为出色。即使是国内第一个对话式大型语言模型 MOSS，也承认 MOSS 的英文回答水平比中文高，建议使用英文。

使用中文提示词可能会得到不错的结果，但是当你再次输入相同的中文提示时，结果可能与之前大相径庭。因为 ChatGPT 对中文的理解每次都不同，所以建议大家还是使用英文提示词以保证输出效果。此外，英文提示词带来的回复也很可能是英文的，你可以在提示词结尾添加 `respond in Chinese`，将回复指定为中文。

### 搜索无法输入中文

搜索功能基于 Docusaurus 的 showcase，因此存在与其相同的 bug。移动端支持中文输入，而 PC 端使用中文输入法会丢失焦点，需通过复制中文关键词来解决，或者使用浏览器自带的全文搜索功能。一般情况下，建议使用英文搜索。已将该问题提交给 Docusaurus，正在等待修复。目前对方的回复是尝试修复 `FWIW, you should not be using Chinese anyway, since the showcase is not localized`。

### 输出虚假信息

ChatGPT 虽然非常强大，但并不是万能的。有时它会输出虚假信息。例如，当我需要将上百条信息录入到 ChatGPT Shortcut 中时，我让 ChatGPT 按指定格式转换数据。但是在转换过程中，我发现其中一些信息被 ChatGPT 误写。例如，在文本中一条标签是 `movie critic`，而 ChatGPT 将其更改为 `film critic`。尽管这在文本中不会造成什么影响，但放在代码中会报错。因此，在使用 ChatGPT 时，务必检查其输出内容。

### 提示词不好用

所有提示词均来自互联网，会定期进行更新。虽然我测试过每一条提示词，但实际效果会因人而异。如果你发现任何错误或有好的提示词，请随时向我[反馈或投稿](https://github.com/rockbenben/ChatGPT-Shortcut/issues/new)。我将尽力解决问题，并逐步将新的提示词更新到网站中，让我们的工作效率持续提升。

## Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build
```
