import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "演讲稿",
    "prompt": "作为一名 [身份]，以 [演讲主题] 为中心，为我扩写以下文本。可以引用最多一句名人名言、补充具体例子，阐述个人感想。",
    "description": "作为一名 [身份]，以如何落实科学道德和学风建设为中心，为我扩写以下文本。可以引用最多一句名人名言、补充具体例子，阐述个人感想。",
    "remark": "来自 @SetSeele 的投稿。"
  },
  "en": {
    "title": "Speech",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "remark": "Contributed by @SetSeele."
  },
  "ja": {
    "title": "講演内容",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Janpanese. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "アイデンティティ】として、科学倫理と学問倫理の実践方法を中心に、以下の文章を私のために展開してください。著名人 1 名までの引用、具体的な事例の追加、個人的な思い入れを詳しく述べてもよい。",
    "remark": "SetSeele さん（@SetSeele）からの寄稿です。"
  },
  "ko": {
    "title": "연설",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Korean. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "정체성] 으로서, 과학 윤리 및 학문적 윤리를 어떻게 구현할 것인지에 초점을 맞추어 다음 텍스트를 확장하세요. 유명한 인물을 최대 한 명까지 인용하고 구체적인 예를 추가하고 개인적인 느낌을 자세히 설명할 수 있습니다.",
    "remark": "SetSeele 의 기고글입니다."
  },
  "es": {
    "title": "borrador del discurso",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Spanish. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "Como [identidad], amplíe para mí el siguiente texto, centrado en cómo aplicar la ética científica y los estilos de aprendizaje. Puedes citar hasta un personaje famoso, añadir ejemplos concretos y desarrollar tus sentimientos personales.",
    "remark": "Contribución de @SetSeele."
  },
  "fr": {
    "title": "projet de discours",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in French. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "En tant qu'[identité], développez pour moi le texte suivant, centré sur la manière de mettre en œuvre l'éthique scientifique et les styles d'apprentissage. Vous pouvez citer jusqu'à une personne célèbre, ajouter des exemples spécifiques et développer vos sentiments personnels.",
    "remark": "Contribution de @SetSeele."
  },
  "de": {
    "title": "Redeentwurf",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in German. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "Erweitern Sie als [Identität] den folgenden Text für mich, in dem es um die Umsetzung von Wissenschaftsethik und Lernstilen geht. Sie können bis zu einer berühmten Person zitieren, konkrete Beispiele anführen und Ihre persönlichen Empfindungen erläutern.",
    "remark": "Beitrag von @SetSeele."
  },
  "it": {
    "title": "bozza di discorso",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Italian. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "Come [identità], approfondisci per me il seguente testo, incentrato su come implementare l'etica scientifica e gli stili di apprendimento. Potete citare fino a un personaggio famoso, aggiungere esempi specifici e approfondire i vostri sentimenti personali.",
    "remark": "Contributo di @SetSeele."
  },
  "ru": {
    "title": "проект речи",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Russian. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "В качестве [личность] подготовьте для меня следующий текст, посвященный вопросам применения научной этики и стилей обучения. Вы можете процитировать не более одного известного человека, привести конкретные примеры и рассказать о своих личных ощущениях.",
    "remark": "Вклад от @SetSeele."
  },
  "pt": {
    "title": "projeto de discurso",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Portuguese. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "Como [identidade], elabora-me o seguinte texto, centrado na aplicação da ética científica e dos estilos de aprendizagem. Pode citar, no máximo, uma pessoa famosa, acrescentar exemplos específicos e desenvolver os seus sentimentos pessoais.",
    "remark": "Contribuição de @SetSeele."
  },
  "hi": {
    "title": "भाषण",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Hindi. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "एक [पहचान] के रूप में, वैज्ञानिक नैतिकता को कैसे लागू किया जाए और अकादमिक शैली के निर्माण पर ध्यान केंद्रित करते हुए, मैं अपने लिए निम्नलिखित पाठ का विस्तार करूंगा। आप किसी प्रसिद्ध व्यक्ति का अधिकतम एक प्रसिद्ध उद्धरण उद्धृत कर सकते हैं, विशिष्ट उदाहरण जोड़ सकते हैं और अपनी व्यक्तिगत भावनाओं को समझा सकते हैं।",
    "remark": "@SetSeele से योगदान।"
  },
  "ar": {
    "title": "خطاب",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Arabic. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "بصفتي [هوية] ، تتمحور حول كيفية تنفيذ الأخلاق العلمية وبناء الأسلوب الأكاديمي ، سأقوم بتوسيع النص التالي لي. يمكنك اقتباس اقتباس مشهور واحد على الأكثر من شخص مشهور ، وإضافة أمثلة محددة ، وشرح مشاعرك الشخصية.",
    "remark": "مساهمة من SetSeele."
  },
  "bn": {
    "title": "বক্তৃতা",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Bengali. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "একটি [পরিচয়] হিসাবে, কীভাবে বৈজ্ঞানিক নীতিশাস্ত্র এবং একাডেমিক শৈলীর নির্মাণকে কেন্দ্র করে, আমি আমার জন্য নিম্নলিখিত পাঠ্যটি প্রসারিত করব। আপনি একজন বিখ্যাত ব্যক্তির থেকে সর্বাধিক একটি বিখ্যাত উদ্ধৃতি উদ্ধৃত করতে পারেন, নির্দিষ্ট উদাহরণ যোগ করতে পারেন এবং আপনার ব্যক্তিগত অনুভূতি ব্যাখ্যা করতে পারেন।",
    "remark": "@SetSeele থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "speech"
  ],
  "id": 195,
  "weight": 1091
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
