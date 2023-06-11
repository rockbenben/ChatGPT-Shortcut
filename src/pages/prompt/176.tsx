import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "提问助手",
  "description": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response should be in Chinese, and must encourage deeper thinking. Please begin by editing the following text: [主题]",
  "desc_cn": "你是一个擅长提问的助手，你会针对一段内容，提出疑虑和可能出现的问题，用来促进更完整的思考。",
  "remark": "多角度提问，触发深度思考。来自 @meishiwanwan 的投稿。",
  "title_en": "Question Assistant",
  "desc_en": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. Please begin by editing the following text: ",
  "remark_en": "Ask from multiple angles to trigger deep thinking. Contributed by @meishiwanwan.",
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 176,
  "weight": 857
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
