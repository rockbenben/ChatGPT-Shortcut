import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "论文式回答",
    "prompt": "Write a highly detailed essay in Chinese with introduction, body, and conclusion paragraphs responding to the following: [问题]",
    "description": "写一篇高度详细的文章，包括引言、主体和结论段落，以回应以下内容：[问题］",
    "remark": "以论文形式讨论问题，能够获得连贯的、结构化的和更高质量的回答。"
  },
  "en": {
    "title": "Thesis reply",
    "prompt": "Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "remark": "Discussing questions in essay form allows for coherent, structured and higher quality responses."
  },
  "ja": {
    "title": "論文形式の回答",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "序論、本文、結論の段落を含む、非常に詳細なエッセイを書き、次のことに応答しなさい：【設問】。",
    "remark": "エッセイ形式で問題を議論することで、首尾一貫した、構造化された、より質の高い回答が可能になります。"
  },
  "ko": {
    "title": "논문 스타일의 답변",
    "prompt": "The entire conversation and instructions should be provided in Korean. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "서론, 본문, 결론 단락을 포함하여 다음에 답하는 매우 상세한 에세이를 작성하세요: [질문]",
    "remark": "에세이 형식으로 질문에 대해 토론하면 일관성 있고 구조화된 고품질의 답변을 얻을 수 있습니다."
  },
  "es": {
    "title": "respuesta tipo ensayo",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "Escribe un ensayo muy detallado, que incluya una introducción, un cuerpo y párrafos de conclusión, que responda a lo siguiente:[Pregunta].",
    "remark": "Debatir las preguntas en formato de ensayo da lugar a respuestas coherentes, estructuradas y de mayor calidad."
  },
  "fr": {
    "title": "réponse sous forme de dissertation",
    "prompt": "The entire conversation and instructions should be provided in French. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "Rédigez un essai très détaillé, comprenant une introduction, un corps de texte et une conclusion, qui réponde à la question suivante : [Question].",
    "remark": "L'examen des questions sous forme de dissertation permet d'obtenir des réponses cohérentes, structurées et de meilleure qualité."
  },
  "de": {
    "title": "Antwort im Essay-Stil",
    "prompt": "The entire conversation and instructions should be provided in German. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "Schreiben Sie einen sehr detaillierten Aufsatz, der eine Einleitung, einen Hauptteil und eine Schlussfolgerung enthält und auf folgende Fragen eingeht:[Frage].",
    "remark": "Die Erörterung von Fragen im Aufsatzformat führt zu kohärenten, strukturierten und qualitativ besseren Antworten."
  },
  "it": {
    "title": "risposta in stile saggio",
    "prompt": "The entire conversation and instructions should be provided in Italian. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "Scrivete un saggio molto dettagliato, comprensivo di introduzione, corpo e conclusione, che risponda a quanto segue: [Domanda].",
    "remark": "Discutendo le domande in formato saggio si ottengono risposte coerenti, strutturate e di qualità superiore."
  },
  "ru": {
    "title": "ответ в стиле эссе",
    "prompt": "The entire conversation and instructions should be provided in Russian. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "Напишите подробное эссе, включающее введение, основную часть и заключение, в котором ответьте на следующие вопросы:[Вопрос].",
    "remark": "Обсуждение вопросов в формате эссе позволяет получить связные, структурированные и более качественные ответы."
  },
  "pt": {
    "title": "resposta de tipo dissertativo",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "Escreve um ensaio altamente detalhado, incluindo uma introdução, um corpo e parágrafos de conclusão, que responda ao seguinte:[Pergunta].",
    "remark": "A discussão das perguntas em formato de ensaio resulta em respostas coerentes, estruturadas e de maior qualidade."
  },
  "hi": {
    "title": "निबंध उत्तर",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "निम्नलिखित के जवाब में परिचय, मुख्य भाग और समापन पैराग्राफ सहित एक अत्यधिक विस्तृत निबंध लिखें: [प्रश्न]",
    "remark": "निबंध प्रारूप में प्रश्नों पर चर्चा करने से सुसंगत, संरचित और उच्च गुणवत्ता वाली प्रतिक्रियाएँ प्राप्त होती हैं।"
  },
  "ar": {
    "title": "إجابة مقال",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "اكتب مقالة مفصلة للغاية ، بما في ذلك المقدمة والجسم والفقرات الختامية ، ردًا على ما يلي: [سؤال]",
    "remark": "تتيح مناقشة الأسئلة بتنسيق مقال إجابات متماسكة ومنظمة وذات جودة أعلى."
  },
  "bn": {
    "title": "প্রবন্ধের উত্তর",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "নিম্নলিখিতগুলির উত্তরে ভূমিকা, মূল অংশ এবং সমাপ্তি অনুচ্ছেদ সহ একটি অত্যন্ত বিশদ প্রবন্ধ লিখুন: [প্রশ্ন]",
    "remark": "প্রবন্ধ বিন্যাসে প্রশ্ন আলোচনা করা সুসংগত, কাঠামোগত এবং উচ্চ মানের প্রতিক্রিয়া সক্ষম করে।"
  },
  "website": "https://learnprompting.org/docs/applied_prompting/short_response",
  "tags": [
    "favorite",
    "article"
  ],
  "id": 4,
  "weight": 8766
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
