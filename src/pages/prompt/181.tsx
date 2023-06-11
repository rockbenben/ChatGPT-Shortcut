import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "中英互译 - 极简版",
  "description": "zh-en translation of \"X\"",
  "desc_cn": "X 部分可以为中文或者英文，chatgpt 会自动翻译成相对的语言。经测试使用直双引号 (\") 效果最佳。在使用 api 调用时 role 选择 assistant 可以降低 (不能避免) 将待翻译文本理解为指令的概率。",
  "remark": "节省 token 的翻译器 prompt，适合用于 ChatGPT API 搭建的翻译平台。来自 @Qizhen-Yang 的投稿。",
  "title_en": "English-Chinese translator②",
  "desc_en": "zh-en translation of \"X\"",
  "remark_en": "The most economical token-saving translation prompt, suitable for building translation platforms using ChatGPT API. Contributed by @Qizhen-Yang.",
  "website": null,
  "tags": [
    "contribute",
    "language"
  ],
  "id": 181,
  "weight": 961
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
