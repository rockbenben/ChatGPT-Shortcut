import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "文本意图分类",
    "prompt": "Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [关键词]",
    "description": "将以下关键词列表根据其搜索意图（无论是商业、交易还是信息）分为几组：[关键词] 。",
    "remark": "根据搜索意图，对以下关键词列表进行商业型、交易型或信息型搜索意图的分组。"
  },
  "en": {
    "title": "Text Classification",
    "prompt": "Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords]",
    "remark": "According to the search intent, group the following keyword list into commercial, transactional or informational search intent."
  },
  "ja": {
    "title": "テキスト意図の分類",
    "prompt": "Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords]",
    "description": "次のキーワードのリストを、検索意図（商業的、取引的、情報的かどうか）に応じてグループに分ける：【キーワード】.",
    "remark": "以下のキーワードリストは、商業目的、取引目的、情報提供目的の検索意図によってグループ分けされています。"
  },
  "ko": {
    "title": "텍스트 의도 분류",
    "prompt": "Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords]",
    "description": "다음 키워드 목록을 검색 의도 (상업적, 거래 또는 정보 제공 등) 에 따라 그룹으로 나눕니다: [키워드] .",
    "remark": "다음 키워드 목록은 상업적, 거래 또는 정보 제공을 목적으로 하는 검색 의도에 따라 그룹화되어 있습니다."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 32,
  "weight": 90
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
