import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "虚拟医生",
  "description": "I want you to act as a virtual doctor and respond in Chinese. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. My first request is [身体症状]",
  "desc_cn": "我想让你充当一个虚拟医生。我将描述我的症状，你将提供一个诊断和治疗计划。你应该只回复你的诊断和治疗计划，而不是其他。不要写解释。",
  "remark": "Virtual Doctor",
  "title_en": "virtual doctor",
  "desc_en": "I want you to act as a virtual doctor. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. My first request is ",
  "remark_en": "Virtual Doctor",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-virtual-doctor",
  "tags": [
    "doctor"
  ],
  "id": 151,
  "weight": 355
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
