import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "五子棋",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. Now make the first move.",
    "description": "让我们来玩五子棋。这个游戏的目标是在 9x9 的棋盘上连续得到 5 个（水平、垂直或对角线）。每次移动后打印棋盘（以 ABCDEFGHI/123456789 为轴）（用 x 和 o 表示移动，-表示空白）。你和我轮流下棋，也就是说，在我的每一步棋之后下你的棋。你不能将棋子放在其他棋子之上。在下棋前不要修改原棋盘。现在下第一步棋。",
    "remark": "Gomoku player"
  },
  "en": {
    "title": "Gomoku player",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. Now make the first move.",
    "remark": "Gomoku player"
  },
  "ja": {
    "title": "バックギャモン",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Janpanese. Now make the first move...",
    "description": "フットサルで遊ぼうこのゲームの目的は、9x9 のボード上で 5 を連続（横、縦、斜め）させることです。各移動後のボード（ABCDEFGHI/123456789 軸）を印刷する（x と o は移動、-は空白を表す）。あなたと私は交代で、つまり、私の動きの後にあなたの駒をプレイします。他の駒の上に駒を置くことはできません。プレイする前に元の盤を修正しないでください。では、最初の一手を打ってください。",
    "remark": "五目並べ"
  },
  "ko": {
    "title": "주사위 놀이",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Korean. Now make the first move...",
    "description": "풋살을 해봅시다. 이 게임의 목적은 9x9 보드에 가로, 세로 또는 대각선으로 5 개를 연속으로 넣는 것입니다. 한 칸씩 움직일 때마다 보드 (ABCDEFGHI/123456789 축에) 를 인쇄합니다 (이동은 X 와 O, 공백은 -로 표시). 너와 내가 번갈아 가며, 즉 내가 움직일 때마다 네 말을 플레이합니다. 한 조각을 다른 조각 위에 놓을 수 없습니다. 플레이하기 전에 원래의 보드를 수정하지 마세요. 이제 첫 번째 수를 놓습니다.",
    "remark": "고모쿠 플레이어"
  },
  "es": {
    "title": "chaquete",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Spanish. Now make the first move..",
    "description": "Juguemos al backgammon. El objetivo de este juego es conseguir 5 en raya (horizontal, vertical o diagonal) en un tablero de 9x9. Imprima el tablero de ajedrez (eje ABCDEFGHI/123456789) después de cada movimiento (x y o para movimientos, - para espacios en blanco). Tú y yo nos turnamos para jugar al ajedrez, es decir, jugar el tuyo después de cada una de mis jugadas. No puede colocar peones encima de otros peones. No modifique el tablero original antes de jugar al ajedrez. Ahora juega el primer movimiento.",
    "remark": "jugador gomoku"
  },
  "fr": {
    "title": "backgammon",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in French. Now make the first move...",
    "description": "Jouons au Backgammon. Le but de ce jeu est d'obtenir 5 points d'affilée (horizontalement, verticalement ou en diagonale) sur un plateau de 9x9. Imprimez le tableau (sur l'axe ABCDEFGHI/123456789) après chaque coup (avec x et o pour les coups, - pour le vide). Vous et moi jouons à tour de rôle, c'est-à-dire que vous jouez votre coup après chacun des miens. Vous ne pouvez pas placer un disque sur un autre disque. Ne modifiez pas le plateau original avant de jouer. Maintenant, jouez votre premier coup.",
    "remark": "Joueur de Gomoku"
  },
  "de": {
    "title": "Backgammon",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in German. Now make the first move...",
    "description": "Lasst uns Backgammon spielen. Das Ziel dieses Spiels ist es, 5 in einer Reihe (horizontal, vertikal oder diagonal) auf einem 9x9 Brett zu erreichen. Drucken Sie das Brett (auf der Achse ABCDEFGHI/123456789) nach jedem Zug aus (mit x und o für Züge, - für leer). Sie und ich wechseln uns ab, d.h. Sie spielen Ihren Zug nach jedem meiner Züge. Du kannst keine Scheibe auf eine andere legen. Verändern Sie das ursprüngliche Brett nicht, bevor Sie spielen. Machen Sie nun Ihren ersten Zug.",
    "remark": "Gomoku-Spieler"
  },
  "it": {
    "title": "backgammon",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Italian. Now make the first move...",
    "description": "Giochiamo a backgammon. L&#39;obiettivo di questo gioco è ottenere 5 di fila (orizzontalmente, verticalmente o diagonalmente) su una tavola 9x9. Stampa la scacchiera (asse ABCDEFGHI/123456789) dopo ogni mossa (x e o per le mosse, - per gli spazi). Io e te giochiamo a turno a scacchi, cioè giochiamo i tuoi dopo ogni mia mossa. Non puoi posizionare pedine sopra altre pedine. Non modificare la scacchiera originale prima di giocare a scacchi. Ora gioca la prima mossa.",
    "remark": "Giocatore di gomoku"
  },
  "ru": {
    "title": "нарды",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Russian. Now make the first move...",
    "description": "Давайте играть в нарды. Цель этой игры состоит в том, чтобы собрать 5 фишек в ряд (по горизонтали, вертикали или диагонали) на доске 9x9. Распечатайте шахматную доску (ось ABCDEFGHI/123456789) после каждого хода (x и o для ходов, - для пробелов). Мы с тобой по очереди играем в шахматы, то есть играем в твои после каждого моего хода. Вы не можете ставить пешки поверх других пешек. Не изменяйте исходную доску перед игрой в шахматы. Теперь сыграйте первый ход.",
    "remark": "игрок в гомоку"
  },
  "pt": {
    "title": "gamão",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Portuguese. Now make the first move...",
    "description": "Vamos jogar gamão. O objetivo deste jogo é conseguir 5 em linha (horizontalmente, verticalmente ou diagonalmente) em um tabuleiro de 9x9. Imprima o tabuleiro de damas (eixo ABCDEFGHI/123456789) após cada jogada (x e o para jogadas, - para espaços em branco). Você e eu nos revezamos jogando xadrez, ou seja, jogando o seu depois de cada uma das minhas jogadas. Você não pode colocar peões em cima de outros peões. Não modifique o tabuleiro original antes de jogar xadrez. Agora jogue o primeiro movimento.",
    "remark": "Gomoku jogador"
  },
  "hi": {
    "title": "चौसर",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Hindi. Now make the first move...",
    "description": "चलो बैकगैमौन खेलें. इस गेम का लक्ष्य 9x9 बोर्ड पर एक पंक्ति में 5 (क्षैतिज, लंबवत या तिरछे) प्राप्त करना है। प्रत्येक चाल के बाद चेकरबोर्ड (अक्ष ABCDEFGHI/123456789) प्रिंट करें (चालों के लिए x और o, - रिक्त स्थान के लिए)। आप और मैं बारी-बारी से शतरंज खेलते हैं, यानी मेरी हर चाल के बाद अपना शतरंज खेलते हैं। आप प्यादों को अन्य प्यादों के ऊपर नहीं रख सकते। शतरंज खेलने से पहले मूल बोर्ड में बदलाव न करें। अब पहली चाल खेलें.",
    "remark": "गोमोकू खिलाड़ी"
  },
  "ar": {
    "title": "طاولة الزهر",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Arabic. Now make the first move...",
    "description": "هيا نلعب طاولة الزهر. الهدف من هذه اللعبة هو الحصول على 5 على التوالي (أفقيًا أو رأسيًا أو قطريًا) على لوحة 9x9. اطبع رقعة الداما (المحور ABCDEFGHI / 123456789) بعد كل حركة (س و س للحركات ، - للفراغات). أنت وأنا نتناوب على لعب الشطرنج ، أي لعب الشطرنج بعد كل حركاتي. لا يمكنك وضع البيادق فوق البيادق الأخرى. لا تقم بتعديل اللوحة الأصلية قبل لعب الشطرنج. الآن العب الخطوة الأولى.",
    "remark": "لاعب جوموكو"
  },
  "bn": {
    "title": "ব্যাকগ্যামন",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Bengali. Now make the first move...",
    "description": "এর ব্যাকগ্যামন খেলা যাক. এই গেমটির লক্ষ্য হল একটি 9x9 বোর্ডে একটি সারিতে 5টি (অনুভূমিকভাবে, উল্লম্বভাবে বা তির্যকভাবে) পাওয়া। প্রতিটি পদক্ষেপের পরে চেকারবোর্ড (অক্ষ ABCDEFGHI/123456789) প্রিন্ট করুন (চালের জন্য x এবং o, - খালি জায়গার জন্য)। আপনি এবং আমি পালা করে দাবা খেলি, অর্থাৎ, আমার প্রতিটি পদক্ষেপের পরে আপনার খেলা। আপনি অন্য প্যানদের উপরে প্যান রাখতে পারবেন না। দাবা খেলার আগে আসল বোর্ড পরিবর্তন করবেন না। এখন প্রথম চাল খেলুন।",
    "remark": "গোমোকু প্লেয়ার"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-gomoku-player",
  "tags": [
    "games"
  ],
  "id": 122,
  "weight": 2047
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
