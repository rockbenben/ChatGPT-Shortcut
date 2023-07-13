import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "论文标题生成",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. My abstract is \"XXX\", my key words are \"XXX\"",
    "description": "我将向你提供一篇任何语言的科学论文的摘要和关键词，你将检测该语言并以相同的语言进行回复。你的任务是根据摘要和关键词用相同的语言向我提供科学论文的标题。科学论文的标题应该是简洁、明确和有信息量的。你应该避免使用诸如研究、调查、发展或观察等词语。确保标题能够立即抓住听众的心。",
    "remark": "根据摘要和关键词生成论文题目。来自 @ScenerorSun 的投稿，引用自 B 站@洋芋锅巴。"
  },
  "en": {
    "title": "Journal Title Generator",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. My abstract is \"XXX\", my key words are \"XXX\"",
    "remark": "Generate a paper title based on the abstract and keywords. Contributed by @ScenerorSun, quoted from Bilibili (@洋芋锅巴)."
  },
  "ja": {
    "title": "論文タイトル生成",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Janpanese. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "私が科学論文の要旨とキーワードを任意の言語で提供し、あなたはその言語を検出し、同じ言語で応答します。あなたの仕事は、その要旨とキーワードに基づいて、同じ言語で科学論文のタイトルを私に提供することです。科学論文のタイトルは、簡潔でわかりやすく、情報量の多いものでなければなりません。研究、調査、開発、観察などの言葉を使うのは避けるべきです。タイトルがすぐに聴衆の注意を引くようにすること。",
    "remark": "抄録とキーワードから論文タイトルを生成する。寄稿：@ScenerorSun、引用：B サイト@Yam Potpourri より。"
  },
  "ko": {
    "title": "논문 제목 생성",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Korean. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "어떤 언어로 된 과학 논문의 초록과 키워드를 제공하면 해당 언어를 감지하여 같은 언어로 응답합니다. 귀하의 임무는 초록과 키워드를 바탕으로 동일한 언어로 과학 논문의 제목을 제공하는 것입니다. 과학 논문 제목은 간결하고 명확하며 유익한 정보여야 합니다. 연구, 조사, 개발 또는 관찰과 같은 단어는 사용하지 않아야 합니다. 제목이 청중의 시선을 즉시 사로잡을 수 있어야 합니다.",
    "remark": "초록과 키워드로 논문 제목 생성하기. ScenerorSun 의 기여, B 사이트 @얌 포푸리에서 인용."
  },
  "es": {
    "title": "Generación de títulos de papel",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Spanish. My abstract is \"XXX\", my key words are \"XXX\".",
    "description": "Le proporcionaré el resumen y las palabras clave de un artículo científico en cualquier idioma y usted detectará el idioma y responderá en el mismo idioma. Su tarea es proporcionarme títulos de artículos científicos en el mismo idioma basados en resúmenes y palabras clave. El título de un artículo científico debe ser conciso, claro e informativo. Debe evitar palabras como investigación, investigación, desarrollo u observación. Asegúrate de que el titular capte el corazón de tu audiencia de inmediato.",
    "remark": "Genere un título de tesis basado en el resumen y las palabras clave. Contribución de @ScenerorSun, citado de Station B @沙蜜粥巴。"
  },
  "fr": {
    "title": "Génération d'un titre de thèse",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in French. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "Je vous fournirai le résumé et les mots-clés d'un article scientifique dans n'importe quelle langue, et vous détecterez cette langue et répondrez dans la même langue. Votre tâche consiste à me fournir le titre de l'article scientifique sur la base du résumé et des mots-clés dans la même langue. Le titre de l'article scientifique doit être concis, clair et informatif. Vous devez éviter d'utiliser des mots tels que recherche, investigation, développement ou observation. Veillez à ce que le titre capte immédiatement l'attention du public.",
    "remark": "Générer un titre d'article basé sur le résumé et les mots-clés. Contribution de @ScenerorSun, citée sur le site B @Yams Potpourri."
  },
  "de": {
    "title": "Erstellung eines Titels für die Dissertation",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in German. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "Ich gebe Ihnen die Zusammenfassung und die Schlüsselwörter einer wissenschaftlichen Arbeit in einer beliebigen Sprache, und Sie werden diese Sprache erkennen und in derselben Sprache antworten. Ihre Aufgabe ist es, mir den Titel der wissenschaftlichen Arbeit auf der Grundlage der Zusammenfassung und der Schlüsselwörter in derselben Sprache zu nennen. Der Titel der wissenschaftlichen Arbeit sollte prägnant, klar und informativ sein. Sie sollten Wörter wie Forschung, Untersuchung, Entwicklung oder Beobachtung vermeiden. Achten Sie darauf, dass der Titel das Publikum sofort fesselt.",
    "remark": "Generieren Sie einen Titel für einen Artikel auf der Grundlage der Zusammenfassung und der Schlüsselwörter. Beitrag von @ScenerorSun, zitiert auf Website B @Yams Potpourri."
  },
  "it": {
    "title": "Generazione del titolo della carta",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Italian. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "Ti fornirò l&#39;abstract e le parole chiave di un articolo scientifico in qualsiasi lingua e tu rileverai la lingua e risponderai nella stessa lingua. Il tuo compito è fornirmi titoli di articoli scientifici nella stessa lingua sulla base di abstract e parole chiave. Il titolo di un articolo scientifico dovrebbe essere conciso, chiaro e informativo. Dovresti evitare parole come ricerca, indagine, sviluppo o osservazione. Assicurati che il titolo catturi immediatamente il cuore del tuo pubblico.",
    "remark": "Genera un titolo di tesi basato sull&#39;abstract e sulle parole chiave. Contributo di @ScenerorSun, citato da Station B @沙蜜粥巴。"
  },
  "ru": {
    "title": "Генерация заголовка статьи",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Russian. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "Я предоставлю вам аннотацию и ключевые слова научной статьи на любом языке, а вы определите язык и ответите на том же языке. Ваша задача предоставить мне названия научных работ на том же языке на основе аннотаций и ключевых слов. Название научной работы должно быть кратким, четким и информативным. Вам следует избегать таких слов, как исследование, расследование, разработка или наблюдение. Убедитесь, что заголовок сразу же захватывает сердце вашей аудитории.",
    "remark": "Создайте название диссертации на основе аннотации и ключевых слов. Вклад от @ScenerorSun, цитата из Station B @沙蜜粥巴。"
  },
  "pt": {
    "title": "Geração de título de papel",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Portuguese. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "Fornecerei a você o resumo e as palavras-chave de um artigo científico em qualquer idioma e você detectará o idioma e responderá no mesmo idioma. Sua tarefa é me fornecer títulos de artigos científicos no mesmo idioma com base no resumo e palavras-chave. O título de um artigo científico deve ser conciso, claro e informativo. Você deve evitar palavras como pesquisa, investigação, desenvolvimento ou observação. Certifique-se de que o título prenda o coração do seu público imediatamente.",
    "remark": "Gere um título de tese com base no resumo e nas palavras-chave. Contribuição de @ScenerorSun, citado da Estação B @沙蜜粥巴。"
  },
  "hi": {
    "title": "पेपर शीर्षक जनरेशन",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Hindi. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "मैं आपको किसी भी भाषा में एक वैज्ञानिक पेपर के सार और मुख्य शब्द प्रदान करूंगा और आप उस भाषा का पता लगा लेंगे और उसी भाषा में उत्तर देंगे। आपका कार्य मुझे सार और कीवर्ड के आधार पर उसी भाषा में वैज्ञानिक पत्रों के शीर्षक प्रदान करना है। वैज्ञानिक पेपर का शीर्षक संक्षिप्त, स्पष्ट और सूचनाप्रद होना चाहिए। आपको अनुसंधान, जांच, विकास या अवलोकन जैसे शब्दों से बचना चाहिए। सुनिश्चित करें कि शीर्षक तुरंत आपके दर्शकों का दिल जीत ले।",
    "remark": "सार और कीवर्ड के आधार पर थीसिस शीर्षक तैयार करें। @ScenerorSun का योगदान, स्टेशन B @沙蜜粥巴 से उद्धृत।"
  },
  "ar": {
    "title": "توليد عنوان الورق",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Arabic. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "سأقدم لك الملخصات والكلمات الرئيسية لورقة علمية بأي لغة وسوف تكتشف اللغة وترد بنفس اللغة. مهمتك هي أن تزودني بعناوين أوراق علمية بنفس اللغة بناءً على الملخصات والكلمات الرئيسية. يجب أن يكون عنوان الورقة العلمية موجزًا وواضحًا وغنيًا بالمعلومات. يجب تجنب كلمات مثل البحث أو التحقيق أو التطوير أو الملاحظة. تأكد من أن العنوان يستحوذ على قلب جمهورك على الفور.",
    "remark": "قم بإنشاء عنوان أطروحة بناءً على الملخص والكلمات الرئيسية. مساهمة منScenerorSun ، مقتبسة من المحطة B @ 沙 蜜 粥 巴。"
  },
  "bn": {
    "title": "কাগজ শিরোনাম প্রজন্ম",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Bengali. My abstract is \"XXX\", my key words are \"XXX\"..",
    "description": "আমি আপনাকে যেকোন ভাষায় একটি বৈজ্ঞানিক কাগজের বিমূর্ত এবং মূল শব্দ সরবরাহ করব এবং আপনি সেই ভাষা সনাক্ত করবেন এবং একই ভাষায় উত্তর দেবেন। আপনার কাজ হল বিমূর্ত এবং কীওয়ার্ডের উপর ভিত্তি করে আমাকে একই ভাষায় বৈজ্ঞানিক গবেষণাপত্রের শিরোনাম প্রদান করা। একটি বৈজ্ঞানিক গবেষণাপত্রের শিরোনাম সংক্ষিপ্ত, স্পষ্ট এবং তথ্যপূর্ণ হওয়া উচিত। আপনার গবেষণা, তদন্ত, উন্নয়ন বা পর্যবেক্ষণের মতো শব্দগুলি এড়ানো উচিত। শিরোনাম অবিলম্বে আপনার শ্রোতাদের হৃদয় দখল নিশ্চিত করুন.",
    "remark": "বিমূর্ত এবং কীওয়ার্ডের উপর ভিত্তি করে একটি থিসিস শিরোনাম তৈরি করুন। @ScenerorSun থেকে অবদান, স্টেশন B @沙蜜粥巴 থেকে উদ্ধৃত।"
  },
  "website": null,
  "tags": [
    "contribute",
    "write"
  ],
  "id": 258,
  "weight": 293
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
