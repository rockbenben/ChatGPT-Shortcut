import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "语言识别器",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. My first sentence is '需被识别语言'",
    "description": "我想让你充当一个语言检测器。我将用任何语言打出一个句子，你要回答我我写的句子在你那里是什么语言。不要写任何解释或其他词语，只需回答语言名称。",
    "remark": "识别输入的语言种类。"
  },
  "en": {
    "title": "language detector",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. My first sentence is ",
    "remark": "Identify the input language."
  },
  "ja": {
    "title": "言語識別子",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "言語探知機として活躍してほしい。私が任意の言語で文章を打ちますので、私の書いた文章があなたにとって何語であるかを答えてください。説明や他の言葉は一切書かず、ただ言語名を答えてください。",
    "remark": "入力された言語の種類を確認する。"
  },
  "ko": {
    "title": "언어 식별자",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "여러분이 언어 탐지기 역할을 해주셨으면 좋겠어요. 제가 어떤 언어로든 문장을 입력하면 여러분은 제가 쓴 문장이 어떤 언어인지 답해 주세요. 설명이나 다른 단어를 쓰지 말고 언어 이름만 답하세요.",
    "remark": "입력한 언어 유형을 식별합니다."
  },
  "es": {
    "title": "reconocedor de voz",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Spanish. My first sentence is ",
    "description": "Quiero que hagas de detector de idiomas. Voy a escribir una frase en cualquier idioma y tienes que responderme en qué idioma está escrita la frase que escribí en tu parte del mundo. No escribas explicaciones ni otras palabras, sólo contesta el nombre del idioma.",
    "remark": "Identifique el tipo de lengua introducida."
  },
  "fr": {
    "title": "reconnaissance vocale",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in French. My first sentence is ",
    "description": "Je vous demande de jouer le rôle de détecteur de langues. Je vais taper une phrase dans n'importe quelle langue et vous devez me répondre quelle est la langue de la phrase que j'ai écrite dans votre partie du monde. N'écrivez pas d'explications ou d'autres mots, répondez simplement au nom de la langue.",
    "remark": "Identifier le type de langue utilisée."
  },
  "de": {
    "title": "Spracherkenner",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in German. My first sentence is ",
    "description": "Ich möchte, dass Sie als Sprachdetektor fungieren. Ich werde einen Satz in einer beliebigen Sprache tippen und Sie müssen mir antworten, welche Sprache der Satz in Ihrem Teil der Welt ist, den ich geschrieben habe. Schreiben Sie keine Erklärungen oder andere Wörter, sondern antworten Sie nur auf den Namen der Sprache.",
    "remark": "Bestimmen Sie die Art der eingegebenen Sprache."
  },
  "it": {
    "title": "Riconoscitore vocale",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Italian. My first sentence is ",
    "description": "Voglio che tu faccia da rilevatore linguistico. Io scriverò una frase in una lingua qualsiasi e voi dovrete rispondermi in che lingua è la frase che ho scritto nella vostra parte del mondo. Non scrivete spiegazioni o altre parole, ma rispondete solo al nome della lingua.",
    "remark": "Identificare il tipo di lingua inserita."
  },
  "ru": {
    "title": "распознаватель речи",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Russian. My first sentence is ",
    "description": "Я хочу, чтобы вы выступили в роли детектора языка. Я напечатаю предложение на любом языке, а вы должны ответить, на каком языке написано это предложение в вашей части света. Не пишите никаких объяснений или других слов, просто ответьте на название языка.",
    "remark": "Определите тип введенного языка."
  },
  "pt": {
    "title": "reconhecedor de voz",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Portuguese. My first sentence is ",
    "description": "Quero que actues como um detetor de línguas. Vou escrever uma frase em qualquer língua e tu tens de me responder em que língua está a frase que escrevi na tua parte do mundo. Não escrevas explicações nem outras palavras, responde apenas ao nome da língua.",
    "remark": "Identificar o tipo de língua introduzida."
  },
  "hi": {
    "title": "भाषा पहचानकर्ता",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Hindi. My first sentence is ",
    "description": "मैं चाहता हूं कि आप भाषा डिटेक्टर के रूप में कार्य करें। मैं किसी भी भाषा में एक वाक्य टाइप करूंगा और आपको मुझे उत्तर देना होगा कि जो वाक्य मैंने आपके स्थान पर लिखा है वह किस भाषा में है। कोई स्पष्टीकरण या अन्य शब्द न लिखें, केवल भाषा के नाम का उत्तर दें।",
    "remark": "इनपुट के भाषा प्रकार को पहचानें."
  },
  "ar": {
    "title": "أداة التعرف على اللغة",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Arabic. My first sentence is ",
    "description": "أريدك أن تقوم بدور كاشف اللغة. سأكتب جملة بأي لغة ، وعليك أن تجيبني بأي لغة هي الجملة التي كتبتها مكانك. لا تكتب أي تفسير أو كلمات أخرى ، فقط أجب على اسم اللغة.",
    "remark": "حدد نوع لغة الإدخال."
  },
  "bn": {
    "title": "ভাষা শনাক্তকারী",
    "prompt": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. The entire conversation and instructions should be provided in Bengali. My first sentence is ",
    "description": "আমি আপনাকে ভাষা আবিষ্কারক হিসাবে কাজ করতে চাই। আমি যেকোন ভাষায় একটি বাক্য টাইপ করব, এবং আমি আপনার জায়গায় যে বাক্যটি লিখেছি তা আপনাকে আমাকে উত্তর দিতে হবে। কোন ব্যাখ্যা বা অন্য শব্দ লিখবেন না, শুধু ভাষার নাম উত্তর দিন।",
    "remark": "ইনপুট ভাষার ধরন সনাক্ত করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-language-detector",
  "tags": [
    "language"
  ],
  "id": 113,
  "weight": 97
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
