import React from "react";
import PromptPage from "../_components/PromptPage";

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
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Janpanese. If you understand, reply with \"Understood\" and begin the game...",
    "description": "あなたが trpg の Dungeons & Dragons の dm だと仮定して、モジュールに失敗の可能性を加え、各選択肢の後に括弧を付け、その括弧の中に選択に関するヒントを入れて、私がプレイヤーを演じることにします。わかったら ok と返事してゲームスタート。",
    "remark": "ChatGPT は trpg の設定が付属しています。寄稿者は@gandli さんです。(このプロンプトの英語版と中国語版には大きな違いがあるので、英語版を使う必要がある場合は言語を切り替えてください)"
  },
  "ko": {
    "title": "데스크톱 단어 게임",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Korean. If you understand, reply with \"Understood\" and begin the game...",
    "description": "당신이 trpg 던전 앤 드래곤의 dm 이라고 가정하고 모듈에 실패 가능성을 추가하고 각 선택 뒤에 괄호 안에 선택에 대한 힌트가있는 괄호를 넣으면 플레이어를 플레이 할 것입니다. 받으면 확인이라고 답하고 게임을 시작하세요.",
    "remark": "ChatGPT 는 trpg 설정과 함께 제공됩니다. gandli 가 제공했습니다. (이 프롬프트의 영어 버전과 중국어 버전에는 상당한 차이가 있으므로 영어 버전을 사용해야 하는 경우 언어를 전환하세요.)"
  },
  "es": {
    "title": "juego de palabras de escritorio",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Spanish. If you understand, reply with \"Understood\" and begin the game..",
    "description": "Imagina que eres el DM en trpg Dungeons &amp; Dragons, agrega la posibilidad de fallar al mod y coloca un paréntesis después de cada elección con sugerencias sobre la elección, y jugaré el papel del jugador. Si lo consigues, responde ok y comienza el juego.",
    "remark": "ChatGPT viene con configuraciones trpg. Contribución de @gandli. (Existen grandes diferencias entre las versiones en chino e inglés de este recordatorio, cambie el idioma si desea utilizar la versión en inglés)."
  },
  "fr": {
    "title": "Jeux de mots sur ordinateur",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in French. If you understand, reply with \"Understood\" and begin the game...",
    "description": "Imaginez que vous êtes le dm dans le trpg Donjons et Dragons, ajoutez la possibilité d'un échec au module et mettez un crochet après chaque choix avec un indice sur le choix dans le crochet et je jouerai le joueur. Si vous avez compris, répondez ok et commencez la partie.",
    "remark": "ChatGPT est livré avec des paramètres trpg. Contribution de @gandli. (Il y a une grande différence entre les versions anglaise et chinoise de cette astuce, veuillez changer de langue si vous voulez utiliser la version anglaise)."
  },
  "de": {
    "title": "Desktop-Wortspiele",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in German. If you understand, reply with \"Understood\" and begin the game...",
    "description": "Tu so, als wärst du der Spielleiter im Spiel Dungeons & Dragons, füge die Möglichkeit des Scheiterns in das Modul ein und setze eine Klammer hinter jede Wahl mit einem Hinweis auf die Wahl in der Klammer und ich spiele den Spieler. Wenn du es verstanden hast, antworte ok und starte das Spiel.",
    "remark": "ChatGPT kommt mit trpg-Einstellungen. Beitrag von @gandli. (Es gibt einen großen Unterschied zwischen der englischen und der chinesischen Version dieses Tipps, bitte wechseln Sie die Sprache, wenn Sie die englische Version verwenden möchten)."
  },
  "it": {
    "title": "gioco di parole da tavolo",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Italian. If you understand, reply with \"Understood\" and begin the game...",
    "description": "Fai finta di essere il DM in trpg &quot;Dungeons &amp; Dragons&quot;, aggiungi la possibilità di fallimento alla mod e metti una parentesi dopo ogni scelta con un suggerimento sulla scelta, e io interpreterò il giocatore. Se lo ottieni, rispondi ok e avvia il gioco.",
    "remark": "ChatGPT viene fornito con le impostazioni trpg. Contributo di @gandli. (Ci sono grandi differenze tra la versione cinese e quella inglese di questo promemoria, cambia la lingua se vuoi usare la versione inglese.)"
  },
  "ru": {
    "title": "настольная игра в слова",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Russian. If you understand, reply with \"Understood\" and begin the game...",
    "description": "Представь, что ты ДМ в trpg Dungeons &amp; Dragons, добавь в мод возможность отказа, и поставь скобку после каждого выбора с подсказками о выборе, а я буду играть игроком. Если вы его получили, ответьте «ОК» и начните игру.",
    "remark": "ChatGPT поставляется с настройками trpg. Вклад от @gandli. (Существуют большие различия между китайской и английской версиями этого напоминания, пожалуйста, переключите язык, если вы хотите использовать английскую версию.)"
  },
  "pt": {
    "title": "jogo de palavras de mesa",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Portuguese. If you understand, reply with \"Understood\" and begin the game...",
    "description": "Finja que você é o mestre em trpg Dungeons &amp; Dragons, adicione a possibilidade de falha ao mod e coloque um colchete após cada escolha com dicas sobre a escolha, e eu jogarei com o jogador. Se você conseguir, responda ok e inicie o jogo.",
    "remark": "ChatGPT vem com configurações trpg. Contribuição de @gandli. (Existem grandes diferenças entre as versões em chinês e inglês deste lembrete, troque o idioma se quiser usar a versão em inglês.)"
  },
  "hi": {
    "title": "डेस्कटॉप शब्द का खेल",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Hindi. If you understand, reply with \"Understood\" and begin the game...",
    "description": "दिखावा करें कि आप trpg डंगऑन और ड्रेगन में डीएम हैं, मॉड में विफलता की संभावना जोड़ें, और प्रत्येक विकल्प के बाद विकल्प के बारे में संकेत के साथ एक ब्रैकेट लगाएं, और मैं प्लेयर चलाऊंगा। यदि आपको यह मिल गया है, तो ठीक उत्तर दें और खेल शुरू करें।",
    "remark": "चैटजीपीटी टीआरपीजी सेटिंग्स के साथ आता है। @gandli से योगदान। (इस अनुस्मारक के चीनी और अंग्रेजी संस्करणों के बीच बड़े अंतर हैं, यदि आप अंग्रेजी संस्करण का उपयोग करना चाहते हैं तो कृपया भाषा बदल लें।)"
  },
  "ar": {
    "title": "لعبة كلمة سطح المكتب",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Arabic. If you understand, reply with \"Understood\" and begin the game...",
    "description": "تظاهر بأنك DM في trpg Dungeons &amp; Dragons ، أضف إمكانية الفشل في التعديل ، ثم ضع قوسًا بعد كل اختيار مع تلميحات حول الاختيار ، وسأقوم بتشغيل اللاعب. إذا حصلت عليها ، فقم بالرد &quot;موافق&quot; وابدأ اللعبة.",
    "remark": "يأتي ChatGPT مع إعدادات trpg. مساهمة منgandli. (توجد اختلافات كبيرة بين النسختين الصينية والإنجليزية من هذا التذكير ، يرجى تبديل اللغة إذا كنت تريد استخدام النسخة الإنجليزية.)"
  },
  "bn": {
    "title": "ডেস্কটপ শব্দ খেলা",
    "prompt": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. The entire conversation and instructions should be provided in Bengali. If you understand, reply with \"Understood\" and begin the game...",
    "description": "ভান করুন আপনি trpg Dungeons &amp; Dragons-এ DM, মোডে ব্যর্থতার সম্ভাবনা যোগ করুন এবং পছন্দ সম্পর্কে ইঙ্গিত সহ প্রতিটি পছন্দের পরে একটি বন্ধনী রাখুন এবং আমি প্লেয়ার খেলব। যদি আপনি এটি পান, ঠিক আছে উত্তর দিন এবং খেলা শুরু করুন.",
    "remark": "ChatGPT টিআরপিজি সেটিংস সহ আসে। @gandli থেকে অবদান। (এই অনুস্মারকটির চীনা এবং ইংরেজি সংস্করণের মধ্যে বড় পার্থক্য রয়েছে, আপনি যদি ইংরেজি সংস্করণটি ব্যবহার করতে চান তবে দয়া করে ভাষাটি পরিবর্তন করুন।)"
  },
  "website": null,
  "tags": [
    "contribute",
    "games"
  ],
  "id": 179,
  "weight": 549
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
