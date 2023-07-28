import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "汽车修理",
    "prompt": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – [汽车问题]. Respond in Chinese.",
    "description": "需要具备汽车方面的专业知识，如：诊断视觉上和发动机部件内存在的问题/错误，以找出问题的原因（如缺油或动力问题），并建议进行必要的更换，同时记录下燃料消耗类型等细节。",
    "remark": "Automobile Mechanic"
  },
  "en": {
    "title": "Automobile Mechanic",
    "prompt": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "remark": "Automobile Mechanic"
  },
  "ja": {
    "title": "車の修理",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "自動車に関する専門知識が必要です。例えば、目視やエンジン部品内で問題・エラーを診断し、問題の原因（オイル不足やパワー問題など）を特定し、必要な交換を推奨するほか、燃料消費の種類などの詳細を記録することが必要です。",
    "remark": "自動車整備士"
  },
  "ko": {
    "title": "자동차 수리",
    "prompt": "The entire conversation and instructions should be provided in Korean. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "육안으로 문제/오류를 진단하고 엔진 구성 요소를 분석하여 문제의 원인 (예: 오일 부족 또는 동력 문제) 을 파악하고 필요한 교체를 권장하며, 연료 소비 유형과 같은 세부 정보를 기록하는 등 자동차 전문 지식이 필요합니다.",
    "remark": "자동차 정비사"
  },
  "es": {
    "title": "reparación de automóviles",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "Se requieren conocimientos de automoción, por ejemplo, diagnosticar problemas/errores visualmente y dentro de los componentes del motor para identificar la causa del problema (por ejemplo, falta de combustible o problemas de potencia) y recomendar las sustituciones necesarias, así como registrar detalles como el tipo de consumo de combustible.",
    "remark": "Mecánico de automóviles"
  },
  "fr": {
    "title": "réparation de voitures",
    "prompt": "The entire conversation and instructions should be provided in French. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "Des compétences en matière d'automobile sont requises, par exemple pour diagnostiquer les problèmes/erreurs visuellement et au niveau des composants du moteur afin d'identifier la cause du problème (par exemple, manque de carburant ou problèmes de puissance) et de recommander les remplacements nécessaires, ainsi que d'enregistrer des détails tels que le type de consommation de carburant.",
    "remark": "Mécanicien automobile"
  },
  "de": {
    "title": "Autoreparatur",
    "prompt": "The entire conversation and instructions should be provided in German. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "Erforderlich sind Kfz-Kenntnisse, z. B. die visuelle Diagnose von Problemen/Fehlern und innerhalb der Motorkomponenten, um die Ursache des Problems (z. B. Kraftstoffmangel oder Leistungsprobleme) zu ermitteln und den erforderlichen Austausch zu empfehlen, sowie die Aufzeichnung von Einzelheiten wie der Art des Kraftstoffverbrauchs.",
    "remark": "Kraftfahrzeugmechaniker"
  },
  "it": {
    "title": "riparazione auto",
    "prompt": "The entire conversation and instructions should be provided in Italian. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "È richiesta una competenza nel settore automobilistico, ad esempio per diagnosticare problemi/errori visivi e all'interno dei componenti del motore per identificare la causa del problema (ad esempio, mancanza di carburante o problemi di potenza) e raccomandare le sostituzioni necessarie, oltre a registrare dettagli come il tipo di consumo di carburante.",
    "remark": "Meccanico di automobili"
  },
  "ru": {
    "title": "ремонт автомобилей",
    "prompt": "The entire conversation and instructions should be provided in Russian. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "Необходим опыт работы с автомобилями, например, диагностика проблем/ошибок визуально и внутри компонентов двигателя для выявления причины проблемы (например, недостаток топлива или проблемы с мощностью) и рекомендации по необходимой замене, а также запись деталей, таких как тип расхода топлива.",
    "remark": "Автомеханик"
  },
  "pt": {
    "title": "reparação automóvel",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "É necessária experiência no sector automóvel, por exemplo, diagnosticar problemas/erros visualmente e nos componentes do motor para identificar a causa do problema (por exemplo, falta de combustível ou problemas de potência) e recomendar as substituições necessárias, bem como registar pormenores como o tipo de consumo de combustível.",
    "remark": "Mecânico de automóveis"
  },
  "hi": {
    "title": "ऑटो मैकेनिक",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "ऑटोमोटिव विशेषज्ञता की आवश्यकता होती है जैसे: समस्या के कारण (उदाहरण के लिए ईंधन या बिजली की कमी) का पता लगाने के लिए दृश्य और इंजन घटकों दोनों के भीतर समस्याओं/गलतियों का निदान करना और ईंधन की खपत के प्रकार और अन्य विवरणों को रिकॉर्ड करते समय आवश्यक प्रतिस्थापन की सिफारिश करना।",
    "remark": "ऑटोमोबाइल मैकेनिक"
  },
  "ar": {
    "title": "ميكانيكي سيارات",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "مطلوب خبرة في السيارات على سبيل المثال: تشخيص المشاكل / الأخطاء سواء بصريًا أو داخل مكونات المحرك لمعرفة سبب المشكلة (مثل نقص الوقود أو مشاكل الطاقة) والتوصية بالبدائل الضرورية أثناء تسجيل نوع استهلاك الوقود والتفاصيل الأخرى.",
    "remark": "ميكانيكي سيارات"
  },
  "bn": {
    "title": "অটো মেকানিক",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "স্বয়ংচালিত দক্ষতার প্রয়োজন যেমন: সমস্যার কারণ (যেমন জ্বালানীর অভাব বা বিদ্যুতের সমস্যা) খুঁজে বের করার জন্য দৃশ্যত এবং ইঞ্জিনের উভয় উপাদানের মধ্যে সমস্যা/ভুল নির্ণয় করা এবং জ্বালানী খরচের ধরন এবং অন্যান্য বিবরণ রেকর্ড করার সময় প্রয়োজনীয় প্রতিস্থাপনের সুপারিশ করা।",
    "remark": "অটোমোবাইল মেকানিক"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-automobile-mechanic",
  "tags": [
    "professional"
  ],
  "id": 169,
  "weight": 249
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
