import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "海量资料：输入",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. Are you ready?",
    "description": "让我们重新开始一轮问答，我接下来要在多个对话中，提供给你用“@”编号的文章内容，请先记住，但不要摘要，可以吗？",
    "remark": "要突破 ChatGPT 的输入限制，可以按照每 2000 个字符将文章分割成多个段落，并在每个段落的第一行以「@编号」开头，例如：@1。文本分割可借助导航栏上的文本处理工具来完成。请注意，不要理会 GPT 的回答，这不会影响您的最终使用效果。本方法摘自电脑玩物作者 Esor Huang 的文章。"
  },
  "en": {
    "title": "Massive data: input",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. Are you ready?",
    "remark": "To surpass ChatGPT's input limitations, you can divide the article into multiple paragraphs, with each containing no more than 2000 characters. Start each paragraph with a '@number' tag on the first line, such as '@1'. Use the text processing tools in the navigation bar to split the text. Note that you can ignore GPT's responses as they will not affect your final result. Excerpted from an article by Esor Huang."
  },
  "ja": {
    "title": "情報量の多さ：インプット",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Janpanese. Are you ready?.",
    "description": "また Q&A ラウンドを始めましょう。複数の会話で「@」が付いた記事の内容を提供しますので、まずは覚えてください、でもまとめないでくださいね？",
    "remark": "ChatGPT の入力制限を解除するには、テキストを 2000 文字ずつに分割し、各段落の最初の行を「@数字」で開始します（例：@1）。なお、GPT の回答は無視しても、最終的な結果には影響しません。この方法は、『Computer Playthings』の著者である Esor Huang 氏の記事から引用しています。"
  },
  "ko": {
    "title": "많은 양의 정보: 입력",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Korean. Are you ready?.",
    "description": "다시 Q&A 라운드를 시작하겠습니다. 여러 대화에서 '@'로 번호가 매겨진 글의 내용을 알려드릴 테니 먼저 기억해 두시고 요약하지 마세요, 알겠죠?",
    "remark": "ChatGPT 의 입력 제한을 깨려면 텍스트를 각각 2000 자씩 단락으로 나누고 각 단락의 첫 줄을 '@ 숫자'(예: @1) 로 시작하세요. 텍스트 분할은 탐색 모음에 있는 텍스트 처리 도구를 사용하여 할 수 있습니다. GPT 의 답변을 무시해도 최종 결과에 영향을 미치지 않는다는 점에 유의하세요. 이 방법은 컴퓨터 놀잇감의 저자 Esor Huang 의 글에서 가져온 것입니다."
  },
  "es": {
    "title": "Cantidad masiva de información: entrada",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Spanish. Are you ready?.",
    "description": "Empecemos de nuevo la ronda de preguntas y respuestas, voy a facilitarte el contenido de los artículos numerados con una \"@\" en varias conversaciones, así que recuérdalo antes, pero no lo resumas, ¿vale?",
    "remark": "Para superar las limitaciones de entrada de ChatGPT, divida el artículo en párrafos cada 2000 caracteres y comience la primera línea de cada párrafo con un \"número @\", por ejemplo @1. La división del texto puede hacerse con ayuda de la herramienta de procesamiento de texto de la barra de navegación. Tenga en cuenta que no tener en cuenta la respuesta de GPT no afectará a sus resultados finales. Este método está extraído de un artículo de Esor Huang, autor de Computer Playbook."
  },
  "fr": {
    "title": "Quantité massive d'informations : entrée",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in French. Are you ready?.",
    "description": "Je vais vous fournir le contenu des articles numérotés d'un \"@\" dans plusieurs conversations, alors souvenez-vous en d'abord, mais ne le résumez pas, d'accord ?",
    "remark": "Pour dépasser les limites d'entrée de ChatGPT, divisez l'article en paragraphes tous les 2000 caractères et commencez la première ligne de chaque paragraphe par un \"@ numéro\", par exemple @1. La division du texte peut être effectuée à l'aide de l'outil de traitement de texte sur la barre de navigation. Veuillez noter que le fait de ne pas tenir compte de la réponse de GPT n'affectera pas vos résultats finaux. Cette méthode est extraite d'un article d'Esor Huang, auteur de Computer Playbook."
  },
  "de": {
    "title": "Massive Menge an Informationen: Input",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in German. Are you ready?.",
    "description": "Lassen Sie uns die Fragerunde von vorne beginnen, ich werde Ihnen den Inhalt der mit einem \"@\" nummerierten Artikel in mehreren Gesprächen zur Verfügung stellen, also merken Sie sich das bitte zuerst, aber fassen Sie es nicht zusammen, okay?",
    "remark": "Um die Eingabebeschränkungen von ChatGPT zu umgehen, teilen Sie den Artikel alle 2000 Zeichen in Absätze auf und beginnen Sie die erste Zeile jedes Absatzes mit einer \"@-Nummer\", z.B. @1. Die Textaufteilung kann mit Hilfe des Textverarbeitungswerkzeugs in der Navigationsleiste vorgenommen werden. Bitte beachten Sie, dass die Nichtbeachtung der Antwort von GPT keinen Einfluss auf Ihr Endergebnis hat. Diese Methode stammt aus einem Artikel von Esor Huang, dem Autor von Computer Playbook."
  },
  "it": {
    "title": "Quantità enorme di informazioni: input",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Italian. Are you ready?.",
    "description": "Ricominciamo il giro di domande e risposte, vi fornirò il contenuto degli articoli numerati con una \"@\" in più conversazioni, quindi per favore ricordatevi prima di tutto questo, ma non riassumetelo, ok?",
    "remark": "Per superare le limitazioni di input di ChatGPT, dividete l'articolo in paragrafi ogni 2000 caratteri e iniziate la prima riga di ogni paragrafo con un \"numero @\", ad esempio @1. La suddivisione del testo può essere effettuata con l'aiuto dello strumento di elaborazione del testo nella barra di navigazione. Si noti che l'inosservanza della risposta di GPT non influisce sui risultati finali. Questo metodo è estratto da un articolo di Esor Huang, autore di Computer Playbook."
  },
  "ru": {
    "title": "Массивный объем информации: ввод",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Russian. Are you ready?.",
    "description": "Давайте начнем раунд вопросов и ответов заново, я буду приводить содержание статей, пронумерованных буквой \"@\" в нескольких беседах, поэтому, пожалуйста, сначала запомните это, но не обобщайте, хорошо?",
    "remark": "Чтобы преодолеть ограничения ChatGPT по вводу текста, разбейте статью на абзацы через каждые 2000 символов и начинайте первую строку каждого абзаца с символа \"@\", например, @1. Разбить текст на абзацы можно с помощью инструмента обработки текста на панели навигации. Обратите внимание, что игнорирование ответа GPT не повлияет на конечный результат. Данный метод взят из статьи Эсора Хуанга, автора книги Computer Playbook."
  },
  "pt": {
    "title": "Grande quantidade de informação: entrada",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Portuguese. Are you ready?.",
    "description": "Vamos recomeçar a ronda de perguntas e respostas, vou fornecer-vos o conteúdo dos artigos numerados com um \"@\" em várias conversas, por isso lembrem-se disso primeiro, mas não o resumam, está bem?",
    "remark": "Para ultrapassar as limitações de entrada do ChatGPT, divida o artigo em parágrafos a cada 2000 caracteres e comece a primeira linha de cada parágrafo com um \"número @\", por exemplo, @1. A divisão do texto pode ser feita com a ajuda da ferramenta de processamento de texto na barra de navegação. Tenha em atenção que ignorar a resposta do GPT não afectará os seus resultados finais. Este método foi extraído de um artigo de Esor Huang, autor de Computer Playbook."
  },
  "hi": {
    "title": "मास डेटा: इनपुट",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Hindi. Are you ready?.",
    "description": "चलिए एक और प्रश्नोत्तर दौर करते हैं, और मैं आपको कई वार्तालापों में &quot;@&quot; क्रमांकित लेख की सामग्री देने जा रहा हूं, कृपया पहले याद रखें, लेकिन कोई सारांश नहीं, ठीक है?",
    "remark": "चैटजीपीटी की इनपुट सीमा को तोड़ने के लिए, आप लेख को प्रत्येक 2000 अक्षरों में कई पैराग्राफ में विभाजित कर सकते हैं, और प्रत्येक पैराग्राफ की पहली पंक्ति में &quot;@ नंबर&quot; से शुरू कर सकते हैं, उदाहरण के लिए: @1। नेविगेशन बार पर टेक्स्ट प्रोसेसिंग टूल के साथ टेक्स्ट सेगमेंटेशन किया जा सकता है। कृपया ध्यान दें, GPT के उत्तर से परेशान न हों, यह आपके अंतिम उपयोग को प्रभावित नहीं करेगा। यह विधि कंप्यूटर खिलौनों के लेखक एसोर हुआंग के एक लेख से ली गई है।"
  },
  "ar": {
    "title": "البيانات الجماعية: المدخلات",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Arabic. Are you ready?.",
    "description": "دعنا نجري جولة أخرى للأسئلة والأجوبة ، وسأقدم لك محتوى المقالة المرقمة &quot;@&quot; في محادثات متعددة ، من فضلك تذكر أولاً ، ولكن بدون ملخص ، حسنًا؟",
    "remark": "لاختراق حد الإدخال في ChatGPT ، يمكنك تقسيم المقالة إلى فقرات متعددة كل 2000 حرف ، والبدء بـ &quot;@ number&quot; في السطر الأول من كل فقرة ، على سبيل المثال: @ 1. يمكن إجراء تجزئة النص باستخدام أدوات معالجة النص على شريط التنقل. يرجى ملاحظة ، لا تهتم بإجابة GPT ، فلن يؤثر ذلك على استخدامك النهائي. تم اقتباس هذه الطريقة من مقال بقلم Esor Huang ، مؤلف ألعاب الكمبيوتر."
  },
  "bn": {
    "title": "ভর তথ্য: ইনপুট",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Bengali. Are you ready?.",
    "description": "আসুন আরেকটি প্রশ্নোত্তর রাউন্ড করি, এবং আমি আপনাকে একাধিক কথোপকথনে &quot;@&quot; সংখ্যাযুক্ত নিবন্ধের বিষয়বস্তু দিতে যাচ্ছি, অনুগ্রহ করে প্রথমে মনে রাখবেন, কিন্তু কোন সারাংশ নেই, ঠিক আছে?",
    "remark": "ChatGPT-এর ইনপুট সীমা ভাঙতে, আপনি নিবন্ধটিকে প্রতি 2000 অক্ষরে একাধিক অনুচ্ছেদে ভাগ করতে পারেন এবং প্রতিটি অনুচ্ছেদের প্রথম লাইনে &quot;@ সংখ্যা&quot; দিয়ে শুরু করতে পারেন, উদাহরণস্বরূপ: @1৷ নেভিগেশন বারে টেক্সট প্রসেসিং টুল দিয়ে টেক্সট সেগমেন্টেশন করা যায়। অনুগ্রহ করে মনে রাখবেন, GPT এর উত্তর নিয়ে বিরক্ত করবেন না, এটি আপনার চূড়ান্ত ব্যবহারকে প্রভাবিত করবে না। এই পদ্ধতিটি কম্পিউটার খেলনার লেখক Esor Huang এর একটি নিবন্ধ থেকে উদ্ধৃত করা হয়েছে।"
  },
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 238,
  "weight": 1969
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
