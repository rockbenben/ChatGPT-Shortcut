import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "前端：网页设计",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Chinese. My first request is [项目要求]",
    "description": "我希望你能充当网页设计顾问。我将向你提供一个需要协助设计或重新开发网站的组织的相关细节，你的职责是建议最合适的界面和功能，以提高用户体验，同时也满足该公司的业务目标。你应该运用你在 UX/UI 设计原则、编码语言、网站开发工具等方面的知识，为该项目制定一个全面的计划。",
    "remark": "从网页开发和设计的角度，提供界面和功能建议，旨在提高用户体验。"
  },
  "en": {
    "title": "web design consultant",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. My first request is ",
    "remark": "From the perspective of web development and design, provide interface and functionality suggestions aimed at improving user experience."
  },
  "ja": {
    "title": "フロントエンド：ウェブデザイン",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "ウェブデザインコンサルタントとして活動してほしい。Web サイトのデザインまたは再開発の支援を必要とする組織の関連情報を提供します。あなたの役割は、企業のビジネス目標を満たしながら、ユーザー体験を向上させる最適なインターフェースと機能を提案することです。UX/UI デザインの原則、コーディング言語、Web 開発ツールなどの知識を応用して、プロジェクトの包括的な計画を立てる必要があります。",
    "remark": "ユーザーエクスペリエンスの向上を目指し、Web 開発・設計の観点からインターフェースや機能のアドバイスを提供する。"
  },
  "ko": {
    "title": "프론트엔드: 웹 디자인",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "웹 디자인 컨설턴트로 활동해 주셨으면 합니다. 웹 사이트 디자인 또는 재개발에 도움이 필요한 조직의 관련 세부 정보를 제공하고, 회사의 비즈니스 목표에 부합하면서 사용자 경험을 향상시킬 수 있는 가장 적합한 인터페이스와 기능을 추천하는 역할을 맡게 됩니다. UX/UI 디자인 원칙, 코딩 언어, 웹 개발 도구 등에 대한 지식을 적용하여 프로젝트에 대한 종합적인 계획을 수립해야 합니다.",
    "remark": "사용자 경험을 개선하기 위해 웹 개발 및 디자인 관점에서 인터페이스 및 기능에 대한 조언을 제공합니다."
  },
  "es": {
    "title": "Front-end: diseño web",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Spanish. My first request is ",
    "description": "Me gustaría que actuaras como consultor de diseño web. Te facilitaré los datos pertinentes de una organización que necesita ayuda para el diseño o la remodelación de un sitio web, y tu función consistirá en recomendar la interfaz y la funcionalidad más adecuadas que mejoren la experiencia del usuario y cumplan también los objetivos comerciales de la empresa. Deberá utilizar sus conocimientos de los principios de diseño UX/UI, lenguajes de codificación, herramientas de desarrollo web, etc. para desarrollar un plan integral para el proyecto.",
    "remark": "Proporcionar recomendaciones de interfaz y funcionalidad destinadas a mejorar la experiencia del usuario desde una perspectiva de desarrollo y diseño web."
  },
  "fr": {
    "title": "Front-end : conception de sites web",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in French. My first request is ",
    "description": "J'aimerais que vous agissiez en tant que consultant en conception de sites web. Je vous fournirai les détails pertinents d'une organisation qui a besoin d'aide pour la conception ou le redéveloppement d'un site web, et votre rôle sera de recommander l'interface et les fonctionnalités les plus appropriées qui amélioreront l'expérience utilisateur et répondront également aux objectifs commerciaux de l'entreprise. Vous devrez utiliser vos connaissances des principes de conception UX/UI, des langages de codage, des outils de développement web, etc. pour élaborer un plan complet pour le projet.",
    "remark": "Fournir des recommandations en matière d'interface et de fonctionnalité visant à améliorer l'expérience de l'utilisateur du point de vue du développement web et de la conception."
  },
  "de": {
    "title": "Frontend: Webdesign",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in German. My first request is ",
    "description": "Ich möchte, dass Sie als Webdesign-Berater tätig werden. Ich werde Sie mit den relevanten Details einer Organisation versorgen, die Unterstützung bei der Gestaltung oder Neuentwicklung einer Website benötigt, und Ihre Aufgabe wird es sein, die am besten geeignete Schnittstelle und Funktionalität zu empfehlen, die das Benutzererlebnis verbessert und auch die Geschäftsziele des Unternehmens erfüllt. Sie sollten Ihr Wissen über UX/UI-Designprinzipien, Programmiersprachen, Webentwicklungswerkzeuge usw. nutzen, um einen umfassenden Plan für das Projekt zu entwickeln.",
    "remark": "Bereitstellung von Empfehlungen für Schnittstellen und Funktionen zur Verbesserung der Benutzerfreundlichkeit aus Sicht der Webentwicklung und des Designs."
  },
  "it": {
    "title": "Front-end: web design",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Italian. My first request is ",
    "description": "Vorrei che lei agisse come consulente di web design. Ti fornirò i dettagli di un'organizzazione che ha bisogno di assistenza per la progettazione o la riqualificazione di un sito web e il tuo ruolo sarà quello di consigliare l'interfaccia e le funzionalità più appropriate per migliorare l'esperienza dell'utente e soddisfare gli obiettivi aziendali. Dovrete utilizzare la vostra conoscenza dei principi di progettazione UX/UI, dei linguaggi di codifica, degli strumenti di sviluppo web, ecc. per sviluppare un piano completo per il progetto.",
    "remark": "Fornire raccomandazioni sull'interfaccia e sulle funzionalità volte a migliorare l'esperienza dell'utente dal punto di vista dello sviluppo web e del design."
  },
  "ru": {
    "title": "Front-end: веб-дизайн",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Russian. My first request is ",
    "description": "Я хотел бы, чтобы вы выступили в качестве консультанта по веб-дизайну. Я предоставлю вам соответствующую информацию об организации, которой требуется помощь в разработке или обновлении веб-сайта, а ваша роль будет заключаться в том, чтобы порекомендовать наиболее подходящий интерфейс и функциональность, которые улучшат пользовательский опыт, а также будут отвечать бизнес-целям компании. Вы должны использовать свои знания о принципах проектирования UX/UI, языках кодирования, инструментах веб-разработки и т.д. для разработки комплексного плана проекта.",
    "remark": "Предоставление рекомендаций по интерфейсу и функциональности, направленных на улучшение пользовательского опыта с точки зрения веб-разработки и дизайна."
  },
  "pt": {
    "title": "Front-end: conceção web",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Portuguese. My first request is ",
    "description": "Gostaria que actuasse como consultor de web design. Fornecer-lhe-ei os dados relevantes de uma organização que necessita de assistência na conceção ou remodelação de um sítio Web e o seu papel consistirá em recomendar a interface e a funcionalidade mais adequadas para melhorar a experiência do utilizador e também para cumprir os objectivos comerciais da empresa. Deve utilizar os seus conhecimentos sobre princípios de design UX/UI, linguagens de codificação, ferramentas de desenvolvimento Web, etc., para desenvolver um plano abrangente para o projeto.",
    "remark": "Fornecer recomendações sobre a interface e a funcionalidade com vista a melhorar a experiência do utilizador numa perspetiva de desenvolvimento e conceção da Web."
  },
  "hi": {
    "title": "फ्रंट एंड: वेब डिज़ाइन",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Hindi. My first request is ",
    "description": "मुझे आशा है कि आप एक वेब डिज़ाइन सलाहकार के रूप में कार्य कर सकते हैं। मैं आपको उस संगठन का प्रासंगिक विवरण प्रदान करूंगा जिसे किसी वेबसाइट को डिजाइन करने या पुनर्विकास करने में सहायता की आवश्यकता है, और आपकी भूमिका कंपनी के व्यावसायिक लक्ष्यों को पूरा करने के साथ-साथ उपयोगकर्ता अनुभव को बढ़ाने के लिए सबसे उपयुक्त इंटरफ़ेस और कार्यक्षमता का सुझाव देना होगा। आपको परियोजना के लिए एक व्यापक योजना विकसित करने के लिए यूएक्स/यूआई डिज़ाइन सिद्धांतों, कोडिंग भाषाओं, वेबसाइट विकास उपकरण आदि के अपने ज्ञान का उपयोग करना चाहिए।",
    "remark": "वेब विकास और डिज़ाइन परिप्रेक्ष्य से, उपयोगकर्ता अनुभव को बेहतर बनाने के उद्देश्य से इंटरफ़ेस और कार्यात्मक सुझाव प्रदान करें।"
  },
  "ar": {
    "title": "الواجهة الأمامية: تصميم الويب",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Arabic. My first request is ",
    "description": "آمل أن تتمكن من العمل كمستشار لتصميم مواقع الويب. سأزودك بالتفاصيل ذات الصلة لمؤسسة تحتاج إلى مساعدة في تصميم أو إعادة تطوير موقع على شبكة الإنترنت ، وسيكون دورك هو اقتراح الواجهة والوظائف الأنسب لتعزيز تجربة المستخدم مع تحقيق أهداف أعمال الشركة أيضًا. يجب عليك استخدام معرفتك بمبادئ تصميم UX / UI ولغات الترميز وأدوات تطوير مواقع الويب وما إلى ذلك لوضع خطة شاملة للمشروع.",
    "remark": "من منظور تطوير وتصميم الويب ، قدم واجهة واقتراحات وظيفية تهدف إلى تحسين تجربة المستخدم."
  },
  "bn": {
    "title": "ফ্রন্ট এন্ড: ওয়েব ডিজাইন",
    "prompt": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. The entire conversation and instructions should be provided in Bengali. My first request is ",
    "description": "আমি আশা করি আপনি একজন ওয়েব ডিজাইন পরামর্শদাতা হিসাবে কাজ করতে পারেন। আমি আপনাকে এমন একটি প্রতিষ্ঠানের প্রাসঙ্গিক বিশদ বিবরণ প্রদান করব যার একটি ওয়েবসাইট ডিজাইন বা পুনঃউন্নয়নে সহায়তা প্রয়োজন, এবং আপনার ভূমিকা হবে কোম্পানির ব্যবসায়িক লক্ষ্যগুলি পূরণ করার সাথে সাথে ব্যবহারকারীর অভিজ্ঞতা বাড়ানোর জন্য সবচেয়ে উপযুক্ত ইন্টারফেস এবং কার্যকারিতা প্রস্তাব করা। প্রকল্পের জন্য একটি বিস্তৃত পরিকল্পনা তৈরি করতে আপনার UX/UI ডিজাইন নীতি, কোডিং ভাষা, ওয়েবসাইট ডেভেলপমেন্ট টুল ইত্যাদির জ্ঞান ব্যবহার করা উচিত।",
    "remark": "ওয়েব ডেভেলপমেন্ট এবং ডিজাইনের দৃষ্টিকোণ থেকে, ব্যবহারকারীর অভিজ্ঞতা উন্নত করার লক্ষ্যে ইন্টারফেস এবং কার্যকরী পরামর্শ প্রদান করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-web-design-consultant",
  "tags": [
    "code"
  ],
  "id": 93,
  "weight": 729
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
