import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "头衔生成器",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. My first keywords are [头衔关键词]",
    "description": "我希望你能充当花式标题生成器。我将通过逗号输入关键词，你将用花哨的标题进行回复。",
    "remark": "根据关键词生成多种头衔和职位。"
  },
  "en": {
    "title": "fancy title generator",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. My first keywords are ",
    "remark": "Generate multiple job titles and positions based on keywords."
  },
  "ja": {
    "title": "タイトルジェネレーター",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Janpanese. My first keywords are ",
    "description": "派手なタイトルのジェネレーターとして活動してほしい。私がコンマでキーワードを入力すると、あなたは派手なタイトルを返答してくれます。",
    "remark": "キーワードをもとに複数のタイトルとポジションを生成する。"
  },
  "ko": {
    "title": "타이틀 생성기",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Korean. My first keywords are ",
    "description": "멋진 제목 생성기 역할을 해주셨으면 합니다. 제가 쉼표로 키워드를 입력하면 여러분이 멋진 제목으로 응답해 주세요.",
    "remark": "키워드를 기반으로 여러 제목과 포지션을 생성합니다."
  },
  "es": {
    "title": "generador de títulos",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Spanish. My first keywords are ",
    "description": "Me gustaría que actuaras como un generador de títulos de fantasía. Yo introduciré las palabras clave mediante comas y ustedes responderán con títulos elegantes.",
    "remark": "Genere múltiples títulos y posiciones en función de las palabras clave."
  },
  "fr": {
    "title": "générateur de titres",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in French. My first keywords are ",
    "description": "J'aimerais que vous agissiez comme un générateur de titres fantaisistes. J'introduirai des mots-clés à l'aide de virgules et vous répondrez par des titres fantaisistes.",
    "remark": "Générer plusieurs titres et positions en fonction des mots-clés."
  },
  "de": {
    "title": "Titelgenerator",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in German. My first keywords are ",
    "description": "Ich möchte, dass Sie als Phantasie-Titel-Generator fungieren. Ich gebe die Schlüsselwörter über Kommas ein und Sie antworten mit ausgefallenen Titeln.",
    "remark": "Generieren Sie mehrere Titel und Positionen auf der Grundlage von Schlüsselwörtern."
  },
  "it": {
    "title": "generatore di titoli",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Italian. My first keywords are ",
    "description": "Vorrei che tu agissi come un generatore di titoli di fantasia. Io inserirò le parole chiave attraverso le virgole e voi risponderete con titoli di fantasia.",
    "remark": "Generare più titoli e posizioni in base alle parole chiave."
  },
  "ru": {
    "title": "генератор названий",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Russian. My first keywords are ",
    "description": "Я хотел бы, чтобы вы выступили в роли генератора фантазийных заголовков. Я буду вводить ключевые слова через запятую, а вы будете отвечать на них причудливыми заголовками.",
    "remark": "Генерировать несколько заголовков и позиций на основе ключевых слов."
  },
  "pt": {
    "title": "gerador de títulos",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Portuguese. My first keywords are ",
    "description": "Gostaria que actuasse como um gerador de títulos de fantasia. Eu introduzo as palavras-chave através de vírgulas e vocês respondem com títulos extravagantes.",
    "remark": "Gerar vários títulos e posições com base em palavras-chave."
  },
  "hi": {
    "title": "शीर्षक जनरेटर",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Hindi. My first keywords are ",
    "description": "मुझे आशा है कि आप एक फैंसी शीर्षक जनरेटर के रूप में कार्य कर सकते हैं। मैं अल्पविराम के माध्यम से कीवर्ड दर्ज करूंगा, और आप आकर्षक शीर्षकों के साथ उत्तर देंगे।",
    "remark": "कीवर्ड के आधार पर अनेक शीर्षक और पद उत्पन्न करें।"
  },
  "ar": {
    "title": "منشئ العنوان",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Arabic. My first keywords are ",
    "description": "آمل أن تتمكن من العمل كمولد عنوان خيالي. سأقوم بإدخال الكلمات الرئيسية عبر الفواصل ، وسوف ترد بعناوين خيالية.",
    "remark": "قم بتوليد ألقاب ومواقف متعددة بناءً على الكلمات الرئيسية."
  },
  "bn": {
    "title": "শিরোনাম জেনারেটর",
    "prompt": "I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. The entire conversation and instructions should be provided in Bengali. My first keywords are ",
    "description": "আমি আশা করি আপনি একটি অভিনব শিরোনাম জেনারেটর হিসাবে কাজ করতে পারেন. আমি কমা দিয়ে কীওয়ার্ড লিখব, এবং আপনি অভিনব শিরোনাম দিয়ে উত্তর দেবেন।",
    "remark": "কীওয়ার্ডের উপর ভিত্তি করে একাধিক শিরোনাম এবং অবস্থান তৈরি করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-fancy-title-generator",
  "tags": [
    "company"
  ],
  "id": 148,
  "weight": 181
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
