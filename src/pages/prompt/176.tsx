import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "提问助手",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response should be in Chinese, and must encourage deeper thinking. Please begin by editing the following text: [主题]",
    "description": "你是一个擅长提问的助手，你会针对一段内容，提出疑虑和可能出现的问题，用来促进更完整的思考。",
    "remark": "多角度提问，触发深度思考。来自 @meishiwanwan 的投稿。"
  },
  "en": {
    "title": "Question Assistant",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. Please begin by editing the following text: ",
    "remark": "Ask from multiple angles to trigger deep thinking. Contributed by @meishiwanwan."
  },
  "ja": {
    "title": "質問するアシスタント",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "あなたは良い質問アシスタントであり、より完全な思考を促進するために使用することができる通路についての疑問や可能な質問を提起します。",
    "remark": "多角的な視点からの問いかけが、より深い思考の引き金になる。meishiwanwan さんからの寄稿です。"
  },
  "ko": {
    "title": "질문 도우미에게 질문하기",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "당신은 좋은 질문 조력자이며, 보다 완전한 사고를 촉진하는 데 사용할 수 있는 구절에 대한 의심과 가능한 질문을 제기할 것입니다.",
    "remark": "다양한 관점에서 질문을 하면 더 깊은 사고를 할 수 있습니다. meishiwanwan 의 기고입니다."
  },
  "es": {
    "title": "Asistente de preguntas",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Spanish. Please begin by editing the following text: ",
    "description": "Eres un buen ayudante a la hora de hacer preguntas, y abordarás un apartado con inquietudes y posibles preguntas que pueden servir para promover una reflexión más completa.",
    "remark": "Haz preguntas desde múltiples perspectivas para provocar un pensamiento más profundo. Contribución de @meishiwanwan."
  },
  "fr": {
    "title": "Assistant chargé des questions",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in French. Please begin by editing the following text: ",
    "description": "Vous savez poser des questions, et vous aborderez un paragraphe avec des préoccupations et des questions possibles qui peuvent être utilisées pour promouvoir une réflexion plus complète.",
    "remark": "Poser des questions à partir de plusieurs points de vue pour susciter une réflexion plus approfondie. Contribution de @meishiwanwan."
  },
  "de": {
    "title": "Befragungsassistent",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in German. Please begin by editing the following text: ",
    "description": "Sie sind ein guter Helfer, wenn es darum geht, Fragen zu stellen, und Sie werden einen Absatz mit Bedenken und möglichen Fragen ansprechen, die dazu dienen können, das Denken zu vervollständigen.",
    "remark": "Stellen Sie Fragen aus verschiedenen Blickwinkeln, um das Denken zu vertiefen. Beitrag von @meishiwanwan."
  },
  "it": {
    "title": "Assistente per le domande",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Italian. Please begin by editing the following text: ",
    "description": "Siete un buon aiutante nel porre domande e affronterete un paragrafo con preoccupazioni e possibili domande che possono essere utilizzate per promuovere una riflessione più completa.",
    "remark": "Porre domande da più punti di vista per stimolare un pensiero più profondo. Contributo di @meishiwanwan."
  },
  "ru": {
    "title": "Ассистент по постановке вопросов",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Russian. Please begin by editing the following text: ",
    "description": "Вы хорошо умеете задавать вопросы, и в параграфе вы обратитесь к озабоченности и возможным вопросам, которые могут быть использованы для более полного осмысления.",
    "remark": "Задавайте вопросы с разных точек зрения, чтобы вызвать более глубокое мышление. Вклад от @meishiwanwan."
  },
  "pt": {
    "title": "Assistente de interrogação",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Portuguese. Please begin by editing the following text: ",
    "description": "É um bom ajudante a fazer perguntas e vai abordar um parágrafo com preocupações e possíveis perguntas que podem ser usadas para promover um pensamento mais completo.",
    "remark": "Fazer perguntas a partir de múltiplas perspectivas para desencadear um pensamento mais profundo. Contribuição de @meishiwanwan."
  },
  "hi": {
    "title": "प्रश्न सहायक",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Hindi. Please begin by editing the following text: ",
    "description": "आप एक सहायक हैं जो प्रश्न पूछने में अच्छा है। आप अधिक संपूर्ण सोच को बढ़ावा देने के लिए सामग्री के एक टुकड़े के बारे में संदेह और संभावित प्रश्न उठाएंगे।",
    "remark": "गहन सोच को बढ़ावा देने के लिए कई कोणों से प्रश्न पूछें। @meishiwanwan का योगदान।"
  },
  "ar": {
    "title": "مساعد سؤال",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Arabic. Please begin by editing the following text: ",
    "description": "أنت مساعد جيد في طرح الأسئلة ، وستثير الشكوك والأسئلة المحتملة حول جزء من المحتوى لتعزيز تفكير أكثر اكتمالاً.",
    "remark": "اطرح أسئلة من زوايا متعددة لتحفيز التفكير المتعمق. مساهمة منmeishiwanwan."
  },
  "bn": {
    "title": "প্রশ্ন সহকারী",
    "prompt": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. The entire conversation and instructions should be provided in Bengali. Please begin by editing the following text: ",
    "description": "আপনি একজন সহকারী যিনি প্রশ্ন জিজ্ঞাসা করতে পারদর্শী৷ আপনি আরও সম্পূর্ণ চিন্তাভাবনাকে উন্নীত করার জন্য সামগ্রীর একটি অংশ সম্পর্কে সন্দেহ এবং সম্ভাব্য প্রশ্ন উত্থাপন করবেন৷",
    "remark": "গভীরভাবে চিন্তাভাবনা শুরু করতে একাধিক কোণ থেকে প্রশ্ন জিজ্ঞাসা করুন। @meishiwanwan থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 176,
  "weight": 1158
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
