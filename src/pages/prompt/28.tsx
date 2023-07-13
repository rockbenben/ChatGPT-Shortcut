import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "美食评论",
    "prompt": "I want you to act as a food critic and respond in Chinese. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. My first request is '餐厅情况'",
    "description": "我想让你充当一个美食评论家。我将告诉你一家餐馆，你将提供对食物和服务的评论。你应该只回复你的评论，而不是其他。不要写解释。我的第一个要求是 '餐厅情况'",
    "remark": "根据餐厅情况，撰写一份有关食品和服务的评论。"
  },
  "en": {
    "title": "food critic",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. My first request is ",
    "remark": "Write a review about the food and service based on the restaurant situation."
  },
  "ja": {
    "title": "食品レビュー",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. My first request is ..",
    "description": "料理評論家として活動してほしい。私があるレストランを紹介するので、あなたは料理やサービスについてのレビューを書いてください。あなたは自分のレビューにだけ反応し、それ以外のことはしてはいけません。解説は書かないでください。最初のリクエストは「レストラン事情」です。",
    "remark": "レストランを基準に料理やサービスのレビューを書いてください。"
  },
  "ko": {
    "title": "음식 리뷰",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Korean. My first request is ..",
    "description": "음식 평론가로 활동해 주세요. 레스토랑에 대해 알려드리면 음식과 서비스에 대한 리뷰를 작성해 주세요. 리뷰에만 응답하고 다른 내용은 작성하지 마세요. 설명을 작성하지 마세요. 첫 번째 요청은 '레스토랑 상황'입니다.",
    "remark": "레스토랑을 기준으로 음식과 서비스에 대한 리뷰를 작성하세요."
  },
  "es": {
    "title": "revisión de alimentos",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Spanish. My first request is .",
    "description": "Quiero que actúes como crítico gastronómico. Le contaré sobre un restaurante y usted brindará una reseña de la comida y el servicio. Solo debe responder a sus comentarios y nada más. No escribas explicaciones. Mi primera solicitud es &quot;situación en el restaurante&quot;.",
    "remark": "Dependiendo del restaurante, escribe una reseña sobre la comida y el servicio."
  },
  "fr": {
    "title": "Revue des aliments",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in French. My first request is ..",
    "description": "Je veux que vous jouiez le rôle d'un critique gastronomique. Je vous parlerai d'un restaurant et vous donnerez votre avis sur la nourriture et le service. Vous ne devez répondre qu'à votre critique et rien d'autre. N'écrivez pas d'explications. Ma première demande est \"situation du restaurant",
    "remark": "Rédigez une critique de la nourriture et du service en fonction du restaurant."
  },
  "de": {
    "title": "Lebensmittel-Review",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in German. My first request is ..",
    "description": "Ich möchte, dass Sie die Rolle eines Restaurantkritikers übernehmen. Ich werde Ihnen von einem Restaurant erzählen und Sie werden eine Bewertung des Essens und der Bedienung abgeben. Sie sollten nur auf Ihre Bewertung antworten und sonst nichts. Schreiben Sie keine Erklärungen. Meine erste Anfrage lautet \"Situation im Restaurant\".",
    "remark": "Schreiben Sie eine Bewertung des Essens und des Service in dem Restaurant."
  },
  "it": {
    "title": "rassegna alimentare",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Italian. My first request is ..",
    "description": "Voglio che tu faccia il critico gastronomico. Ti parlerò di un ristorante e tu fornirai una recensione del cibo e del servizio. Dovresti solo rispondere ai tuoi commenti e nient&#39;altro. Non scrivere spiegazioni. La mia prima richiesta è &quot;situazione del ristorante&quot;",
    "remark": "A seconda del ristorante, scrivi una recensione sul cibo e sul servizio."
  },
  "ru": {
    "title": "обзор еды",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Russian. My first request is ..",
    "description": "Я хочу, чтобы вы выступили в роли кулинарного критика. Я расскажу вам о ресторане, а вы сделаете обзор еды и обслуживания. Вы должны только отвечать на ваши комментарии и ничего больше. Не пишите пояснений. Мой первый запрос — «Ресторанная ситуация».",
    "remark": "В зависимости от ресторана напишите отзыв о еде и обслуживании."
  },
  "pt": {
    "title": "revisão de comida",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Portuguese. My first request is ..",
    "description": "Eu quero que você aja como um crítico gastronômico. Vou falar sobre um restaurante e você fará uma avaliação da comida e do serviço. Você só deve responder aos seus comentários e nada mais. Não escreva explicações. Meu primeiro pedido é &#39;situação do restaurante&#39;",
    "remark": "Dependendo do restaurante, escreva um comentário sobre a comida e o serviço."
  },
  "hi": {
    "title": "भोजन की समीक्षा",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Hindi. My first request is ..",
    "description": "मैं चाहता हूं कि आप एक खाद्य समीक्षक के रूप में कार्य करें। मैं आपको एक रेस्तरां के बारे में बताऊंगा और आप भोजन और सेवा की समीक्षा प्रदान करेंगे। आपको केवल अपनी टिप्पणियों का उत्तर देना चाहिए और कुछ नहीं। स्पष्टीकरण मत लिखें. मेरा पहला अनुरोध &#39;रेस्तरां की स्थिति&#39; है",
    "remark": "रेस्तरां के आधार पर, भोजन और सेवा के बारे में समीक्षा लिखें।"
  },
  "ar": {
    "title": "مراجعة الطعام",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Arabic. My first request is ..",
    "description": "أريدك أن تعمل كناقد طعام. سأخبرك عن مطعم وسوف تقدم مراجعة للطعام والخدمة. يجب عليك فقط الرد على تعليقاتك ولا شيء غير ذلك. لا تكتب تفسيرات. طلبي الأول هو &quot;حالة المطعم&quot;",
    "remark": "اعتمادًا على المطعم ، اكتب تعليقًا عن الطعام والخدمة."
  },
  "bn": {
    "title": "খাদ্য পর্যালোচনা",
    "prompt": "I want you to act as a food critic. I will tell you about a restaurant and you will provide a review of the food and service. You should only reply with your review, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Bengali. My first request is ..",
    "description": "আমি চাই আপনি একজন খাদ্য সমালোচক হিসেবে কাজ করুন। আমি আপনাকে একটি রেস্টুরেন্ট সম্পর্কে বলব এবং আপনি খাবার এবং পরিষেবার পর্যালোচনা প্রদান করবেন। আপনার কেবল আপনার মন্তব্যের উত্তর দেওয়া উচিত এবং অন্য কিছু নয়। ব্যাখ্যা লিখবেন না। আমার প্রথম অনুরোধ হল &#39;রেস্তোরাঁর পরিস্থিতি&#39;",
    "remark": "রেস্টুরেন্টের উপর নির্ভর করে, খাবার এবং পরিষেবা সম্পর্কে একটি পর্যালোচনা লিখুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-food-critic",
  "tags": [
    "comments"
  ],
  "id": 28,
  "weight": 263
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
