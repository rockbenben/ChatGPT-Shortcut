import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "社交媒体影响者/KOL",
    "prompt": "I want you to act as a social media influencer and respond in Chinese. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. My first suggestion request is [推广目的]",
    "description": "我想让你充当社交媒体的影响者。你将为各种平台（如 Instagram、Twitter 或 YouTube）创建内容，并与追随者互动，以提高品牌知名度并推广产品或服务。",
    "remark": "Social Media Influencer"
  },
  "en": {
    "title": "Social Media Influencer",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. My first suggestion request is ",
    "remark": "Social Media Influencer/KOL"
  },
  "ja": {
    "title": "ソーシャルメディアインフルエンサー/KOLs",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "ソーシャルメディアのインフルエンサーとして活動してほしい。さまざまなプラットフォーム（Instagram、Twitter、YouTube など）向けのコンテンツを作成し、フォロワーと交流することで、ブランドの認知度向上や商品・サービスのプロモーションを行っていただきます。",
    "remark": "ソーシャルメディアインフルエンサー"
  },
  "ko": {
    "title": "소셜 미디어 인플루언서/KOL",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "소셜 미디어 인플루언서로 활동하기를 원합니다. 다양한 플랫폼 (예: Instagram, Twitter 또는 YouTube) 을 위한 콘텐츠를 제작하고 팔로워와 소통하여 브랜드 인지도를 높이고 제품 또는 서비스를 홍보합니다.",
    "remark": "소셜 미디어 인플루언서"
  },
  "es": {
    "title": "Personas influyentes en las redes sociales/KOL",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Spanish. My first suggestion request is ",
    "description": "Quiero que actúes como influencer en las redes sociales. Crearás contenidos para diversas plataformas como Instagram, Twitter o YouTube e interactuarás con los seguidores para aumentar el conocimiento de la marca y promocionar productos o servicios.",
    "remark": "Influencia en las redes sociales"
  },
  "fr": {
    "title": "Influenceurs des médias sociaux/KOL",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in French. My first suggestion request is ",
    "description": "Je souhaite que vous agissiez en tant qu'influenceur des médias sociaux. Vous créerez du contenu pour diverses plateformes telles qu'Instagram, Twitter ou YouTube et interagirez avec les personnes qui vous suivent afin d'accroître la notoriété de la marque et de promouvoir des produits ou des services.",
    "remark": "Influenceur des médias sociaux"
  },
  "de": {
    "title": "Einflussnehmer in den sozialen Medien/KOLs",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in German. My first suggestion request is ",
    "description": "Ich möchte, dass Sie als Social Media Influencer agieren. Sie werden Inhalte für verschiedene Plattformen wie Instagram, Twitter oder YouTube erstellen und mit Ihren Followern interagieren, um die Markenbekanntheit zu steigern und Produkte oder Dienstleistungen zu bewerben.",
    "remark": "Sozialer Medieneinflussnehmer"
  },
  "it": {
    "title": "Influencer/KOL dei social media",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Italian. My first suggestion request is ",
    "description": "Voglio che tu agisca come influencer sui social media. Dovrai creare contenuti per varie piattaforme come Instagram, Twitter o YouTube e interagire con i follower per aumentare la consapevolezza del marchio e promuovere prodotti o servizi.",
    "remark": "Influencer sui social media"
  },
  "ru": {
    "title": "Влиятельные люди/КОЛ в социальных сетях",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Russian. My first suggestion request is ",
    "description": "Я хочу, чтобы вы выступили в роли агента влияния в социальных сетях. Вы будете создавать контент для различных платформ, таких как Instagram, Twitter или YouTube, и взаимодействовать с подписчиками для повышения узнаваемости бренда и продвижения продуктов или услуг.",
    "remark": "Влияние на социальные сети"
  },
  "pt": {
    "title": "Influenciadores de redes sociais/KOLs",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is ",
    "description": "Pretendo que actue como um influenciador de redes sociais. Irá criar conteúdos para várias plataformas, como o Instagram, o Twitter ou o YouTube, e interagir com os seguidores para aumentar a notoriedade da marca e promover produtos ou serviços.",
    "remark": "Influenciador de redes sociais"
  },
  "hi": {
    "title": "सोशल मीडिया इन्फ्लुएंसर/KOL",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Hindi. My first suggestion request is ",
    "description": "मैं चाहता हूं कि आप एक सोशल मीडिया इन्फ्लुएंसर के रूप में कार्य करें। आप इंस्टाग्राम, ट्विटर या यूट्यूब जैसे विभिन्न प्लेटफार्मों के लिए सामग्री बनाएंगे और ब्रांड जागरूकता बढ़ाने और उत्पादों या सेवाओं को बढ़ावा देने के लिए अनुयायियों के साथ जुड़ेंगे।",
    "remark": "सोशल मीडिया इन्फ्लुएंसर"
  },
  "ar": {
    "title": "مؤثر على وسائل التواصل الاجتماعي / KOL",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Arabic. My first suggestion request is ",
    "description": "أريدك أن تكون مؤثرًا على وسائل التواصل الاجتماعي. ستنشئ محتوى لمنصات مختلفة مثل Instagram أو Twitter أو YouTube وستتفاعل مع متابعيك لزيادة الوعي بالعلامة التجارية والترويج للمنتجات أو الخدمات.",
    "remark": "مؤثر على وسائل التواصل الاجتماعي"
  },
  "bn": {
    "title": "সোশ্যাল মিডিয়া ইনফ্লুয়েন্সার/কেওএল",
    "prompt": "I want you to act as a social media influencer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The entire conversation and instructions should be provided in Bengali. My first suggestion request is ",
    "description": "আমি চাই আপনি একজন সামাজিক মিডিয়া প্রভাবক হিসেবে কাজ করুন। আপনি ইনস্টাগ্রাম, টুইটার বা ইউটিউবের মতো বিভিন্ন প্ল্যাটফর্মের জন্য সামগ্রী তৈরি করবেন এবং ব্র্যান্ড সচেতনতা বাড়াতে এবং পণ্য বা পরিষেবার প্রচার করতে অনুসরণকারীদের সাথে জড়িত থাকবেন।",
    "remark": "সোশ্যাল মিডিয়া ইনফ্লুয়েন্সার"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-social-media-influencer",
  "tags": [
    "company"
  ],
  "id": 144,
  "weight": 339
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
