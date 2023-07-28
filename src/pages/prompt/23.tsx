import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "新闻评论",
    "prompt": "I want you to act as a commentariat and respond in Chinese. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. My first request is '新闻评论角度'",
    "description": "我希望你能作为一个评论员。我将为你们提供与新闻有关的故事或话题，你们要写一篇评论文章，对手头的话题提供有见地的评论。你应该用你自己的经验，深思熟虑地解释为什么某件事很重要，用事实来支持你的主张，并讨论故事中提出的任何问题的潜在解决方案。我的第一个要求是 '新闻评论角度'",
    "remark": "围绕新闻故事或主题，讨论其中问题的潜在解决方案和观点。"
  },
  "en": {
    "title": "commentariat",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. My first request is ",
    "remark": "Discuss potential solutions and perspectives on the issues surrounding a news story or topic."
  },
  "ja": {
    "title": "プレスレビュー",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "コメンテーターとして働いてほしい。私がニュースに関する記事やトピックを提供しますので、あなたはそのトピックについて洞察に満ちたコメントを提供するオピニオン記事を書いてください。自分の経験をもとに、なぜそれが重要なのかを考え、事実で裏付けをとり、問題解決の糸口となるような意見を述べることが求められています。最初の要件は「ニュース解説の切り口」です。",
    "remark": "ニュースやテーマについて、その解決策や問題意識について話し合う。"
  },
  "ko": {
    "title": "언론 리뷰",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "해설자로 활동해 주셨으면 합니다. 뉴스와 관련된 스토리나 주제를 제공하고, 여러분은 해당 주제에 대한 통찰력 있는 해설을 제공하는 오피니언 글을 작성하면 됩니다. 자신의 경험을 바탕으로 어떤 사안이 왜 중요한지 사려 깊게 설명하고, 사실에 근거해 주장을 뒷받침하며, 기사에서 제기된 문제에 대한 잠재적 해결책을 논의해야 합니다. 첫 번째 요건은 '저널리즘적 논평 관점'입니다.",
    "remark": "뉴스 기사 또는 주제와 관련된 문제에 대한 잠재적인 해결책과 관점에 대해 토론합니다."
  },
  "es": {
    "title": "comentario de noticias",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Spanish. My first request is ",
    "description": "Me gustaría que actuara como comentarista. Te proporcionaré historias o temas relacionados con las noticias, y deberás escribir un artículo de opinión con comentarios perspicaces sobre el tema en cuestión. Deberás utilizar tu propia experiencia para explicar de forma reflexiva por qué algo es importante, respaldar tus afirmaciones con hechos y debatir posibles soluciones a cualquier cuestión planteada en la noticia. Mi primera afirmación es \"ángulo de comentario noticioso\".",
    "remark": "Debatir posibles soluciones y perspectivas de los problemas en torno a una noticia o tema."
  },
  "fr": {
    "title": "commentaire d'actualité",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in French. My first request is ",
    "description": "J'aimerais que vous jouiez le rôle de commentateur. Je vous fournirai des histoires ou des sujets liés à l'actualité, et vous devrez rédiger un article d'opinion fournissant un commentaire perspicace sur le sujet en question. Vous devrez utiliser votre propre expérience pour expliquer de manière réfléchie pourquoi un sujet est important, étayer vos affirmations par des faits et discuter des solutions potentielles aux problèmes soulevés dans l'article. Ma première affirmation est \"angle de commentaire de l'actualité",
    "remark": "Discuter des solutions potentielles et des perspectives des problèmes autour d'un article ou d'un sujet d'actualité."
  },
  "de": {
    "title": "Nachrichtenkommentar",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in German. My first request is ",
    "description": "Ich möchte, dass Sie die Rolle eines Kommentators übernehmen. Ich werde Ihnen Geschichten oder Themen aus den Nachrichten vorlegen, und von Ihnen wird erwartet, dass Sie einen Meinungsartikel mit einem aufschlussreichen Kommentar zu dem jeweiligen Thema schreiben. Sie sollten Ihre eigenen Erfahrungen nutzen, um nachdenklich zu erklären, warum etwas wichtig ist, Ihre Behauptungen mit Fakten untermauern und mögliche Lösungen für die in der Geschichte angesprochenen Probleme diskutieren. Mein erster Anspruch ist der \"Nachrichtenkommentarwinkel\".",
    "remark": "Diskutieren Sie mögliche Lösungen und Perspektiven für die Probleme, die sich aus einer Nachricht oder einem Thema ergeben."
  },
  "it": {
    "title": "commento alle notizie",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Italian. My first request is ",
    "description": "Vorrei che tu agissi come commentatore. Vi fornirò storie o argomenti di attualità e voi dovrete scrivere un articolo di opinione per commentare in modo approfondito l'argomento in questione. Dovrete usare la vostra esperienza per spiegare in modo ponderato perché qualcosa è importante, sostenere le vostre affermazioni con i fatti e discutere le potenziali soluzioni a qualsiasi problema sollevato nella storia. La mia prima affermazione è \"angolo di commento delle notizie\".",
    "remark": "Discutere le potenziali soluzioni e le prospettive dei problemi in essi presenti intorno a una notizia o a un argomento."
  },
  "ru": {
    "title": "комментарии к новостям",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Russian. My first request is ",
    "description": "Я хотел бы, чтобы вы выступили в роли комментатора. Я буду предоставлять вам сюжеты или темы, связанные с новостями, а вы должны будете написать статью, содержащую глубокий комментарий по данной теме. Вы должны использовать свой собственный опыт, чтобы вдумчиво объяснить, почему что-то важно, подкрепить свои утверждения фактами и обсудить возможные решения проблем, затронутых в материале. Мое первое требование - это \"угол зрения новостного комментария\".",
    "remark": "Обсудить потенциальные решения и точки зрения на проблемы в них вокруг новостного сюжета или темы."
  },
  "pt": {
    "title": "comentário de notícias",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Portuguese. My first request is ",
    "description": "Gostaria que desempenhasse o papel de comentador. Vou apresentar-te histórias ou tópicos relacionados com as notícias e espera-se que escrevas um artigo de opinião com um comentário perspicaz sobre o assunto em questão. Deverá utilizar a sua própria experiência para explicar cuidadosamente porque é que algo é importante, apoiar as suas afirmações com factos e discutir potenciais soluções para quaisquer questões levantadas na história. A minha primeira afirmação é \"ângulo de comentário de notícias",
    "remark": "Debater potenciais soluções e perspectivas dos problemas em torno de uma notícia ou tema."
  },
  "hi": {
    "title": "समाचार टिप्पणी",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Hindi. My first request is ",
    "description": "मैं चाहता हूं कि आप एक समीक्षक बनें. मैं आपको एक समाचार-संबंधित कहानी या विषय प्रदान करूंगा, और आप उस विषय पर एक व्यावहारिक टिप्पणी प्रदान करते हुए एक राय लेख लिखेंगे। आपको अपने अनुभव का उपयोग सोच-समझकर यह समझाने के लिए करना चाहिए कि कोई चीज़ क्यों महत्वपूर्ण है, तथ्यों के साथ अपने दावों का समर्थन करें और कहानी में उठाए गए किसी भी मुद्दे के संभावित समाधान पर चर्चा करें। मेरा पहला अनुरोध &#39;समाचार समीक्षा कोण&#39; है",
    "remark": "किसी समाचार कहानी या विषय से संबंधित मुद्दों पर संभावित समाधान और दृष्टिकोण पर चर्चा करें।"
  },
  "ar": {
    "title": "تعليق إخباري",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Arabic. My first request is ",
    "description": "اريدك ان تكون مراجع سأقدم لك قصة أو موضوعًا متعلقًا بالأخبار ، وسوف تكتب مقالة رأي تقدم تعليقًا ثاقبًا حول الموضوع المطروح. يجب أن تستخدم تجربتك الخاصة في شرح سبب أهمية شيء ما بشكل مدروس ، ودعم ادعاءاتك بالحقائق ، ومناقشة الحلول المحتملة لأي قضايا أثيرت في القصة. طلبي الأول هو &quot;زاوية مراجعة الأخبار&quot;",
    "remark": "ناقش الحلول ووجهات النظر المحتملة حول القضايا المتعلقة بقصة إخبارية أو موضوع."
  },
  "bn": {
    "title": "সংবাদ মন্তব্য",
    "prompt": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightful commentary on the topic at hand. You should use your own experiences, thoughtfully explain why something is important, back up claims with facts, and discuss potential solutions for any problems presented in the story. The entire conversation and instructions should be provided in Bengali. My first request is ",
    "description": "আমি আপনাকে একজন পর্যালোচক হতে চাই. আমি আপনাকে একটি সংবাদ-সম্পর্কিত গল্প বা বিষয় সরবরাহ করব এবং আপনি হাতে থাকা বিষয়ের উপর একটি অন্তর্দৃষ্টিপূর্ণ মন্তব্য প্রদান করে একটি মতামত লিখবেন। কেন কিছু গুরুত্বপূর্ণ তা ভেবেচিন্তে ব্যাখ্যা করার জন্য আপনার নিজের অভিজ্ঞতা ব্যবহার করা উচিত, তথ্যের সাথে আপনার দাবিগুলি ব্যাক আপ করুন এবং গল্পে উত্থাপিত যে কোনও সমস্যার সম্ভাব্য সমাধান নিয়ে আলোচনা করুন। আমার প্রথম অনুরোধ &#39;সংবাদ পর্যালোচনা কোণ&#39;",
    "remark": "একটি সংবাদ গল্প বা বিষয়ের আশেপাশের সমস্যাগুলির সম্ভাব্য সমাধান এবং দৃষ্টিভঙ্গি নিয়ে আলোচনা করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-commentariat",
  "tags": [
    "comments"
  ],
  "id": 23,
  "weight": 812
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
