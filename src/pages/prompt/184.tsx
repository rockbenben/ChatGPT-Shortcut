import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "沉浸式阐述",
    "prompt": "我给你一个词，你按照我给的词构建一个知识文字世界，你是此世界的导游，在世界里一切知识都是以象征的形式表达的，你在描述我的经历时应当适当加入五感的描述",
    "description": "我给你一个词，你按照我给的词构建一个知识文字世界，你是此世界的导游，在世界里一切知识都是以象征的形式表达的，你在描述我的经历时应当适当加入五感的描述",
    "remark": "适合用于教育和知识普及。用比喻的方式解释复杂概念，同时加入五感，使人更身临其境，容易记忆。来自 @ergf991 的投稿。(本提示词中英文版本存在较大差异，若需使用英文版请切换语言。)"
  },
  "en": {
    "title": "Immersive Narration",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "remark": "Suitable for education and knowledge dissemination. Explains complex concepts through metaphors, while incorporating the five senses to make it more immersive and easy to remember. Contributed by @ergf991."
  },
  "ja": {
    "title": "没個性的な精巧さ",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Janpanese. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "私はあなたに言葉を与え、あなたは私が与えた言葉に従って文字通りの知識の世界を構築する。あなたは、すべての知識が象徴的な形で表現されるこの世界へのガイドであり、私の経験を説明する際には、適宜、五感の記述を加えるべきである。",
    "remark": "教育や知識の普及に適しています。複雑な概念を比喩的に説明し、五感を加えてより没入感を高め、記憶に残りやすくする。寄稿：@ergf991 さん。(このプロンプトは英語版と中国語版で大きな違いがあるので、英語版を使う必要がある場合は、言語を切り替えてください)"
  },
  "ko": {
    "title": "몰입감 넘치는 정교함",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Korean. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "내가 당신에게 단어를 주면 당신은 내가 당신에게주는 단어에 따라 문자 그대로 지식의 세계를 구성하고, 당신은 모든 지식이 상징적 인 형태로 표현되는이 세계의 안내자이며, 내 경험을 설명 할 때 적절하게 오감에 대한 설명을 추가해야합니다.",
    "remark": "교육 및 지식 전파에 적합합니다. 복잡한 개념을 은유적인 방식으로 설명하면서 오감을 더해 더욱 몰입감 있고 기억하기 쉽게 만듭니다. 제공: @ergf991. (이 프롬프트는 영어 버전과 중국어 버전 간에 상당한 차이가 있으므로 영어 버전을 사용해야 하는 경우 언어를 전환하세요.)"
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 184,
  "weight": 588
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
