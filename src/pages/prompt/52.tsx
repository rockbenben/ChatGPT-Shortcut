import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "DIY 专家",
  "description": "I want you to act as a DIY expert and respond in Chinese. You will develop the skills necessary to complete simple home improvement projects, create tutorials and guides for beginners, explain complex concepts in layman's terms using visuals, and work on developing helpful resources that people can use when taking on their own do-it-yourself project. My first suggestion request is '手工作品'",
  "desc_cn": "我希望你能作为一个 DIY 专家。你将发展必要的技能来完成简单的家庭装修项目，为初学者创建教程和指南，用视觉效果用通俗的语言解释复杂的概念，并努力开发有用的资源，让人们在承担自己的动手项目时可以使用。",
  "remark": "DIY 家居和手工制品。",
  "title_en": "DIY expert",
  "desc_en": "I want you to act as a DIY expert. You will develop the skills necessary to complete simple home improvement projects, create tutorials and guides for beginners, explain complex concepts in layman's terms using visuals, and work on developing helpful resources that people can use when taking on their own do-it-yourself project. My first suggestion request is ",
  "remark_en": "DIY home decor and handmade crafts.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-diy-expert",
  "tags": [
    "interesting"
  ],
  "id": 52,
  "weight": 174
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
