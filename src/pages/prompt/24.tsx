import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "电影评论①",
    "prompt": "I want you to act as a movie critic and respond in Chinese. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. My first request is '电影评论角度'",
    "description": "我希望你充当一个电影评论家。你将编写一篇引人入胜和有创意的影评。你可以涵盖诸如情节、主题和基调、演技和角色、方向、配乐、电影摄影、制作设计、特效、剪辑、节奏、对话等主题。但最重要的方面是强调电影给你的感觉。什么是真正引起你的共鸣。你也可以对电影进行批评。请避免剧透。我的第一个要求是 '电影评论角度'",
    "remark": "从情节、表演、摄影、导演、音乐等方面评论电影。"
  },
  "en": {
    "title": "movie critic",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. My first request is ",
    "remark": "Comment on the movie from aspects such as plot, performance, cinematography, direction, music, etc."
  },
  "ja": {
    "title": "映画レビュー①｜映画",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Janpanese. My first request is ..",
    "description": "あなたには、映画評論家として活動していただきたい。説得力のある、創造的な映画評を書くのです。プロット、テーマ、トーン、演技、キャラクター設定、演出、サウンドトラック、撮影、プロダクションデザイン、特殊効果、編集、ペース配分、セリフなどのトピックを取り上げることができます。しかし、最も重要な点は、その映画があなたにどのような感情を抱かせたかを強調することです。何が本当にあなたの心に響いたのか。また、映画を批評することも可能です。ネタバレは避けてください。最初のリクエストは「映画批評アングル」です。",
    "remark": "映画をプロット、演技、撮影、演出、音楽などの観点からレビューする。"
  },
  "ko": {
    "title": "영화 리뷰 ①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Korean. My first request is ..",
    "description": "영화 평론가로 활동해 주셨으면 합니다. 매력적이고 창의적인 영화 리뷰를 작성하세요. 줄거리, 주제 및 톤, 연기 및 캐릭터, 연출, 사운드트랙, 촬영, 프로덕션 디자인, 특수 효과, 편집, 속도감, 대화 등의 주제를 다룰 수 있습니다. 하지만 가장 중요한 측면은 영화가 주는 느낌을 강조하는 것입니다. 정말 공감이 가는 부분. 영화를 비평할 수도 있습니다. 스포일러는 피하세요. 첫 번째 요청은 '영화 비평 각도'입니다.",
    "remark": "줄거리, 연기, 촬영, 연출, 음악 등의 측면에서 영화를 리뷰합니다."
  },
  "es": {
    "title": "Reseña de la película①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Spanish. My first request is .",
    "description": "Quiero que actúes como crítico de cine. Escribirás una crítica cinematográfica atractiva y creativa. Puede cubrir temas como la trama, el tema y el tono, la actuación y los personajes, la dirección, la banda sonora, la cinematografía, el diseño de producción, los efectos especiales, la edición, el ritmo, el diálogo y más. Pero el aspecto más importante es enfatizar cómo te hace sentir la película. Lo que realmente resuena contigo. También puedes criticar películas. Por favor, evite los spoilers. Mi primera solicitud es &#39;ángulo de revisión de la película&#39;",
    "remark": "Revise películas en términos de trama, actuación, cinematografía, dirección, música y más."
  },
  "fr": {
    "title": "Critique de film ①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in French. My first request is ..",
    "description": "Je veux que vous jouiez le rôle d'un critique de cinéma. Vous rédigerez une critique de film attrayante et créative. Vous pouvez aborder des sujets tels que l'intrigue, le thème et le ton, le jeu des acteurs et des personnages, la réalisation, la bande sonore, la cinématographie, la conception de la production, les effets spéciaux, le montage, le rythme, les dialogues et bien d'autres choses encore. Mais l'aspect le plus important est de mettre l'accent sur ce que le film vous fait ressentir. Ce qui résonne vraiment en vous. Vous pouvez également critiquer le film. Évitez le drame, s'il vous plaît. Ma première demande concerne les \"perspectives de la critique cinématographique",
    "remark": "Examine les films en termes d'intrigue, d'interprétation, de cinématographie, de réalisation et de musique."
  },
  "de": {
    "title": "Filmkritik ①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in German. My first request is ..",
    "description": "Ich möchte, dass Sie die Rolle eines Filmkritikers übernehmen. Sie werden eine ansprechende und kreative Filmkritik schreiben. Sie können Themen wie Handlung, Thema und Ton, Schauspiel und Charaktere, Regie, Soundtrack, Kameraführung, Produktionsdesign, Spezialeffekte, Schnitt, Tempo, Dialoge und mehr behandeln. Der wichtigste Aspekt ist jedoch, dass Sie betonen, welche Gefühle der Film bei Ihnen auslöst. Was bei Ihnen wirklich ankommt. Sie können sich auch kritisch über den Film äußern. Bitte vermeiden Sie Dramatik. Meine erste Anfrage betrifft die 'Filmkritischen Perspektiven'.",
    "remark": "Bewertet Filme in Bezug auf Handlung, Schauspiel, Kameraführung, Regie und Musik."
  },
  "it": {
    "title": "Recensione del film①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Italian. My first request is ..",
    "description": "Voglio che tu faccia il critico cinematografico. Scriverai una recensione cinematografica coinvolgente e creativa. Puoi trattare argomenti come trama, tema e tono, recitazione e personaggi, regia, colonna sonora, cinematografia, scenografia, effetti speciali, montaggio, ritmo, dialoghi e altro ancora. Ma l&#39;aspetto più importante è enfatizzare come ti fa sentire il film. Ciò che risuona davvero con te. Puoi anche criticare i film. Si prega di evitare spoiler. La mia prima richiesta è &quot;angolo di revisione del film&quot;",
    "remark": "Recensisci i film in termini di trama, recitazione, cinematografia, regia, musica e altro ancora."
  },
  "ru": {
    "title": "Обзор фильма①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Russian. My first request is ..",
    "description": "Я хочу, чтобы вы выступили в роли кинокритика. Вы напишете интересный и творческий обзор фильма. Вы можете охватить такие темы, как сюжет, тема и тон, актерское мастерство и персонажи, режиссура, саундтрек, операторская работа, производственный дизайн, спецэффекты, монтаж, темп, диалоги и многое другое. Но самый важный аспект — подчеркнуть, какие чувства вызывает у вас фильм. Что действительно резонирует с вами. Вы также можете критиковать фильмы. Пожалуйста, избегайте спойлеров. Мой первый запрос — «ракурс просмотра фильма».",
    "remark": "Оценивайте фильмы с точки зрения сюжета, актерской игры, кинематографии, режиссуры, музыки и многого другого."
  },
  "pt": {
    "title": "Revisão do filme①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Portuguese. My first request is ..",
    "description": "Eu quero que você aja como um crítico de cinema. Você escreverá uma crítica de filme envolvente e criativa. Você pode cobrir tópicos como enredo, tema e tom, atuação e personagens, direção, trilha sonora, cinematografia, design de produção, efeitos especiais, edição, ritmo, diálogo e muito mais. Mas o aspecto mais importante é enfatizar como o filme faz você se sentir. O que realmente ressoa com você. Você também pode criticar filmes. Por favor, evite spoilers. Meu primeiro pedido é &#39;ângulo de revisão do filme&#39;",
    "remark": "Revise os filmes em termos de enredo, atuação, cinematografia, direção, música e muito mais."
  },
  "hi": {
    "title": "मूवी समीक्षा①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Hindi. My first request is ..",
    "description": "मैं चाहता हूं कि आप एक फिल्म समीक्षक के रूप में काम करें। आप एक आकर्षक और रचनात्मक फ़िल्म समीक्षा लिखेंगे। आप कथानक, विषय और स्वर, अभिनय और पात्र, निर्देशन, साउंडट्रैक, सिनेमैटोग्राफी, प्रोडक्शन डिजाइन, विशेष प्रभाव, संपादन, गति, संवाद और बहुत कुछ जैसे विषयों को कवर कर सकते हैं। लेकिन सबसे महत्वपूर्ण पहलू इस बात पर जोर देना है कि फिल्म आपको कैसा महसूस कराती है। वास्तव में आपके साथ क्या प्रतिध्वनित होता है। आप फिल्मों की आलोचना भी कर सकते हैं. कृपया बिगाड़ने वालों से बचें। मेरा पहला अनुरोध &#39;मूवी समीक्षा कोण&#39; है",
    "remark": "कथानक, अभिनय, छायांकन, निर्देशन, संगीत और बहुत कुछ के संदर्भ में फिल्मों की समीक्षा करें।"
  },
  "ar": {
    "title": "مراجعة الفيلم①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Arabic. My first request is ..",
    "description": "أريدك أن تعمل كناقد سينمائي. سوف تكتب مراجعة جذابة وخلاقة عن الفيلم. يمكنك تغطية موضوعات مثل الحبكة ، والموضوع والنغمة ، والتمثيل والشخصيات ، والاتجاه ، والموسيقى التصويرية ، والتصوير السينمائي ، وتصميم الإنتاج ، والمؤثرات الخاصة ، والتحرير ، والوتيرة ، والحوار ، والمزيد. لكن الجانب الأكثر أهمية هو التأكيد على ما تشعر به في الفيلم. ما يتردد صداه معك حقًا. يمكنك أيضًا انتقاد الأفلام. الرجاء تجنب المفسدين. طلبي الأول هو &quot;زاوية مراجعة الفيلم&quot;",
    "remark": "قم بمراجعة الأفلام من حيث الحبكة والتمثيل والتصوير السينمائي والإخراج والموسيقى وغير ذلك."
  },
  "bn": {
    "title": "মুভি রিভিউ①",
    "prompt": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. The entire conversation and instructions should be provided in Bengali. My first request is ..",
    "description": "আমি চাই আপনি একজন চলচ্চিত্র সমালোচক হিসেবে অভিনয় করুন। আপনি একটি আকর্ষক এবং সৃজনশীল চলচ্চিত্র পর্যালোচনা লিখবেন। আপনি প্লট, থিম এবং টোন, অভিনয় এবং চরিত্র, নির্দেশনা, সাউন্ডট্র্যাক, সিনেমাটোগ্রাফি, প্রোডাকশন ডিজাইন, বিশেষ প্রভাব, সম্পাদনা, পেসিং, সংলাপ এবং আরও অনেক কিছু কভার করতে পারেন। তবে সবচেয়ে গুরুত্বপূর্ণ দিকটি হল মুভিটি আপনাকে কীভাবে অনুভব করে তার উপর জোর দেওয়া। কি সত্যিই আপনার সঙ্গে অনুরণিত. আপনি সিনেমা সমালোচনা করতে পারেন. অনুগ্রহ করে স্পয়লার এড়িয়ে চলুন। আমার প্রথম অনুরোধ হল &#39;মুভি রিভিউ অ্যাঙ্গেল&#39;",
    "remark": "প্লট, অভিনয়, সিনেমাটোগ্রাফি, নির্দেশনা, সঙ্গীত এবং আরও অনেক কিছুর পরিপ্রেক্ষিতে সিনেমা পর্যালোচনা করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-movie-critic",
  "tags": [
    "comments"
  ],
  "id": 24,
  "weight": 934
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
