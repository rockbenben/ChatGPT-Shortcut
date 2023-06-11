import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "写作助理",
  "description": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
  "desc_cn": "作为一名中文写作改进助理，你的任务是改进所提供文本的拼写、语法、清晰、简洁和整体可读性，同时分解长句，减少重复，并提供改进建议。请只提供文本的更正版本，避免包括解释。请从编辑以下文本开始：[文章内容］",
  "remark": "最常使用的 prompt，用于优化文本的语法、清晰度和简洁度，提高可读性。",
  "title_en": "Writing assistant",
  "desc_en": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. Please begin by editing the following text:",
  "remark_en": "For optimising the grammar, clarity and conciseness of text and improving readability.",
  "website": null,
  "tags": [
    "favorite",
    "write"
  ],
  "id": 2,
  "weight": 23713
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
