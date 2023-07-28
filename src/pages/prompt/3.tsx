import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "语音输入优化",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors and respond in Chinese. Be sure to maintain the original meaning of the text. Please begin by editing the following text: [语音文字输入]",
    "description": "请用简洁明了的语言，编辑以下段落，以改善其逻辑流程，消除任何印刷错误，并以中文作答。请务必保持文章的原意。请从编辑以下文字开始：[语音文字输入]",
    "remark": "先用第三方应用将语音转换成文字，再用 ChatGPT 进行处理。在进行语音录入时，通常会习惯性地说一些口头禅和语气词，使用 ChatGPT 可以将其转换成书面语言，以优化语音转文字的效果。此外，它还可以用于整理无序文本。源于 @玉树芝兰老师的「用简洁的语言整理这一段话，要逻辑清晰，去掉错别字」。"
  },
  "en": {
    "title": "Voice input",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. Please begin by editing the following text:",
    "remark": "When making voice recordings, it is often customary to say verbal and intonational words, which can then be converted into written language using ChatGPT to optimise the speech-to-text effect. Additionally, it can also be used to organize disordered text."
  },
  "ja": {
    "title": "音声入力の最適化",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "明確で簡潔な言葉で、以下のパラグラフを編集して論理的な流れを改善し、誤字脱字をなくし、中国語で回答してください。なお、記事の本来の意味を維持するように心がけてください。まずは次の文章を編集してください：【音声テキスト入力】。",
    "remark": "サードパーティーのアプリケーションを使用して、まず音声をテキストに変換し、ChatGPT で処理する。音声録音を行う場合、口語やイントネーションの言葉を発するのが通例ですが、ChatGPT を使って書き言葉に変換することで、音声からテキストへの変換効果を最適化できます。さらに、構造化されていないテキストの整理にも利用できます。この段落を簡単な言葉で整理し、論理的にし、誤字脱字をなくす」（@Yu Shu Zhi Lan さん）より。"
  },
  "ko": {
    "title": "음성 입력 최적화",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "명확하고 간결한 언어로 다음 단락을 편집하여 논리적 흐름을 개선하고 오탈자를 제거한 후 중국어로 답변해 주세요. 글의 원래 의미를 유지해야 합니다. 다음 텍스트부터 편집해 주세요: [음성 텍스트 입력]",
    "remark": "타사 애플리케이션을 사용하여 음성을 먼저 텍스트로 변환한 다음 ChatGPT 를 사용하여 처리하세요. 음성 녹음을 할 때 종종 구어체와 억양으로 말하는 것이 일반적이며, 이를 ChatGPT 를 사용하여 문어로 변환하여 음성 - 텍스트 변환 효과를 최적화할 수 있습니다. 또한 구조화되지 않은 텍스트를 정리하는 데에도 사용할 수 있습니다. \"이 단락을 간단한 언어로 정리하고 논리적이며 오타를 제거하세요.\" @Yu Shu Zhi Lan 의 글에서 발췌한 내용입니다."
  },
  "es": {
    "title": "Optimización de la entrada de voz",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Spanish. Please begin by editing the following text: ",
    "description": "Por favor, edite los siguientes párrafos para mejorar su flujo lógico y eliminar cualquier error tipográfico, utilizando un lenguaje claro y conciso, y responda en chino. Asegúrese de mantener la intención original del artículo. Por favor, empiece editando el siguiente texto: [Speech Text Input]",
    "remark": "Utiliza primero una aplicación de terceros para convertir la voz en texto y luego procésala con ChatGPT. Cuando se graba voz, suele ser habitual decir verborrea y entonaciones, que pueden convertirse en lenguaje escrito con ChatGPT para optimizar el efecto de conversión de voz a texto. Además, puede utilizarse para organizar textos desordenados. Fuente: \"Organise this paragraph in simple language, be logical and clear, and remove typos\" de @JadeTreeChiLan."
  },
  "fr": {
    "title": "Optimisation de la saisie vocale",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in French. Please begin by editing the following text: ",
    "description": "Veuillez modifier les paragraphes suivants afin d'en améliorer le flux logique et d'éliminer toute erreur typographique, en utilisant un langage clair et concis, et répondez en chinois. Veillez à conserver l'intention originale de l'article. Commencez par éditer le texte suivant : [Speech Text Input]",
    "remark": "Utilisez une application tierce pour convertir la parole en texte, puis traitez-la avec ChatGPT. Lors d'un enregistrement vocal, il est souvent d'usage de prononcer des verbiages et des intonations, qui peuvent être convertis en langage écrit à l'aide de ChatGPT afin d'optimiser l'effet de conversion de la parole en texte. En outre, il peut être utilisé pour organiser un texte non structuré. Tiré de \"Organisez ce paragraphe dans un langage simple, soyez logique et clair, et supprimez les fautes de frappe\" par @JadeTreeChiLan."
  },
  "de": {
    "title": "Optimierung der Spracheingabe",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in German. Please begin by editing the following text: ",
    "description": "Bitte überarbeiten Sie die folgenden Absätze, um ihren logischen Fluss zu verbessern und Schreibfehler zu beseitigen, und verwenden Sie eine klare und prägnante Sprache und antworten Sie auf Chinesisch. Achten Sie bitte darauf, die ursprüngliche Absicht des Artikels beizubehalten. Bitte beginnen Sie mit der Bearbeitung des folgenden Textes: [Spracheingabe]",
    "remark": "Verwenden Sie eine App eines Drittanbieters, um Sprache zuerst in Text umzuwandeln und dann mit ChatGPT zu bearbeiten. Bei Sprachaufnahmen ist es oft üblich, dass man sich wortreich ausdrückt und intoniert. Diese können mit ChatGPT in Schriftsprache umgewandelt werden, um den Effekt von Sprache zu Text zu optimieren. Außerdem kann es dazu verwendet werden, unstrukturierten Text zu organisieren. Nach \"Organise this paragraph in simple language, be logical and clear, and remove typos\" von @JadeTreeChiLan."
  },
  "it": {
    "title": "Ottimizzazione dell'input vocale",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Italian. Please begin by editing the following text: ",
    "description": "Si prega di modificare i seguenti paragrafi per migliorarne il flusso logico ed eliminare eventuali errori tipografici, utilizzando un linguaggio chiaro e conciso, e di rispondere in cinese. Assicuratevi di mantenere l'intento originale dell'articolo. Iniziare modificando il seguente testo: [Input di testo vocale].",
    "remark": "Utilizzare un'applicazione di terze parti per convertire il parlato in testo e poi elaborarlo con ChatGPT. Quando si effettua una registrazione vocale, è spesso consuetudine pronunciare parole e intonazioni, che possono essere convertite in linguaggio scritto con ChatGPT per ottimizzare l'effetto speech-to-text. Inoltre, può essere utilizzato per organizzare il testo non organizzato. Tratto da \"Organizza questo paragrafo con un linguaggio semplice, logico e chiaro, e rimuovi gli errori di battitura\" di @JadeTreeChiLan."
  },
  "ru": {
    "title": "Оптимизация голосового ввода",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Russian. Please begin by editing the following text: ",
    "description": "Пожалуйста, отредактируйте следующие абзацы, улучшив их логическое построение и устранив опечатки, используя ясные и четкие формулировки, и отвечайте на китайском языке. Пожалуйста, не забудьте сохранить первоначальный замысел статьи. Пожалуйста, начните с редактирования следующего текста: [Речевой ввод текста].",
    "remark": "Используйте стороннее приложение для преобразования речи в текст, а затем обрабатывайте ее в ChatGPT. При записи голоса часто используются многословие и интонации, которые можно преобразовать в письменную речь с помощью ChatGPT, чтобы оптимизировать эффект преобразования речи в текст. Кроме того, с его помощью можно упорядочить неорганизованный текст. Заимствовано из статьи \"Организуйте этот абзац простым языком, будьте логичны и понятны, удалите опечатки\" пользователя @JadeTreeChiLan."
  },
  "pt": {
    "title": "Otimização da introdução de voz",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Portuguese. Please begin by editing the following text: ",
    "description": "Por favor, edite os parágrafos seguintes para melhorar o seu fluxo lógico e eliminar quaisquer erros tipográficos, utilizando uma linguagem clara e concisa, e responda em chinês. Não se esqueça de manter a intenção original do artigo. Comece por editar o seguinte texto: [Speech Text Input]",
    "remark": "Utilize uma aplicação de terceiros para converter primeiro a voz em texto e depois processe-a com o ChatGPT. Quando se faz uma gravação de voz, é habitual dizer palavreado e entoações, que podem ser convertidos em linguagem escrita utilizando o ChatGPT para otimizar o efeito de fala para texto. Além disso, pode ser utilizado para organizar textos desorganizados. Fonte: \"Organizar este parágrafo numa linguagem simples, ser lógico e claro, e remover erros tipográficos\" de @JadeTreeChiLan."
  },
  "hi": {
    "title": "ध्वनि इनपुट अनुकूलन",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Hindi. Please begin by editing the following text: ",
    "description": "कृपया संक्षिप्त और स्पष्ट भाषा का उपयोग करें, निम्नलिखित पैराग्राफों को उनके तार्किक प्रवाह में सुधार करने के लिए संपादित करें, किसी भी मुद्रण संबंधी त्रुटियों को हटा दें, और चीनी भाषा में उत्तर दें। लेख का मूल अर्थ अवश्य रखें। कृपया निम्नलिखित पाठ को संपादित करके प्रारंभ करें: [भाषण पाठ इनपुट]",
    "remark": "भाषण को टेक्स्ट में बदलने के लिए पहले किसी तृतीय-पक्ष एप्लिकेशन का उपयोग करें, और फिर प्रसंस्करण के लिए ChatGPT का उपयोग करें। वॉयस रिकॉर्डिंग के दौरान, कुछ मंत्र और मोडल कण आमतौर पर आदतन बोले जाते हैं, जिन्हें वॉयस-टू-टेक्स्ट रूपांतरण के प्रभाव को अनुकूलित करने के लिए चैटजीपीटी का उपयोग करके लिखित भाषा में परिवर्तित किया जा सकता है। साथ ही, इसका उपयोग अव्यवस्थित टेक्स्ट को व्यवस्थित करने के लिए भी किया जा सकता है। @玉树芝兰师 के &quot;इस अनुच्छेद को व्यवस्थित करने के लिए, तार्किक और स्पष्ट होने के लिए, और टाइपो को हटाने के लिए संक्षिप्त भाषा का उपयोग करें&quot; से उत्पन्न हुआ।"
  },
  "ar": {
    "title": "تحسين الإدخال الصوتي",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Arabic. Please begin by editing the following text: ",
    "description": "الرجاء استخدام لغة موجزة وواضحة ، وتحرير الفقرات التالية لتحسين التدفق المنطقي ، وإزالة أي أخطاء مطبعية ، والإجابة باللغة الصينية. تأكد من الاحتفاظ بالمعنى الأصلي للمقال. يرجى البدء بتحرير النص التالي: [إدخال نص الكلام]",
    "remark": "استخدم أولاً تطبيقًا تابعًا لجهة خارجية لتحويل الكلام إلى نص ، ثم استخدم ChatGPT للمعالجة. أثناء التسجيل الصوتي ، عادةً ما يتم التحدث ببعض المانترا والجزيئات النمطية بشكل معتاد ، والتي يمكن تحويلها إلى لغة مكتوبة باستخدام ChatGPT لتحسين تأثير تحويل الصوت إلى نص. أيضًا ، يمكن استخدامه لتنظيم النص غير المرتب. نشأت من @ 玉树 芝兰 师 &quot;استخدم لغة مختصرة لتنظيم هذه الفقرة ، لتكون منطقية وواضحة ، ولإزالة الأخطاء المطبعية&quot;."
  },
  "bn": {
    "title": "ভয়েস ইনপুট অপ্টিমাইজেশান",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Bengali. Please begin by editing the following text: ",
    "description": "অনুগ্রহ করে সংক্ষিপ্ত এবং পরিষ্কার ভাষা ব্যবহার করুন, তাদের যৌক্তিক প্রবাহ উন্নত করতে নিম্নলিখিত অনুচ্ছেদগুলি সম্পাদনা করুন, যেকোনো টাইপোগ্রাফিক ত্রুটিগুলি সরিয়ে দিন এবং চীনা ভাষায় উত্তর দিন। নিবন্ধের মূল অর্থ রাখতে ভুলবেন না। অনুগ্রহ করে নিম্নলিখিত পাঠ্য সম্পাদনা করে শুরু করুন: [স্পিচ টেক্সট ইনপুট]",
    "remark": "বক্তৃতাকে পাঠ্যে রূপান্তর করতে প্রথমে একটি তৃতীয় পক্ষের অ্যাপ্লিকেশন ব্যবহার করুন এবং তারপর প্রক্রিয়াকরণের জন্য ChatGPT ব্যবহার করুন৷ ভয়েস রেকর্ডিংয়ের সময়, কিছু মন্ত্র এবং মডেল কণা সাধারণত অভ্যাসগতভাবে উচ্চারিত হয়, যা ভয়েস-টু-টেক্সট রূপান্তরের প্রভাবকে অপ্টিমাইজ করতে ChatGPT ব্যবহার করে লিখিত ভাষায় রূপান্তরিত করা যেতে পারে। এছাড়াও, এটি ক্রমহীন পাঠ্য সংগঠিত করতে ব্যবহার করা যেতে পারে। @玉树芝兰师-এর &quot;এই অনুচ্ছেদটি সংগঠিত করতে সংক্ষিপ্ত ভাষা ব্যবহার করুন, যৌক্তিক এবং স্পষ্ট হতে এবং টাইপো অপসারণ&quot; থেকে উদ্ভূত।"
  },
  "website": null,
  "tags": [
    "write"
  ],
  "id": 3,
  "weight": 768
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
