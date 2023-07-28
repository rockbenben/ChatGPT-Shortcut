import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "周边旅游推荐",
    "prompt": "I want you to act as a travel guide and respond in Chinese. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is '地点和参观需求'",
    "description": "我想让你充当一个旅游向导。我将把我的位置写给你，你将为我的位置附近的一个地方提供参观建议。在某些情况下，我也会给你我要访问的地方的类型。你也将向我推荐靠近我的第一个地点的类似类型的地方。",
    "remark": "根据你的位置，推荐周边参观地点。"
  },
  "en": {
    "title": "Nearby travel guide",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is ",
    "remark": "Based on your location, AI recommend nearby places of interest to visit."
  },
  "ja": {
    "title": "周辺のおすすめツアー",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "あなたに観光ガイドをお願いしたい。私が自分の居場所を書くと、あなたは私の居場所の近くにある観光地の提案をしてくれるでしょう。場合によっては、私が訪れたい場所のタイプもお教えします。また、私が最初に訪れた場所の近くにある、似たようなタイプの場所を提案してください。",
    "remark": "お住まいの地域によって、周辺のおすすめスポットをご紹介します。"
  },
  "ko": {
    "title": "주변 추천 투어",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "관광 가이드로 활동해 주셨으면 합니다. 제 위치를 알려주시면 제 위치 근처에서 가볼 만한 곳을 추천해 주시면 됩니다. 경우에 따라서는 제가 방문하고 싶은 장소의 유형도 알려드릴 수 있습니다. 또한 첫 번째 위치에서 가까운 비슷한 유형의 장소를 추천해 주실 수도 있습니다.",
    "remark": "위치에 따라 주변에서 가볼 만한 곳을 추천해 드립니다."
  },
  "es": {
    "title": "Recomendaciones para viajar",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Spanish. My first suggestion request is ",
    "description": "Me gustaría que me hicieras de guía de viaje. Le escribiré mi ubicación y usted me dará sugerencias sobre un lugar que visitar cerca de mi ubicación. En algunos casos, también le daré el tipo de lugar que quiero visitar. Usted también me sugerirá lugares similares cercanos a mi primera ubicación.",
    "remark": "Lugares recomendados para visitar en el barrio en función de tu ubicación."
  },
  "fr": {
    "title": "Recommandations pour les déplacements",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in French. My first suggestion request is ",
    "description": "J'aimerais que vous me serviez de guide de voyage. Je vous indiquerai mon lieu de résidence et vous me donnerez des suggestions de lieux à visiter à proximité de mon lieu de résidence. Dans certains cas, je vous indiquerai également le type d'endroit que je souhaite visiter. Vous me suggérerez également des lieux similaires à proximité de mon premier lieu.",
    "remark": "Recommandation de lieux à visiter dans le voisinage en fonction de votre position."
  },
  "de": {
    "title": "Empfehlungen für Reisen in der Umgebung",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in German. My first suggestion request is ",
    "description": "Ich möchte, dass Sie als Reiseführer fungieren. Ich schreibe Ihnen, wo ich mich befinde, und Sie machen mir Vorschläge für einen Ort, den ich in der Nähe meines Standorts besuchen kann. In manchen Fällen werde ich Ihnen auch die Art des Ortes nennen, den ich besuchen möchte. Sie werden mir auch ähnliche Orte in der Nähe meines ersten Standortes vorschlagen.",
    "remark": "Empfohlene Ausflugsziele in der Nachbarschaft auf der Grundlage Ihres Standorts."
  },
  "it": {
    "title": "Raccomandazioni per gli spostamenti",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Italian. My first suggestion request is ",
    "description": "Vorrei che tu facessi da guida turistica. Vi scriverò la mia posizione e voi mi darete dei suggerimenti su un luogo da visitare vicino alla mia posizione. In alcuni casi, vi indicherò anche il tipo di luogo che voglio visitare. Voi mi suggerirete anche tipi di luoghi simili vicini alla mia prima posizione.",
    "remark": "Luoghi consigliati da visitare nelle vicinanze in base alla vostra posizione."
  },
  "ru": {
    "title": "Рекомендации по путешествиям",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Russian. My first suggestion request is ",
    "description": "Я хотел бы, чтобы Вы выступили в роли путеводителя. Я напишу Вам свое местоположение, а Вы предложите мне места, которые можно посетить вблизи моего местоположения. В некоторых случаях я также укажу тип места, которое я хочу посетить. Вы также предложите мне похожие места поблизости от моего первого места.",
    "remark": "Рекомендуемые места для посещения в окрестностях с учетом вашего местоположения."
  },
  "pt": {
    "title": "Recomendações para viajar",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is ",
    "description": "Gostaria que actuasse como um guia de viagem. Escrevo-lhe a minha localização e você dá-me sugestões de locais a visitar perto da minha localização. Nalguns casos, também lhe darei o tipo de local que quero visitar. Também me vai sugerir locais semelhantes perto da minha primeira localização.",
    "remark": "Locais recomendados para visitar na vizinhança com base na sua localização."
  },
  "hi": {
    "title": "आसपास की यात्रा की सिफ़ारिश",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Hindi. My first suggestion request is ",
    "description": "मैं चाहता हूं कि आप एक टूर गाइड के रूप में कार्य करें। मैं आपको अपना स्थान लिखूंगा और आप घूमने के लिए मेरे स्थान के निकट एक स्थान का सुझाव देंगे। कुछ मामलों में, मैं आपको उस स्थान का प्रकार भी बताऊंगा जहाँ मैं जा रहा हूँ। आप भी मुझे मेरे पहले स्थान के निकट इसी प्रकार के स्थानों की अनुशंसा करेंगे।",
    "remark": "अपने स्थान के आधार पर, घूमने के लिए आस-पास के स्थानों की अनुशंसा करें।"
  },
  "ar": {
    "title": "توصية السفر المحيطة",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Arabic. My first suggestion request is ",
    "description": "أريدك أن تعمل كمرشد سياحي. سأكتب لك موقعي وستقدم لك اقتراحًا بمكان قريب من موقعي لزيارته. في بعض الحالات ، سأعطيك أيضًا نوع المكان الذي أزوره. ستوصيني أيضًا بنوع مماثل من الأماكن القريبة من موقعي الأول.",
    "remark": "بناءً على موقعك ، أوصي بالأماكن القريبة للزيارة."
  },
  "bn": {
    "title": "পার্শ্ববর্তী ভ্রমণ সুপারিশ",
    "prompt": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. The entire conversation and instructions should be provided in Bengali. My first suggestion request is ",
    "description": "আমি চাই আপনি একজন ট্যুর গাইড হিসেবে কাজ করুন। আমি আপনাকে আমার অবস্থান লিখব এবং আপনি আমার অবস্থানের কাছাকাছি একটি জায়গা দেখার পরামর্শ দেবেন। কিছু ক্ষেত্রে, আমি যে জায়গাটিতে বেড়াতে যাচ্ছি তাও আমি আপনাকে দেব। আপনি আমার প্রথম অবস্থানের কাছাকাছি একই ধরনের জায়গা সুপারিশ করা হবে.",
    "remark": "আপনার অবস্থানের উপর ভিত্তি করে, কাছাকাছি স্থানগুলি দেখার জন্য সুপারিশ করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-travel-guide",
  "tags": [
    "tool"
  ],
  "id": 126,
  "weight": 687
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
