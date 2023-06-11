import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "长单词列表",
  "description": "请生成以 A 到 Z 字母开头的最长单词，并在结果中打印出其音标和中文释义。",
  "desc_cn": "列举 A 到 Z 开头的最长单词，打印并标注音标和中文意思",
  "remark": "趣味英语学习，随机列出长单词。由于最长单词这个条件不够清晰，每次列出的单词将不同。来自 @lxyntz 的投稿。",
  "title_en": "Longest word",
  "desc_en": "Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
  "remark_en": "Fun English learning, randomly listing long words. Due to the unclear condition of the longest word, each listed word will be different every time. Contributed by @lxyntz.",
  "website": null,
  "tags": [
    "contribute",
    "language"
  ],
  "id": 174,
  "weight": 68
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
