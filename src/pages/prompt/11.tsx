import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "总结内容",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. Respond in Chinese. Please begin by editing the following text: ",
    "description": "将以下文字概括为 100 个字，使其易于阅读和理解。避免使用复杂的句子结构或技术术语。",
    "remark": "将文本内容总结为 100 字。"
  },
  "en": {
    "title": "Summary",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. Please begin by editing the following text: ",
    "remark": "Summarize the text in 100 words."
  },
  "ja": {
    "title": "要約内容",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "次の文章を、読みやすく、理解しやすいように 100 字に要約してください。複雑な文型や専門用語は避けること。",
    "remark": "本文は 100 字で要約しています。"
  },
  "ko": {
    "title": "요약 콘텐츠",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "다음 텍스트를 읽고 이해하기 쉽도록 100 개의 단어로 요약하세요. 복잡한 문장 구조나 전문 용어는 피하세요.",
    "remark": "텍스트는 100 단어로 요약되어 있습니다."
  },
  "website": null,
  "tags": [
    "write"
  ],
  "id": 11,
  "weight": 3417
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
