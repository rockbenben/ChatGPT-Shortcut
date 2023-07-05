import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "周边旅游推荐",
    "prompt": "I want you to act as a travel guide and respond in Chinese. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is '地点和参观需求'",
    "description": "我想让你充当一个旅游向导。我将把我的位置写给你，你将为我的位置附近的一个地方提供参观建议。在某些情况下，我也会给你我要访问的地方的类型。你也将向我推荐靠近我的第一个地点的类似类型的地方。",
    "remark": "根据你的位置，推荐周边参观地点。"
  },
  "en": {
    "title": "Nearby travel guide",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is ",
    "remark": "Based on your location, AI recommend nearby places of interest to visit."
  },
  "ja": {
    "title": "周辺のおすすめツアー",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "あなたに観光ガイドをお願いしたい。私が自分の居場所を書くと、あなたは私の居場所の近くにある観光地の提案をしてくれるでしょう。場合によっては、私が訪れたい場所のタイプもお教えします。また、私が最初に訪れた場所の近くにある、似たようなタイプの場所を提案してください。",
    "remark": "お住まいの地域によって、周辺のおすすめスポットをご紹介します。"
  },
  "ko": {
    "title": "주변 추천 투어",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "관광 가이드로 활동해 주셨으면 합니다. 제 위치를 알려주시면 제 위치 근처에서 가볼 만한 곳을 추천해 주시면 됩니다. 경우에 따라서는 제가 방문하고 싶은 장소의 유형도 알려드릴 수 있습니다. 또한 첫 번째 위치에서 가까운 비슷한 유형의 장소를 추천해 주실 수도 있습니다.",
    "remark": "위치에 따라 주변에서 가볼 만한 곳을 추천해 드립니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-travel-guide",
  "tags": [
    "tool"
  ],
  "id": 126,
  "weight": 634
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
