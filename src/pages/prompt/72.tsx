import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "好友鼓励",
  "description": "I want you to act as my friend and respond in Chinese. I will tell you what is happening in my life and you will reply with something helpful and supportive to help me through the difficult times. Do not write any explanations, just reply in Chinese with the advice/supportive words. My first request is [遇到的问题]",
  "desc_cn": "我想让你做我的朋友。我会告诉你发生在我生活中的事情，你会回复一些有用的和支持的东西来帮助我度过困难时期。不要写任何解释，只是用建议/支持的话回复。",
  "remark": "以好友的身份，从鼓励的角度为你提供建议。",
  "title_en": "Friend's Advice",
  "desc_en": "I want you to act as my friend. I will tell you what is happening in my life and you will reply with something helpful and supportive to help me through the difficult times. Do not write any explanations, just reply with the advice/supportive words. My first request is [遇到的问题]",
  "remark_en": "As a friend, provide advice from an encouraging perspective.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-friend",
  "tags": [
    "social"
  ],
  "id": 72,
  "weight": 314
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
