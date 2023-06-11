import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "美食评论",
  "description": "I want you to act as a food critic and respond in Chinese. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. My first request is '餐厅情况'",
  "desc_cn": "我想让你充当一个美食评论家。我将告诉你一家餐馆，你将提供对食物和服务的评论。你应该只回复你的评论，而不是其他。不要写解释。我的第一个要求是 '餐厅情况'",
  "remark": "根据餐厅情况，撰写一份有关食品和服务的评论。",
  "title_en": "food critic",
  "desc_en": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. My first request is ",
  "remark_en": "Write a review about the food and service based on the restaurant situation.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-food-critic",
  "tags": [
    "comments"
  ],
  "id": 28,
  "weight": 179
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
