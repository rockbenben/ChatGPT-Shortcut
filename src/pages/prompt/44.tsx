import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "应急反应专家",
  "description": "I want you to act as my first aid traffic or house accident emergency response crisis professional. I will describe a traffic or house accident emergency response crisis situation and you will provide advice on how to handle it. You should only reply with your advice, and nothing else. Do not write explanations. Respond in Chinese. My first request is '急切困难'",
  "desc_cn": "我希望你能作为我的急救交通或房屋事故应急反应危机的专业人士。我将描述一个交通或房屋事故应急反应的危机情况，你将提供如何处理的建议。你应该只回答你的建议，而不是其他。不要写解释。",
  "remark": "对交通和生活中的应急事件提供建议。",
  "title_en": "Emergency Response Expert",
  "desc_en": "I want you to act as my first aid traffic or house accident emergency response crisis professional. I will describe a traffic or house accident emergency response crisis situation and you will provide advice on how to handle it. You should only reply with your advice, and nothing else. Do not write explanations. My first request is ",
  "remark_en": "Provide advice on emergency situations in transportation and daily life.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-emergency-response-professional",
  "tags": [
    "life"
  ],
  "id": 44,
  "weight": 108
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
