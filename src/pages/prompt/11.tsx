import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "总结内容",
  "description": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. Respond in Chinese. Please begin by editing the following text: ",
  "desc_cn": "将以下文字概括为 100 个字，使其易于阅读和理解。避免使用复杂的句子结构或技术术语。",
  "remark": "将文本内容总结为 100 字。",
  "title_en": "Summary",
  "desc_en": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. Please begin by editing the following text: ",
  "remark_en": "Summarize the text in 100 words.",
  "website": null,
  "tags": [
    "write"
  ],
  "id": 11,
  "weight": 2755
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
