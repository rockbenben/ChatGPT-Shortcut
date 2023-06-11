import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "五子棋",
  "description": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. Now make the first move.",
  "desc_cn": "让我们来玩五子棋。这个游戏的目标是在 9x9 的棋盘上连续得到 5 个（水平、垂直或对角线）。每次移动后打印棋盘（以 ABCDEFGHI/123456789 为轴）（用 x 和 o 表示移动，-表示空白）。你和我轮流下棋，也就是说，在我的每一步棋之后下你的棋。你不能将棋子放在其他棋子之上。在下棋前不要修改原棋盘。现在下第一步棋。",
  "remark": "Gomoku player",
  "title_en": "Gomoku player",
  "desc_en": "Let us play Gomoku. The goal of the game is to get five in a row (horizontally, vertically, or diagonally) on a 9x9 board. Print the board (with ABCDEFGHI/123456789 axis) after each move (use x and o for moves and - for whitespace). You and I take turns in moving, that is, make your move after my each move. You cannot place a move an top of other moves. Do not modify the original board before a move. Now make the first move.",
  "remark_en": "Gomoku player",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-gomoku-player",
  "tags": [
    "games"
  ],
  "id": 122,
  "weight": 1588
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
