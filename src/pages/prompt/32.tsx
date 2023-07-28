import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "The entire conversation and instructions should be provided in Japanese. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "次のキーワードのリストを、検索意図（商業的、取引的、情報的かどうか）に応じてグループに分ける：【キーワード】.",
    "remark": "以下のキーワードリストは、商業目的、取引目的、情報提供目的の検索意図によってグループ分けされています。"
  },
  "ko": {
    "title": "텍스트 의도 분류",
    "prompt": "The entire conversation and instructions should be provided in Korean. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "다음 키워드 목록을 검색 의도 (상업적, 거래 또는 정보 제공 등) 에 따라 그룹으로 나눕니다: [키워드] ",
    "remark": "다음 키워드 목록은 상업적, 거래 또는 정보 제공을 목적으로 하는 검색 의도에 따라 그룹화되어 있습니다."
  },
  "es": {
    "title": "Clasificación de la intención del texto",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "Divida la siguiente lista de palabras clave en grupos en función de su intención de búsqueda (ya sea comercial, transaccional o informativa):[keyword].",
    "remark": "Agrupe la siguiente lista de palabras clave con intención de búsqueda comercial, transaccional o informativa en función de la intención de búsqueda."
  },
  "fr": {
    "title": "Classification de l'intention du texte",
    "prompt": "The entire conversation and instructions should be provided in French. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "Divisez la liste suivante de mots-clés en groupes en fonction de leur intention de recherche (commerciale, transactionnelle ou informative) : [mot-clé].",
    "remark": "Regroupez la liste suivante de mots-clés à vocation commerciale, transactionnelle ou informative en fonction de l'intention de recherche."
  },
  "de": {
    "title": "Klassifizierung von Textabsichten",
    "prompt": "The entire conversation and instructions should be provided in German. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "Unterteilen Sie die folgende Liste von Schlüsselwörtern in Gruppen nach ihrer Suchabsicht (ob kommerziell, transaktional oder informativ):[Schlüsselwort].",
    "remark": "Gruppieren Sie die folgende Liste von Schlüsselwörtern mit kommerzieller, transaktionaler oder informativer Suchabsicht auf der Grundlage der Suchabsicht."
  },
  "it": {
    "title": "Classificazione dell'intento del testo",
    "prompt": "The entire conversation and instructions should be provided in Italian. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "Dividete il seguente elenco di parole chiave in gruppi in base al loro intento di ricerca (commerciale, transazionale o informativo):[parola chiave].",
    "remark": "Raggruppare il seguente elenco di parole chiave con intento di ricerca commerciale, transazionale o informativo in base all'intento di ricerca."
  },
  "ru": {
    "title": "Классификация текстовых намерений",
    "prompt": "The entire conversation and instructions should be provided in Russian. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "Разделите следующий список ключевых слов на группы в зависимости от их поискового намерения (коммерческого, транзакционного или информационного):[keyword].",
    "remark": "Сгруппируйте приведенный ниже список ключевых слов с коммерческим, транзакционным или информационным поисковым намерением на основе поискового намерения."
  },
  "pt": {
    "title": "Classificação da intenção do texto",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "Divida a seguinte lista de palavras-chave em grupos com base na sua intenção de pesquisa (comercial, transacional ou informativa):[palavra-chave].",
    "remark": "Agrupe a seguinte lista de palavras-chave com intenção de pesquisa comercial, transacional ou informativa com base na intenção de pesquisa."
  },
  "hi": {
    "title": "पाठ आशय वर्गीकरण",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "कीवर्ड की निम्नलिखित सूची को उनके खोज उद्देश्य (चाहे वाणिज्यिक, लेन-देन संबंधी, या सूचनात्मक) के अनुसार समूहों में विभाजित करें: [कीवर्ड]।",
    "remark": "खोज अभिप्राय के आधार पर, नीचे दी गई कीवर्ड सूचियाँ वाणिज्यिक, लेन-देन संबंधी, या सूचनात्मक खोज अभिप्राय के आधार पर समूहीकृत की गई हैं।"
  },
  "ar": {
    "title": "تصنيف نية النص",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "قسّم قائمة الكلمات الرئيسية التالية إلى مجموعات وفقًا لهدف البحث (سواء أكان تجاريًا أم عمليًا أم إعلاميًا): [الكلمات الرئيسية].",
    "remark": "بناءً على نية البحث ، يتم تجميع قوائم الكلمات الرئيسية أدناه حسب هدف البحث التجاري أو المتعلق بالمعاملات أو المعلومات."
  },
  "bn": {
    "title": "পাঠ্য অভিপ্রায় শ্রেণীবিভাগ",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Classify the following keyword list into groups based on their search intent, whether commercial, transactional or informational: [keywords].",
    "description": "নিম্নলিখিত কীওয়ার্ডগুলির তালিকাকে তাদের অনুসন্ধানের অভিপ্রায় অনুসারে গোষ্ঠীতে ভাগ করুন (তা বাণিজ্যিক, লেনদেন বা তথ্যগত হোক): [কীওয়ার্ড]।",
    "remark": "অনুসন্ধানের অভিপ্রায়ের উপর ভিত্তি করে, নীচের কীওয়ার্ড তালিকাগুলি বাণিজ্যিক, লেনদেন, বা তথ্যগত অনুসন্ধানের অভিপ্রায় দ্বারা গোষ্ঠীবদ্ধ।"
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 32,
  "weight": 104
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
