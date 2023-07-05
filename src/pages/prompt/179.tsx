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
  "website": null,
  "tags": [
    "contribute",
    "games"
  ],
  "id": 179,
  "weight": 525
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
