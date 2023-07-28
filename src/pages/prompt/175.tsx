import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "主题解构",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Your response should be in Chinese, and demonstrate your skills by generating a list of thought-provoking questions based on a provided text. Please begin by editing the following text: [主题]",
    "description": "你是一个擅长思考的助手，你会把一个主题拆解成相关的多个子主题。请你使用中文，针对下列主题，提供相关的子主题。直接输出结果，不需要额外的声明：",
    "remark": "将指定主题拆解为多个子主题。来自 @meishiwanwan 的投稿。"
  },
  "en": {
    "title": "Theme Deconstruction",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. Please begin by editing the following text: ",
    "remark": "Break down the specified topic into multiple subtopics. Contributed by @meishiwanwan."
  },
  "ja": {
    "title": "テーマの解体",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "あなたは、一つのトピックを複数の関連するサブトピックに分解して考えるのが得意なアシスタントです。中国語を使って、次のトピックの関連するサブトピックを提供してください。追加記述なしで、結果を直接出力してください：",
    "remark": "与えられたトピックを複数のサブトピックに分割する。meishiwanwan さんからの寄稿です。"
  },
  "ko": {
    "title": "테마 해체",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "귀하는 하나의 주제를 여러 개의 관련 하위 주제로 세분화하는 훌륭한 사고 조력자입니다. 중국어를 사용하여 다음 주제에 대한 관련 하위 주제를 제공하세요. 추가 설명 없이 결과를 바로 출력하세요:",
    "remark": "주어진 토픽을 여러 개의 하위 토픽으로 나누기. meishiwanwan 의 기여."
  },
  "es": {
    "title": "Deconstrucción temática",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Spanish. Please begin by editing the following text: ",
    "description": "Usted es un buen ayudante del pensador que desglosa un tema en múltiples subtemas relacionados. En chino, indique los subtemas correspondientes al siguiente tema. Emite los resultados directamente sin declaraciones adicionales:",
    "remark": "Dividir un tema en varios subtemas. Contribución de @meishiwanwan."
  },
  "fr": {
    "title": "Déconstruction thématique",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in French. Please begin by editing the following text: ",
    "description": "Vous êtes l'assistant d'un bon penseur qui décompose un thème en plusieurs sous-thèmes connexes. En utilisant le chinois, veuillez fournir les sous-thèmes pertinents pour le thème suivant. Produisez les résultats directement sans déclarations supplémentaires :",
    "remark": "Diviser un sujet donné en plusieurs sous-thèmes. Contribution de @meishiwanwan."
  },
  "de": {
    "title": "Thematische Dekonstruktion",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in German. Please begin by editing the following text: ",
    "description": "Sie sind ein guter Assistent des Denkers, der ein Thema in mehrere zusammenhängende Unterthemen zerlegt. Bitte geben Sie in Chinesisch die relevanten Unterthemen für das folgende Thema an. Geben Sie die Ergebnisse direkt und ohne zusätzliche Deklarationen aus:",
    "remark": "Ein bestimmtes Thema in mehrere Unterthemen aufteilen. Beitrag von @meishiwanwan."
  },
  "it": {
    "title": "Decostruzione tematica",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Italian. Please begin by editing the following text: ",
    "description": "Lei è un buon assistente di pensiero che scompone un tema in più sottotemi correlati. Utilizzando il cinese, si prega di fornire i sottotemi rilevanti per il seguente tema. Fornire i risultati direttamente senza dichiarazioni aggiuntive:",
    "remark": "Dividere un determinato argomento in più sotto-argomenti. Contributo di @meishiwanwan."
  },
  "ru": {
    "title": "Тематическая деконструкция",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Russian. Please begin by editing the following text: ",
    "description": "Вы - хороший помощник мыслителя, который разбивает тему на множество связанных подтем. Используя китайский язык, укажите соответствующие подтемы для следующей темы. Выведите результаты напрямую, без дополнительных деклараций:",
    "remark": "Разбиение заданной темы на несколько подтем. Вклад от @meishiwanwan."
  },
  "pt": {
    "title": "Desconstrução temática",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Portuguese. Please begin by editing the following text: ",
    "description": "É um bom assistente de pensador que decompõe um tema em vários subtemas relacionados. Utilizando a língua chinesa, forneça os subtemas relevantes para o seguinte tema. Apresente os resultados diretamente sem declarações adicionais:",
    "remark": "Dividir um determinado tópico em múltiplos subtópicos. Contribuição de @meishiwanwan."
  },
  "hi": {
    "title": "विषय विखंडन",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Hindi. Please begin by editing the following text: ",
    "description": "आप एक ऐसे सहायक हैं जो सोचने में अच्छा है, और आप किसी विषय को संबंधित उपविषयों में बांट देंगे। कृपया निम्नलिखित विषयों के लिए प्रासंगिक उपविषय प्रदान करने के लिए चीनी का उपयोग करें। परिणाम सीधे आउटपुट करें, किसी अतिरिक्त घोषणा की आवश्यकता नहीं है:",
    "remark": "निर्दिष्ट विषय को कई उपविषयों में तोड़ें। @meishiwanwan का योगदान।"
  },
  "ar": {
    "title": "موضوع التفكيك",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Arabic. Please begin by editing the following text: ",
    "description": "أنت مساعد جيد في التفكير ، وستقوم بتفكيك موضوع ما إلى مواضيع فرعية ذات صلة. يرجى استخدام اللغة الصينية لتقديم الموضوعات الفرعية ذات الصلة بالموضوعات التالية. قم بإخراج النتيجة مباشرة ، ولا يلزم وجود إعلانات إضافية:",
    "remark": "قسّم الموضوع المحدد إلى مواضيع فرعية متعددة. مساهمة منmeishiwanwan."
  },
  "bn": {
    "title": "থিম বিনির্মাণ",
    "prompt": "As an expert questioning assistant, you have the ability to identify potential gaps in information and ask insightful questions that stimulate deeper thinking. Please demonstrate your skills by generating a list of thought-provoking questions based on a provided text. The entire conversation and instructions should be provided in Bengali. Please begin by editing the following text: ",
    "description": "আপনি একজন সহকারী যিনি চিন্তা করতে পারদর্শী, এবং আপনি একটি বিষয়কে সংশ্লিষ্ট সাবটপিক্সে বিচ্ছিন্ন করবেন। নিম্নলিখিত বিষয়গুলির জন্য প্রাসঙ্গিক উপ-বিষয়গুলি প্রদান করতে দয়া করে চাইনিজ ব্যবহার করুন। ফলাফল সরাসরি আউটপুট, কোন অতিরিক্ত ঘোষণার প্রয়োজন নেই:",
    "remark": "নির্দিষ্ট বিষয়কে একাধিক উপবিষয়ে ভাগ করুন। @meishiwanwan থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 175,
  "weight": 495
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
