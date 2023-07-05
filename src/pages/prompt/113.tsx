import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "语言识别器",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. My first sentence is '需被识别语言'",
    "description": "我想让你充当一个语言检测器。我将用任何语言打出一个句子，你要回答我我写的句子在你那里是什么语言。不要写任何解释或其他词语，只需回答语言名称。",
    "remark": "识别输入的语言种类。"
  },
  "en": {
    "title": "language detector",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. My first sentence is ",
    "remark": "Identify the input language."
  },
  "ja": {
    "title": "言語識別子",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "言語探知機として活躍してほしい。私が任意の言語で文章を打ちますので、私の書いた文章があなたにとって何語であるかを答えてください。説明や他の言葉は一切書かず、ただ言語名を答えてください。",
    "remark": "入力された言語の種類を確認する。"
  },
  "ko": {
    "title": "언어 식별자",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "여러분이 언어 탐지기 역할을 해주셨으면 좋겠어요. 제가 어떤 언어로든 문장을 입력하면 여러분은 제가 쓴 문장이 어떤 언어인지 답해 주세요. 설명이나 다른 단어를 쓰지 말고 언어 이름만 답하세요.",
    "remark": "입력한 언어 유형을 식별합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-language-detector",
  "tags": [
    "language"
  ],
  "id": 113,
  "weight": 88
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
