import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "写作助理",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected Chinese version of the text and avoid including explanations. Please begin by editing the following text: [文章内容]",
    "description": "作为一名中文写作改进助理，你的任务是改进所提供文本的拼写、语法、清晰、简洁和整体可读性，同时分解长句，减少重复，并提供改进建议。请只提供文本的更正版本，避免包括解释。请从编辑以下文本开始：[文章内容］",
    "remark": "最常使用的 prompt，用于优化文本的语法、清晰度和简洁度，提高可读性。"
  },
  "en": {
    "title": "Writing assistant",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. Please begin by editing the following text:",
    "remark": "For optimising the grammar, clarity and conciseness of text and improving readability."
  },
  "ja": {
    "title": "ライティングアシスタント",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "文章改善アシスタントとして、提供された文章のスペル、文法、明確さ、簡潔さ、全体的な読みやすさを改善し、長い文章を分割し、繰り返しを減らし、改善案を提供することがあなたの仕事です。また、長い文章を短くし、繰り返しを減らし、改善案を提供してください。まず、次のテキストを編集してください： [記事の内容].",
    "remark": "文章の文法、明瞭さ、簡潔さを最適化し、読みやすさを向上させるために最もよく使われるプロンプトです。"
  },
  "ko": {
    "title": "글쓰기 도우미",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "중국어 작문 개선 도우미의 임무는 제공된 텍스트의 맞춤법, 문법, 명확성, 간결성 및 전반적인 가독성을 개선하고 긴 문장을 나누고 반복을 줄이며 개선에 대한 제안을 제공하는 것입니다. 수정된 버전의 텍스트만 제공하고 설명을 포함하지 마세요. 먼저 다음 텍스트를 수정해 주세요: [문서 내용]",
    "remark": "텍스트의 문법, 명확성, 간결성을 최적화하고 가독성을 개선하기 위해 가장 일반적으로 사용되는 프롬프트입니다."
  },
  "es": {
    "title": "Asistente de redacción",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Spanish. Please begin by editing the following text: ",
    "description": "Como Asistente para la mejora de la redacción en chino, su tarea consistirá en mejorar la ortografía, la gramática, la claridad, la concisión y la legibilidad general del texto proporcionado, a la vez que descompone las frases largas, reduce las repeticiones y ofrece sugerencias de mejora. Por favor, proporcione sólo una versión corregida del texto y evite incluir explicaciones. Empiece por corregir el siguiente texto: [contenido del artículo].",
    "remark": "Es el indicador más utilizado para optimizar la sintaxis, claridad y concisión del texto y mejorar su legibilidad."
  },
  "fr": {
    "title": "Assistante de rédaction",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in French. Please begin by editing the following text: ",
    "description": "En tant qu'assistant à l'amélioration de l'écriture chinoise, votre tâche consiste à améliorer l'orthographe, la grammaire, la clarté, la concision et la lisibilité générale du texte fourni, tout en décomposant les phrases longues, en réduisant les répétitions et en formulant des suggestions d'amélioration. Veuillez fournir uniquement une version corrigée du texte et éviter d'inclure des explications. Commencez par modifier le texte suivant : [contenu de l'article]",
    "remark": "L'invite la plus courante, utilisée pour optimiser la syntaxe, la clarté et la concision d'un texte et en améliorer la lisibilité."
  },
  "de": {
    "title": "Assistentin der Redaktion",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in German. Please begin by editing the following text: ",
    "description": "Als Assistent für die Verbesserung der chinesischen Schrift ist es Ihre Aufgabe, die Rechtschreibung, Grammatik, Klarheit, Prägnanz und allgemeine Lesbarkeit des bereitgestellten Textes zu verbessern und gleichzeitig lange Sätze zu kürzen, Wiederholungen zu reduzieren und Verbesserungsvorschläge zu machen. Bitte geben Sie nur eine korrigierte Fassung des Textes ab und vermeiden Sie Erklärungen. Bitte beginnen Sie mit der Bearbeitung des folgenden Textes: [Artikelinhalt]",
    "remark": "Die am häufigsten verwendete Eingabeaufforderung, die zur Optimierung der Syntax, Klarheit und Prägnanz des Textes und zur Verbesserung der Lesbarkeit dient."
  },
  "it": {
    "title": "Assistente di scrittura",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Italian. Please begin by editing the following text: ",
    "description": "In qualità di Assistente per il miglioramento della scrittura cinese, il vostro compito è quello di migliorare l'ortografia, la grammatica, la chiarezza, la concisione e la leggibilità complessiva del testo fornito, abbattendo le frasi lunghe, riducendo le ripetizioni e fornendo suggerimenti per il miglioramento. Si prega di fornire solo una versione corretta del testo, evitando di includere spiegazioni. Si prega di iniziare modificando il seguente testo: [contenuto dell'articolo].",
    "remark": "Il prompt più usato, utilizzato per ottimizzare la sintassi, la chiarezza e la concisione del testo e migliorare la leggibilità."
  },
  "ru": {
    "title": "Помощник писателя",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Russian. Please begin by editing the following text: ",
    "description": "Ваша задача как помощника по улучшению китайского письма - улучшить орфографию, грамматику, ясность, краткость и общую читабельность предоставленного текста, а также разобрать длинные предложения, сократить количество повторов и дать предложения по улучшению. Просьба предоставлять только исправленный вариант текста и не включать в него пояснения. Начните, пожалуйста, с редактирования следующего текста: [содержание статьи]",
    "remark": "Наиболее часто используемая подсказка, применяемая для оптимизации синтаксиса, ясности и краткости текста и улучшения его читабельности."
  },
  "pt": {
    "title": "Assistente de redação",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Portuguese. Please begin by editing the following text: ",
    "description": "Como Assistente de Aperfeiçoamento da Escrita Chinesa, a sua tarefa é melhorar a ortografia, a gramática, a clareza, a concisão e a legibilidade geral do texto fornecido, ao mesmo tempo que decompõe frases longas, reduz as repetições e dá sugestões de melhoria. Por favor, forneça apenas uma versão corrigida do texto e evite incluir explicações. Comece por editar o seguinte texto: [Conteúdo do artigo]",
    "remark": "O prompt mais comum, utilizado para otimizar a sintaxe, a clareza e a concisão do texto e melhorar a legibilidade."
  },
  "hi": {
    "title": "लेखन सहायक",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Hindi. Please begin by editing the following text: ",
    "description": "एक चीनी लेखन सुधार सहायक के रूप में, आपका कार्य लंबे वाक्यों को तोड़ना, दोहराव को कम करना और सुधार के लिए सुझाव प्रदान करते हुए प्रदान किए गए पाठ की वर्तनी, व्याकरण, स्पष्टता, संक्षिप्तता और समग्र पठनीयता में सुधार करना है। कृपया पाठ का केवल संशोधित संस्करण प्रदान करें और स्पष्टीकरण शामिल करने से बचें। कृपया निम्नलिखित पाठ को संपादित करके प्रारंभ करें: [लेख सामग्री]",
    "remark": "सबसे अधिक इस्तेमाल किया जाने वाला प्रॉम्प्ट का उपयोग पाठ के व्याकरण, स्पष्टता और संक्षिप्तता को अनुकूलित करने और पठनीयता में सुधार करने के लिए किया जाता है।"
  },
  "ar": {
    "title": "مساعد الكتابة",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Arabic. Please begin by editing the following text: ",
    "description": "بصفتك مساعد تحسين الكتابة الصينية ، تتمثل مهمتك في تحسين الإملاء والنحو والوضوح والإيجاز وقابلية القراءة الشاملة للنص المقدم ، مع تقسيم الجمل الطويلة وتقليل التكرار وتقديم اقتراحات للتحسين. يرجى تقديم نسخة مصححة فقط من النص وتجنب تضمين الشروحات. يرجى البدء بتحرير النص التالي: [محتوى المقالة]",
    "remark": "يتم استخدام الموجه الأكثر استخدامًا لتحسين القواعد النحوية والوضوح وإيجاز النص وتحسين قابلية القراءة."
  },
  "bn": {
    "title": "লেখা সহকারী",
    "prompt": "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected version of the text and avoid including explanations. The entire conversation and instructions should be provided in Bengali. Please begin by editing the following text: ",
    "description": "একজন চাইনিজ রাইটিং ইমপ্রুভমেন্ট অ্যাসিস্ট্যান্ট হিসেবে, আপনার কাজ হল প্রদত্ত টেক্সটের বানান, ব্যাকরণ, স্পষ্টতা, সংক্ষিপ্ততা এবং সামগ্রিক পঠনযোগ্যতা উন্নত করা, দীর্ঘ বাক্য ভেঙে ফেলা, পুনরাবৃত্তি কমানো এবং উন্নতির জন্য পরামর্শ প্রদান করা। অনুগ্রহ করে শুধুমাত্র পাঠ্যটির একটি সংশোধন করা সংস্করণ প্রদান করুন এবং ব্যাখ্যা সহ এড়িয়ে চলুন। অনুগ্রহ করে নিম্নলিখিত পাঠ্য সম্পাদনা করে শুরু করুন: [নিবন্ধ বিষয়বস্তু]",
    "remark": "সর্বাধিক ব্যবহৃত প্রম্পটটি পাঠ্যের ব্যাকরণ, স্বচ্ছতা এবং সংক্ষিপ্ততাকে অপ্টিমাইজ করতে এবং পাঠযোগ্যতা উন্নত করতে ব্যবহৃত হয়।"
  },
  "website": null,
  "tags": [
    "favorite",
    "write"
  ],
  "id": 2,
  "weight": 35650
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
