import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "国际象棋",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. My first move is e4.",
    "description": "我想让你扮演一个对手的棋手。我 我们将按照对等的顺序说我们的动作。一开始我将是白棋。也请不要向我解释你的棋步，因为我们是对手。在我的第一条信息之后，我将只写我的行动。在我们下棋时，别忘了在你的脑海中更新棋盘的状态。我的第一步棋是 e4。",
    "remark": "Chess Player"
  },
  "en": {
    "title": "Chess Player",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. My first move is e4.",
    "remark": "Chess Player"
  },
  "ja": {
    "title": "チェス",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Janpanese. My first move is e4.",
    "description": "相手のプレーヤーと対戦してほしい。I 私たちは、互いの手を順番に言っていくことにします。はじめに私が白の駒になります。私たちは対戦相手なので、あなたの手を私にも説明しないでください。最初のメッセージの後、私は自分の手だけを書きます。私たちがプレイしている間、頭の中で盤面の状態を更新することを忘れないでください。私の最初の手は e4 です。",
    "remark": "チェスプレーヤー"
  },
  "ko": {
    "title": "체스",
    "prompt": "I want you to act as a rival chess player. I We will say our moves in reciprocal order. In the beginning I will be white. Also please don't explain your moves to me because we are rivals. After my first message i will just write my move. Don't forget to update the state of the board in your mind as we make moves. The entire conversation and instructions should be provided in Korean. My first move is e4.",
    "description": "상대방의 플레이어를 플레이해 주세요. 나는 상호주의의 순서로 우리의 수를 말할 것입니다. 처음에는 제가 흰 말이 되겠습니다. 우리는 상대방이기 때문에 나에게도 당신의 수를 설명하지 마세요. 내 첫 수 이후에는 내 수만 쓰겠습니다. 우리가 플레이하는 동안 마음속으로 보드의 상태를 업데이트하는 것을 잊지 마세요. 제 첫 번째 수는 e4 입니다.",
    "remark": "체스 플레이어"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-chess-player",
  "tags": [
    "games"
  ],
  "id": 124,
  "weight": 174
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
