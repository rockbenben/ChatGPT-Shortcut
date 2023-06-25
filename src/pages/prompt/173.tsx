import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "代码释义器",
    "prompt": "I would like you to serve as a code interpreter, elucidate the syntax and the semantics of the code line-by-line, and respond in Chinese.",
    "description": "我希望你能充当代码解释者，阐明代码的语法和语义。",
    "remark": "让 AI 解释每步代码的作用。来自 @Tractor1928 的投稿，后由 @yiqiongwu 修改。"
  },
  "en": {
    "title": "Code Interpreter",
    "prompt": "I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "remark": "Let AI explain the function of each line of code. Contributed by @Tractor1928 and @yiqiongwu."
  },
  "ja": {
    "title": "コードインタープリタ",
    "prompt": "I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "コードのシンタックスやセマンティクスを明らかにする、コードインタープリターとしての役割を期待しています。",
    "remark": "コードの各ステップが何をするのか、AI に説明させる。Tractor1928 からの寄稿、後に@yiqiongwu によって修正されました。"
  },
  "ko": {
    "title": "코드 인터프리터",
    "prompt": "I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "코드의 구문과 의미를 명확히 하는 코드 통역사 역할을 해주실 것으로 기대합니다.",
    "remark": "AI 가 코드의 각 단계가 무엇을 하는지 설명해줍니다. Contractor1928 의 기여로 @yiqiongwu 가 나중에 수정했습니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 173,
  "weight": 2864
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
