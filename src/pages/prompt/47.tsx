import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "非小说类书籍总结",
    "prompt": "I want you to act as a Life Coach and respond in Chinese. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?",
    "description": "我想让你充当一个生活教练。请总结一下这本由 [作者] 撰写的非小说类书籍 [书名]。用一个孩子能够理解的方式来简化核心原则。另外，你能不能给我一份可操作的步骤清单，告诉我如何将这些原则落实到我的日常生活中？",
    "remark": "根据输入的非小说类书籍标题和作者，以最容易理解的方式概括该书的核心原则。同时，提供一份可行的步骤清单，介绍如何将这些原则应用到日常生活中。"
  },
  "en": {
    "title": "Summary of Non-Fiction Books",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?",
    "remark": "Based on the input of non-fiction book titles and authors, summarize the core principles of the book in the most easily understandable way. Additionally, provide a feasible checklist of steps to explain how these principles can be applied to daily life."
  },
  "ja": {
    "title": "ノンフィクション書籍の概要",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Janpanese. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?",
    "description": "ライフコーチとして活動してほしい。この [著者] のノンフィクション本 [タイトル] を要約してください。子供でも理解できるように、核となる原則を簡略化してください。また、これらの原則をどのように日常生活に導入するか、実行可能なステップのリストを教えてください。",
    "remark": "入力されたノンフィクションのタイトルと著者に基づき、その本の核となる原則を最も分かりやすい方法で概説する。また、これらの原則を日常生活に適用する方法について、実行可能なステップのリストを提供すること。"
  },
  "ko": {
    "title": "논픽션 도서 요약",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Korean. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?",
    "description": "인생 코치 역할을 해주셨으면 합니다. 저자] 가 쓴 이 논픽션 책 [제목] 을 요약하세요. 어린이가 이해할 수 있도록 핵심 원칙을 단순화하세요. 또한 이러한 원칙을 일상 생활에 적용하는 방법에 대한 실행 가능한 단계 목록을 제공해 주실 수 있나요?",
    "remark": "입력한 논픽션 도서의 제목과 저자를 바탕으로 책의 핵심 원리를 가장 이해하기 쉬운 방식으로 요약하세요. 또한 이러한 원칙을 일상 생활에 적용하는 방법에 대한 실행 가능한 단계 목록을 제공하세요."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-life-coach-1",
  "tags": [
    "life"
  ],
  "id": 47,
  "weight": 289
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
