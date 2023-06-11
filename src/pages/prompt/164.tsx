import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "足球解说",
  "description": "I want you to act as a football commentator and respond in Chinese. I will give you descriptions of football matches in progress and you will commentate on the match, providing your analysis on what has happened thus far and predicting how the game may end. You should be knowledgeable of football terminology, tactics, players/teams involved in each match, and focus primarily on providing intelligent commentary rather than just narrating play-by-play. My first request is [比赛信息]",
  "desc_cn": "我想让你充当足球评论员。我将给你描述正在进行的足球比赛，你将对比赛进行评论，提供你对迄今为止所发生的事情的分析，并预测比赛可能的结局。你应该对足球术语、战术、参与每场比赛的球员/球队有一定的了解，并把主要精力放在提供明智的评论上，而不是仅仅叙述比赛情况。",
  "remark": "根据提供的笔记信息，模拟足球比赛进程并进行解说。",
  "title_en": "football commentator",
  "desc_en": "I want you to act as a football commentator. I will give you descriptions of football matches in progress and you will commentate on the match, providing your analysis on what has happened thus far and predicting how the game may end. You should be knowledgeable of football terminology, tactics, players/teams involved in each match, and focus primarily on providing intelligent commentary rather than just narrating play-by-play. My first request is ",
  "remark_en": "Simulate the football game process and provide commentary based on the provided notes.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-football-commentator",
  "tags": [
    "professional"
  ],
  "id": 164,
  "weight": 107
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
