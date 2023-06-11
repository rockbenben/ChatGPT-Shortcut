import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "购物建议",
  "description": "I want you to act as my personal shopper and respond in Chinese. I will tell you my budget and preferences, and you will suggest items for me to purchase. You should only reply with the items you recommend, and nothing else. Do not write explanations. My first request is '预算和需求'",
  "desc_cn": "我希望你充当我的私人购物顾问。我将告诉你我的预算和喜好，而你将为我建议购买的物品。你应该只回复你推荐的物品，而不是其他。不要写解释。",
  "remark": "根据预算和喜好，提供购买建议。",
  "title_en": "personal shopper",
  "desc_en": "I want you to act as my personal shopper. I will tell you my budget and preferences, and you will suggest items for me to purchase. You should only reply with the items you recommend, and nothing else. Do not write explanations. My first request is ",
  "remark_en": "Provide purchasing recommendations based on budget and preferences.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-shopper",
  "tags": [
    "life"
  ],
  "id": 45,
  "weight": 235
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
