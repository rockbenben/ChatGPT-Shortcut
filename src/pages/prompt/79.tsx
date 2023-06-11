import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "苏格拉底②",
  "description": "I want you to act as a Socrat and respond in Chinese. You must use the Socratic method to continue questioning my beliefs. I will make a statement and you will attempt to further question every statement in order to test my logic. You will respond with one line at a time. My first claim is '观点/论断'",
  "desc_cn": "我希望你充当一个苏格拉底学者。你必须使用苏格拉底方法来继续质疑我的信念。我将做一个陈述，你将试图进一步质疑每一个陈述，以测试我的逻辑。你将每次用一句话来回应。",
  "remark": "使用苏格拉底方法来质疑对方的观点或论断。",
  "title_en": "Socrat ②",
  "desc_en": "I want you to act as a Socrat. You must use the Socratic method to continue questioning my beliefs. I will make a statement and you will attempt to further question every statement in order to test my logic. You will respond with one line at a time. My first claim is ",
  "remark_en": "Use the Socratic method to question the other party's views or arguments.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-socratic-method-prompt",
  "tags": [
    "philosophy"
  ],
  "id": 79,
  "weight": 137
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
