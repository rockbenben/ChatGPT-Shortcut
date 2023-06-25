import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "造型师",
    "prompt": "I want you to act as my personal stylist and respond in Chinese. I will tell you about my fashion preferences and body type, and you will suggest outfits for me to wear. You should only reply with the outfits you recommend, and nothing else. Do not write explanations. My first request is '造型目的'",
    "description": "我想让你充当我的个人造型师。我将告诉你我的时尚偏好和体型，而你将为我推荐服装。你应该只回复你推荐的服装，而不是其他。不要写解释。",
    "remark": "Personal Stylist"
  },
  "en": {
    "title": "Personal Stylist",
    "prompt": "I want you to act as my personal stylist. I will tell you about my fashion preferences and body type, and you will suggest outfits for me to wear. You should only reply with the outfits you recommend, and nothing else. Do not write explanations. My first request is ",
    "remark": "Personal Stylist"
  },
  "ja": {
    "title": "スタイリスト",
    "prompt": "I want you to act as my personal stylist. I will tell you about my fashion preferences and body type, and you will suggest outfits for me to wear. You should only reply with the outfits you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "私のパーソナルスタイリストとして活躍してほしい。私のファッションの好みや体型を伝えるので、おすすめの服を紹介してください。返信は、あなたがおすすめする服装のみで、それ以外のことは書いてはいけません。説明文は書かないでください。",
    "remark": "パーソナルスタイリスト"
  },
  "ko": {
    "title": "스타일리스트",
    "prompt": "I want you to act as my personal stylist. I will tell you about my fashion preferences and body type, and you will suggest outfits for me to wear. You should only reply with the outfits you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "제 개인 스타일리스트 역할을 해 주셨으면 합니다. 제가 선호하는 패션 스타일과 체형을 알려주면, 여러분은 저에게 어울리는 의상을 추천해 주시면 됩니다. 추천한 의상만 답장하고 그 외에는 답장하지 마세요. 설명을 작성하지 마세요.",
    "remark": "개인 스타일리스트"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-stylist",
  "tags": [
    "living"
  ],
  "id": 62,
  "weight": 229
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
