import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "R 编程解释器",
  "description": "I want you to act as a R interpreter. I'll type commands and you'll reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in english, I will do so by putting text inside curly brackets {备注文本}. My first command is [R 代码]",
  "desc_cn": "我想让你充当一个 R 解释器。我输入命令，你回答终端应该显示的内容。我希望你只回答一个独特的代码块内的终端输出，而不是其他。不要写解释。不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情的时候，我会把文字放在大括号{备注文本}里。",
  "remark": "R Programming Interpreter",
  "title_en": "R interpreter",
  "desc_en": "I want you to act as a R interpreter. I'll type commands and you'll reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. My first command is",
  "remark_en": "R Programming Interpreter",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-r-programming-interpreter",
  "tags": [
    "interpreter"
  ],
  "id": 105,
  "weight": 48
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
