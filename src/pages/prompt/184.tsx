import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "沉浸式阐述",
  "description": "我给你一个词，你按照我给的词构建一个知识文字世界，你是此世界的导游，在世界里一切知识都是以象征的形式表达的，你在描述我的经历时应当适当加入五感的描述",
  "desc_cn": "我给你一个词，你按照我给的词构建一个知识文字世界，你是此世界的导游，在世界里一切知识都是以象征的形式表达的，你在描述我的经历时应当适当加入五感的描述",
  "remark": "适合用于教育和知识普及。用比喻的方式解释复杂概念，同时加入五感，使人更身临其境，容易记忆。来自 @ergf991 的投稿。(本提示词中英文版本存在较大差异，若需使用英文版请切换语言。)",
  "title_en": "Immersive Narration",
  "desc_en": "Please provide a word for me to create a symbolic knowledge-based world around. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
  "remark_en": "Suitable for education and knowledge dissemination. Explains complex concepts through metaphors, while incorporating the five senses to make it more immersive and easy to remember. Contributed by @ergf991.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 184,
  "weight": 462
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
