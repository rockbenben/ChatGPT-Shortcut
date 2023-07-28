import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "求职信",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I have been working with [履历] for [年资] years. I have worked as a frontend developer for 8 months. I have grown by employing some tools. These include [技能], and so on. I wish to [期望]. I desire to [要求]. Can you write a cover letter for a job application about myself?",
    "description": "为了提交工作申请，我想写一封新的求职信。请写一封描述我技术能力的求职信。我已经在 [履历] 工作了 [年资] 年。我作为一个前端开发员工作了 8 个月。我通过采用一些工具而成长。这些工具包括 [技能]，等等。我希望 [期盼]。我希望 [要求]。你能为工作申请写一封关于我自己的求职信吗？",
    "remark": "根据自我简介编写求职信。"
  },
  "en": {
    "title": "Cover Letter",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. Can you write a cover letter for a job application about myself?",
    "remark": "Write a job application letter based on your self-introduction."
  },
  "ja": {
    "title": "カバーレター",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Janpanese. Can you write a cover letter for a job application about myself?.",
    "description": "就職活動で提出するため、新たにカバーレターを書きたいと思います。私の技術的なスキルを説明するカバーレターを書いてください。私は [CV] で [年] 年働いてきました。フロントエンドデベロッパーとして 8 ヶ月間働いてきました。私は多くのツールを使うことで成長してきました。これらのツールには [スキル] などがあります。私は [期待] したいと思います。私は [リクエスト] したいと思います。就職活動用の自分に関するカバーレターを書いてもらえますか？",
    "remark": "自画像に基づいたカバーレターを作成する。"
  },
  "ko": {
    "title": "커버 레터",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Korean. Can you write a cover letter for a job application about myself?.",
    "description": "입사 지원서를 제출하기 위해 커버 레터를 새로 작성하고 싶습니다. 저의 기술력을 설명하는 커버 레터를 작성해 주세요. 저는 [이력서] 에서 [년] 동안 일해 왔습니다. 저는 8 개월 동안 프런트엔드 개발자로 일해 왔습니다. 저는 여러 도구를 사용하여 성장해 왔습니다. 이러한 도구에는 [기술] 등이 포함됩니다. 나는 [기대] 하고 싶습니다. 요청하고 싶습니다. 입사 지원을 위해 저에 대한 커버 레터를 작성할 수 있나요?",
    "remark": "자화상을 바탕으로 커버 레터를 준비합니다."
  },
  "es": {
    "title": "solicitud de empleo",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Spanish. Can you write a cover letter for a job application about myself?.",
    "description": "Para presentar una solicitud de empleo, me gustaría escribir una nueva carta de presentación. Por favor, escriba una carta de presentación en la que describa mis competencias técnicas. Llevo trabajando en [RESUMEN] [AÑOS DE EXPERIENCIA] años. Trabajo como desarrollador front-end desde hace 8 meses. He crecido adoptando una serie de herramientas. Estas herramientas incluyen [HABILIDADES], entre otras. Quiero [espero]. Me gustaría [exigir]. ¿Puede escribir una carta de presentación sobre mí para una solicitud de empleo?",
    "remark": "Preparar una carta de presentación basada en un autoperfil."
  },
  "fr": {
    "title": "demande d'emploi",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in French. Can you write a cover letter for a job application about myself?.",
    "description": "Afin d'introduire une demande d'emploi, je souhaite rédiger une nouvelle lettre de motivation. Veuillez rédiger une lettre de motivation décrivant mes compétences techniques. Je travaille à [RÉSUMÉ] depuis [ANNÉES D'EXPÉRIENCE] ans. Je travaille en tant que développeur front-end depuis 8 mois. J'ai évolué en adoptant un certain nombre d'outils. Ces outils comprennent entre autres [COMPÉTENCES]. Je veux [attendre]. Je voudrais [exiger]. Pouvez-vous rédiger une lettre de motivation à mon sujet pour une demande d'emploi ?",
    "remark": "Préparer une lettre de motivation sur la base d'un autoprofil."
  },
  "de": {
    "title": "Stellenbewerbung",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in German. Can you write a cover letter for a job application about myself?.",
    "description": "Um mich für eine Stelle zu bewerben, möchte ich ein neues Anschreiben verfassen. Bitte schreiben Sie ein Anschreiben, in dem Sie meine technischen Fähigkeiten beschreiben. Ich arbeite seit [LEBENSLAUF] Jahren bei [JAHRE DER ERFAHRUNG]. Ich arbeite seit 8 Monaten als Front-End-Entwickler. Ich habe mich durch die Übernahme einer Reihe von Tools weiterentwickelt. Zu diesen Tools gehören unter anderem [SKILLS]. Ich möchte [erwarten]. Ich möchte [verlangen]. Können Sie ein Anschreiben über mich für eine Bewerbung schreiben?",
    "remark": "Erstellen Sie ein Anschreiben auf der Grundlage eines Selbstprofils."
  },
  "it": {
    "title": "domanda di lavoro",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Italian. Can you write a cover letter for a job application about myself?.",
    "description": "Per presentare una domanda di lavoro, vorrei scrivere una nuova lettera di presentazione. Vi prego di scrivere una lettera di presentazione che descriva le mie competenze tecniche. Lavoro presso [RESUME] da [ANNI DI ESPERIENZA] anni. Lavoro come sviluppatore front-end da 8 mesi. Sono cresciuto adottando una serie di strumenti. Questi strumenti includono [COMPETENZE], tra gli altri. Voglio [aspettarmi]. Vorrei [richiedere]. Potete scrivere una lettera di presentazione su di me per una domanda di lavoro?",
    "remark": "Preparare una lettera di presentazione basata su un profilo personale."
  },
  "ru": {
    "title": "заявление о приёме на работу",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Russian. Can you write a cover letter for a job application about myself?.",
    "description": "Для того чтобы подать заявление о приеме на работу, я хотел бы написать новое сопроводительное письмо. Пожалуйста, напишите сопроводительное письмо с описанием моих технических навыков. Я работаю в компании [RESUME] в течение [YEARS OF EXPERIENCE] лет. Я работаю в качестве фронтенд-разработчика 8 месяцев. Я вырос за счет освоения ряда инструментов. В числе этих инструментов - [СКИЛЛЫ]. Я хочу [ожидать]. Я хотел бы [требовать]. Можете ли вы написать сопроводительное письмо о себе для устройства на работу?",
    "remark": "Подготовить сопроводительное письмо на основе самопрофиля."
  },
  "pt": {
    "title": "candidatura a emprego",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Portuguese. Can you write a cover letter for a job application about myself?.",
    "description": "Para poder apresentar uma candidatura a um emprego, gostaria de escrever uma nova carta de apresentação. Por favor, escreva uma carta de apresentação que descreva as minhas competências técnicas. Trabalho na [RESUME] há [ANOS DE EXPERIÊNCIA] anos. Trabalho como programador front-end há 8 meses. Cresci adoptando uma série de ferramentas. Essas ferramentas incluem [HABILIDADES], entre outras. Quero [esperar]. Gostaria de [exigir]. É possível escrever uma carta de apresentação sobre mim para uma candidatura a um emprego?",
    "remark": "Preparar uma carta de apresentação com base num perfil pessoal."
  },
  "hi": {
    "title": "कवर लेटर",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Hindi. Can you write a cover letter for a job application about myself?.",
    "description": "नौकरी आवेदन जमा करने के लिए, मैं एक नया कवर लेटर लिखना चाहूंगा। कृपया मेरी तकनीकी क्षमताओं का वर्णन करते हुए एक कवर लेटर लिखें। मैंने [रेज़्यूमे] में [वरिष्ठता] वर्षों तक काम किया है। मैंने 8 महीने तक फ्रंट-एंड डेवलपर के रूप में काम किया। मैं कुछ उपकरण अपनाकर बढ़ता हूं। इन उपकरणों में [कौशल] आदि शामिल हैं। मुझे आशा है [आगे देखिए]। मुझे [अनुरोध] चाहिए। क्या आप नौकरी आवेदन के लिए अपने बारे में एक कवर लेटर लिख सकते हैं?",
    "remark": "अपने आत्म-परिचय के आधार पर एक कवर लेटर लिखें।"
  },
  "ar": {
    "title": "غطاء الرسالة",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Arabic. Can you write a cover letter for a job application about myself?.",
    "description": "من أجل تقديم طلب وظيفة ، أود كتابة خطاب تغطية جديد. يرجى كتابة خطاب تغطية يصف قدراتي الفنية. لقد عملت في [استئناف] لسنوات [أقدمية]. عملت كمطور للواجهة الأمامية لمدة 8 أشهر. أنا أنمو من خلال اعتماد بعض الأدوات. تتضمن هذه الأدوات [المهارات] ، وما إلى ذلك. آمل [أتطلع إلى]. اريد [طلب]. هل يمكنك كتابة خطاب تغطية عن نفسي لطلب وظيفة؟",
    "remark": "اكتب خطاب تغطية بناءً على المقدمة الذاتية الخاصة بك."
  },
  "bn": {
    "title": "কাভার লেটার",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Bengali. Can you write a cover letter for a job application about myself?.",
    "description": "একটি চাকরির আবেদন জমা দেওয়ার জন্য, আমি একটি নতুন কভার লেটার লিখতে চাই। আমার প্রযুক্তিগত ক্ষমতা বর্ণনা করে একটি কভার লেটার লিখুন. আমি [জ্যেষ্ঠতা] বছর ধরে [রিজুমে] কাজ করেছি। আমি 8 মাস ধরে ফ্রন্ট-এন্ড ডেভেলপার হিসাবে কাজ করেছি। আমি কিছু হাতিয়ার গ্রহণ করে বেড়ে উঠি। এই সরঞ্জামগুলির মধ্যে রয়েছে [দক্ষতা], ইত্যাদি। আমি আশা করি [উন্মুখ]. আমি চাই [অনুরোধ]। আপনি কি চাকরির আবেদনের জন্য নিজের সম্পর্কে একটি কভার লেটার লিখতে পারেন?",
    "remark": "আপনার স্ব-পরিচয়ের উপর ভিত্তি করে একটি কভার লেটার লিখুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-cover-letter",
  "tags": [
    "article"
  ],
  "id": 22,
  "weight": 372
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
