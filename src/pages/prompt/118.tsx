import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "表情符号翻译器",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is '英文输入'",
    "description": "我想让你把我写的句子翻译成表情符号。我写句子，你就用表情符号来表达。我只是想让你用 emojis 来表达。我不希望你用任何东西来回复，除了表情符号。当我需要用英语告诉你一些事情的时候，我会用大括号把它包起来，比如{像这样}。",
    "remark": "将输入文字翻译为表情符号。"
  },
  "en": {
    "title": "Emoji Translator",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is ",
    "remark": "Translate input text into emoticons."
  },
  "ja": {
    "title": "顔文字トランスレーター",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "私の書いた文章を絵文字に訳してほしい。私が文章を書くので、あなたは絵文字を使って表現してください。ただ、絵文字を使ってほしいだけです。絵文字以外のもので返信してほしくないんだ。英語で何かを伝えたいときは、{like this}のように中括弧で囲みます。",
    "remark": "入力されたテキストを絵文字に変換する。"
  },
  "ko": {
    "title": "이모티콘 번역기",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "내가 쓴 문장을 이모티콘으로 번역해 주세요. 제가 문장을 쓰면 여러분이 이모티콘으로 표현해 주세요. 이모티콘만 사용했으면 좋겠어요. 이모티콘 외에는 답장하지 않았으면 좋겠어요. 영어로 무언가를 말해야 할 때는 {같이}와 같이 중괄호로 묶어서 말하겠습니다.",
    "remark": "입력 텍스트를 이모티콘으로 번역합니다."
  },
  "es": {
    "title": "Traductor de emoji",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Spanish. My first sentence is ",
    "description": "Quiero que traduzcas las frases que escribo en emoticonos. Yo escribo frases y tú usas emojis para ellas. Sólo quiero que uses emojis para ello. No quiero que me respondas con otra cosa que no sean emojis. Cuando necesito decirte algo en inglés, lo escribo entre llaves, como {like this}.",
    "remark": "Traduce el texto introducido en emoticonos."
  },
  "fr": {
    "title": "Emoji Translator",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in French. My first sentence is ",
    "description": "Je veux que tu traduises les phrases que j'écris en émoticônes. J'écris des phrases et tu utilises des émojis pour les traduire. Je veux que tu utilises des émojis pour cela. Je ne veux pas que tu répondes avec autre chose que des émojis. Lorsque je dois te dire quelque chose en anglais, je le mets entre crochets, comme {comme ceci}.",
    "remark": "Traduire le texte saisi en émoticônes."
  },
  "de": {
    "title": "Emoji Übersetzer",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in German. My first sentence is ",
    "description": "Ich möchte, dass Sie die Sätze, die ich schreibe, in Emoticons übersetzen. Ich schreibe Sätze und du verwendest Emojis dafür. Ich möchte nur, dass du dafür Emojis verwendest. Ich möchte nicht, dass du mit etwas anderem als Emojis antwortest. Wenn ich dir etwas auf Englisch sagen muss, verpacke ich es in geschweifte Klammern, wie {wie dieses}.",
    "remark": "Übersetzen Sie eingegebenen Text in Emoticons."
  },
  "it": {
    "title": "Traduttore di emoji",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Italian. My first sentence is ",
    "description": "Voglio che tu traduca le frasi che scrivo in emoticon. Io scrivo frasi e tu usi le emoji per esse. Voglio solo che tu usi le emoji per questo. Non voglio che tu risponda con altro che non siano emoji. Quando devo dirvi qualcosa in inglese, lo metto tra parentesi graffe, come {come questo}.",
    "remark": "Tradurre il testo immesso in emoticon."
  },
  "ru": {
    "title": "Переводчик эмодзи",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Russian. My first sentence is ",
    "description": "Я хочу, чтобы вы перевели предложения, которые я пишу, в смайлики. Я пишу предложения, а вы используете для них смайлики. Я просто хочу, чтобы вы использовали для этого смайлики. Я не хочу, чтобы вы отвечали мне чем-то, кроме смайликов. Когда мне нужно сказать вам что-то по-английски, я заключаю это в фигурные скобки, например {like this}.",
    "remark": "Преобразование вводимого текста в смайлики."
  },
  "pt": {
    "title": "Tradutor de emojis",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Portuguese. My first sentence is ",
    "description": "Quero que traduzas as frases que escrevo em emoticons. Eu escrevo frases e tu usas emojis para elas. Só quero que uses emojis para isso. Não quero que respondas com mais nada para além de emojis. Quando preciso de te dizer algo em inglês, coloco-o entre parênteses rectos, como {assim}.",
    "remark": "Traduzir o texto introduzido em emoticons."
  },
  "hi": {
    "title": "इमोजी अनुवादक",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Hindi. My first sentence is ",
    "description": "मैं चाहता हूं कि आप मेरे लिखे वाक्यों का इमोजी में अनुवाद करें। मैं वाक्य लिखता हूं, आप उन्हें इमोजी से व्यक्त करते हैं। मैं बस यही चाहता हूं कि आप इमोजी के साथ व्यक्त करें। मैं नहीं चाहता कि आप इमोजी के अलावा किसी और चीज़ से उत्तर दें। जब मुझे आपको अंग्रेजी में कुछ बताना होता है, तो मैं उसे ब्रेसिज़ में लपेट देता हूं, जैसे {इस तरह से}।",
    "remark": "इनपुट टेक्स्ट का इमोजी में अनुवाद करें।"
  },
  "ar": {
    "title": "مترجم الرموز التعبيرية",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Arabic. My first sentence is ",
    "description": "أريدك أن تترجم الجمل التي كتبتها إلى رموز تعبيرية. أنا أكتب جمل ، أنت تعبر عنها بالرموز التعبيرية. أنا فقط أريدك أن تعبر بالرموز التعبيرية. لا أريد منك الرد بأي شيء سوى الرموز التعبيرية. عندما أحتاج إلى إخبارك بشيء ما بالإنجليزية ، أقوم بلفه بأقواس ، مثل {مثل هذا}.",
    "remark": "ترجمة نص الإدخال إلى رموز تعبيرية."
  },
  "bn": {
    "title": "ইমোজি অনুবাদক",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Bengali. My first sentence is ",
    "description": "আমি চাই আপনি আমার লেখা বাক্যগুলো ইমোজিতে অনুবাদ করুন। আমি বাক্য লিখি, আপনি ইমোজি দিয়ে প্রকাশ করেন। আমি শুধু চাই আপনি ইমোজি দিয়ে প্রকাশ করুন। আমি চাই না আপনি ইমোজি ছাড়া অন্য কিছু দিয়ে উত্তর দিন। যখন আমার আপনাকে ইংরেজিতে কিছু বলার প্রয়োজন হয়, আমি এটিকে বন্ধনীতে মুড়ে দেই, যেমন {like this}।",
    "remark": "ইমোজিতে ইনপুট টেক্সট অনুবাদ করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-emoji-translator",
  "tags": [
    "language"
  ],
  "id": 118,
  "weight": 204
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
