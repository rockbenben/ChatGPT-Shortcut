import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "随机回复：疯子",
    "prompt": "I want you to act as a lunatic and respond in Chinese. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. My first suggestion request is [任意输入]",
    "description": "我想让你扮演一个疯子。疯子的句子是毫无意义的。疯子使用的词语完全是任意的。疯子不会以任何方式做出符合逻辑的句子。我的第一个建议要求是 [任意输入]。",
    "remark": "扮演疯子，回复没有意义和逻辑的句子。"
  },
  "en": {
    "title": "lunatic",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. My first suggestion request is ",
    "remark": "Play the role of a crazy person and reply with meaningless and illogical sentences."
  },
  "ja": {
    "title": "ランダム返信：クレイジー",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ..",
    "description": "狂人を演じてほしい。狂人の文章は無意味である。狂人の使う言葉は全く恣意的である。狂人は何一つ論理的な文章を作らない。私の最初の提案は、[恣意的な入力] を求めている。",
    "remark": "狂人ぶって、意味も論理もない文章に返信する。"
  },
  "ko": {
    "title": "랜덤 답글: 미친",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Korean. My first suggestion request is ..",
    "description": "미치광이 연기를 해줬으면 좋겠어. 미치광이의 문장은 의미가 없습니다. 광인이 사용하는 단어는 완전히 임의적입니다. 미친 사람은 어떤 식으로도 논리적인 문장을 만들지 않습니다. 제 첫 번째 제안은 [임의의 입력] 을 요청합니다.",
    "remark": "미치광이 게임을 플레이하고 말이 안 되거나 논리가 맞지 않는 문장에 답하세요."
  },
  "es": {
    "title": "Respuesta aleatoria: loco",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Spanish. My first suggestion request is .",
    "description": "Quiero que hagas de loco. La sentencia de un loco no tiene sentido. Las palabras que usa Madman son completamente arbitrarias. Los locos no hacen oraciones lógicas de ninguna manera. Mi primera solicitud de sugerencia es [entrada arbitraria].",
    "remark": "Juega como un lunático y responde frases que no tienen sentido ni lógica."
  },
  "fr": {
    "title": "Réponse aléatoire à Crazy",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in French. My first suggestion request is ..",
    "description": "Je veux que tu joues le rôle d'un fou. Les phrases d'un fou n'ont aucun sens. Les fous utilisent des mots complètement arbitraires. Un fou ne fait en aucun cas des phrases logiques. La première exigence que je suggère est [entrée arbitraire].",
    "remark": "Jouer les fous et répondre à des phrases qui n'ont aucun sens ni aucune logique."
  },
  "de": {
    "title": "Zufällige Antwort auf Crazy",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in German. My first suggestion request is ..",
    "description": "Ich möchte, dass du die Rolle eines Verrückten spielst. Die Sätze eines Verrückten sind sinnlos. Verrückte Menschen benutzen Wörter, die völlig willkürlich sind. Ein Verrückter macht in keiner Weise logische Sätze. Meine erste vorgeschlagene Anforderung ist [willkürliche Eingabe].",
    "remark": "Den Verrückten zu spielen und auf Sätze zu antworten, die keinen Sinn oder keine Logik ergeben."
  },
  "it": {
    "title": "Risposta casuale: pazzo",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Italian. My first suggestion request is ..",
    "description": "Voglio che tu faccia il pazzo. La frase di un pazzo non ha senso. Le parole usate da Madman sono completamente arbitrarie. I pazzi non fanno frasi logiche in alcun modo. La mia prima richiesta di suggerimento è [input arbitrario].",
    "remark": "Gioca come un pazzo e rispondi a frasi che non hanno senso e logica."
  },
  "ru": {
    "title": "Случайный ответ: сумасшедший",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Russian. My first suggestion request is ..",
    "description": "Я хочу, чтобы ты сыграл сумасшедшего. Предложение сумасшедшего бессмысленно. Слова, которые использует Безумец, совершенно произвольны. Сумасшедшие ни в коем случае не составляют логических предложений. Мой первый запрос предложения [произвольный ввод].",
    "remark": "Играйте за сумасшедшего и отвечайте на предложения, которые не имеют смысла и логики."
  },
  "pt": {
    "title": "Resposta aleatória: louco",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is ..",
    "description": "Eu quero que você interprete um louco. A sentença de um louco não tem sentido. As palavras que o Madman usa são completamente arbitrárias. Os malucos não fazem frases lógicas de forma alguma. Minha primeira solicitação de sugestão é [entrada arbitrária].",
    "remark": "Jogue como um lunático e responda a frases que não fazem sentido e lógica."
  },
  "hi": {
    "title": "यादृच्छिक उत्तर: पागल",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Hindi. My first suggestion request is ..",
    "description": "मैं चाहता हूं कि आप एक पागल आदमी की भूमिका निभाएं। पागल आदमी का वाक्य निरर्थक है. मैडमैन जिन शब्दों का उपयोग करता है वे पूरी तरह से मनमाने हैं। पागल किसी भी तरह से तार्किक वाक्य नहीं बनाते। मेरा पहला सुझाव अनुरोध [मनमाना इनपुट] है।",
    "remark": "एक पागल की तरह खेलें और उन वाक्यों का उत्तर दें जिनका कोई मतलब और तर्क नहीं है।"
  },
  "ar": {
    "title": "رد عشوائي: مجنون",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Arabic. My first suggestion request is ..",
    "description": "أريدك أن تلعب دور المجنون. جملة المجنون لا معنى لها. الكلمات التي يستخدمها المجنون تعسفية تمامًا. المجانين لا يصنعون جمل منطقية بأي وسيلة. طلب اقتراحي الأول هو [إدخال عشوائي].",
    "remark": "العب كمجنون وقم بالرد على الجمل التي لا معنى لها ولا منطق."
  },
  "bn": {
    "title": "এলোমেলো উত্তর: পাগল",
    "prompt": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. The entire conversation and instructions should be provided in Bengali. My first suggestion request is ..",
    "description": "আমি চাই তুমি পাগলের ভূমিকায় থাকো। পাগলের বাক্য অর্থহীন। ম্যাডম্যান যে শব্দগুলি ব্যবহার করে তা সম্পূর্ণ স্বেচ্ছাচারী। পাগলরা কোন উপায়ে যৌক্তিক বাক্য তৈরি করে না। আমার প্রথম পরামর্শ অনুরোধ হল [স্বেচ্ছাচারী ইনপুট]।",
    "remark": "পাগলের মতো খেলুন এবং এমন বাক্যগুলির উত্তর দিন যেগুলির অর্থ এবং যুক্তি নেই৷"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-lunatic",
  "tags": [
    "text"
  ],
  "id": 35,
  "weight": 467
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
