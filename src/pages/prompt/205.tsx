import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "总结：核心提炼",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary in Chinese?",
    "description": "你刚刚的表述非常准确和全面 但是难以记住 能不能进行粗略而不那么精准 但整体正确的简化通俗化表述",
    "remark": "对于 AI 给出的复杂回复进行简化总结，减掉一些过于细节的“必要性信息”。来自 @hanson-reas 的投稿。"
  },
  "en": {
    "title": "Core summary",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?",
    "remark": "Simplify and summarize complex AI responses by removing some of the overly detailed necessary information. Contributed by @hanson-reas."
  },
  "ja": {
    "title": "まとめ：コアのリファイン",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Janpanese. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?",
    "description": "今おっしゃったことは、非常に正確で包括的ですが、覚えるのが大変です。大雑把で正確さに欠けるが、全体的に正しい、簡略化・一般化した文章を作ることはできますか。",
    "remark": "AI が出す複雑な回答を、細かすぎる「必要な情報」の一部を除いて簡略化してまとめたものです。hanson-reas さんからの寄稿です。"
  },
  "ko": {
    "title": "요약: 핵심 개선",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Korean. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?",
    "description": "방금 말씀하신 내용은 매우 정확하고 포괄적이지만 기억하기 어렵습니다. 거칠고 정확도는 떨어지지만 전반적으로 정확한 단순화되고 일반화된 설명을 해주시겠습니까?",
    "remark": "지나치게 상세한 '필수 정보'를 제외하고 AI 가 제공하는 복잡한 응답을 간결하게 요약한 것입니다. 한슨 레아스 (@hanson-reas) 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "write"
  ],
  "id": 205,
  "weight": 874
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
