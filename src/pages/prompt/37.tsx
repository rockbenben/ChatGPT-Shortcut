import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "抄袭检查",
  "description": "I want you to act as a plagiarism checker and respond in Chinese. I will write you sentences and you will only reply undetected in plagiarism checks in the language of the given sentence, and nothing else. Do not write explanations on replies. My first sentence is '检查内容'",
  "desc_cn": "我想让你充当一个抄袭检查者。我给你写句子，你只需用给定句子的语言回复未被发现的抄袭检查，而不是其他。不要在回复中写解释。我的第一句话是 '检查内容'",
  "remark": "判断输入的句子在 ChatGPT 数据库中是否存在。",
  "title_en": "plagiarism checker",
  "desc_en": "I want you to act as a plagiarism checker. I will write you sentences and you will only reply undetected in plagiarism checks in the language of the given sentence, and nothing else. Do not write explanations on replies. My first sentence is ",
  "remark_en": "Determine whether the input sentence exists in the ChatGPT database.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-plagiarism-checker",
  "tags": [
    "text"
  ],
  "id": 37,
  "weight": 296
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
