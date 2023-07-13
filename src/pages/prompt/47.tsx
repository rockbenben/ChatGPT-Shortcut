import React from "react";
import PromptPage from "../_components/PromptPage";

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
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Janpanese. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "ライフコーチとして活動してほしい。この [著者] のノンフィクション本 [タイトル] を要約してください。子供でも理解できるように、核となる原則を簡略化してください。また、これらの原則をどのように日常生活に導入するか、実行可能なステップのリストを教えてください。",
    "remark": "入力されたノンフィクションのタイトルと著者に基づき、その本の核となる原則を最も分かりやすい方法で概説する。また、これらの原則を日常生活に適用する方法について、実行可能なステップのリストを提供すること。"
  },
  "ko": {
    "title": "논픽션 도서 요약",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Korean. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "인생 코치 역할을 해주셨으면 합니다. 저자] 가 쓴 이 논픽션 책 [제목] 을 요약하세요. 어린이가 이해할 수 있도록 핵심 원칙을 단순화하세요. 또한 이러한 원칙을 일상 생활에 적용하는 방법에 대한 실행 가능한 단계 목록을 제공해 주실 수 있나요?",
    "remark": "입력한 논픽션 도서의 제목과 저자를 바탕으로 책의 핵심 원리를 가장 이해하기 쉬운 방식으로 요약하세요. 또한 이러한 원칙을 일상 생활에 적용하는 방법에 대한 실행 가능한 단계 목록을 제공하세요."
  },
  "es": {
    "title": "Resumen del libro de no ficción",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Spanish. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?.",
    "description": "Quiero que actúes como un entrenador de vida. Resuma el libro de no ficción [título] de [autor]. Simplifique los principios básicos de una manera que un niño pueda entender. Además, ¿me puede dar una lista de pasos prácticos sobre cómo implementar estos principios en mi vida diaria?",
    "remark": "Según el título y el autor del libro de no ficción ingresado, resuma los principios básicos del libro de la manera más digerible posible. Al mismo tiempo, se proporciona una lista de pasos prácticos sobre cómo aplicar estos principios en la vida cotidiana."
  },
  "fr": {
    "title": "Résumé des livres de non-fiction",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in French. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "Je veux que vous agissiez en tant que coach de vie. Veuillez résumer ce livre de non-fiction [titre] de [auteur]. Simplifiez les principes fondamentaux de manière à ce qu'un enfant puisse les comprendre. Pouvez-vous également me donner une liste d'étapes à suivre pour mettre en œuvre ces principes dans ma vie quotidienne ?",
    "remark": "Résumez les principes fondamentaux de l'ouvrage non fictionnel de la manière la plus accessible possible, en vous basant sur le titre et l'auteur de l'ouvrage non fictionnel saisi. Fournissez également une liste de mesures à prendre pour appliquer ces principes dans la vie de tous les jours."
  },
  "de": {
    "title": "Zusammenfassung von Sachbüchern",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in German. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "Ich möchte, dass Sie als Lebensberater fungieren. Bitte fassen Sie dieses Sachbuch [Titel] von [Autor] zusammen. Vereinfachen Sie die Kernprinzipien so, dass sie auch ein Kind verstehen kann. Können Sie mir auch eine Liste von Schritten geben, wie ich diese Prinzipien in meinem täglichen Leben umsetzen kann?",
    "remark": "Fassen Sie die Kernprinzipien des Sachbuchs auf möglichst verständliche Weise zusammen, basierend auf dem Titel und dem Autor des angegebenen Sachbuchs. Geben Sie auch eine Liste von Schritten an, wie Sie diese Grundsätze im Alltag anwenden können."
  },
  "it": {
    "title": "Riassunto del libro di saggistica",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Italian. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "Voglio che tu faccia da life coach. Si prega di riassumere il libro di saggistica [titolo] di [autore]. Semplifica i principi fondamentali in modo che un bambino possa capirli. Inoltre, puoi fornirmi un elenco di passaggi attuabili su come implementare questi principi nella mia vita quotidiana?",
    "remark": "Sulla base del titolo e dell&#39;autore del libro di saggistica inserito, riassumi i principi fondamentali del libro nel modo più comprensibile possibile. Allo stesso tempo, viene fornito un elenco di azioni attuabili su come applicare questi principi nella vita di tutti i giorni."
  },
  "ru": {
    "title": "Краткое содержание документальной книги",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Russian. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "Я хочу, чтобы вы выступили в роли лайф-коуча. Пожалуйста, кратко о научно-популярной книге [название] [автора]. Упростите основные принципы так, чтобы ребенок мог их понять. Кроме того, не могли бы вы дать мне список практических шагов по внедрению этих принципов в мою повседневную жизнь?",
    "remark": "Основываясь на названии и авторе заявленной научно-популярной книги, обобщите основные принципы книги в наиболее удобоваримой форме. В то же время приводится список практических шагов по применению этих принципов в повседневной жизни."
  },
  "pt": {
    "title": "Resumo do livro de não ficção",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Portuguese. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "Eu quero que você aja como um treinador de vida. Por favor, resuma o livro de não ficção [título] de [autor]. Simplifique os princípios fundamentais de uma forma que uma criança possa entender. Além disso, você pode me dar uma lista de etapas práticas sobre como implementar esses princípios em minha vida diária?",
    "remark": "Com base no título e no autor do livro de não ficção inscrito, resuma os princípios básicos do livro da maneira mais digerível possível. Ao mesmo tempo, é fornecida uma lista de etapas acionáveis sobre como aplicar esses princípios na vida cotidiana."
  },
  "hi": {
    "title": "नॉनफिक्शन पुस्तक सारांश",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Hindi. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "मैं चाहता हूं कि आप एक जीवन प्रशिक्षक के रूप में कार्य करें। कृपया [लेखक] की गैर-काल्पनिक पुस्तक [शीर्षक] का सारांश प्रस्तुत करें। मूल सिद्धांतों को इस तरह सरल बनाएं कि बच्चा समझ सके। साथ ही, क्या आप मुझे इन सिद्धांतों को अपने दैनिक जीवन में लागू करने के लिए कदमों की एक सूची दे सकते हैं?",
    "remark": "प्रविष्ट गैर-काल्पनिक पुस्तक के शीर्षक और लेखक के आधार पर, पुस्तक के मूल सिद्धांतों को यथासंभव सुपाच्य तरीके से सारांशित करें। साथ ही, इन सिद्धांतों को रोजमर्रा की जिंदगी में कैसे लागू किया जाए, इस पर कार्रवाई योग्य कदमों की एक सूची प्रदान की गई है।"
  },
  "ar": {
    "title": "ملخص كتاب قصصي",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Arabic. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "أريدك أن تعمل كمدرب حياة. يرجى تلخيص الكتاب الواقعي [العنوان] من تأليف [المؤلف]. تبسيط المبادئ الأساسية بطريقة يمكن للطفل أن يفهمها. أيضًا ، هل يمكن أن تعطيني قائمة بالخطوات القابلة للتنفيذ حول كيفية تطبيق هذه المبادئ في حياتي اليومية؟",
    "remark": "استنادًا إلى عنوان ومؤلف الكتاب غير الخيالي الذي تم إدخاله ، لخص المبادئ الأساسية للكتاب بأكثر طريقة سهلة الهضم. في الوقت نفسه ، يتم توفير قائمة بالخطوات القابلة للتنفيذ حول كيفية تطبيق هذه المبادئ في الحياة اليومية."
  },
  "bn": {
    "title": "ননফিকশন বইয়ের সারাংশ",
    "prompt": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. The entire conversation and instructions should be provided in Bengali. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?..",
    "description": "আমি চাই আপনি একজন লাইফ কোচ হিসেবে কাজ করুন। অনুগ্রহ করে [লেখকের] নন-ফিকশন বইটি [শিরোনাম] সংক্ষিপ্ত করুন। একটি শিশু বুঝতে পারে এমনভাবে মূল নীতিগুলি সরল করুন। এছাড়াও, আপনি কি আমাকে এই নীতিগুলিকে আমার দৈনন্দিন জীবনে কীভাবে প্রয়োগ করতে হবে সে বিষয়ে পদক্ষেপের একটি তালিকা দিতে পারেন?",
    "remark": "প্রবেশ করা নন-ফিকশন বইটির শিরোনাম এবং লেখকের উপর ভিত্তি করে, বইটির মূল নীতিগুলিকে সবচেয়ে হজমযোগ্য উপায়ে সংক্ষিপ্ত করুন। একই সময়ে, দৈনন্দিন জীবনে এই নীতিগুলি কীভাবে প্রয়োগ করা যায় সে সম্পর্কে কার্যকর পদক্ষেপগুলির একটি তালিকা সরবরাহ করা হয়েছে।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-life-coach-1",
  "tags": [
    "life"
  ],
  "id": 47,
  "weight": 347
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
