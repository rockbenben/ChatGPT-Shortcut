import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "文本情绪分析",
  "description": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. Generate the results in column, including the titles in the first one, and their sentiment in the second: [内容]",
  "desc_cn": "指定以下标题的情感，赋予它们的值为：正面、中性或负面。生成一列结果，包括第一列中的标题和第二列中的情感：[内容] 。",
  "remark": "判断文本情绪：正面、中性或负面。",
  "title_en": "sentiment analysis",
  "desc_en": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
  "remark_en": "Detect text sentiment: positive, neutral or negative.",
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 31,
  "weight": 132
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
