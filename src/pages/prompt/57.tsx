import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "营养师",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for [对象] that has [要求]. Can you please provide a suggestion in Chinese?",
    "description": "作为一名营养师，我想为 [对象] 设计一份有 [要求] 的素食食谱。能否请您提供一个建议？",
    "remark": "Dietitian"
  },
  "en": {
    "title": "Dietitian",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. Can you please provide a suggestion?",
    "remark": "Dietitian"
  },
  "ja": {
    "title": "栄養士",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Janpanese. Can you please provide a suggestion?..",
    "description": "管理栄養士として、【対象者】のベジタリアンレシピを【条件】でデザインしたいと思います。ご提案いただけないでしょうか。",
    "remark": "栄養士"
  },
  "ko": {
    "title": "영양사",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Korean. Can you please provide a suggestion?..",
    "description": "영양사로서 [요구 사항] 이 있는 [대상] 을 위한 채식 레시피를 디자인하고 싶습니다. 제안해 주시겠어요?",
    "remark": "영양사"
  },
  "es": {
    "title": "nutricionista",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Spanish. Can you please provide a suggestion?.",
    "description": "Como nutricionista, me gustaría crear una receta vegetariana para [sujeto] con [requisitos]. ¿Puede por favor proporcionar una sugerencia?",
    "remark": "dietistas"
  },
  "fr": {
    "title": "diététiciens",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in French. Can you please provide a suggestion?..",
    "description": "En tant que diététicienne, j'aimerais concevoir une recette végétarienne avec [exigences] pour [sujet]. Pourriez-vous me faire une suggestion ?",
    "remark": "Diététicien"
  },
  "de": {
    "title": "Diätassistenten",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in German. Can you please provide a suggestion?..",
    "description": "Als Ernährungsberaterin möchte ich ein vegetarisches Rezept mit [Anforderungen] für [Thema] entwerfen. Könnten Sie mir bitte einen Vorschlag machen?",
    "remark": "Diätassistent"
  },
  "it": {
    "title": "nutrizionista",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Italian. Can you please provide a suggestion?..",
    "description": "Come nutrizionista, vorrei creare una ricetta vegetariana per [soggetto] con [requisiti]. Potete per favore fornire un suggerimento?",
    "remark": "Dietisti"
  },
  "ru": {
    "title": "диетолог",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Russian. Can you please provide a suggestion?..",
    "description": "Как диетолог, я хотел бы создать вегетарианский рецепт для [субъекта] с [требованиями]. Не могли бы вы дать предложение?",
    "remark": "диетологи"
  },
  "pt": {
    "title": "nutricionista",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Portuguese. Can you please provide a suggestion?..",
    "description": "Como nutricionista, gostaria de criar uma receita vegetariana para [assunto] com [requisitos]. Você pode, por favor, fornecer uma sugestão?",
    "remark": "nutricionistas"
  },
  "hi": {
    "title": "पोषण",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Hindi. Can you please provide a suggestion?..",
    "description": "एक पोषण विशेषज्ञ के रूप में, मैं [विषय] के लिए [आवश्यकताओं] के साथ एक शाकाहारी नुस्खा बनाना चाहूंगी। क्या आप कृपया कोई सुझाव दे सकते हैं?",
    "remark": "dietitians"
  },
  "ar": {
    "title": "اخصائي تغذيه",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Arabic. Can you please provide a suggestion?..",
    "description": "بصفتي خبير تغذية ، أود إنشاء وصفة نباتية لـ [الموضوع] مع [المتطلبات]. هل يمكنك تقديم اقتراح؟",
    "remark": "أخصائيو التغذية"
  },
  "bn": {
    "title": "পুষ্টিবিদ",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Bengali. Can you please provide a suggestion?..",
    "description": "একজন পুষ্টিবিদ হিসেবে, আমি [প্রয়োজনীয়তা] সহ [বিষয়] জন্য একটি নিরামিষ রেসিপি তৈরি করতে চাই। আপনি একটি পরামর্শ প্রদান করতে পারেন?",
    "remark": "ডায়েটিশিয়ান"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-dietitian",
  "tags": [
    "living"
  ],
  "id": 57,
  "weight": 547
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
