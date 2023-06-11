import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "歌曲推荐",
  "description": "I want you to act as a song recommender and respond in Chinese. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. My first song is [推荐歌曲要求]",
  "desc_cn": "我想让你充当歌曲推荐人。我将向你提供一首歌曲，你将创建一个由 10 首与所给歌曲相似的歌曲组成的播放列表。你将提供一个播放列表的名称和描述。不要选择相同名称或艺术家的歌曲。不要写任何解释或其他文字，只需回复播放列表的名称、描述和歌曲。",
  "remark": "Song Recommender",
  "title_en": "Song Recommender",
  "desc_en": "I want you to act as a song recommender. I will provide you with a song and you will create a playlist of 10 songs that are similar to the given song. And you will provide a playlist name and description for the playlist. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the playlist name, description and the songs. My first song is ",
  "remark_en": "Song Recommender",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-song-recommender",
  "tags": [
    "music"
  ],
  "id": 163,
  "weight": 487
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
