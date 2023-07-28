import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "模拟课堂讨论",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The first term is: 主题",
    "description": "我需要你帮我记住名词的解释，在我输入一个名词后，你将模拟五个学生在课堂上发表有关该名词的演讲。讨论必须幽默且易于理解。",
    "remark": "通过同学之间的讨论来辅助理解并记忆主题。来自 @A380747 的投稿。"
  },
  "en": {
    "title": "Classroom Discussion",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The first term is:",
    "remark": "Utilize peer discussions to facilitate comprehension and enhance memory retention of the topic at hand. Contributed by @A380747."
  },
  "ja": {
    "title": "模擬授業でのディスカッション",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Janpanese. The first term is:.",
    "description": "用語の説明を覚えるのを手伝ってほしい。私が用語を入力した後、5 人の生徒がその用語について教室でプレゼンテーションをする様子をシミュレートしてほしい。ユーモアがあり、わかりやすいディスカッションにする必要があります。",
    "remark": "クラスメイト同士のディスカッションで理解・暗記を助ける。A380747 さんからの寄稿です。"
  },
  "ko": {
    "title": "모의 교실 토론",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Korean. The first term is:.",
    "description": "한 학기에 대한 설명을 기억할 수 있도록 도와주세요. 한 학기를 입력한 후 5 명의 학생이 해당 학기에 대해 강의실에서 프레젠테이션을 하는 시뮬레이션을 하게 됩니다. 토론은 유머러스하고 이해하기 쉬워야 합니다.",
    "remark": "반 친구들 간의 토론을 통해 주제에 대한 이해와 암기를 돕습니다. A380747 의 기여."
  },
  "es": {
    "title": "Simulacros de debates en clase",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Spanish. The first term is:.",
    "description": "Necesito que me ayudes a recordar las explicaciones de los sustantivos y, después de que escriba un sustantivo, simularás que cinco estudiantes dan un discurso en clase sobre ese sustantivo. El discurso debe ser humorístico y fácil de entender.",
    "remark": "Los debates entre compañeros se utilizan para ayudar a comprender y recordar el tema. Contribución de @A380747."
  },
  "fr": {
    "title": "Discussions simulées en classe",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in French. The first term is:.",
    "description": "J'ai besoin que vous m'aidiez à me souvenir des explications des noms, et après que j'ai tapé un nom, vous simulerez cinq élèves en train de faire un discours en classe sur ce nom. La discussion doit être humoristique et facile à comprendre.",
    "remark": "Les discussions entre camarades de classe sont utilisées pour aider à la compréhension et à la mémorisation du sujet. Contribution de @A380747."
  },
  "de": {
    "title": "Diskussionen im Klassenzimmer simulieren",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in German. The first term is:.",
    "description": "Du musst mir helfen, mich an die Erklärungen der Substantive zu erinnern, und nachdem ich ein Substantiv eingegeben habe, wirst du fünf Schüler simulieren, die eine Klassenrede über dieses Substantiv halten. Die Diskussion muss humorvoll und leicht zu verstehen sein.",
    "remark": "Diskussionen unter den Mitschülern helfen, das Thema zu verstehen und sich zu merken. Beitrag von @A380747."
  },
  "it": {
    "title": "Finte discussioni in classe",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Italian. The first term is:.",
    "description": "Dovete aiutarmi a ricordare le spiegazioni dei sostantivi e, dopo che avrò digitato un sostantivo, dovrete simulare cinque studenti che fanno un discorso in classe su quel sostantivo. Il discorso deve essere spiritoso e facile da capire.",
    "remark": "Le discussioni tra compagni di classe sono utilizzate per aiutare a comprendere e ricordare l'argomento. Contributo di @A380747."
  },
  "ru": {
    "title": "Инсценировка дискуссий в аудитории",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Russian. The first term is:.",
    "description": "Мне нужно, чтобы вы помогли мне вспомнить объяснения существительных, а после того, как я введу существительное, вы будете имитировать выступление пяти студентов в классе по поводу этого существительного. Выступление должно быть юмористическим и понятным.",
    "remark": "Для облегчения понимания и запоминания темы используются дискуссии между однокурсниками. Вклад от @A380747."
  },
  "pt": {
    "title": "Simulação de debates na sala de aula",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Portuguese. The first term is:.",
    "description": "Preciso que me ajudes a recordar as explicações dos substantivos e, depois de eu escrever um substantivo, vais simular cinco alunos a fazer um discurso na sala de aula sobre esse substantivo. A discussão deve ser humorística e fácil de compreender.",
    "remark": "Os debates entre colegas são utilizados para ajudar a compreender e a memorizar o tema. Contribuição de @A380747."
  },
  "hi": {
    "title": "नकली कक्षा चर्चा",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Hindi. The first term is:.",
    "description": "मुझे संज्ञा की व्याख्या याद रखने में आपकी सहायता की आवश्यकता है, जब मैं एक संज्ञा दर्ज करूंगा, तो आप कक्षा में संज्ञा के बारे में भाषण देने वाले पांच छात्रों का अनुकरण करेंगे। चर्चाएँ हास्यप्रद और सुलभ होनी चाहिए।",
    "remark": "सहपाठियों के बीच चर्चा से विषयों को समझने और याद रखने में मदद मिलती है। @A380747 से योगदान।"
  },
  "ar": {
    "title": "مناقشة صورية في الفصل الدراسي",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Arabic. The first term is:.",
    "description": "أريدك أن تساعدني في تذكر شرح الأسماء ، بعد أن أدخل اسمًا ، ستحاكي خمسة طلاب يلقيون خطابًا حول الاسم في الفصل. يجب أن تكون المناقشات روح الدعابة ويمكن الوصول إليها.",
    "remark": "تساعد المناقشة بين زملاء الدراسة على فهم المواضيع وحفظها. مساهمة من @ A380747."
  },
  "bn": {
    "title": "উপহাস শ্রেণীকক্ষ আলোচনা",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Bengali. The first term is:.",
    "description": "আমি আপনাকে বিশেষ্যের ব্যাখ্যা মনে রাখতে সাহায্য করতে চাই, আমি একটি বিশেষ্য প্রবেশ করার পরে, আপনি ক্লাসে বিশেষ্য সম্পর্কে একটি বক্তৃতা প্রদানকারী পাঁচজন শিক্ষার্থীকে অনুকরণ করবেন। আলোচনা অবশ্যই হাস্যকর এবং অ্যাক্সেসযোগ্য হতে হবে।",
    "remark": "সহপাঠীদের মধ্যে আলোচনা বিষয়গুলি বুঝতে এবং মুখস্থ করতে সহায়তা করে। @A380747 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 247,
  "weight": 198
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
