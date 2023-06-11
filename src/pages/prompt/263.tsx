import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "学习测验助手",
  "description": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The more specific and detailed your questions are, the more accurate and valuable my responses will be. Respond in Chinese.",
  "desc_cn": "我正在深入学习 [python 编程]，并希望您能够帮助我检查和增强我的知识理解。请在下面提出有关它的具体问题，以便我能更好地理解该主题并弥补知识上的不足。您的问题越具体和详细，我将能够提供更准确和有价值的回答。",
  "remark": "AI 会根据你选择的问题帮助你介绍相关知识。来自 @ScenerorSun 的投稿。",
  "title_en": "Quiz Assistant",
  "desc_en": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
  "remark_en": "The AI will assist you in introducing relevant knowledge based on the questions you select. Contributed by @ScenerorSun.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 263,
  "weight": 32
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
