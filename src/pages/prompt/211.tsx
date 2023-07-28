import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "文章高亮",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. Here is the text: [文章]",
    "description": "仔细阅读以下文本，并使用双星号（**）突出显示要强调的单词或短语。不要改变原始文本或进行摘要。",
    "remark": "高亮会增加文章的可读性。不过，ChatGPT 默认显示 Markdown 语法。结果出来后，需要手动框选高亮部分。我也试过用其他符号替代高亮提示，但效果不太好。因此，暂时先使用这个版本。"
  },
  "en": {
    "title": "Highlight the article",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. Here is the text: []",
    "remark": "Highlight augments the legibility of a written composition. Nonetheless, ChatGPT defaults to exhibit Markdown syntax, obliging one to manually select the highlighted segment after the output has been generated."
  },
  "ja": {
    "title": "記事の強調表示",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Janpanese. Here is the text: [].",
    "description": "以下の文章をよく読み、強調したい単語やフレーズには二重アスタリスク（**）を使用すること。原文を変更したり、要約を作成したりしないでください。",
    "remark": "ハイライトすることで、記事の可読性が高まります。ただし、ChatGPT はデフォルトで Markdown 構文を表示します。結果が出た後は、ハイライトされた部分を手動でボックス化する必要があります。また、ハイライトのヒントを他の記号に置き換えてみましたが、これはあまりうまくいきませんでした。したがって、当面はこのバージョンを使用することにします。"
  },
  "ko": {
    "title": "기사 하이라이트",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Korean. Here is the text: [].",
    "description": "아래 텍스트를 주의 깊게 읽고 강조할 단어나 문구에 이중 별표 (**) 를 사용하여 강조 표시하세요. 원문을 변경하거나 요약을 만들지 마세요.",
    "remark": "강조 표시를 하면 글의 가독성이 높아집니다. 그러나 ChatGPT 는 기본적으로 마크다운 구문을 표시합니다. 결과가 나오면 강조 표시된 섹션에 수동으로 상자를 채워야 합니다. 강조 표시 힌트를 다른 기호로 대체하는 것도 시도해 보았지만 잘 작동하지 않았습니다. 따라서 당분간은 이 버전을 사용할 것입니다."
  },
  "es": {
    "title": "Artículos destacados",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Spanish. Here is the text: [].",
    "description": "Lee atentamente el siguiente texto y utiliza los asteriscos dobles (**) para resaltar las palabras o frases que quieras destacar. No modifique el texto original ni haga resúmenes.",
    "remark": "El resaltado aumentará la legibilidad del artículo. Sin embargo, ChatGPT muestra la sintaxis Markdown por defecto. Cuando salen los resultados, hay que recuadrar manualmente la sección resaltada. También he probado a sustituir las puntas de resaltado por otros símbolos, pero no funciona muy bien. Así que, por ahora, usa esta versión."
  },
  "fr": {
    "title": "Mise en évidence d'un article",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in French. Here is the text: [].",
    "description": "Lisez attentivement le texte suivant et utilisez les doubles astérisques (**) pour mettre en évidence les mots ou les phrases à souligner. Ne modifiez pas le texte original et ne faites pas de résumé.",
    "remark": "Le surlignage permet d'améliorer la lisibilité de l'article. Cependant, ChatGPT affiche la syntaxe Markdown par défaut. Lorsque les résultats sont affichés, vous devez encadrer manuellement la section surlignée. J'ai également essayé de remplacer les conseils de surlignage par d'autres symboles, mais cela ne fonctionne pas très bien. Utilisez donc cette version pour l'instant."
  },
  "de": {
    "title": "Artikel hervorheben",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in German. Here is the text: [].",
    "description": "Lesen Sie den folgenden Text aufmerksam durch und verwenden Sie doppelte Sternchen (**), um Wörter oder Sätze hervorzuheben. Ändern Sie den Originaltext nicht und erstellen Sie keine Zusammenfassungen.",
    "remark": "Die Hervorhebung erhöht die Lesbarkeit des Artikels. ChatGPT zeigt jedoch standardmäßig die Markdown-Syntax an. Wenn die Ergebnisse angezeigt werden, müssen Sie den hervorgehobenen Abschnitt manuell umrahmen. Ich habe auch versucht, die Hervorhebungsspitzen durch andere Symbole zu ersetzen, aber das funktioniert nicht sehr gut. Also, verwenden Sie diese Version für jetzt."
  },
  "it": {
    "title": "Evidenziazione dell'articolo",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Italian. Here is the text: [].",
    "description": "Leggete attentamente il testo che segue e utilizzate i doppi asterischi (**) per evidenziare parole o frasi da sottolineare. Non modificate il testo originale e non fate riassunti.",
    "remark": "L'evidenziazione aumenterà la leggibilità dell'articolo. Tuttavia, ChatGPT visualizza la sintassi Markdown per impostazione predefinita. Quando vengono visualizzati i risultati, è necessario riquadrare manualmente la sezione evidenziata. Ho anche provato a sostituire i suggerimenti di evidenziazione con altri simboli, ma non funziona molto bene. Quindi, per il momento, utilizzate questa versione."
  },
  "ru": {
    "title": "Выделение статей",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Russian. Here is the text: [].",
    "description": "Внимательно прочитайте следующий текст и используйте двойные звездочки (**) для выделения слов или фраз. Не изменяйте оригинальный текст и не делайте резюме.",
    "remark": "Выделение повышает читабельность статьи. Однако по умолчанию ChatGPT отображает синтаксис Markdown. При выводе результатов необходимо вручную поместить выделенную часть в рамку. Я также пробовал заменять подсказки для выделения другими символами, но это не очень хорошо работает. Так что пока пользуйтесь этой версией."
  },
  "pt": {
    "title": "Destaque de artigos",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Portuguese. Here is the text: [].",
    "description": "Lê atentamente o texto que se segue e utiliza os asteriscos duplos (**) para sublinhar palavras ou frases. Não alteres o texto original nem faças resumos.",
    "remark": "O destaque aumentará a legibilidade do artigo. No entanto, o ChatGPT apresenta a sintaxe Markdown por defeito. Quando os resultados aparecem, é necessário encaixar manualmente a secção destacada. Também tentei substituir as dicas de destaque por outros símbolos, mas não funciona muito bem. Portanto, use esta versão por enquanto."
  },
  "hi": {
    "title": "लेख पर प्रकाश डाला गया",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Hindi. Here is the text: [].",
    "description": "निम्नलिखित पाठ को ध्यान से पढ़ें और जोर देने के लिए शब्दों या वाक्यांशों को उजागर करने के लिए दोहरे तारांकन (**) का उपयोग करें। मूल पाठ में परिवर्तन न करें या सारांश न बनाएं।",
    "remark": "हाइलाइट करने से लेख की पठनीयता बढ़ेगी. हालाँकि, ChatGPT डिफ़ॉल्ट रूप से मार्कडाउन सिंटैक्स प्रदर्शित करता है। परिणाम सामने आने के बाद, आपको हाइलाइट किए गए भाग को मैन्युअल रूप से चुनना होगा। मैंने हाइलाइटिंग के लिए अन्य प्रतीकों को प्रतिस्थापित करने का भी प्रयास किया है, लेकिन वह बहुत अच्छी तरह से काम नहीं कर सका। इसलिए, अभी इस संस्करण का उपयोग करें।"
  },
  "ar": {
    "title": "تسليط الضوء على المادة",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Arabic. Here is the text: [].",
    "description": "اقرأ النص التالي بعناية واستخدم العلامات النجمية المزدوجة (**) لتمييز الكلمات أو العبارات للتأكيد. لا تقم بتغيير النص الأصلي أو عمل ملخصات.",
    "remark": "سيؤدي إبراز إلى زيادة سهولة قراءة المقالة. ومع ذلك ، يعرض ChatGPT بناء جملة Markdown افتراضيًا. بعد ظهور النتيجة ، تحتاج إلى تحديد الجزء المميز يدويًا. لقد حاولت أيضًا استبدال الرموز الأخرى للإبراز ، لكن هذا لم ينجح جيدًا. لذلك ، استخدم هذا الإصدار في الوقت الحالي."
  },
  "bn": {
    "title": "নিবন্ধ হাইলাইট",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Bengali. Here is the text: [].",
    "description": "নিম্নলিখিত পাঠ্যটি মনোযোগ সহকারে পড়ুন এবং জোর দেওয়ার জন্য শব্দ বা বাক্যাংশগুলিকে হাইলাইট করতে ডবল তারকাচিহ্ন (**) ব্যবহার করুন। মূল পাঠ্য পরিবর্তন করবেন না বা সারাংশ তৈরি করবেন না।",
    "remark": "হাইলাইট করা নিবন্ধটির পাঠযোগ্যতা বৃদ্ধি করবে। যাইহোক, ChatGPT ডিফল্টরূপে মার্কডাউন সিনট্যাক্স প্রদর্শন করে। ফলাফল বেরিয়ে আসার পরে, আপনাকে ম্যানুয়ালি হাইলাইট করা অংশটি নির্বাচন করতে হবে। আমি হাইলাইট করার জন্য অন্যান্য চিহ্নগুলি প্রতিস্থাপন করার চেষ্টা করেছি, কিন্তু এটি খুব ভাল কাজ করেনি। অতএব, আপাতত এই সংস্করণটি ব্যবহার করুন।"
  },
  "website": null,
  "tags": [
    "write"
  ],
  "id": 211,
  "weight": 563
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
