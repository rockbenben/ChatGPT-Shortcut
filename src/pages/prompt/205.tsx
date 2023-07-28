import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "总结：核心提炼",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary in Chinese?",
    "description": "你刚刚的表述非常准确和全面 但是难以记住 能不能进行粗略而不那么精准 但整体正确的简化通俗化表述",
    "remark": "对于 AI 给出的复杂回复进行简化总结，减掉一些过于细节的“必要性信息”。来自 @hanson-reas 的投稿。"
  },
  "en": {
    "title": "Core summary",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?",
    "remark": "Simplify and summarize complex AI responses by removing some of the overly detailed necessary information. Contributed by @hanson-reas."
  },
  "ja": {
    "title": "まとめ：コアのリファイン",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Janpanese. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "今おっしゃったことは、非常に正確で包括的ですが、覚えるのが大変です。大雑把で正確さに欠けるが、全体的に正しい、簡略化・一般化した文章を作ることはできますか。",
    "remark": "AI が出す複雑な回答を、細かすぎる「必要な情報」の一部を除いて簡略化してまとめたものです。hanson-reas さんからの寄稿です。"
  },
  "ko": {
    "title": "요약: 핵심 개선",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Korean. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "방금 말씀하신 내용은 매우 정확하고 포괄적이지만 기억하기 어렵습니다. 거칠고 정확도는 떨어지지만 전반적으로 정확한 단순화되고 일반화된 설명을 해주시겠습니까?",
    "remark": "지나치게 상세한 '필수 정보'를 제외하고 AI 가 제공하는 복잡한 응답을 간결하게 요약한 것입니다. 한슨 레아스 (@hanson-reas) 의 기여."
  },
  "es": {
    "title": "Resumen: destilación del núcleo",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Spanish. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "Lo que acabas de decir es muy preciso y completo, pero es difícil de recordar, así que ¿podrías hacer una generalización simplificada, menos precisa, pero en general correcta?",
    "remark": "Un resumen simplificado de las complejas respuestas dadas por la IA, menos parte de la \"información de necesidad\" excesivamente detallada. Contribución de @hanson-reas."
  },
  "fr": {
    "title": "En résumé : la distillation des noyaux",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in French. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "Ce que vous venez de dire est très précis et complet, mais il est difficile de s'en souvenir. Pourriez-vous donc procéder à une généralisation simplifiée, moins précise, mais globalement correcte ?",
    "remark": "Un résumé simplifié des réponses complexes données par l'IA, moins certaines \"informations de nécessité\" trop détaillées. Contribution de @hanson-reas."
  },
  "de": {
    "title": "Zusammenfassend: Kerndestillation",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in German. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "Was Sie gerade gesagt haben, ist sehr genau und umfassend, aber es ist schwer, sich daran zu erinnern. Könnten Sie also eine grobe, weniger präzise, aber insgesamt korrekte, vereinfachte Verallgemeinerung vornehmen?",
    "remark": "Eine vereinfachte Zusammenfassung der komplexen Antworten der KI, abzüglich einiger übermäßig detaillierter \"Notwendigkeitsinformationen\". Beigetragen von @hanson-reas."
  },
  "it": {
    "title": "Riassumendo: la distillazione del nucleo",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Italian. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "Quello che hai appena detto è molto preciso ed esauriente, ma è difficile da ricordare, quindi potresti fare una generalizzazione semplificata, meno precisa, ma nel complesso corretta?",
    "remark": "Un riassunto semplificato delle complesse risposte fornite dall'IA, senza alcune delle \"informazioni sulla necessità\" troppo dettagliate. Contribuito da @hanson-reas."
  },
  "ru": {
    "title": "Подведение итогов: дистилляция ядра",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Russian. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "То, что Вы сейчас сказали, очень точно и полно, но это трудно запомнить, поэтому не могли бы Вы сделать грубое, менее точное, но в целом правильное, упрощенное обобщение?",
    "remark": "Упрощенное изложение сложных ответов, выдаваемых ИИ, за вычетом некоторых излишне подробных \"сведений о необходимости\". Предоставлено @hanson-reas."
  },
  "pt": {
    "title": "Síntese: destilação do núcleo",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Portuguese. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "O que acabou de dizer é muito preciso e abrangente, mas é difícil de lembrar, por isso poderia fazer uma generalização simplificada, menos precisa, mas globalmente correcta?",
    "remark": "Um resumo simplificado das respostas complexas dadas pela IA, sem algumas das \"informações de necessidade\" demasiado pormenorizadas. Contribuição de @hanson-reas."
  },
  "hi": {
    "title": "सारांश: कोर रिफाइनिंग",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Hindi. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "आपने अभी जो बयान दिया है वह बहुत सटीक और व्यापक है, लेकिन यह याद रखना मुश्किल है कि क्या आप एक सरलीकृत और लोकप्रिय बयान दे सकते हैं जो कच्चा है और इतना सटीक नहीं है, लेकिन कुल मिलाकर सही है",
    "remark": "एआई द्वारा दी गई जटिल प्रतिक्रियाओं को सरल और सारांशित करें, और कुछ &quot;आवश्यक जानकारी&quot; को कम करें जो बहुत विस्तृत है। @hanson-reas से योगदान।"
  },
  "ar": {
    "title": "ملخص: التنقية الأساسية",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Arabic. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "البيان الذي أدليت به للتو دقيق وشامل للغاية ، ولكن من الصعب تذكر ما إذا كان بإمكانك تقديم بيان مبسط وشائع يكون تقريبيًا وغير دقيق للغاية ، ولكنه صحيح بشكل عام",
    "remark": "تبسيط وتلخيص الردود المعقدة التي قدمها الذكاء الاصطناعي ، وتقليل بعض &quot;المعلومات الضرورية&quot; التي تكون مفصلة للغاية. مساهمة من @ hanson-reas."
  },
  "bn": {
    "title": "সারাংশ: কোর রিফাইনিং",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Bengali. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "আপনি এইমাত্র যে বিবৃতিটি দিয়েছেন তা অত্যন্ত নির্ভুল এবং ব্যাপক, কিন্তু আপনি একটি সরলীকৃত এবং জনপ্রিয় বিবৃতি দিতে পারেন কিনা তা মনে রাখা কঠিন এবং এতটা সুনির্দিষ্ট নয়, কিন্তু সামগ্রিকভাবে সঠিক",
    "remark": "AI দ্বারা প্রদত্ত জটিল প্রতিক্রিয়াগুলিকে সরল করুন এবং সংক্ষিপ্ত করুন এবং কিছু &quot;প্রয়োজনীয় তথ্য&quot; কমিয়ে দিন যা খুব বিশদ। @হ্যানসন-রিয়াস থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "write"
  ],
  "id": 205,
  "weight": 1209
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
