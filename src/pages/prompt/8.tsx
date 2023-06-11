import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "写作标题生成器",
  "description": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. My first topic is [文章内容]",
  "desc_cn": "我想让你充当书面作品的标题生成器。我将向你提供一篇文章的主题和关键词，你将生成五个吸引人的标题。请保持标题简洁，不超过 20 个字，并确保保持其含义。答复时要利用题目的语言类型。我的第一个题目是 [文章内容]",
  "remark": "个人使用的提示词，可根据文章内容生成相应语言的标题。",
  "title_en": "Article Title generator",
  "desc_en": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. My first topic is ",
  "remark_en": "Generate headings in the appropriate language based on the content of the article.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-title-generator-for-written-pieces",
  "tags": [
    "write"
  ],
  "id": 8,
  "weight": 2205
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
