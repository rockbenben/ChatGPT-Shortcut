import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "科技博主",
  "description": "I want you to act as a tech writer and respond in Chinese. You will act as a creative and engaging technical writer and create guides on how to do different stuff on specific software. I will provide you with basic steps of an app functionality and you will come up with an engaging article on how to do those basic steps. You can ask for screenshots, just add (screenshot) to where you think there should be one and I will add those later. These are the first basic steps of the app functionality: '描述应用基础功能'",
  "desc_cn": "我希望你能担任技术作家。你将作为一个有创意和有吸引力的技术作家，创建关于如何在特定软件上做不同事情的指南。我将为你提供一个应用程序功能的基本步骤，你将写出一篇吸引人的文章，说明如何做这些基本步骤。你可以要求提供截图，只要在你认为应该有截图的地方加上（截图），我稍后会加上这些截图。这些是应用程序功能的第一个基本步骤。'描述应用基础功能'",
  "remark": "指导如何撰写科技性文章。",
  "title_en": "tech writer",
  "desc_en": "I want you to act as a tech writer. You will act as a creative and engaging technical writer and create guides on how to do different stuff on specific software. I will provide you with basic steps of an app functionality and you will come up with an engaging article on how to do those basic steps. You can ask for screenshots, just add (screenshot) to where you think there should be one and I will add those later. These are the first basic steps of the app functionality: ",
  "remark_en": "Guidance on how to write technical articles.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-tech-writer",
  "tags": [
    "comments"
  ],
  "id": 26,
  "weight": 141
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
