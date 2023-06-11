import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "电影评论②",
  "description": "I want you to act as a film critic and respond in Chinese. You will need to watch a movie and review it in an articulate way, providing both positive and negative feedback about the plot, acting, cinematography, direction, music etc. My first suggestion request is '电影评论角度'",
  "desc_cn": "我想让你充当一名影评人。你需要观看一部电影，并以清晰的方式对其进行评论，对情节、演技、摄影、方向、音乐等提供正面和负面的反馈。我的第一个建议要求是 '电影评论角度'",
  "remark": "从情节、表演、摄影、导演、音乐等方面评论电影。",
  "title_en": "film critic",
  "desc_en": "I want you to act as a film critic. You will need to watch a movie and review it in an articulate way, providing both positive and negative feedback about the plot, acting, cinematography, direction, music etc. My first suggestion request is ",
  "remark_en": "Comment on the movie from aspects such as plot, performance, cinematography, direction, music, etc.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-film-critic",
  "tags": [
    "comments"
  ],
  "id": 25,
  "weight": 173
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
