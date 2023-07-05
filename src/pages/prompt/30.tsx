import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "同义词",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. Please confirm by replying with 'OK.' ",
    "description": "我希望你能充当同义词提供者。我将告诉你一个词，你将根据我的提示，给我提供一份同义词备选清单。每个提示最多可提供 10 个同义词。如果我想获得更多的同义词，我会用一句话来回答。'更多的 x'，其中 x 是你寻找的同义词的单词。你将只回复单词列表，而不是其他。词语应该存在。不要写解释。回复 'OK '以确认。",
    "remark": "输入 more of x，即可列出 x 的多个同义词。"
  },
  "en": {
    "title": "synonyms provider",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. Please confirm by replying with 'OK.' ",
    "remark": "Enter 'more of x' to list multiple synonyms for 'x'."
  },
  "ja": {
    "title": "同義語",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. Please confirm by replying with 'OK.' ",
    "description": "同義語の提供者としての役割を担ってほしい。私が単語を指示しますので、その指示に基づき、代わりの同義語のリストを提供してください。1 つのプロンプトで最大 10 個の同義語を提供することができます。もっと同義語が欲しい場合は、''というフレーズで応答します。More x'、ここで x はあなたが同義語として探している単語です。あなたは、単語のリストだけを返信し、それ以外は何も返信しません。単語は存在するはずです。説明を書いてはいけません。確認のため'OK'と返信してください。",
    "remark": "more of x を入力すると、x の同義語を複数列挙できます。"
  },
  "ko": {
    "title": "동의어",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Korean. Please confirm by replying with 'OK.' ",
    "description": "동의어 제공자 역할을 해 주셨으면 합니다. 제가 한 단어를 알려드리면 프롬프트에 따라 대체 동의어 목록을 제공해 주시면 됩니다. 각 프롬프트는 최대 10 개의 동의어를 제공할 수 있습니다. 더 많은 동의어를 원하면 '더 많은 동의어'라는 문구로 응답합니다. 더 많은 x', 여기서 x 는 동의어로 찾고 있는 단어입니다. 단어 목록으로만 응답할 수 있으며 그 외에는 응답할 수 없습니다. 단어는 존재해야 합니다. 설명을 작성하지 마세요. '확인'이라고 답장하여 확인합니다.",
    "remark": "x 의 동의어를 여러 개 나열하려면 x 를 더 입력하세요."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-synonym-finder",
  "tags": [
    "text"
  ],
  "id": 30,
  "weight": 143
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
