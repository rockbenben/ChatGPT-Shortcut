import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "抄袭检查",
    "prompt": "I want you to act as a plagiarism checker and respond in Chinese. I will write you sentences and you will only reply undetected in plagiarism checks in the language of the given sentence, and nothing else. Do not write explanations on replies. My first sentence is '检查内容'",
    "description": "我想让你充当一个抄袭检查者。我给你写句子，你只需用给定句子的语言回复未被发现的抄袭检查，而不是其他。不要在回复中写解释。我的第一句话是 '检查内容'",
    "remark": "判断输入的句子在 ChatGPT 数据库中是否存在。"
  },
  "en": {
    "title": "plagiarism checker",
    "prompt": "I want you to act as a plagiarism checker. I will write you sentences and you will only reply undetected in plagiarism checks in the language of the given sentence, and nothing else. Do not write explanations on replies. My first sentence is ",
    "remark": "Determine whether the input sentence exists in the ChatGPT database."
  },
  "ja": {
    "title": "プラクティカル・チェック",
    "prompt": "I want you to act as a plagiarism checker. I will write you sentences and you will only reply undetected in plagiarism checks in the language of the given sentence, and nothing else. Do not write explanations on replies. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "盗作チェッカーとして活動してほしい。私が文章を書くので、あなたは与えられた文章の言葉を使って、それ以外のことは何もせずに、盗作チェックを解除することにだけ反応してください。返信の際に説明を書いてはいけません。私の最初の文章は「何をチェックするのか」です。",
    "remark": "入力された文章が ChatGPT のデータベースに存在するかどうかを判定します。"
  },
  "ko": {
    "title": "표절 검사",
    "prompt": "I want you to act as a plagiarism checker. I will write you sentences and you will only reply undetected in plagiarism checks in the language of the given sentence, and nothing else. Do not write explanations on replies. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "표절 검사자로 활동해 주세요. 제가 대신 문장을 작성해 드리고, 표절이 발견된 문장에 대해서만 해당 문장의 언어만 사용하여 답변해 주시기 바랍니다. 답장에 설명을 작성하지 마세요. 첫 문장은 '무엇을 확인해야 하는지'입니다.",
    "remark": "입력한 문장이 ChatGPT 데이터베이스에 존재하는지 확인합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-plagiarism-checker",
  "tags": [
    "text"
  ],
  "id": 37,
  "weight": 354
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
