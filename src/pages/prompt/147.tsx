import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "人事主管",
  "description": "I want you to act as a Talent Coach for interviews and respond in Chinese. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. My first job title is [职位/技能]",
  "desc_cn": "你是面试的人士主管。我告诉你一个职位头衔，你会给出该职位需要的技能和经验，以及应聘者需要回答哪些问题。",
  "remark": "描述一个岗位所需的技能，和应聘者需要回答的问题。",
  "title_en": "Talent Coach",
  "desc_en": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. My first job title is ",
  "remark_en": "Outline the requisite skills for a position and the corresponding interview questions for prospective candidates.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-talent-coach",
  "tags": [
    "company"
  ],
  "id": 147,
  "weight": 346
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
