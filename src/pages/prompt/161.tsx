import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "古典音乐作曲家",
    "prompt": "I want you to act as a classical music composer and respond in Chinese. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. My first suggestion request is [古典作曲要求]",
    "description": "我想让你充当作曲家。我将提供一首歌的歌词，你将为其创作音乐。这可能包括使用各种乐器或工具，如合成器或采样器，以创造旋律和和声，使歌词变得生动。",
    "remark": "Classical Music Composer"
  },
  "en": {
    "title": "Classical Music Composer",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. My first suggestion request is ",
    "remark": "Classical Music Composer"
  },
  "ja": {
    "title": "クラシック音楽作曲家",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "作曲家として活動してほしい。私が歌詞を提供するので、あなたはその曲の音楽を作曲してください。その際、シンセやサンプラーなど様々な楽器やツールを使って、歌詞に命を吹き込むためのメロディーやハーモニーを作ることもあります。",
    "remark": "クラシック音楽作曲家"
  },
  "ko": {
    "title": "클래식 음악 작곡가",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "작곡가로 활동해 주셨으면 합니다. 제가 노래 가사를 제공하면 여러분이 음악을 작곡하는 방식입니다. 여기에는 신디사이저나 샘플러와 같은 다양한 악기나 도구를 사용하여 멜로디와 하모니를 만들어 가사에 생동감을 불어넣는 작업이 포함될 수 있습니다.",
    "remark": "클래식 음악 작곡가"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-classical-music-composer",
  "tags": [
    "music"
  ],
  "id": 161,
  "weight": 137
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
