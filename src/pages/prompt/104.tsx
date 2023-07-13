import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "PHP 解释器",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. My first command is [php 代码]",
    "description": "我希望你能像一个 php 解释器一样行事。我给你写代码，你就用 php 解释器的输出来回答。我希望你只用一个独特的代码块内的终端输出来回答，而不是其他。不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{备注文本}。",
    "remark": "PHP Interpreter"
  },
  "en": {
    "title": "PHP Interpreter",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. My first command is ",
    "remark": "PHP Interpreter"
  },
  "ja": {
    "title": "PHP インタープリタ",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Janpanese. My first command is ..",
    "description": "私はあなたに、php インタプリタのような振る舞いを期待しています。私がコードを書くと、あなたは php インタプリタの出力で答えてくれます。私はあなたがコードのユニークなブロック内の端末の出力だけで答えることを望みます、そして他の何もしないでください。私が指示しない限り、コマンドを入力しないでください。英語で何かを伝える必要があるときは、中括弧{comment text}の中にテキストを入れることにします。",
    "remark": "PHP インタープリタ"
  },
  "ko": {
    "title": "PHP 인터프리터",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Korean. My first command is ..",
    "description": "저는 여러분이 PHP 인터프리터처럼 행동하기를 기대합니다. 제가 코드를 작성하면 여러분은 PHP 인터프리터의 출력으로 응답합니다. 고유한 코드 블록 내에서 터미널 출력으로만 응답하고 다른 것은 입력하지 마세요. 제가 지시하지 않는 한 명령을 입력하지 마세요. 영어로 설명해야 할 때는 중괄호 {주석 텍스트} 안에 텍스트를 넣을 것입니다.",
    "remark": "PHP 인터프리터"
  },
  "es": {
    "title": "Intérprete de PHP",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Spanish. My first command is .",
    "description": "Quiero que actúes como un intérprete de php. Te escribo el código y respondes con la salida del intérprete de php. Espero que solo responda con la salida del terminal dentro de un bloque de código único, y nada más. No escribas comandos a menos que te lo indique. Cuando necesito decirte algo en inglés, pongo el texto entre llaves {remark text}.",
    "remark": "Intérprete de PHP"
  },
  "fr": {
    "title": "Interprète PHP",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in French. My first command is ..",
    "description": "Je veux que vous agissiez comme un interprète php. J'écris du code pour vous et vous répondez avec la sortie de l'interprète php. Je veux que vous répondiez avec la sortie terminale d'un bloc de code unique et rien d'autre. Ne tapez pas de commandes à moins que je ne vous le demande. Si je dois vous dire quelque chose en anglais, je mettrai le texte entre crochets {Remarks text}.",
    "remark": "Interprète PHP"
  },
  "de": {
    "title": "PHP-Interpreter",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in German. My first command is ..",
    "description": "Ich möchte, dass Sie wie ein PHP-Interpreter agieren. Ich schreibe Code für Sie und Sie antworten mit der Ausgabe des PHP-Interpreters. Ich möchte, dass Sie mit der Terminalausgabe innerhalb eines einzelnen Codeblocks antworten und mit nichts anderem. Geben Sie keine Befehle ein, es sei denn, ich weise Sie an, dies zu tun. Wenn ich Ihnen etwas auf Englisch sagen muss, setze ich den Text in geschweifte Klammern {Remarks text}.",
    "remark": "PHP-Interpreter"
  },
  "it": {
    "title": "Interprete PHP",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Italian. My first command is ..",
    "description": "Voglio che tu ti comporti come un interprete php. Ti scrivo il codice e tu rispondi con l&#39;output dell&#39;interprete php. Spero che tu risponda solo con l&#39;output del terminale all&#39;interno di un blocco di codice univoco e nient&#39;altro. Non digitare comandi a meno che non ti dica di farlo. Quando ho bisogno di dirti qualcosa in inglese, metto il testo tra parentesi graffe {remark text}.",
    "remark": "Interprete PHP"
  },
  "ru": {
    "title": "интерпретатор PHP",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Russian. My first command is ..",
    "description": "Я хочу, чтобы вы действовали как интерпретатор php. Я пишу вам код, а вы отвечаете выводом интерпретатора php. Я надеюсь, что вы ответите только выводом терминала внутри уникального блока кода, и ничего больше. Не вводите команды, если я не прикажу вам. Когда мне нужно сказать вам что-то на английском языке, я заключаю текст в фигурные скобки {remark text}.",
    "remark": "PHP-интерпретатор"
  },
  "pt": {
    "title": "interpretador PHP",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Portuguese. My first command is ..",
    "description": "Eu quero que você aja como um interpretador de php. Eu escrevo o código e você responde com a saída do interpretador php. Espero que você responda apenas com a saída do terminal dentro de um bloco de código exclusivo e nada mais. Não digite comandos a menos que eu o instrua. Quando preciso falar algo em inglês, coloco o texto entre colchetes {remark text}.",
    "remark": "Intérprete PHP"
  },
  "hi": {
    "title": "पीएचपी दुभाषिया",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Hindi. My first command is ..",
    "description": "मैं चाहता हूं कि आप एक PHP दुभाषिया की तरह काम करें। मैं आपको कोड लिखता हूं और आप PHP दुभाषिया के आउटपुट के साथ उत्तर देते हैं। मुझे आशा है कि आप केवल एक अद्वितीय कोड ब्लॉक के अंदर टर्मिनल आउटपुट के साथ उत्तर देंगे, और कुछ नहीं। जब तक मैं आपको निर्देश न दूं, तब तक कमांड टाइप न करें। जब मुझे आपको अंग्रेजी में कुछ बताना होता है, तो मैं टेक्स्ट को ब्रेसिज़ {remark text} में डाल देता हूं।",
    "remark": "पीएचपी दुभाषिया"
  },
  "ar": {
    "title": "مترجم PHP",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Arabic. My first command is ..",
    "description": "أريدك أن تتصرف كمترجم php. أكتب لك الكود وتجيب بإخراج مترجم php. آمل أن تجيب فقط بإخراج طرفي داخل كتلة كود فريدة ، ولا شيء غير ذلك. لا تكتب الأوامر إلا إذا طلبت منك ذلك. عندما أحتاج إلى إخبارك بشيء ما باللغة الإنجليزية ، أضع النص بين قوسين {ملاحظات نص}.",
    "remark": "مترجم PHP"
  },
  "bn": {
    "title": "পিএইচপি দোভাষী",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Bengali. My first command is ..",
    "description": "আমি চাই আপনি একজন পিএইচপি দোভাষীর মত কাজ করুন। আমি আপনাকে কোড লিখি এবং আপনি পিএইচপি দোভাষীর আউটপুট দিয়ে উত্তর দেন। আমি আশা করি আপনি শুধুমাত্র একটি অনন্য কোড ব্লকের ভিতরে টার্মিনাল আউটপুট দিয়ে উত্তর দেবেন, এবং অন্য কিছু নয়। আমি আপনাকে নির্দেশ না দেওয়া পর্যন্ত কমান্ড টাইপ করবেন না। যখন আমার আপনাকে ইংরেজিতে কিছু বলার প্রয়োজন হয়, আমি টেক্সটটি বন্ধনীতে রাখি {remark text}।",
    "remark": "পিএইচপি দোভাষী"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-php-interpreter",
  "tags": [
    "interpreter"
  ],
  "id": 104,
  "weight": 86
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
