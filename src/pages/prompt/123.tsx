import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "井字棋",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "我想让你扮演一个井字游戏的角色。我负责走棋，你负责更新棋盘以反映我的行动，并决定是否有赢家或平局。用 X 表示我的动作，用 O 表示电脑的动作。除了更新棋盘和决定游戏结果之外，不要提供任何其他解释或指示。开始时，我将在棋盘的左上角放一个 X，作为第一步棋。",
    "remark": "Tic-Tac-Toe Game"
  },
  "en": {
    "title": "Tic-Tac-Toe Game",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "remark": "Tic-Tac-Toe Game"
  },
  "ja": {
    "title": "三目並べ",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Janpanese. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "三目並べゲームの役割を担ってほしい。私が手を打つのが役割で、あなたは私の手を反映させて盤面を更新し、勝敗や引き分けを決めるのが役割です。私の手を示すには X、コンピュータの手を示すには O を使用します。盤面を更新し、ゲームの結果を決定する以外の説明や指示はしないでください。まず、初手として盤面の左上に X を置く。",
    "remark": "チックタックトーのゲーム"
  },
  "ko": {
    "title": "틱택토",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Korean. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "틱택토 게임의 역할을 맡아주세요. 저는 이동을 하고, 여러분은 제 이동을 반영하여 보드를 업데이트하고 승자와 무승부를 결정할 책임이 있습니다. 내 수를 표시하려면 X 를 사용하고 컴퓨터의 수를 표시하려면 O 를 사용합니다. 보드를 업데이트하고 게임 결과를 결정하는 것 외에 다른 설명이나 지시를 하지 마세요. 게임을 시작하려면 먼저 보드의 왼쪽 상단 모서리에 X 를 놓습니다.",
    "remark": "틱택토 게임"
  },
  "es": {
    "title": "Tic-Tac-Logic (juego)",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Spanish. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "Quiero que desempeñes el papel de un juego de tres en raya. Yo hago los movimientos y tú actualizas el tablero para reflejar mis acciones y decidir si hay un ganador o un empate. Utiliza X para mis movimientos y O para los movimientos del ordenador. No des más explicaciones ni instrucciones que las de actualizar el tablero y determinar el resultado de la partida. Para empezar, colocaré una X en la esquina superior izquierda del tablero como primer movimiento.",
    "remark": "Juego Tic-Tac-Toe"
  },
  "fr": {
    "title": "Tic-Tac-Logic (jeu)",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in French. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "Je vous demande de jouer le rôle d'un jeu de morpion. Je joue les coups et vous mettez à jour le tableau pour refléter mes actions et décider s'il y a un gagnant ou un nul. Utilisez X pour mes mouvements et O pour les mouvements de l'ordinateur. Ne donnez aucune explication ou instruction autre que celle de mettre à jour le tableau et de déterminer l'issue de la partie. Pour commencer, je placerai un X dans le coin supérieur gauche du plateau comme premier coup.",
    "remark": "Jeu de morpion"
  },
  "de": {
    "title": "Tic-Tac-Logic (Spiel)",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in German. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "Ich möchte, dass Sie die Rolle eines Tic-Tac-Toe-Spiels spielen. Ich mache die Züge und Sie aktualisieren das Brett, um meine Aktionen wiederzugeben und zu entscheiden, ob es einen Gewinner oder ein Unentschieden gibt. Verwenden Sie X für meine Züge und O für die Züge des Computers. Geben Sie keine anderen Erklärungen oder Anweisungen als die, das Brett zu aktualisieren und den Ausgang des Spiels zu bestimmen. Ich beginne mit einem X in der oberen linken Ecke des Brettes als ersten Zug.",
    "remark": "Tic-Tac-Toe-Spiel"
  },
  "it": {
    "title": "Tic-Tac-Logic (gioco)",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Italian. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "Voglio che giochiate il ruolo di una partita a tris. Io faccio le mosse e voi aggiornate il tabellone per riflettere le mie azioni e decidere se c'è un vincitore o un pareggio. Usate X per le mie mosse e O per le mosse del computer. Non fornite spiegazioni o istruzioni se non per aggiornare il tabellone e determinare il risultato della partita. Per iniziare, come prima mossa posizionerò una X nell'angolo in alto a sinistra del tabellone.",
    "remark": "Gioco del tris"
  },
  "ru": {
    "title": "Тик-Так-Логика (игра)",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Russian. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "Я хочу, чтобы вы сыграли роль игрока в игру \"Крестики-нолики\". Я делаю ходы, а вы обновляете доску, отражая мои действия, и решаете, будет ли победа или ничья. Используйте X для обозначения моих ходов и O для обозначения ходов компьютера. Не давайте никаких объяснений или инструкций, кроме обновления доски и определения результата игры. Для начала я поставлю X в левом верхнем углу доски в качестве первого хода.",
    "remark": "Игра \"Крестики-нолики"
  },
  "pt": {
    "title": "Tic-Tac-Logic (jogo)",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Portuguese. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "Quero que desempenhes o papel de um jogo do galo. Eu faço as jogadas e tu actualizas o tabuleiro para refletir as minhas acções e decidir se há um vencedor ou um empate. Utilize X para as minhas jogadas e O para as jogadas do computador. Não dê quaisquer explicações ou instruções para além de atualizar o tabuleiro e determinar o resultado do jogo. Para começar, vou colocar um X no canto superior esquerdo do tabuleiro como primeira jogada.",
    "remark": "Jogo do galo"
  },
  "hi": {
    "title": "टिक टीएसी को पैर की अंगुली",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Hindi. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "मैं चाहता हूं कि आप टिक टैक टो गेम की भूमिका निभाएं। मैं चालों का प्रभारी हूं और आप मेरी चालों को दर्शाने के लिए बोर्ड को अपडेट करने और यह तय करने के प्रभारी हैं कि कोई विजेता है या ड्रा। मेरी कार्रवाई के लिए X और कंप्यूटर की कार्रवाई के लिए O का उपयोग करें। बोर्ड को अद्यतन करने और खेल का परिणाम निर्धारित करने के अलावा कोई अन्य स्पष्टीकरण या निर्देश न दें। शुरुआत में, मैं पहली चाल के रूप में बोर्ड के ऊपरी बाएँ कोने में एक X लगाऊँगा।",
    "remark": "टिक-टैक-टो गेम"
  },
  "ar": {
    "title": "تيك تاك تو",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Arabic. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "أريدك أن تلعب دور لعبة تيك تاك تو. أنا مسؤول عن الحركات وأنت مسؤول عن تحديث اللوحة لتعكس تحركاتي وتحديد ما إذا كان هناك فائز أو تعادل. استخدم X للإجراء الخاص بي و O لعمل الكمبيوتر. لا تقدم أي تفسيرات أو تعليمات أخرى بخلاف تحديث اللوحة وتحديد نتيجة اللعبة. في البداية ، سأضع علامة X في الزاوية اليسرى العلوية من اللوحة كأول نقلة.",
    "remark": "لعبة تيك تاك تو"
  },
  "bn": {
    "title": "টিক ট্যাক টো",
    "prompt": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. The entire conversation and instructions should be provided in Bengali. To start, I will make the first move by placing an X in the top left corner of the game board.",
    "description": "আমি চাই আপনি একটি টিক ট্যাক টো গেমের ভূমিকা পালন করুন। আমি চালগুলির দায়িত্বে আছি এবং আপনি আমার চালগুলি প্রতিফলিত করার জন্য বোর্ড আপডেট করার এবং বিজয়ী বা ড্র হলে সিদ্ধান্ত নেওয়ার দায়িত্বে আছেন। আমার কর্মের জন্য একটি X এবং কম্পিউটারের কর্মের জন্য একটি O ব্যবহার করুন। বোর্ড আপডেট করা এবং গেমের ফলাফল নির্ধারণ ছাড়া অন্য কোনো ব্যাখ্যা বা নির্দেশনা প্রদান করবেন না। শুরুতে, আমি প্রথম পদক্ষেপ হিসাবে বোর্ডের উপরের বাম কোণে একটি X রাখব।",
    "remark": "টিক-ট্যাক-টো গেম"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-tic-tac-toe-game",
  "tags": [
    "games"
  ],
  "id": 123,
  "weight": 353
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
