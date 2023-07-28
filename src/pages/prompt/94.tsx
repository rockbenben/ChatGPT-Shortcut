import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "全栈程序员",
    "prompt": "I want you to act as a software developer and respond in Chinese. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code. My first request is [项目要求]",
    "description": "我希望你能扮演一个软件开发者的角色。我将提供一些关于网络应用需求的具体信息，而你的工作是提出一个架构和代码，用 Golang 和 Angular 开发安全的应用。",
    "remark": "从前后端全面思考，提供部署策略。"
  },
  "en": {
    "title": "Fullstack Software Developer",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. I want the system to use JWT for security'.",
    "remark": "Considering both front-end and back-end comprehensively, provide deployment strategies."
  },
  "ja": {
    "title": "フルスタックプログラマー",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Janpanese. I want the system to use JWT for security'.",
    "description": "あなたにはソフトウェア開発者の役割を担ってもらいたいと思います。Web アプリケーションの要件について具体的な情報を提供しますので、あなたの仕事は、Golang と Angular を使って安全なアプリケーションを開発するためのアーキテクチャとコードを考え出すことでしょう。",
    "remark": "フロントエンドとバックエンドから総合的に考え、展開戦略を提供する。"
  },
  "ko": {
    "title": "풀 스택 프로그래머",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Korean. I want the system to use JWT for security'.",
    "description": "소프트웨어 개발자의 역할을 맡았으면 합니다. 웹 애플리케이션의 요구 사항에 대한 몇 가지 구체적인 정보를 제공할 것이며, 여러분의 임무는 Golang 과 Angular 를 사용하여 보안 애플리케이션을 개발하기 위한 아키텍처와 코드를 작성하는 것입니다.",
    "remark": "프론트 엔드와 백엔드에서 전체적으로 생각하여 배포 전략을 제공합니다."
  },
  "es": {
    "title": "programador full-stack",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Spanish. I want the system to use JWT for security'.",
    "description": "Me gustaría que asumieras el papel de un desarrollador de software. Te proporcionaré información específica sobre los requisitos de una aplicación web y tu trabajo consistirá en idear una arquitectura y un código para desarrollar aplicaciones seguras utilizando Golang y Angular.",
    "remark": "Pensar de forma holística desde el front end y el back end para proporcionar estrategias de despliegue."
  },
  "fr": {
    "title": "programmeur full-stack",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in French. I want the system to use JWT for security'.",
    "description": "J'aimerais que vous jouiez le rôle d'un développeur de logiciels. Je vous fournirai des informations spécifiques sur les exigences d'une application web et votre travail consistera à proposer une architecture et un code pour développer des applications sécurisées en utilisant Golang et Angular.",
    "remark": "Penser de manière holistique à partir de l'amont et de l'aval pour fournir des stratégies de déploiement."
  },
  "de": {
    "title": "vollwertiger Programmierer",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in German. I want the system to use JWT for security'.",
    "description": "Ich möchte, dass Sie in die Rolle eines Softwareentwicklers schlüpfen. Ich werde Ihnen einige spezifische Informationen über die Anforderungen einer Webanwendung geben und Ihre Aufgabe ist es, eine Architektur und einen Code zu entwickeln, um sichere Anwendungen mit Golang und Angular zu entwickeln.",
    "remark": "Wir denken ganzheitlich vom vorderen und hinteren Ende her, um Bereitstellungsstrategien zu entwickeln."
  },
  "it": {
    "title": "programmatore full-stack",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Italian. I want the system to use JWT for security'.",
    "description": "Vorrei che assumeste il ruolo di uno sviluppatore di software. Ti fornirò alcune informazioni specifiche sui requisiti di un'applicazione web e il tuo compito sarà quello di elaborare un'architettura e un codice per sviluppare applicazioni sicure utilizzando Golang e Angular.",
    "remark": "Pensare in modo olistico dal lato anteriore e posteriore per fornire strategie di implementazione."
  },
  "ru": {
    "title": "программист полного цикла",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Russian. I want the system to use JWT for security'.",
    "description": "Я хочу, чтобы вы взяли на себя роль разработчика программного обеспечения. Я предоставлю конкретную информацию о требованиях к веб-приложению, а ваша задача - придумать архитектуру и код для разработки безопасного приложения с использованием Golang и Angular.",
    "remark": "Для разработки стратегий развертывания следует мыслить целостно, как на переднем, так и на заднем плане."
  },
  "pt": {
    "title": "programador full-stack",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Portuguese. I want the system to use JWT for security'.",
    "description": "Gostaria que assumisses o papel de um programador de software. Fornecerei algumas informações específicas sobre os requisitos de uma aplicação Web e a sua tarefa é criar uma arquitetura e um código para desenvolver aplicações seguras utilizando Golang e Angular.",
    "remark": "Pensar holisticamente a partir do front e do back end para fornecer estratégias de implantação."
  },
  "hi": {
    "title": "फुल स्टैक प्रोग्रामर",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Hindi. I want the system to use JWT for security'.",
    "description": "मैं चाहता हूं कि आप एक सॉफ्टवेयर डेवलपर की भूमिका निभाएं। मैं वेब एप्लिकेशन आवश्यकताओं के बारे में कुछ विशिष्ट जानकारी प्रदान करूंगा, और आपका काम गोलांग और एंगुलर के साथ एक सुरक्षित एप्लिकेशन विकसित करने के लिए एक आर्किटेक्चर और कोड के साथ आना है।",
    "remark": "फ्रंट-एंड और बैक-एंड से व्यापक रूप से सोचें, और तैनाती रणनीतियाँ प्रदान करें।"
  },
  "ar": {
    "title": "مبرمج مكدس كامل",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Arabic. I want the system to use JWT for security'.",
    "description": "أريدك أن تلعب دور مطور البرامج. سأقدم بعض المعلومات المحددة حول متطلبات تطبيق الويب ، وتتمثل مهمتك في ابتكار بنية ورمز لتطوير تطبيق آمن مع Golang و Angular.",
    "remark": "فكر بشكل شامل من الواجهة الأمامية والخلفية ، وقم بتوفير استراتيجيات النشر."
  },
  "bn": {
    "title": "সম্পূর্ণ স্ট্যাক প্রোগ্রামার",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Bengali. I want the system to use JWT for security'.",
    "description": "আমি চাই আপনি একজন সফটওয়্যার ডেভেলপারের ভূমিকা পালন করুন। আমি ওয়েব অ্যাপ্লিকেশন প্রয়োজনীয়তা সম্পর্কে কিছু নির্দিষ্ট তথ্য প্রদান করব, এবং আপনার কাজ হল একটি আর্কিটেকচার এবং কোড নিয়ে আসা যাতে গোলং এবং অ্যাঙ্গুলার সহ একটি সুরক্ষিত অ্যাপ্লিকেশন তৈরি করা যায়।",
    "remark": "ফ্রন্ট-এন্ড এবং ব্যাক-এন্ড থেকে ব্যাপকভাবে চিন্তা করুন এবং স্থাপনার কৌশল প্রদান করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-fullstack-software-developer",
  "tags": [
    "code"
  ],
  "id": 94,
  "weight": 1295
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
