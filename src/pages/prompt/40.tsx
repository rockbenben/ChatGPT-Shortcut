import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "关键词热门相关",
  "description": "Generate a list of 10 popular questions related to [关键词], that are relevant for [受众] and respond in Chinese",
  "desc_cn": "生成一个与 [关键词] 相关的 10 个热门问题清单，这些问题与 [受众] 有关，并用中文回答。",
  "remark": "可用于了解用户对特定话题的关注点，或整理文章结构，亦可更改为「热门关键词」「热门话题」「热门品牌」「热门网站」等。",
  "title_en": "Popular Related",
  "desc_en": "Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
  "remark_en": "This can be used to understand the focus of users on specific topics, or to organize the structure of articles. It can also be changed to 'popular keywords', 'popular topics', 'popular brands', 'popular websites' and so on.",
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 40,
  "weight": 505
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
