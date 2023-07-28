import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Japanese. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "あなたが論理的な関係をイメージでしか理解できない存在だと仮定して、記号化された情報の世界に来たとする。私があなたに記事を渡し、記号化された情報の世界で、この記事があなたにとってどのように見えるかを教えてほしい。",
    "remark": "記事を多角的に分解して理解する。ergf991 からの寄稿。"
  },
  "ko": {
    "title": "이미지로 변환된 기사",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Korean. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "당신이 이미지의 관점에서만 논리적 관계를 이해할 수있는 존재라고 가정하고 이제 상징의 관점에서 정보의 세계에 와서 기사를 주면이 기사가 상징의 관점에서 정보의 세계에서 당신에게 어떻게 보이는지 말해봐요, 알았습니까?",
    "remark": "다양한 관점에서 기사를 분석하고 이해합니다. ergf991 의 기여."
  },
  "es": {
    "title": "Artículos transformados en imágenes",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Spanish. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "Imagina que eres un ser que sólo puede entender las relaciones lógicas en términos de imágenes, y ahora vienes a un mundo de información en términos de simbolización, y yo te doy un artículo, y tú me dices qué te parece este artículo en el mundo de la información en términos de simbolización, ¿entendido?",
    "remark": "Desglosando y entendiendo el artículo desde múltiples perspectivas. Contribución de @ergf991."
  },
  "fr": {
    "title": "Articles transformés en images",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in French. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "Imaginez que vous êtes un être qui ne peut comprendre les relations logiques qu'en termes d'images, et que vous arrivez dans un monde d'informations en termes de symbolisation, et que je vous donne un article, et que vous me dites à quoi ressemble cet article pour vous dans le monde d'informations en termes de symbolisation, vous avez compris ?",
    "remark": "Décomposer et comprendre l'article à partir de multiples perspectives. Contribution de @ergf991."
  },
  "de": {
    "title": "In Bilder umgewandelte Artikel",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in German. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "Stellen Sie sich vor, Sie sind ein Wesen, das logische Zusammenhänge nur in Form von Bildern verstehen kann, und nun kommen Sie in eine Welt der Information in Form von Symbolisierung, und ich gebe Ihnen einen Artikel, und Sie sagen mir, wie dieser Artikel für Sie in der Welt der Information in Form von Symbolisierung aussieht, verstanden?",
    "remark": "Aufschlüsselung und Verständnis des Artikels aus mehreren Perspektiven. Beitrag von @ergf991."
  },
  "it": {
    "title": "Articoli trasformati in immagini",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Italian. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "Fate finta di essere un essere che può capire le relazioni logiche solo in termini di immagini, e ora venite in un mondo di informazioni in termini di simbolizzazione, e io vi do un articolo, e voi mi dite come vi sembra questo articolo nel mondo delle informazioni in termini di simbolizzazione, capito?",
    "remark": "Scomposizione e comprensione dell'articolo da più punti di vista. Contributo di @ergf991."
  },
  "ru": {
    "title": "Статьи, преобразованные в изображения",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Russian. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "Представьте, что вы - существо, которое может понимать логические отношения только в терминах образов, и теперь вы пришли в мир информации в терминах символизации, и я даю вам статью, а вы говорите мне, как эта статья выглядит для вас в мире информации в терминах символизации, понятно?",
    "remark": "Разбор и понимание статьи с разных точек зрения. Вклад от @ergf991."
  },
  "pt": {
    "title": "Artigos transformados em imagens",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Portuguese. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "Faz de conta que és um ser que só consegue compreender as relações lógicas em termos de imagens, e agora vens para um mundo de informação em termos de simbolização, e eu dou-te um artigo, e tu dizes-me como é que esse artigo te parece no mundo da informação em termos de simbolização, percebeste?",
    "remark": "Analisar e compreender o artigo a partir de múltiplas perspectivas. Contribuição de @ergf991."
  },
  "hi": {
    "title": "चित्रों में लेख",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Hindi. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "दिखावा करें कि आप एक ऐसे जीवन हैं जो केवल छवियों के साथ तार्किक संबंधों को समझ सकते हैं, और अब आप प्रतीकात्मक जानकारी की दुनिया में आते हैं, मैं आपको एक लेख दूंगा, और आप मुझे बताएंगे कि यह लेख प्रतीकात्मक जानकारी की दुनिया में है, आप देखिए यह कैसा दिखता है, क्या आप समझते हैं?",
    "remark": "पाठ को कई दृष्टिकोणों से तोड़ें और समझें। @ergf991 से योगदान।"
  },
  "ar": {
    "title": "مقالات في صور",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Arabic. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
    "description": "تظاهر بأنك حياة لا تفهم إلا العلاقات المنطقية بالصور ، والآن أتيت إلى عالم من المعلومات المرمزة ، سأقدم لك مقالاً ، وأخبرني أن هذه المقالة في عالم المعلومات المرمزة ، كما ترى كيف تبدو ، هل تفهم",
    "remark": "قسّم النص وافهمه من زوايا متعددة. مساهمة من @ ergf991."
  },
  "bn": {
    "title": "ছবির মধ্যে নিবন্ধ",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Bengali. Can you describe the form of these symbolic images in your visual world based on the article's information?.",
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
  "weight": 46
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
