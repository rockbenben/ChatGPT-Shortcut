import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "文本意图分类",
  "description": "Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [关键词]",
  "desc_cn": "将以下关键词列表根据其搜索意图（无论是商业、交易还是信息）分为几组：[关键词] 。",
  "remark": "根据搜索意图，对以下关键词列表进行商业型、交易型或信息型搜索意图的分组。",
  "title_en": "Text Classification",
  "desc_en": "Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords]",
  "remark_en": "According to the search intent, group the following keyword list into commercial, transactional or informational search intent.",
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 32,
  "weight": 73
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
