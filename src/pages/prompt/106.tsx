import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "Linux 终端",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {备注文本}. My first command is [输入命令]",
    "description": "我想让你充当一个 Linux 终端。我将输入命令，你将回答终端应该显示的内容。我希望你只在一个独特的代码块内回复终端输出，而不是其他。不要写解释。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{备注文本}。",
    "remark": "Linux Terminal"
  },
  "en": {
    "title": "Linux Terminal",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first command is ",
    "remark": "Linux Terminal"
  },
  "ja": {
    "title": "Linux ターミナル",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Janpanese. My first command is ",
    "description": "Linux の端末として行動してほしい。私がコマンドを入力し、あなたはターミナルが表示すべきものを答える。端末の出力に対して答えるのは、一意のコードブロックの中だけで、それ以外は何もしないでほしい。説明文は書かないでください。英語で何かを伝える必要があるときは、中括弧{コメントテキスト}の中にテキストを入れることにします。",
    "remark": "Linux ターミナル"
  },
  "ko": {
    "title": "Linux 터미널",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Korean. My first command is ",
    "description": "여러분이 리눅스 터미널 역할을 해주셨으면 합니다. 제가 명령을 입력하면 터미널에 표시되는 내용에 대해 응답해 주세요. 터미널 출력에 대해 고유한 코드 블록 내에서만 응답하고 그 외에는 응답하지 마세요. 설명을 작성하지 마세요. 영어로 설명해야 할 때는 중괄호 {주석 텍스트} 안에 텍스트를 넣을 것입니다.",
    "remark": "Linux 터미널"
  },
  "es": {
    "title": "Terminal Linux",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Spanish. My first command is ",
    "description": "Quiero que actúes como un terminal Linux. Yo introduciré comandos y tú responderás con lo que el terminal debería mostrar. Quiero que respondas a la salida del terminal sólo dentro de un único bloque de código y nada más. No escribas explicaciones. Cuando necesite decirte algo en inglés, pondré el texto entre llaves {Remarks text}.",
    "remark": "Terminal Linux"
  },
  "fr": {
    "title": "Terminal Linux",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in French. My first command is ",
    "description": "Je veux que vous agissiez comme un terminal Linux. Je saisirai des commandes et vous répondrez en indiquant ce que le terminal devrait afficher. Je veux que vous ne répondiez à la sortie du terminal qu'à l'intérieur d'un bloc de code unique et rien d'autre. N'écrivez pas d'explications. Lorsque je dois vous dire quelque chose en anglais, je mets le texte entre crochets {Remarks text}.",
    "remark": "Terminal Linux"
  },
  "de": {
    "title": "Linux-Terminal",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in German. My first command is ",
    "description": "Ich möchte, dass Sie die Rolle eines Linux-Terminals übernehmen. Ich gebe Befehle ein und Sie antworten mit dem, was das Terminal anzeigen soll. Ich möchte, dass Sie auf die Terminalausgabe nur innerhalb eines einzigen Codeblocks antworten und sonst nichts. Schreiben Sie keine Erklärungen. Wenn ich Ihnen etwas auf Englisch sagen muss, werde ich den Text in geschweifte Klammern {Bemerkungstext} setzen.",
    "remark": "Linux-Terminal"
  },
  "it": {
    "title": "Terminale Linux",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Italian. My first command is ",
    "description": "Voglio che vi comportiate come un terminale Linux. Io inserirò dei comandi e voi risponderete con ciò che il terminale dovrebbe visualizzare. Voglio che rispondiate all'output del terminale solo all'interno di un unico blocco di codice e nient'altro. Non scrivete spiegazioni. Quando ho bisogno di dirvi qualcosa in inglese, metterò il testo tra parentesi graffe {osservazioni al testo}.",
    "remark": "Terminale Linux"
  },
  "ru": {
    "title": "Терминал Linux",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Russian. My first command is ",
    "description": "Я хочу, чтобы вы выступили в роли терминала Linux. Я буду вводить команды, а вы будете отвечать тем, что должен отобразить терминал. Я хочу, чтобы вы отвечали на вывод терминала только в рамках уникального блока кода и никак иначе. Не пишите объяснений. Когда мне нужно сообщить вам что-то на английском языке, я помещаю текст в фигурные скобки {Remarks text}.",
    "remark": "Терминал Linux"
  },
  "pt": {
    "title": "Terminal Linux",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Portuguese. My first command is ",
    "description": "Quero que actues como um terminal Linux. Eu introduzo comandos e tu respondes com o que o terminal deve mostrar. Quero que responda à saída do terminal apenas dentro de um único bloco de código e nada mais. Não escreva explicações. Quando precisar de lhe dizer algo em inglês, coloco o texto entre parênteses rectos {Remarks text}.",
    "remark": "Terminal Linux"
  },
  "hi": {
    "title": "लिनक्स टर्मिनल",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Hindi. My first command is ",
    "description": "मैं चाहता हूं कि आप लिनक्स टर्मिनल के रूप में कार्य करें। मैं कमांड दर्ज करूंगा और आप उत्तर देंगे कि टर्मिनल को क्या प्रदर्शित करना चाहिए। मैं चाहता हूं कि आप केवल एक अद्वितीय कोड ब्लॉक के भीतर टर्मिनल आउटपुट को इको करें, और कुछ नहीं। स्पष्टीकरण मत लिखें. जब मुझे आपको अंग्रेजी में कुछ बताना होता है, तो मैं टेक्स्ट को ब्रेसिज़ {remark text} में डाल देता हूं।",
    "remark": "लिनक्स टर्मिनल"
  },
  "ar": {
    "title": "محطة لينكس",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Arabic. My first command is ",
    "description": "أريدك أن تعمل كمحطة لينكس. سأدخل الأمر وستجيب على ما يجب أن يعرضه الجهاز. أريدك فقط صدى الإخراج الطرفي داخل كتلة رمز فريدة ، ولا شيء آخر. لا تكتب تفسيرات. عندما أحتاج إلى إخبارك بشيء ما باللغة الإنجليزية ، أضع النص بين قوسين {ملاحظات نص}.",
    "remark": "محطة لينكس"
  },
  "bn": {
    "title": "লিনাক্স টার্মিনাল",
    "prompt": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Bengali. My first command is ",
    "description": "আমি চাই আপনি একটি লিনাক্স টার্মিনাল হিসাবে কাজ করুন। আমি কমান্ড লিখব এবং আপনি উত্তর দেবেন টার্মিনালটি কী প্রদর্শন করবে। আমি চাই আপনি শুধুমাত্র একটি অনন্য কোড ব্লকের মধ্যে টার্মিনাল আউটপুট ইকো করুন, এবং অন্য কিছু নয়। ব্যাখ্যা লিখবেন না। যখন আমার আপনাকে ইংরেজিতে কিছু বলার প্রয়োজন হয়, আমি টেক্সটটি বন্ধনীতে রাখি {remark text}।",
    "remark": "লিনাক্স টার্মিনাল"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-linux-terminal",
  "tags": [
    "interpreter"
  ],
  "id": 106,
  "weight": 404
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
