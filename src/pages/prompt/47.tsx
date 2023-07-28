import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "非小说类书籍总结",
    "prompt": "I want you to act as a Life Coach and respond in Chinese. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?",
    "description": "我想让你充当一个生活教练。请总结一下这本由 [作者] 撰写的非小说类书籍 [书名]。用一个孩子能够理解的方式来简化核心原则。另外，你能不能给我一份可操作的步骤清单，告诉我如何将这些原则落实到我的日常生活中？",
    "remark": "根据输入的非小说类书籍标题和作者，以最容易理解的方式概括该书的核心原则。同时，提供一份可行的步骤清单，介绍如何将这些原则应用到日常生活中。"
  },
  "en": {
    "title": "Summary of Non-Fiction Books",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?",
    "remark": "Based on the input of non-fiction book titles and authors, summarize the core principles of the book in the most easily understandable way. Additionally, provide a feasible checklist of steps to explain how these principles can be applied to daily life."
  },
  "ja": {
    "title": "ノンフィクション書籍の概要",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Janpanese. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "ライフコーチとして活動してほしい。この [著者] のノンフィクション本 [タイトル] を要約してください。子供でも理解できるように、核となる原則を簡略化してください。また、これらの原則をどのように日常生活に導入するか、実行可能なステップのリストを教えてください。",
    "remark": "入力されたノンフィクションのタイトルと著者に基づき、その本の核となる原則を最も分かりやすい方法で概説する。また、これらの原則を日常生活に適用する方法について、実行可能なステップのリストを提供すること。"
  },
  "ko": {
    "title": "논픽션 도서 요약",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Korean. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "인생 코치 역할을 해주셨으면 합니다. 저자] 가 쓴 이 논픽션 책 [제목] 을 요약하세요. 어린이가 이해할 수 있도록 핵심 원칙을 단순화하세요. 또한 이러한 원칙을 일상 생활에 적용하는 방법에 대한 실행 가능한 단계 목록을 제공해 주실 수 있나요?",
    "remark": "입력한 논픽션 도서의 제목과 저자를 바탕으로 책의 핵심 원리를 가장 이해하기 쉬운 방식으로 요약하세요. 또한 이러한 원칙을 일상 생활에 적용하는 방법에 대한 실행 가능한 단계 목록을 제공하세요."
  },
  "es": {
    "title": "Resumen de libros de no ficción",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Spanish. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "Quiero que actúes como coach de vida. Por favor, resuma este libro de no ficción [título] de [autor]. Simplifique los principios básicos de forma que un niño pueda entenderlos. Además, ¿puede darme una lista de medidas prácticas para aplicar estos principios en mi vida diaria?",
    "remark": "Resuma los principios fundamentales del libro de no ficción de la forma más accesible posible, basándose en el título y el autor del libro de no ficción introducido. Asimismo, facilite una lista de medidas prácticas para aplicar estos principios a la vida cotidiana."
  },
  "fr": {
    "title": "Résumé des livres de non-fiction",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in French. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "Je veux que vous agissiez en tant que coach de vie. Veuillez résumer ce livre de non-fiction [titre] de [auteur]. Simplifiez les principes fondamentaux de manière à ce qu'un enfant puisse les comprendre. Pouvez-vous également me donner une liste d'étapes à suivre pour mettre en œuvre ces principes dans ma vie quotidienne ?",
    "remark": "Résumez les principes fondamentaux de l'ouvrage non fictionnel de la manière la plus accessible possible, en vous basant sur le titre et l'auteur de l'ouvrage non fictionnel saisi. Fournissez également une liste de mesures à prendre pour appliquer ces principes dans la vie de tous les jours."
  },
  "de": {
    "title": "Zusammenfassung von Sachbüchern",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in German. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "Ich möchte, dass Sie als Lebensberater fungieren. Bitte fassen Sie dieses Sachbuch [Titel] von [Autor] zusammen. Vereinfachen Sie die Kernprinzipien so, dass sie auch ein Kind verstehen kann. Können Sie mir auch eine Liste von Schritten geben, wie ich diese Prinzipien in meinem täglichen Leben umsetzen kann?",
    "remark": "Fassen Sie die Kernprinzipien des Sachbuchs auf möglichst verständliche Weise zusammen, basierend auf dem Titel und dem Autor des angegebenen Sachbuchs. Geben Sie auch eine Liste von Schritten an, wie Sie diese Grundsätze im Alltag anwenden können."
  },
  "it": {
    "title": "Riassunto dei libri di saggistica",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Italian. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "Voglio che tu faccia da life coach. Per favore, riassumi questo libro di saggistica [titolo] di [autore]. Semplifica i principi fondamentali in un modo che un bambino possa capire. Inoltre, puoi darmi un elenco di passi praticabili su come implementare questi principi nella mia vita quotidiana?",
    "remark": "Riassumere i principi fondamentali del libro di saggistica nel modo più accessibile possibile, in base al titolo e all'autore del libro di saggistica inserito. Inoltre, fornite un elenco di passi praticabili su come applicare questi principi alla vita di tutti i giorni."
  },
  "ru": {
    "title": "Краткое содержание нехудожественных книг",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Russian. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "Я хочу, чтобы вы выступили в роли лайф-коуча. Пожалуйста, кратко опишите эту нехудожественную книгу [название] [автор]. Упростите основные принципы таким образом, чтобы их мог понять ребенок. Кроме того, не могли бы Вы дать мне список практических шагов по внедрению этих принципов в мою повседневную жизнь?",
    "remark": "Кратко изложите основные принципы нехудожественной книги в наиболее доступной форме, исходя из названия и автора введенной нехудожественной книги. Кроме того, приведите список практических шагов по применению этих принципов в повседневной жизни."
  },
  "pt": {
    "title": "Resumo de livros de não ficção",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Portuguese. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "Quero que actue como um treinador de vida. Por favor, faça um resumo deste livro de não ficção [título] de [autor]. Simplifique os princípios fundamentais de uma forma que uma criança possa compreender. Além disso, pode dar-me uma lista de passos práticos sobre como implementar estes princípios na minha vida quotidiana?",
    "remark": "Resumir os princípios fundamentais do livro de não ficção da forma mais acessível possível, com base no título e no autor do livro de não ficção introduzido. Forneça também uma lista de passos práticos sobre a forma de aplicar estes princípios à vida quotidiana."
  },
  "hi": {
    "title": "नॉनफिक्शन पुस्तक सारांश",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Hindi. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "मैं चाहता हूं कि आप एक जीवन प्रशिक्षक के रूप में कार्य करें। कृपया [लेखक] की गैर-काल्पनिक पुस्तक [शीर्षक] का सारांश प्रस्तुत करें। मूल सिद्धांतों को इस तरह सरल बनाएं कि बच्चा समझ सके। साथ ही, क्या आप मुझे इन सिद्धांतों को अपने दैनिक जीवन में लागू करने के लिए कदमों की एक सूची दे सकते हैं?",
    "remark": "प्रविष्ट गैर-काल्पनिक पुस्तक के शीर्षक और लेखक के आधार पर, पुस्तक के मूल सिद्धांतों को यथासंभव सुपाच्य तरीके से सारांशित करें। साथ ही, इन सिद्धांतों को रोजमर्रा की जिंदगी में कैसे लागू किया जाए, इस पर कार्रवाई योग्य कदमों की एक सूची प्रदान की गई है।"
  },
  "ar": {
    "title": "ملخص كتاب قصصي",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Arabic. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "أريدك أن تعمل كمدرب حياة. يرجى تلخيص الكتاب الواقعي [العنوان] من تأليف [المؤلف]. تبسيط المبادئ الأساسية بطريقة يمكن للطفل أن يفهمها. أيضًا ، هل يمكن أن تعطيني قائمة بالخطوات القابلة للتنفيذ حول كيفية تطبيق هذه المبادئ في حياتي اليومية؟",
    "remark": "استنادًا إلى عنوان ومؤلف الكتاب غير الخيالي الذي تم إدخاله ، لخص المبادئ الأساسية للكتاب بأكثر طريقة سهلة الهضم. في الوقت نفسه ، يتم توفير قائمة بالخطوات القابلة للتنفيذ حول كيفية تطبيق هذه المبادئ في الحياة اليومية."
  },
  "bn": {
    "title": "ননফিকশন বইয়ের সারাংশ",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Bengali. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "আমি চাই আপনি একজন লাইফ কোচ হিসেবে কাজ করুন। অনুগ্রহ করে [লেখকের] নন-ফিকশন বইটি [শিরোনাম] সংক্ষিপ্ত করুন। একটি শিশু বুঝতে পারে এমনভাবে মূল নীতিগুলি সরল করুন। এছাড়াও, আপনি কি আমাকে এই নীতিগুলিকে আমার দৈনন্দিন জীবনে কীভাবে প্রয়োগ করতে হবে সে বিষয়ে পদক্ষেপের একটি তালিকা দিতে পারেন?",
    "remark": "প্রবেশ করা নন-ফিকশন বইটির শিরোনাম এবং লেখকের উপর ভিত্তি করে, বইটির মূল নীতিগুলিকে সবচেয়ে হজমযোগ্য উপায়ে সংক্ষিপ্ত করুন। একই সময়ে, দৈনন্দিন জীবনে এই নীতিগুলি কীভাবে প্রয়োগ করা যায় সে সম্পর্কে কার্যকর পদক্ষেপগুলির একটি তালিকা সরবরাহ করা হয়েছে।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-life-coach-1",
  "tags": [
    "life"
  ],
  "id": 47,
  "weight": 383
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
