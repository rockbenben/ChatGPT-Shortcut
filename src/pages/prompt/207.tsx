import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "阅读空气",
    "prompt": "在以下这个场景中，有人对我说了一句话，请帮我分析对方可能想表达什么意思，并提供一个合适的回应。场景：[描述一个具体的情境]。说话人说：[具体的话语]。对方的意图可能是什么？我应该如何回应？",
    "description": "发生 [某个具体的事情/背景]，有人对我说：[内容]。请问对方可能想表达什么意思？你会怎样回应？",
    "remark": "对于一些无法理解的对话，提供对话背景让 AI 来进行解读并制定出适当的回应。"
  },
  "en": {
    "title": "AI Conversation",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. What could be the other person's intention? How should I respond?",
    "remark": "空気を読む read the air. For some incomprehensible conversations, provide the context of the conversation for AI to interpret and formulate an appropriate response."
  },
  "ja": {
    "title": "リーディングエア",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Janpanese. What could be the other person's intention? How should I respond?.",
    "description": "ある出来事（具体的な事柄・文脈）があり、ある人が私にこう言いました：「内容」。その人が何を言おうとしているのか聞いてもいいですか？あなたならどう答えますか？",
    "remark": "理解できない会話については、AI が解釈して適切な返答ができるように、会話の文脈を提供する。"
  },
  "ko": {
    "title": "공기 읽기",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Korean. What could be the other person's intention? How should I respond?.",
    "description": "특정 일/상황]이 발생했고 누군가 저에게 [내용] 이라고 말했습니다. 그 사람이 무슨 말을 하려는 것인지 물어봐도 될까요? 어떻게 대답하시겠어요?",
    "remark": "이해할 수 없는 대화의 경우 AI 가 적절한 답변을 해석하고 공식화할 수 있도록 대화에 대한 컨텍스트를 제공하세요."
  },
  "es": {
    "title": "Aire de lectura",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Spanish. What could be the other person's intention? How should I respond?.",
    "description": "Sucedió [algo/contexto concreto] y alguien me dijo: [contenido]. ¿Qué podría estar intentando decir esa persona? ¿Cómo responderías?",
    "remark": "Para algunos diálogos ininteligibles, proporcione el contexto del diálogo para que la IA lo interprete y formule una respuesta adecuada."
  },
  "fr": {
    "title": "Lire l'air",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in French. What could be the other person's intention? How should I respond?.",
    "description": "Il s'est passé [une chose/un contexte spécifique] et quelqu'un m'a dit : [contenu]. Qu'est-ce que cette personne pourrait vouloir dire ? Quelle serait votre réponse ?",
    "remark": "Pour certains dialogues inintelligibles, fournissez le contexte du dialogue pour que l'IA puisse l'interpréter et formuler une réponse appropriée."
  },
  "de": {
    "title": "Luft lesen",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in German. What could be the other person's intention? How should I respond?.",
    "description": "Es geschah [eine bestimmte Sache/Kontext] und jemand sagte zu mir: [Inhalt]. Was könnte die Person damit sagen wollen? Wie würden Sie darauf reagieren?",
    "remark": "Bei unverständlichen Dialogen geben Sie den Kontext des Dialogs an, damit die KI ihn interpretieren und eine angemessene Antwort formulieren kann."
  },
  "it": {
    "title": "Aria di lettura",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Italian. What could be the other person's intention? How should I respond?.",
    "description": "È successo [una cosa/contesto specifico] e qualcuno mi ha detto: [contenuto]. Cosa potrebbe cercare di dire la persona? Come rispondereste?",
    "remark": "Per alcuni dialoghi incomprensibili, fornire il contesto del dialogo affinché l'IA possa interpretarlo e formulare una risposta appropriata."
  },
  "ru": {
    "title": "Читательский воздух",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Russian. What could be the other person's intention? How should I respond?.",
    "description": "Произошло [конкретное событие/контекст], и кто-то сказал мне: [содержание]. Что этот человек хотел сказать? Как бы Вы отреагировали?",
    "remark": "Для некоторых неразборчивых диалогов следует предоставить контекст диалога, чтобы ИИ мог интерпретировать его и сформулировать соответствующую реакцию."
  },
  "pt": {
    "title": "Leitura do ar",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Portuguese. What could be the other person's intention? How should I respond?.",
    "description": "Aconteceu [uma coisa/contexto específico] e alguém me disse: [conteúdo]. O que é que a pessoa poderia estar a tentar dizer? Como é que responderia?",
    "remark": "Para alguns diálogos ininteligíveis, fornecer o contexto do diálogo para que a IA o interprete e formule uma resposta adequada."
  },
  "hi": {
    "title": "हवा पढ़ना",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Hindi. What could be the other person's intention? How should I respond?.",
    "description": "[कुछ विशिष्ट/पृष्ठभूमि] हुआ, और किसी ने मुझसे कहा: [सामग्री]। क्या मैं पूछ सकता हूँ कि दूसरा पक्ष क्या व्यक्त करना चाहता है? आप कैसे प्रतिक्रिया देंगे?",
    "remark": "कुछ समझ से बाहर होने वाले संवादों के लिए, उचित प्रतिक्रियाओं की व्याख्या करने और तैयार करने के लिए एआई को संवाद पृष्ठभूमि प्रदान करें।"
  },
  "ar": {
    "title": "قراءة الهواء",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Arabic. What could be the other person's intention? How should I respond?.",
    "description": "حدث [شيء محدد / الخلفية] ، وقال لي أحدهم: [محتوى]. هل لي أن أسأل عما قد يرغب الطرف الآخر في التعبير عنه؟ كيف ترد؟",
    "remark": "بالنسبة لبعض الحوارات غير المفهومة ، قم بتوفير خلفية الحوار للذكاء الاصطناعي لتفسير وصياغة الاستجابات المناسبة."
  },
  "bn": {
    "title": "বাতাস পড়া",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Bengali. What could be the other person's intention? How should I respond?.",
    "description": "[কিছু নির্দিষ্ট/ব্যাকগ্রাউন্ড] ঘটেছে, এবং কেউ আমাকে বলেছেন: [সামগ্রী]। আমি কি জিজ্ঞাসা করতে পারি অন্য পক্ষ কি প্রকাশ করতে চায়? আপনি কিভাবে প্রতিক্রিয়া হবে?",
    "remark": "কিছু বোধগম্য কথোপকথনের জন্য, AI-এর জন্য উপযুক্ত প্রতিক্রিয়া ব্যাখ্যা এবং প্রণয়নের জন্য সংলাপের পটভূমি প্রদান করুন।"
  },
  "website": null,
  "tags": [
    "social"
  ],
  "id": 207,
  "weight": 312
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
