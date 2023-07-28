import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "调研报告助手",
    "prompt": "Please write a research report on a topic of [主题]. Respond in Chinese. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "请根据以下提示撰写一份【报告主题】调研报告。您可以根据您的研究领域自由发挥，但请确保您的报告具有以下特征：1. 具有明确的问题陈述和研究目的；2. 包含对现有文献和数据的全面分析和综述；3. 采用适当的方法和技术进行数据收集和分析；4. 提供准确的结论和建议，以回答研究问题并解决研究目的。",
    "remark": "根据更换不同的类型，以产出适合自己需求的调研报告。来自 @b3ue 的投稿。"
  },
  "en": {
    "title": "Research Report",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "remark": "Contributed by @b3ue."
  },
  "ja": {
    "title": "研究報告書アシスタント",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Janpanese. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "以下のプロンプトに基づき、[レポートテーマ] の研究レポートを書いてください。研究分野に応じて自由に行うことができますが、レポートには以下の特徴があることを確認してください：1.明確な問題提起と研究目的がある、2.利用可能な文献とデータの包括的な分析とレビューがある、3.データ収集と分析に適切な方法と技法を用いている、4.研究課題に答え、研究目的に対処するための正確な結論と推奨がある。",
    "remark": "買い替えの種類によって、ニーズに合った調査報告書を作成するために。b3ue さんからの寄稿です。"
  },
  "ko": {
    "title": "연구 보고서 도우미",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Korean. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "다음 프롬프트에 따라 [보고서 주제] 연구 보고서를 작성해 주세요. 연구 분야에 따라 자유롭게 작성할 수 있지만, 보고서에는 다음과 같은 특징이 포함되어야 합니다: 1. 명확한 문제 제기와 연구 목표, 2. 이용 가능한 문헌과 데이터의 종합적인 분석 및 검토, 3. 데이터 수집 및 분석에 적절한 방법과 기술 사용, 4. 연구 질문에 답하고 연구 목표를 해결하기 위한 정확한 결론 및 권장 사항 제공.",
    "remark": "교체 유형에 따라 필요에 맞는 연구 보고서를 작성할 수 있습니다. b3ue 의 기여."
  },
  "es": {
    "title": "Asistente de informes de investigación",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Spanish. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "Redacte un informe de investigación [Tema del informe] basado en las siguientes indicaciones. Puede hacerlo libremente según su área de investigación, pero asegúrese de que su informe presenta las siguientes características: 1. tiene un planteamiento del problema y unos objetivos de investigación claros; 2. contiene un análisis y una síntesis exhaustivos de la bibliografía y los datos existentes; 3. utiliza métodos y técnicas adecuados para la recopilación y el análisis de datos; y 4. ofrece conclusiones y recomendaciones precisas para responder a las preguntas de investigación y abordar los objetivos de investigación.",
    "remark": "En función del tipo de sustitución para elaborar un informe de investigación que se adapte a sus necesidades. Contribución de @b3ue."
  },
  "fr": {
    "title": "Assistant au rapport de recherche",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in French. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "Veuillez rédiger un rapport de recherche [Sujet du rapport] en vous basant sur les questions suivantes. Vous êtes libre de le faire en fonction de votre domaine de recherche, mais veillez à ce que votre rapport présente les caractéristiques suivantes : 1. il contient un énoncé clair du problème et des objectifs de recherche ; 2. il contient une analyse et une synthèse complètes de la littérature et des données existantes ; 3. il utilise des méthodes et des techniques appropriées pour la collecte et l'analyse des données ; et 4. il fournit des conclusions et des recommandations précises pour répondre aux questions de recherche et atteindre les objectifs de la recherche.",
    "remark": "Selon le type de remplacement afin de produire un rapport de recherche adapté à vos besoins. Contribution de @b3ue."
  },
  "de": {
    "title": "Assistentin für Forschungsberichte",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in German. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "Bitte schreiben Sie einen [Thema des Berichts] Forschungsbericht auf der Grundlage der folgenden Vorgaben. Es steht Ihnen frei, dies entsprechend Ihrem Forschungsgebiet zu tun, aber bitte stellen Sie sicher, dass Ihr Bericht die folgenden Merkmale aufweist: 1. eine klare Problemstellung und Forschungsziele; 2. eine umfassende Analyse und Synthese der vorhandenen Literatur und Daten; 3. geeignete Methoden und Techniken für die Datenerhebung und -analyse; und 4. genaue Schlussfolgerungen und Empfehlungen, um die Forschungsfragen zu beantworten und die Forschungsziele zu erreichen.",
    "remark": "Abhängig von der Art der Ersetzung, um einen Forschungsbericht zu erstellen, der Ihren Bedürfnissen entspricht. Beitrag von @b3ue."
  },
  "it": {
    "title": "Assistente per i rapporti di ricerca",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Italian. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "Scrivete una relazione di ricerca [argomento della relazione] basata sui seguenti suggerimenti. Siete liberi di farlo in base alla vostra area di ricerca, ma assicuratevi che il vostro rapporto abbia le seguenti caratteristiche: 1. abbia una chiara dichiarazione del problema e degli obiettivi di ricerca; 2. contenga un'analisi e una sintesi completa della letteratura e dei dati esistenti; 3. utilizzi metodi e tecniche appropriate per la raccolta e l'analisi dei dati; 4. fornisca conclusioni e raccomandazioni accurate per rispondere alle domande di ricerca e affrontare gli obiettivi di ricerca.",
    "remark": "A seconda del tipo di sostituzione, per produrre un rapporto di ricerca adatto alle vostre esigenze. Contributo di @b3ue."
  },
  "ru": {
    "title": "Ассистент по подготовке исследовательских отчетов",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Russian. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "Напишите, пожалуйста, исследовательский отчет [Тема отчета], основываясь на следующих предложениях. Вы можете сделать это в соответствии со своей областью исследований, но, пожалуйста, убедитесь, что Ваш отчет обладает следующими характеристиками: 1. имеет четкую постановку проблемы и цели исследования; 2. содержит всесторонний анализ и синтез существующей литературы и данных; 3. использует соответствующие методы и приемы сбора и анализа данных; 4. содержит точные выводы и рекомендации для ответа на вопросы исследования и решения поставленных задач.",
    "remark": "В зависимости от типа замены для подготовки исследовательского отчета, который соответствует вашим потребностям. Вклад от @b3ue."
  },
  "pt": {
    "title": "Assistente de relatório de investigação",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Portuguese. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "Escreva um relatório de investigação [Tema do relatório] com base nas seguintes sugestões. É livre de o fazer de acordo com a sua área de investigação, mas certifique-se de que o seu relatório tem as seguintes características: 1. tem uma declaração clara do problema e objectivos de investigação; 2. contém uma análise e síntese abrangentes da literatura e dos dados existentes; 3. utiliza métodos e técnicas adequados para a recolha e análise de dados; e 4. apresenta conclusões e recomendações precisas para responder às questões de investigação e abordar os objectivos de investigação.",
    "remark": "Em função do tipo de substituição, para elaborar um relatório de investigação adaptado às suas necessidades. Contribuição de @b3ue."
  },
  "hi": {
    "title": "अनुसंधान रिपोर्ट सहायक",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Hindi. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "कृपया निम्नलिखित युक्तियों के अनुसार एक [रिपोर्ट विषय] शोध रिपोर्ट लिखें। आप अपने अनुसंधान क्षेत्र का उपयोग करने के लिए स्वतंत्र हैं, लेकिन कृपया सुनिश्चित करें कि आपकी रिपोर्ट में निम्नलिखित विशेषताएं हैं: 1. एक स्पष्ट समस्या विवरण और अनुसंधान उद्देश्य है; 2. मौजूदा साहित्य और डेटा का व्यापक विश्लेषण और समीक्षा शामिल है; 3. उचित उपयोग करता है 4 . शोध प्रश्नों के उत्तर देने और शोध उद्देश्यों को संबोधित करने के लिए सटीक निष्कर्ष और सिफारिशें प्रदान करें।",
    "remark": "विभिन्न प्रकारों के प्रतिस्थापन के अनुसार, एक शोध रिपोर्ट तैयार करना जो आपकी आवश्यकताओं के अनुरूप हो। @b3ue से योगदान."
  },
  "ar": {
    "title": "مساعد تقرير البحث",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Arabic. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "يرجى كتابة تقرير بحثي [Report Topic] وفقًا للنصائح التالية. لك الحرية في استخدام مجال البحث الخاص بك ، ولكن يرجى التأكد من أن تقريرك يحتوي على الخصائص التالية: 1. يحتوي على بيان واضح للمشكلة والغرض من البحث ؛ 2. يحتوي على تحليل شامل ومراجعة للأدبيات والبيانات الموجودة ؛ 3. الاستخدامات المناسبة 4 • تقديم استنتاجات وتوصيات دقيقة للإجابة على أسئلة البحث ومعالجة أهداف البحث.",
    "remark": "حسب استبدال الأنواع المختلفة ، لإنتاج تقرير بحثي يناسب احتياجاتك. مساهمة من @ b3ue."
  },
  "bn": {
    "title": "গবেষণা প্রতিবেদন সহকারী",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Bengali. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "নিম্নলিখিত টিপস অনুযায়ী একটি [রিপোর্ট বিষয়] গবেষণা প্রতিবেদন লিখুন. আপনি আপনার গবেষণার ক্ষেত্রটি ব্যবহার করার জন্য স্বাধীন, তবে দয়া করে নিশ্চিত করুন যে আপনার প্রতিবেদনে নিম্নলিখিত বৈশিষ্ট্য রয়েছে: 1. একটি স্পষ্ট সমস্যা বিবৃতি এবং গবেষণার উদ্দেশ্য রয়েছে; 2. বিদ্যমান সাহিত্য এবং ডেটার একটি ব্যাপক বিশ্লেষণ এবং পর্যালোচনা রয়েছে; 3. উপযুক্ত 4 ব্যবহার করে গবেষণার প্রশ্নের উত্তর দিতে এবং গবেষণার উদ্দেশ্য পূরণের জন্য সঠিক উপসংহার এবং সুপারিশ প্রদান করুন।",
    "remark": "বিভিন্ন ধরনের প্রতিস্থাপন অনুযায়ী, আপনার প্রয়োজন অনুসারে একটি গবেষণা প্রতিবেদন তৈরি করতে। @b3ue থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "article"
  ],
  "id": 214,
  "weight": 2843
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
