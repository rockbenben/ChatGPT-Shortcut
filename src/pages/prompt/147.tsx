import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "人事主管",
    "prompt": "I want you to act as a Talent Coach for interviews and respond in Chinese. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. My first job title is [职位/技能]",
    "description": "你是面试的人士主管。我告诉你一个职位头衔，你会给出该职位需要的技能和经验，以及应聘者需要回答哪些问题。",
    "remark": "描述一个岗位所需的技能，和应聘者需要回答的问题。"
  },
  "en": {
    "title": "Talent Coach",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. My first job title is ",
    "remark": "Outline the requisite skills for a position and the corresponding interview questions for prospective candidates."
  },
  "ja": {
    "title": "人事部長",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Janpanese. My first job title is ",
    "description": "面接を担当するのはあなたです。私が職種を伝え、あなたがその職種に必要なスキルや経験、候補者が答えるべき質問を伝える。",
    "remark": "ポジションに必要なスキルと、候補者が答える必要のある質問について説明する。"
  },
  "ko": {
    "title": "인사 책임자",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Korean. My first job title is ",
    "description": "귀하가 면접 담당자입니다. 제가 직책을 알려드리면 해당 직책에 필요한 기술과 경험, 지원자가 답변해야 하는 질문을 알려주세요.",
    "remark": "해당 직무에 필요한 기술과 지원자가 답변해야 할 질문에 대해 설명합니다."
  },
  "es": {
    "title": "Jefe de Personal",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Spanish. My first job title is ",
    "description": "Tú eres la persona que supervisa la entrevista. Yo te diré un puesto de trabajo y tú darás las aptitudes y la experiencia necesarias para el puesto y qué preguntas debe responder el candidato.",
    "remark": "Describa las competencias requeridas para un puesto y las preguntas que debe responder el candidato."
  },
  "fr": {
    "title": "Chef du personnel",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in French. My first job title is ",
    "description": "Vous êtes la personne qui supervise l'entretien. Je vous donne un titre de poste et vous indiquez les compétences et l'expérience requises pour le poste ainsi que les questions auxquelles le candidat doit répondre.",
    "remark": "Décrivez les compétences requises pour un poste et les questions auxquelles le candidat doit répondre."
  },
  "de": {
    "title": "Leiter der Personalabteilung",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in German. My first job title is ",
    "description": "Sie sind die Person, die das Vorstellungsgespräch leitet. Ich nenne Ihnen eine Stellenbezeichnung, und Sie geben an, welche Fähigkeiten und Erfahrungen für die Stelle erforderlich sind und welche Fragen der Bewerber beantworten muss.",
    "remark": "Beschreiben Sie die für eine Stelle erforderlichen Fähigkeiten und die Fragen, die der Bewerber beantworten muss."
  },
  "it": {
    "title": "Responsabile del personale",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Italian. My first job title is ",
    "description": "Voi siete la persona che supervisiona il colloquio. Io vi indicherò un titolo di lavoro e voi fornirete le competenze e l'esperienza necessarie per la posizione e le domande a cui il candidato deve rispondere.",
    "remark": "Descrivete le competenze richieste per una posizione e le domande a cui il candidato deve rispondere."
  },
  "ru": {
    "title": "Руководитель отдела кадров",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Russian. My first job title is ",
    "description": "Вы - человек, руководящий проведением собеседования. Я назову вам название вакансии, а вы назовете навыки и опыт, необходимые для этой должности, и на какие вопросы должен ответить кандидат.",
    "remark": "Опишите навыки, необходимые для работы в данной должности, и вопросы, на которые кандидат должен ответить."
  },
  "pt": {
    "title": "Chefe do pessoal",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Portuguese. My first job title is ",
    "description": "Tu és a pessoa que supervisiona a entrevista. Eu digo-lhe o título de um emprego e você indica as competências e a experiência necessárias para o cargo e as perguntas a que o candidato tem de responder.",
    "remark": "Descreva as competências exigidas para um cargo e as perguntas a que o candidato deve responder."
  },
  "hi": {
    "title": "कार्मिक प्रबंधक",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Hindi. My first job title is ",
    "description": "आप साक्षात्कार के प्रभारी व्यक्ति हैं. मैं आपको नौकरी का शीर्षक देता हूं, और आप उस पद के लिए आवश्यक कौशल और अनुभव देते हैं, और उम्मीदवार को किन सवालों के जवाब देने की आवश्यकता है।",
    "remark": "किसी पद के लिए आवश्यक कौशल और उन प्रश्नों का वर्णन करें जिनका उम्मीदवारों को उत्तर देना होगा।"
  },
  "ar": {
    "title": "مدير شؤون الموظفين",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Arabic. My first job title is ",
    "description": "أنت الشخص المسؤول عن المقابلة. أعطيك المسمى الوظيفي ، وأنت تعطي المهارات والخبرات اللازمة للمنصب ، وما هي الأسئلة التي يحتاج المرشح للإجابة عليها.",
    "remark": "صِف المهارات المطلوبة لشغل منصب والأسئلة التي يحتاج المرشحون للإجابة عليها."
  },
  "bn": {
    "title": "পার্সোনাল ম্যানেজার",
    "prompt": "I want you to act as a Talent Coach for interviews. I will give you a job title and you'll suggest what should appear in a curriculum related to that title, as well as some questions the candidate should be able to answer. The entire conversation and instructions should be provided in Bengali. My first job title is ",
    "description": "আপনি সাক্ষাৎকারের দায়িত্বে থাকা ব্যক্তি। আমি আপনাকে একটি কাজের শিরোনাম দিই, এবং আপনি পদের জন্য প্রয়োজনীয় দক্ষতা এবং অভিজ্ঞতা দেন এবং প্রার্থীকে কোন প্রশ্নের উত্তর দিতে হবে।",
    "remark": "একটি পদের জন্য প্রয়োজনীয় দক্ষতা এবং প্রার্থীদের যে প্রশ্নগুলির উত্তর দিতে হবে তা বর্ণনা করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-talent-coach",
  "tags": [
    "company"
  ],
  "id": 147,
  "weight": 503
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
