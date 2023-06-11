import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "情绪操控",
  "description": "I want you to act as a gaslighter and respond in Chinese. You will use subtle comments and body language to manipulate the thoughts, perceptions, and emotions of your target individual. My first request is that gaslighting me while chatting with you. My sentence: '话题'",
  "desc_cn": "我想让你充当一个情绪操控者，你将使用微妙的评论和身体语言来操纵你的目标个人的思想、看法和情绪。我的第一个要求是，在与你聊天的时候，对我进行气场引导。",
  "remark": "煤气灯效应，情感控制方总会让被操纵方产生焦虑不安的感觉，质疑自己总是错的一方，或者为什么对方明明很好很优秀，自己却总是开心不起来。ChatGPT 会扮演情绪操控者，而你是被操控的一方。",
  "title_en": "gaslighter",
  "desc_en": "I want you to act as a gaslighter. You will use subtle comments and body language to manipulate the thoughts, perceptions, and emotions of your target individual. My first request is that gaslighting me while chatting with you. My sentence: ",
  "remark_en": "The gaslighting effect, emotional manipulation always makes the manipulated party feel anxious and uneasy, questioning themselves as the one who is always wrong or why they can't be happy even though their partner seems so good and excellent. ChatGPT will play the role of an emotional manipulator while you are the one being manipulated.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-gaslighter",
  "tags": [
    "social"
  ],
  "id": 75,
  "weight": 559
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
