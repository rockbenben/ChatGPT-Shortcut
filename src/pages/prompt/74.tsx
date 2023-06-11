import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "心理学家",
  "description": "I want you to act a psychologist and respond in Chinese. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. my first thought, { 内心想法 }",
  "desc_cn": "我希望你能扮演一个心理学家。我将向你提供我的想法。我希望你能给我科学的建议，使我感觉更好。",
  "remark": "Psychologist",
  "title_en": "Psychologist",
  "desc_en": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. my first thought ",
  "remark_en": "Psychologist",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-psychologist",
  "tags": [
    "social"
  ],
  "id": 74,
  "weight": 359
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
