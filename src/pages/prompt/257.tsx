import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "学术写作 - 概念界定",
    "prompt": "As a top researcher and specialist in【对应领域】, provide a detailed explanation of the concept of【概念】. Your response, written in Chinese, should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "作为【对应领域】的顶级研究人员和专家，请对【概念】的概念进行详细解释。你的回答应包括其起源、理论基础、常见成分、应用要求、主要参考文献以及你认为必要的任何其他相关信息，以提供全面的理解。",
    "remark": "为学术写作的概念界定部分提供初始思路及材料。来自 @JuliaZhu-0601 的投稿。"
  },
  "en": {
    "title": "Conceptual Definition",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "remark": "Provide initial ideas and materials for defining the concept section of academic writing. Contributed by @JuliaZhu-0601."
  },
  "ja": {
    "title": "アカデミックライティング - 概念を定義する",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Janpanese. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "対応する分野」のトップ研究者、専門家として、「コンセプト」の概念について、詳細な説明をお願いします。回答には、その起源、理論的根拠、共通の構成要素、適用要件、主要な参考文献、および包括的な理解を提供するために必要と思われるその他の関連情報を含める必要があります。",
    "remark": "アカデミックライティングのコンセプト定義セクションの最初のアイデアと素材を提供します。JuliaZhu-0601 さんからの寄稿です。"
  },
  "ko": {
    "title": "학술적 글쓰기 - 개념 정의",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Korean. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "해당 분야] 의 최고 연구자이자 전문가로서 [개념] 의 개념에 대해 자세히 설명해 주세요. 답변에는 개념의 기원, 이론적 근거, 공통 구성 요소, 적용 요건, 주요 참고 문헌 및 포괄적인 이해를 위해 필요하다고 생각되는 기타 관련 정보가 포함되어야 합니다.",
    "remark": "학술 글쓰기의 개념 정의 섹션에 대한 초기 아이디어와 자료를 제공합니다. JuliaZhu-0601 의 기여."
  },
  "es": {
    "title": "Escritura académica - Definición de conceptos",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Spanish. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "En su calidad de investigador de alto nivel y experto en [campo correspondiente], le rogamos que ofrezca una explicación detallada del concepto de [concepto]. Su respuesta debe incluir su origen, base teórica, componentes comunes, requisitos de aplicación, referencias clave y cualquier otra información relevante que considere necesaria para proporcionar una comprensión completa.",
    "remark": "Proporciona ideas iniciales y material para la sección de definición de conceptos de la escritura académica. Contribución de @JuliaZhu-0601."
  },
  "fr": {
    "title": "Rédaction académique - Définition du concept",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in French. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "En tant que chercheur de haut niveau et expert en [domaine correspondant], veuillez fournir une explication détaillée du concept de [concept]. Votre réponse doit inclure son origine, sa base théorique, ses composantes communes, ses exigences d'application, ses références clés et toute autre information pertinente que vous jugez nécessaire pour une compréhension complète.",
    "remark": "Fournit des idées initiales et du matériel pour la section de définition du concept de l'écriture académique. Contribution de @JuliaZhu-0601."
  },
  "de": {
    "title": "Akademisches Schreiben - Begriffsdefinition",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in German. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "Als Spitzenforscher und Experte auf dem [entsprechenden Gebiet] erläutern Sie bitte ausführlich das Konzept von [Konzept]. Ihre Antwort sollte den Ursprung, die theoretische Grundlage, die gemeinsamen Komponenten, die Anwendungsanforderungen, die wichtigsten Referenzen und alle anderen relevanten Informationen enthalten, die Sie für ein umfassendes Verständnis für notwendig halten.",
    "remark": "Bietet erste Ideen und Material für den Abschnitt zur Begriffsdefinition in akademischen Schriften. Beitrag von @JuliaZhu-0601."
  },
  "it": {
    "title": "Scrittura accademica - Definizione del concetto",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Italian. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "In qualità di ricercatore di alto livello ed esperto in [campo corrispondente], la preghiamo di fornire una spiegazione dettagliata del concetto di [concetto]. La risposta deve includere l'origine, le basi teoriche, i componenti comuni, i requisiti applicativi, i riferimenti principali e qualsiasi altra informazione pertinente ritenuta necessaria per fornire una comprensione completa.",
    "remark": "Fornisce idee e materiale iniziale per la sezione di definizione del concetto di scrittura accademica. Contributo di @JuliaZhu-0601."
  },
  "ru": {
    "title": "Академическое письмо - определение понятия",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Russian. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "Как ведущий исследователь и эксперт в [соответствующей области], просим Вас дать подробное объяснение концепции [концепция]. Ваш ответ должен включать его происхождение, теоретическую основу, общие компоненты, требования к применению, ключевые ссылки и любую другую информацию, которую вы сочтете необходимой для полного понимания.",
    "remark": "Предоставляет исходные идеи и материал для раздела \"Определение понятия\" в академическом письме. Вклад от @JuliaZhu-0601."
  },
  "pt": {
    "title": "Escrita académica - Definição do conceito",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Portuguese. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "Enquanto investigador de topo e especialista em [domínio correspondente], queira fornecer uma explicação pormenorizada do conceito de [conceito]. A sua resposta deve incluir a origem, a base teórica, os componentes comuns, os requisitos de aplicação, as principais referências e quaisquer outras informações relevantes que considere necessárias para uma compreensão abrangente.",
    "remark": "Fornece ideias iniciais e material para a secção de definição de conceitos da escrita académica. Contribuição de @JuliaZhu-0601."
  },
  "hi": {
    "title": "अकादमिक लेखन - संकल्पना परिभाषा",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Hindi. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "[संबंधित क्षेत्र] में एक शीर्ष शोधकर्ता और विशेषज्ञ के रूप में, कृपया [अवधारणा] की अवधारणा को विस्तार से समझाएं। आपके उत्तर में इसकी उत्पत्ति, सैद्धांतिक आधार, सामान्य सामग्री, आवेदन आवश्यकताएं, मुख्य संदर्भ और कोई अन्य प्रासंगिक जानकारी शामिल होनी चाहिए जिसे आप व्यापक समझ प्रदान करने के लिए आवश्यक मानते हैं।",
    "remark": "अकादमिक लेखन की अवधारणा परिभाषा भाग के लिए प्रारंभिक विचार और सामग्री प्रदान करें। @जूलियाझू-0601 से योगदान।"
  },
  "ar": {
    "title": "الكتابة الأكاديمية - تعريف المفهوم",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Arabic. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "بصفتك باحثًا كبيرًا وخبيرًا في [المجال المقابل] ، يرجى شرح مفهوم [المفهوم] بالتفصيل. يجب أن تتضمن إجابتك أصلها ، والأساس النظري ، والمكونات المشتركة ، ومتطلبات التطبيق ، والمراجع الرئيسية ، وأي معلومات أخرى ذات صلة تراها ضرورية لتوفير فهم شامل.",
    "remark": "قدم أفكارًا ومواد أولية لجزء تعريف المفهوم من الكتابة الأكاديمية. مساهمة من @ JuliaZhu-0601."
  },
  "bn": {
    "title": "একাডেমিক লেখা - ধারণার সংজ্ঞা",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Bengali. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "একজন শীর্ষ গবেষক এবং [সংশ্লিষ্ট ক্ষেত্রের] বিশেষজ্ঞ হিসেবে, অনুগ্রহ করে [ধারণা] বিস্তারিতভাবে ব্যাখ্যা করুন। আপনার উত্তরে এর উৎপত্তি, তাত্ত্বিক ভিত্তি, সাধারণ উপাদান, প্রয়োগের প্রয়োজনীয়তা, মূল রেফারেন্স এবং অন্য যেকোন প্রাসঙ্গিক তথ্য অন্তর্ভুক্ত করা উচিত যা আপনি একটি ব্যাপক বোঝার জন্য প্রয়োজনীয় বলে মনে করেন।",
    "remark": "একাডেমিক লেখার ধারণা সংজ্ঞা অংশের জন্য প্রাথমিক ধারণা এবং উপকরণ সরবরাহ করুন। @JuliaZhu-0601 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "academic"
  ],
  "id": 257,
  "weight": 261
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
