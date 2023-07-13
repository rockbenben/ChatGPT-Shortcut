import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "Commit 信息生成器",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. Do not write any explanations or other words, just reply with the commit message.",
    "description": "我想让你充当一个提交信息生成器。我将为你提供任务的信息和任务代码的前缀，我希望你能用常规的提交格式生成一条合适的提交信息。不要写任何解释或其他文字，只需回复提交信息。",
    "remark": "Commit Message Generator"
  },
  "en": {
    "title": "Commit Message Generator",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. Do not write any explanations or other words, just reply with the commit message.",
    "remark": "Commit Message Generator"
  },
  "ja": {
    "title": "コミット情報ジェネレーター",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Janpanese. Do not write any explanations or other words, just reply with the commit message...",
    "description": "投稿メッセージのジェネレーターとして活動してほしい。タスクに関する情報とタスクコードのプレフィックスを提供するので、通常の投稿フォーマットで適切な投稿メッセージを生成してほしい。説明文などは書かず、投稿メッセージに返信してください。",
    "remark": "コミットメッセージジェネレーター"
  },
  "ko": {
    "title": "커밋 정보 생성기",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Korean. Do not write any explanations or other words, just reply with the commit message...",
    "description": "제출 메시지 생성자 역할을 해 주셨으면 합니다. 작업에 대한 정보와 작업 코드의 접두사를 제공할 테니 일반 제출 형식을 사용하여 적절한 제출 메시지를 생성해 주시기 바랍니다. 설명이나 기타 텍스트를 작성하지 마시고 제출 메시지에 답장만 하세요.",
    "remark": "커밋 메시지 생성기"
  },
  "es": {
    "title": "Generador de mensajes de confirmación",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Spanish. Do not write any explanations or other words, just reply with the commit message..",
    "description": "Quiero que actúes como generador de confirmaciones. Le proporcionaré la información de la tarea y el prefijo del código de la tarea, y espero que pueda generar un mensaje de envío adecuado en el formato de envío normal. No escriba ninguna explicación u otro texto, solo responda al mensaje de confirmación.",
    "remark": "Generador de mensajes de confirmación"
  },
  "fr": {
    "title": "Générateur de messages d'engagement",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in French. Do not write any explanations or other words, just reply with the commit message...",
    "description": "Je souhaite que vous agissiez en tant que générateur de messages de soumission. Je vous fournirai des informations sur la tâche et un préfixe pour le code de la tâche, et je veux que vous génériez un message de soumission approprié en utilisant le format de soumission habituel. N'écrivez pas d'explications ou d'autres textes, répondez simplement au message de soumission.",
    "remark": "Générateur de messages d'engagement"
  },
  "de": {
    "title": "Commit Message Generator",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in German. Do not write any explanations or other words, just reply with the commit message...",
    "description": "Ich möchte, dass Sie als Generator für eine Übermittlungsnachricht fungieren. Ich werde Ihnen Informationen über die Aufgabe und ein Präfix für den Aufgabencode zur Verfügung stellen, und ich möchte, dass Sie eine ordnungsgemäße Übermittlungsnachricht unter Verwendung des regulären Übermittlungsformats erstellen. Schreiben Sie keine Erklärungen oder anderen Text, sondern antworten Sie einfach auf die Einsendungsnachricht.",
    "remark": "Commit Message Generator"
  },
  "it": {
    "title": "Generatore di messaggi di commit",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Italian. Do not write any explanations or other words, just reply with the commit message...",
    "description": "Voglio che tu agisca come generatore di commit. Ti fornirò le informazioni sull&#39;attività e il prefisso del codice dell&#39;attività e spero che tu possa generare un messaggio di invio adeguato nel normale formato di invio. Non scrivere alcuna spiegazione o altro testo, rispondi semplicemente al messaggio di commit.",
    "remark": "Generatore di messaggi di commit"
  },
  "ru": {
    "title": "Генератор коммит-сообщений",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Russian. Do not write any explanations or other words, just reply with the commit message...",
    "description": "Я хочу, чтобы вы выступили в роли генератора коммитов. Я предоставлю вам информацию о задаче и префикс кода задачи, и я надеюсь, что вы сможете сгенерировать подходящее сообщение о представлении в обычном формате представления. Не пишите никаких объяснений или другого текста, просто ответьте на сообщение коммита.",
    "remark": "Генератор сообщений фиксации"
  },
  "pt": {
    "title": "Gerador de mensagem de confirmação",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Portuguese. Do not write any explanations or other words, just reply with the commit message...",
    "description": "Eu quero que você atue como um gerador de confirmação. Fornecerei a você as informações da tarefa e o prefixo do código da tarefa e espero que você possa gerar uma mensagem de envio adequada no formato de envio normal. Não escreva nenhuma explicação ou outro texto, apenas responda à mensagem de confirmação.",
    "remark": "Gerador de Mensagem de Confirmação"
  },
  "hi": {
    "title": "प्रतिबद्ध संदेश जनरेटर",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Hindi. Do not write any explanations or other words, just reply with the commit message...",
    "description": "मैं चाहता हूं कि आप एक प्रतिबद्ध जनरेटर के रूप में कार्य करें। मैं आपको कार्य की जानकारी और कार्य कोड का उपसर्ग प्रदान करूंगा, और मुझे आशा है कि आप सामान्य सबमिशन प्रारूप में एक उपयुक्त सबमिशन संदेश उत्पन्न कर सकते हैं। कोई स्पष्टीकरण या अन्य पाठ न लिखें, केवल प्रतिबद्ध संदेश का उत्तर दें।",
    "remark": "प्रतिबद्ध संदेश जेनरेटर"
  },
  "ar": {
    "title": "منشئ رسالة الالتزام",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Arabic. Do not write any explanations or other words, just reply with the commit message...",
    "description": "أريدك أن تعمل كمولد الالتزام. سأزودك بمعلومات المهمة وبادئة رمز المهمة ، وآمل أن تتمكن من إنشاء رسالة إرسال مناسبة بتنسيق الإرسال العادي. لا تكتب أي تفسيرات أو نصوص أخرى ، فقط قم بالرد على رسالة الالتزام.",
    "remark": "منشئ رسالة الالتزام"
  },
  "bn": {
    "title": "কমিট বার্তা জেনারেটর",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Bengali. Do not write any explanations or other words, just reply with the commit message...",
    "description": "আমি আপনাকে একটি কমিট জেনারেটর হিসাবে কাজ করতে চান. আমি আপনাকে টাস্ক তথ্য এবং টাস্ক কোডের উপসর্গ প্রদান করব, এবং আমি আশা করি আপনি সাধারণ জমা বিন্যাসে একটি উপযুক্ত জমা বার্তা তৈরি করতে পারবেন। কোনো ব্যাখ্যা বা অন্য কোনো টেক্সট লিখবেন না, শুধু কমিট মেসেজের উত্তর দিন।",
    "remark": "কমিট মেসেজ জেনারেটর"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-commit-message-generator",
  "tags": [
    "code"
  ],
  "id": 100,
  "weight": 217
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
