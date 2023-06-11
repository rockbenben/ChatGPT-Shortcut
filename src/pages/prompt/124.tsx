import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "国际象棋",
  "description": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. My first move is e4.",
  "desc_cn": "我想让你扮演一个对手的棋手。我 我们将按照对等的顺序说我们的动作。一开始我将是白棋。也请不要向我解释你的棋步，因为我们是对手。在我的第一条信息之后，我将只写我的行动。在我们下棋时，别忘了在你的脑海中更新棋盘的状态。我的第一步棋是 e4。",
  "remark": "Chess Player",
  "title_en": "Chess Player",
  "desc_en": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. My first move is e4.",
  "remark_en": "Chess Player",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-chess-player",
  "tags": [
    "games"
  ],
  "id": 124,
  "weight": 141
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
