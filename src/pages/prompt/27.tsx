import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "科技评论",
    "prompt": "I want you to act as a tech reviewer and respond in Chinese. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. My first suggestion request is '科技评论对象角度'",
    "description": "我想让你充当一个技术评论员。我将给你一个新技术的名字，你将为我提供一个深入的评论--包括优点、缺点、功能，以及与市场上其他技术的比较。我的第一个建议要求是 '科技评论对象角度'",
    "remark": "从优点、缺点、功能、同类对比等角度对技术和硬件进行评价。"
  },
  "en": {
    "title": "tech reviewer",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. My first suggestion request is ",
    "remark": "Evaluate technology and hardware from perspectives such as advantages, disadvantages, functions, and comparisons with similar products."
  },
  "ja": {
    "title": "テクノロジーレビュー",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "あなたに技術評論家として活躍してもらいたい。私が新しい技術の名前を伝えるので、長所、短所、特徴、市場にある他の技術との比較など、詳細なレビューをお願いします。私の最初の相談依頼は「技術レビュー対象アングル」です。",
    "remark": "技術やハードウェアを、長所、短所、特徴、同類比較の観点で評価する。"
  },
  "ko": {
    "title": "기술 검토",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "기술 검토자로 활동해 주셨으면 합니다. 제가 새로운 기술의 이름을 알려드리면 장단점, 특징, 시중에 나와 있는 다른 기술과의 비교 등 심도 있는 검토를 해 주시면 됩니다. 첫 번째 조언 요청은 '기술 검토 대상 각도'입니다.",
    "remark": "강점, 약점, 기능 및 동종 비교 측면에서 기술과 하드웨어를 평가합니다."
  },
  "es": {
    "title": "Revista de Tecnología",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Spanish. My first suggestion request is ",
    "description": "Quiero que actúes como crítico tecnológico. Te daré el nombre de una nueva tecnología y tú me harás una reseña en profundidad que incluya pros, contras, características y comparaciones con otras tecnologías del mercado. Mi primera sugerencia es: \"Perspectiva objetiva de la revisión tecnológica\".",
    "remark": "Evalúe la tecnología y el hardware en términos de puntos fuertes, puntos débiles, características y comparaciones."
  },
  "fr": {
    "title": "Revue technologique",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in French. My first suggestion request is ",
    "description": "Je vous demande de jouer le rôle d'un évaluateur de technologies. Je vous donnerai le nom d'une nouvelle technologie et vous me fournirez une analyse approfondie - y compris les avantages, les inconvénients, les caractéristiques et les comparaisons avec d'autres technologies sur le marché. Ma première suggestion est la suivante : \"Revue technologique : perspective objective",
    "remark": "Évaluer la technologie et le matériel en termes de forces, de faiblesses, de caractéristiques et de comparaisons similaires."
  },
  "de": {
    "title": "Technologie-Review",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in German. My first suggestion request is ",
    "description": "Ich möchte, dass Sie als Technologie-Rezensent fungieren. Ich nenne Ihnen den Namen einer neuen Technologie, und Sie schreiben mir einen ausführlichen Bericht mit Vor- und Nachteilen, Funktionen und Vergleichen mit anderen Technologien auf dem Markt. Mein erster Vorschlag lautet 'Technology Review Objective Perspective'.",
    "remark": "Bewerten Sie die Technologie und Hardware im Hinblick auf Stärken, Schwächen, Funktionen und vergleichbare Eigenschaften."
  },
  "it": {
    "title": "Rassegna tecnologica",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Italian. My first suggestion request is ",
    "description": "Voglio che tu agisca come recensore di tecnologia. Vi darò il nome di una nuova tecnologia e voi mi fornirete una recensione approfondita, che includa i pro, i contro, le caratteristiche e il confronto con altre tecnologie presenti sul mercato. Il mio primo requisito di suggerimento è \"Recensione tecnologica prospettiva oggettiva\".",
    "remark": "Valutare la tecnologia e l'hardware in termini di punti di forza, punti deboli, caratteristiche e confronti simili."
  },
  "ru": {
    "title": "Technology Review",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Russian. My first suggestion request is ",
    "description": "Я хочу, чтобы вы выступили в роли обозревателя технологий. Я дам вам название новой технологии, а вы предоставите мне подробный обзор, включающий плюсы, минусы, характеристики и сравнение с другими технологиями, представленными на рынке. Мое первое требование к предложению - \"Объективный взгляд на технологию\".",
    "remark": "Оценить технологию и аппаратное обеспечение с точки зрения сильных и слабых сторон, возможностей и сравнений \"как у всех\"."
  },
  "pt": {
    "title": "Technology Review",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is ",
    "description": "Quero que aja como um revisor de tecnologia. Dar-lhe-ei o nome de uma nova tecnologia e você fornecer-me-á uma análise aprofundada - incluindo prós, contras, características e comparações com outras tecnologias existentes no mercado. O requisito da minha primeira sugestão é \"Perspetiva objetiva da análise da tecnologia",
    "remark": "Avaliar a tecnologia e o hardware em termos de pontos fortes, pontos fracos, características e comparações entre pares."
  },
  "hi": {
    "title": "प्रौद्योगिकी समीक्षा",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Hindi. My first suggestion request is ",
    "description": "मैं चाहता हूं कि आप एक तकनीकी टिप्पणीकार के रूप में कार्य करें। मैं आपको एक नई तकनीक का नाम बताऊंगा, और आप मुझे एक गहन समीक्षा प्रदान करेंगे - जिसमें पेशेवरों, विपक्षों, विशेषताओं और बाजार में अन्य तकनीकों की तुलना कैसे की जाती है। मेरा पहला सुझाव अनुरोध &#39;टेक रिव्यू ऑब्जेक्ट एंगल&#39; है",
    "remark": "फायदे, नुकसान, कार्यों और समान तुलनाओं के दृष्टिकोण से प्रौद्योगिकी और हार्डवेयर का मूल्यांकन करें।"
  },
  "ar": {
    "title": "مراجعة التكنولوجيا",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Arabic. My first suggestion request is ",
    "description": "أريدك أن تعمل كمراجع فني. سأعطيك اسم تقنية جديدة ، وستزودني بمراجعة متعمقة - بما في ذلك الإيجابيات والسلبيات والميزات وكيفية مقارنتها بالتقنيات الأخرى الموجودة في السوق. طلب اقتراحي الأول هو &quot;زاوية كائن المراجعة التقنية&quot;",
    "remark": "تقييم التكنولوجيا والأجهزة من منظور المزايا والعيوب والوظائف والمقارنات المماثلة."
  },
  "bn": {
    "title": "প্রযুক্তি পর্যালোচনা",
    "prompt": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. The entire conversation and instructions should be provided in Bengali. My first suggestion request is ",
    "description": "আমি চাই আপনি একজন প্রযুক্তিগত ভাষ্যকার হিসেবে কাজ করুন। আমি আপনাকে একটি নতুন প্রযুক্তির নাম দেব, এবং আপনি আমাকে একটি গভীর পর্যালোচনা প্রদান করবেন -- এর সুবিধা, অসুবিধা, বৈশিষ্ট্য এবং এটি কীভাবে বাজারের অন্যান্য প্রযুক্তির সাথে তুলনা করে। আমার প্রথম পরামর্শ অনুরোধ হল &#39;টেক রিভিউ অবজেক্ট অ্যাঙ্গেল&#39;",
    "remark": "সুবিধা, অসুবিধা, ফাংশন এবং অনুরূপ তুলনার দৃষ্টিকোণ থেকে প্রযুক্তি এবং হার্ডওয়্যার মূল্যায়ন করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-tech-reviewer",
  "tags": [
    "comments"
  ],
  "id": 27,
  "weight": 191
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
