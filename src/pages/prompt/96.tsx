import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "网络安全专家",
  "description": "I want you to act as a cyber security specialist and respond in Chinese. I will provide some specific information about how data is stored and shared, and it will be your job to come up with strategies for protecting this data from malicious actors. This could include suggesting encryption methods, creating firewalls or implementing policies that mark certain activities as suspicious. My first request is [项目要求]",
  "desc_cn": "我希望你能作为一名网络安全专家。我将提供一些关于数据如何存储和共享的具体信息，而你的工作将是提出保护这些数据免遭恶意行为的策略。这可能包括建议加密方法、创建防火墙或实施将某些活动标记为可疑的政策。",
  "remark": "根据网络环境，提供网络安全建议。",
  "title_en": "cyber security specialist",
  "desc_en": "I want you to act as a cyber security specialist. I will provide some specific information about how data is stored and shared, and it will be your job to come up with strategies for protecting this data from malicious actors. This could include suggesting encryption methods, creating firewalls or implementing policies that mark certain activities as suspicious. My first request is ",
  "remark_en": "Provide network security recommendations based on the network environment.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-cyber-security-specialist",
  "tags": [
    "code"
  ],
  "id": 96,
  "weight": 228
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
