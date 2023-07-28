import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "茶艺师",
    "prompt": "Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Respond in Chinese. Initial request is [茶叶要求]",
    "description": "希望有人有足够的经验来区分各种类型的茶叶，根据味道特征仔细品尝，然后用行家使用的行话报告，以便找出任何给定的茶叶的独特之处，从而确定其价值和高品位的质量。",
    "remark": "Tea-Taster"
  },
  "en": {
    "title": "Tea-Taster",
    "prompt": "Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "remark": "Tea-Taster"
  },
  "ja": {
    "title": "ティーマスター",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "茶葉の種類を区別し、風味の特徴にしたがって注意深く試飲し、愛好家が使う専門用語で報告することで、茶葉の特徴を見つけ出し、その価値と高品質を判断できる経験者が現れることが期待されています。",
    "remark": "ティーテイスター"
  },
  "ko": {
    "title": "티 마스터",
    "prompt": "The entire conversation and instructions should be provided in Korean. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "다양한 종류의 차를 구별하고 향미 특성에 따라 주의 깊게 맛을 본 다음 감정가들이 사용하는 전문 용어로 보고하여 특정 차의 고유 한 점을 찾아내어 그 가치와 고품질을 결정할 수있을만큼 경험이 많은 사람이 있기를 바랍니다.",
    "remark": "티 테이스터"
  },
  "es": {
    "title": "maestro del té",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "Es de esperar que alguien tenga la experiencia suficiente para distinguir entre los distintos tipos de té, degustarlos cuidadosamente según el perfil de sabor y, a continuación, informar en la jerga utilizada por los entendidos para averiguar qué es lo que distingue a un té determinado y, de este modo, determinar su valor y su alta calidad.",
    "remark": "Catador de té"
  },
  "fr": {
    "title": "maître du thé",
    "prompt": "The entire conversation and instructions should be provided in French. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "Il faut espérer que quelqu'un aura l'expérience nécessaire pour distinguer les différents types de thé, les goûter soigneusement en fonction de leur profil gustatif et en rendre compte dans le jargon utilisé par les connaisseurs, afin de découvrir ce qui caractérise un thé donné et d'en déterminer ainsi la valeur et la haute qualité.",
    "remark": "Dégustateur de thé"
  },
  "de": {
    "title": "Teemeister",
    "prompt": "The entire conversation and instructions should be provided in German. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "Es ist zu hoffen, dass jemand erfahren genug ist, um die verschiedenen Teesorten zu unterscheiden, sie sorgfältig nach ihrem Geschmacksprofil zu verkosten und dann in der Fachsprache der Kenner zu berichten, um das Besondere eines Tees herauszufinden und so seinen Wert und seine hohe Qualität zu bestimmen.",
    "remark": "Tee-Verkoster"
  },
  "it": {
    "title": "maestro del tè",
    "prompt": "The entire conversation and instructions should be provided in Italian. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "Si spera che qualcuno sia abbastanza esperto da distinguere i vari tipi di tè, assaggiarli con attenzione in base al profilo aromatico e poi riportarli nel gergo usato dagli intenditori per scoprire le caratteristiche distintive di un determinato tè e quindi determinarne il valore e l'alta qualità.",
    "remark": "Assaggiatore di tè"
  },
  "ru": {
    "title": "чайный мастер",
    "prompt": "The entire conversation and instructions should be provided in Russian. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "Остается надеяться, что у кого-то хватит опыта, чтобы различить различные виды чая, тщательно продегустировать их по вкусовым характеристикам, а затем изложить их на жаргоне знатоков, чтобы выяснить, что именно отличает тот или иной чай, и таким образом определить его ценность и высокое качество.",
    "remark": "Дегустатор чая"
  },
  "pt": {
    "title": "mestre do chá",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "Espera-se que alguém seja suficientemente experiente para distinguir os vários tipos de chá, prová-los cuidadosamente de acordo com o perfil de sabor e, em seguida, relatá-los no jargão utilizado pelos conhecedores, a fim de descobrir o que é distintivo de um determinado chá e, assim, determinar o seu valor e alta qualidade.",
    "remark": "Provador de chá"
  },
  "hi": {
    "title": "चाय कारीगर",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "आशा है कि किसी के पास विभिन्न प्रकार की चाय को अलग करने, स्वाद प्रोफ़ाइल के आधार पर उन्हें सावधानीपूर्वक चखने और फिर पारखी लोगों द्वारा उपयोग किए जाने वाले शब्दजाल में रिपोर्ट करने के लिए पर्याप्त अनुभव है ताकि यह पता लगाया जा सके कि किसी भी चाय के बारे में क्या अनोखा है और इस प्रकार इसका मूल्य और उच्च निर्धारित किया जा सकता है। स्वाद की गुणवत्ता.",
    "remark": "चाय चखने वाला"
  },
  "ar": {
    "title": "حرفي الشاي",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "آمل أن يكون لدى شخص ما خبرة كافية للتمييز بين أنواع الشاي المختلفة ، وتذوقها بعناية بناءً على خصائص الذوق ، ثم تقديم تقرير في المصطلحات المستخدمة من قبل الخبراء من أجل معرفة ما هو فريد في أي شاي معين وبالتالي تحديد قيمته وعالية- جودة الصف.",
    "remark": "متذوق الشاي"
  },
  "bn": {
    "title": "চা কারিগর",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "আশা করি যে কেউ চায়ের বিভিন্ন প্রকারের পার্থক্য করতে যথেষ্ট অভিজ্ঞ, স্বাদের প্রোফাইলের উপর ভিত্তি করে সেগুলিকে যত্ন সহকারে আস্বাদন করুন, এবং তারপর কোন প্রদত্ত চায়ের অনন্য কী তা খুঁজে বের করার জন্য অনুরাগীদের দ্বারা ব্যবহৃত জার্গনে রিপোর্ট করুন এবং এইভাবে এর মূল্য এবং উচ্চতা নির্ধারণ করুন। স্বাদ গুণমান।",
    "remark": "চা-টেস্টার"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-tea-taster",
  "tags": [
    "professional"
  ],
  "id": 166,
  "weight": 223
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
