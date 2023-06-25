import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "广告方案",
    "prompt": "I want you to act as an advertiser. You will create a campaign in Chinese to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is [推广产品]",
    "description": "我想让你充当一个广告商。你将创建一个活动来推广你选择的产品或服务。你将选择一个目标受众，制定关键信息和口号，选择推广的媒体渠道，并决定为达到目标所需的任何额外活动。",
    "remark": "针对产品推广，制定包含目标受众、口号、推广渠道等内容的广告方案。"
  },
  "en": {
    "title": "advertiser",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is ",
    "remark": "For product promotion, develop an advertising plan that includes target audience, slogan, promotional channels and other content."
  },
  "ja": {
    "title": "広告プログラム",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "広告主としての役割を担っていただきたい。あなたが選んだ製品やサービスを宣伝するためのキャンペーンを作成します。ターゲットオーディエンスの選択、キーメッセージとスローガンの開発、プロモーションのためのメディアチャネルの選択、目的達成に必要な追加活動の決定などを行います。",
    "remark": "製品プロモーションでは、ターゲット層、スローガン、プロモーションチャネルなどを含む広告計画を策定する。"
  },
  "ko": {
    "title": "광고 프로그램",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "광고주로서 활동해 주셨으면 합니다. 원하는 제품이나 서비스를 홍보하기 위한 캠페인을 만들게 됩니다. 타겟 고객을 선정하고, 핵심 메시지와 슬로건을 개발하고, 홍보할 미디어 채널을 선택하고, 목표 달성에 필요한 추가 활동을 결정합니다.",
    "remark": "제품 홍보를 위해 타겟 고객, 슬로건, 홍보 채널 등이 포함된 광고 계획을 개발합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-advertiser",
  "tags": [
    "company"
  ],
  "id": 141,
  "weight": 902
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
