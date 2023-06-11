import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "桌面文字游戏",
  "description": "假装你是 trpg《Dungeons & Dragons》中的 dm，在模组中添加失败的可能性，并在每个选择后加一个括号，括号里是关于选择的提示，我来扮演玩家。如果你明白了，回复好的并开始游戏",
  "desc_cn": "假装你是 trpg《Dungeons & Dragons》中的 dm，在模组中添加失败的可能性，并在每个选择后加一个括号，括号里是关于选择的提示，我来扮演玩家。如果你明白了，回复好的并开始游戏。",
  "remark": "ChatGPT 里自带 trpg 设定。来自 @gandli 的投稿。(本提示词中英文版本存在较大差异，若需使用英文版请切换语言。)",
  "title_en": "D&D Text Game",
  "desc_en": "Pretend you are the Dungeon Master (DM) in a tabletop role-playing game (TRPG) like \"Dungeons & Dragons.\" Create a scenario with various choices for the player to make, and include hints in parentheses after each choice. I will play as the player. If you understand, reply with \"Understood\" and begin the game.",
  "remark_en": "ChatGPT comes with trpg settings. The effect of Chinese prompt words is better, and this word needs further adjustment. Contributed by @gandli.",
  "website": null,
  "tags": [
    "contribute",
    "games"
  ],
  "id": 179,
  "weight": 428
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
