import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "FAQs 生成器",
    "prompt": "Generate a list of 10 frequently asked questions based on the following content: [内容]. Respond in Chinese.",
    "description": "根据以下内容，生成一个 10 个常见问题的清单：[内容]",
    "remark": "基于内容生成常见问答。"
  },
  "en": {
    "title": "FAQs Generator",
    "prompt": "Generate a list of 10 frequently asked questions based on the following content: [内容]",
    "remark": "Generate common Q&A based on content."
  },
  "ja": {
    "title": "FAQ ジェネレーター",
    "prompt": "Generate a list of 10 frequently asked questions based on the following content: [内容]",
    "description": "以下に基づいて、よくある質問 10 個のリストを生成する：【目次】。",
    "remark": "コンテンツベースの FAQ 生成。"
  },
  "ko": {
    "title": "FAQ 생성기",
    "prompt": "Generate a list of 10 frequently asked questions based on the following content: [内容]",
    "description": "다음을 기반으로 자주 묻는 질문 10 개의 목록을 생성합니다.",
    "remark": "콘텐츠 기반 FAQ 생성."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 39,
  "weight": 258
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
