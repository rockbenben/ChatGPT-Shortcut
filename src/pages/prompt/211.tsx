import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "文章高亮",
  "description": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. Here is the text: [文章]",
  "desc_cn": "仔细阅读以下文本，并使用双星号（**）突出显示要强调的单词或短语。不要改变原始文本或进行摘要。",
  "remark": "高亮会增加文章的可读性。不过，ChatGPT 默认显示 Markdown 语法。结果出来后，需要手动框选高亮部分。我也试过用其他符号替代高亮提示，但效果不太好。因此，暂时先使用这个版本。",
  "title_en": "Highlight the article",
  "desc_en": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. Here is the text: []",
  "remark_en": "Highlight augments the legibility of a written composition. Nonetheless, ChatGPT defaults to exhibit Markdown syntax, obliging one to manually select the highlighted segment after the output has been generated.",
  "website": null,
  "tags": [
    "personal",
    "write"
  ],
  "id": 211,
  "weight": 372
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
