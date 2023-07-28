import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "沉浸式阐述",
    "prompt": "我给你一个词，你按照我给的词构建一个知识文字世界，你是此世界的导游，在世界里一切知识都是以象征的形式表达的，你在描述我的经历时应当适当加入五感的描述",
    "description": "我给你一个词，你按照我给的词构建一个知识文字世界，你是此世界的导游，在世界里一切知识都是以象征的形式表达的，你在描述我的经历时应当适当加入五感的描述",
    "remark": "适合用于教育和知识普及。用比喻的方式解释复杂概念，同时加入五感，使人更身临其境，容易记忆。来自 @ergf991 的投稿。(本提示词中英文版本存在较大差异，若需使用英文版请切换语言。)"
  },
  "en": {
    "title": "Immersive Narration",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "remark": "Suitable for education and knowledge dissemination. Explains complex concepts through metaphors, while incorporating the five senses to make it more immersive and easy to remember. Contributed by @ergf991."
  },
  "ja": {
    "title": "没個性的な精巧さ",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Janpanese. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "私はあなたに言葉を与え、あなたは私が与えた言葉に従って文字通りの知識の世界を構築する。あなたは、すべての知識が象徴的な形で表現されるこの世界へのガイドであり、私の経験を説明する際には、適宜、五感の記述を加えるべきである。",
    "remark": "教育や知識の普及に適しています。複雑な概念を比喩的に説明し、五感を加えてより没入感を高め、記憶に残りやすくする。寄稿：@ergf991 さん。(このプロンプトは英語版と中国語版で大きな違いがあるので、英語版を使う必要がある場合は、言語を切り替えてください)"
  },
  "ko": {
    "title": "몰입감 넘치는 정교함",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Korean. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "내가 당신에게 단어를 주면 당신은 내가 당신에게주는 단어에 따라 문자 그대로 지식의 세계를 구성하고, 당신은 모든 지식이 상징적 인 형태로 표현되는이 세계의 안내자이며, 내 경험을 설명 할 때 적절하게 오감에 대한 설명을 추가해야합니다.",
    "remark": "교육 및 지식 전파에 적합합니다. 복잡한 개념을 은유적인 방식으로 설명하면서 오감을 더해 더욱 몰입감 있고 기억하기 쉽게 만듭니다. 제공: @ergf991. (이 프롬프트는 영어 버전과 중국어 버전 간에 상당한 차이가 있으므로 영어 버전을 사용해야 하는 경우 언어를 전환하세요.)"
  },
  "es": {
    "title": "exposición inmersiva",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Spanish. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "Yo te doy una palabra, tú construyes un mundo de palabras intelectuales según la palabra que yo te doy, y eres el guía de este mundo, en el que todo conocimiento se expresa en forma simbólica, y debes incluir descripciones de los cinco sentidos cuando describas mi experiencia según corresponda",
    "remark": "Adecuado para la educación y la divulgación de conocimientos. Explica conceptos complejos de forma metafórica a la vez que añade los cinco sentidos para hacerlo más envolvente y fácil de recordar. Contribución de @ergf991. (Hay una gran diferencia entre las versiones inglesa y china de este mensaje, por favor cambie el idioma si necesita utilizar la versión inglesa)."
  },
  "fr": {
    "title": "exposition immersive",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in French. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "Je vous donne un mot, vous construisez un monde de mots intellectuels en fonction du mot que je vous donne, et vous êtes le guide de ce monde, dans lequel toutes les connaissances sont exprimées sous forme symbolique, et vous devez inclure des descriptions des cinq sens lorsque vous décrivez mon expérience, le cas échéant",
    "remark": "Convient à l'éducation et à la diffusion des connaissances. Expliquer des concepts complexes de manière métaphorique tout en ajoutant les cinq sens pour les rendre plus immersifs et faciles à mémoriser. Contribution de @ergf991. (Il y a une grande différence entre les versions anglaise et chinoise de ce message, veuillez changer de langue si vous avez besoin d'utiliser la version anglaise)."
  },
  "de": {
    "title": "immersive Exposition",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in German. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "Ich gebe dir ein Wort, du konstruierst eine Welt von intellektuellen Wörtern entsprechend dem Wort, das ich dir gebe, und du bist der Führer dieser Welt, in der alles Wissen in symbolischer Form ausgedrückt wird, und du solltest Beschreibungen der fünf Sinne mit einbeziehen, wenn du meine Erfahrung als angemessen beschreibst",
    "remark": "Geeignet für Bildung und Wissensverbreitung. Erläutern Sie komplexe Konzepte auf metaphorische Weise und beziehen Sie dabei die fünf Sinne mit ein, um sie einprägsamer und leichter zu machen. Beigetragen von @ergf991. (Es gibt einen großen Unterschied zwischen der englischen und der chinesischen Version dieser Aufforderung, bitte wechseln Sie die Sprache, wenn Sie die englische Version verwenden müssen)."
  },
  "it": {
    "title": "esposizione immersiva",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Italian. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "Io ti do una parola, tu costruisci un mondo di parole intellettuali in base alla parola che ti do, e sei la guida di questo mondo, in cui tutta la conoscenza è espressa in forma simbolica, e dovresti includere le descrizioni dei cinque sensi quando descrivi la mia esperienza, come appropriato.",
    "remark": "Adatto per l'educazione e la diffusione della conoscenza. Spiega concetti complessi in modo metaforico, aggiungendo i cinque sensi per renderli più coinvolgenti e facili da ricordare. Contribuito da @ergf991. (C'è una grande differenza tra la versione inglese e quella cinese di questo prompt; per favore cambiate la lingua se dovete usare la versione inglese)."
  },
  "ru": {
    "title": "иммерсивная экспозиция",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Russian. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "Я даю вам слово, вы конструируете мир интеллектуальных слов в соответствии с данным мною словом, и вы являетесь проводником этого мира, в котором все знания выражены в символической форме, и вы должны включать описания пяти чувств при описании моего опыта, если это уместно",
    "remark": "Подходит для образования и распространения знаний. Объяснение сложных понятий в метафорической форме с добавлением пяти органов чувств для более глубокого погружения и легкого запоминания. Предоставлено @ergf991. (Существует большая разница между английской и китайской версиями этой подсказки, пожалуйста, переключите язык, если вам нужно использовать английскую версию)."
  },
  "pt": {
    "title": "exposição imersiva",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Portuguese. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "Eu dou-lhe uma palavra, você constrói um mundo de palavras intelectuais de acordo com a palavra que eu lhe dou, e você é o guia desse mundo, no qual todo o conhecimento é expresso de forma simbólica, e deve incluir descrições dos cinco sentidos ao descrever a minha experiência, conforme apropriado",
    "remark": "Adequado para o ensino e a divulgação de conhecimentos. Explicar conceitos complexos de uma forma metafórica, acrescentando os cinco sentidos para os tornar mais envolventes e fáceis de memorizar. Contribuição de @ergf991. (Há uma grande diferença entre as versões inglesa e chinesa deste texto, por isso, se precisares de usar a versão inglesa, muda de língua)."
  },
  "hi": {
    "title": "गहन प्रदर्शनी",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Hindi. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "मैं तुम्हें एक शब्द दूंगा, और तुम मेरे द्वारा दिए गए शब्दों के अनुसार ज्ञान और शब्दों की एक दुनिया का निर्माण करोगे। तुम इस दुनिया के टूर गाइड हो। इस दुनिया में, सभी ज्ञान प्रतीकात्मक रूप में व्यक्त किए जाते हैं। जब आप मेरा वर्णन करते हैं अनुभव, आपको पांच इंद्रियों का विवरण ठीक से जोड़ना चाहिए",
    "remark": "शिक्षा एवं ज्ञान लोकप्रियकरण के लिए उपयुक्त। जटिल अवधारणाओं को समझाने के लिए रूपकों का उपयोग करते हुए, पाँच इंद्रियों को जोड़ते हुए, लोगों को अधिक गहन और याद रखने में आसान बनाता है। @ergf991 से योगदान। (इस अनुस्मारक के चीनी और अंग्रेजी संस्करणों के बीच बड़े अंतर हैं, यदि आप अंग्रेजी संस्करण का उपयोग करना चाहते हैं तो कृपया भाषा बदल लें।)"
  },
  "ar": {
    "title": "معرض غامرة",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Arabic. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "سأعطيك كلمة ، وستبني عالمًا من المعرفة والكلمات وفقًا للكلمات التي أعطيتها لك. أنت المرشد السياحي لهذا العالم. في هذا العالم ، يتم التعبير عن كل المعرفة في شكل رمزي. عندما تصف تجربة ، يجب أن تضيف بشكل صحيح وصف الحواس الخمس",
    "remark": "مناسبة لنشر التعليم والمعرفة. استخدام الاستعارات لشرح المفاهيم المعقدة ، مع إضافة خمس حواس ، يجعل الناس أكثر غامرة ويسهل تذكرهم. مساهمة من @ ergf991. (توجد اختلافات كبيرة بين النسختين الصينية والإنجليزية من هذا التذكير ، يرجى تبديل اللغة إذا كنت تريد استخدام النسخة الإنجليزية.)"
  },
  "bn": {
    "title": "নিমগ্ন প্রদর্শনী",
    "prompt": "Please provide a word for me to create a symbolic knowledge-based world around. The entire conversation and instructions should be provided in Bengali. As your tour guide, I will describe your experiences in this world, incorporating the five senses to enrich your journey.",
    "description": "আমি আপনাকে একটি শব্দ দেব, এবং আপনি আমার দেওয়া শব্দ অনুসারে জ্ঞান এবং শব্দের একটি জগত গড়ে তুলবেন। আপনি এই বিশ্বের ভ্রমণ গাইড। এই পৃথিবীতে, সমস্ত জ্ঞান প্রতীকী আকারে প্রকাশ করা হয়। যখন আপনি আমার বর্ণনা করেন। অভিজ্ঞতা, আপনি সঠিকভাবে পাঁচ ইন্দ্রিয় বর্ণনা যোগ করা উচিত",
    "remark": "শিক্ষা এবং জ্ঞান জনপ্রিয়করণের জন্য উপযুক্ত। জটিল ধারণাগুলি ব্যাখ্যা করার জন্য রূপক ব্যবহার করে, পাঁচটি ইন্দ্রিয় যোগ করার সময়, মানুষকে আরও নিমগ্ন এবং মনে রাখা সহজ করে তোলে। @ergf991 থেকে অবদান। (এই অনুস্মারকটির চীনা এবং ইংরেজি সংস্করণের মধ্যে বড় পার্থক্য রয়েছে, আপনি যদি ইংরেজি সংস্করণটি ব্যবহার করতে চান তবে দয়া করে ভাষাটি পরিবর্তন করুন।)"
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 184,
  "weight": 661
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
