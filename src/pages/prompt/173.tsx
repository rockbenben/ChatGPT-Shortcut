import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "代码释义器",
  "description": "I would like you to serve as a code interpreter, elucidate the syntax and the semantics of the code line-by-line, and respond in Chinese.",
  "desc_cn": "我希望你能充当代码解释者，阐明代码的语法和语义。",
  "remark": "让 AI 解释每步代码的作用。来自 @Tractor1928 的投稿，后由 @yiqiongwu 修改。",
  "title_en": "Code Interpreter",
  "desc_en": "I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
  "remark_en": "Let AI explain the function of each line of code. Contributed by @Tractor1928 and @yiqiongwu.",
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 173,
  "weight": 2502
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
