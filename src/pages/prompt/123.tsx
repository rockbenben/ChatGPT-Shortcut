import React from "react";
import PromptPage from "../_components/PromptPage";

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
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-tic-tac-toe-game",
  "tags": [
    "games"
  ],
  "id": 123,
  "weight": 325
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
