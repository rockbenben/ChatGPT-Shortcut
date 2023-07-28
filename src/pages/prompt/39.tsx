import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "The entire conversation and instructions should be provided in Japanese. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "以下に基づいて、よくある質問 10 個のリストを生成する：【目次】。",
    "remark": "コンテンツベースの FAQ 生成。"
  },
  "ko": {
    "title": "FAQ 생성기",
    "prompt": "The entire conversation and instructions should be provided in Korean. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "다음을 기반으로 자주 묻는 질문 10 개의 목록을 생성합니다.",
    "remark": "콘텐츠 기반 FAQ 생성."
  },
  "es": {
    "title": "Generador de FAQs",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "Genera una lista de 10 preguntas frecuentes basadas en lo siguiente:[Contenido]",
    "remark": "Genere preguntas frecuentes basadas en el contenido."
  },
  "fr": {
    "title": "FAQs Générateur",
    "prompt": "The entire conversation and instructions should be provided in French. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "Créez une liste de 10 questions fréquemment posées sur la base des éléments suivants : [Contenu]",
    "remark": "Générer des FAQ basées sur le contenu."
  },
  "de": {
    "title": "FAQ-Generator",
    "prompt": "The entire conversation and instructions should be provided in German. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "Erstellen Sie eine Liste von 10 häufig gestellten Fragen auf der Grundlage der folgenden Punkte:[Inhalt]",
    "remark": "Generieren Sie FAQs auf der Grundlage von Inhalten."
  },
  "it": {
    "title": "FAQ Generatore",
    "prompt": "The entire conversation and instructions should be provided in Italian. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "Generare un elenco di 10 domande frequenti basate su quanto segue:[Contents]",
    "remark": "Generare FAQ in base al contenuto."
  },
  "ru": {
    "title": "Генератор часто задаваемых вопросов",
    "prompt": "The entire conversation and instructions should be provided in Russian. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "Сформировать список из 10 часто задаваемых вопросов на основе следующего:[Содержание]",
    "remark": "Генерировать часто задаваемые вопросы на основе контента."
  },
  "pt": {
    "title": "Gerador de FAQs",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "Gerar uma lista de 10 perguntas frequentes com base no seguinte:[Conteúdo]",
    "remark": "Gerar FAQs com base no conteúdo."
  },
  "hi": {
    "title": "अक्सर पूछे जाने वाले प्रश्न जनरेटर",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "इनके आधार पर 10 अक्सर पूछे जाने वाले प्रश्नों की एक सूची तैयार करें: [सामग्री]",
    "remark": "सामग्री के आधार पर अक्सर पूछे जाने वाले प्रश्न उत्पन्न करें।"
  },
  "ar": {
    "title": "منشئ التعليمات",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "قم بإنشاء قائمة بـ 10 أسئلة متداولة بناءً على: [المحتوى]",
    "remark": "قم بإنشاء أسئلة وأجوبة بناءً على المحتوى."
  },
  "bn": {
    "title": "FAQ জেনারেটর",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Generate a list of 10 frequently asked questions based on the following content: [内容].",
    "description": "এর উপর ভিত্তি করে প্রায়শই জিজ্ঞাসিত 10টি প্রশ্নের একটি তালিকা তৈরি করুন: [সামগ্রী]",
    "remark": "বিষয়বস্তুর উপর ভিত্তি করে FAQs তৈরি করুন।"
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 39,
  "weight": 339
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
