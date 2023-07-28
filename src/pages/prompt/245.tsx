import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "图标设计",
    "prompt": "Act like an icon designer and give me ideas on representing an icon of the word [关键词].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [设计理念] because the app's main goal is to offer [作用]\n\nMore information:\n-The icon should be XXXX",
    "description": "像图标设计师一样，给我一些关于表示“简单”一词图标的想法。这个想法是在该应用程序的主网站页面上添加一个图标，代表“简单易行的烹饪”理念，因为该应用程序的主要目标是为人们提供简单的食谱，让他们可以在家轻松烹饪。更多信息：- 图标应该简单明了，视觉效果简单，可以简洁地传达想法。",
    "remark": "将概念或理念转化为具体的事物，使设计理念具象化。分享自 @粱哲豪。"
  },
  "en": {
    "title": "Icon designer",
    "prompt": "Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX",
    "remark": "Transform concepts or ideas into tangible objects to concretize design concepts. Contributed by @MoonJustice."
  },
  "ja": {
    "title": "イコノグラフィー",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "アイコンデザイナーのように、「簡単」という言葉を表現するアイコンのアイデアを教えてください。アプリの主な目的は、家庭で簡単に調理できるシンプルなレシピを人々に提供することなので、「簡単な料理」という考えを表すアイコンをアプリのメインウェブサイトページに追加することです。詳細：- アイコンは、アイデアを簡潔に伝えるために、シンプルで視覚的にアピールする必要があります。",
    "remark": "コンセプトやアイデアを具体的なものに変換して、デザインアイデアを具体化すること。共有者：@sorghumcherho。"
  },
  "ko": {
    "title": "도상학",
    "prompt": "The entire conversation and instructions should be provided in Korean. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "아이콘 디자이너답게 '심플'이라는 단어를 표현할 수 있는 아이콘에 대한 아이디어를 주세요. 이 앱의 주요 목표는 사람들이 집에서 쉽게 요리할 수 있는 간단한 레시피를 제공하는 것이므로, 앱의 메인 웹사이트 페이지에 '쉬운 요리'라는 아이디어를 나타내는 아이콘을 추가하는 것입니다. 자세한 정보: - 아이콘은 간결하게 아이디어를 전달할 수 있도록 단순하고 시각적으로 매력적이어야 합니다.",
    "remark": "개념이나 아이디어를 구체적인 것으로 변환하여 디자인 아이디어를 가시화합니다. 공유 @sorghumcherho."
  },
  "es": {
    "title": "Diseño de iconos",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "Como diseñador de iconos, dame algunas ideas para un icono que represente la palabra \"simple\". La idea es añadir un icono en la página web principal de la app que represente la idea de \"fácil de cocinar\" ya que el objetivo principal de la app es proporcionar a la gente recetas sencillas que puedan cocinar fácilmente en casa. Más información:- El icono debe ser sencillo y visualmente atractivo para transmitir la idea de forma sucinta.",
    "remark": "Traducir un concepto o una idea en algo concreto hace que la idea de diseño sea tangible. Compartido por @Liang Zhehao."
  },
  "fr": {
    "title": "Conception d'icônes",
    "prompt": "The entire conversation and instructions should be provided in French. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "En tant que concepteur d'icônes, donnez-moi quelques idées pour une icône qui représente le mot \"simple\". L'idée est d'ajouter une icône sur la page principale du site web de l'application qui représente l'idée de \"facile à cuisiner\" puisque l'objectif principal de l'application est de fournir aux gens des recettes simples qu'ils peuvent facilement cuisiner à la maison. Plus d'informations:- L'icône doit être simple et visuellement attrayante pour transmettre l'idée de manière succincte.",
    "remark": "Traduire un concept ou une idée en quelque chose de concret rend l'idée de conception tangible. Partagé par @Liang Zhehao."
  },
  "de": {
    "title": "Ikonen-Design",
    "prompt": "The entire conversation and instructions should be provided in German. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "Wie ein Icon-Designer, geben Sie mir einige Ideen für ein Symbol, das das Wort \"einfach\" darstellt. Die Idee ist, ein Icon auf der Haupt-Webseite der App hinzuzufügen, das die Idee von \"einfach zu kochen\" repräsentiert, da das Hauptziel der App ist, Menschen mit einfachen Rezepten zu versorgen, die sie leicht zu Hause kochen können. Weitere Informationen:- Das Symbol sollte einfach und visuell ansprechend sein, um die Idee kurz und bündig zu vermitteln.",
    "remark": "Die Umsetzung eines Konzepts oder einer Idee in etwas Konkretes macht die Designidee greifbar. Geteilt von @Liang Zhehao."
  },
  "it": {
    "title": "Design delle icone",
    "prompt": "The entire conversation and instructions should be provided in Italian. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "Come designer di icone, datemi qualche idea per un'icona che rappresenti la parola \"semplice\". L'idea è quella di aggiungere un'icona sulla pagina principale del sito web dell'app che rappresenti l'idea di \"facile da cucinare\", poiché l'obiettivo principale dell'app è quello di fornire alle persone ricette semplici che possono facilmente cucinare a casa. Altre informazioni:- L'icona deve essere semplice e visivamente accattivante per trasmettere l'idea in modo sintetico.",
    "remark": "Tradurre un concetto o un'idea in qualcosa di concreto rende l'idea progettuale tangibile. Condiviso da @Liang Zhehao."
  },
  "ru": {
    "title": "Иконный дизайн",
    "prompt": "The entire conversation and instructions should be provided in Russian. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "Как дизайнер иконок, подскажите мне несколько идей для иконки, представляющей слово \"простой\". Идея состоит в том, чтобы добавить на главную страницу веб-сайта приложения иконку, которая олицетворяет идею \"легко готовить\", поскольку основная цель приложения - предоставить людям простые рецепты, которые они могут легко приготовить дома. Дополнительная информация:- Иконка должна быть простой и визуально привлекательной, чтобы лаконично передать идею.",
    "remark": "Перевод концепции или идеи в нечто конкретное делает проектную идею осязаемой. Поступило от @Liang Zhehao."
  },
  "pt": {
    "title": "Desenho de ícones",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "Como designer de ícones, dê-me algumas ideias para um ícone que represente a palavra \"simples\". A ideia é adicionar um ícone na página principal do sítio Web da aplicação que represente a ideia de \"fácil de cozinhar\", uma vez que o principal objetivo da aplicação é fornecer às pessoas receitas simples que possam facilmente cozinhar em casa. Mais informações:- O ícone deve ser simples e visualmente apelativo para transmitir a ideia de forma sucinta.",
    "remark": "A tradução de um conceito ou ideia em algo concreto torna a ideia de design tangível. Partilhado por @Liang Zhehao."
  },
  "hi": {
    "title": "आइकन डिज़ाइन",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "एक आइकन डिजाइनर की तरह, मुझे &quot;सरल&quot; शब्द का प्रतिनिधित्व करने वाले आइकन के बारे में कुछ विचार दें। विचार ऐप के मुख्य वेबसाइट पृष्ठ पर एक आइकन जोड़ने का है, जो &quot;आसान और आसान खाना पकाने&quot; के विचार का प्रतिनिधित्व करता है क्योंकि ऐप का मुख्य लक्ष्य लोगों को सरल व्यंजन प्रदान करना है जिसे वे आसानी से घर पर पका सकते हैं। अधिक जानकारी:- प्रतीक सरल और स्पष्ट होने चाहिए, सरल दृश्यों के साथ जो विचारों को संक्षेप में व्यक्त करते हों।",
    "remark": "डिज़ाइन विचारों को ठोस बनाते हुए अवधारणाओं या विचारों को ठोस चीज़ों में बदलें। @梁哲豪 से साझा किया गया।"
  },
  "ar": {
    "title": "تصميم أيقونة",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "مثل مصمم الرموز ، أعطني بعض الأفكار حول الرموز التي تمثل كلمة &quot;بسيط&quot;. الفكرة هي إضافة رمز على صفحة الموقع الرئيسية للتطبيق ، يمثل فكرة &quot;الطبخ السهل والسهل&quot; لأن الهدف الرئيسي من التطبيق هو تزويد الأشخاص بوصفات بسيطة يمكنهم طهيها بسهولة في المنزل. مزيد من المعلومات: - يجب أن تكون الأيقونات بسيطة وواضحة ، مع عناصر مرئية بسيطة تنقل الأفكار بإيجاز.",
    "remark": "تحويل المفاهيم أو الأفكار إلى أشياء ملموسة ، وجعل أفكار التصميم ملموسة. تمت مشاركته من @ 梁哲豪。"
  },
  "bn": {
    "title": "আইকন ডিজাইন",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX.",
    "description": "একজন আইকন ডিজাইনারের মতো, আমাকে &quot;সহজ&quot; শব্দটি উপস্থাপনকারী আইকন সম্পর্কে কিছু ধারণা দিন। অ্যাপটির মূল ওয়েবসাইট পৃষ্ঠায় একটি আইকন যুক্ত করা হল &quot;সহজ এবং সহজ রান্না&quot; দর্শনের প্রতিনিধিত্ব করে, কারণ অ্যাপটির মূল লক্ষ্য হল লোকেদের সহজ রেসিপি সরবরাহ করা যা তারা সহজেই বাড়িতে রান্না করতে পারে। আরও তথ্য:- আইকনগুলি সহজ এবং পরিষ্কার হওয়া উচিত, সহজ ভিজ্যুয়াল সহ যা ধারণাগুলি সংক্ষিপ্তভাবে প্রকাশ করে৷",
    "remark": "ধারণা বা ধারণাগুলিকে কংক্রিট জিনিসগুলিতে রূপান্তর করুন, নকশা ধারণাগুলিকে কংক্রিট করে তোলে। @梁哲豪 থেকে ভাগ করা হয়েছে৷"
  },
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 245,
  "weight": 322
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
