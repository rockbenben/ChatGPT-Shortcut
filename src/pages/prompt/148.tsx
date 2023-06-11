import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "头衔生成器",
  "description": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. My first keywords are [头衔关键词]",
  "desc_cn": "我希望你能充当花式标题生成器。我将通过逗号输入关键词，你将用花哨的标题进行回复。",
  "remark": "根据关键词生成多种头衔和职位。",
  "title_en": "fancy title generator",
  "desc_en": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. My first keywords are ",
  "remark_en": "Generate multiple job titles and positions based on keywords.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-fancy-title-generator",
  "tags": [
    "company"
  ],
  "id": 148,
  "weight": 111
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
