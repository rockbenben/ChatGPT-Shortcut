import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "提示词生成器②",
  "description": "I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
  "desc_cn": "我希望你能充当 ChatGPT 提示生成器，我会发送一个主题，你需要根据主题内容生成一个以「我希望你能充当」开头的 ChatGPT 提示。猜测一下我的行为，并扩展该提示来描述主题内容，使其更有用。",
  "remark": "根据主题让 ChatGPT 生成提示词。",
  "title_en": "ChatGPT prompt generator",
  "desc_en": "I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
  "remark_en": "Generate prompts for ChatGPT based on the topic.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chatgpt-prompt-generator",
  "tags": [
    "ai"
  ],
  "id": 6,
  "weight": 587
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
