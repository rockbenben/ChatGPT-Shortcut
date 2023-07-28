import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "前端开发",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. My first request is [项目要求]",
    "description": "我希望你能担任高级前端开发员。我将描述一个项目的细节，你将用这些工具来编码项目。Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. 你应该将文件合并到单一的 index.js 文件中，而不是其他。不要写解释。",
    "remark": "提供项目目标和依赖，输出前端项目代码。"
  },
  "en": {
    "title": "Senior Frontend developer",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. My first request is ",
    "remark": "Provide project goals and dependencies, output front-end project code."
  },
  "ja": {
    "title": "フロントエンド開発",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "私はあなたにシニアフロントエンドデベロッパーとして働いてほしいです。これらのツールを使ってコーディングするプロジェクトの詳細を説明します。create React App, yarn, Ant Design, list, Redux Toolkit, createSlice, thunk, axios. ファイルは index.js ファイル 1 つにマージして、他は何もしないでください。解説は書かないでください。",
    "remark": "プロジェクトの目的と依存関係を提供し、フロントエンドのプロジェクトコードを出力する。"
  },
  "ko": {
    "title": "프론트엔드 개발",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "시니어 프론트엔드 개발자로 일하고 싶습니다. 이 도구로 코딩할 프로젝트의 세부 사항을 설명하겠습니다. create React App, yarn, Ant Design, list, Redux Toolkit, createSlice, thunk, axios. 파일을 하나의 index.js 파일로 병합하고 다른 파일은 만들지 않아야 합니다. 설명을 작성하지 마세요.",
    "remark": "프로젝트 목표와 종속성을 제공하고 프런트엔드 프로젝트 코드를 출력합니다."
  },
  "es": {
    "title": "desarrollo front-end",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Spanish. My first request is ",
    "description": "Me gustaría que trabajaras como desarrollador front-end senior. Yo describiré los detalles de un proyecto y tú codificarás el proyecto con estas herramientas. create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. Deberás fusionar los archivos en un único archivo index.js y nada más. No escribas explicaciones.",
    "remark": "Proporcione los objetivos y las dependencias del proyecto y el código de salida del proyecto front-end."
  },
  "fr": {
    "title": "développement frontal",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in French. My first request is ",
    "description": "J'aimerais que vous travailliez en tant que développeur front-end senior. Je décrirai les détails d'un projet et vous coderez le projet avec les outils suivants : create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. Vous devrez fusionner les fichiers en un seul fichier index.js et rien d'autre. N'écrivez pas d'explications.",
    "remark": "Fournir les objectifs et les dépendances du projet et produire le code du projet frontal."
  },
  "de": {
    "title": "Frontend-Entwicklung",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in German. My first request is ",
    "description": "Ich möchte, dass Sie als Senior Front-End-Entwickler arbeiten. Ich werde die Details eines Projekts beschreiben und Sie werden das Projekt mit diesen Tools programmieren. create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. Sie sollten die Dateien in eine einzige index.js-Datei zusammenführen und sonst nichts. Schreiben Sie keine Erklärungen.",
    "remark": "Bereitstellung von Projektzielen und Abhängigkeiten und Ausgabe von Front-End-Projektcode."
  },
  "it": {
    "title": "sviluppo front-end",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Italian. My first request is ",
    "description": "Vorrei che lavorassi come sviluppatore front-end senior. Descriverò i dettagli di un progetto e tu dovrai codificare il progetto con questi strumenti. create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. Dovresti unire i file in un unico file index.js e nient'altro. Non scrivere spiegazioni.",
    "remark": "Fornire gli obiettivi e le dipendenze del progetto e produrre il codice del progetto front-end."
  },
  "ru": {
    "title": "внешняя разработка",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Russian. My first request is ",
    "description": "Я хотел бы, чтобы вы работали в качестве старшего front-end разработчика. Я опишу детали проекта, а вы будете кодить его с помощью следующих инструментов. create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. Вы должны объединить файлы в один файл index.js и ничего больше. Не пишите пояснений.",
    "remark": "Предоставление целей и зависимостей проекта и вывод кода front-end проекта."
  },
  "pt": {
    "title": "desenvolvimento front-end",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Portuguese. My first request is ",
    "description": "Gostaria que trabalhasse como programador front-end sénior. Vou descrever os detalhes de um projeto e tu vais codificar o projeto com estas ferramentas. create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. Deves juntar os ficheiros num único ficheiro index.js e nada mais. Não escreva explicações.",
    "remark": "Fornecer objectivos e dependências do projeto e produzir código de projeto front-end."
  },
  "hi": {
    "title": "फ्रंट-एंड विकास",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Hindi. My first request is ",
    "description": "मुझे आशा है कि आप एक वरिष्ठ फ्रंट-एंड डेवलपर के रूप में काम कर सकते हैं। मैं एक प्रोजेक्ट के विवरण का वर्णन करूंगा जिसे आप इन उपकरणों के साथ कोड करेंगे। रिएक्ट ऐप, यार्न, एंट डिज़ाइन, लिस्ट, रेडक्स टूलकिट, क्रिएटस्लाइस, थंक, एक्सियोस बनाएं। आपको फ़ाइलों को एक ही इंडेक्स.जेएस फ़ाइल में मर्ज करना चाहिए और कुछ नहीं। स्पष्टीकरण मत लिखें.",
    "remark": "प्रोजेक्ट लक्ष्य और निर्भरताएँ, और आउटपुट फ्रंट-एंड प्रोजेक्ट कोड प्रदान करें।"
  },
  "ar": {
    "title": "تطوير الواجهة الأمامية",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Arabic. My first request is ",
    "description": "آمل أن تتمكن من العمل كمطور أول للواجهة الأمامية. سوف أصف تفاصيل المشروع الذي ستقوم بترميزه باستخدام هذه الأدوات. قم بإنشاء تطبيق React ، و yarn ، و Ant Design ، و List ، و Redux Toolkit ، و createSlice ، و thunk ، و axios. يجب عليك دمج الملفات في ملف index.js واحد ولا شيء آخر. لا تكتب تفسيرات.",
    "remark": "توفير أهداف المشروع وتبعياته ، وإخراج كود المشروع الأمامي."
  },
  "bn": {
    "title": "সম্মুখ প্রান্ত উন্নয়ন",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Bengali. My first request is ",
    "description": "আমি আশা করি আপনি একজন সিনিয়র ফ্রন্ট-এন্ড ডেভেলপার হিসেবে কাজ করতে পারবেন। আমি একটি প্রকল্পের বিশদ বর্ণনা করব যা আপনি এই সরঞ্জামগুলির সাথে কোড করবেন। রিঅ্যাক্ট অ্যাপ, সুতা, পিঁপড়া ডিজাইন, তালিকা, Redux টুলকিট, CreateSlice, thunk, axios তৈরি করুন। আপনার ফাইলগুলিকে একটি একক index.js ফাইলে মার্জ করা উচিত এবং অন্য কিছু নয়। ব্যাখ্যা লিখবেন না।",
    "remark": "প্রকল্পের লক্ষ্য এবং নির্ভরতা এবং আউটপুট ফ্রন্ট-এন্ড প্রকল্প কোড প্রদান করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-senior-frontend-developer",
  "tags": [
    "code"
  ],
  "id": 91,
  "weight": 1192
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
