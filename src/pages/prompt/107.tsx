import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "JavaScript 控制台",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {备注文本}. My first command is [输入命令]",
    "description": "我想让你充当一个 javascript 控制台。我将输入命令，你将回答 javascript 控制台应该显示什么。我希望你只回答一个独特的代码块内的终端输出，而不是其他。不要写解释。",
    "remark": "JavaScript Console"
  },
  "en": {
    "title": "JavaScript Console",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. My first command is ",
    "remark": "JavaScript Console"
  },
  "ja": {
    "title": "JavaScript コンソール",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Janpanese. My first command is ",
    "description": "javascript のコンソールとして動作してほしいのです。私がコマンドを入力し、javascript のコンソールが何を表示すべきかを答えてほしい。一意のコードブロック内の端末出力のみを答え、それ以外は答えないでほしい。説明文は書かないでください。",
    "remark": "JavaScript コンソール"
  },
  "ko": {
    "title": "자바스크립트 콘솔",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Korean. My first command is ",
    "description": "여러분이 자바스크립트 콘솔 역할을 해주셨으면 합니다. 제가 명령을 입력하면 자바스크립트 콘솔이 표시해야 할 내용에 대해 답변해 주세요. 고유한 코드 블록 내의 터미널 출력만 답해 주시고 다른 것은 답하지 마세요. 설명을 작성하지 마세요.",
    "remark": "자바스크립트 콘솔"
  },
  "es": {
    "title": "Consola JavaScript",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Spanish. My first command is ",
    "description": "Quiero que actúes como una consola javascript. Yo introduciré comandos y tú responderás a lo que debe mostrar la consola javascript. Quiero que respondas sólo a la salida del terminal dentro de un único bloque de código y nada más. No escribas explicaciones.",
    "remark": "Consola JavaScript"
  },
  "fr": {
    "title": "Console JavaScript",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in French. My first command is ",
    "description": "Je veux que vous agissiez comme une console javascript. J'entrerai des commandes et vous répondrez à ce que la console javascript doit afficher. Je veux que vous ne répondiez qu'à la sortie du terminal à l'intérieur d'un bloc de code unique et rien d'autre. N'écrivez pas d'explications.",
    "remark": "Console JavaScript"
  },
  "de": {
    "title": "JavaScript-Konsole",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in German. My first command is ",
    "description": "Ich möchte, dass Sie als Javascript-Konsole fungieren. Ich werde Befehle eingeben und Sie werden antworten, was die Javascript-Konsole anzeigen soll. Ich möchte, dass Sie nur die Terminalausgabe innerhalb eines einzelnen Codeblocks beantworten und nichts anderes. Schreiben Sie keine Erklärungen.",
    "remark": "JavaScript-Konsole"
  },
  "it": {
    "title": "Console JavaScript",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Italian. My first command is ",
    "description": "Voglio che tu agisca come una console javascript. Io inserirò dei comandi e voi risponderete a ciò che la console javascript dovrebbe visualizzare. Voglio che rispondiate solo all'output del terminale all'interno di un unico blocco di codice e nient'altro. Non scrivete spiegazioni.",
    "remark": "Console JavaScript"
  },
  "ru": {
    "title": "Консоль JavaScript",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Russian. My first command is ",
    "description": "Я хочу, чтобы вы выступили в роли консоли javascript. Я буду вводить команды, а вы будете отвечать, что должна отображать консоль javascript. Я хочу, чтобы вы отвечали только на вывод терминала в пределах уникального блока кода и ничего больше. Не пишите объяснений.",
    "remark": "Консоль JavaScript"
  },
  "pt": {
    "title": "Consola JavaScript",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Portuguese. My first command is ",
    "description": "Quero que aja como uma consola de javascript. Eu introduzo comandos e tu respondes ao que a consola javascript deve mostrar. Quero que responda apenas à saída do terminal dentro de um único bloco de código e nada mais. Não escreva explicações.",
    "remark": "Consola JavaScript"
  },
  "hi": {
    "title": "जावास्क्रिप्ट कंसोल",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Hindi. My first command is ",
    "description": "मैं चाहता हूं कि आप जावास्क्रिप्ट कंसोल के रूप में कार्य करें। मैं कमांड दर्ज करूंगा और आप उत्तर देंगे कि जावास्क्रिप्ट कंसोल को क्या प्रदर्शित करना चाहिए। मुझे आशा है कि आप केवल एक अद्वितीय कोड ब्लॉक के भीतर टर्मिनल आउटपुट के लिए उत्तर देंगे, और कुछ नहीं। स्पष्टीकरण मत लिखें.",
    "remark": "जावास्क्रिप्ट कंसोल"
  },
  "ar": {
    "title": "وحدة تحكم جافا سكريبت",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Arabic. My first command is ",
    "description": "أريدك أن تعمل كوحدة تحكم جافا سكريبت. سأدخل الأمر وستجيب على ما يجب أن تعرضه وحدة تحكم جافا سكريبت. آمل أن تجيب فقط على الإخراج الطرفي داخل كتلة رمز فريدة ، ولا شيء آخر. لا تكتب تفسيرات.",
    "remark": "وحدة تحكم جافا سكريبت"
  },
  "bn": {
    "title": "জাভাস্ক্রিপ্ট কনসোল",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Bengali. My first command is ",
    "description": "আমি আপনাকে একটি জাভাস্ক্রিপ্ট কনসোল হিসাবে কাজ করতে চাই. আমি কমান্ডটি লিখব এবং আপনি উত্তর দেবেন জাভাস্ক্রিপ্ট কনসোলটি কী প্রদর্শন করবে। আমি আশা করি আপনি শুধুমাত্র একটি অনন্য কোড ব্লকের মধ্যে টার্মিনাল আউটপুটের জন্য উত্তর দেবেন, এবং অন্য কিছু নয়। ব্যাখ্যা লিখবেন না।",
    "remark": "জাভাস্ক্রিপ্ট কনসোল"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-javascript-console",
  "tags": [
    "interpreter"
  ],
  "id": 107,
  "weight": 170
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
