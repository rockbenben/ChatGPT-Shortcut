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
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Janpanese. Now make the first move.",
    "description": "フットサルで遊ぼうこのゲームの目的は、9x9 のボード上で 5 を連続（横、縦、斜め）させることです。各移動後のボード（ABCDEFGHI/123456789 軸）を印刷する（x と o は移動、-は空白を表す）。あなたと私は交代で、つまり、私の動きの後にあなたの駒をプレイします。他の駒の上に駒を置くことはできません。プレイする前に元の盤を修正しないでください。では、最初の一手を打ってください。",
    "remark": "五目並べ"
  },
  "ko": {
    "title": "주사위 놀이",
    "prompt": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. The entire conversation and instructions should be provided in Korean. Now make the first move.",
    "description": "풋살을 해봅시다. 이 게임의 목적은 9x9 보드에 가로, 세로 또는 대각선으로 5 개를 연속으로 넣는 것입니다. 한 칸씩 움직일 때마다 보드 (ABCDEFGHI/123456789 축에) 를 인쇄합니다 (이동은 X 와 O, 공백은 -로 표시). 너와 내가 번갈아 가며, 즉 내가 움직일 때마다 네 말을 플레이합니다. 한 조각을 다른 조각 위에 놓을 수 없습니다. 플레이하기 전에 원래의 보드를 수정하지 마세요. 이제 첫 번째 수를 놓습니다.",
    "remark": "고모쿠 플레이어"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-gomoku-player",
  "tags": [
    "games"
  ],
  "id": 122,
  "weight": 1974
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
