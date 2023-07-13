import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "开发：微信小程序",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [开发项目]. The text displayed in the view should be in Chinese. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "作为微信小程序开发者，您的任务是使用微信小程序原生开发，编写一个计数器页面。请回复满足以下要求的代码：创建一个包含 wxml、js、wxss 和 json 文件的微信小程序页面，并在其中实现一个计数器页面。视图中显示的文本应为中文。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "辅助微信小程序开发。来自 @gandli 的投稿。"
  },
  "en": {
    "title": "WeChat Mini Program",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "remark": "Auxiliary WeChat mini program development. Contributed by @gandli."
  },
  "ja": {
    "title": "開発：WeChat アプレット",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Janpanese. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "WeChat アプレット開発者として、WeChat アプレットのネイティブ開発を使ってカウンターページを書くことが課題となっています。以下の要件を満たすコードで回答してください：wxml、js、wxss、json ファイルを含む WeChat アプレットページを作成し、その中にカウンターページを実装してください。ビューに表示されるテキストは中国語である必要があります。なお、これらの要件を満たすために必要なコードのみを提供していただき、説明や解説は不要です。",
    "remark": "WeChat アプレット開発を支援する。gandli さんからの寄稿です。"
  },
  "ko": {
    "title": "개발: 위챗 애플릿",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Korean. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "WeChat 애플릿 개발자는 WeChat 애플릿 네이티브 개발을 사용하여 카운터 페이지를 작성해야 합니다. 다음 요구 사항을 충족하는 코드로 응답해 주세요. wxml, js, wxss 및 json 파일이 포함된 WeChat 애플릿 페이지를 생성하고 그 안에 카운터 페이지를 구현하세요. 뷰에 표시되는 텍스트는 중국어여야 합니다. 이러한 요구 사항을 충족하는 데 필요한 코드만 제공해야 하며, 설명이나 설명은 필요하지 않습니다.",
    "remark": "WeChat 애플릿 개발 지원. gandli 의 기여."
  },
  "es": {
    "title": "Desarrollo: Programa WeChat Mini",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Spanish. Provide only the necessary code to meet these requirements without explanations or descriptions..",
    "description": "Como desarrollador de WeChat Mini Program, su tarea es utilizar el desarrollo nativo de WeChat Mini Programs para escribir una página de contador. Responda el código que cumpla con los siguientes requisitos: Cree una página de applet de Wechat que contenga archivos wxml, js, wxss y json, e implemente una página de contador en ella. El texto que se muestra en la vista debe estar en chino. Tenga en cuenta que solo debe proporcionar el código necesario para cumplir con estos requisitos; no se requiere explicación ni descripción.",
    "remark": "Asistir en el desarrollo de applets de WeChat. Contribución de @gandli."
  },
  "fr": {
    "title": "Développement : Applet WeChat",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in French. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "En tant que développeur d'applet wechat, votre tâche consiste à écrire une page de compteur en utilisant le développement natif de l'applet wechat. Veuillez répondre avec un code qui répond aux exigences suivantes : créer une page d'applet wechat avec des fichiers wxml, js, wxss et json et y implémenter une page de compteur. Le texte affiché dans la vue doit être en chinois. Veuillez noter que vous ne devez fournir que le code nécessaire pour répondre à ces exigences ; aucune explication ou description n'est requise.",
    "remark": "Aide au développement de l'applet WeChat. Contribution de @gandli."
  },
  "de": {
    "title": "Entwicklung: WeChat Applet",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in German. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Als Wechat-Applet-Entwickler ist es Ihre Aufgabe, eine Zähler-Seite mit Wechat-Applet native Entwicklung zu schreiben. Bitte antworten Sie mit Code, der die folgenden Anforderungen erfüllt: Erstellen Sie eine Wechat-Applet-Seite mit wxml-, js, wxss- und json-Dateien und implementieren Sie eine Zählerseite darin. Der in der Ansicht angezeigte Text sollte auf Chinesisch sein. Bitte beachten Sie, dass Sie nur den Code bereitstellen sollten, der notwendig ist, um diese Anforderungen zu erfüllen; eine Erklärung oder Beschreibung ist nicht erforderlich.",
    "remark": "Unterstützung bei der Entwicklung des WeChat-Applets. Beitrag von @gandli."
  },
  "it": {
    "title": "Sviluppo: programma WeChat Mini",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Italian. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "In qualità di sviluppatore di WeChat Mini Program, il tuo compito è utilizzare lo sviluppo nativo di WeChat Mini Program per scrivere una pagina contatore. Rispondi al codice che soddisfa i seguenti requisiti: Crea una pagina dell&#39;applet Wechat contenente i file wxml, js, wxss e json e implementa una pagina contatore al suo interno. Il testo visualizzato nella vista dovrebbe essere in cinese. Si noti che è necessario fornire solo il codice necessario per soddisfare questi requisiti; non è richiesta alcuna spiegazione o descrizione.",
    "remark": "Assistere nello sviluppo di applet WeChat. Contributo di @gandli."
  },
  "ru": {
    "title": "Разработка: Мини-программа WeChat",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Russian. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Как разработчик мини-программы WeChat, ваша задача — использовать нативную разработку мини-программ WeChat для написания встречной страницы. Пожалуйста, ответьте на код, который соответствует следующим требованиям: Создайте страницу апплета Wechat, содержащую файлы wxml, js, wxss и json, и внедрите в нее страницу счетчика. Текст, отображаемый в представлении, должен быть на китайском языке. Обратите внимание, что вы должны предоставить только тот код, который необходим для выполнения этих требований, никаких объяснений или описаний не требуется.",
    "remark": "Помощь в разработке апплетов WeChat. Вклад от @gandli."
  },
  "pt": {
    "title": "Desenvolvimento: Mini Programa WeChat",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Portuguese. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Como desenvolvedor do WeChat Mini Program, sua tarefa é usar o desenvolvimento nativo dos WeChat Mini Programs para escrever uma contrapágina. Por favor, responda o código que atende aos seguintes requisitos: Crie uma página de miniaplicativo Wechat contendo arquivos wxml, js, wxss e json e implemente uma página de contador nela. O texto exibido na exibição deve estar em chinês. Observe que você deve fornecer apenas o código necessário para atender a esses requisitos; nenhuma explicação ou descrição é necessária.",
    "remark": "Auxiliar no desenvolvimento de applets WeChat. Contribuição de @gandli."
  },
  "hi": {
    "title": "विकास: वीचैट मिनी प्रोग्राम",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Hindi. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "एक WeChat Mini प्रोग्राम डेवलपर के रूप में, आपका कार्य एक काउंटर पेज लिखने के लिए WeChat Mini प्रोग्राम्स के मूल विकास का उपयोग करना है। कृपया उस कोड का उत्तर दें जो निम्नलिखित आवश्यकताओं को पूरा करता हो: एक वीचैट एप्लेट पेज बनाएं जिसमें wxml, js, wxss और json फ़ाइलें हों और उसमें एक काउंटर पेज लागू करें। दृश्य में प्रदर्शित पाठ चीनी भाषा में होना चाहिए। ध्यान दें कि आपको केवल इन आवश्यकताओं को पूरा करने के लिए आवश्यक कोड प्रदान करना चाहिए; किसी स्पष्टीकरण या विवरण की आवश्यकता नहीं है।",
    "remark": "WeChat एप्लेट के विकास में सहायता करें। @gandli से योगदान।"
  },
  "ar": {
    "title": "التطوير: برنامج WeChat Mini",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Arabic. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "بصفتك مطور برنامج WeChat Mini ، فإن مهمتك هي استخدام التطوير الأصلي لبرامج WeChat Mini لكتابة صفحة عداد. الرجاء الرد على الكود الذي يفي بالمتطلبات التالية: قم بإنشاء صفحة Wechat الصغيرة تحتوي على ملفات wxml و js و wxss و json ، وقم بتنفيذ صفحة عداد فيها. يجب أن يكون النص المعروض بالصينية. لاحظ أنه يجب عليك فقط تقديم الكود اللازم لتلبية هذه المتطلبات ؛ ولا يلزم شرح أو وصف.",
    "remark": "المساعدة في تطوير تطبيقات WeChat الصغيرة. مساهمة منgandli."
  },
  "bn": {
    "title": "উন্নয়ন: WeChat মিনি প্রোগ্রাম",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Bengali. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "একজন ওয়েচ্যাট মিনি প্রোগ্রাম ডেভেলপার হিসেবে, আপনার কাজ হল একটি পাল্টা পৃষ্ঠা লেখার জন্য WeChat মিনি প্রোগ্রামের নেটিভ ডেভেলপমেন্ট ব্যবহার করা। অনুগ্রহ করে নিম্নলিখিত প্রয়োজনীয়তাগুলি পূরণ করে এমন কোডটির উত্তর দিন: wxml, js, wxss এবং json ফাইল সমন্বিত একটি Wechat অ্যাপলেট পৃষ্ঠা তৈরি করুন এবং এতে একটি পাল্টা পৃষ্ঠা প্রয়োগ করুন৷ ভিউতে প্রদর্শিত পাঠ্য চীনা ভাষায় হওয়া উচিত। মনে রাখবেন যে এই প্রয়োজনীয়তাগুলি পূরণ করার জন্য আপনাকে শুধুমাত্র প্রয়োজনীয় কোড প্রদান করা উচিত; কোন ব্যাখ্যা বা বর্ণনার প্রয়োজন নেই।",
    "remark": "WeChat অ্যাপলেটের বিকাশে সহায়তা করুন। @gandli থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 177,
  "weight": 2724
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
