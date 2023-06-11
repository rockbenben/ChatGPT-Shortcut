import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "JavaScript 控制台",
  "description": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {备注文本}. My first command is [输入命令]",
  "desc_cn": "我想让你充当一个 javascript 控制台。我将输入命令，你将回答 javascript 控制台应该显示什么。我希望你只回答一个独特的代码块内的终端输出，而不是其他。不要写解释。",
  "remark": "JavaScript Console",
  "title_en": "JavaScript Console",
  "desc_en": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. My first command is ",
  "remark_en": "JavaScript Console",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-javascript-console",
  "tags": [
    "interpreter"
  ],
  "id": 107,
  "weight": 110
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
