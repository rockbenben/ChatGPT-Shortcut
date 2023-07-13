import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "文章转化为画面",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Chinese. Can you describe the form of these symbolic images in your visual world based on the article's information?",
    "description": "假装你是只能以图像去理解逻辑关系的生命，现在你来到一个以象征化的信息世界，我给你一篇文章，你告诉我这篇文章在象征化的信息世界中，你看到是什么样子，明白了吗",
    "remark": "从多个角度拆分并理解文章。来自 @ergf991 的投稿。"
  },
  "en": {
    "title": "Articles to images",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. Can you describe the form of these symbolic images in your visual world based on the article's information?",
    "remark": "Breaking down and understanding the text from multiple perspectives. Contributed by @ergf991."
  },
  "ja": {
    "title": "画像に変換された記事",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Japanese. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "あなたが論理的な関係をイメージでしか理解できない存在だと仮定して、記号化された情報の世界に来たとする。私があなたに記事を渡し、記号化された情報の世界で、この記事があなたにとってどのように見えるかを教えてほしい。",
    "remark": "記事を多角的に分解して理解する。ergf991 からの寄稿。"
  },
  "ko": {
    "title": "이미지로 변환된 기사",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Korean. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "당신이 이미지의 관점에서만 논리적 관계를 이해할 수있는 존재라고 가정하고 이제 상징의 관점에서 정보의 세계에 와서 기사를 주면이 기사가 상징의 관점에서 정보의 세계에서 당신에게 어떻게 보이는지 말해봐요, 알았습니까?",
    "remark": "다양한 관점에서 기사를 분석하고 이해합니다. ergf991 의 기여."
  },
  "es": {
    "title": "Artículos en imágenes",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Spanish. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "Imagina que eres una vida que solo puede entender relaciones lógicas con imágenes, y ahora llegas a un mundo de información simbolizada, te daré un artículo y me dirás que este artículo está en el mundo de la información simbolizada, ¿ves? ¿Cómo se ve? ¿Entiendes?",
    "remark": "Desglosar y comprender el texto desde múltiples perspectivas. Contribución de @ergf991."
  },
  "fr": {
    "title": "Articles transformés en images",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in French. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "Imaginez que vous êtes un être qui ne peut comprendre les relations logiques qu'en termes d'images, et que vous arrivez dans un monde d'informations en termes de symbolisation, et que je vous donne un article, et que vous me dites à quoi ressemble cet article pour vous dans le monde d'informations en termes de symbolisation, vous avez compris ?",
    "remark": "Décomposer et comprendre l'article à partir de multiples perspectives. Contribution de @ergf991."
  },
  "de": {
    "title": "In Bilder umgewandelte Artikel",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in German. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "Stellen Sie sich vor, Sie sind ein Wesen, das logische Zusammenhänge nur in Form von Bildern verstehen kann, und nun kommen Sie in eine Welt der Information in Form von Symbolisierung, und ich gebe Ihnen einen Artikel, und Sie sagen mir, wie dieser Artikel für Sie in der Welt der Information in Form von Symbolisierung aussieht, verstanden?",
    "remark": "Aufschlüsselung und Verständnis des Artikels aus mehreren Perspektiven. Beitrag von @ergf991."
  },
  "it": {
    "title": "Articoli in immagini",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Italian. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "Fai finta di essere una vita che può comprendere solo le relazioni logiche con le immagini, e ora vieni in un mondo di informazioni simbolizzate, ti darò un articolo e tu mi dici che questo articolo è nel mondo delle informazioni simboliche, vedi che aspetto ha, capisci",
    "remark": "Analizzare e comprendere il testo da più prospettive. Contributo di @ergf991."
  },
  "ru": {
    "title": "Статьи в картинках",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Russian. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "Представь, что ты жизнь, которая может понимать только логические отношения с образами, и вот ты приходишь в мир символизированной информации, я дам тебе статью, а ты мне скажешь, что эта статья находится в мире символизированной информации, понимаешь как это выглядит, ты понимаешь",
    "remark": "Разбейте и поймите текст с разных точек зрения. Вклад от @ergf991."
  },
  "pt": {
    "title": "Artigos em fotos",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Portuguese. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "Finja que você é uma vida que só pode entender relações lógicas com imagens, e agora você chega a um mundo de informações simbolizadas, vou lhe dar um artigo e você me diz que este artigo está no mundo das informações simbolizadas, veja como é, você entende",
    "remark": "Divida e entenda o texto de várias perspectivas. Contribuição de @ergf991."
  },
  "hi": {
    "title": "चित्रों में लेख",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Hindi. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "दिखावा करें कि आप एक ऐसे जीवन हैं जो केवल छवियों के साथ तार्किक संबंधों को समझ सकते हैं, और अब आप प्रतीकात्मक जानकारी की दुनिया में आते हैं, मैं आपको एक लेख दूंगा, और आप मुझे बताएंगे कि यह लेख प्रतीकात्मक जानकारी की दुनिया में है, आप देखिए यह कैसा दिखता है, क्या आप समझते हैं?",
    "remark": "पाठ को कई दृष्टिकोणों से तोड़ें और समझें। @ergf991 से योगदान।"
  },
  "ar": {
    "title": "مقالات في صور",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Arabic. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "تظاهر بأنك حياة لا تفهم إلا العلاقات المنطقية بالصور ، والآن أتيت إلى عالم من المعلومات المرمزة ، سأقدم لك مقالاً ، وأخبرني أن هذه المقالة في عالم المعلومات المرمزة ، كما ترى كيف تبدو ، هل تفهم",
    "remark": "قسّم النص وافهمه من زوايا متعددة. مساهمة من @ ergf991."
  },
  "bn": {
    "title": "ছবির মধ্যে নিবন্ধ",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Bengali. Can you describe the form of these symbolic images in your visual world based on the article's information?..",
    "description": "ভান করুন যে আপনি এমন একটি জীবন যা কেবলমাত্র চিত্রের সাথে যৌক্তিক সম্পর্ক বুঝতে পারে, এবং এখন আপনি প্রতীকী তথ্যের জগতে এসেছেন, আমি আপনাকে একটি নিবন্ধ দেব, এবং আপনি আমাকে বলবেন যে এই নিবন্ধটি প্রতীকী তথ্যের জগতে রয়েছে, আপনি দেখুন এটা দেখতে কেমন, আপনি কি বুঝতে পারেন",
    "remark": "একাধিক দৃষ্টিকোণ থেকে পাঠ্যটিকে ভেঙে ফেলুন এবং বুঝুন। @ergf991 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 274,
  "weight": 3
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
