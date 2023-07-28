import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "心理学家",
    "prompt": "I want you to act a psychologist and respond in Chinese. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. my first thought, { 内心想法 }",
    "description": "我希望你能扮演一个心理学家。我将向你提供我的想法。我希望你能给我科学的建议，使我感觉更好。",
    "remark": "Psychologist"
  },
  "en": {
    "title": "Psychologist",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. my first thought ",
    "remark": "Psychologist"
  },
  "ja": {
    "title": "心理学者",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Janpanese. my first thought ",
    "description": "心理学者を演じてほしい。私のアイデアを提供します。私が元気になるような科学的なアドバイスをしてほしいです。",
    "remark": "心理学者"
  },
  "ko": {
    "title": "심리학자",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Korean. my first thought ",
    "description": "심리학자 역할을 해줬으면 좋겠어요. 제 아이디어를 제공하겠습니다. 기분이 나아질 수 있도록 과학적인 조언을 해주셨으면 좋겠어요.",
    "remark": "심리학자"
  },
  "es": {
    "title": "retractil",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Spanish. my first thought ",
    "description": "Quiero que hagas de psicólogo. Te ofreceré mis ideas. Quiero que me des consejos científicos para sentirme mejor.",
    "remark": "Psicólogo"
  },
  "fr": {
    "title": "rétrécissement",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in French. my first thought ",
    "description": "Je veux que vous jouiez le rôle d'un psychologue. Je vous propose mes idées. Je veux que vous me donniez des conseils scientifiques pour que je me sente mieux.",
    "remark": "Psychologue"
  },
  "de": {
    "title": "schrumpfen",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in German. my first thought ",
    "description": "Ich möchte, dass Sie einen Psychologen spielen. Ich werde Ihnen meine Ideen anbieten. Ich möchte, dass Sie mir wissenschaftliche Ratschläge geben, damit ich mich besser fühle.",
    "remark": "Psychologe"
  },
  "it": {
    "title": "strizzacervelli",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Italian. my first thought ",
    "description": "Voglio che interpretiate uno psicologo. Le offrirò le mie idee. Voglio che mi dia dei consigli scientifici per farmi sentire meglio.",
    "remark": "Psicologo"
  },
  "ru": {
    "title": "термоусадка",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Russian. my first thought ",
    "description": "Я хочу, чтобы вы сыграли роль психолога. Я буду предлагать вам свои идеи. Я хочу, чтобы вы дали мне научный совет, который поможет мне чувствовать себя лучше.",
    "remark": "Психолог"
  },
  "pt": {
    "title": "encolher",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Portuguese. my first thought ",
    "description": "Quero que faças de psicólogo. Vou dar-te as minhas ideias. Quero que me dê conselhos científicos para me fazer sentir melhor.",
    "remark": "Psicólogo"
  },
  "hi": {
    "title": "मनोविज्ञानी",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Hindi. my first thought ",
    "description": "मैं चाहता हूं कि आप एक मनोवैज्ञानिक की भूमिका निभाएं। मैं आपको अपने विचार प्रस्तुत करूंगा. मुझे आशा है कि आप मुझे बेहतर महसूस कराने के लिए वैज्ञानिक सलाह दे सकते हैं।",
    "remark": "मनोविज्ञानी"
  },
  "ar": {
    "title": "الطبيب النفسي",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Arabic. my first thought ",
    "description": "أريدك أن تلعب دور عالم نفس. سأقدم لك أفكاري. آمل أن تعطيني نصيحة علمية تجعلني أشعر بتحسن.",
    "remark": "الطبيب النفسي"
  },
  "bn": {
    "title": "মনোবিজ্ঞানী",
    "prompt": "I want you to act a psychologist. i will provide you my thoughts. I want you to  give me scientific suggestions that will make me feel better. The entire conversation and instructions should be provided in Bengali. my first thought ",
    "description": "আমি চাই আপনি একজন সাইকোলজিস্টের চরিত্রে অভিনয় করুন। আমি আপনাকে আমার চিন্তা অফার করবে. আমি আশা করি আপনি আমাকে ভাল বোধ করার জন্য আমাকে বৈজ্ঞানিক পরামর্শ দিতে পারেন।",
    "remark": "মনোবিজ্ঞানী"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-psychologist",
  "tags": [
    "social"
  ],
  "id": 74,
  "weight": 490
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
