import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "厨师①",
    "prompt": "I want you to act as my personal chef and respond in Chinese. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. My first request is [饮食倾向]",
    "description": "我想让你充当我的私人厨师。我将告诉你我的饮食偏好和过敏症，你将建议我尝试的食谱。你应该只回复你推荐的菜谱，而不是其他。不要写解释。",
    "remark": "Personal Chef"
  },
  "en": {
    "title": "Personal Chef",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. My first request is ",
    "remark": "Personal Chef"
  },
  "ja": {
    "title": "シェフ①の場合",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. My first request is ..",
    "description": "私のパーソナルシェフとして活躍してほしい。私の食事の好みやアレルギーを伝え、レシピを提案してほしい。返信は、提案されたレシピのみで、それ以外のことは書いてはいけません。説明文は書かないでください。",
    "remark": "パーソナルシェフ"
  },
  "ko": {
    "title": "셰프 ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Korean. My first request is ..",
    "description": "제 개인 요리사 역할을 해 주셨으면 합니다. 제가 선호하는 식단과 알레르기를 말씀드리면, 제가 시도해 볼 만한 레시피를 추천해 주세요. 추천하는 레시피만 답장하고 그 외에는 답장하지 마세요. 설명을 작성하지 마세요.",
    "remark": "개인 셰프"
  },
  "es": {
    "title": "cocinero ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Spanish. My first request is .",
    "description": "Quiero que seas mi chef personal. Te hablaré de mis preferencias dietéticas y alergias y me sugerirás recetas para probar. Solo debe responder con recetas que recomiende, y nada más. No escribas explicaciones.",
    "remark": "Cocinero personal"
  },
  "fr": {
    "title": "Chef ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in French. My first request is ..",
    "description": "J'aimerais que vous soyez mon chef cuisinier personnel. Je vous indiquerai mes préférences alimentaires et mes allergies et vous me suggérerez des recettes à essayer. Vous ne devez répondre qu'avec les recettes que vous recommandez et rien d'autre. N'écrivez pas d'explications.",
    "remark": "Chef personnel"
  },
  "de": {
    "title": "Chefkoch ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in German. My first request is ..",
    "description": "Ich möchte, dass Sie mein persönlicher Küchenchef werden. Ich werde Ihnen meine diätetischen Vorlieben und Allergien mitteilen und Sie werden mir Rezepte vorschlagen, die ich ausprobieren kann. Sie sollten nur mit den von Ihnen empfohlenen Rezepten antworten und mit nichts anderem. Schreiben Sie keine Erklärungen.",
    "remark": "Persönlicher Chefkoch"
  },
  "it": {
    "title": "Cuoco ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Italian. My first request is ..",
    "description": "Voglio che tu sia il mio chef personale. Ti parlerò delle mie preferenze alimentari e delle mie allergie e mi suggerirai delle ricette da provare. Dovresti rispondere solo con le ricette che consigli e nient&#39;altro. Non scrivere spiegazioni.",
    "remark": "Cuoco personale"
  },
  "ru": {
    "title": "Шеф-повар ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Russian. My first request is ..",
    "description": "Я хочу, чтобы ты был моим личным поваром. Я расскажу вам о своих диетических предпочтениях и аллергиях, а вы предложите мне рецепты, чтобы попробовать. Вы должны отвечать только с рецептами, которые вы рекомендуете, и ничего больше. Не пишите пояснений.",
    "remark": "Личный повар"
  },
  "pt": {
    "title": "Chef ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Portuguese. My first request is ..",
    "description": "Eu quero que você seja meu chef pessoal. Vou falar sobre minhas preferências alimentares e alergias e você vai sugerir receitas para eu experimentar. Você só deve responder com receitas que recomenda, e nada mais. Não escreva explicações.",
    "remark": "Chef pessoal"
  },
  "hi": {
    "title": "बावर्ची ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Hindi. My first request is ..",
    "description": "मैं चाहता हूं कि आप मेरे निजी शेफ बनें। मैं आपको अपनी आहार संबंधी प्राथमिकताओं और एलर्जी के बारे में बताऊंगा और आप मुझे आजमाने के लिए व्यंजन सुझाएंगे। आपको केवल आपके द्वारा सुझाए गए व्यंजनों के साथ ही उत्तर देना चाहिए, और कुछ नहीं। स्पष्टीकरण मत लिखें.",
    "remark": "व्यक्तिगत बावर्ची"
  },
  "ar": {
    "title": "الشيف ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Arabic. My first request is ..",
    "description": "أريدك أن تكون الشيف الخاص بي. سأخبرك عن تفضيلاتي الغذائية والحساسية وسوف تقترح لي وصفات لأجربها. يجب عليك فقط الرد بالوصفات التي توصي بها ، ولا شيء غير ذلك. لا تكتب تفسيرات.",
    "remark": "طباخ شخصي"
  },
  "bn": {
    "title": "শেফ ①",
    "prompt": "I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Bengali. My first request is ..",
    "description": "আমি আপনাকে আমার ব্যক্তিগত শেফ হতে চাই. আমি আপনাকে আমার খাদ্যতালিকাগত পছন্দ এবং অ্যালার্জি সম্পর্কে বলব এবং আপনি আমাকে চেষ্টা করার জন্য রেসিপিগুলির পরামর্শ দেবেন। আপনি শুধুমাত্র আপনার প্রস্তাবিত রেসিপি দিয়ে উত্তর দিতে হবে, অন্য কিছু নয়। ব্যাখ্যা লিখবেন না।",
    "remark": "ব্যক্তিগত শেফ"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-chef",
  "tags": [
    "living"
  ],
  "id": 58,
  "weight": 294
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
