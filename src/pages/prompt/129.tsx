import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "图像：符号设计",
  "description": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. My first object is '符号对象'",
  "desc_cn": "我想让你充当一个 ascii 艺术家。我将把对象写给你，我将要求你在代码块中写出该对象的 ascii 代码。只写 ascii 代码。不要解释你写的对象。我将在双引号中说明这些对象。",
  "remark": "用 Ascii 符号生成不同的图像。",
  "title_en": "ascii artist",
  "desc_en": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. My first object is ",
  "remark_en": "Generate different images using ASCII symbols.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-ascii-artist",
  "tags": [
    "tool"
  ],
  "id": 129,
  "weight": 162
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
