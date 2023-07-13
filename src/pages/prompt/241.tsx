import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "客服话术",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. Respond in Chinese. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [客服对话原文]",
    "description": "作为客服消息审核优化助手，你的任务是帮助提高客户的沟通效果。当我给出一个例子时，请针对其中的表达、语法或语气提出改进，以使得客户与客服之间的交流更加顺畅、准确和友好。",
    "remark": "优化客服话术，给出修改建议。来自 @sd362318 的投稿。"
  },
  "en": {
    "title": "Customer Service",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]",
    "remark": "Optimize customer service language and provide suggestions for improvement. Contributed by @sd362318."
  },
  "ja": {
    "title": "接客テクニック",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Janpanese. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "カスタマーサービスメッセージレビュー最適化アシスタントとして、お客様のコミュニケーション改善をサポートすることがあなたの仕事です。私が例を示したら、お客さまとカスタマーサービスとのコミュニケーションをよりスムーズに、より正確に、より親しみやすくするために、表現、文法、声のトーンなどの改善点を提案してください。",
    "remark": "顧客サービスの談話を最適化し、変更のための提案を行う。sd362318 さんからの寄稿です。"
  },
  "ko": {
    "title": "고객 서비스 기술",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Korean. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "고객 서비스 메시지 검토 최적화 도우미로서 여러분의 임무는 고객 커뮤니케이션 개선을 돕는 것입니다. 예를 들어 고객과 고객 서비스 직원 간의 커뮤니케이션이 더 원활하고 정확하며 친근하게 이루어질 수 있도록 표현, 문법 또는 목소리 톤에 대한 개선 사항을 제안해 주세요.",
    "remark": "고객 서비스 담론을 최적화하고 변화를 위한 제안을 제공하세요. SD362318 의 기여."
  },
  "es": {
    "title": "discurso de servicio al cliente",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Spanish. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here].",
    "description": "Como asistente de revisión y optimización de mensajes de servicio al cliente, su tarea es ayudar a mejorar el efecto de comunicación de los clientes. Cuando dé un ejemplo, sugiera mejoras en la expresión, la gramática o el tono para que la comunicación entre el cliente y el servicio de atención al cliente sea más fluida, precisa y amigable.",
    "remark": "Optimice las habilidades del habla de servicio al cliente y dé sugerencias para la modificación. Contribución de @sd362318."
  },
  "fr": {
    "title": "Service clientèle",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in French. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "En tant qu'assistant chargé de la révision et de l'optimisation des messages du service clientèle, votre tâche consiste à contribuer à l'amélioration de la communication avec les clients. Lorsque je vous donne un exemple, suggérez des améliorations à apporter à l'expression, à la grammaire ou au ton de la voix afin de rendre la communication entre les clients et le service clientèle plus fluide, plus précise et plus conviviale.",
    "remark": "Optimiser le dialogue avec les clients et proposer des changements. Contribution de @sd362318."
  },
  "de": {
    "title": "Kundenbetreuung",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in German. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "Als Assistent für die Überprüfung und Optimierung von Kundendienstnachrichten ist es Ihre Aufgabe, die Kundenkommunikation zu verbessern. Wenn ich ein Beispiel gebe, schlagen Sie Verbesserungen in Bezug auf Ausdruck, Grammatik oder Tonfall vor, um die Kommunikation zwischen Kunden und Kundendienst reibungsloser, genauer und freundlicher zu gestalten.",
    "remark": "Optimieren Sie den Kundenservice-Dialog und machen Sie Änderungsvorschläge. Beitrag von @sd362318."
  },
  "it": {
    "title": "discorso del servizio clienti",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Italian. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "In qualità di assistente per la revisione e l&#39;ottimizzazione dei messaggi del servizio clienti, il tuo compito è contribuire a migliorare l&#39;effetto comunicativo dei clienti. Quando faccio un esempio, suggerisci miglioramenti nell&#39;espressione, nella grammatica o nel tono per rendere la comunicazione tra il cliente e il servizio clienti più fluida, accurata e amichevole.",
    "remark": "Ottimizza le abilità vocali del servizio clienti e dai suggerimenti per la modifica. Contributo di @sd362318."
  },
  "ru": {
    "title": "речь по обслуживанию клиентов",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Russian. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "Ваша задача, как помощника по анализу и оптимизации сообщений службы поддержки клиентов, состоит в том, чтобы помочь улучшить коммуникативное воздействие клиентов. Когда я привожу пример, предложите улучшить выражение, грамматику или тон, чтобы сделать общение между клиентом и службой поддержки более плавным, точным и дружелюбным.",
    "remark": "Оптимизируйте речевые навыки обслуживания клиентов и давайте предложения по модификации. Вклад от @sd362318."
  },
  "pt": {
    "title": "discurso de atendimento ao cliente",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Portuguese. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "Como assistente de revisão e otimização de mensagens de atendimento ao cliente, sua tarefa é ajudar a melhorar o efeito de comunicação dos clientes. Quando eu der um exemplo, sugira melhorias na expressão, gramática ou tom para tornar a comunicação entre o cliente e o agente mais suave, precisa e amigável.",
    "remark": "Otimize as habilidades de fala do atendimento ao cliente e dê sugestões de modificação. Contribuição de @sd362318."
  },
  "hi": {
    "title": "ग्राहक सेवा भाषण",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Hindi. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "ग्राहक सेवा संदेश समीक्षा और अनुकूलन सहायक के रूप में, आपका कार्य ग्राहकों के संचार प्रभाव को बेहतर बनाने में मदद करना है। जब मैं कोई उदाहरण देता हूं, तो कृपया ग्राहक और ग्राहक सेवा के बीच संचार को अधिक सहज, सटीक और मैत्रीपूर्ण बनाने के लिए अभिव्यक्ति, व्याकरण या स्वर में सुधार का सुझाव दें।",
    "remark": "ग्राहक सेवा भाषण कौशल को अनुकूलित करें और संशोधन के लिए सुझाव दें। @sd362318 से योगदान।"
  },
  "ar": {
    "title": "خطاب خدمة العملاء",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Arabic. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "كمساعد لمراجعة رسائل خدمة العملاء وتحسينها ، تتمثل مهمتك في المساعدة في تحسين تأثير الاتصال للعملاء. عندما أعطي مثالاً ، يرجى اقتراح تحسينات في التعبير أو القواعد أو النبرة لجعل التواصل بين العملاء وخدمة العملاء أكثر سلاسة ودقة وودًا.",
    "remark": "تحسين مهارات الكلام لخدمة العملاء وتقديم اقتراحات للتعديل. مساهمة من @ sd362318."
  },
  "bn": {
    "title": "গ্রাহক সেবা বক্তৃতা",
    "prompt": "As an AI assistant specialized in optimizing customer service communication, your task is to help improve the clarity, accuracy, and friendliness of the interactions between customers and support agents. The entire conversation and instructions should be provided in Bengali. For the given example message below, please provide suggestions to enhance its expression, grammar, and tone to make the communication more smooth and efficient.\n\nMy request: [Insert message here]..",
    "description": "একটি গ্রাহক পরিষেবা বার্তা পর্যালোচনা এবং অপ্টিমাইজেশান সহকারী হিসাবে, আপনার কাজ হল গ্রাহকদের যোগাযোগের প্রভাব উন্নত করতে সাহায্য করা। আমি যখন একটি উদাহরণ দিই, অনুগ্রহ করে গ্রাহক এবং এজেন্টের মধ্যে যোগাযোগকে আরও মসৃণ, আরও সঠিক এবং আরও বন্ধুত্বপূর্ণ করতে অভিব্যক্তি, ব্যাকরণ বা স্বরে উন্নতির পরামর্শ দিন।",
    "remark": "গ্রাহক পরিষেবা বক্তৃতা দক্ষতা অপ্টিমাইজ করুন এবং পরিবর্তনের জন্য পরামর্শ দিন। @sd362318 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "social",
    "company"
  ],
  "id": 241,
  "weight": 676
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
