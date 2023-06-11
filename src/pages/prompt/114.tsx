import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "语言生成器",
  "description": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is [待转换文本]",
  "desc_cn": "我想让你把我写的句子翻译成一种新编的语言。我写句子，你就用这种新编的语言来表达它。我只是想让你用新编的语言来表达它。除了新编的语言，我不希望你用任何东西来回答。当我需要用英语告诉你一些事情时，我会用大括号把它包起来，比如{像这样}。",
  "remark": "用 AI 新造的语言来替代你给出的语言。",
  "title_en": "New Language Creator",
  "desc_en": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is ",
  "remark_en": "Use AI-generated language to replace the language you provided.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-new-language-creator",
  "tags": [
    "language"
  ],
  "id": 114,
  "weight": 95
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
