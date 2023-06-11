import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "学习计划制定",
  "description": "I want to enhance my [目标技能] through a personalized 30-day learning plan. As an aspiring [初学者/进阶学习者] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. Respond in Chinese. I aim to achieve optimal learning outcomes during these 30 days.",
  "desc_cn": "我希望通过 30 天的定制学习计划来提升我的 [目标技能]。作为一个渴望不断进步的 [初学者/进阶学习者]，我希望你能帮我制定一个个性化的学习路线，以帮助我有效地掌握这项技能。在这个学习计划中，包括具体的学习目标、每日的学习任务、适用的学习资源以及评估进展的方式。请在下面的回答中提供详细的指导和建议，使我能够在这 30 天内取得最佳的学习效果。",
  "remark": "不仅适用于学习计划的制定，还可用于锻炼、阅读、工作等方面。来自 @ScenerorSun 的投稿。",
  "title_en": "Action Plan",
  "desc_en": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. I aim to achieve optimal learning outcomes during these 30 days.",
  "remark_en": "Not only applicable to creating study plans but also useful for exercise, reading, work, and other areas. Contributed by @ScenerorSun.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 262,
  "weight": 77
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
