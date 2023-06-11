import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "IT 编程问题",
  "description": "I want you to act as a stackoverflow post and respond in Chinese. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first question is '编程问题'",
  "desc_cn": "我想让你充当 Stackoverflow 的帖子。我将提出与编程有关的问题，你将回答答案是什么。我希望你只回答给定的答案，在没有足够的细节时写出解释。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{像这样}。",
  "remark": "模拟编程社区来回答你的问题，并提供解决代码。",
  "title_en": "Stackoverflow Answer",
  "desc_en": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first question is ",
  "remark_en": "Simulated programming community to answer your questions and provide solution code.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-stackoverflow-post",
  "tags": [
    "code"
  ],
  "id": 90,
  "weight": 4218
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
