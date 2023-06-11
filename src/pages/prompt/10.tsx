import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "写作素材搜集",
  "description": "Generate a list of the top 10 facts, statistics and trends related to [主题], including their source. Respond in Chinese.",
  "desc_cn": "生成一份与 [主题] 有关的十大事实、统计数据和趋势的清单，包括其来源。",
  "remark": "提供与主题相关的结论、数据和来源，作为素材。",
  "title_en": "Material Collection",
  "desc_en": "Generate a list of the top 10 facts, statistics and trends related to [theme], including their source.",
  "remark_en": "Provide findings and data on the specified topic as material.",
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "write"
  ],
  "id": 10,
  "weight": 1515
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
