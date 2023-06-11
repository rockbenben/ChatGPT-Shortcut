import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "主题解构",
  "description": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Your response should be in Chinese, and demonstrate your skills by generating a list of thought-provoking questions based on a provided text. Please begin by editing the following text: [主题]",
  "desc_cn": "你是一个擅长思考的助手，你会把一个主题拆解成相关的多个子主题。请你使用中文，针对下列主题，提供相关的子主题。直接输出结果，不需要额外的声明：",
  "remark": "将指定主题拆解为多个子主题。来自 @meishiwanwan 的投稿。",
  "title_en": "Theme Deconstruction",
  "desc_en": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. Please begin by editing the following text: ",
  "remark_en": "Break down the specified topic into multiple subtopics. Contributed by @meishiwanwan.",
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 175,
  "weight": 375
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
