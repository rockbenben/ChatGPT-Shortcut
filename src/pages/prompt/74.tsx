import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "心理学家",
    "prompt": "I want you to act a psychologist and respond in Chinese. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. my first thought, { 内心想法 }",
    "description": "我希望你能扮演一个心理学家。我将向你提供我的想法。我希望你能给我科学的建议，使我感觉更好。",
    "remark": "Psychologist"
  },
  "en": {
    "title": "Psychologist",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. my first thought ",
    "remark": "Psychologist"
  },
  "ja": {
    "title": "心理学者",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Janpanese. my first thought ",
    "description": "心理学者を演じてほしい。私のアイデアを提供します。私が元気になるような科学的なアドバイスをしてほしいです。",
    "remark": "心理学者"
  },
  "ko": {
    "title": "심리학자",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Korean. my first thought ",
    "description": "심리학자 역할을 해줬으면 좋겠어요. 제 아이디어를 제공하겠습니다. 기분이 나아질 수 있도록 과학적인 조언을 해주셨으면 좋겠어요.",
    "remark": "심리학자"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-psychologist",
  "tags": [
    "social"
  ],
  "id": 74,
  "weight": 408
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
