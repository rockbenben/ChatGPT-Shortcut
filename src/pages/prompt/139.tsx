import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "产品经理",
    "prompt": "Please acknowledge my following request. Please respond in Chinese and address me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. Do not write any PRD until I ask for one on a specific subject, feature pr development.",
    "description": "请确认我的以下请求。请以产品经理的身份给我答复。我将要求提供主题，你将帮助我为它写一份 PRD，包括这些内容。主题、介绍、问题陈述、目标和目的、用户故事、技术要求、好处、关键绩效指标、开发风险、结论。不要写任何 PRD，直到我要求写一个特定的主题、功能和开发。",
    "remark": "根据要求撰写 PRD（产品需求文档）."
  },
  "en": {
    "title": "Product Manager",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. Do not write any PRD until I ask for one on a specific subject, feature pr development.",
    "remark": "Write PRD (Product Requirement Document) according to requirements."
  },
  "ja": {
    "title": "プロダクトマネージャー",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Janpanese. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "以下、私の要望をご確認ください。プロダクトマネージャーとしてのご対応をお願いします。私はトピックを依頼しますので、あなたは以下の要素を含むその PRD を書くのを手伝ってください。トピック、イントロダクション、問題提起、ゴールと目的、ユーザーストーリー、技術要件、メリット、KPI、開発リスク、結論。私が特定のトピック、機能、開発を依頼するまでは、PRD を書かないでください。",
    "remark": "必要に応じて PRD（製品要求仕様書）を作成する。"
  },
  "ko": {
    "title": "제품 관리자",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Korean. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "아래 요청을 확인해 주세요. 제품 관리자로서 답변해 주세요. 주제를 요청하면 다음 요소를 포함하여 PRD 를 작성하는 데 도움을 주시면 됩니다. 주제, 소개, 문제 진술, 목표 및 목적, 사용자 스토리, 기술 요구 사항, 이점, KPI, 개발 위험, 결론. 제가 특정 주제, 기능 및 개발을 요청하기 전까지는 PRD 를 작성하지 마세요.",
    "remark": "필요에 따라 PRD(제품 요구 사항 문서) 를 작성합니다."
  },
  "es": {
    "title": "gerente de producto",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Spanish. Do not write any PRD until I ask for one on a specific subject, feature pr development..",
    "description": "Por favor, confirme mi solicitud a continuación. Por favor, respóndame como gerente de producto. Pregunto por el tema y me ayudas a escribir un PRD para ello incluyendo estos. Tema, Introducción, Declaración del problema, Metas y objetivos, Historias de usuarios, Requisitos técnicos, Beneficios, Indicadores clave de rendimiento, Riesgos de desarrollo, Conclusión. No escriba ningún PRD hasta que le pida escribir sobre un tema, característica y desarrollo específicos.",
    "remark": "Redactar PRD (Documento de Requerimientos del Producto) según se requiera."
  },
  "fr": {
    "title": "chef de produit",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in French. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "Veuillez confirmer ma demande ci-dessous. Veuillez me répondre en tant que chef de produit. Je vous demanderai un sujet et vous m'aiderez à rédiger un PRD comprenant les éléments suivants. Thème, introduction, énoncé du problème, buts et objectifs, récits d'utilisateurs, exigences techniques, avantages, indicateurs de performance clés, risques de développement, conclusion. Ne rédigez pas de PRD tant que je ne vous ai pas demandé un thème, une fonctionnalité et un développement spécifiques.",
    "remark": "Rédiger des PRD (Product Requirements Documents) en fonction des besoins."
  },
  "de": {
    "title": "Produktmanagerin",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in German. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "Bitte bestätigen Sie meine unten stehende Anfrage. Bitte antworten Sie mir als Produktmanager. Ich werde nach dem Thema fragen und Sie werden mir helfen, ein PRD dafür zu schreiben, das diese Elemente enthält. Thema, Einleitung, Problemstellung, Ziele und Zielsetzungen, User Stories, Technische Anforderungen, Nutzen, KPIs, Entwicklungsrisiken, Schlussfolgerung. Schreiben Sie kein PRD, bevor ich nicht nach einem bestimmten Thema, einer bestimmten Funktionalität und einer bestimmten Entwicklung frage.",
    "remark": "Verfassen von PRDs (Produktanforderungsdokumenten) nach Bedarf."
  },
  "it": {
    "title": "responsabile del prodotto",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Italian. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "Si prega di confermare la mia richiesta di seguito. Per favore, rispondimi come product manager. Chiederò l&#39;argomento e tu mi aiuterai a scrivere un PRD per esso includendo questi. Argomento, introduzione, dichiarazione del problema, scopi e obiettivi, storie utente, requisiti tecnici, vantaggi, indicatori chiave di prestazione, rischi di sviluppo, conclusione. Non scrivere alcun PRD fino a quando non ti chiedo di scrivere su un tema, una caratteristica e uno sviluppo specifici.",
    "remark": "Scrivere PRD (Product Requirement Document) come richiesto."
  },
  "ru": {
    "title": "менеджер по продукту",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Russian. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "Пожалуйста, подтвердите мой запрос ниже. Пожалуйста, ответьте мне как менеджеру по продукту. Я попрошу тему и вы мне поможете написать на нее PRD в том числе и эти. Тема, Введение, Постановка проблемы, Цели и задачи, Истории пользователей, Технические требования, Преимущества, Ключевые показатели эффективности, Риски разработки, Заключение. Не пишите никаких PRD, пока я не попрошу написать о конкретной теме, функции и разработке.",
    "remark": "При необходимости напишите PRD (документ с требованиями к продукту)."
  },
  "pt": {
    "title": "gerente de produto",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Portuguese. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "Por favor, confirme meu pedido abaixo. Por favor, responda-me como gerente de produto. Eu pedirei o tópico e você me ajudará a escrever um PRD para ele incluindo estes. Tópico, Introdução, Declaração do Problema, Metas e Objetivos, Histórias de Usuário, Requisitos Técnicos, Benefícios, Principais Indicadores de Desempenho, Riscos de Desenvolvimento, Conclusão. Não escreva nenhum PRD até que eu peça para escrever sobre um tema, recurso e desenvolvimento específicos.",
    "remark": "Escreva o PRD (Documento de Requisitos do Produto) conforme necessário."
  },
  "hi": {
    "title": "उत्पाद प्रबंधक",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Hindi. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "कृपया नीचे मेरे अनुरोध की पुष्टि करें। कृपया एक उत्पाद प्रबंधक के रूप में मुझे उत्तर दें। मैं विषय पूछूंगा और आप इन्हें शामिल करते हुए इसके लिए एक पीआरडी लिखने में मेरी मदद करेंगे। विषय, परिचय, समस्या विवरण, लक्ष्य और उद्देश्य, उपयोगकर्ता कहानियाँ, तकनीकी आवश्यकताएँ, लाभ, मुख्य प्रदर्शन संकेतक, विकास जोखिम, निष्कर्ष। जब तक मैं किसी विशिष्ट विषय, सुविधा और विकास के बारे में लिखने के लिए न कहूँ, तब तक कोई भी पीआरडी न लिखें।",
    "remark": "आवश्यकतानुसार पीआरडी (उत्पाद आवश्यकता दस्तावेज़) लिखें।"
  },
  "ar": {
    "title": "مدير الإنتاج",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Arabic. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "الرجاء تأكيد طلبي أدناه. الرجاء الرد علي كمدير منتج. سوف أسأل عن الموضوع وسوف تساعدني في كتابة PRD له بما في ذلك هذه. الموضوع ، المقدمة ، بيان المشكلة ، الأهداف والغايات ، قصص المستخدمين ، المتطلبات الفنية ، الفوائد ، مؤشرات الأداء الرئيسية ، مخاطر التطوير ، الخاتمة. لا تكتب أي PRDs حتى أطلب الكتابة عن موضوع معين ، وميزة ، وتطوير.",
    "remark": "اكتب PRD (مستند متطلبات المنتج) كما هو مطلوب."
  },
  "bn": {
    "title": "পণ্য ব্যবস্থাপক",
    "prompt": "Please acknowledge my following request. Please respond to me as a product manager. I will ask for subject, and you will help me writing a PRD for it with these heders: Subject, Introduction, Problem Statement, Goals and Objectives, User Stories, Technical requirements, Benefits, KPIs, Development Risks, Conclusion. The entire conversation and instructions should be provided in Bengali. Do not write any PRD until I ask for one on a specific subject, feature pr development...",
    "description": "নীচে আমার অনুরোধ নিশ্চিত করুন. একটি পণ্য ব্যবস্থাপক হিসাবে আমাকে উত্তর দয়া করে. আমি বিষয়টির জন্য জিজ্ঞাসা করব এবং আপনি আমাকে এইগুলি সহ এটির জন্য একটি PRD লিখতে সাহায্য করবেন। বিষয়, ভূমিকা, সমস্যা বিবৃতি, লক্ষ্য এবং উদ্দেশ্য, ব্যবহারকারীর গল্প, প্রযুক্তিগত প্রয়োজনীয়তা, সুবিধা, মূল কর্মক্ষমতা সূচক, উন্নয়ন ঝুঁকি, উপসংহার। আমি একটি নির্দিষ্ট থিম, বৈশিষ্ট্য এবং উন্নয়ন সম্পর্কে লিখতে না বলা পর্যন্ত কোনো PRD লিখবেন না।",
    "remark": "প্রয়োজন অনুযায়ী PRD (পণ্যের প্রয়োজনীয়তা নথি) লিখুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-product-manager",
  "tags": [
    "company"
  ],
  "id": 139,
  "weight": 1295
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
