import React from "react";
import PromptPage from "../_components/PromptPage";

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
    "prompt": "The entire conversation and instructions should be provided in Japanese. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "続けて、次の文章から、【記事のテーマ】について中国語で記事を書いてください：【記事の始まり】。",
    "remark": "エッセイのテーマに沿って冒頭部分を継続し、エッセイを完成させる。"
  },
  "ko": {
    "title": "기사 계속",
    "prompt": "The entire conversation and instructions should be provided in Korean. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "기사 시작] 문장으로 시작하여 [기사 주제] 에 대한 기사를 중국어로 계속 작성합니다.",
    "remark": "주제에 따라 에세이의 첫 부분을 계속 이어서 에세이를 완성합니다."
  },
  "es": {
    "title": "continuación del artículo",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Continue writing an article about [theme] that begins with the following sentence: .",
    "description": "Continúe y escriba un artículo sobre [tema del artículo] en chino, comenzando con la siguiente oración: [comienzo del artículo]",
    "remark": "De acuerdo con el tema del artículo, continúa el principio del artículo para completar el artículo."
  },
  "fr": {
    "title": "Suite de l'article",
    "prompt": "The entire conversation and instructions should be provided in French. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "Continuez à écrire un article en chinois sur [THEME DE L'ARTICLE], en commençant par la phrase suivante : [DÉBUT DE L'ARTICLE].",
    "remark": "Poursuivre la section d'ouverture de la dissertation pour compléter la dissertation en fonction du thème de la dissertation."
  },
  "de": {
    "title": "Artikel fortgesetzt",
    "prompt": "The entire conversation and instructions should be provided in German. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "Schreiben Sie einen Artikel auf Chinesisch über [THEMA DES ARTIKELS] und beginnen Sie mit folgendem Satz: [ARTIKELANFANG].",
    "remark": "Setzen Sie den einleitenden Abschnitt des Aufsatzes fort, um den Aufsatz auf der Grundlage des Themas des Aufsatzes zu vervollständigen."
  },
  "it": {
    "title": "Continuazione dell&#39;articolo",
    "prompt": "The entire conversation and instructions should be provided in Italian. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "Vai avanti e scrivi un articolo su [argomento articolo] in cinese, iniziando con la seguente frase: [inizio articolo]",
    "remark": "Secondo l&#39;argomento dell&#39;articolo, continua l&#39;inizio dell&#39;articolo per completare l&#39;articolo."
  },
  "ru": {
    "title": "Продолжение статьи",
    "prompt": "The entire conversation and instructions should be provided in Russian. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "Напишите статью о [теме статьи] на китайском языке, начиная со следующего предложения: [начало статьи]",
    "remark": "Согласно теме статьи, продолжить начало статьи, чтобы закончить статью."
  },
  "pt": {
    "title": "continuação do artigo",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "Vá em frente e escreva um artigo sobre [tópico do artigo] em chinês, começando com a seguinte frase: [início do artigo]",
    "remark": "De acordo com o tópico do artigo, continue o início do artigo para concluir o artigo."
  },
  "hi": {
    "title": "लेख निरंतरता",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "आगे बढ़ें और चीनी भाषा में [लेख विषय] के बारे में एक लेख लिखें, जिसकी शुरुआत निम्नलिखित वाक्य से हो: [लेख की शुरुआत]",
    "remark": "लेख के विषय के अनुसार लेख को पूरा करने के लिए लेख की शुरुआत जारी रखें।"
  },
  "ar": {
    "title": "استمرار المادة",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "انطلق واكتب مقالًا عن [موضوع المقالة] باللغة الصينية ، بدءًا من الجملة التالية: [بداية المقالة]",
    "remark": "حسب موضوع المقال تابع بداية المقال لاستكمال المقال."
  },
  "bn": {
    "title": "প্রবন্ধের ধারাবাহিকতা",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Continue writing an article about [theme] that begins with the following sentence: ..",
    "description": "এগিয়ে যান এবং চীনা ভাষায় [নিবন্ধের বিষয়] সম্পর্কে একটি নিবন্ধ লিখুন, নিম্নলিখিত বাক্য দিয়ে শুরু করুন: [নিবন্ধের শুরু]",
    "remark": "নিবন্ধের বিষয় অনুসারে, নিবন্ধটি সম্পূর্ণ করতে নিবন্ধের শুরুটি চালিয়ে যান।"
  },
  "website": null,
  "tags": [
    "write"
  ],
  "id": 9,
  "weight": 4207
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
