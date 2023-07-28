import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "伪原创改写",
    "prompt": "Rephrase the following paragraph with Chinese in 5 different ways, to avoid repetition, while keeping its meaning: [修改文本]",
    "description": "用 5 种不同的方式改写以下段落，以避免重复，同时保持其含义：[修改文本] 。",
    "remark": "对指定内容进行多个版本的改写，以避免文本重复。"
  },
  "en": {
    "title": "Rephrase",
    "prompt": "Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "remark": "Rewrite the specified content into multiple versions to avoid text duplication."
  },
  "ja": {
    "title": "疑似オリジナルリライティング",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "次の段落を、意味を保ちつつ繰り返しを避けるために、5 種類の方法で書き換えてください：[本文を修正する",
    "remark": "指定された内容の複数のバージョンを、文章の重複を避けるためにリライトする。"
  },
  "ko": {
    "title": "유사 원본 재작성",
    "prompt": "The entire conversation and instructions should be provided in Korean. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "의미를 유지하면서 반복을 피할 수 있도록 다음 단락을 5 가지 방법으로 다시 작성합니다.",
    "remark": "텍스트 중복을 피하기 위해 지정된 콘텐츠의 여러 버전이 다시 작성됩니다."
  },
  "es": {
    "title": "Reescritura falsa",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "Reescriba el siguiente párrafo de 5 formas diferentes para evitar repeticiones y conservar su significado: [cambiar el texto",
    "remark": "Reescribe varias versiones del contenido especificado para evitar la duplicación de texto."
  },
  "fr": {
    "title": "Fausse réécriture",
    "prompt": "The entire conversation and instructions should be provided in French. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "Réécrivez le paragraphe suivant de 5 manières différentes pour éviter les répétitions tout en préservant son sens : [modifier le texte",
    "remark": "Réécrire plusieurs versions du contenu spécifié pour éviter la duplication du texte."
  },
  "de": {
    "title": "Falsche Umschreibung",
    "prompt": "The entire conversation and instructions should be provided in German. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "Schreibe den folgenden Absatz auf 5 verschiedene Arten um, um Wiederholungen zu vermeiden und gleichzeitig den Sinn zu erhalten: [Text ändern",
    "remark": "Schreiben Sie mehrere Versionen des angegebenen Inhalts neu, um Textduplikate zu vermeiden."
  },
  "it": {
    "title": "Riscrittura fittizia",
    "prompt": "The entire conversation and instructions should be provided in Italian. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "Riscrivete il seguente paragrafo in 5 modi diversi per evitare le ripetizioni e preservarne il significato: [modifica del testo",
    "remark": "Riscrive più versioni del contenuto specificato per evitare la duplicazione del testo."
  },
  "ru": {
    "title": "Поддельная перепись",
    "prompt": "The entire conversation and instructions should be provided in Russian. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "Перепишите следующий абзац 5 разными способами, чтобы избежать повторов и сохранить смысл: [изменить текст",
    "remark": "Перепишите несколько версий указанного содержимого, чтобы избежать дублирования текста."
  },
  "pt": {
    "title": "Reescrita falsa",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "Reescreve o seguinte parágrafo de 5 formas diferentes para evitar repetições e preservar o seu significado: [alterar texto",
    "remark": "Reescreve várias versões do conteúdo especificado para evitar a duplicação de texto."
  },
  "hi": {
    "title": "छद्म-मूल पुनर्लेखन",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "निम्नलिखित पैराग्राफ को इसके अर्थ को बनाए रखते हुए पुनरावृत्ति से बचने के लिए 5 अलग-अलग तरीकों से दोबारा लिखें: [संपादित पाठ]।",
    "remark": "पाठ दोहराव से बचने के लिए निर्दिष्ट सामग्री के कई संस्करणों को फिर से लिखें।"
  },
  "ar": {
    "title": "إعادة الكتابة الزائفة الأصلية",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "أعد كتابة الفقرة التالية بخمس طرق مختلفة لتجنب التكرار مع الحفاظ على معناها: [نص محرر].",
    "remark": "أعد كتابة إصدارات متعددة من المحتوى المحدد لتجنب تكرار النص."
  },
  "bn": {
    "title": "ছদ্ম-মূল পুনর্লিখন",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Rephrase the following paragraph in 5 different ways, to avoid repetition, while keeping its meaning: ",
    "description": "এর অর্থ বজায় রেখে পুনরাবৃত্তি এড়াতে নিম্নলিখিত অনুচ্ছেদটি 5টি ভিন্ন উপায়ে পুনরায় লিখুন: [সম্পাদিত পাঠ্য]।",
    "remark": "টেক্সট ডুপ্লিকেশন এড়াতে নির্দিষ্ট বিষয়বস্তুর একাধিক সংস্করণ পুনরায় লিখুন।"
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 41,
  "weight": 4655
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
