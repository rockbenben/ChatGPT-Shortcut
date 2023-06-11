import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "造型师",
  "description": "I want you to act as my personal stylist and respond in Chinese. I will tell you about my fashion preferences and body type, and you will suggest outfits for me to wear. You should only reply with the outfits you recommend, and nothing else. Do not write explanations. My first request is '造型目的'",
  "desc_cn": "我想让你充当我的个人造型师。我将告诉你我的时尚偏好和体型，而你将为我推荐服装。你应该只回复你推荐的服装，而不是其他。不要写解释。",
  "remark": "Personal Stylist",
  "title_en": "Personal Stylist",
  "desc_en": "I want you to act as my personal stylist. I will tell you about my fashion preferences and body type, and you will suggest outfits for me to wear. You should only reply with the outfits you recommend, and nothing else. Do not write explanations. My first request is ",
  "remark_en": "Personal Stylist",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-stylist",
  "tags": [
    "living"
  ],
  "id": 62,
  "weight": 204
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
