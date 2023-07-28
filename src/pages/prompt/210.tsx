import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "周报生成器",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in Chinese with markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. Please begin by editing the following text: [工作内容]",
    "description": "使用下面提供的文本作为中文周报的基础，生成一个简洁的摘要，突出最重要的内容。该报告应以 markdown 格式编写，并应易于阅读和理解，以满足一般受众的需要。特别是要注重提供对利益相关者和决策者有用的见解和分析。你也可以根据需要使用任何额外的信息或来源。",
    "remark": "根据日常工作内容，提取要点并适当扩充，以生成周报。"
  },
  "en": {
    "title": "Weekly Report Generator",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. Please begin by editing the following text: ",
    "remark": "Extract key points from daily work tasks and expand them appropriately to generate a weekly report."
  },
  "ja": {
    "title": "ウィークリーレポートジェネレーター",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "以下に提供するテキストを中国語の週報のベースとして使用し、最も重要な内容を強調した簡潔な要約を作成してください。レポートはマークダウン形式で作成し、一般読者のニーズを満たすために読みやすく、理解しやすいものにする必要があります。特に、ステークホルダーや意思決定者に役立つ洞察や分析を提供することに重点を置く必要があります。また、必要に応じて、追加の情報や情報源を使用してもよい。",
    "remark": "日々の作業をもとに、適宜要点を抽出・展開し、週報を作成します。"
  },
  "ko": {
    "title": "주간 보고서 생성기",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "아래 제공된 텍스트를 중국어 주간 보고서의 기초로 삼아 가장 중요한 내용을 강조하는 간결한 요약을 작성하세요. 보고서는 마크다운 형식으로 작성해야 하며 일반 독자의 요구를 충족하기 위해 읽고 이해하기 쉬워야 합니다. 특히 이해관계자와 의사 결정권자에게 유용한 인사이트와 분석을 제공하는 데 중점을 두어야 합니다. 필요에 따라 추가 정보나 출처를 사용할 수도 있습니다.",
    "remark": "일일 업무를 기반으로 주요 요점을 추출하고 적절히 확장하여 주간 보고서를 생성합니다."
  },
  "es": {
    "title": "Generador de informes semanales",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Spanish. Please begin by editing the following text: ",
    "description": "Utilice el texto proporcionado a continuación como base para un informe semanal en chino que genere un resumen sucinto en el que se destaque el contenido más importante. El informe deberá estar en formato markdown y ser de fácil lectura y comprensión para un público general. En particular, concéntrese en ofrecer perspectivas y análisis que sean útiles para las partes interesadas y los responsables de la toma de decisiones. También puede utilizar cualquier información o fuente adicional que necesite.",
    "remark": "Extraiga los puntos clave y amplíelos adecuadamente para generar informes semanales basados en el contenido del trabajo diario."
  },
  "fr": {
    "title": "Générateur de rapports hebdomadaires",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in French. Please begin by editing the following text: ",
    "description": "Utilisez le texte fourni ci-dessous comme base d'un rapport hebdomadaire en chinois pour générer un résumé succinct mettant en évidence le contenu le plus important. Le rapport doit être rédigé au format markdown et doit être facile à lire et à comprendre pour un public général. En particulier, concentrez-vous sur la fourniture d'informations et d'analyses qui seront utiles aux parties prenantes et aux décideurs. Vous pouvez également utiliser des informations ou des sources supplémentaires si nécessaire.",
    "remark": "Extraire les points clés et les développer de manière appropriée pour générer des rapports hebdomadaires basés sur le contenu du travail quotidien."
  },
  "de": {
    "title": "Wöchentlicher Berichtsgenerator",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in German. Please begin by editing the following text: ",
    "description": "Verwenden Sie den nachstehenden Text als Grundlage für einen Wochenbericht in chinesischer Sprache, um eine knappe Zusammenfassung zu erstellen, die die wichtigsten Inhalte hervorhebt. Der Bericht sollte im Markdown-Format erstellt werden und für ein allgemeines Publikum leicht zu lesen und zu verstehen sein. Konzentrieren Sie sich vor allem auf Erkenntnisse und Analysen, die für Interessengruppen und Entscheidungsträger von Nutzen sein werden. Sie können bei Bedarf auch zusätzliche Informationen oder Quellen verwenden.",
    "remark": "Extrahieren Sie die wichtigsten Punkte und erweitern Sie sie entsprechend, um wöchentliche Berichte auf der Grundlage der täglichen Arbeitsinhalte zu erstellen."
  },
  "it": {
    "title": "Generatore di rapporti settimanali",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Italian. Please begin by editing the following text: ",
    "description": "Utilizzate il testo fornito di seguito come base per un rapporto settimanale in cinese per generare un riassunto sintetico che evidenzi i contenuti più importanti. Il rapporto deve essere in formato markdown e deve essere di facile lettura e comprensione per un pubblico generico. In particolare, è necessario fornire approfondimenti e analisi che siano utili alle parti interessate e ai responsabili delle decisioni. Potete anche utilizzare informazioni o fonti aggiuntive, se necessario.",
    "remark": "Estrarre i punti chiave ed espanderli in modo appropriato per generare rapporti settimanali basati sul contenuto del lavoro quotidiano."
  },
  "ru": {
    "title": "Генератор еженедельных отчетов",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Russian. Please begin by editing the following text: ",
    "description": "Используйте приведенный ниже текст в качестве основы для еженедельного отчета на китайском языке, чтобы составить краткое резюме, выделяя наиболее важное содержание. Отчет должен быть выполнен в формате markdown и должен быть простым для чтения и понимания широкой аудиторией. В частности, сосредоточьтесь на изложении идей и аналитических выкладок, которые будут полезны заинтересованным сторонам и лицам, принимающим решения. При необходимости можно использовать любую дополнительную информацию или источники.",
    "remark": "Извлечение ключевых моментов и их соответствующее расширение для создания еженедельных отчетов на основе содержания ежедневной работы."
  },
  "pt": {
    "title": "Gerador de relatórios semanais",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Portuguese. Please begin by editing the following text: ",
    "description": "Utilize o texto fornecido abaixo como base para um relatório semanal em chinês para gerar um resumo sucinto que destaque o conteúdo mais importante. O relatório deve estar em formato markdown e deve ser fácil de ler e compreender para um público geral. Em particular, concentre-se em fornecer informações e análises que sejam úteis para as partes interessadas e os decisores. Pode também utilizar quaisquer informações ou fontes adicionais, se necessário.",
    "remark": "Extrair pontos-chave e expandi-los adequadamente para gerar relatórios semanais com base no conteúdo do trabalho diário."
  },
  "hi": {
    "title": "साप्ताहिक जेनरेटर",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Hindi. Please begin by editing the following text: ",
    "description": "एक संक्षिप्त सारांश तैयार करने के लिए चीनी साप्ताहिक रिपोर्ट के आधार के रूप में नीचे दिए गए पाठ का उपयोग करें जो सबसे महत्वपूर्ण सामग्री पर प्रकाश डालता है। रिपोर्ट मार्कडाउन प्रारूप में लिखी जानी चाहिए और सामान्य दर्शकों के लिए पढ़ने और समझने में आसान होनी चाहिए। विशेष रूप से, हितधारकों और नीति निर्माताओं के लिए उपयोगी अंतर्दृष्टि और विश्लेषण प्रदान करने पर ध्यान केंद्रित करें। आप आवश्यकतानुसार किसी अतिरिक्त जानकारी या स्रोत का भी उपयोग कर सकते हैं।",
    "remark": "दैनिक कार्य की सामग्री के अनुसार, मुख्य बिंदु निकालें और साप्ताहिक रिपोर्ट तैयार करने के लिए उनका उचित विस्तार करें।"
  },
  "ar": {
    "title": "المولد الأسبوعي",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Arabic. Please begin by editing the following text: ",
    "description": "استخدم النص الوارد أدناه كأساس لتقرير أسبوعي صيني لإنشاء ملخص موجز يسلط الضوء على المحتوى الأكثر أهمية. يجب كتابة التقرير بتنسيق تخفيض السعر ويجب أن يكون سهل القراءة والفهم للجمهور العام. على وجه الخصوص ، ركز على تقديم رؤى وتحليلات مفيدة لأصحاب المصلحة وصانعي السياسات. يمكنك أيضًا استخدام أي معلومات أو مصادر إضافية حسب الحاجة.",
    "remark": "وفقًا لمحتوى العمل اليومي ، استخرج النقاط الرئيسية وقم بتوسيعها بشكل مناسب لإنشاء تقرير أسبوعي."
  },
  "bn": {
    "title": "সাপ্তাহিক জেনারেটর",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Bengali. Please begin by editing the following text: ",
    "description": "সবচেয়ে গুরুত্বপূর্ণ বিষয়বস্তুকে হাইলাইট করে এমন একটি সংক্ষিপ্ত সারসংক্ষেপ তৈরি করতে একটি চীনা সাপ্তাহিক প্রতিবেদনের ভিত্তি হিসাবে নীচে দেওয়া পাঠ্যটি ব্যবহার করুন। প্রতিবেদনটি মার্কডাউন বিন্যাসে লিখিত হওয়া উচিত এবং সাধারণ দর্শকদের জন্য পড়তে এবং বোঝা সহজ হওয়া উচিত। বিশেষ করে, স্টেকহোল্ডার এবং নীতি নির্ধারকদের জন্য দরকারী অন্তর্দৃষ্টি এবং বিশ্লেষণ প্রদানের উপর ফোকাস করুন। প্রয়োজনে আপনি যেকোনো অতিরিক্ত তথ্য বা উৎস ব্যবহার করতে পারেন।",
    "remark": "দৈনিক কাজের বিষয়বস্তু অনুসারে, মূল পয়েন্টগুলি বের করুন এবং একটি সাপ্তাহিক প্রতিবেদন তৈরি করতে যথাযথভাবে প্রসারিত করুন।"
  },
  "website": null,
  "tags": [
    "article"
  ],
  "id": 210,
  "weight": 3335
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
