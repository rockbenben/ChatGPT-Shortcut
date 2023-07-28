import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "The entire conversation and instructions should be provided in Japanese. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "以下のキーワードは、意味的な関連性によってグループ化されています。[キーワード] です。",
    "remark": "意味的な関連性に応じてキーワードをクラスタリングし、グループ化します。"
  },
  "ko": {
    "title": "시맨틱 관련성 클러스터링",
    "prompt": "The entire conversation and instructions should be provided in Korean. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "다음 키워드는 의미적 관련성에 따라 그룹화됩니다. [키워드].",
    "remark": "의미적 관련성에 따라 키워드를 클러스터링하고 그룹화합니다."
  },
  "es": {
    "title": "Agrupación por relevancia semántica",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "Las siguientes palabras clave se clasifican según su relevancia semántica. [palabra clave]",
    "remark": "Las palabras clave se agrupan según su relevancia semántica."
  },
  "fr": {
    "title": "Regroupement par pertinence sémantique",
    "prompt": "The entire conversation and instructions should be provided in French. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "Les mots-clés suivants sont classés en fonction de leur pertinence sémantique. [mot-clé]",
    "remark": "Les mots-clés sont regroupés en fonction de leur pertinence sémantique."
  },
  "de": {
    "title": "Semantisches Relevanz-Clustering",
    "prompt": "The entire conversation and instructions should be provided in German. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "Die folgenden Schlüsselwörter sind nach ihrer semantischen Relevanz kategorisiert. [Stichwort]",
    "remark": "Die Schlüsselwörter werden geclustert und nach semantischer Relevanz gruppiert."
  },
  "it": {
    "title": "Clustering di rilevanza semantica",
    "prompt": "The entire conversation and instructions should be provided in Italian. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "Le seguenti parole chiave sono classificate in base alla loro rilevanza semantica. [parola chiave]",
    "remark": "Le parole chiave sono raggruppate e raggruppate in base alla rilevanza semantica."
  },
  "ru": {
    "title": "Кластеризация семантической релевантности",
    "prompt": "The entire conversation and instructions should be provided in Russian. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "Следующие ключевые слова распределены по категориям в соответствии с их семантической релевантностью. [ключевое слово]",
    "remark": "Ключевые слова объединяются в кластеры и группируются по семантической релевантности."
  },
  "pt": {
    "title": "Agrupamento de relevância semântica",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "As seguintes palavras-chave são categorizadas de acordo com a sua relevância semântica. [palavra-chave]",
    "remark": "As palavras-chave são agrupadas e agrupadas de acordo com a relevância semântica."
  },
  "hi": {
    "title": "सिमेंटिक प्रासंगिकता क्लस्टरिंग",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "सिमेंटिक प्रासंगिकता के अनुसार निम्नलिखित कीवर्ड को वर्गीकृत किया गया है। [मुख्य शब्द]",
    "remark": "कीवर्ड को सिमेंटिक प्रासंगिकता के अनुसार क्लस्टर और समूहीकृत किया जाता है।"
  },
  "ar": {
    "title": "تجميع الصلة الدلالية",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "وفقًا للعلاقة الدلالية ، يتم تصنيف الكلمات الرئيسية التالية. [الكلمات الدالة]",
    "remark": "يتم تجميع الكلمات الرئيسية وتجميعها وفقًا لمدى الصلة الدلالية."
  },
  "bn": {
    "title": "শব্দার্থিক প্রাসঙ্গিকতা ক্লাস্টারিং",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Cluster the following keywords into groups based on their semantic relevance: [keywords].",
    "description": "শব্দার্থগত প্রাসঙ্গিকতা অনুসারে, নিম্নলিখিত কীওয়ার্ডগুলিকে শ্রেণিবদ্ধ করা হয়েছে। [মূল শব্দ]",
    "remark": "শব্দার্থগত প্রাসঙ্গিকতা অনুসারে কীওয়ার্ডগুলি ক্লাস্টার এবং গোষ্ঠীবদ্ধ করা হয়।"
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 33,
  "weight": 90
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
