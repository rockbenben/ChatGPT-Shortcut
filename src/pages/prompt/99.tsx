import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "智能域名生成器",
  "description": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. Reply 'OK' to confirm.",
  "desc_cn": "我希望你能充当一个聪明的域名生成器。我将告诉你我的公司或想法是什么，你将根据我的提示回复我一份域名备选清单。你只需回复域名列表，而不是其他。域名应该是最多 7-8 个字母，应该简短但独特，可以是朗朗上口的或不存在的词。不要写解释。回复 'OK '以确认。",
  "remark": "根据公司名和项目描述，提供短而独特的域名建议。域名长度最长 7-8 个字符。",
  "title_en": "domain generator",
  "desc_en": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. Reply 'OK' to confirm.",
  "remark_en": "Provide short and unique domain name suggestions based on the company name and project description. The length of the domain name should be no more than 7-8 characters.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-smart-domain-name-generator",
  "tags": [
    "code"
  ],
  "id": 99,
  "weight": 169
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
