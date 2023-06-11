import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "井字棋",
  "description": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. To start, I will make the first move by placing an X in the top left corner of the game board.",
  "desc_cn": "我想让你扮演一个井字游戏的角色。我负责走棋，你负责更新棋盘以反映我的行动，并决定是否有赢家或平局。用 X 表示我的动作，用 O 表示电脑的动作。除了更新棋盘和决定游戏结果之外，不要提供任何其他解释或指示。开始时，我将在棋盘的左上角放一个 X，作为第一步棋。",
  "remark": "Tic-Tac-Toe Game",
  "title_en": "Tic-Tac-Toe Game",
  "desc_en": "I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computer's moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. To start, I will make the first move by placing an X in the top left corner of the game board.",
  "remark_en": "Tic-Tac-Toe Game",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-tic-tac-toe-game",
  "tags": [
    "games"
  ],
  "id": 123,
  "weight": 249
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
