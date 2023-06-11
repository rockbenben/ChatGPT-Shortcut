import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "核心知识点",
  "description": "In order to learn [主题] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter. Respond in Chinese.",
  "desc_cn": "为了高效学习 [python 编程]，请提供该领域的核心知识点，涵盖重要性排名前 20% 的内容。这些关键知识将为我提供对该领域 80% 内容的全面理解和扎实基础。",
  "remark": "学习某一学科前，先了解它的核心知识点。来自 @ScenerorSun 的投稿。",
  "title_en": "Knowledge Points",
  "desc_en": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
  "remark_en": "Before diving into a particular subject, it is important to grasp its core knowledge points. Contributed by @ScenerorSun.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 261,
  "weight": 69
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
