import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "统计学家",
  "description": "I want to act as a Statistician and respond in Chinese. I will provide you with details related with statistics. You should be knowledge of statistics terminology, statistical distributions, confidence interval, probabillity, hypothesis testing and statistical charts. My first request is '统计问题'",
  "desc_cn": "我想作为一名统计员。我将为你提供与统计有关的细节。你应该了解统计学术语、统计分布、置信区间、概率、假设检验和统计图表。",
  "remark": "Statistician",
  "title_en": "Statistician",
  "desc_en": "I want to act as a Statistician. I will provide you with details related with statistics. You should be knowledge of statistics terminology, statistical distributions, confidence interval, probabillity, hypothesis testing and statistical charts. My first request is ",
  "remark_en": "Statistician",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-statistician",
  "tags": [
    "academic"
  ],
  "id": 85,
  "weight": 184
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
