import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "周边旅游推荐",
  "description": "I want you to act as a travel guide and respond in Chinese. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is '地点和参观需求'",
  "desc_cn": "我想让你充当一个旅游向导。我将把我的位置写给你，你将为我的位置附近的一个地方提供参观建议。在某些情况下，我也会给你我要访问的地方的类型。你也将向我推荐靠近我的第一个地点的类似类型的地方。",
  "remark": "根据你的位置，推荐周边参观地点。",
  "title_en": "Nearby travel guide",
  "desc_en": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is ",
  "remark_en": "Based on your location, AI recommend nearby places of interest to visit.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-travel-guide",
  "tags": [
    "tool"
  ],
  "id": 126,
  "weight": 530
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
