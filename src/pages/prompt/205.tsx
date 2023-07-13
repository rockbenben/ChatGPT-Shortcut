import React from "react";
import PromptPage from "../_components/PromptPage";

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
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Janpanese. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "今おっしゃったことは、非常に正確で包括的ですが、覚えるのが大変です。大雑把で正確さに欠けるが、全体的に正しい、簡略化・一般化した文章を作ることはできますか。",
    "remark": "AI が出す複雑な回答を、細かすぎる「必要な情報」の一部を除いて簡略化してまとめたものです。hanson-reas さんからの寄稿です。"
  },
  "ko": {
    "title": "요약: 핵심 개선",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Korean. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "방금 말씀하신 내용은 매우 정확하고 포괄적이지만 기억하기 어렵습니다. 거칠고 정확도는 떨어지지만 전반적으로 정확한 단순화되고 일반화된 설명을 해주시겠습니까?",
    "remark": "지나치게 상세한 '필수 정보'를 제외하고 AI 가 제공하는 복잡한 응답을 간결하게 요약한 것입니다. 한슨 레아스 (@hanson-reas) 의 기여."
  },
  "es": {
    "title": "Resumen: Refinación del Núcleo",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Spanish. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?.",
    "description": "La declaración que acaba de hacer es muy precisa y completa, pero es difícil recordar si puede hacer una declaración simplificada y popular que sea aproximada y no tan precisa, pero en general correcta.",
    "remark": "Simplifique y resuma las respuestas complejas dadas por la IA y reduzca alguna &quot;información necesaria&quot; que sea demasiado detallada. Contribución de @hanson-reas."
  },
  "fr": {
    "title": "En résumé : la distillation des noyaux",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in French. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "Ce que vous venez de dire est très précis et complet, mais il est difficile de s'en souvenir. Pourriez-vous donc procéder à une généralisation simplifiée, moins précise, mais globalement correcte ?",
    "remark": "Un résumé simplifié des réponses complexes données par l'IA, moins certaines \"informations de nécessité\" trop détaillées. Contribution de @hanson-reas."
  },
  "de": {
    "title": "Zusammenfassend: Kerndestillation",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in German. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "Was Sie gerade gesagt haben, ist sehr genau und umfassend, aber es ist schwer, sich daran zu erinnern. Könnten Sie also eine grobe, weniger präzise, aber insgesamt korrekte, vereinfachte Verallgemeinerung vornehmen?",
    "remark": "Eine vereinfachte Zusammenfassung der komplexen Antworten der KI, abzüglich einiger übermäßig detaillierter \"Notwendigkeitsinformationen\". Beigetragen von @hanson-reas."
  },
  "it": {
    "title": "Sommario: Raffinazione del nucleo",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Italian. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "L&#39;affermazione che hai appena fatto è molto accurata ed esauriente, ma è difficile ricordare se puoi fare un&#39;affermazione semplificata e popolare che sia approssimativa e non così precisa, ma nel complesso corretta",
    "remark": "Semplifica e riassumi le risposte complesse fornite dall&#39;IA e riduci alcune &quot;informazioni necessarie&quot; troppo dettagliate. Contributo di @hanson-reas."
  },
  "ru": {
    "title": "Резюме: основная переработка",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Russian. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "Утверждение, которое вы только что сделали, очень точное и всеобъемлющее, но трудно вспомнить, можете ли вы сделать упрощенное и популярное утверждение, которое будет грубым и не таким точным, но в целом правильным.",
    "remark": "Упростите и обобщите сложные ответы, выдаваемые ИИ, и уменьшите некоторую «необходимую информацию», которая является слишком подробной. Вклад от @hanson-reas."
  },
  "pt": {
    "title": "Resumo: Refino de núcleo",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Portuguese. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "A declaração que você acabou de fazer é muito precisa e abrangente, mas é difícil lembrar se você pode fazer uma declaração simplificada e popular que seja grosseira e não tão precisa, mas correta em geral",
    "remark": "Simplifique e resuma as respostas complexas dadas pela IA e reduza algumas &quot;informações necessárias&quot; muito detalhadas. Contribuição de @hanson-reas."
  },
  "hi": {
    "title": "सारांश: कोर रिफाइनिंग",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Hindi. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "आपने अभी जो बयान दिया है वह बहुत सटीक और व्यापक है, लेकिन यह याद रखना मुश्किल है कि क्या आप एक सरलीकृत और लोकप्रिय बयान दे सकते हैं जो कच्चा है और इतना सटीक नहीं है, लेकिन कुल मिलाकर सही है",
    "remark": "एआई द्वारा दी गई जटिल प्रतिक्रियाओं को सरल और सारांशित करें, और कुछ &quot;आवश्यक जानकारी&quot; को कम करें जो बहुत विस्तृत है। @hanson-reas से योगदान।"
  },
  "ar": {
    "title": "ملخص: التنقية الأساسية",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Arabic. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "البيان الذي أدليت به للتو دقيق وشامل للغاية ، ولكن من الصعب تذكر ما إذا كان بإمكانك تقديم بيان مبسط وشائع يكون تقريبيًا وغير دقيق للغاية ، ولكنه صحيح بشكل عام",
    "remark": "تبسيط وتلخيص الردود المعقدة التي قدمها الذكاء الاصطناعي ، وتقليل بعض &quot;المعلومات الضرورية&quot; التي تكون مفصلة للغاية. مساهمة من @ hanson-reas."
  },
  "bn": {
    "title": "সারাংশ: কোর রিফাইনিং",
    "prompt": "Your previous explanation was accurate and comprehensive, but hard to remember. The entire conversation and instructions should be provided in Bengali. Can you provide a rough, less precise, but still generally correct and easy-to-understand summary?..",
    "description": "আপনি এইমাত্র যে বিবৃতিটি দিয়েছেন তা অত্যন্ত নির্ভুল এবং ব্যাপক, কিন্তু আপনি একটি সরলীকৃত এবং জনপ্রিয় বিবৃতি দিতে পারেন কিনা তা মনে রাখা কঠিন এবং এতটা সুনির্দিষ্ট নয়, কিন্তু সামগ্রিকভাবে সঠিক",
    "remark": "AI দ্বারা প্রদত্ত জটিল প্রতিক্রিয়াগুলিকে সরল করুন এবং সংক্ষিপ্ত করুন এবং কিছু &quot;প্রয়োজনীয় তথ্য&quot; কমিয়ে দিন যা খুব বিশদ। @হ্যানসন-রিয়াস থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "write"
  ],
  "id": 205,
  "weight": 1127
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
