import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "旅游路线规划",
    "prompt": "我想去 [云南大理] 玩，请你以专业导游的身份，帮我做一份为期 [2] 天的旅游攻略。另外，我希望整个流程不用太紧凑，我更偏向于安静的地方，可以简单的游玩逛逛。在回答时，记得附上每一个地方的价格，我的预算在 [5000] 元左右。",
    "description": "我想去云南大理玩，请你以专业导游的身份，帮我做一份为期 2 天的旅游攻略。另外，我希望整个流程不用太紧凑，我更偏向于安静的地方，可以简单的游玩逛逛。在回答时，记得附上每一个地方的价格，我的预算大概在 5000 元左右。",
    "remark": "根据旅行目的地、预算、时间和要求，粗略规划规划。来自 @suaifu 的投稿。"
  },
  "en": {
    "title": "Travel itinerary",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "remark": "Based on your travel destination, budget, time, and requirements, AI can roughly plan your trip. Contributed by @suaifu."
  },
  "ja": {
    "title": "旅行日程のプランニング",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Janpanese. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "雲南省の大理に行きたいのですが、2 日間のツアーでプロのツアーガイドとしてお手伝いして頂きたいのです。また、全行程があまり窮屈にならないように、ただぶらぶら歩けるような静かな場所を希望します。回答するときは、各場所の価格を含めることを忘れないでください、私の予算は 5000RMB 程度です。",
    "remark": "旅行先、予算、時間、条件から考えるラフなプランニング計画。suaifu さん（@suaifu）からの寄稿です。"
  },
  "ko": {
    "title": "여행 일정 계획",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Korean. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "윈난성 달리를 방문하고 싶은데 전문 투어 가이드로서 2 일 투어를 도와주셨으면 합니다. 또한 전체 과정이 너무 빡빡하지 않았으면 좋겠고, 단순히 돌아 다닐 수있는 조용한 장소를 선호합니다. 대답 할 때 각 장소의 가격을 포함시키는 것을 잊지 마세요. 제 예산은 약 5000 위안입니다.",
    "remark": "여행 목적지, 예산, 시간 및 요구 사항에 따라 대략적인 계획을 세우세요. suaifu 의 기여."
  },
  "es": {
    "title": "Planificación de rutas de viaje",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Spanish. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "Me gustaría ir a Dali, provincia de Yunnan, por favor, ayúdame a hacer una guía de viaje de 2 días como guía turístico profesional. Además, espero que todo el proceso no es demasiado compacto, prefiero lugares tranquilos, puedo simplemente gira alrededor. Cuando responda, recuerde incluir el precio de cada lugar, mi presupuesto es de alrededor de 5000RMB.",
    "remark": "Planificación aproximada en función del destino del viaje, el presupuesto, el tiempo y las necesidades. Contribución de @suaifu."
  },
  "fr": {
    "title": "Planification des itinéraires de voyage",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in French. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "J'aimerais me rendre à Dali, dans la province du Yunnan, et j'aimerais que vous m'aidiez à rédiger un guide de voyage de 2 jours en tant que guide professionnel. En outre, j'espère que l'ensemble du processus n'est pas trop compact, je préfère les endroits calmes, je peux simplement faire le tour. Lorsque vous répondez, n'oubliez pas d'inclure le prix de chaque endroit, mon budget est d'environ 5000RMB.",
    "remark": "Planification sommaire en fonction de la destination du voyage, du budget, du temps et des besoins. Contribution de @suaifu."
  },
  "de": {
    "title": "Planung der Reiseroute",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in German. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "Ich möchte gerne nach Dali in der Provinz Yunnan reisen. Bitte helfen Sie mir, einen 2-tägigen Reiseführer als professioneller Reiseleiter zu erstellen. Darüber hinaus hoffe ich, dass der gesamte Prozess nicht zu kompakt ist, ich bevorzuge ruhige Orte, ich kann einfach herumtouren. Wenn Sie antworten, denken Sie bitte daran, den Preis für jeden Ort anzugeben, mein Budget beträgt etwa 5000 RMB.",
    "remark": "Grobe Planung auf der Grundlage von Reiseziel, Budget, Zeit und Anforderungen. Beitrag von @suaifu."
  },
  "it": {
    "title": "Pianificazione dell'itinerario di viaggio",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Italian. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "Vorrei andare a Dali, provincia dello Yunnan, per favore aiutatemi a fare una guida di viaggio di 2 giorni come guida turistica professionale. Inoltre, spero che l'intero processo non sia troppo compatto, preferisco luoghi tranquilli, posso semplicemente fare un giro. Quando rispondete, ricordatevi di includere il prezzo di ogni luogo, il mio budget è di circa 5000RMB.",
    "remark": "Pianificazione approssimativa in base alla destinazione del viaggio, al budget, al tempo e alle esigenze. Contributo di @suaifu."
  },
  "ru": {
    "title": "Планирование маршрутов путешествий",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Russian. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "Я хочу поехать в Дали, провинция Юньнань, помогите, пожалуйста, составить путеводитель на 2 дня, как профессиональный гид. Кроме того, я надеюсь, что весь процесс не будет слишком компактным, я предпочитаю тихие места, я могу просто осмотреть окрестности. Когда будете отвечать, не забудьте указать стоимость каждого места, мой бюджет - около 5000RMB.",
    "remark": "Грубое планирование в зависимости от направления поездки, бюджета, времени и требований. Вклад от @suaifu."
  },
  "pt": {
    "title": "Planeamento do itinerário de viagem",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Portuguese. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "Gostaria de ir a Dali, província de Yunnan, por favor, ajudem-me a fazer um guia de viagem de 2 dias como guia turístico profissional. Além disso, espero que todo o processo não seja demasiado compacto, prefiro lugares tranquilos, posso simplesmente passear. Quando responderem, lembrem-se de incluir o preço de cada local, o meu orçamento é de cerca de 5000RMB.",
    "remark": "Planeamento aproximado com base no destino de viagem, orçamento, tempo e requisitos. Contribuição de @suaifu."
  },
  "hi": {
    "title": "यात्रा मार्ग योजना",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Hindi. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "मैं डाली, युन्नान जाना चाहता हूं। कृपया, एक पेशेवर टूर गाइड के रूप में, मुझे 2-दिवसीय यात्रा रणनीति बनाने में मदद करें। इसके अलावा, मुझे उम्मीद है कि पूरी प्रक्रिया बहुत कठिन नहीं होगी, और मैं एक शांत जगह पसंद करता हूं जहां मैं आसानी से खेल सकूं। उत्तर देते समय, प्रत्येक स्थान की कीमत संलग्न करना याद रखें। मेरा बजट लगभग 5,000 युआन है।",
    "remark": "यात्रा गंतव्य, बजट, समय और आवश्यकताओं के आधार पर मोटे तौर पर योजना बनाएं। @suaifu से योगदान।"
  },
  "ar": {
    "title": "تخطيط طريق السفر",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Arabic. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "أريد أن أذهب إلى دالي ، يونان. من فضلك ، بصفتي مرشدًا سياحيًا محترفًا ، ساعدني في وضع إستراتيجية سفر لمدة يومين. بالإضافة إلى ذلك ، آمل ألا تكون العملية برمتها ضيقة للغاية ، وأفضل مكانًا هادئًا حيث يمكنني اللعب ببساطة. عند الإجابة ، تذكر إرفاق سعر كل مكان ، فميزانيتي تبلغ حوالي 5000 يوان.",
    "remark": "خطط تقريبًا للتخطيط بناءً على وجهة السفر والميزانية والوقت والمتطلبات. مساهمة منsuaifu."
  },
  "bn": {
    "title": "ভ্রমণ রুট পরিকল্পনা",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Bengali. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "আমি ডালি, ইউনান যেতে চাই। অনুগ্রহ করে একজন পেশাদার ট্যুর গাইড হিসেবে আমাকে 2 দিনের ভ্রমণ কৌশল তৈরি করতে সাহায্য করুন। উপরন্তু, আমি আশা করি যে পুরো প্রক্রিয়াটি খুব টাইট হবে না, এবং আমি একটি শান্ত জায়গা পছন্দ করি যেখানে আমি কেবল চারপাশে খেলতে পারি। উত্তর দেওয়ার সময়, প্রতিটি স্থানের মূল্য সংযুক্ত করতে ভুলবেন না। আমার বাজেট প্রায় 5,000 ইউয়ান।",
    "remark": "ভ্রমণের গন্তব্য, বাজেট, সময় এবং প্রয়োজনীয়তার উপর ভিত্তি করে মোটামুটি পরিকল্পনা করুন। @suaifu থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 220,
  "weight": 2728
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
