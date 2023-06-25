import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "页面 description",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. Respond in Chinese. They should be catchy with a call to action, including the term [主要关键词] in them: [页面内容]",
    "description": "生成 5 个独特的元描述，最多 150 个字符，用于以下文本。它们应该是吸引人的，有行动号召力，包括 [主要关键词]：[页面内容]",
    "remark": "为页面内容生成 Meta description。"
  },
  "en": {
    "title": "Page description",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. They should be catchy with a call to action, including the term [keywords] in them: [page content]",
    "remark": "Generate description for page content."
  },
  "ja": {
    "title": "ページの説明",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Janpanese. They should be catchy with a call to action, including the term [keywords] in them: [page content]",
    "description": "以下のテキストについて、150 文字以内のユニークなメタディスクリプションを 5 つ生成してください。それらは魅力的で、行動喚起があり、[メインキーワード]: [ページコンテンツ] を含む必要があります。",
    "remark": "ページコンテンツ用のメタディスクリプションを生成する。"
  },
  "ko": {
    "title": "페이지 설명",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Korean. They should be catchy with a call to action, including the term [keywords] in them: [page content]",
    "description": "다음 텍스트에 대해 최대 150 자의 고유한 메타 설명 5 개를 생성합니다. 매력적이고, 클릭 유도 문안이 있어야 하며, [주요 키워드]: [페이지 콘텐츠] 를 포함해야 합니다.",
    "remark": "페이지 콘텐츠에 대한 메타 설명을 생성합니다."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 38,
  "weight": 320
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
