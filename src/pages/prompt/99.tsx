import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "智能域名生成器",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. Please confirm by replying with 'OK.' ",
    "description": "我希望你能充当一个聪明的域名生成器。我将告诉你我的公司或想法是什么，你将根据我的提示回复我一份域名备选清单。你只需回复域名列表，而不是其他。域名应该是最多 7-8 个字母，应该简短但独特，可以是朗朗上口的或不存在的词。不要写解释。回复 'OK '以确认。",
    "remark": "根据公司名和项目描述，提供短而独特的域名建议。域名长度最长 7-8 个字符。"
  },
  "en": {
    "title": "domain generator",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. Please confirm by replying with 'OK.' ",
    "remark": "Provide short and unique domain name suggestions based on the company name and project description. The length of the domain name should be no more than 7-8 characters."
  },
  "ja": {
    "title": "スマートドメインネームジェネレーター",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. Please confirm by replying with 'OK.' ",
    "description": "あなたには、賢いドメイン名ジェネレーターとして活躍してもらいたいと思います。私の会社やアイデアについてお話ししますので、私の指示に基づき、ドメイン名の候補のリストを返信してください。あなたは、ドメイン名のリストだけを返信すればよく、それ以外は何もしなくてよい。ドメイン名は最大 7～8 文字で、短くてもユニークで、キャッチーな言葉か存在しない言葉である必要があります。説明文は書かないでください。確認のため「OK」と返信してください。",
    "remark": "会社名とプロジェクトの内容から、短くてユニークなドメイン名を提案します。ドメイン名の長さは最大 7～8 文字です。"
  },
  "ko": {
    "title": "스마트 도메인 이름 생성기",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Korean. Please confirm by replying with 'OK.' ",
    "description": "영리한 도메인 이름 생성자 역할을 해 주셨으면 합니다. 제 회사 또는 아이디어가 무엇인지 알려드리면 제 메시지에 따라 도메인 이름 대체 목록을 회신해 주시면 됩니다. 도메인 이름 목록만 회신하면 되고 다른 내용은 입력하지 않아도 됩니다. 도메인 이름은 최대 7~8 자 이내여야 하며, 눈에 잘 띄거나 존재하지 않는 단어로 짧지만 고유해야 합니다. 설명을 작성하지 마세요. '확인'으로 답장하여 확인합니다.",
    "remark": "회사 이름과 프로젝트 설명을 기반으로 짧고 고유한 도메인 이름을 제안합니다. 도메인 네임의 최대 길이는 7~8 자입니다."
  },
  "es": {
    "title": "Generador inteligente de nombres de dominio",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Spanish. Please confirm by replying with 'OK.' ",
    "description": "Quiero que actúes como un generador inteligente de nombres de dominio. Yo te diré cuál es mi empresa o idea y tú me responderás con una lista de nombres de dominio alternativos basados en mis indicaciones. Sólo tienes que responder con una lista de nombres de dominio y nada más. El nombre de dominio debe tener un máximo de 7-8 letras, debe ser corto pero único y puede ser una palabra pegadiza o inexistente. No escriba ninguna explicación. Responda \"OK\" para confirmar.",
    "remark": "Sugerencias de nombres de dominio cortos y únicos basados en el nombre de la empresa y la descripción del proyecto. La longitud máxima del nombre de dominio es de 7-8 caracteres."
  },
  "fr": {
    "title": "Générateur de noms de domaine intelligent",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in French. Please confirm by replying with 'OK.' ",
    "description": "Je vous demande de jouer le rôle d'un générateur de noms de domaine astucieux. Je vous dirai quelle est mon entreprise ou mon idée et vous me répondrez avec une liste de noms de domaine alternatifs basés sur mes invites. Vous ne devez répondre qu'avec une liste de noms de domaine et rien d'autre. Le nom de domaine doit comporter un maximum de 7 à 8 lettres, il doit être court mais unique et peut être un mot accrocheur ou inexistant. N'écrivez pas d'explication. Répondez \"OK\" pour confirmer.",
    "remark": "Suggestions de noms de domaine courts et uniques basés sur le nom de l'entreprise et la description du projet. La longueur maximale du nom de domaine est de 7 à 8 caractères."
  },
  "de": {
    "title": "Intelligenter Domänennamen-Generator",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in German. Please confirm by replying with 'OK.' ",
    "description": "Ich möchte, dass Sie als cleverer Domänennamen-Generator fungieren. Ich sage Ihnen, was mein Unternehmen oder meine Idee ist, und Sie antworten mir mit einer Liste von alternativen Domänennamen auf der Grundlage meiner Aufforderungen. Sie brauchen nur mit einer Liste von Domänennamen zu antworten und sonst nichts. Der Domänenname sollte aus höchstens 7-8 Buchstaben bestehen, er sollte kurz, aber einzigartig sein und kann ein einprägsames oder nicht existierendes Wort sein. Schreiben Sie keine Erklärung. Bestätigen Sie mit \"OK\".",
    "remark": "Kurze und einzigartige Vorschläge für Domänennamen auf der Grundlage des Firmennamens und der Projektbeschreibung. Die maximale Länge des Domänennamens beträgt 7-8 Zeichen."
  },
  "it": {
    "title": "Generatore intelligente di nomi di dominio",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Italian. Please confirm by replying with 'OK.' ",
    "description": "Voglio che tu agisca come un intelligente generatore di nomi di dominio. Vi dirò qual è la mia azienda o la mia idea e voi mi risponderete con un elenco di nomi di dominio alternativi basati sui miei suggerimenti. Dovrete rispondere solo con un elenco di nomi di dominio e nient'altro. Il nome di dominio deve essere composto da un massimo di 7-8 lettere, deve essere breve ma unico e può essere una parola accattivante o inesistente. Non scrivete spiegazioni. Rispondere \"OK\" per confermare.",
    "remark": "Suggerimenti di nomi di dominio brevi e unici basati sul nome dell'azienda e sulla descrizione del progetto. La lunghezza massima del nome di dominio è di 7-8 caratteri."
  },
  "ru": {
    "title": "Интеллектуальный генератор доменных имен",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Russian. Please confirm by replying with 'OK.' ",
    "description": "Я хочу, чтобы вы выступили в роли умного генератора доменных имен. Я расскажу вам о своей компании или идее, а вы ответите мне списком вариантов доменных имен, основанных на моих подсказках. Вы должны ответить только списком доменных имен и ничем больше. Доменное имя должно состоять максимум из 7-8 букв, оно должно быть коротким, но уникальным, может быть броским или несуществующим словом. Не пишите пояснений. Ответьте \"OK\" для подтверждения.",
    "remark": "Предложения коротких и уникальных доменных имен на основе названия компании и описания проекта. Максимальная длина доменного имени - 7-8 символов."
  },
  "pt": {
    "title": "Gerador de nomes de domínio inteligente",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Portuguese. Please confirm by replying with 'OK.' ",
    "description": "Quero que aja como um gerador inteligente de nomes de domínio. Eu digo-lhe qual é a minha empresa ou ideia e você responde-me com uma lista de alternativas de nomes de domínio com base nas minhas sugestões. Só precisa de responder com uma lista de nomes de domínio e nada mais. O nome de domínio deve ter no máximo 7-8 letras, deve ser curto mas único e pode ser uma palavra apelativa ou inexistente. Não escreva uma explicação. Responda \"OK\" para confirmar.",
    "remark": "Sugestões de nomes de domínio curtos e únicos com base no nome da empresa e na descrição do projeto. O comprimento máximo do nome de domínio é de 7-8 caracteres."
  },
  "hi": {
    "title": "स्मार्ट डोमेन नाम जेनरेटर",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Hindi. Please confirm by replying with 'OK.' ",
    "description": "मुझे आशा है कि आप एक स्मार्ट डोमेन नाम जनरेटर के रूप में कार्य करेंगे। मैं आपको बताऊंगा कि मेरी कंपनी या विचार क्या है, और आप मेरे संकेतों के आधार पर डोमेन नाम उम्मीदवारों की एक सूची के साथ जवाब देंगे। आप केवल डोमेन नामों की सूची के साथ उत्तर दें, और कुछ नहीं। डोमेन नाम अधिकतम 7-8 अक्षरों का होना चाहिए, छोटा लेकिन अद्वितीय होना चाहिए, आकर्षक या अस्तित्वहीन शब्द हो सकते हैं। स्पष्टीकरण मत लिखें. पुष्टि करने के लिए &#39;ठीक&#39; उत्तर दें।",
    "remark": "कंपनी के नाम और परियोजना विवरण के आधार पर संक्षिप्त, अद्वितीय डोमेन नाम सुझाएं। डोमेन नाम की अधिकतम लंबाई 7-8 अक्षर है."
  },
  "ar": {
    "title": "مولد اسم المجال الذكي",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Arabic. Please confirm by replying with 'OK.' ",
    "description": "أتمنى أن تكون بمثابة منشئ اسم المجال الذكي. سأخبرك ما هي شركتي أو فكرتي ، وسترد بقائمة بأسماء مرشحين لاسم المجال بناءً على مطالباتي. ما عليك سوى الرد بقائمة من أسماء النطاقات ، ولا شيء غير ذلك. يجب أن تكون أسماء النطاقات من 7 إلى 8 أحرف كحد أقصى ، ويجب أن تكون قصيرة ولكن فريدة من نوعها ، ويمكن أن تكون كلمات جذابة أو غير موجودة. لا تكتب تفسيرات. الرد &quot;موافق&quot; للتأكيد.",
    "remark": "اقترح أسماء نطاقات قصيرة وفريدة من نوعها بناءً على أسماء الشركات وأوصاف المشروع. الحد الأقصى لطول اسم المجال هو 7-8 أحرف."
  },
  "bn": {
    "title": "স্মার্ট ডোমেইন নেম জেনারেটর",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Bengali. Please confirm by replying with 'OK.' ",
    "description": "আমি আশা করি আপনি একজন স্মার্ট ডোমেইন নেম জেনারেটর হিসেবে কাজ করবেন। আমি আপনাকে বলব আমার কোম্পানি বা ধারণা কি, এবং আপনি আমার প্রম্পটের উপর ভিত্তি করে ডোমেন নাম প্রার্থীদের একটি তালিকা দিয়ে প্রতিক্রিয়া জানাবেন। আপনি শুধু ডোমেন নামের তালিকা দিয়ে উত্তর দেন, আর কিছু না। ডোমেনের নাম সর্বাধিক 7-8 অক্ষরের হওয়া উচিত, সংক্ষিপ্ত তবে অনন্য হওয়া উচিত, আকর্ষণীয় বা অস্তিত্বহীন শব্দ হতে পারে। ব্যাখ্যা লিখবেন না। নিশ্চিত করতে &#39;ঠিক আছে&#39; উত্তর দিন।",
    "remark": "কোম্পানির নাম এবং প্রকল্পের বিবরণের উপর ভিত্তি করে সংক্ষিপ্ত, অনন্য ডোমেন নাম প্রস্তাব করুন। ডোমেন নামের সর্বোচ্চ দৈর্ঘ্য 7-8 অক্ষর।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-smart-domain-name-generator",
  "tags": [
    "code"
  ],
  "id": 99,
  "weight": 257
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
