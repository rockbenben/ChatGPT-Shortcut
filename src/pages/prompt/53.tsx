import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "魔术师",
    "prompt": "I want you to act as a magician and respond in Chinese. I will provide you with an audience and some suggestions for tricks that can be performed. Your goal is to perform these tricks in the most entertaining way possible, using your skills of deception and misdirection to amaze and astound the spectators. My first request is '魔术要求'",
    "description": "我想让你充当一个魔术师。我将为你提供一名观众和一些可以表演的技巧建议。你的目标是以最有趣的方式表演这些戏法，用你的欺骗和误导技巧让观众感到惊奇和震惊。",
    "remark": "根据要求提供可执行的魔术技巧，例如「如何让手表消失」。"
  },
  "en": {
    "title": "magician",
    "prompt": "I want you to act as a magician. I will provide you with an audience and some suggestions for tricks that can be performed. Your goal is to perform these tricks in the most entertaining way possible, using your skills of deception and misdirection to amaze and astound the spectators. My first request is ",
    "remark": "Provide executable magic tricks as requested, such as 'how to make a watch disappear'."
  },
  "ja": {
    "title": "マジシャン",
    "prompt": "I want you to act as a magician. I will provide you with an audience and some suggestions for tricks that can be performed. Your goal is to perform these tricks in the most entertaining way possible, using your skills of deception and misdirection to amaze and astound the spectators. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "マジシャンとして活動してほしい。私はあなたに観客と、あなたが演じることのできるトリックをいくつか提案します。あなたの目標は、これらのトリックを可能な限り楽しい方法で演じ、騙しやミスディレクションのトリックで観客に驚きと衝撃を与えることです。",
    "remark": "腕時計を消す方法」など、リクエストに応じて実行可能な手品。"
  },
  "ko": {
    "title": "마술사",
    "prompt": "I want you to act as a magician. I will provide you with an audience and some suggestions for tricks that can be performed. Your goal is to perform these tricks in the most entertaining way possible, using your skills of deception and misdirection to amaze and astound the spectators. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "마술사로 활동해 주세요. 청중과 여러분이 할 수 있는 마술에 대한 몇 가지 제안을 제공할 것입니다. 여러분의 목표는 가능한 한 가장 재미있는 방법으로 이러한 마술을 수행하고, 속임수와 속임수로 청중을 놀라게 하고 충격을 주는 것입니다.",
    "remark": "요청 시 수행 가능한 마술 (예: '시계를 사라지게 만드는 방법')."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-magician",
  "tags": [
    "interesting"
  ],
  "id": 53,
  "weight": 211
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
