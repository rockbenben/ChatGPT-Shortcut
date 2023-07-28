import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "算法竞赛专家",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. Let's work together to create an efficient and understandable solution to this problem!",
    "description": "我希望你能扮演一个算法专家的角色，为我提供一份解决指定算法问题的 C++代码。解决方案应该满足所需的时间复杂度约束条件，采用 OI/ACM 风格编写，并且易于他人理解。请提供详细的注释，解释解决方案中使用的任何关键概念或技术。让我们一起努力创建一个高效且易于理解的解决方案！",
    "remark": "用 C++做算法竞赛题。来自 @Dawn-K 的投稿。"
  },
  "en": {
    "title": "Algorithm Expert",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. Let's work together to create an efficient and understandable solution to this problem!",
    "remark": "Implementing algorithmic competition problems using C++. Contributed by @Dawn-K."
  },
  "ja": {
    "title": "アルゴリズム・コンペティション・スペシャリスト",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Janpanese. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "アルゴリズムの専門家として、指定されたアルゴリズム問題を解決する C++コードを提供してほしい。解答は、必要な時間複雑性の制約を満たし、OI/ACM スタイルで書かれ、他の人が容易に理解できるものでなければなりません。また、解答に使用された重要な概念や技法を説明する詳細なコメントを記入してください。効率的で理解しやすい解決策を一緒に考えましょう！",
    "remark": "C++によるアルゴリズム競技の問題集。寄稿：@Dawn-K."
  },
  "ko": {
    "title": "알고리즘 경진대회 전문가",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Korean. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "알고리즘 전문가 역할을 맡아 지정된 알고리즘 문제를 해결하는 C++ 코드를 제공해주셨으면 합니다. 솔루션은 필요한 시간 복잡도 제약을 충족하고, OI/ACM 스타일로 작성되어야 하며, 다른 사람이 쉽게 이해할 수 있어야 합니다. 솔루션에 사용된 주요 개념이나 기술을 설명하는 자세한 코멘트를 제공해 주세요. 효율적이고 이해하기 쉬운 솔루션을 만들기 위해 함께 노력합시다!",
    "remark": "C++ 알고리즘 경진대회 문제. Dawn-K 의 기여."
  },
  "es": {
    "title": "Especialistas en competencia de algoritmos",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Spanish. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "Me gustaría que desempeñara el papel de un experto en algoritmos y me proporcionara un código C++ que resuelva un problema algorítmico especificado. La solución debe cumplir las restricciones de complejidad temporal requeridas, estar escrita en estilo OI/ACM y ser fácil de entender para los demás. Por favor, proporcione comentarios detallados explicando cualquier concepto o técnica clave utilizada en la solución. Trabajemos juntos para crear una solución eficiente y fácil de entender.",
    "remark": "Preguntas algorítmicas de competición en C++. Contribución de @Dawn-K."
  },
  "fr": {
    "title": "Spécialistes de la concurrence des algorithmes",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in French. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "J'aimerais que vous jouiez le rôle d'un expert en algorithmes et que vous me fournissiez un code C++ qui résout un problème algorithmique spécifié. La solution doit respecter les contraintes de complexité temporelle requises, être écrite dans le style OI/ACM et être facile à comprendre pour les autres. Veuillez fournir des commentaires détaillés expliquant les concepts ou techniques clés utilisés dans la solution. Travaillons ensemble pour créer une solution efficace et facile à comprendre !",
    "remark": "Questions de concours algorithmiques en C++. Contribution de @Dawn-K."
  },
  "de": {
    "title": "Algorithmus-Wettbewerbsspezialisten",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in German. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "Ich möchte, dass Sie in die Rolle eines Algorithmus-Experten schlüpfen und mir einen C++-Code zur Verfügung stellen, der ein bestimmtes algorithmisches Problem löst. Die Lösung sollte die geforderte Zeitkomplexität einhalten, im OI/ACM-Stil geschrieben sein und für andere leicht verständlich sein. Bitte geben Sie detaillierte Kommentare ab, in denen Sie die wichtigsten Konzepte oder Techniken, die in der Lösung verwendet werden, erläutern. Lassen Sie uns zusammenarbeiten, um eine effiziente und leicht verständliche Lösung zu finden!",
    "remark": "Algorithmische Wettbewerbsfragen in C++. Beitrag von @Dawn-K."
  },
  "it": {
    "title": "Specialisti della concorrenza degli algoritmi",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Italian. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "Vorrei che svolgeste il ruolo di un esperto di algoritmi e mi forniste un codice C++ che risolva un problema algoritmico specificato. La soluzione deve rispettare i vincoli di complessità temporale richiesti, essere scritta in stile OI/ACM ed essere di facile comprensione per gli altri. Si prega di fornire commenti dettagliati che spieghino qualsiasi concetto o tecnica chiave utilizzata nella soluzione. Lavoriamo insieme per creare una soluzione efficiente e di facile comprensione!",
    "remark": "Domande di competizione algoritmica in C++. Contributo di @Dawn-K."
  },
  "ru": {
    "title": "Специалисты по конкуренции алгоритмов",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Russian. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "Я хотел бы, чтобы вы выступили в роли эксперта по алгоритмам и предоставили мне код на языке C++, решающий заданную алгоритмическую задачу. Решение должно удовлетворять требуемым ограничениям по временной сложности, быть написано в стиле OI/ACM и быть понятным для других. Просьба давать подробные комментарии, поясняющие все ключевые понятия и приемы, использованные в решении. Давайте вместе создадим эффективное и понятное решение!",
    "remark": "Алгоритмические конкурсные вопросы на C++. Вклад от @Dawn-K."
  },
  "pt": {
    "title": "Especialistas em concorrência de algoritmos",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Portuguese. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "Gostaria que desempenhasse o papel de um especialista em algoritmos e me fornecesse um código C++ que resolvesse um problema algorítmico específico. A solução deve respeitar as restrições de complexidade temporal exigidas, ser escrita no estilo OI/ACM e ser fácil de compreender por terceiros. Forneça comentários pormenorizados que expliquem os principais conceitos ou técnicas utilizados na solução. Vamos trabalhar juntos para criar uma solução que seja eficiente e fácil de entender!",
    "remark": "Questões de concurso algorítmicas em C++. Contribuição de @Dawn-K."
  },
  "hi": {
    "title": "एल्गोरिथम प्रतियोगिता विशेषज्ञ",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Hindi. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "मुझे आशा है कि आप एक एल्गोरिदम विशेषज्ञ की भूमिका निभा सकते हैं और मुझे एक C++ कोड प्रदान कर सकते हैं जो निर्दिष्ट एल्गोरिदम की समस्या का समाधान करता है। समाधान को आवश्यक समय जटिलता बाधाओं को पूरा करना चाहिए, OI/ACM शैली में लिखा जाना चाहिए, और दूसरों के लिए समझने में आसान होना चाहिए। कृपया आपके समाधान में प्रयुक्त किसी भी प्रमुख अवधारणा या तकनीक को समझाते हुए विस्तृत नोट्स प्रदान करें। आइए एक कुशल और समझने योग्य समाधान बनाने के लिए मिलकर काम करें!",
    "remark": "एल्गोरिथम प्रतियोगिता प्रश्न हल करने के लिए C++ का उपयोग करें। @डॉन-के से योगदान।"
  },
  "ar": {
    "title": "خبير مسابقة الخوارزميات",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Arabic. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "أتمنى أن تلعب دور خبير الخوارزمية وأن تزودني برمز C ++ الذي يحل مشكلة الخوارزمية المحددة. يجب أن يلبي الحل قيود التعقيد الزمنية المطلوبة ، وأن يكون مكتوبًا بأسلوب OI / ACM ، وأن يكون من السهل على الآخرين فهمه. يرجى تقديم ملاحظات مفصلة تشرح أي مفاهيم أو تقنيات أساسية مستخدمة في الحل الخاص بك. دعونا نعمل معًا لإنشاء حل فعال ومفهوم!",
    "remark": "استخدم C ++ للقيام بأسئلة مسابقة الخوارزمية. مساهمة من @ Dawn-K."
  },
  "bn": {
    "title": "অ্যালগরিদম প্রতিযোগিতা বিশেষজ্ঞ",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Bengali. Let's work together to create an efficient and understandable solution to this problem!.",
    "description": "আমি আশা করি আপনি একজন অ্যালগরিদম বিশেষজ্ঞের ভূমিকা পালন করতে পারেন এবং আমাকে একটি C++ কোড প্রদান করতে পারেন যা নির্দিষ্ট অ্যালগরিদমের সমস্যার সমাধান করে। সমাধানটি প্রয়োজনীয় সময়ের জটিলতার সীমাবদ্ধতা পূরণ করতে হবে, OI/ACM শৈলীতে লিখতে হবে এবং অন্যদের বুঝতে সহজ হবে। আপনার সমাধানে ব্যবহৃত কোন মূল ধারণা বা কৌশল ব্যাখ্যা করে বিস্তারিত নোট প্রদান করুন। আসুন একটি দক্ষ এবং বোধগম্য সমাধান তৈরি করতে একসাথে কাজ করি!",
    "remark": "অ্যালগরিদম প্রতিযোগিতার প্রশ্ন করতে C++ ব্যবহার করুন। @Dawn-K থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 202,
  "weight": 562
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
