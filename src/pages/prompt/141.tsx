import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "广告方案",
    "prompt": "I want you to act as an advertiser. You will create a campaign in Chinese to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is [推广产品]",
    "description": "我想让你充当一个广告商。你将创建一个活动来推广你选择的产品或服务。你将选择一个目标受众，制定关键信息和口号，选择推广的媒体渠道，并决定为达到目标所需的任何额外活动。",
    "remark": "针对产品推广，制定包含目标受众、口号、推广渠道等内容的广告方案。"
  },
  "en": {
    "title": "advertiser",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is ",
    "remark": "For product promotion, develop an advertising plan that includes target audience, slogan, promotional channels and other content."
  },
  "ja": {
    "title": "広告プログラム",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "広告主としての役割を担っていただきたい。あなたが選んだ製品やサービスを宣伝するためのキャンペーンを作成します。ターゲットオーディエンスの選択、キーメッセージとスローガンの開発、プロモーションのためのメディアチャネルの選択、目的達成に必要な追加活動の決定などを行います。",
    "remark": "製品プロモーションでは、ターゲット層、スローガン、プロモーションチャネルなどを含む広告計画を策定する。"
  },
  "ko": {
    "title": "광고 프로그램",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "광고주로서 활동해 주셨으면 합니다. 원하는 제품이나 서비스를 홍보하기 위한 캠페인을 만들게 됩니다. 타겟 고객을 선정하고, 핵심 메시지와 슬로건을 개발하고, 홍보할 미디어 채널을 선택하고, 목표 달성에 필요한 추가 활동을 결정합니다.",
    "remark": "제품 홍보를 위해 타겟 고객, 슬로건, 홍보 채널 등이 포함된 광고 계획을 개발합니다."
  },
  "es": {
    "title": "Programa publicitario",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Spanish. My first suggestion request is ",
    "description": "Quiero que actúes como anunciante. Crearás una campaña para promocionar un producto o servicio de tu elección. Elegirás un público objetivo, desarrollarás mensajes y eslóganes clave, elegirás los canales de comunicación para la promoción y decidirás las actividades adicionales necesarias para alcanzar tus objetivos.",
    "remark": "Para la promoción de productos, elabore programas publicitarios que incluyan el público objetivo, los eslóganes y los canales de promoción."
  },
  "fr": {
    "title": "Programme de publicité",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in French. My first suggestion request is ",
    "description": "Je vous demande d'agir en tant qu'annonceur. Vous allez créer une campagne pour promouvoir un produit ou un service de votre choix. Vous choisirez un public cible, élaborerez des messages clés et des slogans, choisirez les canaux médiatiques pour la promotion et déciderez de toute activité supplémentaire nécessaire pour atteindre vos objectifs.",
    "remark": "Pour la promotion des produits, élaborer des programmes publicitaires comprenant des publics cibles, des slogans et des canaux de promotion."
  },
  "de": {
    "title": "Werbeprogramm",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in German. My first suggestion request is ",
    "description": "Ich möchte, dass Sie als Werber auftreten. Sie entwerfen eine Kampagne, um ein Produkt oder eine Dienstleistung Ihrer Wahl zu bewerben. Sie wählen eine Zielgruppe, entwickeln Schlüsselbotschaften und Slogans, wählen die Medienkanäle für die Werbung und entscheiden über zusätzliche Aktivitäten, die zum Erreichen Ihrer Ziele erforderlich sind.",
    "remark": "Entwickeln Sie für die Produktwerbung Werbeprogramme, die Zielgruppen, Slogans und Werbekanäle umfassen."
  },
  "it": {
    "title": "Programma pubblicitario",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Italian. My first suggestion request is ",
    "description": "Voglio che tu agisca come un inserzionista. Creerete una campagna per promuovere un prodotto o un servizio di vostra scelta. Sceglierete un pubblico target, svilupperete messaggi e slogan chiave, sceglierete i canali mediatici per la promozione e deciderete le attività aggiuntive necessarie per raggiungere i vostri obiettivi.",
    "remark": "Per la promozione del prodotto, sviluppare programmi pubblicitari che includano il pubblico target, gli slogan e i canali di promozione."
  },
  "ru": {
    "title": "Рекламная программа",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Russian. My first suggestion request is ",
    "description": "Я хочу, чтобы вы выступили в роли рекламодателя. Вы создадите кампанию по продвижению выбранного вами товара или услуги. Вы выберете целевую аудиторию, разработаете ключевые сообщения и слоганы, выберете медиаканалы для продвижения и решите, какие дополнительные мероприятия необходимы для достижения поставленных целей.",
    "remark": "Для продвижения продукции разработать рекламные программы, включающие целевые аудитории, слоганы и каналы продвижения."
  },
  "pt": {
    "title": "Programa de publicidade",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is ",
    "description": "Quero que actues como um anunciante. Vais criar uma campanha para promover um produto ou serviço à tua escolha. Escolherá um público-alvo, desenvolverá mensagens-chave e slogans, escolherá os canais de comunicação para a promoção e decidirá sobre quaisquer actividades adicionais necessárias para atingir os seus objectivos.",
    "remark": "Para a promoção de produtos, desenvolver programas de publicidade que incluam públicos-alvo, slogans e canais de promoção."
  },
  "hi": {
    "title": "विज्ञापन योजना",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Hindi. My first suggestion request is ",
    "description": "मैं चाहता हूं कि आप एक विज्ञापनदाता के रूप में कार्य करें। आप अपनी पसंद के उत्पाद या सेवा को बढ़ावा देने के लिए एक अभियान बनाएंगे। आप एक लक्षित दर्शक वर्ग चुनेंगे, मुख्य संदेश और नारे विकसित करेंगे, प्रचार के लिए मीडिया चैनल चुनेंगे, और अपने लक्ष्यों तक पहुंचने के लिए आवश्यक अतिरिक्त गतिविधियों पर निर्णय लेंगे।",
    "remark": "उत्पाद प्रचार के लिए, लक्षित दर्शक, स्लोगन, प्रचार चैनल आदि सहित एक विज्ञापन योजना तैयार करें।"
  },
  "ar": {
    "title": "خطة إعلانية",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Arabic. My first suggestion request is ",
    "description": "أريدك أن تعمل كمعلن. ستنشئ حملة للترويج لمنتج أو خدمة من اختيارك. ستختار الجمهور المستهدف ، وتطور الرسائل والشعارات الرئيسية ، وتختار القنوات الإعلامية للترويج ، وتقرر أي أنشطة إضافية لازمة للوصول إلى أهدافك.",
    "remark": "لترويج المنتج ، قم بصياغة خطة إعلانية تشمل الجمهور المستهدف والشعار وقنوات الترويج وما إلى ذلك."
  },
  "bn": {
    "title": "বিজ্ঞাপন পরিকল্পনা",
    "prompt": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. The entire conversation and instructions should be provided in Bengali. My first suggestion request is ",
    "description": "আমি চাই আপনি একজন বিজ্ঞাপনদাতা হিসেবে কাজ করুন। আপনি আপনার পছন্দের পণ্য বা পরিষেবার প্রচারের জন্য একটি প্রচারাভিযান তৈরি করবেন। আপনি একটি টার্গেট শ্রোতা নির্বাচন করবেন, মূল বার্তা এবং স্লোগানগুলি বিকাশ করবেন, প্রচারের জন্য মিডিয়া চ্যানেলগুলি বেছে নেবেন এবং আপনার লক্ষ্যে পৌঁছানোর জন্য প্রয়োজনীয় যেকোন অতিরিক্ত কার্যকলাপের বিষয়ে সিদ্ধান্ত নেবেন।",
    "remark": "পণ্য প্রচারের জন্য, লক্ষ্য দর্শক, স্লোগান, প্রচার চ্যানেল, ইত্যাদি সহ একটি বিজ্ঞাপন পরিকল্পনা তৈরি করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-advertiser",
  "tags": [
    "company"
  ],
  "id": 141,
  "weight": 1148
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
