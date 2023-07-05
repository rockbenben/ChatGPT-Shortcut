import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "头衔生成器",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. My first keywords are [头衔关键词]",
    "description": "我希望你能充当花式标题生成器。我将通过逗号输入关键词，你将用花哨的标题进行回复。",
    "remark": "根据关键词生成多种头衔和职位。"
  },
  "en": {
    "title": "fancy title generator",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. My first keywords are ",
    "remark": "Generate multiple job titles and positions based on keywords."
  },
  "ja": {
    "title": "タイトルジェネレーター",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Janpanese. My first keywords are ",
    "description": "派手なタイトルのジェネレーターとして活動してほしい。私がコンマでキーワードを入力すると、あなたは派手なタイトルを返答してくれます。",
    "remark": "キーワードをもとに複数のタイトルとポジションを生成する。"
  },
  "ko": {
    "title": "타이틀 생성기",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Korean. My first keywords are ",
    "description": "멋진 제목 생성기 역할을 해주셨으면 합니다. 제가 쉼표로 키워드를 입력하면 여러분이 멋진 제목으로 응답해 주세요.",
    "remark": "키워드를 기반으로 여러 제목과 포지션을 생성합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-fancy-title-generator",
  "tags": [
    "company"
  ],
  "id": 148,
  "weight": 159
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
