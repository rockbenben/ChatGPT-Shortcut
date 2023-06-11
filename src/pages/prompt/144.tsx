import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "社交媒体影响者/KOL",
  "description": "I want you to act as a social media influencer and respond in Chinese. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. My first suggestion request is [推广目的]",
  "desc_cn": "我想让你充当社交媒体的影响者。你将为各种平台（如 Instagram、Twitter 或 YouTube）创建内容，并与追随者互动，以提高品牌知名度并推广产品或服务。",
  "remark": "Social Media Influencer",
  "title_en": "Social Media Influencer",
  "desc_en": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. My first suggestion request is ",
  "remark_en": "Social Media Influencer/KOL",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-social-media-influencer",
  "tags": [
    "company"
  ],
  "id": 144,
  "weight": 239
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
