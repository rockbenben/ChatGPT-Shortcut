import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "PHP 解释器",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. My first command is [php 代码]",
    "description": "我希望你能像一个 php 解释器一样行事。我给你写代码，你就用 php 解释器的输出来回答。我希望你只用一个独特的代码块内的终端输出来回答，而不是其他。不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{备注文本}。",
    "remark": "PHP Interpreter"
  },
  "en": {
    "title": "PHP Interpreter",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. My first command is ",
    "remark": "PHP Interpreter"
  },
  "ja": {
    "title": "PHP インタープリタ",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Janpanese. My first command is ",
    "description": "私はあなたに、php インタプリタのような振る舞いを期待しています。私がコードを書くと、あなたは php インタプリタの出力で答えてくれます。私はあなたがコードのユニークなブロック内の端末の出力だけで答えることを望みます、そして他の何もしないでください。私が指示しない限り、コマンドを入力しないでください。英語で何かを伝える必要があるときは、中括弧{comment text}の中にテキストを入れることにします。",
    "remark": "PHP インタープリタ"
  },
  "ko": {
    "title": "PHP 인터프리터",
    "prompt": "I want you to act like a php interpreter. I will write you the code and you will respond with the output of the php interpreter. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. Do not type commands unless I instruct you to do so. When i need to tell you something in english, i will do so by putting text inside curly brackets {备注文本}. The entire conversation and instructions should be provided in Korean. My first command is ",
    "description": "저는 여러분이 PHP 인터프리터처럼 행동하기를 기대합니다. 제가 코드를 작성하면 여러분은 PHP 인터프리터의 출력으로 응답합니다. 고유한 코드 블록 내에서 터미널 출력으로만 응답하고 다른 것은 입력하지 마세요. 제가 지시하지 않는 한 명령을 입력하지 마세요. 영어로 설명해야 할 때는 중괄호 {주석 텍스트} 안에 텍스트를 넣을 것입니다.",
    "remark": "PHP 인터프리터"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-php-interpreter",
  "tags": [
    "interpreter"
  ],
  "id": 104,
  "weight": 76
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
