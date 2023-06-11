import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "语义相关性聚类",
  "description": "Cluster the following keywords into groups based on their semantic relevance: [关键词]",
  "desc_cn": "根据语义的相关性，将以下关键词归类。[关键词]",
  "remark": "按照语义相关性对关键词进行聚类，并进行分组。",
  "title_en": "Semantic clustering",
  "desc_en": "Cluster the following keywords into groups based on their semantic relevance: [keywords]",
  "remark_en": "Semantic relevance clustering",
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 33,
  "weight": 60
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
