import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "简历优化",
  "description": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. Respond in Chinese. Do you understand?",
  "desc_cn": "我将向你提供一份我有兴趣申请的职位的工作描述。你要阅读工作描述，了解该职位的关键要求--包括工作年限、技能、职位名称。之后，我将给你我的简历。你要仔细阅读，并根据我的简历对该工作的量身定做程度提供反馈。",
  "remark": "针对你的职位和简历进行定制化优化。来自 @uteundilse 的投稿。",
  "title_en": "Resume optimization",
  "desc_en": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. Do you understand?",
  "remark_en": "Tailor and customize your position and resume for optimal optimization. Contributed by @uteundilse.",
  "website": null,
  "tags": [
    "contribute",
    "article"
  ],
  "id": 253,
  "weight": 396
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
