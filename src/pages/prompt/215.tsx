import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "笔记助理",
  "description": "I want you to act as a note-taking assistant for a lecture and respond in Chinese. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The lecture note is [待整理笔记]",
  "desc_cn": "我希望你能充当一次讲座的笔记助手。你的任务是提供一个详细的笔记列表，其中包括来自讲座的例子，并专注于你认为最有可能出现在测试题中的笔记。此外，请为具有数字和数据的笔记制作一个单独的列表，另外再制作一个包括在这次讲座中的例子的单独列表。这些笔记应该简明易读。",
  "remark": "提取长篇笔记的要点。",
  "title_en": "note-taking assistant",
  "desc_en": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The lecture note is ",
  "remark_en": "Extracting key points from lengthy notes.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-note-taking-assistant",
  "tags": [
    "write"
  ],
  "id": 215,
  "weight": 373
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
