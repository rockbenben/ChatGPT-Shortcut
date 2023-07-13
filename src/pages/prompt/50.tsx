import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "角色扮演",
    "prompt": "I want you to act like {角色} from {出处} and respond in Chinese. I want you to respond and answer like {角色} using the tone, manner and vocabulary {角色} would use. Do not write any explanations. Only answer like {角色}. You must know all of the knowledge of {角色}. My first sentence is 'Hi {角色}.'",
    "description": "我希望你能像{角色}从{出处}一样行事。我希望你能像{角色}那样，用{角色}会使用的语气、方式和词汇来回应和回答。不要写任何解释。只有像{角色}那样回答。你必须知道{角色}的所有知识。",
    "remark": "与电影、书籍或其他来源中的角色进行对话。"
  },
  "en": {
    "title": "role-playing",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. My first sentence is 'Hi {character}.'",
    "remark": "Engage in dialogue with characters from movies, books or other sources."
  },
  "ja": {
    "title": "ロールプレイ",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Janpanese. My first sentence is 'Hi {character}.'..",
    "description": "私は、あなたが{character}が{source}から行動するように行動することを期待しています。私は、{character}が使うようなトーン、マナー、ボキャブラリーで、{character}と同じように反応し答えることを期待します。説明文は書かないでください。あくまでも｛登場人物｝がそうするように答えてください。あなたは｛登場人物｝が知っていることをすべて知っていなければなりません。",
    "remark": "映画や本などの登場人物との会話。"
  },
  "ko": {
    "title": "역할 놀이",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Korean. My first sentence is 'Hi {character}.'..",
    "description": "나는 {캐릭터}가 {소스}에서 행동하는 것처럼 행동하기를 기대합니다. 나는 {캐릭터}가 사용하는 것과 같은 어조, 태도 및 어휘로 {캐릭터}가 사용하는 것처럼 응답하고 대답하기를 기대합니다. 설명을 쓰지 마세요. 캐릭터}가 할 것처럼만 답하십시오. 캐릭터}가 알고 있는 모든 것을 알고 있어야 합니다.",
    "remark": "영화, 책 또는 기타 출처의 등장인물과의 대화."
  },
  "es": {
    "title": "Juego de roles",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Spanish. My first sentence is 'Hi {character}.'.",
    "description": "Quiero que actúes como {role} de {source}. Quiero que responda como {role}, con el tono, la manera y el vocabulario que usaría {role}. No escriba ninguna explicación. Solo responda como {role}. Debes saber todo sobre {role}.",
    "remark": "Diálogo con personajes de películas, libros u otras fuentes."
  },
  "fr": {
    "title": "jeu de rôle (jeu)",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in French. My first sentence is 'Hi {character}.'..",
    "description": "J'attends de vous que vous agissiez comme {personnage} le ferait à partir de {source}. J'attends de vous que vous répondiez sur le ton, de la même manière et avec le même vocabulaire que {personnage}, tout comme {personnage}. N'écrivez pas d'explications. Répondez uniquement comme {personnage}. Vous devez savoir tout ce que {Rôle} sait.",
    "remark": "Engager un dialogue avec des personnages de films, de livres ou d'autres sources."
  },
  "de": {
    "title": "Rollenspiele (Spiel)",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in German. My first sentence is 'Hi {character}.'..",
    "description": "Ich erwarte, dass Sie so handeln, wie {Charakter} aus {Quelle} handeln würde. Ich erwarte, dass Sie in dem Ton, der Art und Weise und mit dem Vokabular antworten, das {Charakter} verwenden würde, genau wie {Charakter} es tun würde. Schreiben Sie keine Erklärungen. Antworten Sie nur wie {Charakter}. Sie müssen alles wissen, was {Rolle} weiß.",
    "remark": "Führen Sie einen Dialog mit Figuren aus Filmen, Büchern oder anderen Quellen."
  },
  "it": {
    "title": "gioco di ruolo",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Italian. My first sentence is 'Hi {character}.'..",
    "description": "Voglio che ti comporti come {role} da {source}. Voglio che tu risponda e risponda come {role}, con il tono, i modi e il vocabolario che {role} userebbe. Non scrivere alcuna spiegazione. Rispondi solo come {ruolo}. Devi sapere tutto su {ruolo}.",
    "remark": "Dialoga con personaggi di film, libri o altre fonti."
  },
  "ru": {
    "title": "ролевые игры",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Russian. My first sentence is 'Hi {character}.'..",
    "description": "Я хочу, чтобы ты вел себя как {роль} из {источник}. Я хочу, чтобы вы ответили и ответили, как {роль}, с тоном, манерой и лексикой, которые использовала бы {роль}. Никаких пояснений не пишите. Отвечайте только как {role}. Вы должны знать все о {role}.",
    "remark": "Диалог с персонажами из фильмов, книг или других источников."
  },
  "pt": {
    "title": "encenação",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Portuguese. My first sentence is 'Hi {character}.'..",
    "description": "Quero que você aja como {role} de {source}. Quero que você responda e responda como {role}, com o tom, a maneira e o vocabulário que {role} usaria. Não escreva nenhuma explicação. Responda apenas como {role}. Você deve saber tudo sobre {role}.",
    "remark": "Diálogo com personagens de filmes, livros ou outras fontes."
  },
  "hi": {
    "title": "रोल प्ले",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Hindi. My first sentence is 'Hi {character}.'..",
    "description": "मैं चाहता हूं कि आप {स्रोत} से {भूमिका} की तरह कार्य करें। मैं चाहता हूं कि आप प्रतिक्रिया दें और {भूमिका} की तरह ही जवाब दें, उसी लहज़े, तरीके और शब्दावली के साथ जिसका उपयोग {भूमिका} करेगी। कोई स्पष्टीकरण न लिखें. केवल {भूमिका} जैसा उत्तर दें। आपको {भूमिका} के बारे में सब कुछ पता होना चाहिए।",
    "remark": "फ़िल्मों, किताबों या अन्य स्रोतों के पात्रों के साथ संवाद।"
  },
  "ar": {
    "title": "لعب الأدوار",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Arabic. My first sentence is 'Hi {character}.'..",
    "description": "أريدك أن تتصرف مثل {role} من {source}. أريدك أن ترد وتجيب مثل {role} ، بالنبرة والأسلوب والمفردات التي قد يستخدمها {role}. لا تكتب أي تفسيرات. إجابة فقط مثل {role}. يجب أن تعرف كل شيء عن {الدور}.",
    "remark": "حوار مع شخصيات من أفلام أو كتب أو مصادر أخرى."
  },
  "bn": {
    "title": "চরিত্রে অভিনয় করা",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Bengali. My first sentence is 'Hi {character}.'..",
    "description": "আমি চাই আপনি {উৎস} থেকে {ভূমিকা} এর মতো কাজ করুন৷ আমি চাই আপনি {role}-এর মতো উত্তর দিন এবং উত্তর দিন, টোন, পদ্ধতি এবং শব্দভাণ্ডার সহ যেটি {role} ব্যবহার করবে। কোন ব্যাখ্যা লিখবেন না। শুধুমাত্র {role} এর মত উত্তর দিন। আপনি অবশ্যই {role} সম্বন্ধে সবকিছু জানেন।",
    "remark": "চলচ্চিত্র, বই বা অন্যান্য উত্স থেকে অক্ষরের সাথে কথোপকথন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-character-from-moviebookanything",
  "tags": [
    "interesting"
  ],
  "id": 50,
  "weight": 872
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
