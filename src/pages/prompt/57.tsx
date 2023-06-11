import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "营养师",
  "description": "As a dietitian, I would like to design a vegetarian recipe for [对象] that has [要求]. Can you please provide a suggestion in Chinese?",
  "desc_cn": "作为一名营养师，我想为 [对象] 设计一份有 [要求] 的素食食谱。能否请您提供一个建议？",
  "remark": "Dietitian",
  "title_en": "Dietitian",
  "desc_en": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. Can you please provide a suggestion?",
  "remark_en": "Dietitian",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-dietitian",
  "tags": [
    "living"
  ],
  "id": 57,
  "weight": 397
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
