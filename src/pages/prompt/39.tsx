import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "FAQs 生成器",
  "description": "Generate a list of 10 frequently asked questions based on the following content: [内容]. Respond in Chinese.",
  "desc_cn": "根据以下内容，生成一个 10 个常见问题的清单：[内容]",
  "remark": "基于内容生成常见问答。",
  "title_en": "FAQs Generator",
  "desc_en": "Generate a list of 10 frequently asked questions based on the following content: [内容]",
  "remark_en": "Generate common Q&A based on content.",
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 39,
  "weight": 230
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
