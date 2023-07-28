import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "文章续写",
    "prompt": "Continue writing an article in Chinese about [文章主题] that begins with the following sentence: [文章开头]",
    "description": "继续用中文写一篇关于 [文章主题] 的文章，以下列句子开头：[文章开头］",
    "remark": "根据文章主题，延续文章开头部分来完成文章。"
  },
  "en": {
    "title": "Article Continued",
    "prompt": "Continue writing an article about [theme] that begins with the following sentence: ",
    "remark": "Complete the essay by continuing the opening section of the essay according to its theme."
  },
  "ja": {
    "title": "記事の続き",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "続けて、次の文章から、【記事のテーマ】について中国語で記事を書いてください：【記事の始まり】。",
    "remark": "エッセイのテーマに沿って冒頭部分を継続し、エッセイを完成させる。"
  },
  "ko": {
    "title": "기사 계속",
    "prompt": "The entire conversation and instructions should be provided in Korean. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "기사 시작] 문장으로 시작하여 [기사 주제] 에 대한 기사를 중국어로 계속 작성합니다.",
    "remark": "주제에 따라 에세이의 첫 부분을 계속 이어서 에세이를 완성합니다."
  },
  "es": {
    "title": "Continuación del artículo",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "Continúe escribiendo un artículo en chino sobre [TEMA DEL ARTÍCULO], comenzando con la siguiente frase: [INICIO DEL ARTÍCULO].",
    "remark": "Continúe con la sección inicial del ensayo para completarlo basándose en el tema del ensayo."
  },
  "fr": {
    "title": "Suite de l'article",
    "prompt": "The entire conversation and instructions should be provided in French. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "Continuez à écrire un article en chinois sur [THEME DE L'ARTICLE], en commençant par la phrase suivante : [DÉBUT DE L'ARTICLE].",
    "remark": "Poursuivre la section d'ouverture de la dissertation pour compléter la dissertation en fonction du thème de la dissertation."
  },
  "de": {
    "title": "Artikel fortgesetzt",
    "prompt": "The entire conversation and instructions should be provided in German. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "Schreiben Sie einen Artikel auf Chinesisch über [THEMA DES ARTIKELS] und beginnen Sie mit folgendem Satz: [ARTIKELANFANG].",
    "remark": "Setzen Sie den einleitenden Abschnitt des Aufsatzes fort, um den Aufsatz auf der Grundlage des Themas des Aufsatzes zu vervollständigen."
  },
  "it": {
    "title": "Articolo continuato",
    "prompt": "The entire conversation and instructions should be provided in Italian. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "Continuate a scrivere un articolo in cinese su [ARGOMENTO DELL'ARTICOLO], iniziando con la seguente frase: [INIZIO ARTICOLO].",
    "remark": "Continuare la sezione di apertura del saggio per completare l'elaborato in base al tema del saggio."
  },
  "ru": {
    "title": "Продолжение статьи",
    "prompt": "The entire conversation and instructions should be provided in Russian. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "Продолжайте писать статью на китайском языке на тему [TOPIC OF ARTICLE], начиная со следующего предложения: [ARTICLE START].",
    "remark": "Продолжите вступительную часть эссе, чтобы завершить его, исходя из темы эссе."
  },
  "pt": {
    "title": "Continuação do artigo",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "Continue a escrever um artigo em chinês sobre [TÓPICO DO ARTIGO], começando pela seguinte frase: [INÍCIO DO ARTIGO].",
    "remark": "Continue a secção de abertura do ensaio para completar o ensaio com base no tema do ensaio."
  },
  "hi": {
    "title": "लेख निरंतरता",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "आगे बढ़ें और चीनी भाषा में [लेख विषय] के बारे में एक लेख लिखें, जिसकी शुरुआत निम्नलिखित वाक्य से हो: [लेख की शुरुआत]",
    "remark": "लेख के विषय के अनुसार लेख को पूरा करने के लिए लेख की शुरुआत जारी रखें।"
  },
  "ar": {
    "title": "استمرار المادة",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "انطلق واكتب مقالًا عن [موضوع المقالة] باللغة الصينية ، بدءًا من الجملة التالية: [بداية المقالة]",
    "remark": "حسب موضوع المقال تابع بداية المقال لاستكمال المقال."
  },
  "bn": {
    "title": "প্রবন্ধের ধারাবাহিকতা",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Continue writing an article about [theme] that begins with the following sentence: ",
    "description": "এগিয়ে যান এবং চীনা ভাষায় [নিবন্ধের বিষয়] সম্পর্কে একটি নিবন্ধ লিখুন, নিম্নলিখিত বাক্য দিয়ে শুরু করুন: [নিবন্ধের শুরু]",
    "remark": "নিবন্ধের বিষয় অনুসারে, নিবন্ধটি সম্পূর্ণ করতে নিবন্ধের শুরুটি চালিয়ে যান।"
  },
  "website": null,
  "tags": [
    "write"
  ],
  "id": 9,
  "weight": 4463
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
