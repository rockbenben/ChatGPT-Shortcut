import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "论文②",
    "prompt": "I want you to act as an essay writer and respond in Chinese. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is '论文主题'",
    "description": "我想让你充当一名论文作家。你将需要研究一个给定的主题，制定一个论文声明，并创造一个有说服力的作品，既要有信息量，又要有吸引力。我的第一个建议要求是 '论文主题'",
    "remark": "根据主题撰写内容翔实、有信服力的论文。"
  },
  "en": {
    "title": "Essay writer",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is ",
    "remark": "Write a comprehensive and persuasive thesis based on the given topic."
  },
  "ja": {
    "title": "用紙②の場合",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "あなたには、論文の書き手として活躍してほしい。与えられたトピックを研究し、論文を作成し、情報量が多く魅力的な説得力のある作品を作る必要があります。私が最初に提案する要件は「論文のテーマ」です。",
    "remark": "トピックに基づき、情報量が多く説得力のある論文を書く。"
  },
  "ko": {
    "title": "용지 ②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "논문 작가로 활동해 주셨으면 합니다. 주어진 주제를 조사하고, 논문 문장을 개발하며, 유익하고 매력적인 설득력 있는 글을 작성해야 합니다. 제가 제안하는 첫 번째 요건은 '논문 주제'입니다.",
    "remark": "주제에 따라 유익하고 설득력 있는 논문을 작성하세요."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-essay-writer",
  "tags": [
    "article"
  ],
  "id": 21,
  "weight": 1584
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
