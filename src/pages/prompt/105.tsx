import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "R 编程解释器",
    "prompt": "I want you to act as a R interpreter. I'll type commands and you'll reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in english, I will do so by putting text inside curly brackets {备注文本}. My first command is [R 代码]",
    "description": "我想让你充当一个 R 解释器。我输入命令，你回答终端应该显示的内容。我希望你只回答一个独特的代码块内的终端输出，而不是其他。不要写解释。不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情的时候，我会把文字放在大括号{备注文本}里。",
    "remark": "R Programming Interpreter"
  },
  "en": {
    "title": "R interpreter",
    "prompt": "I want you to act as a R interpreter. I'll type commands and you'll reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. My first command is",
    "remark": "R Programming Interpreter"
  },
  "ja": {
    "title": "R プログラミングインタープリタ",
    "prompt": "I want you to act as a R interpreter. I'll type commands and you'll reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Janpanese. My first command is",
    "description": "R のインタプリタとして活躍してほしい。私がコマンドを入力し、あなたはターミナルが表示すべき内容を答える。一意のコードブロックの中で、端末の出力だけを答え、それ以外は答えないでほしい。説明文は書かないでください。私が指示しない限り、コマンドを入力してはいけない。英語で何かを伝える必要があるときは、中括弧{comment text}の中にテキストを入れることにします。",
    "remark": "R プログラミングインタープリタ"
  },
  "ko": {
    "title": "R 프로그래밍 인터프리터",
    "prompt": "I want you to act as a R interpreter. I'll type commands and you'll reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Korean. My first command is",
    "description": "당신이 R 통역사 역할을 해줬으면 좋겠어요. 제가 명령을 입력하면 터미널에 표시되어야 할 내용을 대답해 주세요. 고유한 코드 블록 내의 터미널 출력에만 대답하고 다른 것은 대답하지 마세요. 설명을 작성하지 마세요. 제가 지시하지 않는 한 명령을 입력하지 마세요. 영어로 설명해야 할 때는 중괄호 {주석 텍스트} 안에 텍스트를 넣습니다.",
    "remark": "R 프로그래밍 인터프리터"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-r-programming-interpreter",
  "tags": [
    "interpreter"
  ],
  "id": 105,
  "weight": 78
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
