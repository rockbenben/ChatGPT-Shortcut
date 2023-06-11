import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "前端：网页设计",
  "description": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. My first request is [项目要求]",
  "desc_cn": "我希望你能充当网页设计顾问。我将向你提供一个需要协助设计或重新开发网站的组织的相关细节，你的职责是建议最合适的界面和功能，以提高用户体验，同时也满足该公司的业务目标。你应该运用你在 UX/UI 设计原则、编码语言、网站开发工具等方面的知识，为该项目制定一个全面的计划。",
  "remark": "从网页开发和设计的角度，提供界面和功能建议，旨在提高用户体验。",
  "title_en": "web design consultant",
  "desc_en": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. My first request is ",
  "remark_en": "From the perspective of web development and design, provide interface and functionality suggestions aimed at improving user experience.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-web-design-consultant",
  "tags": [
    "code"
  ],
  "id": 93,
  "weight": 529
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
