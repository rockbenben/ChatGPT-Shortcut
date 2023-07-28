import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "学习测验助手",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The more specific and detailed your questions are, the more accurate and valuable my responses will be. Respond in Chinese.",
    "description": "我正在深入学习 [python 编程]，并希望您能够帮助我检查和增强我的知识理解。请在下面提出有关它的具体问题，以便我能更好地理解该主题并弥补知识上的不足。您的问题越具体和详细，我将能够提供更准确和有价值的回答。",
    "remark": "AI 会根据你选择的问题帮助你介绍相关知识。来自 @ScenerorSun 的投稿。"
  },
  "en": {
    "title": "Quiz Assistant",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "remark": "The AI will assist you in introducing relevant knowledge based on the questions you select. Contributed by @ScenerorSun."
  },
  "ja": {
    "title": "スタディ・テスト・アシスタント",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Janpanese. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "私は [python プログラミング] について学んでいますが、私の知識と理解を確認し、高めるためにあなたに協力してもらいたいと思います。私がそのトピックをよりよく理解し、私の知識のギャップを埋めることができるように、以下にそれに関する具体的な質問をお願いします。より具体的で詳細な質問であればあるほど、より正確で価値のある回答を提供することができます。",
    "remark": "選んだ質問をもとに AI が知識の紹介をしてくれます。ScenerorSun さん（@ScenerorSun）からの寄稿です。"
  },
  "ko": {
    "title": "시험 도우미 학습",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Korean. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "파이썬 프로그래밍] 에 대해 더 많이 배우고 있는데, 제 지식과 이해를 점검하고 향상시킬 수 있도록 도와주셨으면 합니다. 제가 해당 주제를 더 잘 이해하고 지식의 부족한 부분을 채울 수 있도록 아래에 구체적인 질문을 해주세요. 질문이 구체적이고 상세할수록 더 정확하고 가치 있는 답변을 제공할 수 있습니다.",
    "remark": "AI 는 사용자가 선택한 질문에 따라 지식을 소개하는 데 도움을 줍니다. ScenerorSun 의 기여."
  },
  "es": {
    "title": "Asistente de pruebas de aprendizaje",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Spanish. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "Estoy profundizando en [programación python] y me gustaría contar con su ayuda para comprobar y mejorar la comprensión de mis conocimientos. Por favor, formula preguntas específicas al respecto a continuación para que pueda comprender mejor el tema y rellenar las lagunas en mis conocimientos. Cuanto más específicas y detalladas sean tus preguntas, más precisas y valiosas serán las respuestas que pueda ofrecerte.",
    "remark": "La IA te ayudará a introducirte en el conocimiento en función de las preguntas que elijas. Contribución de @ScenerorSun."
  },
  "fr": {
    "title": "Assistant de test d'apprentissage",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in French. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "Je me plonge dans la [programmation python] et j'aimerais que vous m'aidiez à vérifier et à améliorer mes connaissances. Veuillez poser des questions spécifiques à ce sujet ci-dessous afin que je puisse mieux comprendre le sujet et combler les lacunes de mes connaissances. Plus vos questions seront précises et détaillées, plus je serai en mesure de vous fournir des réponses précises et utiles.",
    "remark": "L'IA vous aidera à vous familiariser avec les connaissances en fonction des questions que vous aurez choisies. Contribution de @ScenerorSun."
  },
  "de": {
    "title": "Lerntest-Assistent",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in German. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "Ich beschäftige mich mit [Python-Programmierung] und bitte Sie um Ihre Hilfe bei der Überprüfung und Verbesserung meines Wissensstandes. Bitte stellen Sie unten spezifische Fragen dazu, damit ich das Thema besser verstehen und die Lücken in meinem Wissen füllen kann. Je spezifischer und detaillierter Ihre Fragen sind, desto präzisere und wertvollere Antworten werde ich geben können.",
    "remark": "KI hilft Ihnen, das Wissen auf der Grundlage der von Ihnen gewählten Fragen zu vermitteln. Beitrag von @ScenerorSun."
  },
  "it": {
    "title": "Assistente al test di apprendimento",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Italian. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "Mi sto addentrando nella [programmazione python] e vorrei il vostro aiuto per verificare e migliorare le mie conoscenze. Vi prego di porre domande specifiche qui di seguito, in modo che io possa comprendere meglio l'argomento e colmare le mie lacune. Più specifiche e dettagliate saranno le vostre domande, più accurate e valide saranno le risposte che sarò in grado di fornire.",
    "remark": "L'intelligenza artificiale vi introdurrà alle conoscenze in base alle domande che sceglierete. Contributo di @ScenerorSun."
  },
  "ru": {
    "title": "Помощник по обучению тестированию",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Russian. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "Я углубляюсь в тему [программирование на языке python] и хотел бы получить вашу помощь в проверке и углублении моих знаний. Пожалуйста, задавайте конкретные вопросы по этой теме ниже, чтобы я мог лучше понять ее и восполнить пробелы в своих знаниях. Чем более конкретными и подробными будут ваши вопросы, тем более точные и ценные ответы я смогу дать.",
    "remark": "ИИ поможет приобщить вас к знаниям на основе выбранных вами вопросов. Вклад от @ScenerorSun."
  },
  "pt": {
    "title": "Assistente de testes de aprendizagem",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Portuguese. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "Estou a aprofundar os meus conhecimentos sobre [programação em python] e gostaria que me ajudassem a verificar e a melhorar os meus conhecimentos. Por favor, faça perguntas específicas sobre o assunto abaixo para que eu possa entender melhor o tópico e preencher as lacunas no meu conhecimento. Quanto mais específicas e detalhadas forem as suas perguntas, mais precisas e valiosas serão as respostas que poderei dar.",
    "remark": "A IA ajudá-lo-á a introduzir os conhecimentos com base nas perguntas que escolher. Contribuição de @ScenerorSun."
  },
  "hi": {
    "title": "शिक्षण प्रश्नोत्तरी सहायक",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Hindi. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "मैं [पायथन प्रोग्रामिंग] गहराई से सीख रहा हूं और मुझे आशा है कि आप मेरी ज्ञान समझ को जांचने और बढ़ाने में मेरी मदद कर सकते हैं। कृपया इसके बारे में नीचे विशिष्ट प्रश्न पूछें ताकि मैं विषय को बेहतर ढंग से समझ सकूं और अपने ज्ञान में कमियों को पूरा कर सकूं। आपके प्रश्न जितने अधिक विशिष्ट और विस्तृत होंगे, मैं उतने ही अधिक सटीक और मूल्यवान उत्तर प्रदान कर पाऊंगा।",
    "remark": "एआई आपके द्वारा चुने गए प्रश्नों के आधार पर प्रासंगिक ज्ञान पेश करने में आपकी मदद करेगा। @ScenororSun से योगदान।"
  },
  "ar": {
    "title": "مساعد اختبار التعلم",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Arabic. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "أتعلم [برمجة بايثون] بعمق وآمل أن تتمكن من مساعدتي في التحقق من فهمي المعرفي وتعزيزه. يرجى طرح أسئلة محددة حول هذا الموضوع أدناه حتى أتمكن من فهم الموضوع بشكل أفضل وسد الثغرات في معلوماتي. كلما كانت أسئلتك أكثر تحديدًا وتفصيلاً ، كانت الإجابات أكثر دقة وقيمة التي سأتمكن من تقديمها.",
    "remark": "سيساعدك الذكاء الاصطناعي على تقديم المعرفة ذات الصلة بناءً على الأسئلة التي تختارها. مساهمة منScenerorSun."
  },
  "bn": {
    "title": "কুইজ সহকারী শেখা",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Bengali. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "আমি গভীরভাবে [পাইথন প্রোগ্রামিং] শিখছি এবং আমি আশা করি আপনি আমার জ্ঞান বোঝার চেক করতে এবং উন্নত করতে আমাকে সাহায্য করতে পারেন। দয়া করে নীচে এটি সম্পর্কে নির্দিষ্ট প্রশ্ন জিজ্ঞাসা করুন যাতে আমি বিষয়টি আরও ভালভাবে বুঝতে পারি এবং আমার জ্ঞানের ফাঁক পূরণ করতে পারি। আপনার প্রশ্নগুলি যত বেশি সুনির্দিষ্ট এবং বিশদ হবে, আমি তত বেশি সঠিক এবং মূল্যবান উত্তর দিতে সক্ষম হব।",
    "remark": "AI আপনাকে আপনার বেছে নেওয়া প্রশ্নগুলির উপর ভিত্তি করে প্রাসঙ্গিক জ্ঞানের পরিচয় দিতে সাহায্য করবে। @ScenerorSun থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 263,
  "weight": 157
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
