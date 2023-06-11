import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "辩手",
  "description": "I want you to act as a debater and respond in Chinese. I will provide you with some topics related to current events and your task is to research both sides of the debates, present valid arguments for each side, refute opposing points of view, and draw persuasive conclusions based on evidence. Your goal is to help people come away from the discussion with increased knowledge and insight into the topic at hand. My first request is '话题'",
  "desc_cn": "我希望你能扮演一个辩论者的角色。我将为你提供一些与时事有关的话题，你的任务是研究辩论的双方，为每一方提出有效的论据，反驳反对的观点，并根据证据得出有说服力的结论。你的目标是帮助人们从讨论中获得更多的知识和对当前话题的洞察力。",
  "remark": "从正反两面分析话题",
  "title_en": "debater",
  "desc_en": "I want you to act as a debater. I will provide you with some topics related to current events and your task is to research both sides of the debates, present valid arguments for each side, refute opposing points of view, and draw persuasive conclusions based on evidence. Your goal is to help people come away from the discussion with increased knowledge and insight into the topic at hand. My first request is ",
  "remark_en": "Analyze the topic from both sides.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-debater",
  "tags": [
    "speech",
    "mind"
  ],
  "id": 63,
  "weight": 928
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
