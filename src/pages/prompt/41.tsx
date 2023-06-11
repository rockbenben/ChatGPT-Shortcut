import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "伪原创改写",
  "description": "Rephrase the following paragraph with Chinese in 5 different ways, to avoid repetition, while keeping its meaning: [修改文本]",
  "desc_cn": "用 5 种不同的方式改写以下段落，以避免重复，同时保持其含义：[修改文本] 。",
  "remark": "对指定内容进行多个版本的改写，以避免文本重复。",
  "title_en": "Rephrase",
  "desc_en": "Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
  "remark_en": "Rewrite the specified content into multiple versions to avoid text duplication.",
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 41,
  "weight": 2814
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
