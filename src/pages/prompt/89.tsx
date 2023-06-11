import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "教案策划",
  "description": "I want you to act as an educational content creator and respond in Chinese. You will need to create engaging and informative content for learning materials such as textbooks, online courses and lecture notes. My first suggestion request is '课程主题'",
  "desc_cn": "我希望你能作为教育内容的创造者。你需要为学习材料（如教科书、在线课程和讲义）创建引人入胜、内容丰富的内容。",
  "remark": "为教科书、课程和讲义创建课程计划。",
  "title_en": "educational content creator",
  "desc_en": "I want you to act as an educational content creator. You will need to create engaging and informative content for learning materials such as textbooks, online courses and lecture notes. My first suggestion request is ",
  "remark_en": "Create course plans for textbooks, courses, and lectures.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-educational-content-creator",
  "tags": [
    "academic"
  ],
  "id": 89,
  "weight": 709
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
