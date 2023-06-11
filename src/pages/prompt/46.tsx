import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "职业顾问",
  "description": "I want you to act as a career counselor and respond in Chinese. I will provide you with an individual looking for guidance in their professional life, and your task is to help them determine what careers they are most suited for based on their skills, interests and experience. You should also conduct research into the various options available, explain the job market trends in different industries and advice on which qualifications would be beneficial for pursuing particular fields. My first request is '职业目标'",
  "desc_cn": "我希望你充当职业顾问。我将为你提供一个在职业生活中寻求指导的人，你的任务是根据他们的技能、兴趣和经验，帮助他们确定他们最适合的职业。你还应该对现有的各种选择进行研究，解释不同行业的就业市场趋势，并就哪些资格有利于追求特定领域提出建议。",
  "remark": "基于你的技能、兴趣和经验，提供相关岗位建议。",
  "title_en": "career counselor",
  "desc_en": "I want you to act as a career counselor. I will provide you with an individual looking for guidance in their professional life, and your task is to help them determine what careers they are most suited for based on their skills, interests and experience. You should also conduct research into the various options available, explain the job market trends in different industries and advice on which qualifications would be beneficial for pursuing particular fields. My first request is ",
  "remark_en": "Provide job recommendations based on your skills, interests, and experience.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-career-counselor",
  "tags": [
    "life"
  ],
  "id": 46,
  "weight": 350
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
