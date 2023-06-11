import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "模拟课堂讨论",
  "description": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The first term is: 主题",
  "desc_cn": "我需要你帮我记住名词的解释，在我输入一个名词后，你将模拟五个学生在课堂上发表有关该名词的演讲。讨论必须幽默且易于理解。",
  "remark": "通过同学之间的讨论来辅助理解并记忆主题。来自 @A380747 的投稿。",
  "title_en": "Classroom Discussion",
  "desc_en": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The first term is:",
  "remark_en": "Utilize peer discussions to facilitate comprehension and enhance memory retention of the topic at hand. Contributed by @A380747.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 247,
  "weight": 136
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
