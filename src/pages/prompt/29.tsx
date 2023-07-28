import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "期刊评审",
    "prompt": "I want you to act as a journal reviewer and respond in Chinese. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. My first suggestion request is '期刊主题'",
    "description": "我想让你担任期刊评审员。你需要审查和评论提交出版的文章，批判性地评估其研究、方法、方法论和结论，并对其优点和缺点提出建设性的批评。我的第一个建议要求是 '期刊主题'",
    "remark": "对提交的出版物文章进行审查和评论。"
  },
  "en": {
    "title": "journal reviewer",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. My first suggestion request is '期刊主题'",
    "remark": "Review and comment on publication articles."
  },
  "ja": {
    "title": "ジャーナルレビュー",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is '期刊主题'.",
    "description": "ジャーナルレビュアーとして働いてほしい。投稿された論文を査読・コメントし、その研究内容、手法、方法論、結論を批判的に評価し、長所と短所を建設的に批評していただくことになります。私が提案する最初の条件は「ジャーナルテーマ」です。",
    "remark": "投稿された論文の査読とコメント。"
  },
  "ko": {
    "title": "저널 리뷰",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Korean. My first suggestion request is '期刊主题'.",
    "description": "저널 리뷰어로 활동해 주셨으면 합니다. 출판을 위해 제출된 논문을 검토하고 논평하며 연구, 방법, 방법론 및 결론을 비판적으로 평가하고 논문의 강점과 약점에 대한 건설적인 비평을 제공해야 합니다. 제안서의 첫 번째 요건은 '저널 주제'입니다.",
    "remark": "게시를 위해 제출된 글을 검토하고 댓글을 달 수 있습니다."
  },
  "es": {
    "title": "Revista",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Spanish. My first suggestion request is '期刊主题'.",
    "description": "Me gustaría que trabajaras como revisor de revistas. Tendrá que revisar y comentar los artículos enviados para su publicación, evaluando de forma crítica su investigación, métodos, metodología y conclusiones, y realizando una crítica constructiva de sus puntos fuertes y débiles. El primer requisito que le propongo es \"Temas de revistas\".",
    "remark": "Revisar y comentar los artículos presentados para su publicación."
  },
  "fr": {
    "title": "Revue de presse",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in French. My first suggestion request is '期刊主题'.",
    "description": "J'aimerais que vous travailliez en tant qu'examinateur de revues. Vous devrez examiner et commenter des articles soumis pour publication, en évaluant de manière critique leur recherche, leurs méthodes, leur méthodologie et leurs conclusions, et en formulant des critiques constructives sur leurs forces et leurs faiblesses. La première exigence que je propose est \"Thèmes de la revue",
    "remark": "Revoir et commenter les articles soumis pour publication."
  },
  "de": {
    "title": "Zeitschrift Review",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in German. My first suggestion request is '期刊主题'.",
    "description": "Ich möchte, dass Sie als Journal Reviewer arbeiten. Sie sollen Artikel, die zur Veröffentlichung eingereicht werden, überprüfen und kommentieren, ihre Forschung, Methoden, Methodik und Schlussfolgerungen kritisch bewerten und konstruktive Kritik an ihren Stärken und Schwächen üben. Meine erste vorgeschlagene Anforderung lautet 'Journal Topics' (Zeitschriftenthemen)",
    "remark": "Überprüfung und Kommentierung von zur Veröffentlichung eingereichten Artikeln."
  },
  "it": {
    "title": "Rassegna del giornale",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Italian. My first suggestion request is '期刊主题'.",
    "description": "Vorrei che lavorassi come revisore di riviste. Dovrete esaminare e commentare gli articoli presentati per la pubblicazione, valutandone criticamente la ricerca, i metodi, la metodologia e le conclusioni, e fornendo critiche costruttive sui loro punti di forza e di debolezza. Il primo requisito proposto è \"Argomenti delle riviste\".",
    "remark": "Rivedere e commentare gli articoli presentati per la pubblicazione."
  },
  "ru": {
    "title": "Обзор журнала",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Russian. My first suggestion request is '期刊主题'.",
    "description": "Я хотел бы, чтобы Вы работали в качестве рецензента журнала. Вы должны будете просматривать и комментировать статьи, представленные для публикации, критически оценивая их исследования, методы, методологию и выводы, а также давать конструктивную критику их сильных и слабых сторон. Первое предлагаемое мной требование - \"Тематика журнала\".",
    "remark": "Рецензирование и комментирование статей, представленных для публикации."
  },
  "pt": {
    "title": "Revista",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is '期刊主题'.",
    "description": "Gostaria que trabalhasse como revisor de revistas. Terá de rever e comentar artigos submetidos para publicação, avaliando criticamente a investigação, os métodos, a metodologia e as conclusões, e fazendo uma crítica construtiva dos seus pontos fortes e fracos. O primeiro requisito sugerido é \"Tópicos de periódicos",
    "remark": "Rever e comentar os artigos apresentados para publicação."
  },
  "hi": {
    "title": "जर्नल समीक्षा",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Hindi. My first suggestion request is '期刊主题'.",
    "description": "मैं चाहता हूं कि आप एक जर्नल समीक्षक के रूप में काम करें। आप प्रकाशन के लिए प्रस्तुत लेखों की समीक्षा और टिप्पणी करेंगे, उनके शोध, तरीकों, कार्यप्रणाली और निष्कर्षों का आलोचनात्मक मूल्यांकन करेंगे और उनकी ताकत और कमजोरियों की रचनात्मक आलोचना प्रदान करेंगे। मेरी पहली सुझाई गई आवश्यकता &#39;जर्नल विषय&#39; है",
    "remark": "प्रकाशन हेतु प्रस्तुत लेखों की समीक्षा करें और उन पर टिप्पणी करें।"
  },
  "ar": {
    "title": "مراجعة المجلة",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Arabic. My first suggestion request is '期刊主题'.",
    "description": "أريدك أن تعمل كمراجع للمجلة. ستقوم بمراجعة المقالات المقدمة للنشر والتعليق عليها ، وتقييم أبحاثهم وأساليبهم ومنهجيتهم واستنتاجاتهم بشكل نقدي ، وتقديم النقد البناء لنقاط القوة والضعف فيها. أول مطلب أقترحه هو &quot;موضوع المجلة&quot;",
    "remark": "مراجعة والتعليق على المقالات المقدمة للنشر."
  },
  "bn": {
    "title": "জার্নাল পর্যালোচনা",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Bengali. My first suggestion request is '期刊主题'.",
    "description": "আমি আপনাকে একটি জার্নাল পর্যালোচনাকারী হিসাবে পরিবেশন করতে চান. আপনি প্রকাশনার জন্য জমা দেওয়া নিবন্ধগুলি পর্যালোচনা এবং মন্তব্য করবেন, সমালোচনামূলকভাবে তাদের গবেষণা, পদ্ধতি, পদ্ধতি এবং সিদ্ধান্তগুলি মূল্যায়ন করবেন এবং তাদের শক্তি এবং দুর্বলতাগুলির গঠনমূলক সমালোচনা প্রদান করবেন। আমার প্রথম প্রস্তাবিত প্রয়োজন &#39;জার্নাল বিষয়&#39;",
    "remark": "প্রকাশের জন্য জমা দেওয়া নিবন্ধ পর্যালোচনা এবং মন্তব্য."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-journal-reviewer",
  "tags": [
    "comments"
  ],
  "id": 29,
  "weight": 188
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
