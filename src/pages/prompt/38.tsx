import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "页面 description",
  "description": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. Respond in Chinese. They should be catchy with a call to action, including the term [主要关键词] in them: [页面内容]",
  "desc_cn": "生成 5 个独特的元描述，最多 150 个字符，用于以下文本。它们应该是吸引人的，有行动号召力，包括 [主要关键词]：[页面内容]",
  "remark": "为页面内容生成 Meta description。",
  "title_en": "Page description",
  "desc_en": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. They should be catchy with a call to action, including the term [keywords] in them: [page content]",
  "remark_en": "Generate description for page content.",
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 38,
  "weight": 271
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
