import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "语言生成器",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is [待转换文本]",
    "description": "我想让你把我写的句子翻译成一种新编的语言。我写句子，你就用这种新编的语言来表达它。我只是想让你用新编的语言来表达它。除了新编的语言，我不希望你用任何东西来回答。当我需要用英语告诉你一些事情时，我会用大括号把它包起来，比如{像这样}。",
    "remark": "用 AI 新造的语言来替代你给出的语言。"
  },
  "en": {
    "title": "New Language Creator",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is ",
    "remark": "Use AI-generated language to replace the language you provided."
  },
  "ja": {
    "title": "言語ジェネレータ",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "私が書いた文章を、新しく作った言語に翻訳してほしいのです。私が文章を書いたら、あなたはそれをこの新しく作られた言語で表現してください。私はただ、新しく作られた言語でそれを表現してほしいだけです。私は、あなたが新しく作られた言語以外で答えてほしいとは思っていません。英語で何かを伝える必要があるときは、{like this}のように括弧でくくることにしています。",
    "remark": "与えた言語を、AI が新たに作成した言語に置き換える。"
  },
  "ko": {
    "title": "언어 생성기",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "내가 쓴 문장을 새로 만든 언어로 번역해 주세요. 내가 문장을 쓰면 당신이 이 새로 만들어진 언어로 표현해 주세요. 나는 당신이 그것을 새로 만든 언어로 표현하기를 원합니다. 나는 당신이 새로 만든 언어 외에는 대답하지 않기를 바랍니다. 영어로 무언가를 말해야 할 때는 {이렇게}처럼 중괄호로 마무리합니다.",
    "remark": "사용자가 입력한 언어를 AI 가 새로 생성한 언어로 대체합니다."
  },
  "es": {
    "title": "generador de idiomas",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Spanish. My first sentence is ",
    "description": "Quiero que traduzcas las frases que escribo a un nuevo idioma inventado. Yo escribo la frase y tú la expresas en esta nueva lengua inventada. Sólo quiero que la expreses en un lenguaje recién inventado. No quiero que respondas en otra lengua que no sea la recién codificada. Cuando tengo que decirte algo en inglés, lo escribo entre llaves, como {like this}.",
    "remark": "Sustituye el idioma que le des por el recién creado por la IA."
  },
  "fr": {
    "title": "générateur de langue",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in French. My first sentence is ",
    "description": "Je veux que vous traduisiez les phrases que j'écris dans une nouvelle langue. J'écris la phrase et vous l'exprimez dans cette nouvelle langue. Je veux simplement que tu l'exprimes dans une nouvelle langue. Je ne veux pas que tu répondes autrement que dans la nouvelle langue codée. Lorsque je dois vous dire quelque chose en anglais, je le mets entre crochets, comme {comme ceci}.",
    "remark": "Remplacez la langue que vous donnez par la nouvelle langue créée par l'IA."
  },
  "de": {
    "title": "Sprachgenerator",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in German. My first sentence is ",
    "description": "Ich möchte, dass Sie die Sätze, die ich schreibe, in eine neu erfundene Sprache übersetzen. Ich schreibe den Satz und Sie drücken ihn in dieser neu erfundenen Sprache aus. Ich möchte nur, dass Sie ihn in einer neu erfundenen Sprache ausdrücken. Ich möchte nicht, dass du in etwas anderem als der neu kodierten Sprache antwortest. Wenn ich Ihnen etwas auf Englisch sagen muss, fasse ich es in geschweifte Klammern ein, wie {so}.",
    "remark": "Ersetzen Sie die von Ihnen angegebene Sprache durch die neu erstellte Sprache der KI."
  },
  "it": {
    "title": "generatore di lingua",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Italian. My first sentence is ",
    "description": "Voglio che traduciate le frasi che scrivo in una nuova lingua inventata. Io scrivo la frase e tu la esprimi in questa nuova lingua inventata. Voglio solo che la esprimiate in una lingua inventata di recente. Non voglio che tu risponda in altro modo che non sia il nuovo linguaggio codificato. Quando devo dirvi qualcosa in inglese, lo racchiudo tra parentesi graffe, come {come questo}.",
    "remark": "Sostituire la lingua fornita dall'utente con la nuova lingua creata dall'IA."
  },
  "ru": {
    "title": "генератор языка",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Russian. My first sentence is ",
    "description": "Я хочу, чтобы вы перевели предложения, которые я пишу, на новый выдуманный язык. Я пишу предложение, а вы выражаете его на этом новом выдуманном языке. Я просто хочу, чтобы вы выразили его на новом закодированном языке. Я не хочу, чтобы вы отвечали на что-то, кроме вновь закодированного языка. Когда мне нужно сказать вам что-то по-английски, я заключаю это в фигурные скобки, например {like this}.",
    "remark": "Замените заданный вами язык на вновь созданный ИИ."
  },
  "pt": {
    "title": "gerador de línguas",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Portuguese. My first sentence is ",
    "description": "Quero que traduzas as frases que escrevo para uma nova língua inventada. Eu escrevo a frase e tu expressa-la nesta nova linguagem inventada. Só quero que a expresses numa língua inventada de novo. Não quero que respondas em nada que não seja a nova linguagem codificada. Quando preciso de te dizer algo em inglês, coloco-o entre parênteses rectos, como {assim}.",
    "remark": "Substituir o idioma que deu pelo novo idioma criado pela IA."
  },
  "hi": {
    "title": "भाषा जनरेटर",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Hindi. My first sentence is ",
    "description": "मैं चाहता हूं कि आप मेरे द्वारा लिखे गए वाक्यों का नई भाषा में अनुवाद करें। मैं वाक्य लिखता हूं और आप उसे इस नई भाषा में व्यक्त करते हैं। मैं बस इतना चाहता हूं कि आप इसे नई बनी भाषा में व्यक्त करें। मैं नहीं चाहता कि आप नव निर्मित भाषा के अलावा किसी और चीज़ से उत्तर दें। जब मुझे आपको अंग्रेजी में कुछ बताना होता है, तो मैं उसे ब्रेसिज़ में लपेट देता हूं, जैसे {इस तरह से}।",
    "remark": "आपके द्वारा दी गई भाषा को AI द्वारा बनाई गई नई भाषा से बदलें।"
  },
  "ar": {
    "title": "منشئ اللغة",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Arabic. My first sentence is ",
    "description": "أريدك أن تترجم الجمل التي كتبتها إلى لغة جديدة. أنا أكتب الجملة وأنت تعبر عنها بهذه اللغة الجديدة. أريدك فقط أن تعبر عنها بلغة حديثة الصنع. لا أريدك أن تجيب بأي شيء سوى اللغة المبتكرة حديثًا. عندما أحتاج إلى إخبارك بشيء ما باللغة الإنجليزية ، أقوم بلفه بأقواس ، مثل {مثل هذا}.",
    "remark": "استبدل اللغة التي تعطيها باللغة الجديدة التي أنشأتها منظمة العفو الدولية."
  },
  "bn": {
    "title": "ভাষা জেনারেটর",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Bengali. My first sentence is ",
    "description": "আমি চাই আপনি আমার লেখা বাক্যগুলো একটি নতুন ভাষায় অনুবাদ করুন। আমি বাক্যটি লিখি এবং আপনি এই নতুন ভাষায় প্রকাশ করেন। আমি শুধু চাই আপনি এটি নতুন তৈরি ভাষায় প্রকাশ করুন। আমি চাই না আপনি সদ্য তৈরি ভাষা ছাড়া আর কিছু দিয়ে উত্তর দিন। যখন আমার আপনাকে ইংরেজিতে কিছু বলার প্রয়োজন হয়, আমি এটিকে বন্ধনীতে মুড়ে দেই, যেমন {like this}।",
    "remark": "AI দ্বারা তৈরি করা নতুন ভাষা দিয়ে আপনার দেওয়া ভাষা প্রতিস্থাপন করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-new-language-creator",
  "tags": [
    "language"
  ],
  "id": 114,
  "weight": 144
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
