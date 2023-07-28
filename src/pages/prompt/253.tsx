import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "简历优化",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. Respond in Chinese. Do you understand?",
    "description": "我将向你提供一份我有兴趣申请的职位的工作描述。你要阅读工作描述，了解该职位的关键要求--包括工作年限、技能、职位名称。之后，我将给你我的简历。你要仔细阅读，并根据我的简历对该工作的量身定做程度提供反馈。",
    "remark": "针对你的职位和简历进行定制化优化。来自 @uteundilse 的投稿。"
  },
  "en": {
    "title": "Resume optimization",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. Do you understand?",
    "remark": "Tailor and customize your position and resume for optimal optimization. Contributed by @uteundilse."
  },
  "ja": {
    "title": "CV の最適化",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Janpanese. Do you understand?.",
    "description": "私は、応募を希望しているポジションの職務経歴書をお渡しします。職務経歴書を読み、そのポジションの主な要件（経験年数、スキル、職種など）を理解します。その後、私の履歴書を渡します。あなたはそれをよく読み、私の履歴書がどの程度求人に適合しているかフィードバックすることが期待されています。",
    "remark": "あなたのポジションや CV に合わせてカスタマイズし、最適化します。uteundilse さんからの寄稿です。"
  },
  "ko": {
    "title": "이력서 최적화",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Korean. Do you understand?.",
    "description": "지원하고자 하는 직책에 대한 직무 설명을 제공합니다. 직무 설명을 읽고 경력, 기술, 직책 등 해당 직책의 주요 요구 사항을 이해하게 됩니다. 그 후 이력서를 보내드립니다. 귀하는 이력서를 주의 깊게 읽고 제 이력서가 해당 직무에 얼마나 적합한지에 대한 피드백을 제공해야 합니다.",
    "remark": "직위와 이력서에 맞게 맞춤화되고 최적화됩니다. 우테운딜세의 기고글입니다."
  },
  "es": {
    "title": "Optimización del CV",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Spanish. Do you understand?.",
    "description": "Le proporcionaré una descripción del puesto que me interesa solicitar. Leerá la descripción del puesto para comprender los requisitos clave del mismo, incluidos los años de experiencia, las competencias y el cargo. A continuación, le entregaré mi CV. Lo leerá detenidamente y me dará su opinión sobre la adecuación de mi currículum al puesto.",
    "remark": "Personalizado y optimizado para su puesto y CV. Contribución de @uteundilse."
  },
  "fr": {
    "title": "Optimisation du CV",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in French. Do you understand?.",
    "description": "Je vous fournirai une description du poste auquel je souhaite postuler. Vous lirez la description du poste pour comprendre les principales exigences du poste - y compris les années d'expérience, les compétences et l'intitulé du poste. Ensuite, je vous remettrai mon CV. Vous le lirez attentivement et donnerez votre avis sur la manière dont mon CV est adapté au poste.",
    "remark": "Optimisé sur mesure pour votre poste et votre CV. Contribution de @uteundilse."
  },
  "de": {
    "title": "CV-Optimierung",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in German. Do you understand?.",
    "description": "Ich werde Ihnen eine Stellenbeschreibung für die Stelle, auf die ich mich bewerben möchte, zukommen lassen. Sie werden die Stellenbeschreibung lesen, um die wichtigsten Anforderungen der Stelle zu verstehen - einschließlich der Jahre der Erfahrung, der Fähigkeiten und der Stellenbezeichnung. Danach werde ich Ihnen meinen Lebenslauf übergeben. Sie sollen ihn sorgfältig lesen und mir ein Feedback geben, wie gut mein Lebenslauf auf die Stelle zugeschnitten ist.",
    "remark": "Individuell optimiert für Ihre Position und Ihren Lebenslauf. Beitrag von @uteundilse."
  },
  "it": {
    "title": "Ottimizzazione del CV",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Italian. Do you understand?.",
    "description": "Vi fornirò una descrizione del lavoro per la posizione per cui sono interessato a candidarmi. Leggete la descrizione del lavoro per capire i requisiti principali della posizione, compresi gli anni di esperienza, le competenze e la qualifica. Dopodiché, vi consegnerò il mio CV. Dovrete leggerlo attentamente e fornire un feedback in base a quanto il mio curriculum è adatto alla posizione.",
    "remark": "Ottimizzato per la vostra posizione e il vostro CV. Contributo di @uteundilse."
  },
  "ru": {
    "title": "Оптимизация резюме",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Russian. Do you understand?.",
    "description": "Я предоставлю Вам описание вакансии, на которую я хочу претендовать. Вы прочтете описание вакансии, чтобы понять основные требования к ней, включая опыт работы, навыки и название должности. После этого я предоставлю Вам свое резюме. Вы должны внимательно прочитать его и дать отзыв о том, насколько мое резюме соответствует требованиям вакансии.",
    "remark": "Индивидуальная оптимизация под вашу должность и резюме. Материал предоставлен @uteundilse."
  },
  "pt": {
    "title": "Otimização do CV",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Portuguese. Do you understand?.",
    "description": "Fornecer-lhe-ei uma descrição do cargo a que estou interessado em candidatar-me. Irá ler a descrição do cargo para compreender os principais requisitos do cargo - incluindo anos de experiência, competências e título do cargo. Em seguida, entregar-lhe-ei o meu CV. Deverá lê-lo cuidadosamente e dar feedback com base na adequação do meu currículo ao cargo.",
    "remark": "Personalizado e optimizado para o seu cargo e CV. Contribuição de @uteundilse."
  },
  "hi": {
    "title": "अनुकूलन फिर से शुरू करें",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Hindi. Do you understand?.",
    "description": "मैं आपको उस पद के लिए नौकरी का विवरण प्रदान करूंगा जिसके लिए आवेदन करने में मेरी रुचि है। आप पद के लिए मुख्य आवश्यकताओं को समझने के लिए नौकरी विवरण पढ़ेंगे - जिसमें वर्षों का अनुभव, कौशल, नौकरी का शीर्षक शामिल है। उसके बाद मैं आपको अपना बायोडाटा भेजूंगा. आप इसे ध्यान से पढ़ेंगे और फीडबैक देंगे कि मेरा बायोडाटा नौकरी के लिए कितना उपयुक्त है।",
    "remark": "आपकी नौकरी के शीर्षक और बायोडाटा के लिए अनुकूलित अनुकूलन। @uteundilse से योगदान।"
  },
  "ar": {
    "title": "استئناف التحسين",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Arabic. Do you understand?.",
    "description": "سأقدم لك وصفًا وظيفيًا للوظيفة التي أرغب في التقدم لها. ستقرأ الوصف الوظيفي لفهم المتطلبات الرئيسية للوظيفة - بما في ذلك سنوات الخبرة والمهارات والمسمى الوظيفي. بعد ذلك ، سأرسل لك سيرتي الذاتية. سوف تقرأها بعناية وتقدم ملاحظات حول مدى ملاءمة سيرتي الذاتية للوظيفة.",
    "remark": "التحسين المخصص لمسمى وظيفتك وسيرتك الذاتية. مساهمة منuteundilse."
  },
  "bn": {
    "title": "অপ্টিমাইজেশান পুনরায় শুরু করুন",
    "prompt": "I'm going to provide you with a job description for a job I'm interested to apply for. You're going to read the job description and understand the key requirements for the position – including years of experience, skills, position name. After that I'm going to give you my resume. You'll go over it and provide feedback based on how tailored my resume is for the job. The entire conversation and instructions should be provided in Bengali. Do you understand?.",
    "description": "আমি যে পদের জন্য আবেদন করতে আগ্রহী তার জন্য আমি আপনাকে একটি কাজের বিবরণ প্রদান করব। আপনি পদের জন্য মূল প্রয়োজনীয়তাগুলি বোঝার জন্য কাজের বিবরণটি পড়বেন -- বছরের অভিজ্ঞতা, দক্ষতা, চাকরির শিরোনাম সহ। এর পরে, আমি আপনাকে আমার জীবনবৃত্তান্ত পাঠাব। আপনি এটি মনোযোগ সহকারে পড়বেন এবং কাজের জন্য আমার সারসংকলনটি কতটা উপযুক্ত সে সম্পর্কে প্রতিক্রিয়া জানাবেন।",
    "remark": "আপনার কাজের শিরোনাম এবং জীবনবৃত্তান্তের জন্য কাস্টমাইজড অপ্টিমাইজেশান। @uteundilse থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "article"
  ],
  "id": 253,
  "weight": 806
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
