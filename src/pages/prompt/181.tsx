import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "中英互译 - 极简版",
    "prompt": "zh-en translation of \"X\"",
    "description": "X 部分可以为中文或者英文，chatgpt 会自动翻译成相对的语言。经测试使用直双引号 (\") 效果最佳。在使用 api 调用时 role 选择 assistant 可以降低 (不能避免) 将待翻译文本理解为指令的概率。",
    "remark": "节省 token 的翻译器 prompt，适合用于 ChatGPT API 搭建的翻译平台。来自 @Qizhen-Yang 的投稿。"
  },
  "en": {
    "title": "English-Chinese translator②",
    "prompt": "zh-en translation of \"X\"",
    "remark": "The most economical token-saving translation prompt, suitable for building translation platforms using ChatGPT API. Contributed by @Qizhen-Yang."
  },
  "ja": {
    "title": "中国語→英語翻訳 - ミニマム版",
    "prompt": "The entire conversation and instructions should be provided in Japanese. zh-en translation of \"X\".",
    "description": "X の部分は中国語でも英語でもよく、chatgpt は自動的にそれぞれの言語に翻訳します。まっすぐな二重引用符（\"）を使用することが最もうまくいくことがテストされています。api コールを使用するときに役割のためにアシスタントを選択すると、翻訳されるテキストがコマンドとして解釈される（避けられない）確率を減らすことができます。",
    "remark": "API で構築された翻訳プラットフォーム ChatGPT のためのトークン節約型翻訳者プロンプトです。寄稿者：@Qizhen-Yang。"
  },
  "ko": {
    "title": "중국어에서 영어로 번역 - 미니멀리스트 버전",
    "prompt": "The entire conversation and instructions should be provided in Korean. zh-en translation of \"X\".",
    "description": "X 부분은 중국어 또는 영어로 입력할 수 있으며, chatgpt 가 자동으로 해당 언어로 번역합니다. 곧은 큰따옴표 (\") 를 사용하는 것이 가장 잘 작동하는 것으로 테스트되었습니다. API 호출을 사용할 때 역할에 어시스턴트를 선택하면 번역할 텍스트가 명령으로 해석될 (불가피한) 확률을 줄일 수 있습니다.",
    "remark": "ChatGPT API 로 구축된 번역 플랫폼을 위한 토큰 절약형 번역기 프롬프트입니다. Qizhen-Yang 이 기여했습니다."
  },
  "es": {
    "title": "Traducción del chino al inglés - Versión minimalista",
    "prompt": "The entire conversation and instructions should be provided in Spanish. zh-en translation of \"X\".",
    "description": "La parte X puede estar en chino o en inglés, y chatgpt la traducirá automáticamente al idioma correspondiente. Se ha comprobado que el uso de comillas dobles rectas (\") funciona mejor. Seleccionar asistente para el rol cuando se usan llamadas api reduce (pero no evita) la posibilidad de que el texto a traducir sea interpretado como un comando.",
    "remark": "Aviso de traductor que ahorra tokens para la plataforma de traducción basada en la API ChatGPT. Contribución de @Qizhen-Yang."
  },
  "fr": {
    "title": "Traduction du chinois vers l'anglais - Version minimaliste",
    "prompt": "The entire conversation and instructions should be provided in French. zh-en translation of \"X\".",
    "description": "La partie X peut être en chinois ou en anglais, et chatgpt la traduira automatiquement dans la langue correspondante. Il a été testé que l'utilisation de guillemets droits (\") donne les meilleurs résultats. Le fait de sélectionner assistant pour le rôle lors de l'utilisation d'appels api réduit (mais n'empêche pas) le risque que le texte traduit soit interprété comme des instructions.",
    "remark": "Invite de traduction économisant des jetons pour la plateforme de traduction ChatGPT construite sur l'API. Contribution de @Qizhen-Yang."
  },
  "de": {
    "title": "Übersetzung Chinesisch-Englisch - Minimalistische Version",
    "prompt": "The entire conversation and instructions should be provided in German. zh-en translation of \"X\".",
    "description": "Der X-Teil kann in Chinesisch oder Englisch sein, und chatgpt wird ihn automatisch in die entsprechende Sprache übersetzen. Es hat sich gezeigt, dass die Verwendung von einfachen Anführungszeichen (\") am besten funktioniert. Die Auswahl von Assistent für die Rolle bei der Verwendung von api-Aufrufen reduziert (verhindert aber nicht) die Chance, dass der zu übersetzende Text als Befehl interpretiert wird.",
    "remark": "Token-sparende Übersetzer-Eingabeaufforderung für die ChatGPT API-basierte Übersetzungsplattform. Beitrag von @Qizhen-Yang."
  },
  "it": {
    "title": "Traduzione dal cinese all'inglese - Versione minimalista",
    "prompt": "The entire conversation and instructions should be provided in Italian. zh-en translation of \"X\".",
    "description": "La parte X può essere in cinese o in inglese e chatgpt la tradurrà automaticamente nella lingua corrispondente. È stato testato che l'uso di doppi apici (\") funziona meglio. La selezione del ruolo di assistente quando si utilizzano le chiamate api riduce (ma non impedisce) la possibilità che il testo da tradurre venga interpretato come un comando.",
    "remark": "Richiesta di traduttore con risparmio di token per la piattaforma di traduzione basata su API ChatGPT. Contributo di @Qizhen-Yang."
  },
  "ru": {
    "title": "Перевод с китайского на английский - минималистическая версия",
    "prompt": "The entire conversation and instructions should be provided in Russian. zh-en translation of \"X\".",
    "description": "Часть X может быть на китайском или английском языке, и chatgpt автоматически переведет ее на соответствующий язык. Было проверено, что лучше всего работает использование прямых двойных кавычек (\"\"). Выбор роли помощника при использовании apiвызовов снижает (но не предотвращает) вероятность того, что переводимый текст будет интерпретирован как команда.",
    "remark": "Подсказка переводчика с сохранением токенов для платформы переводов ChatGPT, построенной на основе API. Вклад от @Qizhen-Yang."
  },
  "pt": {
    "title": "Tradução de chinês para inglês - Versão minimalista",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. zh-en translation of \"X\".",
    "description": "A parte X pode estar em chinês ou inglês, e o chatgpt traduzi-la-á automaticamente para a língua correspondente. Foi testado que usar aspas duplas directas (\") funciona melhor. Selecionar assistente para o papel ao usar chamadas api reduz (mas não impede) a hipótese de o texto a ser traduzido ser interpretado como um comando.",
    "remark": "prompt de tradutor que economiza token para a plataforma de tradução ChatGPT API-built. Contribuição de @Qizhen-Yang."
  },
  "hi": {
    "title": "चीनी-अंग्रेज़ी अनुवाद - मिनिमलिस्ट",
    "prompt": "The entire conversation and instructions should be provided in Hindi. zh-en translation of \"X\".",
    "description": "भाग X चीनी या अंग्रेजी में हो सकता है, और चैटजीपीटी स्वचालित रूप से संबंधित भाषा में अनुवादित हो जाएगा। यह परीक्षण किया गया है कि सीधे दोहरे उद्धरण चिह्नों (&quot;) का उपयोग करना सबसे अच्छा काम करता है। एपीआई कॉल का उपयोग करते समय भूमिका के लिए सहायक का चयन करने से निर्देश के रूप में अनुवादित किए जाने वाले पाठ को समझने की संभावना कम (अपरिहार्य) हो सकती है।",
    "remark": "एक अनुवादक संकेत जो टोकन सहेजता है, चैटजीपीटी एपीआई पर निर्मित अनुवाद प्लेटफार्मों के लिए उपयुक्त है। @Qizhen-यांग से योगदान।"
  },
  "ar": {
    "title": "الترجمة الصينية-الإنجليزية - الحد الأدنى",
    "prompt": "The entire conversation and instructions should be provided in Arabic. zh-en translation of \"X\".",
    "description": "يمكن أن يكون الجزء X باللغة الصينية أو الإنجليزية ، وستتم ترجمة chatgpt تلقائيًا إلى اللغة المقابلة. لقد تم اختبار أن استخدام علامات الاقتباس المزدوجة (&quot;) يعمل بشكل أفضل. يمكن أن يؤدي اختيار المساعد للدور عند استخدام استدعاء api إلى تقليل (لا مفر منه) احتمالية فهم النص المراد ترجمته كتعليمات.",
    "remark": "موجه مترجم يحفظ الرموز المميزة المناسبة لمنصات الترجمة المبنية على واجهة برمجة تطبيقات ChatGPT. مساهمة من @ Qizhen-Yang."
  },
  "bn": {
    "title": "চীনা-ইংরেজি অনুবাদ - মিনিমালিস্ট",
    "prompt": "The entire conversation and instructions should be provided in Bengali. zh-en translation of \"X\".",
    "description": "পার্ট X চীনা বা ইংরেজিতে হতে পারে এবং chatgpt স্বয়ংক্রিয়ভাবে সংশ্লিষ্ট ভাষায় অনুবাদ করবে। এটি পরীক্ষা করা হয়েছে যে সোজা ডাবল কোট (&quot;) ব্যবহার করা সবচেয়ে ভাল কাজ করে৷ api কল ব্যবহার করার সময় ভূমিকার জন্য সহকারী নির্বাচন করা একটি নির্দেশ হিসাবে অনুবাদ করার জন্য পাঠ্য বোঝার সম্ভাবনা হ্রাস করতে পারে (অনিবার্য)৷",
    "remark": "একটি অনুবাদক প্রম্পট যা টোকেন সংরক্ষণ করে, যা ChatGPT API-তে নির্মিত অনুবাদ প্ল্যাটফর্মের জন্য উপযুক্ত। @কিজেন-ইয়াং থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "language"
  ],
  "id": 181,
  "weight": 1361
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
