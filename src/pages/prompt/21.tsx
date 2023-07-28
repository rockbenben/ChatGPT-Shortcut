import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "论文②",
    "prompt": "I want you to act as an essay writer and respond in Chinese. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is '论文主题'",
    "description": "我想让你充当一名论文作家。你将需要研究一个给定的主题，制定一个论文声明，并创造一个有说服力的作品，既要有信息量，又要有吸引力。我的第一个建议要求是 '论文主题'",
    "remark": "根据主题撰写内容翔实、有信服力的论文。"
  },
  "en": {
    "title": "Essay writer",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is ",
    "remark": "Write a comprehensive and persuasive thesis based on the given topic."
  },
  "ja": {
    "title": "用紙②の場合",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "あなたには、論文の書き手として活躍してほしい。与えられたトピックを研究し、論文を作成し、情報量が多く魅力的な説得力のある作品を作る必要があります。私が最初に提案する要件は「論文のテーマ」です。",
    "remark": "トピックに基づき、情報量が多く説得力のある論文を書く。"
  },
  "ko": {
    "title": "용지 ②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "논문 작가로 활동해 주셨으면 합니다. 주어진 주제를 조사하고, 논문 문장을 개발하며, 유익하고 매력적인 설득력 있는 글을 작성해야 합니다. 제가 제안하는 첫 번째 요건은 '논문 주제'입니다.",
    "remark": "주제에 따라 유익하고 설득력 있는 논문을 작성하세요."
  },
  "es": {
    "title": "Tesis ②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Spanish. My first suggestion request is ",
    "description": "Me gustaría que hicieras de escritor de tesis. Tendrás que investigar un tema determinado, elaborar una tesis y crear un artículo persuasivo que sea a la vez informativo y atractivo. El primer requisito que sugiero es \"Tema de la tesis\".",
    "remark": "Redactar artículos informativos y convincentes basados en el tema."
  },
  "fr": {
    "title": "Thèse ②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in French. My first suggestion request is ",
    "description": "J'aimerais que vous jouiez le rôle d'un rédacteur de thèse. Vous devrez faire des recherches sur un sujet donné, élaborer un énoncé de thèse et créer un document convaincant qui soit à la fois informatif et attrayant. La première exigence que je suggère est le \"sujet de la thèse",
    "remark": "Rédiger des documents informatifs et convaincants sur la base du sujet."
  },
  "de": {
    "title": "Dissertation ②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in German. My first suggestion request is ",
    "description": "Ich möchte, dass Sie als Verfasser einer These fungieren. Sie müssen ein bestimmtes Thema recherchieren, eine These entwickeln und einen überzeugenden Beitrag verfassen, der sowohl informativ als auch fesselnd ist. Die erste von mir vorgeschlagene Anforderung lautet \"Thema der Arbeit\".",
    "remark": "Schreiben Sie informative und überzeugende Beiträge zum Thema."
  },
  "it": {
    "title": "Tesi ②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Italian. My first suggestion request is ",
    "description": "Vorrei che tu agissi come uno scrittore di tesi. Dovrete fare una ricerca su un determinato argomento, sviluppare una tesi e creare un pezzo persuasivo che sia informativo e coinvolgente. Il primo requisito suggerito è \"Argomento della tesi\".",
    "remark": "Scrivere documenti informativi e convincenti basati sull'argomento."
  },
  "ru": {
    "title": "Диссертация ②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Russian. My first suggestion request is ",
    "description": null,
    "remark": "Написать информативные и убедительные статьи по заданной теме."
  },
  "pt": {
    "title": "Tese ②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is ",
    "description": "Gostaria que fizesses o papel de redator de uma tese. Terá de pesquisar um determinado tópico, desenvolver uma declaração de tese e criar um texto persuasivo que seja simultaneamente informativo e cativante. O meu primeiro requisito sugerido é \"Tópico da tese",
    "remark": "Redigir trabalhos informativos e convincentes com base no tema."
  },
  "hi": {
    "title": "थीसिस②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Hindi. My first suggestion request is ",
    "description": "मैं चाहता हूँ कि आप एक निबंध लेखक के रूप में कार्य करें। आपको किसी दिए गए विषय पर शोध करने, एक थीसिस कथन तैयार करने और एक प्रेरक कार्य तैयार करने की आवश्यकता होगी जो जानकारीपूर्ण और आकर्षक दोनों हो। मेरा पहला सुझाव अनुरोध &#39;निबंध विषय&#39; है",
    "remark": "विषयों पर जानकारीपूर्ण और ठोस निबंध लिखें।"
  },
  "ar": {
    "title": "أطروحة",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Arabic. My first suggestion request is ",
    "description": "أريدك أن تعمل ككاتب مقال. ستحتاج إلى البحث في موضوع معين ، وصياغة بيان أطروحة ، وإنشاء عمل مقنع غني بالمعلومات وجذاب. طلب اقتراحي الأول هو &quot;موضوع الأطروحة&quot;",
    "remark": "اكتب مقالات إعلامية ومقنعة حول الموضوعات."
  },
  "bn": {
    "title": "থিসিস②",
    "prompt": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. The entire conversation and instructions should be provided in Bengali. My first suggestion request is ",
    "description": "আমি চাই আপনি একজন প্রবন্ধ লেখক হিসেবে কাজ করুন। আপনাকে একটি প্রদত্ত বিষয় নিয়ে গবেষণা করতে হবে, একটি থিসিস বিবৃতি তৈরি করতে হবে এবং একটি প্ররোচক কাজ তৈরি করতে হবে যা তথ্যপূর্ণ এবং আকর্ষক উভয়ই। আমার প্রথম পরামর্শ অনুরোধ হল &#39;ডিজার্টেশন বিষয়&#39;",
    "remark": "বিষয়ের উপর তথ্যপূর্ণ এবং বিশ্বাসযোগ্য প্রবন্ধ লিখুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-essay-writer",
  "tags": [
    "article"
  ],
  "id": 21,
  "weight": 1857
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
