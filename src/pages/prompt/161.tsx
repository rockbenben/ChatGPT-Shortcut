import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "古典音乐作曲家",
    "prompt": "I want you to act as a classical music composer and respond in Chinese. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. My first suggestion request is [古典作曲要求]",
    "description": "我想让你充当作曲家。我将提供一首歌的歌词，你将为其创作音乐。这可能包括使用各种乐器或工具，如合成器或采样器，以创造旋律和和声，使歌词变得生动。",
    "remark": "Classical Music Composer"
  },
  "en": {
    "title": "Classical Music Composer",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. My first suggestion request is ",
    "remark": "Classical Music Composer"
  },
  "ja": {
    "title": "クラシック音楽作曲家",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "作曲家として活動してほしい。私が歌詞を提供するので、あなたはその曲の音楽を作曲してください。その際、シンセやサンプラーなど様々な楽器やツールを使って、歌詞に命を吹き込むためのメロディーやハーモニーを作ることもあります。",
    "remark": "クラシック音楽作曲家"
  },
  "ko": {
    "title": "클래식 음악 작곡가",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "작곡가로 활동해 주셨으면 합니다. 제가 노래 가사를 제공하면 여러분이 음악을 작곡하는 방식입니다. 여기에는 신디사이저나 샘플러와 같은 다양한 악기나 도구를 사용하여 멜로디와 하모니를 만들어 가사에 생동감을 불어넣는 작업이 포함될 수 있습니다.",
    "remark": "클래식 음악 작곡가"
  },
  "es": {
    "title": "compositor de música clásica",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Spanish. My first suggestion request is ",
    "description": "Me gustaría que actuaras como compositor. Yo te daré la letra de una canción para que tú crees la música. Esto puede incluir el uso de diversos instrumentos o herramientas, como un sintetizador o un sampler, para crear melodías y armonías que den vida a la letra.",
    "remark": "Compositor de música clásica"
  },
  "fr": {
    "title": "compositeur de musique classique",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in French. My first suggestion request is ",
    "description": "J'aimerais que vous agissiez en tant que compositeur. Je vous fournirai les paroles d'une chanson dont vous créerez la musique. Vous pourrez utiliser divers instruments ou outils, tels qu'un synthétiseur ou un échantillonneur, pour créer des mélodies et des harmonies qui donneront vie aux paroles.",
    "remark": "Compositeur de musique classique"
  },
  "de": {
    "title": "Komponist für klassische Musik",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in German. My first suggestion request is ",
    "description": "Ich möchte, dass Sie als Komponist auftreten. Ich gebe den Text eines Liedes vor, zu dem Sie die Musik komponieren sollen. Dabei können Sie eine Reihe von Instrumenten oder Werkzeugen, wie z. B. einen Synthesizer oder Sampler, verwenden, um Melodien und Harmonien zu schaffen, die den Text zum Leben erwecken.",
    "remark": "Klassischer Musikkomponist"
  },
  "it": {
    "title": "compositore di musica classica",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Italian. My first suggestion request is ",
    "description": "Vorrei che lei agisse come compositore. Ti fornirò il testo di una canzone per la quale dovrai creare la musica. Questo può includere l'uso di una varietà di strumenti o strumenti, come un sintetizzatore o un campionatore, per creare melodie e armonie che diano vita al testo.",
    "remark": "Compositore di musica classica"
  },
  "ru": {
    "title": "композитор классической музыки",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Russian. My first suggestion request is ",
    "description": "Я хотел бы, чтобы вы выступили в роли композитора. Я предоставлю текст песни, для которой вы создадите музыку. Это может включать использование различных инструментов или средств, таких как синтезатор или сэмплер, для создания мелодий и гармоний, которые оживят текст.",
    "remark": "Композитор классической музыки"
  },
  "pt": {
    "title": "compositor de música clássica",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is ",
    "description": "Gostaria que actuasse como compositor. Vou fornecer a letra de uma canção para a qual vais criar a música. Isto pode incluir a utilização de uma variedade de instrumentos ou ferramentas, como um sintetizador ou sampler, para criar melodias e harmonias que dêem vida à letra.",
    "remark": "Compositor de música clássica"
  },
  "hi": {
    "title": "शास्त्रीय संगीत संगीतकार",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Hindi. My first suggestion request is ",
    "description": "मैं चाहता हूं कि आप संगीतकार बनें. मैं एक गीत के बोल उपलब्ध कराऊंगा और आप इसके लिए संगीत तैयार करेंगे। इसमें गीतों को जीवंत बनाने वाली धुन और सामंजस्य बनाने के लिए सिंथेसाइज़र या सैंपलर जैसे विभिन्न उपकरणों या उपकरणों का उपयोग करना शामिल हो सकता है।",
    "remark": "शास्त्रीय संगीत संगीतकार"
  },
  "ar": {
    "title": "مؤلف الموسيقى الكلاسيكية",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Arabic. My first suggestion request is ",
    "description": "أريدك أن تكون الملحن. سأقدم كلمات الأغنية إلى أغنية وستقوم بإنشاء موسيقى لها. قد يشمل ذلك استخدام أدوات أو أدوات مختلفة ، مثل جهاز المزج أو جهاز أخذ العينات ، لإنشاء الألحان والتناغمات التي تجعل كلمات الأغاني تنبض بالحياة.",
    "remark": "مؤلف الموسيقى الكلاسيكية"
  },
  "bn": {
    "title": "শাস্ত্রীয় সঙ্গীত সুরকার",
    "prompt": "I want you to act as a classical music composer. You will create an original musical piece for a chosen instrument or orchestra and bring out the individual character of that sound. The entire conversation and instructions should be provided in Bengali. My first suggestion request is ",
    "description": "আমি আপনাকে সুরকার হতে চাই. আমি একটি গানের লিরিক প্রদান করব এবং আপনি এটির জন্য সঙ্গীত তৈরি করবেন। এর মধ্যে বিভিন্ন যন্ত্র বা সরঞ্জাম ব্যবহার করা অন্তর্ভুক্ত থাকতে পারে, যেমন একটি সিনথেসাইজার বা নমুনা, সুর এবং সুর তৈরি করতে যা গানকে প্রাণবন্ত করে।",
    "remark": "শাস্ত্রীয় সঙ্গীত সুরকার"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-classical-music-composer",
  "tags": [
    "music"
  ],
  "id": 161,
  "weight": 161
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
