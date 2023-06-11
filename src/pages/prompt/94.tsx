import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "全栈程序员",
  "description": "I want you to act as a software developer and respond in Chinese. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code. My first request is [项目要求]",
  "desc_cn": "我希望你能扮演一个软件开发者的角色。我将提供一些关于网络应用需求的具体信息，而你的工作是提出一个架构和代码，用 Golang 和 Angular 开发安全的应用。",
  "remark": "从前后端全面思考，提供部署策略。",
  "title_en": "Fullstack Software Developer",
  "desc_en": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. I want the system to use JWT for security'.",
  "remark_en": "Considering both front-end and back-end comprehensively, provide deployment strategies.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-fullstack-software-developer",
  "tags": [
    "code"
  ],
  "id": 94,
  "weight": 841
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
