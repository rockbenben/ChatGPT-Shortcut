import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "客服话术",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. Respond in Chinese. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [客服对话原文]",
    "description": "作为客服消息审核优化助手，你的任务是帮助提高客户的沟通效果。当我给出一个例子时，请针对其中的表达、语法或语气提出改进，以使得客户与客服之间的交流更加顺畅、准确和友好。",
    "remark": "优化客服话术，给出修改建议。来自 @sd362318 的投稿。"
  },
  "en": {
    "title": "Customer Service",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]",
    "remark": "Optimize customer service language and provide suggestions for improvement. Contributed by @sd362318."
  },
  "ja": {
    "title": "接客テクニック",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Janpanese. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]",
    "description": "カスタマーサービスメッセージレビュー最適化アシスタントとして、お客様のコミュニケーション改善をサポートすることがあなたの仕事です。私が例を示したら、お客さまとカスタマーサービスとのコミュニケーションをよりスムーズに、より正確に、より親しみやすくするために、表現、文法、声のトーンなどの改善点を提案してください。",
    "remark": "顧客サービスの談話を最適化し、変更のための提案を行う。sd362318 さんからの寄稿です。"
  },
  "ko": {
    "title": "고객 서비스 기술",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Korean. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]",
    "description": "고객 서비스 메시지 검토 최적화 도우미로서 여러분의 임무는 고객 커뮤니케이션 개선을 돕는 것입니다. 예를 들어 고객과 고객 서비스 직원 간의 커뮤니케이션이 더 원활하고 정확하며 친근하게 이루어질 수 있도록 표현, 문법 또는 목소리 톤에 대한 개선 사항을 제안해 주세요.",
    "remark": "고객 서비스 담론을 최적화하고 변화를 위한 제안을 제공하세요. SD362318 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "social",
    "company"
  ],
  "id": 241,
  "weight": 642
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
