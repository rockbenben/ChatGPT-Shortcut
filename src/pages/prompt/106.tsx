import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "Linux 终端",
  "description": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {备注文本}. My first command is [输入命令]",
  "desc_cn": "我想让你充当一个 Linux 终端。我将输入命令，你将回答终端应该显示的内容。我希望你只在一个独特的代码块内回复终端输出，而不是其他。不要写解释。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{备注文本}。",
  "remark": "Linux Terminal",
  "title_en": "Linux Terminal",
  "desc_en": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first command is ",
  "remark_en": "Linux Terminal",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-linux-terminal",
  "tags": [
    "interpreter"
  ],
  "id": 106,
  "weight": 264
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
