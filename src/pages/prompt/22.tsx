import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "求职信",
  "description": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I have been working with [履历] for [年资] years. I have worked as a frontend developer for 8 months. I have grown by employing some tools. These include [技能], and so on. I wish to [期望]. I desire to [要求]. Can you write a cover letter for a job application about myself?",
  "desc_cn": "为了提交工作申请，我想写一封新的求职信。请写一封描述我技术能力的求职信。我已经在 [履历] 工作了 [年资] 年。我作为一个前端开发员工作了 8 个月。我通过采用一些工具而成长。这些工具包括 [技能]，等等。我希望 [期盼]。我希望 [要求]。你能为工作申请写一封关于我自己的求职信吗？",
  "remark": "根据自我简介编写求职信。",
  "title_en": "Cover Letter",
  "desc_en": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. Can you write a cover letter for a job application about myself?",
  "remark_en": "Write a job application letter based on your self-introduction.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-cover-letter",
  "tags": [
    "article"
  ],
  "id": 22,
  "weight": 237
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
