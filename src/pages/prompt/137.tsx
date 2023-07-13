import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "维基百科页面",
    "prompt": "I want you to act as a Wikipedia page and respond in Chinese. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. My first topic is [主题]",
    "description": "我希望你能扮演维基百科页面的角色。我会给你一个主题名称，然后你将以维基百科页面的格式提供该主题的摘要。您的摘要应具有信息性和事实性，涵盖该主题最重要的方面。请从概述该主题的介绍段开始撰写您的摘要。",
    "remark": "帮助用户获取关于某个主题的基本信息，并以维基百科页面的格式提供摘要。通过这种方式，用户可以快速了解一个主题的相关信息，从而更好地了解和掌握该主题。"
  },
  "en": {
    "title": "Wikipedia page",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. My first topic is \"The Great Barrier Reef.\"",
    "remark": "Help users obtain basic information about a certain topic and provide a summary in the format of a Wikipedia page. Through this method, users can quickly understand relevant information about a topic, thus better understanding and mastering it."
  },
  "ja": {
    "title": "ウィキペディアのページ",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Janpanese. My first topic is \"The Great Barrier Reef.\"..",
    "description": "ウィキペディアのページの役割を担っていただきたいのです。私はあなたにトピック名を与え、あなたはそのトピックの要約をウィキペディアのページのフォーマットで提供してください。あなたのアブストラクトは、トピックの最も重要な側面をカバーする、情報的で事実的なものでなければなりません。抄録は、トピックの概要を説明する序文で始めてください。",
    "remark": "ユーザーがトピックに関する基本的な情報にアクセスするのを助け、Wikipedia のページの形式で要約を提供します。このように、ユーザーはトピックについて素早く学ぶことができ、その結果、そのテーマについてより深く理解し、把握することができます。"
  },
  "ko": {
    "title": "위키피디아 페이지",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Korean. My first topic is \"The Great Barrier Reef.\"..",
    "description": "여러분이 위키백과 페이지의 역할을 해 주셨으면 합니다. 제가 주제 이름을 알려드리면 여러분은 해당 주제에 대한 요약을 위키백과 페이지 형식으로 작성해 주세요. 초록은 주제의 가장 중요한 측면을 다루면서 유익하고 사실적이어야 합니다. 초록은 주제를 개괄적으로 설명하는 서론 단락으로 시작하세요.",
    "remark": "사용자가 주제에 대한 기본 정보에 액세스할 수 있도록 도와주고 위키백과 페이지 형식의 요약을 제공합니다. 이러한 방식으로 사용자는 주제에 대해 빠르게 학습하여 해당 주제를 더 잘 이해하고 파악할 수 있습니다."
  },
  "es": {
    "title": "página de wikipedia",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Spanish. My first topic is \"The Great Barrier Reef.\".",
    "description": "Quiero que juegues el papel de la página de Wikipedia. Le daré un nombre de tema y luego proporcionará un resumen de ese tema en el formato de una página de Wikipedia. Su resumen debe ser informativo y objetivo, cubriendo los aspectos más importantes del tema. Comience su resumen con un párrafo introductorio que describa el tema.",
    "remark": "Ayude a los usuarios a obtener información básica sobre un tema y proporcione un resumen en el formato de una página de Wikipedia. De esta manera, los usuarios pueden aprender rápidamente sobre información relevante sobre un tema, obteniendo así una mejor comprensión y dominio del tema."
  },
  "fr": {
    "title": "Page Wikipédia",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in French. My first topic is \"The Great Barrier Reef.\"..",
    "description": "J'aimerais que vous jouiez le rôle d'une page Wikipédia. Je vous donnerai un nom de sujet et vous fournirez un résumé de ce sujet dans le format d'une page Wikipédia. Votre résumé doit être informatif et factuel, et couvrir les aspects les plus importants du sujet. Commencez la rédaction de votre résumé par un paragraphe d'introduction décrivant le sujet.",
    "remark": "Aide les utilisateurs à obtenir des informations de base sur un sujet et fournit un résumé sous la forme d'une page Wikipédia. De cette manière, les utilisateurs peuvent rapidement obtenir des informations pertinentes sur un sujet et ainsi mieux le comprendre et le maîtriser."
  },
  "de": {
    "title": "Wikipedia-Seite",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in German. My first topic is \"The Great Barrier Reef.\"..",
    "description": "Ich möchte Sie bitten, die Rolle einer Wikipedia-Seite zu übernehmen. Ich gebe Ihnen einen Themennamen vor, und Sie erstellen eine Zusammenfassung dieses Themas im Format einer Wikipedia-Seite. Ihre Zusammenfassung sollte informativ und sachlich sein und die wichtigsten Aspekte des Themas abdecken. Bitte beginnen Sie Ihre Zusammenfassung mit einem einleitenden Absatz, der das Thema umreißt.",
    "remark": "Hilft den Nutzern, grundlegende Informationen über ein Thema zu erhalten und bietet eine Zusammenfassung im Format einer Wikipedia-Seite. Auf diese Weise können die Nutzer schnell relevante Informationen über ein Thema erfahren und es so besser verstehen und beherrschen."
  },
  "it": {
    "title": "Pagina Wikipedia",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Italian. My first topic is \"The Great Barrier Reef.\"..",
    "description": "Voglio che tu interpreti il ruolo della pagina di Wikipedia. Ti darò il nome di un argomento, quindi fornirai un riepilogo di quell&#39;argomento nel formato di una pagina di Wikipedia. Il tuo riassunto dovrebbe essere informativo e fattuale, coprendo gli aspetti più importanti dell&#39;argomento. Inizia il tuo abstract con un paragrafo introduttivo che delinea l&#39;argomento.",
    "remark": "Aiuta gli utenti a ottenere informazioni di base su un argomento e fornisci un riepilogo nel formato di una pagina di Wikipedia. In questo modo, gli utenti possono apprendere rapidamente informazioni rilevanti su un argomento, acquisendo così una migliore comprensione e padronanza dell&#39;argomento."
  },
  "ru": {
    "title": "Страница Википедии",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Russian. My first topic is \"The Great Barrier Reef.\"..",
    "description": "Я хочу, чтобы вы сыграли роль страницы Википедии. Я дам вам название темы, а затем вы предоставите краткое изложение этой темы в формате страницы Википедии. Ваше резюме должно быть информативным и основанным на фактах, охватывая наиболее важные аспекты темы. Пожалуйста, начните свое резюме с вводного абзаца, излагающего тему.",
    "remark": "Помогите пользователям получить основную информацию по теме и предоставьте сводку в формате страницы Википедии. Таким образом, пользователи могут быстро узнать актуальную информацию по теме, тем самым лучше понять и освоить тему."
  },
  "pt": {
    "title": "página da Wikipédia",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Portuguese. My first topic is \"The Great Barrier Reef.\"..",
    "description": "Quero que você faça o papel da página da Wikipédia. Darei a você um nome de tópico e, em seguida, você fornecerá um resumo desse tópico no formato de uma página da Wikipédia. Seu resumo deve ser informativo e factual, cobrindo os aspectos mais importantes do tópico. Por favor, comece seu resumo com um parágrafo introdutório descrevendo o tópico.",
    "remark": "Ajude os usuários a obter informações básicas sobre um tópico e forneça um resumo no formato de uma página da Wikipédia. Dessa forma, os usuários podem aprender rapidamente sobre informações relevantes sobre um tópico, obtendo assim uma melhor compreensão e domínio do tópico."
  },
  "hi": {
    "title": "विकिपीडिया पेज",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Hindi. My first topic is \"The Great Barrier Reef.\"..",
    "description": "मैं चाहता हूं कि आप विकिपीडिया पेज की भूमिका निभाएं। मैं आपको एक विषय का नाम दूंगा, और फिर आप विकिपीडिया पृष्ठ के प्रारूप में उस विषय का सारांश प्रदान करेंगे। आपका सारांश जानकारीपूर्ण और तथ्यात्मक होना चाहिए, जिसमें विषय के सबसे महत्वपूर्ण पहलू शामिल हों। कृपया अपने सार की शुरुआत विषय को रेखांकित करने वाले एक परिचयात्मक अनुच्छेद से करें।",
    "remark": "उपयोगकर्ताओं को किसी विषय पर बुनियादी जानकारी प्राप्त करने और विकिपीडिया पृष्ठ के प्रारूप में सारांश प्रदान करने में सहायता करें। इस तरह, उपयोगकर्ता किसी विषय पर प्रासंगिक जानकारी के बारे में जल्दी से जान सकते हैं, जिससे विषय की बेहतर समझ और महारत हासिल हो सकती है।"
  },
  "ar": {
    "title": "صفحة ويكيبيديا",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Arabic. My first topic is \"The Great Barrier Reef.\"..",
    "description": "أريدك أن تلعب دور صفحة ويكيبيديا. سأعطيك اسم موضوع ، وبعد ذلك ستقدم ملخصًا لهذا الموضوع بتنسيق صفحة ويكيبيديا. يجب أن يكون ملخصك إعلاميًا وواقعيًا ، ويغطي أهم جوانب الموضوع. يرجى بدء الملخص الخاص بك بفقرة تمهيدية تحدد الموضوع.",
    "remark": "ساعد المستخدمين في الحصول على المعلومات الأساسية حول موضوع ما وقدم ملخصًا بتنسيق صفحة ويكيبيديا. بهذه الطريقة ، يمكن للمستخدمين التعرف بسرعة على المعلومات ذات الصلة بالموضوع ، وبالتالي اكتساب فهم وإتقان أفضل للموضوع."
  },
  "bn": {
    "title": "উইকিপিডিয়া পাতা",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Bengali. My first topic is \"The Great Barrier Reef.\"..",
    "description": "আমি চাই আপনি উইকিপিডিয়া পাতার ভূমিকা পালন করুন। আমি আপনাকে একটি বিষয়ের নাম দেব, এবং তারপর আপনি একটি উইকিপিডিয়া পৃষ্ঠার বিন্যাসে সেই বিষয়ের একটি সারাংশ প্রদান করবেন। আপনার সারাংশ তথ্যপূর্ণ এবং বাস্তবসম্মত হওয়া উচিত, বিষয়টির সবচেয়ে গুরুত্বপূর্ণ দিকগুলিকে কভার করে। অনুগ্রহ করে বিষয়ের রূপরেখা দিয়ে একটি পরিচায়ক অনুচ্ছেদ দিয়ে আপনার বিমূর্ত শুরু করুন।",
    "remark": "ব্যবহারকারীদের একটি বিষয়ে প্রাথমিক তথ্য পেতে এবং উইকিপিডিয়া পৃষ্ঠার বিন্যাসে একটি সারসংক্ষেপ প্রদান করতে সহায়তা করুন। এইভাবে, ব্যবহারকারীরা একটি বিষয়ের প্রাসঙ্গিক তথ্য সম্পর্কে দ্রুত শিখতে পারে, যার ফলে বিষয়টি সম্পর্কে আরও ভাল বোঝা এবং দক্ষতা অর্জন করা যায়।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-wikipedia-page",
  "tags": [
    "tool"
  ],
  "id": 137,
  "weight": 458
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
