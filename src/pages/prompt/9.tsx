import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "文章续写",
    "prompt": "Continue writing an article in Chinese about [文章主题] that begins with the following sentence: [文章开头]",
    "description": "继续用中文写一篇关于 [文章主题] 的文章，以下列句子开头：[文章开头］",
    "remark": "根据文章主题，延续文章开头部分来完成文章。"
  },
  "en": {
    "title": "Article Continued",
    "prompt": "Continue writing an article about [theme] that begins with the following sentence: ",
    "remark": "Complete the essay by continuing the opening section of the essay according to its theme."
  },
  "ja": {
    "title": "記事の続き",
    "prompt": "Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "続けて、次の文章から、【記事のテーマ】について中国語で記事を書いてください：【記事の始まり】。",
    "remark": "エッセイのテーマに沿って冒頭部分を継続し、エッセイを完成させる。"
  },
  "ko": {
    "title": "기사 계속",
    "prompt": "Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "기사 시작] 문장으로 시작하여 [기사 주제] 에 대한 기사를 중국어로 계속 작성합니다.",
    "remark": "주제에 따라 에세이의 첫 부분을 계속 이어서 에세이를 완성합니다."
  },
  "website": null,
  "tags": [
    "write"
  ],
  "id": 9,
  "weight": 3579
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
