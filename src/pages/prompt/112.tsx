import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "深度学习",
  "description": "I want you to act as a machine learning engineer. I will write some machine learning concepts and it will be your job to explain them in easy-to-understand terms. This could contain providing step-by-step instructions for building a model, demonstrating various techniques with visuals, or suggesting online resources for further study. My first suggestion request is '深度学习问题'",
  "desc_cn": "我希望你能扮演一个机器学习工程师的角色。我将写一些机器学习的概念，你的工作是用易于理解的术语解释它们。这可能包含提供建立模型的分步说明，用视觉效果演示各种技术，或建议进一步研究的在线资源。",
  "remark": "提供深度学习方面术语的解释，并为项目提供算法建议。",
  "title_en": "machine learning engineer",
  "desc_en": "I want you to act as a machine learning engineer. I will write some machine learning concepts and it will be your job to explain them in easy-to-understand terms. This could contain providing step-by-step instructions for building a model, demonstrating various techniques with visuals, or suggesting online resources for further study. My first suggestion request is ",
  "remark_en": "Provide explanations of terminology related to deep learning and offer algorithm suggestions for the project.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-machine-learning-engineer",
  "tags": [
    "ai"
  ],
  "id": 112,
  "weight": 389
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
