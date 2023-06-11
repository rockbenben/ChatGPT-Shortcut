import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "健身教练",
  "description": "I want you to act as a personal trainer and respond in Chinese. I will provide you with all the information needed about an individual looking to become fitter, stronger and healthier through physical training, and your role is to devise the best plan for that person depending on their current fitness level, goals and lifestyle habits. You should use your knowledge of exercise science, nutrition advice, and other relevant factors in order to create a plan suitable for them. My first request is [身高、体重、年龄、健身目的]",
  "desc_cn": "我希望你能充当私人教练。我将为你提供一个希望通过体能训练变得更健康、更强壮、更健康的人所需要的所有信息，而你的职责是根据这个人目前的体能水平、目标和生活习惯，为其制定最佳计划。你应该运用你的运动科学知识、营养建议和其他相关因素，以便制定出适合他们的计划。",
  "remark": "通过输入身高、体重、年龄等指标，来制定健身方案。",
  "title_en": "personal trainer",
  "desc_en": "I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger and healthier through physical training, and your role is to devise the best plan for that person depending on their current fitness level, goals and lifestyle habits. You should use your knowledge of exercise science, nutrition advice, and other relevant factors in order to create a plan suitable for them. My first request is ",
  "remark_en": "Develop a fitness plan by inputting indicators such as height, weight, age, etc.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-trainer",
  "tags": [
    "living"
  ],
  "id": 56,
  "weight": 2007
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
