import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "Nature 风格润色",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "我希望你能充当专业的拼写和语法校对者，并改进我的文章。我想让你用更美丽、优雅、高级的英语单词和句子替换我的简化 A0 级别的单词和句子，保持意思不变，但使它们更具文学性，在《自然》杂志风格中提高我的表达水平。",
    "remark": "将按照 Nature 风格润色，或者可以提供想要模仿的写作风格。来自 @Pfyuan77 的投稿。"
  },
  "en": {
    "title": "Nature Style Editing",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "remark": "Polish according to the style of Nature, or provide a writing style to emulate. Contributed by @Pfyuan77."
  },
  "ja": {
    "title": "ネイチャースタイルタッチ",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Janpanese. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "プロのスペル・文法校正者としての役割を果たし、私の文章を改善してほしい。私が簡略化した A0 レベルの単語や文章を、より美しくエレガントで高度な英単語や文章に置き換え、意味はそのままに、より文学的にし、ネイチャー誌のスタイルで私の表現を改善してほしいです。",
    "remark": "ネイチャースタイルでタッチアップされる、またはマネしたい書き方を提供できる。Pfyuan77 さんからの寄稿です。"
  },
  "ko": {
    "title": "자연스러운 터치",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Korean. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "전문 맞춤법 및 문법 교정자 역할을 해주시고 제 글을 개선해 주셨으면 합니다. 저의 단순화된 A0 수준의 단어와 문장을 더 아름답고 우아하며 고급스러운 영어 단어와 문장으로 바꾸어 주시고, 의미는 동일하게 유지하되 더 문학적으로 표현하고 네이처 매거진 스타일로 표현을 개선해 주셨으면 좋겠습니다.",
    "remark": "자연스러운 스타일로 수정하거나 모방하고 싶은 글쓰기 스타일을 제공할 수 있습니다. 기여: @Pfyuan77."
  },
  "es": {
    "title": "Toques de naturaleza",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Spanish. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "Quiero que actúen como correctores ortográficos y gramaticales profesionales y mejoren mi redacción. Me gustaría que sustituyera mis palabras y frases simplificadas de nivel A0 por otras más bonitas, elegantes y avanzadas en inglés, manteniendo el mismo significado pero haciéndolas más literarias y mejorando mi expresión en estilo revista Nature.",
    "remark": "Se retocará al estilo Nature, o se puede aportar un estilo de escritura que se quiera emular. Contribución de @Pfyuan77."
  },
  "fr": {
    "title": "Touches de style nature",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in French. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "Je souhaite que vous agissiez en tant que correcteur professionnel de l'orthographe et de la grammaire et que vous amélioriez mon écriture. J'aimerais que vous remplaciez mes mots et phrases simplifiés de niveau A0 par des mots et phrases plus beaux, plus élégants et plus avancés en anglais, en conservant le même sens mais en les rendant plus littéraires et en améliorant mon expression dans le style du magazine Nature.",
    "remark": "Sera retouché dans le style Nature, ou peut fournir un style d'écriture que vous voulez imiter. Contribution de @Pfyuan77."
  },
  "de": {
    "title": "Natur Stil berührt",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in German. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "Ich möchte, dass Sie als professioneller Korrekturleser für Rechtschreibung und Grammatik fungieren und meinen Text verbessern. Ich möchte, dass Sie meine vereinfachten Wörter und Sätze auf A0-Niveau durch schönere, elegantere, fortgeschrittene englische Wörter und Sätze ersetzen, die Bedeutung beibehalten, sie aber literarischer gestalten und meinen Ausdruck im Stil des Naturmagazins verbessern.",
    "remark": "Wird im Natur-Stil überarbeitet, oder kann einen Schreibstil liefern, den Sie nachahmen wollen. Beitrag von @Pfyuan77."
  },
  "it": {
    "title": "Tocchi in stile natura",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Italian. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "Vorrei che lei agisse come correttore ortografico e grammaticale professionista e migliorasse la mia scrittura. Vorrei che sostituisse le mie parole e frasi semplificate di livello A0 con parole e frasi in inglese più belle, eleganti e avanzate, mantenendo lo stesso significato ma rendendole più letterarie e migliorando la mia espressione in stile rivista Nature.",
    "remark": "Verrà ritoccato in stile Nature, oppure si può fornire uno stile di scrittura che si vuole emulare. Contributo di @Pfyuan77."
  },
  "ru": {
    "title": "Штрихи природного стиля",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Russian. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "Я хочу, чтобы Вы выступили в роли профессионального корректора орфографии и грамматики и улучшили мое письмо. Я хотел бы, чтобы Вы заменили мои упрощенные слова и предложения уровня А0 на более красивые, элегантные, продвинутые английские слова и предложения, сохранив смысл, но сделав их более литературными и улучшив мои выражения в стиле журнала Nature.",
    "remark": "Будет доработана в стиле Nature, или можно предоставить стиль написания, которому вы хотите подражать. Вклад от @Pfyuan77."
  },
  "pt": {
    "title": "Toques de estilo natural",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Portuguese. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "Quero que actue como um revisor ortográfico e gramatical profissional e que melhore a minha escrita. Gostaria que substituísse as minhas palavras e frases simplificadas de nível A0 por palavras e frases mais bonitas, elegantes e avançadas em inglês, mantendo o mesmo significado, mas tornando-as mais literárias e melhorando a minha expressão no estilo da revista Nature.",
    "remark": "Será retocado ao estilo da Natureza, ou pode fornecer um estilo de escrita que queira imitar. Contribuição de @Pfyuan77."
  },
  "hi": {
    "title": "प्रकृति का स्पर्श",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Hindi. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "मुझे आशा है कि आप एक पेशेवर वर्तनी और व्याकरण प्रूफरीडर के रूप में कार्य करेंगे और मेरे लेखों में सुधार करेंगे। मैं चाहता हूं कि आप मेरे सरलीकृत A0 स्तर के शब्दों और वाक्यों को अधिक सुंदर, सुरुचिपूर्ण, उन्नत अंग्रेजी शब्दों और वाक्यों से बदलें, अर्थ वही रखें, लेकिन उन्हें और अधिक साहित्यिक बनाएं, नेचर पत्रिका शैली में मेरी अभिव्यक्ति के स्तर में सुधार करें।",
    "remark": "इसे प्रकृति की शैली में पॉलिश किया जाएगा, या वह लेखन शैली प्रदान कर सकता है जिसका आप अनुकरण करना चाहते हैं। @Pfyuan77 से योगदान।"
  },
  "ar": {
    "title": "لمسة الطبيعة",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Arabic. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "آمل أن تعمل كمدقق لغوي وتدقيق نحوي محترف وتقوم بتحسين مقالاتي. أريدك أن تستبدل كلمات وجمل المستوى A0 المبسطة بكلمات وجمل إنجليزية أكثر جمالًا وأنيقًا وتقدمًا ، مع الحفاظ على المعنى نفسه ، ولكن اجعلها أدبية أكثر ، وتحسين أسلوب مجلتي في Nature ومستوى التعبير.",
    "remark": "سيكون مصقولًا بأسلوب الطبيعة ، أو يمكن أن يوفر أسلوب الكتابة الذي تريد محاكاته. مساهمة من @ Pfyuan77."
  },
  "bn": {
    "title": "প্রকৃতির স্পর্শ",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Bengali. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "আমি আশা করি আপনি একজন পেশাদার বানান এবং ব্যাকরণ প্রুফরিডার হিসাবে কাজ করবেন এবং আমার নিবন্ধগুলি উন্নত করবেন। আমি চাই আপনি আমার সরলীকৃত A0 স্তরের শব্দ এবং বাক্যগুলিকে আরও সুন্দর, মার্জিত, উন্নত ইংরেজি শব্দ এবং বাক্য দিয়ে প্রতিস্থাপন করুন, অর্থ একই রাখুন, তবে সেগুলিকে আরও সাহিত্যিক করুন, আমার নেচার ম্যাগাজিন স্টাইলে এক্সপ্রেশন লেভেল উন্নত করুন।",
    "remark": "এটি প্রকৃতির শৈলীতে পালিশ করা হবে, অথবা আপনি অনুকরণ করতে চান এমন লেখার শৈলী প্রদান করতে পারে। @Pfyuan77 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "favorite",
    "contribute",
    "write"
  ],
  "id": 197,
  "weight": 11424
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
