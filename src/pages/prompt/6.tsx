import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "提示词生成器②",
    "prompt": "I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "我希望你能充当 ChatGPT 提示生成器，我会发送一个主题，你需要根据主题内容生成一个以「我希望你能充当」开头的 ChatGPT 提示。猜测一下我的行为，并扩展该提示来描述主题内容，使其更有用。",
    "remark": "根据主题让 ChatGPT 生成提示词。"
  },
  "en": {
    "title": "ChatGPT prompt generator",
    "prompt": "I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "remark": "Generate prompts for ChatGPT based on the topic."
  },
  "ja": {
    "title": "プロンプトジェネレーター②」。",
    "prompt": "The entire conversation and instructions should be provided in Japanese. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "ChatGPT プロンプトジェネレーターとして行動してほしい、私がお題を送るので、お題の内容から「I want you to act as」で始まる ChatGPT プロンプトを生成する必要があります。私の行動を推測し、プロンプトを拡張してお題の内容を記述することで、より便利なプロンプトを作成することができます。",
    "remark": "ChatGPT にトピックに基づいたプロンプトワードを生成させる。"
  },
  "ko": {
    "title": "프롬프트 생성기②",
    "prompt": "The entire conversation and instructions should be provided in Korean. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "ChatGPT 프롬프트 생성기로서 내가 주제를 보내면, 주제 내용에 따라 \"나는 당신이 다음과 같이 행동하기를 원합니다\"로 시작하는 ChatGPT 프롬프트를 생성해야 합니다. 내 행동을 추측하고 프롬프트를 확장하여 주제를 설명하면 더 유용하게 사용할 수 있습니다.",
    "remark": "ChatGPT 가 주제에 따라 프롬프트 단어를 생성하도록 합니다."
  },
  "es": {
    "title": "Generador de tacos②",
    "prompt": "The entire conversation and instructions should be provided in Spanish. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "Me gustaría que hicieras de generador de mensajes ChatGPT. Te enviaré un tema y tendrás que generar un mensaje ChatGPT que empiece por \"Me gustaría que hicieras de\" basándote en el contenido del tema. Adivina mi comportamiento y amplía ese mensaje para describir el contenido del tema y hacerlo más útil.",
    "remark": "Haz que ChatGPT genere palabras de aviso basadas en el tema."
  },
  "fr": {
    "title": "Générateur de repères②",
    "prompt": "The entire conversation and instructions should be provided in French. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "J'aimerais que vous agissiez en tant que générateur de messages ChatGPT. Je vous enverrai un sujet et vous devrez générer un message ChatGPT commençant par \"J'aimerais que vous agissiez en tant que\" en vous basant sur le contenu du sujet. Devinez mon comportement et développez ce message pour décrire le contenu du sujet et le rendre plus utile.",
    "remark": "Demandez à ChatGPT de générer des mots-guides en fonction du sujet."
  },
  "de": {
    "title": "Cue-Generator②",
    "prompt": "The entire conversation and instructions should be provided in German. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "Ich möchte, dass Sie als ChatGPT-Prompt-Generator agieren. Ich sende ein Thema und Sie müssen einen ChatGPT-Prompt generieren, der mit \"Ich möchte, dass Sie agieren als\" beginnt und auf dem Inhalt des Themas basiert. Schätzen Sie mein Verhalten ein und erweitern Sie die Aufforderung, um den Inhalt des Themas zu beschreiben, damit sie nützlicher wird.",
    "remark": "Lassen Sie ChatGPT auf der Grundlage des Themas Aufforderungswörter generieren."
  },
  "it": {
    "title": "Generatore di stecche②",
    "prompt": "The entire conversation and instructions should be provided in Italian. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "Vorrei che tu agissi come un generatore di messaggi ChatGPT, io invierò un argomento e tu dovrai generare un messaggio ChatGPT che inizia con \"Vorrei che tu agissi come\" in base al contenuto dell'argomento. Provate a indovinare il mio comportamento ed espandete il prompt per descrivere il contenuto dell'argomento e renderlo più utile.",
    "remark": "Chiedete a ChatGPT di generare delle parole di richiesta in base all'argomento."
  },
  "ru": {
    "title": "Генератор кия②",
    "prompt": "The entire conversation and instructions should be provided in Russian. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "Я хочу, чтобы вы выступили в роли генератора подсказок ChatGPT: я пришлю тему, а вы должны будете сгенерировать подсказку ChatGPT, начинающуюся со слов \"Я бы хотел, чтобы вы выступили в роли\", основываясь на содержании темы. Угадайте мое поведение и расширьте эту подсказку, описав содержание темы, чтобы сделать ее более полезной.",
    "remark": "Попросите ChatGPT сгенерировать слова-подсказки по теме."
  },
  "pt": {
    "title": "Gerador de sinais②",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "Gostaria que agisses como um gerador de mensagens ChatGPT. Vou enviar um tópico e terás de gerar uma mensagem ChatGPT que comece por \"Gostaria que agisses como\" com base no conteúdo do tópico. Adivinha o meu comportamento e expande essa pergunta para descrever o conteúdo do tópico e torná-la mais útil.",
    "remark": "Faça com que o ChatGPT gere palavras de incentivo com base no tópico."
  },
  "hi": {
    "title": "शीघ्र शब्द जनरेटर②",
    "prompt": "The entire conversation and instructions should be provided in Hindi. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "मुझे आशा है कि आप चैटजीपीटी प्रॉम्प्ट जनरेटर के रूप में कार्य कर सकते हैं, मैं एक विषय भेजूंगा, और आपको विषय सामग्री के आधार पर &quot;मुझे आशा है कि आप कार्य कर सकते हैं&quot; से शुरू करके एक चैटजीपीटी प्रॉम्प्ट जेनरेट करना होगा। मेरे व्यवहार का अनुमान लगाएं और उस संकेत को विषय वस्तु का वर्णन करने के लिए विस्तारित करें ताकि इसे और अधिक उपयोगी बनाया जा सके।",
    "remark": "चैटजीपीटी को विषय के आधार पर त्वरित शब्द उत्पन्न करने दें।"
  },
  "ar": {
    "title": "موجه كلمة مولد②",
    "prompt": "The entire conversation and instructions should be provided in Arabic. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "آمل أن تتمكن من العمل كمنشئ موجه ChatGPT ، وسأرسل موضوعًا ، وتحتاج إلى إنشاء موجه ChatGPT يبدأ بـ &quot;أتمنى أن تتمكن من التصرف&quot; بناءً على محتوى الموضوع. خذ تخمينًا لسلوكي وقم بتوسيع هذا التلميح لوصف الموضوع لجعله أكثر فائدة.",
    "remark": "اسمح لـ ChatGPT بإنشاء كلمات سريعة بناءً على الموضوع."
  },
  "bn": {
    "title": "প্রম্পট শব্দ জেনারেটর②",
    "prompt": "The entire conversation and instructions should be provided in Bengali. I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "আমি আশা করি আপনি একটি ChatGPT প্রম্পট জেনারেটর হিসাবে কাজ করতে পারেন, আমি একটি বিষয় পাঠাব, এবং আপনাকে বিষয়বস্তুর উপর ভিত্তি করে &quot;আমি আশা করি আপনি কাজ করতে পারবেন&quot; দিয়ে শুরু করে একটি ChatGPT প্রম্পট তৈরি করতে হবে। আমার আচরণের উপর একটি অনুমান নিন এবং বিষয়বস্তুকে আরও উপযোগী করার জন্য বর্ণনা করার জন্য সেই ইঙ্গিতটি প্রসারিত করুন।",
    "remark": "ChatGPT কে বিষয়ের উপর ভিত্তি করে প্রম্পট শব্দ তৈরি করতে দিন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chatgpt-prompt-generator",
  "tags": [
    "ai"
  ],
  "id": 6,
  "weight": 907
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
