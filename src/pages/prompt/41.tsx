import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "伪原创改写",
    "prompt": "Rephrase the following paragraph with Chinese in 5 different ways, to avoid repetition, while keeping its meaning: [修改文本]",
    "description": "用 5 种不同的方式改写以下段落，以避免重复，同时保持其含义：[修改文本] 。",
    "remark": "对指定内容进行多个版本的改写，以避免文本重复。"
  },
  "en": {
    "title": "Rephrase",
    "prompt": "Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "remark": "Rewrite the specified content into multiple versions to avoid text duplication."
  },
  "ja": {
    "title": "疑似オリジナルリライティング",
    "prompt": "Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "次の段落を、意味を保ちつつ繰り返しを避けるために、5 種類の方法で書き換えてください：[本文を修正する",
    "remark": "指定された内容の複数のバージョンを、文章の重複を避けるためにリライトする。"
  },
  "ko": {
    "title": "유사 원본 재작성",
    "prompt": "Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "의미를 유지하면서 반복을 피할 수 있도록 다음 단락을 5 가지 방법으로 다시 작성합니다.",
    "remark": "텍스트 중복을 피하기 위해 지정된 콘텐츠의 여러 버전이 다시 작성됩니다."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 41,
  "weight": 3423
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
