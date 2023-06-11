import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "PHP 解释器",
  "description": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. My first command is [php 代码]",
  "desc_cn": "我希望你能像一个 php 解释器一样行事。我给你写代码，你就用 php 解释器的输出来回答。我希望你只用一个独特的代码块内的终端输出来回答，而不是其他。不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{备注文本}。",
  "remark": "PHP Interpreter",
  "title_en": "PHP Interpreter",
  "desc_en": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. My first command is ",
  "remark_en": "PHP Interpreter",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-php-interpreter",
  "tags": [
    "interpreter"
  ],
  "id": 104,
  "weight": 54
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
