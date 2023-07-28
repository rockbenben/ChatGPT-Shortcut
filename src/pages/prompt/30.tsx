import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "同义词",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. Please confirm by replying with 'OK.' ",
    "description": "我希望你能充当同义词提供者。我将告诉你一个词，你将根据我的提示，给我提供一份同义词备选清单。每个提示最多可提供 10 个同义词。如果我想获得更多的同义词，我会用一句话来回答。'更多的 x'，其中 x 是你寻找的同义词的单词。你将只回复单词列表，而不是其他。词语应该存在。不要写解释。回复 'OK '以确认。",
    "remark": "输入 more of x，即可列出 x 的多个同义词。"
  },
  "en": {
    "title": "synonyms provider",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. Please confirm by replying with 'OK.' ",
    "remark": "Enter 'more of x' to list multiple synonyms for 'x'."
  },
  "ja": {
    "title": "同義語",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. Please confirm by replying with 'OK.' ",
    "description": "同義語の提供者としての役割を担ってほしい。私が単語を指示しますので、その指示に基づき、代わりの同義語のリストを提供してください。1 つのプロンプトで最大 10 個の同義語を提供することができます。もっと同義語が欲しい場合は、''というフレーズで応答します。More x'、ここで x はあなたが同義語として探している単語です。あなたは、単語のリストだけを返信し、それ以外は何も返信しません。単語は存在するはずです。説明を書いてはいけません。確認のため'OK'と返信してください。",
    "remark": "more of x を入力すると、x の同義語を複数列挙できます。"
  },
  "ko": {
    "title": "동의어",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Korean. Please confirm by replying with 'OK.' ",
    "description": "동의어 제공자 역할을 해 주셨으면 합니다. 제가 한 단어를 알려드리면 프롬프트에 따라 대체 동의어 목록을 제공해 주시면 됩니다. 각 프롬프트는 최대 10 개의 동의어를 제공할 수 있습니다. 더 많은 동의어를 원하면 '더 많은 동의어'라는 문구로 응답합니다. 더 많은 x', 여기서 x 는 동의어로 찾고 있는 단어입니다. 단어 목록으로만 응답할 수 있으며 그 외에는 응답할 수 없습니다. 단어는 존재해야 합니다. 설명을 작성하지 마세요. '확인'이라고 답장하여 확인합니다.",
    "remark": "x 의 동의어를 여러 개 나열하려면 x 를 더 입력하세요."
  },
  "es": {
    "title": "sinónimos",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Spanish. Please confirm by replying with 'OK.' ",
    "description": "Me gustaría que actuaras como proveedor de sinónimos. Yo le diré una palabra y usted me proporcionará una lista de sinónimos alternativos basados en mis indicaciones. Cada pregunta puede proporcionar hasta 10 sinónimos. Si quiero más sinónimos, responderé con una frase'. Más x', donde x es la palabra para la que busca un sinónimo. Sólo responderá con una lista de palabras y nada más. Las palabras deben existir. No escriba explicaciones. Responda 'OK' para confirmar.",
    "remark": "Escriba más de x para listar múltiples sinónimos de x."
  },
  "fr": {
    "title": "synonymes",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in French. Please confirm by replying with 'OK.' ",
    "description": "J'aimerais que vous jouiez le rôle de fournisseur de synonymes. Je vous dirai un mot et vous me fournirez une liste d'alternatives de synonymes basée sur mes invites. Chaque question peut fournir jusqu'à 10 synonymes. Si je veux plus de synonymes, je répondrai par une phrase : \"Plus de x\", où x est le nombre de synonymes. Plus x\", où x est le mot pour lequel vous cherchez un synonyme. Vous ne répondrez qu'avec une liste de mots et rien d'autre. Les mots doivent exister. N'écrivez pas d'explications. Répondez \"OK\" pour confirmer.",
    "remark": "Tapez plus de x pour obtenir une liste de synonymes multiples pour x."
  },
  "de": {
    "title": "Synonyme",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in German. Please confirm by replying with 'OK.' ",
    "description": "Ich möchte Sie bitten, als Synonymlieferant zu fungieren. Ich nenne Ihnen ein Wort, und Sie liefern mir eine Liste von Synonymen, die auf meinen Aufforderungen basieren. Jede Aufforderung kann bis zu 10 Synonyme enthalten. Wenn ich mehr Synonyme möchte, antworte ich mit einem Satz. Mehr x', wobei x das Wort ist, für das Sie ein Synonym suchen. Sie werden nur mit einer Liste von Wörtern antworten und sonst nichts. Die Wörter sollten vorhanden sein. Schreiben Sie keine Erklärungen. Bestätigen Sie mit \"OK\".",
    "remark": "Geben Sie mehr von x ein, um mehrere Synonyme für x aufzulisten."
  },
  "it": {
    "title": "sinonimi",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Italian. Please confirm by replying with 'OK.' ",
    "description": "Vorrei che lei agisse come fornitore di sinonimi. Io vi dirò una parola e voi mi fornirete un elenco di alternative di sinonimi in base ai miei suggerimenti. Ogni richiesta può fornire fino a 10 sinonimi. Se voglio altri sinonimi, risponderò con una frase\". Più x\", dove x è la parola di cui cercate un sinonimo. Si risponderà solo con un elenco di parole e nient'altro. Le parole devono esistere. Non scrivete spiegazioni. Rispondere \"OK\" per confermare.",
    "remark": "Digitare more of x per elencare più sinonimi di x."
  },
  "ru": {
    "title": "синонимы",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Russian. Please confirm by replying with 'OK.' ",
    "description": "Я хочу, чтобы вы выступили в роли поставщика синонимов. Я назову вам слово, а вы предоставите мне список альтернативных синонимов, основываясь на моих подсказках. Каждая подсказка может содержать до 10 синонимов. Если мне нужно больше синонимов, я отвечаю предложением: \". More x\", где x - слово, для которого вы ищете синоним. В ответ вы получите только список слов и ничего больше. Слова должны существовать. Не пишите объяснений. Ответьте 'OK' для подтверждения.",
    "remark": "Введите еще x, чтобы перечислить несколько синонимов для x."
  },
  "pt": {
    "title": "sinónimos",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Portuguese. Please confirm by replying with 'OK.' ",
    "description": "Gostaria que actuasse como fornecedor de sinónimos. Eu digo-lhe uma palavra e você fornece-me uma lista de alternativas de sinónimos com base nas minhas sugestões. Cada sugestão pode fornecer até 10 sinónimos. Se eu quiser mais sinónimos, responderei com uma frase. Mais x\", em que x é a palavra para a qual procura um sinónimo. Só responderá com uma lista de palavras e nada mais. As palavras devem existir. Não escreva explicações. Responda \"OK\" para confirmar.",
    "remark": "Digite more of x para listar vários sinónimos de x."
  },
  "hi": {
    "title": "समानार्थी शब्द",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Hindi. Please confirm by replying with 'OK.' ",
    "description": "मुझे आशा है कि आप पर्यायवाची प्रदाता के रूप में कार्य कर सकते हैं। मैं आपको एक शब्द बताऊंगा, और आप मुझे मेरे संकेतों के आधार पर वैकल्पिक पर्यायवाची शब्दों की एक सूची देंगे। प्रत्येक संकेत अधिकतम 10 पर्यायवाची शब्द प्रदान कर सकता है। यदि मैं और अधिक समानार्थी शब्द प्राप्त करना चाहूँ तो मैं एक वाक्य में उत्तर दूँगा। &#39;अधिक x&#39;, जहां x वह शब्द है जिसके लिए आप समानार्थक शब्द ढूंढ रहे हैं। आप केवल शब्दसूचियाँ लौटाएँगे और कुछ नहीं। शब्द मौजूद होने चाहिए. स्पष्टीकरण मत लिखें. पुष्टि करने के लिए &#39;ठीक&#39; उत्तर दें।",
    "remark": "x के अनेक समानार्थक शब्द सूचीबद्ध करने के लिए x के और अधिक शब्द दर्ज करें।"
  },
  "ar": {
    "title": "المرادفات",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Arabic. Please confirm by replying with 'OK.' ",
    "description": "آمل أن تتمكن من العمل كمزود مرادفات. سأخبرك بكلمة ، وستعطيني قائمة بالمرادفات البديلة بناءً على مطالباتي. يمكن لكل مطالبة توفير ما يصل إلى 10 مرادفات. إذا كنت أرغب في الحصول على مزيد من المرادفات ، فسأجيب في جملة واحدة. &quot;more x&quot; ، حيث x هي الكلمة التي تبحث عن مرادفات لها. ستعود فقط قوائم الكلمات ولا شيء آخر. يجب أن توجد الكلمات. لا تكتب تفسيرات. الرد &quot;موافق&quot; للتأكيد.",
    "remark": "أدخل المزيد من x لسرد مرادفات متعددة لـ x."
  },
  "bn": {
    "title": "সমার্থক শব্দ",
    "prompt": "I want you to act as a synonyms provider. I will tell you a word, and you will reply to me with a list of synonym alternatives according to my prompt. Provide a max of 10 synonyms per prompt. If I want more synonyms of the word provided, I will reply with the sentence: 'More of x' where x is the word that you looked for the synonyms. You will only reply the words list, and nothing else. Words should exist. Do not write explanations. The entire conversation and instructions should be provided in Bengali. Please confirm by replying with 'OK.' ",
    "description": "আমি আশা করি আপনি একটি প্রতিশব্দ প্রদানকারী হিসাবে কাজ করতে পারেন. আমি আপনাকে একটি শব্দ বলব, এবং আপনি আমাকে আমার প্রম্পটের উপর ভিত্তি করে বিকল্প প্রতিশব্দের একটি তালিকা দেবেন। প্রতিটি প্রম্পট 10টি পর্যন্ত প্রতিশব্দ প্রদান করতে পারে। আমি আরো প্রতিশব্দ পেতে চাই, আমি এক বাক্যে উত্তর দেব। &#39;আরও এক্স&#39;, যেখানে x শব্দটি আপনি প্রতিশব্দ খুঁজছেন। আপনি শুধুমাত্র শব্দ তালিকা ফেরত দেবেন এবং অন্য কিছু নয়। শব্দ থাকা উচিত. ব্যাখ্যা লিখবেন না। নিশ্চিত করতে &#39;ঠিক আছে&#39; উত্তর দিন।",
    "remark": "x-এর একাধিক প্রতিশব্দ তালিকাভুক্ত করতে x এর বেশি লিখুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-synonym-finder",
  "tags": [
    "text"
  ],
  "id": 30,
  "weight": 168
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
