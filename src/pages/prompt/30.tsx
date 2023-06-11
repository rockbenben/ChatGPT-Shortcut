import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "同义词",
  "description": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. Reply 'OK' to confirm.",
  "desc_cn": "我希望你能充当同义词提供者。我将告诉你一个词，你将根据我的提示，给我提供一份同义词备选清单。每个提示最多可提供 10 个同义词。如果我想获得更多的同义词，我会用一句话来回答。'更多的 x'，其中 x 是你寻找的同义词的单词。你将只回复单词列表，而不是其他。词语应该存在。不要写解释。回复 'OK '以确认。",
  "remark": "输入 more of x，即可列出 x 的多个同义词。",
  "title_en": "synonyms provider",
  "desc_en": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. Reply 'OK' to confirm.",
  "remark_en": "Enter 'more of x' to list multiple synonyms for 'x'.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-synonym-finder",
  "tags": [
    "text"
  ],
  "id": 30,
  "weight": 111
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
