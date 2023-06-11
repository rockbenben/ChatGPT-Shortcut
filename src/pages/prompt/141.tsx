import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "广告方案",
  "description": "I want you to act as an advertiser. You will create a campaign in Chinese to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is [推广产品]",
  "desc_cn": "我想让你充当一个广告商。你将创建一个活动来推广你选择的产品或服务。你将选择一个目标受众，制定关键信息和口号，选择推广的媒体渠道，并决定为达到目标所需的任何额外活动。",
  "remark": "针对产品推广，制定包含目标受众、口号、推广渠道等内容的广告方案。",
  "title_en": "advertiser",
  "desc_en": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is ",
  "remark_en": "For product promotion, develop an advertising plan that includes target audience, slogan, promotional channels and other content.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-advertiser",
  "tags": [
    "company"
  ],
  "id": 141,
  "weight": 748
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
