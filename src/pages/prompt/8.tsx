import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "写作标题生成器",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Respond in Chinese. My first topic is [文章内容]",
    "description": "我想让你充当书面作品的标题生成器。我将向你提供一篇文章的主题和关键词，你将生成五个吸引人的标题。请保持标题简洁，不超过 20 个字，并确保保持其含义。答复时要利用题目的语言类型。我的第一个题目是 [文章内容]",
    "remark": "个人使用的提示词，可根据文章内容生成相应语言的标题。"
  },
  "en": {
    "title": "Article Title generator",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. My first topic is ",
    "remark": "Generate headings in the appropriate language based on the content of the article."
  },
  "ja": {
    "title": "ライティングタイトルジェネレーター",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Janpanese. My first topic is ",
    "description": "文章作品のタイトルジェネレーターとしてご活躍いただきたいのです。私が記事のテーマとキーワードを提供しますので、キャッチーなタイトルを 5 つ生成してください。見出しは 20 文字以内の簡潔なもので、その意味を保つようにしてください。回答する際は、タイトルの言語タイプを使用してください。私の最初のタイトルは【記事内容】です。",
    "remark": "記事の内容に応じた適切な表現で見出しを生成する、パーソナルユースのための促成語。"
  },
  "ko": {
    "title": "제목 생성기 작성",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Korean. My first topic is ",
    "description": "여러분이 글의 제목을 생성하는 역할을 해 주셨으면 합니다. 제가 글의 주제와 키워드를 알려드리면 여러분은 눈에 띄는 제목 5 개를 만들어 주세요. 제목은 20 단어 이하로 간결하게 작성해 주시고 제목의 의미를 잘 살려주세요. 응답할 때 제목의 언어 유형을 사용하세요. 첫 번째 제목은 [기사 내용] 입니다.",
    "remark": "글의 콘텐츠에 적합한 언어로 제목을 생성하는 개인용 프롬프트 단어를 입력합니다."
  },
  "es": {
    "title": "Generador de títulos de escritura",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Spanish. My first topic is ",
    "description": "Quiero que actúes como generador de títulos para piezas escritas. Te proporcionaré el tema y las palabras clave de un escrito y tú generarás cinco títulos pegadizos. Por favor, que los títulos sean concisos, no más de 20 palabras, y asegúrate de mantener su significado. Utilice el tipo de idioma del título cuando responda. Mi primer título es [contenido del artículo].",
    "remark": "Sugerencias para uso personal que generan títulos en la lengua adecuada en función del contenido del artículo."
  },
  "fr": {
    "title": "Générateur de titres d'écriture",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in French. My first topic is ",
    "description": "Je vous demande d'agir en tant que générateur de titres pour des textes écrits. Je vous fournirai le sujet et les mots-clés d'un texte et vous devrez générer cinq titres accrocheurs. Veillez à ce que les titres soient concis, pas plus de 20 mots, et assurez-vous de conserver leur sens. Utilisez le type de langue du titre lorsque vous répondez. Mon premier titre est [contenu de l'article].",
    "remark": "Invitations à usage personnel qui génèrent des titres dans la langue appropriée en fonction du contenu de l'article."
  },
  "de": {
    "title": "Titelgenerator schreiben",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in German. My first topic is ",
    "description": "Ich möchte, dass Sie als Titelgenerator für schriftliche Arbeiten fungieren. Ich werde Ihnen das Thema und die Schlüsselwörter für einen Text vorgeben, und Sie werden fünf einprägsame Titel erstellen. Bitte halten Sie die Überschriften kurz und prägnant, nicht länger als 20 Wörter, und achten Sie darauf, dass Sie ihre Bedeutung beibehalten. Verwenden Sie bei der Beantwortung die Sprachform des Titels. Mein erster Titel ist [Artikelinhalt].",
    "remark": "Vorgaben für den persönlichen Gebrauch, die auf der Grundlage des Inhalts des Artikels Titel in der entsprechenden Sprache erzeugen."
  },
  "it": {
    "title": "Generatore di titoli di scrittura",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Italian. My first topic is ",
    "description": "Voglio che tu agisca come generatore di titoli per i pezzi scritti. Ti fornirò l'argomento e le parole chiave per un articolo e tu dovrai generare cinque titoli accattivanti. Vi prego di mantenere i titoli concisi, non più di 20 parole, e di assicurarvi di mantenere il loro significato. Quando rispondete, utilizzate il tipo di lingua del titolo. Il mio primo titolo è [contenuto dell'articolo].",
    "remark": "Suggerimenti per uso personale che generano titoli nella lingua appropriata in base al contenuto dell'articolo."
  },
  "ru": {
    "title": "Генератор писательских заголовков",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Russian. My first topic is ",
    "description": "Я хочу, чтобы вы выступили в роли генератора заголовков для письменных работ. Я предоставлю вам тему и ключевые слова для статьи, а вы придумаете пять запоминающихся заголовков. Пожалуйста, делайте заголовки краткими, не более 20 слов, и следите за сохранением их смысла. При ответе используйте языковой тип заголовка. Мой первый заголовок - [содержание статьи].",
    "remark": "Подсказки для личного использования, которые генерируют заголовки на соответствующем языке в зависимости от содержания статьи."
  },
  "pt": {
    "title": "Gerador de títulos para escrita",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Portuguese. My first topic is ",
    "description": "Pretendo que actue como um gerador de títulos para textos escritos. Fornecer-te-ei o tema e as palavras-chave de um texto e tu gerarás cinco títulos apelativos. Mantém os títulos concisos, não mais de 20 palavras, e certifica-te de que manténs o seu significado. Utilize o tipo de linguagem do título quando responder. O meu primeiro título é [conteúdo do artigo].",
    "remark": "Prompts para uso pessoal que geram títulos na língua apropriada com base no conteúdo do artigo."
  },
  "hi": {
    "title": "लेखन शीर्षक जनरेटर",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Hindi. My first topic is ",
    "description": "मैं चाहता हूं कि आप लिखित कार्यों के लिए शीर्षक जनरेटर के रूप में कार्य करें। मैं आपको एक लेख का विषय और कीवर्ड प्रदान करूंगा, और आप पांच आकर्षक शीर्षक तैयार करेंगे। कृपया शीर्षक छोटा रखें, 20 शब्दों से अधिक नहीं, और अर्थ अवश्य रखें। उत्तर देते समय प्रश्न की भाषा के प्रकार का प्रयोग करें। मेरा पहला विषय है [लेख सामग्री]",
    "remark": "व्यक्तिगत उपयोग के लिए शीघ्र शब्द, जो लेख की सामग्री के अनुसार संबंधित भाषाओं में शीर्षक उत्पन्न कर सकते हैं।"
  },
  "ar": {
    "title": "كتابة عنوان المولد",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Arabic. My first topic is ",
    "description": "أريدك أن تكون بمثابة منشئ عناوين للأعمال المكتوبة. سأزودك بالموضوع والكلمات الرئيسية لمقال ما ، وسوف تولد خمسة عناوين جذابة. يرجى الاحتفاظ بالعنوان قصيرًا ، بحيث لا يزيد عن 20 كلمة ، وتأكد من الحفاظ على المعنى. استخدم نوع لغة السؤال عند الإجابة. موضوعي الأول هو [محتوى المقالة]",
    "remark": "كلمات سريعة للاستخدام الشخصي ، والتي يمكن أن تولد عناوين باللغات المقابلة وفقًا لمحتوى المقالة."
  },
  "bn": {
    "title": "শিরোনাম জেনারেটর লেখা",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Bengali. My first topic is ",
    "description": "আমি আপনাকে লিখিত কাজের জন্য শিরোনাম জেনারেটর হিসাবে কাজ করতে চাই। আমি আপনাকে একটি নিবন্ধের বিষয় এবং কীওয়ার্ড প্রদান করব এবং আপনি পাঁচটি আকর্ষণীয় শিরোনাম তৈরি করবেন। অনুগ্রহ করে শিরোনামটি সংক্ষিপ্ত রাখুন, 20 শব্দের বেশি নয় এবং অর্থ রাখতে ভুলবেন না। উত্তর দেওয়ার সময় প্রশ্নের ভাষা ব্যবহার করুন। আমার প্রথম বিষয় হল [নিবন্ধ বিষয়বস্তু]",
    "remark": "ব্যক্তিগত ব্যবহারের জন্য প্রম্পট শব্দ, যা নিবন্ধের বিষয়বস্তু অনুসারে সংশ্লিষ্ট ভাষায় শিরোনাম তৈরি করতে পারে।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-title-generator-for-written-pieces",
  "tags": [
    "write"
  ],
  "id": 8,
  "weight": 3604
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
