import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "JavaScript 控制台",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {备注文本}. My first command is [输入命令]",
    "description": "我想让你充当一个 javascript 控制台。我将输入命令，你将回答 javascript 控制台应该显示什么。我希望你只回答一个独特的代码块内的终端输出，而不是其他。不要写解释。",
    "remark": "JavaScript Console"
  },
  "en": {
    "title": "JavaScript Console",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. My first command is ",
    "remark": "JavaScript Console"
  },
  "ja": {
    "title": "JavaScript コンソール",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Janpanese. My first command is ",
    "description": "javascript のコンソールとして動作してほしいのです。私がコマンドを入力し、javascript のコンソールが何を表示すべきかを答えてほしい。一意のコードブロック内の端末出力のみを答え、それ以外は答えないでほしい。説明文は書かないでください。",
    "remark": "JavaScript コンソール"
  },
  "ko": {
    "title": "자바스크립트 콘솔",
    "prompt": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Korean. My first command is ",
    "description": "여러분이 자바스크립트 콘솔 역할을 해주셨으면 합니다. 제가 명령을 입력하면 자바스크립트 콘솔이 표시해야 할 내용에 대해 답변해 주세요. 고유한 코드 블록 내의 터미널 출력만 답해 주시고 다른 것은 답하지 마세요. 설명을 작성하지 마세요.",
    "remark": "자바스크립트 콘솔"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-javascript-console",
  "tags": [
    "interpreter"
  ],
  "id": 107,
  "weight": 133
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
