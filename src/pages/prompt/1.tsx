import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "英语翻译或修改",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"要翻译的语言\"",
    "description": "我希望你能充当英语翻译、拼写纠正者和改进者。我将用任何语言与你交谈，你将检测语言，翻译它，并在我的文本的更正和改进版本中用英语回答。我希望你用更漂亮、更优雅、更高级的英语单词和句子来取代我的简化 A0 级单词和句子。保持意思不变，但让它们更有文学性。我希望你只回答更正，改进，而不是其他，不要写解释。我的第一句话是 [要翻译的语言]",
    "remark": "将其他语言翻译成英文，或改进你提供的英文句子。"
  },
  "en": {
    "title": "English translator",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "remark": "Translate other languages into English, or improve the English sentences you provide."
  },
  "ja": {
    "title": "英語翻訳または修正",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "英語の翻訳者、スペル修正者、改善者として活動してほしいです。私がどんな言語で話しかけても、あなたはその言語を察知して翻訳し、私の文章の訂正・改善版を英語で回答してくれます。私の簡略化された A0 の単語や文章を、よりきれいでエレガントな、より高度な英語の単語や文章に置き換えてほしいのです。意味はそのままで、より文学的にしてください。訂正、改善、それ以外には答えず、説明も書かないでほしい。私の最初の文章は、【訳すべき言語】です。",
    "remark": "他言語から英語への翻訳や、提供した英語の文章を改善する。"
  },
  "ko": {
    "title": "영어 번역 또는 수정",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "영어 번역가, 맞춤법 교정자 및 개선자로 활동해 주셨으면 합니다. 나는 어떤 언어로든 당신과 이야기 할 것이고 당신은 언어를 감지하고 번역하고 내 텍스트의 수정 및 개선 된 버전으로 영어로 대답 할 것입니다. 저의 단순화 된 A0 단어와 문장을 더 예쁘고 우아하며 고급스러운 영어 단어와 문장으로 바꿔 주셨으면합니다. 의미는 동일하게 유지하되 좀 더 문학적으로 만들어주세요. 수정, 개선 사항만 답해 주시고 그 외에는 설명은 쓰지 마세요. 첫 번째 문장은 [번역할 언어] 입니다.",
    "remark": "다른 언어에서 영어로 번역하거나 영어로 제공한 문장을 개선하세요."
  },
  "es": {
    "title": "traducción o modificación al inglés",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "Espero que actúes como traductor de inglés, corrector ortográfico y mejorador. Te hablaré en cualquier idioma y tú detectarás el idioma, lo traducirás y contestarás en inglés en una versión corregida y mejorada de mi texto. Espero que reemplace mis palabras y oraciones simplificadas de nivel A0 con palabras y oraciones en inglés más bellas, elegantes y avanzadas. Mantenga los significados iguales, pero hágalos más literarios. Quiero que respondan solo correcciones, mejoras y nada más, no escriban explicaciones. Mi primera oración es [idioma a traducir]",
    "remark": "Traduce otros idiomas al inglés o mejora las oraciones en inglés que proporcionas."
  },
  "fr": {
    "title": "Traduction ou modification en anglais",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "J'aimerais que vous agissiez en tant que traducteur, correcteur d'orthographe et améliorateur de l'anglais. Je vous parlerai dans n'importe quelle langue et vous détecterez la langue, la traduirez et répondrez en anglais dans des versions corrigées et améliorées de mes textes. Je veux que vous remplaciez mes mots et mes phrases simplifiés de niveau A0 par des mots et des phrases en anglais plus jolis, plus élégants et plus avancés. Gardez le même sens, mais rendez-les plus littéraires. Je veux que vous ne répondiez qu'à des corrections, des améliorations, et rien d'autre, et que vous n'écriviez pas d'explications. Ma première phrase est [langue à traduire].",
    "remark": "Traduire d'autres langues en anglais ou améliorer les phrases anglaises que vous fournissez."
  },
  "de": {
    "title": "Englische Übersetzung oder Änderung",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "Ich möchte Sie als Englisch-Übersetzer, Rechtschreibkorrektor und -verbesserer einsetzen. Ich werde mich mit Ihnen in einer beliebigen Sprache unterhalten, und Sie werden die Sprache erkennen, sie übersetzen und auf Englisch in korrigierten und verbesserten Versionen meiner Texte antworten. Ich möchte, dass Sie meine vereinfachten Wörter und Sätze auf A0-Niveau durch hübschere, elegantere, fortgeschrittenere englische Wörter und Sätze ersetzen. Behalten Sie die Bedeutung bei, aber machen Sie sie literarischer. Ich möchte, dass Sie nur Korrekturen, Verbesserungen und nichts anderes antworten und keine Erklärungen schreiben. Mein erster Satz lautet [zu übersetzende Sprache].",
    "remark": "Übersetzen Sie andere Sprachen ins Englische oder verbessern Sie die von Ihnen bereitgestellten englischen Sätze."
  },
  "it": {
    "title": "Traduzione o modifica in inglese",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "Spero che agirai come traduttore inglese, correttore ortografico e miglioratore. Ti parlerò in qualsiasi lingua e tu rileverai la lingua, la tradurrai e risponderai in inglese in una versione corretta e migliorata del mio testo. Spero che sostituirai le mie parole e frasi semplificate di livello A0 con parole e frasi inglesi più belle, eleganti e avanzate. Mantieni gli stessi significati, ma rendili più letterari. Voglio che tu risponda solo correzioni, miglioramenti e nient&#39;altro, non scrivere spiegazioni. La mia prima frase è [lingua da tradurre]",
    "remark": "Traduci altre lingue in inglese o migliora le frasi in inglese che fornisci."
  },
  "ru": {
    "title": "Английский перевод или модификация",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "Я надеюсь, что вы будете выступать в роли английского переводчика, корректора орфографии и улучшения. Я буду говорить с вами на любом языке, а вы определите язык, переведете его и ответите по-английски в исправленной и улучшенной версии моего текста. Я надеюсь, что вы замените мои упрощенные слова и предложения уровня A0 более красивыми, элегантными и продвинутыми английскими словами и предложениями. Сохраняйте значения прежними, но делайте их более литературными. Я хочу, чтобы вы отвечали только исправлениями, улучшениями и никак иначе, пояснений не пишите. Мое первое предложение [язык для перевода]",
    "remark": "Переведите другие языки на английский или улучшите предоставленные вами английские предложения."
  },
  "pt": {
    "title": "Tradução ou modificação em inglês",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "Espero que você atue como tradutor de inglês, corretor ortográfico e melhorador. Falarei com você em qualquer idioma e você detectará o idioma, traduzirá e responderá em inglês em uma versão corrigida e aprimorada do meu texto. Espero que você substitua minhas palavras e frases simplificadas de nível A0 por palavras e frases em inglês mais bonitas, elegantes e avançadas. Mantenha os significados iguais, mas torne-os mais literários. Eu quero que você responda apenas correções, melhorias e nada mais, não escreva explicações. Minha primeira frase é [idioma para traduzir]",
    "remark": "Traduza outros idiomas para o inglês ou melhore as frases em inglês que você fornecer."
  },
  "hi": {
    "title": "अंग्रेजी अनुवाद या संशोधन",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "मुझे आशा है कि आप अंग्रेजी अनुवादक, वर्तनी सुधारक और सुधारक के रूप में कार्य करेंगे। मैं आपसे किसी भी भाषा में बात करूंगा और आप उस भाषा का पता लगाएंगे, उसका अनुवाद करेंगे और मेरे पाठ का सही और बेहतर संस्करण अंग्रेजी में देंगे। मुझे आशा है कि आप मेरे सरलीकृत A0 स्तर के शब्दों और वाक्यों को अधिक सुंदर, सुरुचिपूर्ण और उन्नत अंग्रेजी शब्दों और वाक्यों से बदल देंगे। अर्थ वही रखें, लेकिन उन्हें अधिक साहित्यिक बनाएं। मैं चाहता हूं कि आप केवल सुधार, सुधार का उत्तर दें और कुछ नहीं, स्पष्टीकरण न लिखें। मेरा पहला वाक्य है [अनुवाद करने के लिए भाषा]",
    "remark": "अन्य भाषाओं का अंग्रेजी में अनुवाद करें, या आपके द्वारा प्रदान किए गए अंग्रेजी वाक्यों में सुधार करें।"
  },
  "ar": {
    "title": "الترجمة الإنجليزية أو التعديل",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "أتمنى أن تعمل كمترجم إنجليزي ومصحح إملائي ومُحسِّن. سأتحدث معك بأي لغة وستكتشف اللغة وترجمتها وتجيب باللغة الإنجليزية في نسخة مصححة ومحسنة من نصي. آمل أن تستبدل كلماتي وجمل المستوى A0 المبسطة بكلمات وجمل إنجليزية أكثر جمالاً وأناقة وتقدماً. حافظ على المعاني كما هي ، ولكن اجعلها أدبية أكثر. أريدك أن تجيب فقط على التصحيحات والتحسينات ولا شيء آخر ، لا تكتب التفسيرات. جملتي الأولى هي [لغة للترجمة]",
    "remark": "ترجمة اللغات الأخرى إلى الإنجليزية ، أو تحسين الجمل الإنجليزية التي تقدمها."
  },
  "bn": {
    "title": "ইংরেজি অনুবাদ বা পরিবর্তন",
    "prompt": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is \"istanbulu cok seviyom burada olmak cok guzel\"",
    "description": "আমি আশা করি আপনি ইংরেজি অনুবাদক, বানান সংশোধনকারী এবং উন্নতিকারী হিসাবে কাজ করবেন। আমি আপনার সাথে যেকোন ভাষায় কথা বলব এবং আপনি আমার লেখার একটি সংশোধিত ও উন্নত সংস্করণে ভাষাটি সনাক্ত করবেন, অনুবাদ করবেন এবং ইংরেজিতে উত্তর দেবেন। আমি আশা করি আপনি আমার সরলীকৃত A0 স্তরের শব্দ এবং বাক্যগুলিকে আরও সুন্দর, মার্জিত এবং উন্নত ইংরেজি শব্দ এবং বাক্য দিয়ে প্রতিস্থাপন করবেন। অর্থ একই রাখুন, তবে তাদের আরও সাহিত্যিক করুন। আমি চাই আপনি কেবল সংশোধন, উন্নতির উত্তর দিন এবং অন্য কিছু নয়, ব্যাখ্যা লিখবেন না। আমার প্রথম বাক্য হল [অনুবাদের ভাষা]",
    "remark": "অন্যান্য ভাষাগুলিকে ইংরেজিতে অনুবাদ করুন বা আপনার দেওয়া ইংরেজি বাক্যগুলিকে উন্নত করুন৷"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-english-translator-and-improver",
  "tags": [
    "language"
  ],
  "id": 1,
  "weight": 6912
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
