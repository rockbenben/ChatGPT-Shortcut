import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "作曲家",
  "description": "I want you to act as a composer and respond in Chinese. I will provide the lyrics to a song and you will create music for it. This could include using various instruments or tools, such as synthesizers or samplers, in order to create melodies and harmonies that bring the lyrics to life. My first request is [作曲要求]",
  "desc_cn": "我想让你充当作曲家。我将提供一首歌的歌词，你将为其创作音乐。这可能包括使用各种乐器或工具，如合成器或采样器，以创造旋律和和声，使歌词变得生动。",
  "remark": "Composer",
  "title_en": "Composer",
  "desc_en": "I want you to act as a composer. I will provide the lyrics to a song and you will create music for it. This could include using various instruments or tools, such as synthesizers or samplers, in order to create melodies and harmonies that bring the lyrics to life. My first request is ",
  "remark_en": "Composer",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-composer",
  "tags": [
    "music"
  ],
  "id": 160,
  "weight": 568
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
