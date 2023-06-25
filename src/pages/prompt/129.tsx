import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "图像：符号设计",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. My first object is '符号对象'",
    "description": "我想让你充当一个 ascii 艺术家。我将把对象写给你，我将要求你在代码块中写出该对象的 ascii 代码。只写 ascii 代码。不要解释你写的对象。我将在双引号中说明这些对象。",
    "remark": "用 Ascii 符号生成不同的图像。"
  },
  "en": {
    "title": "ascii artist",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. My first object is ",
    "remark": "Generate different images using ASCII symbols."
  },
  "ja": {
    "title": "画像：シンボリックデザイン",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Janpanese. My first object is ",
    "description": "あなたにはアスキーアーティストとして活動してほしい。私がオブジェクトを書くので そのオブジェクトの ascii コードを ブロックで書いてもらいます。ascii コードだけを書いてください。書いたオブジェクトを説明してはいけません。私はオブジェクトを二重引用符で囲んで説明します。",
    "remark": "アスキー記法で異なる画像を生成する。"
  },
  "ko": {
    "title": "이미지: 상징적 디자인",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Korean. My first object is ",
    "description": "저는 여러분이 아스키 아티스트로 활동하기를 원합니다. 제가 여러분에게 객체를 작성해 드리고, 여러분에게 코드 블록에 객체에 대한 아스키 코드를 작성해 달라고 요청할 것입니다. 아스키 코드만 작성하세요. 작성한 객체에 대해 설명하지 마세요. 객체를 큰따옴표로 묶어서 설명하겠습니다.",
    "remark": "아스키 표기법을 사용하여 다양한 이미지를 생성합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-ascii-artist",
  "tags": [
    "tool"
  ],
  "id": 129,
  "weight": 175
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
