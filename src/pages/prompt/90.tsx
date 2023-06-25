import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "IT 编程问题",
    "prompt": "I want you to act as a stackoverflow post and respond in Chinese. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first question is '编程问题'",
    "description": "我想让你充当 Stackoverflow 的帖子。我将提出与编程有关的问题，你将回答答案是什么。我希望你只回答给定的答案，在没有足够的细节时写出解释。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{像这样}。",
    "remark": "模拟编程社区来回答你的问题，并提供解决代码。"
  },
  "en": {
    "title": "Stackoverflow Answer",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first question is ",
    "remark": "Simulated programming community to answer your questions and provide solution code."
  },
  "ja": {
    "title": "IT プログラミングの課題",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Janpanese. My first question is ",
    "description": "Stackoverflow の投稿として行動してほしいです。私がプログラミングに関連する質問をし、あなたはその答えが何であるかを答える。与えられた答えにのみ答え、詳細が不明な場合は説明を書いてほしい。英語で何かを伝える必要があるときは、中括弧{このような}の中にテキストを入れることにしています。",
    "remark": "あなたの質問に答え、解決コードを提供する模擬プログラミングコミュニティです。"
  },
  "ko": {
    "title": "IT 프로그래밍 문제",
    "prompt": "I want you to act as a stackoverflow post. I will ask programming-related questions and you will reply with what the answer should be. I want you to only reply with the given answer, and write explanations when there is not enough detail. do not write explanations. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Korean. My first question is ",
    "description": "스택오버플로우 게시물로 활동해 주셨으면 합니다. 프로그래밍과 관련된 질문을 드리고 정답을 답변해 주시면 됩니다. 주어진 답변만 답변해 주시고, 부족한 부분은 설명을 작성해 주셨으면 합니다. 제가 영어로 설명해야 할 때는 {이렇게} 괄호 안에 텍스트를 넣겠습니다.",
    "remark": "질문에 답하고 솔루션 코드를 제공하는 시뮬레이션 프로그래밍 커뮤니티입니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-stackoverflow-post",
  "tags": [
    "code"
  ],
  "id": 90,
  "weight": 5100
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
