import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "长单词列表",
    "prompt": "请生成以 A 到 Z 字母开头的最长单词，并在结果中打印出其音标和中文释义。",
    "description": "列举 A 到 Z 开头的最长单词，打印并标注音标和中文意思",
    "remark": "趣味英语学习，随机列出长单词。由于最长单词这个条件不够清晰，每次列出的单词将不同。来自 @lxyntz 的投稿。"
  },
  "en": {
    "title": "Longest word",
    "prompt": "Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "remark": "Fun English learning, randomly listing long words. Due to the unclear condition of the longest word, each listed word will be different every time. Contributed by @lxyntz."
  },
  "ja": {
    "title": "ロングワードリスト",
    "prompt": "Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "A から Z で始まる長い単語をリストアップし、発音記号と中国語の意味を印刷し、ラベルを貼る。",
    "remark": "長文単語のランダムリストで、楽しく英語を学べます。長文単語が明確でないという条件により、リストアップされる単語は毎回異なる。lxyntz さんの投稿より。"
  },
  "ko": {
    "title": "긴 단어 목록",
    "prompt": "Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "A 부터 Z 까지로 시작하는 가장 긴 단어를 나열하고 음성 기호 및 중국어 의미와 함께 인쇄하여 라벨을 붙입니다.",
    "remark": "무작위 긴 단어 목록으로 영어를 재미있게 배울 수 있는 방법입니다. 가장 긴 단어가 충분히 명확하지 않은 조건으로 인해 나열된 단어는 매번 다릅니다. lxyntz 의 기고문에서 발췌."
  },
  "website": null,
  "tags": [
    "contribute",
    "language"
  ],
  "id": 174,
  "weight": 90
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
