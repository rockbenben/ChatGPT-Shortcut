import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "学习计划制定",
    "prompt": "I want to enhance my [目标技能] through a personalized 30-day learning plan. As an aspiring [初学者/进阶学习者] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. Respond in Chinese. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "我希望通过 30 天的定制学习计划来提升我的 [目标技能]。作为一个渴望不断进步的 [初学者/进阶学习者]，我希望你能帮我制定一个个性化的学习路线，以帮助我有效地掌握这项技能。在这个学习计划中，包括具体的学习目标、每日的学习任务、适用的学习资源以及评估进展的方式。请在下面的回答中提供详细的指导和建议，使我能够在这 30 天内取得最佳的学习效果。",
    "remark": "不仅适用于学习计划的制定，还可用于锻炼、阅读、工作等方面。来自 @ScenerorSun 的投稿。"
  },
  "en": {
    "title": "Action Plan",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. I aim to achieve optimal learning outcomes during these 30 days.",
    "remark": "Not only applicable to creating study plans but also useful for exercise, reading, work, and other areas. Contributed by @ScenerorSun."
  },
  "ja": {
    "title": "ラーニングプランの作成",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Janpanese. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "私は、30 日間のオーダーメイド学習プログラムを通じて、[対象スキル] を向上させたいと考えています。初級者/上級者] であり、常に向上心を持ち続けている私は、このスキルを効果的に習得するための個人的な学習ルートを開発する手助けをしてほしい。この学習計画には、具体的な学習目標、毎日の学習課題、適用可能な学習リソース、進捗状況の評価方法などを含めてください。この 30 日間で、私が最高の学習成果を得られるよう、以下の回答で詳細な指導と助言をお願いします。",
    "remark": "学習計画策定だけでなく、運動や読書、仕事などにも。ScenerorSun さん（@ScenerorSun）からの寄稿です。"
  },
  "ko": {
    "title": "학습 계획 개발",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Korean. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "30 일 맞춤형 학습 프로그램을 통해 [목표 스킬] 을 향상시키고 싶습니다. 계속 발전하기를 열망하는 [초급/고급 학습자] 로서, 이 기술을 효과적으로 습득하는 데 도움이 되는 맞춤형 학습 경로를 개발할 수 있도록 도와주시기 바랍니다. 이 학습 계획에는 구체적인 학습 목표, 일일 학습 과제, 적용 가능한 학습 리소스 및 진행 상황을 평가할 수 있는 방법을 포함하세요. 30 일 동안 최상의 학습 성과를 달성할 수 있도록 아래 답변에 자세한 지침과 조언을 제공해 주세요.",
    "remark": "학습 계획 수립뿐만 아니라 운동, 독서, 업무 등 다양한 용도로 사용할 수 있습니다. ScenerorSun 의 기고글입니다."
  },
  "es": {
    "title": "Desarrollo de programas de aprendizaje",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Spanish. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "Me gustaría mejorar mi [Habilidad objetivo] a través de un programa de aprendizaje personalizado de 30 días. Como [Principiante/Avanzado] con ganas de seguir mejorando, me gustaría que me ayudaran a desarrollar un itinerario de aprendizaje personalizado que me ayude a dominar esta destreza de forma eficaz. Incluya en este plan de aprendizaje objetivos de aprendizaje específicos, tareas de aprendizaje diarias, recursos de aprendizaje aplicables y formas de evaluar el progreso. Por favor, facilíteme en su respuesta orientaciones y sugerencias detalladas para que pueda alcanzar los mejores resultados de aprendizaje posibles en estos 30 días.",
    "remark": "No sólo para elaborar planes de estudio, sino también para hacer ejercicio, leer, trabajar y más. Contribución de @ScenerorSun."
  },
  "fr": {
    "title": "Développement de programmes d'apprentissage",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in French. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "Je souhaite améliorer ma [compétence cible] grâce à un programme d'apprentissage personnalisé de 30 jours. En tant que [apprenant débutant/avancé] désireux de continuer à s'améliorer, j'aimerais que vous m'aidiez à développer un parcours d'apprentissage personnalisé qui m'aidera à maîtriser cette compétence de manière efficace. Incluez dans ce plan d'apprentissage des objectifs d'apprentissage spécifiques, des tâches d'apprentissage quotidiennes, des ressources d'apprentissage applicables et des moyens d'évaluer les progrès. Veuillez fournir des conseils et des suggestions détaillés dans votre réponse ci-dessous afin que je puisse obtenir les meilleurs résultats d'apprentissage possibles au cours de ces 30 jours.",
    "remark": "Non seulement pour l'élaboration de plans d'études, mais aussi pour l'exercice, la lecture, le travail, etc. Contribution de @ScenerorSun."
  },
  "de": {
    "title": "Entwicklung von Lernprogrammen",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in German. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "Ich möchte meine [Zielfertigkeit] durch ein 30-tägiges individuelles Lernprogramm verbessern. Als [Anfänger/Fortgeschrittener], der sich ständig verbessern möchte, möchte ich, dass Sie mir helfen, einen individuellen Lernplan zu erstellen, der mir hilft, diese Fähigkeit effektiv zu beherrschen. Dieser Lernplan sollte spezifische Lernziele, tägliche Lernaufgaben, geeignete Lernressourcen und Möglichkeiten zur Bewertung der Fortschritte enthalten. Bitte geben Sie mir in Ihrer Antwort unten detaillierte Hinweise und Vorschläge, damit ich in diesen 30 Tagen die bestmöglichen Lernergebnisse erzielen kann.",
    "remark": "Nicht nur für die Erstellung von Studienplänen, sondern auch für Sport, Lesen, Arbeit und mehr. Beitrag von @ScenerorSun."
  },
  "it": {
    "title": "Sviluppo del programma di apprendimento",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Italian. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "Vorrei migliorare la mia [Abilità target] attraverso un programma di apprendimento personalizzato di 30 giorni. In quanto [studente principiante/avanzato] desideroso di continuare a migliorare, vorrei che mi aiutaste a sviluppare un percorso di apprendimento personalizzato che mi aiuti a padroneggiare efficacemente questa abilità. Includete in questo piano di apprendimento obiettivi specifici, compiti di apprendimento giornalieri, risorse di apprendimento applicabili e modi per valutare i progressi. Vi prego di fornire indicazioni e suggerimenti dettagliati nella vostra risposta qui sotto, in modo che io possa ottenere i migliori risultati di apprendimento possibili in questi 30 giorni.",
    "remark": "Non solo per lo sviluppo di piani di studio, ma anche per l'esercizio fisico, la lettura, il lavoro e altro ancora. Contributo di @ScenerorSun."
  },
  "ru": {
    "title": "Разработка учебных программ",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Russian. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "Я хотел бы улучшить свой [Целевой навык] с помощью 30-дневной индивидуальной программы обучения. Как [начинающий/продвинутый ученик], стремящийся к постоянному совершенствованию, я хотел бы, чтобы вы помогли мне разработать индивидуальный план обучения, который поможет мне эффективно овладеть этим навыком. Включите в этот план обучения конкретные цели обучения, ежедневные учебные задания, применимые учебные ресурсы и способы оценки прогресса. Пожалуйста, дайте подробные указания и предложения в своем ответе ниже, чтобы я смог достичь наилучших результатов обучения за эти 30 дней.",
    "remark": "Не только для составления учебного плана, но и для упражнений, чтения, работы и многого другого. Материал от @ScenerorSun."
  },
  "pt": {
    "title": "Desenvolvimento de programas de aprendizagem",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Portuguese. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "Gostaria de melhorar a minha [competência-alvo] através de um programa de aprendizagem personalizado de 30 dias. Como [Aprendiz principiante/avançado] que está ansioso por continuar a melhorar, gostaria que me ajudasse a desenvolver um percurso de aprendizagem personalizado que me ajudará a dominar esta competência de forma eficaz. Inclua neste plano de aprendizagem objectivos de aprendizagem específicos, tarefas de aprendizagem diárias, recursos de aprendizagem aplicáveis e formas de avaliar o progresso. Por favor, forneça orientações e sugestões detalhadas na sua resposta abaixo, para que eu possa alcançar os melhores resultados de aprendizagem possíveis nestes 30 dias.",
    "remark": "Não só para o desenvolvimento de planos de estudo, mas também para exercício, leitura, trabalho e muito mais. Contribuição de @ScenerorSun."
  },
  "hi": {
    "title": "अध्ययन योजना निर्माण",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Hindi. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "मैं 30-दिवसीय अनुकूलित अध्ययन योजना के साथ अपने [लक्ष्य कौशल] में सुधार करना चाहता हूं। एक [शुरुआती/उन्नत शिक्षार्थी] के रूप में जो सुधार जारी रखने के लिए उत्सुक है, मैं इस कौशल में प्रभावी ढंग से महारत हासिल करने में मेरी मदद करने के लिए एक व्यक्तिगत शिक्षण पथ विकसित करने में आपकी मदद चाहता हूं। इस अध्ययन योजना में, विशिष्ट शिक्षण उद्देश्य, दैनिक शिक्षण कार्य, लागू शिक्षण संसाधन और प्रगति का आकलन करने के तरीके शामिल करें। कृपया मुझे इन 30 दिनों के दौरान सर्वोत्तम संभव शिक्षण परिणाम प्राप्त करने में सक्षम बनाने के लिए नीचे दिए गए उत्तरों में विस्तृत मार्गदर्शन और सलाह प्रदान करें।",
    "remark": "यह न केवल अध्ययन योजनाओं के निर्माण के लिए उपयुक्त है, बल्कि इसका उपयोग व्यायाम, पढ़ने, काम आदि के लिए भी किया जा सकता है। @ScenororSun से योगदान।"
  },
  "ar": {
    "title": "صياغة خطة الدراسة",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Arabic. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "أرغب في تحسين [مهارتي المستهدفة] من خلال خطة دراسة مخصصة لمدة 30 يومًا. بصفتي [مبتدئًا / متعلمًا متقدمًا] حريصًا على مواصلة التحسين ، أود مساعدتك في تطوير مسار تعليمي مخصص لمساعدتي في إتقان هذه المهارة بشكل فعال. في خطة الدراسة هذه ، قم بتضمين أهداف تعليمية محددة ومهام التعلم اليومية ومصادر التعلم القابلة للتطبيق وطرق تقييم التقدم. يرجى تقديم إرشادات ونصائح مفصلة في الإجابات أدناه لتمكينني من تحقيق أفضل نتائج تعليمية ممكنة خلال هذه الأيام الثلاثين.",
    "remark": "إنها ليست مناسبة فقط لصياغة الخطط الدراسية ، ولكن يمكن استخدامها أيضًا للتمرين والقراءة والعمل وما إلى ذلك. مساهمة منScenerorSun."
  },
  "bn": {
    "title": "অধ্যয়ন পরিকল্পনা প্রণয়ন",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Bengali. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "আমি 30 দিনের কাস্টমাইজড অধ্যয়ন পরিকল্পনার মাধ্যমে আমার [লক্ষ্য দক্ষতা] উন্নত করতে চাই। একজন [শিশু/উন্নত শিক্ষার্থী] হিসেবে উন্নতি করতে আগ্রহী, আমি এই দক্ষতাটি কার্যকরভাবে আয়ত্ত করতে সাহায্য করার জন্য একটি ব্যক্তিগতকৃত শিক্ষার পথ তৈরিতে আপনার সাহায্য চাই। এই অধ্যয়ন পরিকল্পনায়, নির্দিষ্ট শেখার উদ্দেশ্য, দৈনিক শেখার কাজ, প্রযোজ্য শেখার সংস্থান এবং অগ্রগতি মূল্যায়ন করার উপায়গুলি অন্তর্ভুক্ত করুন। এই 30 দিনের মধ্যে শেখার সম্ভাব্য সর্বোত্তম ফলাফল অর্জন করতে আমাকে সক্ষম করতে দয়া করে নীচের উত্তরগুলিতে বিস্তারিত নির্দেশিকা এবং পরামর্শ দিন।",
    "remark": "এটি শুধুমাত্র অধ্যয়ন পরিকল্পনা প্রণয়নের জন্য উপযুক্ত নয়, ব্যায়াম, পড়া, কাজ ইত্যাদির জন্যও ব্যবহার করা যেতে পারে। @ScenerorSun থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 262,
  "weight": 352
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
