import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "总结：核心提炼",
  "description": "Your previous explanation was accurate and comprehensive, but hard to remember. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary in Chinese?",
  "desc_cn": "你刚刚的表述非常准确和全面 但是难以记住 能不能进行粗略而不那么精准 但整体正确的简化通俗化表述",
  "remark": "对于 AI 给出的复杂回复进行简化总结，减掉一些过于细节的“必要性信息”。来自 @hanson-reas 的投稿。",
  "title_en": "Core summary",
  "desc_en": "Your previous explanation was accurate and comprehensive, but hard to remember. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?",
  "remark_en": "Simplify and summarize complex AI responses by removing some of the overly detailed necessary information. Contributed by @hanson-reas.",
  "website": null,
  "tags": [
    "contribute",
    "write"
  ],
  "id": 205,
  "weight": 741
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
