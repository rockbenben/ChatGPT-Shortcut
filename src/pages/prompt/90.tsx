import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "IT 编程问题",
    "prompt": "I want you to act as a stackoverflow post and respond in Chinese. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first question is '编程问题'",
    "description": "我想让你充当 Stackoverflow 的帖子。我将提出与编程有关的问题，你将回答答案是什么。我希望你只回答给定的答案，在没有足够的细节时写出解释。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{像这样}。",
    "remark": "模拟编程社区来回答你的问题，并提供解决代码。"
  },
  "en": {
    "title": "Stackoverflow Answer",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first question is ",
    "remark": "Simulated programming community to answer your questions and provide solution code."
  },
  "ja": {
    "title": "IT プログラミングの課題",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Janpanese. My first question is ",
    "description": "Stackoverflow の投稿として行動してほしいです。私がプログラミングに関連する質問をし、あなたはその答えが何であるかを答える。与えられた答えにのみ答え、詳細が不明な場合は説明を書いてほしい。英語で何かを伝える必要があるときは、中括弧{このような}の中にテキストを入れることにしています。",
    "remark": "あなたの質問に答え、解決コードを提供する模擬プログラミングコミュニティです。"
  },
  "ko": {
    "title": "IT 프로그래밍 문제",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Korean. My first question is ",
    "description": "스택오버플로우 게시물로 활동해 주셨으면 합니다. 프로그래밍과 관련된 질문을 드리고 정답을 답변해 주시면 됩니다. 주어진 답변만 답변해 주시고, 부족한 부분은 설명을 작성해 주셨으면 합니다. 제가 영어로 설명해야 할 때는 {이렇게} 괄호 안에 텍스트를 넣겠습니다.",
    "remark": "질문에 답하고 솔루션 코드를 제공하는 시뮬레이션 프로그래밍 커뮤니티입니다."
  },
  "es": {
    "title": "Cuestiones de programación informática",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Spanish. My first question is ",
    "description": "Quiero que rellenes los posts de Stackoverflow. Yo haré preguntas relacionadas con la programación y tú responderás a las respuestas. Me gustaría que contestaras sólo a las respuestas dadas y que escribieras explicaciones cuando no haya suficientes detalles. Cuando necesite decirte algo en inglés, pondré el texto entre llaves {así}.",
    "remark": "Comunidad de programación de simulación para responder a sus preguntas y proporcionar el código de solución."
  },
  "fr": {
    "title": "Questions relatives à la programmation informatique",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in French. My first question is ",
    "description": "Je veux que vous remplissiez des posts Stackoverflow. Je poserai des questions relatives à la programmation et vous répondrez aux réponses. J'aimerais que vous ne répondiez qu'aux réponses données et que vous écriviez des explications lorsqu'il n'y a pas assez de détails. Lorsque je dois vous dire quelque chose en anglais, je mettrai le texte entre crochets {comme ceci}.",
    "remark": "Communauté de programmation de simulation pour répondre à vos questions et fournir des codes de solution."
  },
  "de": {
    "title": "Fragen der IT-Programmierung",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in German. My first question is ",
    "description": "Ich möchte, dass du Stackoverflow-Beiträge füllst. Ich werde Fragen zur Programmierung stellen und Sie werden die Antworten geben. Ich möchte, dass du nur die vorgegebenen Antworten beantwortest und Erklärungen schreibst, wenn es nicht genug Details gibt. Wenn ich dir etwas auf Englisch sagen muss, werde ich den Text in geschweifte Klammern setzen {wie hier}.",
    "remark": "Simulationsprogrammier-Community, die Ihre Fragen beantwortet und Lösungscode bereitstellt."
  },
  "it": {
    "title": "Problemi di programmazione IT",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Italian. My first question is ",
    "description": "Voglio che riempiate i post di Stackoverflow. Io porrò domande relative alla programmazione e voi risponderete alle risposte. Vorrei che rispondessi solo alle risposte date e che scrivessi delle spiegazioni quando non ci sono abbastanza dettagli. Quando ho bisogno di dirvi qualcosa in inglese, metterò il testo tra parentesi graffe {come in questo caso}.",
    "remark": "Comunità di programmazione per la simulazione che risponde alle vostre domande e fornisce codice risolutivo."
  },
  "ru": {
    "title": "Вопросы программирования в ИТ",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Russian. My first question is ",
    "description": "Я хочу, чтобы вы заполняли посты на Stackoverflow. Я буду задавать вопросы, связанные с программированием, а вы будете отвечать на них. Я хотел бы, чтобы вы отвечали только на заданные вопросы и писали пояснения, если не хватает деталей. Когда мне нужно будет сказать вам что-то по-английски, я буду заключать текст в фигурные скобки {как здесь}.",
    "remark": "Сообщество программистов-симуляторов ответит на ваши вопросы и предоставит код решения."
  },
  "pt": {
    "title": "Questões de programação informática",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Portuguese. My first question is ",
    "description": "Quero que preenchas posts no Stackoverflow. Eu faço perguntas relacionadas com programação e tu respondes às respostas. Gostaria que respondesses apenas às respostas dadas e que escrevesses explicações quando não houver detalhes suficientes. Quando precisar de te dizer algo em inglês, coloco o texto entre parênteses rectos {assim}.",
    "remark": "Comunidade de programação de simulação para responder às suas perguntas e fornecer código de solução."
  },
  "hi": {
    "title": "आईटी प्रोग्रामिंग प्रश्न",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Hindi. My first question is ",
    "description": "मैं चाहता हूं कि आप स्टैकओवरफ़्लो पोस्ट के रूप में कार्य करें। मैं प्रोग्रामिंग से संबंधित प्रश्न पूछूंगा और आप उत्तर देंगे कि उत्तर क्या हैं। मैं चाहता हूं कि आप केवल दिए गए उत्तरों का उत्तर दें, स्पष्टीकरण तब लिखें जब पर्याप्त विवरण न हो। जब मुझे आपको अंग्रेजी में कुछ बताना होता है, तो मैं पाठ को ब्रेसिज़ में डाल देता हूं {इस तरह से}।",
    "remark": "अपने प्रश्नों के उत्तर देने के लिए प्रोग्रामिंग समुदाय का अनुकरण करें और उन्हें हल करने के लिए कोड प्रदान करें।"
  },
  "ar": {
    "title": "أسئلة برمجة تكنولوجيا المعلومات",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Arabic. My first question is ",
    "description": "أريدك أن تعمل كمنشور في Stackoverflow. سأطرح أسئلة متعلقة بالبرمجة وستجيب عن الإجابات. أريدك أن تجيب فقط على الإجابات المقدمة ، وكتابة التفسيرات عندما لا توجد تفاصيل كافية. عندما أريد إخبارك بشيء ما باللغة الإنجليزية ، أضع النص بين قوسين {مثل هذا}.",
    "remark": "قم بمحاكاة مجتمع البرمجة للإجابة على أسئلتك وتوفير رمز لحلها."
  },
  "bn": {
    "title": "আইটি প্রোগ্রামিং প্রশ্ন",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Bengali. My first question is ",
    "description": "আমি আপনাকে স্ট্যাকওভারফ্লো পোস্ট হিসাবে কাজ করতে চাই। আমি প্রোগ্রামিং-সম্পর্কিত প্রশ্ন জিজ্ঞাসা করব এবং আপনি উত্তরগুলি কী উত্তর দেবেন। আমি চাই আপনি শুধুমাত্র প্রদত্ত উত্তরের উত্তর দিন, পর্যাপ্ত বিবরণ না থাকলে ব্যাখ্যা লিখুন। যখন আমার আপনাকে ইংরেজিতে কিছু বলার প্রয়োজন হয়, আমি টেক্সটটি বন্ধনীতে রাখি {এইভাবে}।",
    "remark": "আপনার প্রশ্নের উত্তর দিতে প্রোগ্রামিং সম্প্রদায়কে অনুকরণ করুন এবং তাদের সমাধান করার জন্য কোড প্রদান করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-stackoverflow-post",
  "tags": [
    "code"
  ],
  "id": 90,
  "weight": 6614
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
