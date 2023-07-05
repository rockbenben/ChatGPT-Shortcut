import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "写作助理",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
    "description": "作为一名中文写作改进助理，你的任务是改进所提供文本的拼写、语法、清晰、简洁和整体可读性，同时分解长句，减少重复，并提供改进建议。请只提供文本的更正版本，避免包括解释。请从编辑以下文本开始：[文章内容］",
    "remark": "最常使用的 prompt，用于优化文本的语法、清晰度和简洁度，提高可读性。"
  },
  "en": {
    "title": "Writing assistant",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. Please begin by editing the following text:",
    "remark": "For optimising the grammar, clarity and conciseness of text and improving readability."
  },
  "ja": {
    "title": "ライティングアシスタント",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text:",
    "description": "文章改善アシスタントとして、提供された文章のスペル、文法、明確さ、簡潔さ、全体的な読みやすさを改善し、長い文章を分割し、繰り返しを減らし、改善案を提供することがあなたの仕事です。また、長い文章を短くし、繰り返しを減らし、改善案を提供してください。まず、次のテキストを編集してください： [記事の内容].",
    "remark": "文章の文法、明瞭さ、簡潔さを最適化し、読みやすさを向上させるために最もよく使われるプロンプトです。"
  },
  "ko": {
    "title": "글쓰기 도우미",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text:",
    "description": "중국어 작문 개선 도우미의 임무는 제공된 텍스트의 맞춤법, 문법, 명확성, 간결성 및 전반적인 가독성을 개선하고 긴 문장을 나누고 반복을 줄이며 개선에 대한 제안을 제공하는 것입니다. 수정된 버전의 텍스트만 제공하고 설명을 포함하지 마세요. 먼저 다음 텍스트를 수정해 주세요: [문서 내용]",
    "remark": "텍스트의 문법, 명확성, 간결성을 최적화하고 가독성을 개선하기 위해 가장 일반적으로 사용되는 프롬프트입니다."
  },
  "website": null,
  "tags": [
    "favorite",
    "write"
  ],
  "id": 2,
  "weight": 31631
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
