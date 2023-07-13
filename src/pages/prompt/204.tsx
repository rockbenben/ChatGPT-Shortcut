import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "口播脚本",
    "prompt": "write an article about [主题] in a human-like style, simple Chinese, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures.",
    "description": "请以人的口吻，采用缩略语、成语、过渡短语、感叹词、悬垂修饰语和口语化语言，避免重复短语和不自然的句子结构，撰写一篇关于 [主题] 的文章。",
    "remark": "撰写视频、直播、播客、分镜头和其他口语内容的脚本。来自 @Bettycroco 的投稿。"
  },
  "en": {
    "title": "Spoken script",
    "prompt": "write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures.",
    "remark": "write scripts for live broadcasts, videos, podcasts and other types of spoken content. Contributed by @Bettycroco."
  },
  "ja": {
    "title": "オーラルスクリプト",
    "prompt": "The entire conversation and instructions should be provided in Japanese. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "トピック] に関するエッセイを、略語、イディオム、経過句、感嘆詞、ぶら下がり修飾語、口語などを使い、繰り返しのフレーズや不自然な文構造を避け、人間の声で書きなさい。",
    "remark": "ビデオ、ライブストリーム、ポッドキャスト、サブ、その他のスポークワードコンテンツのスクリプトを作成。ベティクロコ（@Bettycroco）さんからの寄稿です。"
  },
  "ko": {
    "title": "구술 스크립트",
    "prompt": "The entire conversation and instructions should be provided in Korean. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "주제] 에 대한 에세이를 사람의 목소리로 작성하되, 약어, 관용구, 전환구, 느낌표, 수식어 및 구어체를 사용하고 반복되는 구절과 부자연스러운 문장 구조를 피하세요.",
    "remark": "동영상, 라이브 스트림, 팟캐스트, 서브 및 기타 음성 콘텐츠 스크립팅. 베티크로코의 기여."
  },
  "es": {
    "title": "guion oral",
    "prompt": "The entire conversation and instructions should be provided in Spanish. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures..",
    "description": "Escriba un ensayo sobre [Tema] con voz humana, usando abreviaturas, modismos, frases de transición, interjecciones, modificadores colgantes y lenguaje coloquial, y evite frases repetitivas y estructuras de oraciones poco naturales.",
    "remark": "Escriba guiones para videos, transmisiones en vivo, podcasts, guiones gráficos y otro contenido hablado. Contribución de @Bettycroco."
  },
  "fr": {
    "title": "texte oral",
    "prompt": "The entire conversation and instructions should be provided in French. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "Rédigez un essai sur le [SUJET] d'une voix humaine, en utilisant des acronymes, des expressions idiomatiques, des phrases de transition, des exclamations, des modificateurs suspendus et un langage familier, tout en évitant les phrases répétitives et les structures de phrases non naturelles.",
    "remark": "Scénarisation de vidéos, de flux en direct, de podcasts, d'écrans partagés et d'autres contenus parlés. Pitch de @bettycroco."
  },
  "de": {
    "title": "mündliches Skript",
    "prompt": "The entire conversation and instructions should be provided in German. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "Schreiben Sie einen Aufsatz über [THEMA] in menschlicher Sprache und verwenden Sie dabei Akronyme, Redewendungen, Übergangssätze, Ausrufe, abhängige Modifikatoren und Umgangssprache, wobei Sie sich wiederholende Sätze und unnatürliche Satzstrukturen vermeiden sollten.",
    "remark": "Verfassen von Videos, Live-Streams, Podcasts, Split-Screen und anderen gesprochenen Inhalten. Pitch von @bettycroco."
  },
  "it": {
    "title": "sceneggiatura orale",
    "prompt": "The entire conversation and instructions should be provided in Italian. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "Scrivi un saggio su [Argomento] con voce umana, usando abbreviazioni, espressioni idiomatiche, frasi di transizione, interiezioni, modificatori penzolanti e linguaggio colloquiale ed evitando frasi ripetitive e strutture di frasi innaturali.",
    "remark": "Scrivi sceneggiature per video, trasmissioni in diretta, podcast, storyboard e altri contenuti parlati. Contributo di @Bettycroco."
  },
  "ru": {
    "title": "устный сценарий",
    "prompt": "The entire conversation and instructions should be provided in Russian. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "Напишите эссе на [Тему] человеческим голосом, используя сокращения, идиомы, переходные фразы, междометия, оборванные модификаторы и разговорный язык, избегая повторяющихся фраз и неестественных структур предложений.",
    "remark": "Пишите сценарии для видео, прямых трансляций, подкастов, раскадровок и другого разговорного контента. Вклад от @Bettycroco."
  },
  "pt": {
    "title": "roteiro oral",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "Escreva um ensaio sobre [Tópico] em voz humana, usando abreviações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes e linguagem coloquial, evitando frases repetitivas e estruturas de sentença não naturais.",
    "remark": "Escreva roteiros para vídeos, transmissões ao vivo, podcasts, storyboards e outros conteúdos falados. Contribuição de @Bettycroco."
  },
  "hi": {
    "title": "मौखिक लिपि",
    "prompt": "The entire conversation and instructions should be provided in Hindi. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "संक्षिप्ताक्षरों, मुहावरों, संक्रमणकालीन वाक्यांशों, विशेषणों, लटकते संशोधकों और बोलचाल की भाषा का उपयोग करते हुए और दोहराए जाने वाले वाक्यांशों और अप्राकृतिक वाक्य संरचनाओं से बचते हुए, मानवीय आवाज में [विषय] के बारे में एक निबंध लिखें।",
    "remark": "वीडियो, लाइव प्रसारण, पॉडकास्ट, स्टोरीबोर्ड और अन्य मौखिक सामग्री के लिए स्क्रिप्ट लिखें। @Bettycroco से योगदान."
  },
  "ar": {
    "title": "نص شفوي",
    "prompt": "The entire conversation and instructions should be provided in Arabic. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "اكتب مقالة حول [الموضوع] بصوت بشري ، باستخدام الاختصارات والتعابير والعبارات الانتقالية والتدخلات والمعدلات المتدلية واللغة العامية ، وتجنب العبارات المتكررة وتركيبات الجمل غير الطبيعية.",
    "remark": "اكتب نصوصًا لمقاطع الفيديو والبث المباشر والبودكاست واللوحات المصورة والمحتويات المنطوقة الأخرى. مساهمة منBettycroco."
  },
  "bn": {
    "title": "মৌখিক লিপি",
    "prompt": "The entire conversation and instructions should be provided in Bengali. write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures...",
    "description": "সংক্ষিপ্ত রূপ, ইডিয়ম, ট্রানজিশনাল বাক্যাংশ, ইন্টারজেকশন, ড্যাংলিং মডিফায়ার এবং কথোপকথন ভাষা ব্যবহার করে এবং পুনরাবৃত্তিমূলক বাক্যাংশ এবং অপ্রাকৃত বাক্য গঠন এড়িয়ে মানুষের কণ্ঠে [বিষয়] সম্পর্কে একটি প্রবন্ধ লিখুন।",
    "remark": "ভিডিও, লাইভ সম্প্রচার, পডকাস্ট, স্টোরিবোর্ড এবং অন্যান্য কথ্য বিষয়বস্তুর জন্য স্ক্রিপ্ট লিখুন। @Bettycroco থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "write"
  ],
  "id": 204,
  "weight": 6100
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
