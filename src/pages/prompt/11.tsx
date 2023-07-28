import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "总结内容",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. Respond in Chinese. Please begin by editing the following text: ",
    "description": "将以下文字概括为 100 个字，使其易于阅读和理解。避免使用复杂的句子结构或技术术语。",
    "remark": "将文本内容总结为 100 字。"
  },
  "en": {
    "title": "Summary",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. Please begin by editing the following text: ",
    "remark": "Summarize the text in 100 words."
  },
  "ja": {
    "title": "要約内容",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "次の文章を、読みやすく、理解しやすいように 100 字に要約してください。複雑な文型や専門用語は避けること。",
    "remark": "本文は 100 字で要約しています。"
  },
  "ko": {
    "title": "요약 콘텐츠",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "다음 텍스트를 읽고 이해하기 쉽도록 100 개의 단어로 요약하세요. 복잡한 문장 구조나 전문 용어는 피하세요.",
    "remark": "텍스트는 100 단어로 요약되어 있습니다."
  },
  "es": {
    "title": "Contenido resumido",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Spanish. Please begin by editing the following text: ",
    "description": "Resuma el siguiente texto en 100 palabras de forma que sea fácil de leer y comprender. Evita estructuras oracionales complejas o términos técnicos.",
    "remark": "Resuma el texto en 100 palabras."
  },
  "fr": {
    "title": "Résumé du contenu",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in French. Please begin by editing the following text: ",
    "description": "Résumez le texte suivant en 100 mots de manière à ce qu'il soit facile à lire et à comprendre. Évitez les structures de phrases complexes et les termes techniques.",
    "remark": "Résumez le texte en 100 mots."
  },
  "de": {
    "title": "Zusammenfassung des Inhalts",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in German. Please begin by editing the following text: ",
    "description": "Fassen Sie den folgenden Text in 100 Worten so zusammen, dass er leicht zu lesen und zu verstehen ist. Vermeiden Sie komplexe Satzstrukturen oder Fachbegriffe.",
    "remark": "Fassen Sie den Text in 100 Wörtern zusammen."
  },
  "it": {
    "title": "Contenuto sintetico",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Italian. Please begin by editing the following text: ",
    "description": "Riassumete il seguente testo in 100 parole in modo che sia facile da leggere e da capire. Evitate strutture di frase complesse o termini tecnici.",
    "remark": "Riassumete il testo in 100 parole."
  },
  "ru": {
    "title": "Краткое содержание",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Russian. Please begin by editing the following text: ",
    "description": "Изложите следующий текст в 100 словах так, чтобы его было легко читать и понимать. Избегайте сложных структур предложений и технических терминов.",
    "remark": "Резюмируйте текст в 100 словах."
  },
  "pt": {
    "title": "Conteúdo resumido",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Portuguese. Please begin by editing the following text: ",
    "description": "Resume o texto seguinte em 100 palavras, de modo a que seja fácil de ler e compreender. Evite estruturas frásicas complexas ou termos técnicos.",
    "remark": "Resumir o texto em 100 palavras."
  },
  "hi": {
    "title": "सारांश",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Hindi. Please begin by editing the following text: ",
    "description": "निम्नलिखित पाठ को 100 शब्दों में सारांशित करें ताकि इसे पढ़ने और समझने में आसानी हो। जटिल वाक्य संरचनाओं या तकनीकी शब्दजाल से बचें।",
    "remark": "पाठ की सामग्री को 100 शब्दों में सारांशित करें।"
  },
  "ar": {
    "title": "ملخص",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Arabic. Please begin by editing the following text: ",
    "description": "لخص النص التالي في 100 كلمة حتى يسهل قراءته وفهمه. تجنب تراكيب الجمل المعقدة أو المصطلحات الفنية.",
    "remark": "لخص محتوى النص في 100 كلمة."
  },
  "bn": {
    "title": "সারসংক্ষেপ",
    "prompt": "Summarize the following text into 100 words, making it easy to read and comprehend. The summary should be concise, clear, and capture the main points of the text. Avoid using complex sentence structures or technical jargon. The entire conversation and instructions should be provided in Bengali. Please begin by editing the following text: ",
    "description": "নিম্নলিখিত পাঠ্যটিকে 100 শব্দে সংক্ষিপ্ত করুন যাতে এটি পড়তে এবং বুঝতে সহজ হয়। জটিল বাক্য গঠন বা প্রযুক্তিগত শব্দবন্ধ এড়িয়ে চলুন।",
    "remark": "পাঠ্যের বিষয়বস্তুকে 100 শব্দে সংক্ষিপ্ত করুন।"
  },
  "website": null,
  "tags": [
    "write"
  ],
  "id": 11,
  "weight": 4605
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
