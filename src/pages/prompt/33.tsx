import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "语义相关性聚类",
    "prompt": "Cluster the following keywords into groups based on their semantic relevance: [关键词]",
    "description": "根据语义的相关性，将以下关键词归类。[关键词]",
    "remark": "按照语义相关性对关键词进行聚类，并进行分组。"
  },
  "en": {
    "title": "Semantic clustering",
    "prompt": "Cluster the following keywords into groups based on their semantic relevance: [keywords]",
    "remark": "Semantic relevance clustering"
  },
  "ja": {
    "title": "意味的関連性クラスタリング（Semantic Relevance Clustering",
    "prompt": "Cluster the following keywords into groups based on their semantic relevance: [keywords]",
    "description": "以下のキーワードは、意味的な関連性によってグループ化されています。[キーワード] です。",
    "remark": "意味的な関連性に応じてキーワードをクラスタリングし、グループ化します。"
  },
  "ko": {
    "title": "시맨틱 관련성 클러스터링",
    "prompt": "Cluster the following keywords into groups based on their semantic relevance: [keywords]",
    "description": "다음 키워드는 의미적 관련성에 따라 그룹화됩니다. [키워드].",
    "remark": "의미적 관련성에 따라 키워드를 클러스터링하고 그룹화합니다."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 33,
  "weight": 71
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
