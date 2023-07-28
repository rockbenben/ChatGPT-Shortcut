import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Janpanese. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "WeChat アプレット開発者として、WeChat アプレットのネイティブ開発を使ってカウンターページを書くことが課題となっています。以下の要件を満たすコードで回答してください：wxml、js、wxss、json ファイルを含む WeChat アプレットページを作成し、その中にカウンターページを実装してください。ビューに表示されるテキストは中国語である必要があります。なお、これらの要件を満たすために必要なコードのみを提供していただき、説明や解説は不要です。",
    "remark": "WeChat アプレット開発を支援する。gandli さんからの寄稿です。"
  },
  "ko": {
    "title": "개발: 위챗 애플릿",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Korean. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "WeChat 애플릿 개발자는 WeChat 애플릿 네이티브 개발을 사용하여 카운터 페이지를 작성해야 합니다. 다음 요구 사항을 충족하는 코드로 응답해 주세요. wxml, js, wxss 및 json 파일이 포함된 WeChat 애플릿 페이지를 생성하고 그 안에 카운터 페이지를 구현하세요. 뷰에 표시되는 텍스트는 중국어여야 합니다. 이러한 요구 사항을 충족하는 데 필요한 코드만 제공해야 하며, 설명이나 설명은 필요하지 않습니다.",
    "remark": "WeChat 애플릿 개발 지원. gandli 의 기여."
  },
  "es": {
    "title": "Desarrollo: WeChat Applet",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Spanish. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "Como desarrollador de wechat applet, su tarea es escribir una página de contador utilizando el desarrollo nativo de wechat applet. Por favor, responda con el código que cumpla los siguientes requisitos: crear una página de applet wechat con archivos wxml, js, wxss y json e implementar una página de contador en ella. El texto mostrado en la vista debe estar en chino. Tenga en cuenta que sólo debe proporcionar el código necesario para cumplir estos requisitos; no se requiere ninguna explicación ni descripción.",
    "remark": "Ayudando en el desarrollo del applet WeChat. Contribución de @gandli."
  },
  "fr": {
    "title": "Développement : Applet WeChat",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in French. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "En tant que développeur d'applet wechat, votre tâche consiste à écrire une page de compteur en utilisant le développement natif de l'applet wechat. Veuillez répondre avec un code qui répond aux exigences suivantes : créer une page d'applet wechat avec des fichiers wxml, js, wxss et json et y implémenter une page de compteur. Le texte affiché dans la vue doit être en chinois. Veuillez noter que vous ne devez fournir que le code nécessaire pour répondre à ces exigences ; aucune explication ou description n'est requise.",
    "remark": "Aide au développement de l'applet WeChat. Contribution de @gandli."
  },
  "de": {
    "title": "Entwicklung: WeChat Applet",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in German. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "Als Wechat-Applet-Entwickler ist es Ihre Aufgabe, eine Zähler-Seite mit Wechat-Applet native Entwicklung zu schreiben. Bitte antworten Sie mit Code, der die folgenden Anforderungen erfüllt: Erstellen Sie eine Wechat-Applet-Seite mit wxml-, js, wxss- und json-Dateien und implementieren Sie eine Zählerseite darin. Der in der Ansicht angezeigte Text sollte auf Chinesisch sein. Bitte beachten Sie, dass Sie nur den Code bereitstellen sollten, der notwendig ist, um diese Anforderungen zu erfüllen; eine Erklärung oder Beschreibung ist nicht erforderlich.",
    "remark": "Unterstützung bei der Entwicklung des WeChat-Applets. Beitrag von @gandli."
  },
  "it": {
    "title": "Sviluppo: Applet WeChat",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Italian. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "In qualità di sviluppatore di applet wechat, il tuo compito è quello di scrivere una pagina di contatore utilizzando lo sviluppo nativo di applet wechat. Si prega di rispondere con un codice che soddisfi i seguenti requisiti: creare una pagina applet wechat con file wxml, js, wxss e json e implementare una pagina contatore in essa. Il testo visualizzato nella vista deve essere in cinese. Si prega di notare che è necessario fornire solo il codice necessario per soddisfare questi requisiti; non è richiesta alcuna spiegazione o descrizione.",
    "remark": "Assistenza allo sviluppo dell'applet WeChat. Contributo di @gandli."
  },
  "ru": {
    "title": "Разработка: WeChat Applet",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Russian. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "Ваша задача, как разработчика wechat-апплета, написать страницу счетчика, используя нативную разработку wechat-апплета. Пожалуйста, предоставьте в ответ код, удовлетворяющий следующим требованиям: создайте страницу wechat-апплета с файлами wxml, js, wxss и json и реализуйте в ней страницу счетчика. Текст, отображаемый в представлении, должен быть на китайском языке. Пожалуйста, обратите внимание, что вы должны предоставить только код, необходимый для выполнения этих требований; пояснения или описание не требуются.",
    "remark": "Помощь в разработке апплета WeChat. Вклад от @gandli."
  },
  "pt": {
    "title": "Desenvolvimento: WeChat Applet",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Portuguese. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "Como programador de wechat applet, a sua tarefa é escrever uma página de contador utilizando o desenvolvimento nativo de wechat applet. Por favor, responda com um código que cumpra os seguintes requisitos: criar uma página wechat applet com ficheiros wxml, js, wxss e json e implementar uma página de contador na mesma. O texto apresentado na vista deve estar em chinês. Tenha em atenção que só deve fornecer o código necessário para cumprir estes requisitos; não é necessária qualquer explicação ou descrição.",
    "remark": "Ajudar no desenvolvimento do applet WeChat. Contribuição de @gandli."
  },
  "hi": {
    "title": "विकास: वीचैट मिनी प्रोग्राम",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Hindi. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "एक WeChat Mini प्रोग्राम डेवलपर के रूप में, आपका कार्य एक काउंटर पेज लिखने के लिए WeChat Mini प्रोग्राम्स के मूल विकास का उपयोग करना है। कृपया उस कोड का उत्तर दें जो निम्नलिखित आवश्यकताओं को पूरा करता हो: एक वीचैट एप्लेट पेज बनाएं जिसमें wxml, js, wxss और json फ़ाइलें हों और उसमें एक काउंटर पेज लागू करें। दृश्य में प्रदर्शित पाठ चीनी भाषा में होना चाहिए। ध्यान दें कि आपको केवल इन आवश्यकताओं को पूरा करने के लिए आवश्यक कोड प्रदान करना चाहिए; किसी स्पष्टीकरण या विवरण की आवश्यकता नहीं है।",
    "remark": "WeChat एप्लेट के विकास में सहायता करें। @gandli से योगदान।"
  },
  "ar": {
    "title": "التطوير: برنامج WeChat Mini",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Arabic. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "بصفتك مطور برنامج WeChat Mini ، فإن مهمتك هي استخدام التطوير الأصلي لبرامج WeChat Mini لكتابة صفحة عداد. الرجاء الرد على الكود الذي يفي بالمتطلبات التالية: قم بإنشاء صفحة Wechat الصغيرة تحتوي على ملفات wxml و js و wxss و json ، وقم بتنفيذ صفحة عداد فيها. يجب أن يكون النص المعروض بالصينية. لاحظ أنه يجب عليك فقط تقديم الكود اللازم لتلبية هذه المتطلبات ؛ ولا يلزم شرح أو وصف.",
    "remark": "المساعدة في تطوير تطبيقات WeChat الصغيرة. مساهمة منgandli."
  },
  "bn": {
    "title": "উন্নয়ন: WeChat মিনি প্রোগ্রাম",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Bengali. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "একজন ওয়েচ্যাট মিনি প্রোগ্রাম ডেভেলপার হিসেবে, আপনার কাজ হল একটি পাল্টা পৃষ্ঠা লেখার জন্য WeChat মিনি প্রোগ্রামের নেটিভ ডেভেলপমেন্ট ব্যবহার করা। অনুগ্রহ করে নিম্নলিখিত প্রয়োজনীয়তাগুলি পূরণ করে এমন কোডটির উত্তর দিন: wxml, js, wxss এবং json ফাইল সমন্বিত একটি Wechat অ্যাপলেট পৃষ্ঠা তৈরি করুন এবং এতে একটি পাল্টা পৃষ্ঠা প্রয়োগ করুন৷ ভিউতে প্রদর্শিত পাঠ্য চীনা ভাষায় হওয়া উচিত। মনে রাখবেন যে এই প্রয়োজনীয়তাগুলি পূরণ করার জন্য আপনাকে শুধুমাত্র প্রয়োজনীয় কোড প্রদান করা উচিত; কোন ব্যাখ্যা বা বর্ণনার প্রয়োজন নেই।",
    "remark": "WeChat অ্যাপলেটের বিকাশে সহায়তা করুন। @gandli থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 177,
  "weight": 2878
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
