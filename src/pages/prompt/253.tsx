import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "简历优化",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. Respond in Chinese. Do you understand?",
    "description": "我将向你提供一份我有兴趣申请的职位的工作描述。你要阅读工作描述，了解该职位的关键要求--包括工作年限、技能、职位名称。之后，我将给你我的简历。你要仔细阅读，并根据我的简历对该工作的量身定做程度提供反馈。",
    "remark": "针对你的职位和简历进行定制化优化。来自 @uteundilse 的投稿。"
  },
  "en": {
    "title": "Resume optimization",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. Do you understand?",
    "remark": "Tailor and customize your position and resume for optimal optimization. Contributed by @uteundilse."
  },
  "ja": {
    "title": "CV の最適化",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Janpanese. Do you understand?",
    "description": "私は、応募を希望しているポジションの職務経歴書をお渡しします。職務経歴書を読み、そのポジションの主な要件（経験年数、スキル、職種など）を理解します。その後、私の履歴書を渡します。あなたはそれをよく読み、私の履歴書がどの程度求人に適合しているかフィードバックすることが期待されています。",
    "remark": "あなたのポジションや CV に合わせてカスタマイズし、最適化します。uteundilse さんからの寄稿です。"
  },
  "ko": {
    "title": "이력서 최적화",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Korean. Do you understand?",
    "description": "지원하고자 하는 직책에 대한 직무 설명을 제공합니다. 직무 설명을 읽고 경력, 기술, 직책 등 해당 직책의 주요 요구 사항을 이해하게 됩니다. 그 후 이력서를 보내드립니다. 귀하는 이력서를 주의 깊게 읽고 제 이력서가 해당 직무에 얼마나 적합한지에 대한 피드백을 제공해야 합니다.",
    "remark": "직위와 이력서에 맞게 맞춤화되고 최적화됩니다. 우테운딜세의 기고글입니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "article"
  ],
  "id": 253,
  "weight": 564
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
