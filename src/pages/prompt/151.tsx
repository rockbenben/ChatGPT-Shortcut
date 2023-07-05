import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "虚拟医生",
    "prompt": "I want you to act as a virtual doctor and respond in Chinese. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. My first request is [身体症状]",
    "description": "我想让你充当一个虚拟医生。我将描述我的症状，你将提供一个诊断和治疗计划。你应该只回复你的诊断和治疗计划，而不是其他。不要写解释。",
    "remark": "Virtual Doctor"
  },
  "en": {
    "title": "virtual doctor",
    "prompt": "I want you to act as a virtual doctor. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. My first request is ",
    "remark": "Virtual Doctor"
  },
  "ja": {
    "title": "バーチャルドクター",
    "prompt": "I want you to act as a virtual doctor. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "バーチャルドクターとして活躍してほしい。私が症状を説明し、あなたは診断と治療計画を提示してください。あなたは診断と治療計画のみを回答し、それ以外は何も回答してはいけません。説明文は書かないでください。",
    "remark": "バーチャルドクター"
  },
  "ko": {
    "title": "가상 닥터",
    "prompt": "I want you to act as a virtual doctor. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "가상 의사 역할을 해 주셨으면 합니다. 제가 증상을 설명하면 여러분은 진단과 치료 계획을 제시해 주세요. 진단과 치료 계획에 대해서만 응답해야 하며, 그 외에는 아무것도 작성하지 마세요. 설명을 작성하지 마세요.",
    "remark": "가상 닥터"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-virtual-doctor",
  "tags": [
    "doctor"
  ],
  "id": 151,
  "weight": 448
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
