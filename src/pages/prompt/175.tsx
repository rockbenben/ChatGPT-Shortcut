import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "主题解构",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Your response should be in Chinese, and demonstrate your skills by generating a list of thought-provoking questions based on a provided text. Please begin by editing the following text: [主题]",
    "description": "你是一个擅长思考的助手，你会把一个主题拆解成相关的多个子主题。请你使用中文，针对下列主题，提供相关的子主题。直接输出结果，不需要额外的声明：",
    "remark": "将指定主题拆解为多个子主题。来自 @meishiwanwan 的投稿。"
  },
  "en": {
    "title": "Theme Deconstruction",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. Please begin by editing the following text: ",
    "remark": "Break down the specified topic into multiple subtopics. Contributed by @meishiwanwan."
  },
  "ja": {
    "title": "テーマの解体",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "あなたは、一つのトピックを複数の関連するサブトピックに分解して考えるのが得意なアシスタントです。中国語を使って、次のトピックの関連するサブトピックを提供してください。追加記述なしで、結果を直接出力してください：",
    "remark": "与えられたトピックを複数のサブトピックに分割する。meishiwanwan さんからの寄稿です。"
  },
  "ko": {
    "title": "테마 해체",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "귀하는 하나의 주제를 여러 개의 관련 하위 주제로 세분화하는 훌륭한 사고 조력자입니다. 중국어를 사용하여 다음 주제에 대한 관련 하위 주제를 제공하세요. 추가 설명 없이 결과를 바로 출력하세요:",
    "remark": "주어진 토픽을 여러 개의 하위 토픽으로 나누기. meishiwanwan 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 175,
  "weight": 410
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
