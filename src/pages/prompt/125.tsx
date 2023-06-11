import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "文本冒险游戏",
  "description": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply in Chinese with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is wake up",
  "desc_cn": "我想让你充当一个基于文本的冒险游戏。我将输入命令，而你将用描述角色所看到的东西来回答。我希望你只在一个独特的代码块中回复游戏输出，而不是其他。不要写解释，不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{像这样}。我的第一个命令是醒来。",
  "remark": "Text Based Adventure Game",
  "title_en": "Text Based Adventure Game",
  "desc_en": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is wake up",
  "remark_en": "Text Based Adventure Game",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-text-based-adventure-game",
  "tags": [
    "games"
  ],
  "id": 125,
  "weight": 869
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
