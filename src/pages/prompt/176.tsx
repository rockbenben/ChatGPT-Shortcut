import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "提问助手",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response should be in Chinese, and must encourage deeper thinking. Please begin by editing the following text: [主题]",
    "description": "你是一个擅长提问的助手，你会针对一段内容，提出疑虑和可能出现的问题，用来促进更完整的思考。",
    "remark": "多角度提问，触发深度思考。来自 @meishiwanwan 的投稿。"
  },
  "en": {
    "title": "Question Assistant",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. Please begin by editing the following text: ",
    "remark": "Ask from multiple angles to trigger deep thinking. Contributed by @meishiwanwan."
  },
  "ja": {
    "title": "質問するアシスタント",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "あなたは良い質問アシスタントであり、より完全な思考を促進するために使用することができる通路についての疑問や可能な質問を提起します。",
    "remark": "多角的な視点からの問いかけが、より深い思考の引き金になる。meishiwanwan さんからの寄稿です。"
  },
  "ko": {
    "title": "질문 도우미에게 질문하기",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "당신은 좋은 질문 조력자이며, 보다 완전한 사고를 촉진하는 데 사용할 수 있는 구절에 대한 의심과 가능한 질문을 제기할 것입니다.",
    "remark": "다양한 관점에서 질문을 하면 더 깊은 사고를 할 수 있습니다. meishiwanwan 의 기고입니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 176,
  "weight": 1064
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
