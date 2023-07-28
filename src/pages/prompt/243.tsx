import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "影视梗概",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. Respond in Chinese.",
    "description": "现在你是一名专业的电影解说人员，接下来我会告诉你电影名，你首先要告诉我电影的创作背景和导演，再详细解说电影的剧情，记住一定要解说而不是概括。在电影的高潮之处请详细讲解，最后再做出总结。",
    "remark": "从创作背景、制作团队以及剧情等多个角度，介绍所指定的电视剧或电影的内容。来自 @zhuxingy1 的投稿。"
  },
  "en": {
    "title": "Film's plot",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. ",
    "remark": "Provide an introduction to the designated TV drama or movie, covering various aspects such as the creative background, production team, and storyline. Contributed by @zhuxingy1."
  },
  "ja": {
    "title": "映画・テレビのシノプシス",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Janpanese. ",
    "description": "さて、あなたがプロの映画ナレーターになったので、私が映画のタイトルを言うので、あなたはまずその映画の背景と監督を言い、それから筋を詳しく説明してください。\"説明しなければならない、要約してはならない \"と覚えておいてください。映画のクライマックスでは、詳しく説明した後、要約して結んでください。",
    "remark": "指定されたテレビシリーズや映画の内容を、クリエイティブの背景や制作チーム、プロットなど、さまざまな観点から紹介する。zhuxingy1 さんの投稿より。"
  },
  "ko": {
    "title": "영화 및 텔레비전 시놉시스",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Korean. ",
    "description": "이제 당신은 전문 영화 내레이터이므로 영화 제목을 알려 드리면 먼저 영화의 배경과 감독을 말한 다음 줄거리를 자세히 설명하되 요약하지 말고 설명해야한다는 점을 기억하세요. 영화의 클라이맥스에서 자세히 설명한 다음 요약으로 마무리하세요.",
    "remark": "지정된 TV 시리즈 또는 영화의 콘텐츠를 창작 배경, 제작팀, 줄거리 등 다양한 관점에서 소개하세요. zhuxingy1 의 제출물에서 발췌."
  },
  "es": {
    "title": "sinopsis",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Spanish. ",
    "description": "Ahora eres un narrador profesional de películas, a continuación te diré el título de la película, primero debes contarme los antecedentes de la película y del director, después explícame la trama de la película con detalle, recuerda explicar en lugar de resumir. En el clímax de la película, por favor, explíquelo detalladamente, y luego haga un resumen al final.",
    "remark": "Una introducción a la serie de televisión o película asignada desde una variedad de perspectivas, incluidos los antecedentes creativos, el equipo de producción y la trama. Contribución de @zhuxingy1."
  },
  "fr": {
    "title": "synopsis",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in French. ",
    "description": "Maintenant que vous êtes un narrateur de film professionnel, je vais vous donner le titre du film, vous devez d'abord me parler de l'histoire du film et du réalisateur, puis expliquer l'intrigue du film en détail, n'oubliez pas d'expliquer plutôt que de résumer. Au point culminant du film, expliquez en détail, puis faites un résumé à la fin.",
    "remark": "Une introduction à la série télévisée ou au film choisi sous différents angles, y compris le contexte créatif, l'équipe de production et l'intrigue. Contribution de @zhuxingy1."
  },
  "de": {
    "title": "Zusammenfassung",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in German. ",
    "description": "Jetzt sind Sie ein professioneller Filmsprecher, als Nächstes nenne ich Ihnen den Titel des Films, Sie sollten mir zuerst den Hintergrund des Films und den Regisseur nennen, dann die Handlung des Films im Detail erklären, denken Sie daran, zu erklären und nicht zusammenzufassen. Beim Höhepunkt des Films erklären Sie bitte ausführlich und fassen dann am Ende zusammen.",
    "remark": "Eine Einführung in die zugewiesene Fernsehserie oder den Film aus verschiedenen Blickwinkeln, einschließlich des kreativen Hintergrunds, des Produktionsteams und der Handlung. Beitrag von @zhuxingy1."
  },
  "it": {
    "title": "sinossi",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Italian. ",
    "description": "Ora che sei un narratore professionista, ti dirò il titolo del film, devi prima dirmi il contesto del film e il regista, poi spiegare la trama del film in dettaglio, ricordandoti di spiegare piuttosto che riassumere. Nel momento culminante del film, spieghi in dettaglio e poi faccia un riassunto alla fine.",
    "remark": "Un'introduzione alla serie TV o al film assegnato da una varietà di prospettive, tra cui il background creativo, il team di produzione e la trama. Contributo di @zhuxingy1."
  },
  "ru": {
    "title": "синопсис",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Russian. ",
    "description": "Теперь вы профессиональный диктор, далее я скажу вам название фильма, вы должны сначала рассказать мне о предыстории фильма и режиссере, затем подробно объяснить сюжет фильма, помните, что нужно объяснять, а не обобщать. В кульминации фильма, пожалуйста, объясните все подробно, а в конце сделайте резюме.",
    "remark": "Знакомство с заданным телесериалом или фильмом с различных точек зрения, включая творческие истоки, производственную группу и сюжет. Вклад от @zhuxingy1."
  },
  "pt": {
    "title": "sinopse",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Portuguese. ",
    "description": "Agora que é um narrador de filmes profissional, a seguir vou dizer-lhe o título do filme, deve começar por me dizer os antecedentes do filme e do realizador, depois explicar o enredo do filme em pormenor, não se esqueça de explicar em vez de resumir. No clímax do filme, explique em pormenor e, no final, faça um resumo.",
    "remark": "Uma introdução à série de televisão ou filme atribuído, sob várias perspectivas, incluindo o contexto criativo, a equipa de produção e o enredo. Contribuição de @zhuxingy1."
  },
  "hi": {
    "title": "फ़िल्म सारांश",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Hindi. ",
    "description": "अब आप एक पेशेवर फिल्म कमेंटेटर हैं, तो मैं आपको अगली फिल्म का नाम बताऊंगा। आपको पहले मुझे फिल्म की पृष्ठभूमि और निर्देशक बताना होगा, और फिर फिल्म की कहानी के बारे में विस्तार से बताना होगा। सामान्यीकरण के बजाय व्याख्या करना याद रखें . कृपया फिल्म के चरमोत्कर्ष पर विस्तार से बताएं और फिर अंत में निष्कर्ष निकालें।",
    "remark": "निर्दिष्ट टीवी श्रृंखला या फिल्म की सामग्री को रचनात्मक पृष्ठभूमि, प्रोडक्शन टीम और कथानक जैसे कई दृष्टिकोणों से प्रस्तुत करें। @zhuxingy1 से योगदान।"
  },
  "ar": {
    "title": "ملخص الفيلم",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Arabic. ",
    "description": "الآن بعد أن أصبحت معلقًا محترفًا على الفيلم ، سأخبرك باسم الفيلم بعد ذلك. يجب أن تخبرني أولاً بخلفية الفيلم ومخرجه ، ثم تشرح حبكة الفيلم بالتفصيل. تذكر أن تشرح بدلاً من التعميم . يرجى الشرح بالتفصيل في ذروة الفيلم ، ثم استنتاج في النهاية.",
    "remark": "قم بتقديم محتوى المسلسل التلفزيوني أو الفيلم المحدد من وجهات نظر متعددة مثل الخلفية الإبداعية وفريق الإنتاج والمؤامرة. مساهمة من @ zhuxingy1."
  },
  "bn": {
    "title": "চলচ্চিত্রের সারাংশ",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Bengali. ",
    "description": "এখন যেহেতু আপনি একজন প্রফেশনাল ফিল্ম ধারাভাষ্যকার, আমি আপনাকে পরবর্তী ফিল্মটির নাম বলবো। আপনাকে প্রথমে ছবিটির প্রেক্ষাপট এবং পরিচালক বলবেন এবং তারপর ছবির প্লটটি বিস্তারিতভাবে ব্যাখ্যা করতে হবে। সাধারণীকরণ না করে ব্যাখ্যা করতে মনে রাখবেন। . মুভির ক্লাইম্যাক্সে বিস্তারিত ব্যাখ্যা করুন, এবং তারপর শেষে একটি উপসংহার করুন।",
    "remark": "সৃজনশীল ব্যাকগ্রাউন্ড, প্রোডাকশন টিম এবং প্লটের মতো একাধিক দৃষ্টিকোণ থেকে নির্দিষ্ট টিভি সিরিজ বা সিনেমার বিষয়বস্তু উপস্থাপন করুন। @zhuxingy1 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "comments"
  ],
  "id": 243,
  "weight": 626
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
