import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "Python 解释器",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The first code is: [Python 代码]",
    "description": "我想让你像一个 Python 解释器一样行事。我将给你 Python 代码，你将执行它。不要提供任何解释。除了代码的输出，不要用任何东西来回应。",
    "remark": "Python interpreter"
  },
  "en": {
    "title": "Python interpreter",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The first code is: ",
    "remark": "Python interpreter"
  },
  "ja": {
    "title": "Python インタプリタ",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Janpanese. The first code is: ",
    "description": "Python のインタプリタのように振る舞ってほしいのです。私が Python のコードを渡すので、それを実行してください。解釈は一切しないでください。コードの出力以外には何も反応しないでください。",
    "remark": "Python インタプリタ"
  },
  "ko": {
    "title": "파이썬 인터프리터",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Korean. The first code is: ",
    "description": "파이썬 인터프리터처럼 행동해 주세요. 제가 파이썬 코드를 드리면 여러분은 이를 실행하세요. 어떤 해석도 제공하지 마세요. 코드의 출력 외에는 아무 것도 응답하지 마세요.",
    "remark": "파이썬 인터프리터"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-python-interpreter",
  "tags": [
    "interpreter"
  ],
  "id": 103,
  "weight": 504
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
