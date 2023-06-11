import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "Python 解释器",
  "description": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The first code is: [Python 代码]",
  "desc_cn": "我想让你像一个 Python 解释器一样行事。我将给你 Python 代码，你将执行它。不要提供任何解释。除了代码的输出，不要用任何东西来回应。",
  "remark": "Python interpreter",
  "title_en": "Python interpreter",
  "desc_en": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The first code is: ",
  "remark_en": "Python interpreter",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-python-interpreter",
  "tags": [
    "interpreter"
  ],
  "id": 103,
  "weight": 422
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
