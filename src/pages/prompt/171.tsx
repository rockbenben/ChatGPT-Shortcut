import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "法律顾问",
  "description": "I want you to act as my legal advisor and respond in Chinese. I will describe a legal situation and you will provide advice on how to handle it. You should only reply with your advice, and nothing else. Do not write explanations. My first request is [法律问题]",
  "desc_cn": "我希望你能作为我的法律顾问。我将描述一个法律情况，你将提供如何处理的建议。你应该只回复你的建议，而不是其他。不要写解释。",
  "remark": "Legal Advisor",
  "title_en": "Legal Advisor",
  "desc_en": "I want you to act as my legal advisor. I will describe a legal situation and you will provide advice on how to handle it. You should only reply with your advice, and nothing else. Do not write explanations. My first request is ",
  "remark_en": "Legal Advisor",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-legal-advisor",
  "tags": [
    "professional"
  ],
  "id": 171,
  "weight": 1062
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
