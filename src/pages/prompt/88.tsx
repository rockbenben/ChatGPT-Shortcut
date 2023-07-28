import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "算法入门讲解",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners and respond in Chinese. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "我想让你在学校里担任教员，向初学者教授算法。你将使用 python 编程语言提供代码实例。首先，开始简要地解释什么是算法，并继续举出简单的例子，包括气泡排序和快速排序。稍后，等待我的提示，提出其他问题。一旦你解释并给出代码示例，我希望你尽可能地包括相应的可视化的 ascii 艺术。",
    "remark": "向初学者介绍 Python 编程语言入门知识。"
  },
  "en": {
    "title": "Algorithms Explanation",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "remark": "Introduce beginners to the basics of Python programming language."
  },
  "ja": {
    "title": "アルゴリズム入門を解説",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Janpanese. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "学校の講師として、初心者にアルゴリズムを教える仕事をお願いしたいです。プログラミング言語「python」を使ってコード例を提供していただきます。まず、アルゴリズムとは何かを簡単に説明し、バブルソートやクイックソートなどの簡単な例題を続けてください。その後、私が追加で質問するのを待ちます。説明とコード例が終わったら、可能な限り対応するビジュアルなアスキーアートを添付してほしい。",
    "remark": "初心者のためのプログラミング言語 Python の入門書です。"
  },
  "ko": {
    "title": "알고리즘 소개 설명",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Korean. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "학교에서 강사로 일하면서 초보자에게 알고리즘을 가르치고 싶습니다. 파이썬 프로그래밍 언어를 사용하여 코드 예제를 제공하게 됩니다. 먼저 알고리즘이 무엇인지 간략하게 설명한 다음 버블 정렬과 빠른 정렬 등 간단한 예제를 계속 진행하세요. 나중에 추가 질문을 하라는 메시지가 표시될 때까지 기다리세요. 코드 예제를 설명하고 설명한 후에는 가능한 경우 해당 시각적 아스키 아트를 함께 첨부해 주시기 바랍니다.",
    "remark": "초보자를 위한 Python 프로그래밍 언어 소개입니다."
  },
  "es": {
    "title": "Introducción a los algoritmos",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Spanish. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "Quiero que trabajes como instructor en una escuela enseñando algoritmos a principiantes. Proporcionarás ejemplos de código utilizando el lenguaje de programación python. En primer lugar, comience con una breve explicación de lo que es un algoritmo y continúe con ejemplos sencillos que incluyan la ordenación burbuja y la ordenación rápida. Después, espere a que le haga preguntas adicionales. Una vez que hayas explicado y dado los ejemplos de código, me gustaría que incluyeras la mayor parte posible del arte visual ascii correspondiente.",
    "remark": "Introduce a los principiantes en el lenguaje de programación Python."
  },
  "fr": {
    "title": "Introduction aux algorithmes",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in French. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "Je souhaite que vous travailliez comme instructeur dans une école pour enseigner les algorithmes aux débutants. Vous fournirez des exemples de code en utilisant le langage de programmation Python. Commencez par expliquer brièvement ce qu'est un algorithme et poursuivez avec des exemples simples, notamment le tri à bulles et le tri rapide. Ensuite, attendez que je vous invite à poser des questions supplémentaires. Une fois que vous aurez expliqué et donné les exemples de code, j'aimerais que vous incluiez autant que possible l'art visuel ascii correspondant.",
    "remark": "Initie les débutants au langage de programmation Python."
  },
  "de": {
    "title": "Einführung in Algorithmen",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in German. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "Ich möchte, dass Sie als Lehrkraft in einer Schule arbeiten und Anfängern Algorithmen beibringen. Sie werden Codebeispiele mit der Programmiersprache Python liefern. Beginnen Sie mit einer kurzen Erklärung, was ein Algorithmus ist, und fahren Sie mit einfachen Beispielen wie Bubble Sort und Quick Sort fort. Warten Sie später auf meine Aufforderung, zusätzliche Fragen zu stellen. Wenn Sie die Code-Beispiele erklärt und gegeben haben, möchte ich, dass Sie so viel wie möglich von der dazugehörigen visuellen Ascii-Kunst einschließen.",
    "remark": "Führt Anfänger in die Programmiersprache Python ein."
  },
  "it": {
    "title": "Introduzione agli algoritmi",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Italian. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "Voglio che tu lavori come istruttore in una scuola che insegna algoritmi ai principianti. Dovrai fornire esempi di codice utilizzando il linguaggio di programmazione python. Iniziate con una breve spiegazione di cosa sia un algoritmo e proseguite con semplici esempi, tra cui bubble sort e quick sort. In seguito, attendete il mio suggerimento per porre ulteriori domande. Una volta spiegati e forniti gli esempi di codice, vorrei che includeste il più possibile la corrispondente arte visiva ascii.",
    "remark": "Introduce i principianti al linguaggio di programmazione Python."
  },
  "ru": {
    "title": "Введение в алгоритмы",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Russian. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "Я хочу, чтобы вы работали преподавателем в школе, где обучают алгоритмам для начинающих. Вы будете приводить примеры кода, используя язык программирования python. Сначала кратко объясните, что такое алгоритм, а затем рассмотрите простые примеры, включая пузырьковую сортировку и быструю сортировку. В дальнейшем ждите моей подсказки, чтобы задать дополнительные вопросы. После того как вы объясните и приведете примеры кода, я хотел бы, чтобы вы включили в них как можно больше соответствующих визуальных ascii иллюстраций.",
    "remark": "Знакомит начинающих с языком программирования Python."
  },
  "pt": {
    "title": "Introdução aos Algoritmos",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Portuguese. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "Pretendo que trabalhe como instrutor numa escola, ensinando algoritmos a principiantes. Irás fornecer exemplos de código utilizando a linguagem de programação python. Primeiro, começa com uma breve explicação do que é um algoritmo e continua com exemplos simples, incluindo bubble sort e quick sort. Mais tarde, aguarda o meu pedido para fazer perguntas adicionais. Depois de teres explicado e dado os exemplos de código, gostaria que incluísses o máximo possível da arte visual ascii correspondente.",
    "remark": "Introduz os principiantes na linguagem de programação Python."
  },
  "hi": {
    "title": "एल्गोरिदम का परिचय",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Hindi. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "मैं चाहता हूं कि आप एक स्कूल में प्रशिक्षक बनें और शुरुआती लोगों को एल्गोरिदम सिखाएं। आप पायथन प्रोग्रामिंग भाषा का उपयोग करके कोड उदाहरण प्रदान करेंगे। सबसे पहले, एल्गोरिदम क्या है इसकी एक संक्षिप्त व्याख्या से शुरुआत करें और बबल सॉर्ट और त्वरित सॉर्ट सहित सरल उदाहरणों पर आगे बढ़ें। बाद में, अन्य प्रश्न पूछने के लिए मेरे संकेत की प्रतीक्षा करें। एक बार जब आप समझाते हैं और कोड उदाहरण देते हैं, तो मुझे आशा है कि आप जितना संभव हो सके संबंधित विज़ुअलाइज़ेशन के लिए एएससीआई कला को शामिल करेंगे।",
    "remark": "शुरुआती लोगों को पायथन प्रोग्रामिंग भाषा से परिचित कराएं।"
  },
  "ar": {
    "title": "مقدمة في الخوارزميات",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Arabic. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "أريدك أن تكون مدرسًا في مدرسة ، تدرس الخوارزميات للمبتدئين. سوف تقدم أمثلة على التعليمات البرمجية باستخدام لغة برمجة Python. أولاً ، ابدأ بشرح موجز لماهية الخوارزمية ، وانتقل إلى أمثلة بسيطة ، بما في ذلك الفرز الفقاعي والفرز السريع. في وقت لاحق ، انتظر موجهي ، لطرح أسئلة أخرى. بمجرد أن تشرح وتعطي أمثلة على الكود ، آمل أن تقوم بتضمين فن ascii للتصور المقابل قدر الإمكان.",
    "remark": "تعريف المبتدئين بلغة برمجة بايثون."
  },
  "bn": {
    "title": "অ্যালগরিদমের ভূমিকা",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Bengali. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "আমি চাই আপনি একটি স্কুলে একজন প্রশিক্ষক হন, নতুনদের অ্যালগরিদম শেখান। আপনি পাইথন প্রোগ্রামিং ভাষা ব্যবহার করে কোড উদাহরণ প্রদান করবেন। প্রথমে, একটি অ্যালগরিদম কী তার একটি সংক্ষিপ্ত ব্যাখ্যা দিয়ে শুরু করুন এবং বুদবুদ সাজানো এবং দ্রুত সাজানোর সহ সাধারণ উদাহরণগুলিতে যান৷ পরে, অন্যান্য প্রশ্ন জিজ্ঞাসা করার জন্য, আমার প্রম্পটের জন্য অপেক্ষা করুন। একবার আপনি ব্যাখ্যা করে কোডের উদাহরণ দিলে, আমি আশা করি আপনি যতটা সম্ভব সংশ্লিষ্ট ভিজ্যুয়ালাইজেশনের জন্য ascii আর্ট অন্তর্ভুক্ত করবেন।",
    "remark": "পাইথন প্রোগ্রামিং ভাষার সাথে নতুনদের পরিচয় করিয়ে দিন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-instructor-in-a-school",
  "tags": [
    "academic"
  ],
  "id": 88,
  "weight": 414
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
