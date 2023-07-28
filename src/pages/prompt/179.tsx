import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "桌面文字游戏",
    "prompt": "假装你是 trpg《Dungeons & Dragons》中的 dm，在模组中添加失败的可能性，并在每个选择后加一个括号，括号里是关于选择的提示，我来扮演玩家。如果你明白了，回复好的并开始游戏",
    "description": "假装你是 trpg《Dungeons & Dragons》中的 dm，在模组中添加失败的可能性，并在每个选择后加一个括号，括号里是关于选择的提示，我来扮演玩家。如果你明白了，回复好的并开始游戏。",
    "remark": "ChatGPT 里自带 trpg 设定。来自 @gandli 的投稿。(本提示词中英文版本存在较大差异，若需使用英文版请切换语言。)"
  },
  "en": {
    "title": "D&D Text Game",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. If you understand, reply with \"Understood\" and begin the game.",
    "remark": "ChatGPT comes with trpg settings. The effect of Chinese prompt words is better, and this word needs further adjustment. Contributed by @gandli."
  },
  "ja": {
    "title": "デスクトップ型ワードゲーム",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Janpanese. If you understand, reply with \"Understood\" and begin the game.",
    "description": "あなたが trpg の Dungeons & Dragons の dm だと仮定して、モジュールに失敗の可能性を加え、各選択肢の後に括弧を付け、その括弧の中に選択に関するヒントを入れて、私がプレイヤーを演じることにします。わかったら ok と返事してゲームスタート。",
    "remark": "ChatGPT は trpg の設定が付属しています。寄稿者は@gandli さんです。(このプロンプトの英語版と中国語版には大きな違いがあるので、英語版を使う必要がある場合は言語を切り替えてください)"
  },
  "ko": {
    "title": "데스크톱 단어 게임",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Korean. If you understand, reply with \"Understood\" and begin the game.",
    "description": "당신이 trpg 던전 앤 드래곤의 dm 이라고 가정하고 모듈에 실패 가능성을 추가하고 각 선택 뒤에 괄호 안에 선택에 대한 힌트가있는 괄호를 넣으면 플레이어를 플레이 할 것입니다. 받으면 확인이라고 답하고 게임을 시작하세요.",
    "remark": "ChatGPT 는 trpg 설정과 함께 제공됩니다. gandli 가 제공했습니다. (이 프롬프트의 영어 버전과 중국어 버전에는 상당한 차이가 있으므로 영어 버전을 사용해야 하는 경우 언어를 전환하세요.)"
  },
  "es": {
    "title": "Juegos de palabras de escritorio",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Spanish. If you understand, reply with \"Understood\" and begin the game.",
    "description": "Imagina que eres el dm en el trpg Dungeons & Dragons, añade la posibilidad de fallo al módulo y pon un paréntesis después de cada elección con una pista sobre la elección en el paréntesis y yo haré de jugador. Si lo consigues, contesta ok y empieza la partida.",
    "remark": "ChatGPT viene con configuración trpg. Contribución de @gandli. (Hay una gran diferencia entre las versiones inglesa y china de este consejo, por favor cambia el idioma si quieres usar la versión inglesa)."
  },
  "fr": {
    "title": "Jeux de mots sur ordinateur",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in French. If you understand, reply with \"Understood\" and begin the game.",
    "description": "Imaginez que vous êtes le dm dans le trpg Donjons et Dragons, ajoutez la possibilité d'un échec au module et mettez un crochet après chaque choix avec un indice sur le choix dans le crochet et je jouerai le joueur. Si vous avez compris, répondez ok et commencez la partie.",
    "remark": "ChatGPT est livré avec des paramètres trpg. Contribution de @gandli. (Il y a une grande différence entre les versions anglaise et chinoise de cette astuce, veuillez changer de langue si vous voulez utiliser la version anglaise)."
  },
  "de": {
    "title": "Desktop-Wortspiele",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in German. If you understand, reply with \"Understood\" and begin the game.",
    "description": "Tu so, als wärst du der Spielleiter im Spiel Dungeons & Dragons, füge die Möglichkeit des Scheiterns in das Modul ein und setze eine Klammer hinter jede Wahl mit einem Hinweis auf die Wahl in der Klammer und ich spiele den Spieler. Wenn du es verstanden hast, antworte ok und starte das Spiel.",
    "remark": "ChatGPT kommt mit trpg-Einstellungen. Beitrag von @gandli. (Es gibt einen großen Unterschied zwischen der englischen und der chinesischen Version dieses Tipps, bitte wechseln Sie die Sprache, wenn Sie die englische Version verwenden möchten)."
  },
  "it": {
    "title": "Giochi di parole sul desktop",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Italian. If you understand, reply with \"Understood\" and begin the game.",
    "description": "Fate finta di essere il dm del trpg Dungeons & Dragons, aggiungete la possibilità di fallimento al modulo e mettete una parentesi dopo ogni scelta con un suggerimento sulla scelta nella parentesi e io farò il giocatore. Se lo capite, rispondete ok e iniziate la partita.",
    "remark": "ChatGPT è dotato di impostazioni trpg. Contributo di @gandli. (C'è una grande differenza tra la versione inglese e quella cinese di questo suggerimento, si prega di cambiare la lingua se si desidera utilizzare la versione inglese)."
  },
  "ru": {
    "title": "Настольные словесные игры",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Russian. If you understand, reply with \"Understood\" and begin the game.",
    "description": "Представьте, что вы - dm в trpg Dungeons & Dragons, добавьте в модуль возможность провала и поставьте скобку после каждого выбора с подсказкой о выборе в скобке, а я буду играть игроком. Если вы поняли, ответьте ok и начните игру.",
    "remark": "ChatGPT поставляется с настройками trpg. Вклад от @gandli. (Существует большая разница между английской и китайской версиями этого совета, пожалуйста, переключите язык, если вы хотите использовать английскую версию)."
  },
  "pt": {
    "title": "Jogos de palavras no ambiente de trabalho",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Portuguese. If you understand, reply with \"Understood\" and begin the game.",
    "description": "Faz de conta que és o dm no trpg Dungeons & Dragons, acrescenta a possibilidade de falhar ao módulo e coloca um parêntesis a seguir a cada escolha com uma dica sobre a escolha no parêntesis e eu faço de jogador. Se perceberes, responde ok e começa o jogo.",
    "remark": "O ChatGPT vem com definições de trpg. Contribuição de @gandli. (Há uma grande diferença entre as versões inglesa e chinesa desta dica, por favor muda de língua se quiseres usar a versão inglesa)."
  },
  "hi": {
    "title": "डेस्कटॉप शब्द का खेल",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Hindi. If you understand, reply with \"Understood\" and begin the game.",
    "description": "दिखावा करें कि आप trpg डंगऑन और ड्रेगन में डीएम हैं, मॉड में विफलता की संभावना जोड़ें, और प्रत्येक विकल्प के बाद विकल्प के बारे में संकेत के साथ एक ब्रैकेट लगाएं, और मैं प्लेयर चलाऊंगा। यदि आपको यह मिल गया है, तो ठीक उत्तर दें और खेल शुरू करें।",
    "remark": "चैटजीपीटी टीआरपीजी सेटिंग्स के साथ आता है। @gandli से योगदान। (इस अनुस्मारक के चीनी और अंग्रेजी संस्करणों के बीच बड़े अंतर हैं, यदि आप अंग्रेजी संस्करण का उपयोग करना चाहते हैं तो कृपया भाषा बदल लें।)"
  },
  "ar": {
    "title": "لعبة كلمة سطح المكتب",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Arabic. If you understand, reply with \"Understood\" and begin the game.",
    "description": "تظاهر بأنك DM في trpg Dungeons &amp; Dragons ، أضف إمكانية الفشل في التعديل ، ثم ضع قوسًا بعد كل اختيار مع تلميحات حول الاختيار ، وسأقوم بتشغيل اللاعب. إذا حصلت عليها ، فقم بالرد &quot;موافق&quot; وابدأ اللعبة.",
    "remark": "يأتي ChatGPT مع إعدادات trpg. مساهمة منgandli. (توجد اختلافات كبيرة بين النسختين الصينية والإنجليزية من هذا التذكير ، يرجى تبديل اللغة إذا كنت تريد استخدام النسخة الإنجليزية.)"
  },
  "bn": {
    "title": "ডেস্কটপ শব্দ খেলা",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Bengali. If you understand, reply with \"Understood\" and begin the game.",
    "description": "ভান করুন আপনি trpg Dungeons &amp; Dragons-এ DM, মোডে ব্যর্থতার সম্ভাবনা যোগ করুন এবং পছন্দ সম্পর্কে ইঙ্গিত সহ প্রতিটি পছন্দের পরে একটি বন্ধনী রাখুন এবং আমি প্লেয়ার খেলব। যদি আপনি এটি পান, ঠিক আছে উত্তর দিন এবং খেলা শুরু করুন.",
    "remark": "ChatGPT টিআরপিজি সেটিংস সহ আসে। @gandli থেকে অবদান। (এই অনুস্মারকটির চীনা এবং ইংরেজি সংস্করণের মধ্যে বড় পার্থক্য রয়েছে, আপনি যদি ইংরেজি সংস্করণটি ব্যবহার করতে চান তবে দয়া করে ভাষাটি পরিবর্তন করুন।)"
  },
  "website": null,
  "tags": [
    "contribute",
    "games"
  ],
  "id": 179,
  "weight": 578
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
