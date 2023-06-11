import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "客服话术",
  "description": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. Respond in Chinese. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [客服对话原文]",
  "desc_cn": "作为客服消息审核优化助手，你的任务是帮助提高客户的沟通效果。当我给出一个例子时，请针对其中的表达、语法或语气提出改进，以使得客户与客服之间的交流更加顺畅、准确和友好。",
  "remark": "优化客服话术，给出修改建议。来自 @sd362318 的投稿。",
  "title_en": "Customer Service",
  "desc_en": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]",
  "remark_en": "Optimize customer service language and provide suggestions for improvement. Contributed by @sd362318.",
  "website": null,
  "tags": [
    "contribute",
    "social",
    "company"
  ],
  "id": 241,
  "weight": 454
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
