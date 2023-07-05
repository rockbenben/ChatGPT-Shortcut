import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "数学家",
    "prompt": "I want you to act like a mathematician. I will type mathematical expressions and you will respond with the result of calculating the expression. I want you to answer only with the final amount and nothing else. Do not write explanations. When I need to tell you something in English, I'll do it by putting the text inside square brackets {文字备注}. My first expression is: [数学表达式]",
    "description": "我想让你表现得像个数学家。我将输入数学表达式，你将回答计算表达式的结果。我希望你只回答最后的数额，而不是其他。不要写解释。当我需要用英语告诉你一些事情时，我会把文字放在方括号里{文字备注}。",
    "remark": "根据输入的数学表达式，输出结果，不输出步骤说明。"
  },
  "en": {
    "title": "mathematician",
    "prompt": "I want you to act like a mathematician. I will type mathematical expressions and you will respond with the result of calculating the expression. I want you to answer only with the final amount and nothing else. Do not write explanations. When I need to tell you something in English, I'll do it by putting the text inside square brackets {like this}. My first expression is: ",
    "remark": "According to the input mathematical expression, output the result without showing the steps."
  },
  "ja": {
    "title": "数学者",
    "prompt": "I want you to act like a mathematician. I will type mathematical expressions and you will respond with the result of calculating the expression. I want you to answer only with the final amount and nothing else. Do not write explanations. When I need to tell you something in English, I'll do it by putting the text inside square brackets {like this}. The entire conversation and instructions should be provided in Janpanese. My first expression is: ",
    "description": "数学者のように振る舞ってほしい。私が数式を入力し、あなたはその計算結果を答えてください。最終的な金額だけを答え、それ以外は何も答えないでほしい。説明文は書かないでください。英語で伝えたいことがあるときは、角括弧{テキストメモ}の中にテキストを入れます。",
    "remark": "入力された数式に基づき、ステップバイステップで結果を出力します。"
  },
  "ko": {
    "title": "수학자",
    "prompt": "I want you to act like a mathematician. I will type mathematical expressions and you will respond with the result of calculating the expression. I want you to answer only with the final amount and nothing else. Do not write explanations. When I need to tell you something in English, I'll do it by putting the text inside square brackets {like this}. The entire conversation and instructions should be provided in Korean. My first expression is: ",
    "description": "수학자처럼 행동해 주세요. 제가 수학 식을 입력하면 여러분은 그 식을 계산한 결과를 답하세요. 최종 금액만 답하고 그 외에는 답하지 마세요. 설명을 쓰지 마세요. 영어로 설명해야 할 때는 대괄호 {텍스트 메모} 안에 텍스트를 넣겠습니다.",
    "remark": "입력한 수학 식에 따라 단계별 지침 없이 결과가 출력됩니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-mathematician",
  "tags": [
    "academic"
  ],
  "id": 84,
  "weight": 156
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
