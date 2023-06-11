import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "前端：UX/UI 界面",
  "description": "I want you to act as a UX/UI developer. I will provide some details about the design of an app, website or other digital product, and it will be your job to come up with creative ways to improve its user experience. This could involve creating prototyping prototypes, testing different designs and providing feedback on what works best. My first request is [项目要求]",
  "desc_cn": "我希望你能作为一个 UX/UI 开发者。我将提供一些关于应用程序、网站或其他数字产品的设计细节，而你的工作将是想出创造性的方法来改善其用户体验。这可能涉及到创建原型，测试不同的设计，并对什么是最有效的提供反馈。",
  "remark": "基于产品描述、项目目标和受众群体，提供界面设计建议，以提高用户体验。",
  "title_en": " UX/UI developer",
  "desc_en": "I want you to act as a UX/UI developer. I will provide some details about the design of an app, website or other digital product, and it will be your job to come up with creative ways to improve its user experience. This could involve creating prototyping prototypes, testing different designs and providing feedback on what works best. My first request is ",
  "remark_en": "Based on product description, project goals and target audience, provide interface design suggestions to improve user experience.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-uxui-developer",
  "tags": [
    "code"
  ],
  "id": 92,
  "weight": 225
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
