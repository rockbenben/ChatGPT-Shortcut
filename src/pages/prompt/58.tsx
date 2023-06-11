import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "厨师①",
  "description": "I want you to act as my personal chef and respond in Chinese. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. My first request is [饮食倾向]",
  "desc_cn": "我想让你充当我的私人厨师。我将告诉你我的饮食偏好和过敏症，你将建议我尝试的食谱。你应该只回复你推荐的菜谱，而不是其他。不要写解释。",
  "remark": "Personal Chef",
  "title_en": "Personal Chef",
  "desc_en": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. My first request is ",
  "remark_en": "Personal Chef",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-chef",
  "tags": [
    "living"
  ],
  "id": 58,
  "weight": 210
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
