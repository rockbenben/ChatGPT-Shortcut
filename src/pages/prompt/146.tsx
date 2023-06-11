import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "招聘人员",
  "description": "I want you to act as a recruiter and respond in Chinese. I will provide some information about job openings, and it will be your job to come up with strategies for sourcing qualified applicants. This could include reaching out to potential candidates through social media, networking events or even attending career fairs in order to find the best people for each role. My first request is [要求]",
  "desc_cn": "我希望你充当招聘人员。我将提供一些关于职位空缺的信息，而你的工作将是想出寻找合格申请人的策略。这可能包括通过社交媒体、网络活动或甚至参加招聘会来接触潜在的候选人，以便为每个角色找到最佳人选。",
  "remark": "Recruiter",
  "title_en": "Recruiter",
  "desc_en": "I want you to act as a recruiter. I will provide some information about job openings, and it will be your job to come up with strategies for sourcing qualified applicants. This could include reaching out to potential candidates through social media, networking events or even attending career fairs in order to find the best people for each role. My first request is ",
  "remark_en": "Recruiter",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-recruiter",
  "tags": [
    "company"
  ],
  "id": 146,
  "weight": 157
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
