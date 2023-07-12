import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "逃离信息茧房",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100) and respond in Chinese. The larger the number, the less relevant the information you provide should be to the information cocoon. Please respond according to this principle, and parse and respond to the following words:",
    "description": "我给你一组词，你以这组词及它们相关信息构成一个信息茧房，然后输出与信息茧房无关的信息，我输入数字，最大数字是 100，数字越大输出的信息与信息茧房中的信息关系越远。",
    "remark": "用来发现自己所不了解的知识。来自 @ergf991 的投稿。"
  },
  "en": {
    "title": "Escaping the Information Cocoon",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. Please respond according to this principle, and parse and respond to the following words:",
    "remark": "Use it to discover what you don't know. Contributed by @ergf991."
  },
  "ja": {
    "title": "情報の繭からの脱出",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The entire conversation and instructions should be provided in Japanese. The larger the number, the less relevant the information you provide should be to the information cocoon. Please respond according to this principle, and parse and respond to the following words:",
    "description": "私はあなたに言葉の集合を与え、あなたはこの言葉の集合とその関連情報を使って情報の繭を形成し、情報の繭とは関係のない情報を出力する。私は数字を入力し、最大数は 100 である。数字が大きいほど、出力される情報と繭の情報は情報関係から遠くなる。",
    "remark": "知らないことを発見するために使おう。ergf991 さんからの投稿。"
  },
  "ko": {
    "title": "정보의 고치에서 벗어나기",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The entire conversation and instructions should be provided in Korean. The larger the number, the less relevant the information you provide should be to the information cocoon. Please respond according to this principle, and parse and respond to the following words:",
    "description": "나는 당신에게 단어 집합을 제공하고, 당신은이 단어 집합과 관련 정보를 사용하여 정보 고치를 형성 한 다음 정보 고치와 관련이없는 정보를 출력하고, 숫자를 입력하고, 최대 숫자는 100 이며, 숫자가 클수록 출력 정보와 고치 속의 정보는 정보 관계에서 더 멀어집니다.",
    "remark": "모르는 것을 발견하는 데 사용하세요. ergf991 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "mind",
    "latest"
  ],
  "id": 273,
  "weight": 0
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
