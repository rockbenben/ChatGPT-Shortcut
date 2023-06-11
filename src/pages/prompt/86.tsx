import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "词源学家",
  "description": "I want you to act as a etymologist and respond in Chinese. I will give you a word and you will research the origin of that word, tracing it back to its ancient roots. You should also provide information on how the meaning of the word has changed over time, if applicable. My first request is 'I want to trace the origins of the word '词语'.'",
  "desc_cn": "我想让你充当一名词源学家。我会给你一个词，你要研究这个词的起源，追溯它的古老根源。如果适用的话，你还应提供关于该词的含义如何随时间变化的信息。我的第一个要求是我想追踪 [词语] 的起源'。",
  "remark": "介绍词汇的起源，适用于中文、英文和其他主流语言。",
  "title_en": "etymologist",
  "desc_en": "I want you to act as a etymologist. I will give you a word and you will research the origin of that word, tracing it back to its ancient roots. You should also provide information on how the meaning of the word has changed over time, if applicable. My first request is 'I want to trace the origins of the word 'x'.'",
  "remark_en": "The origin of vocabulary introduction is applicable to Chinese, English and other mainstream languages.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-etymologist",
  "tags": [
    "academic"
  ],
  "id": 86,
  "weight": 180
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
