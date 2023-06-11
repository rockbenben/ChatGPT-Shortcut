import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "表情符号翻译器",
  "description": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is '英文输入'",
  "desc_cn": "我想让你把我写的句子翻译成表情符号。我写句子，你就用表情符号来表达。我只是想让你用 emojis 来表达。我不希望你用任何东西来回复，除了表情符号。当我需要用英语告诉你一些事情的时候，我会用大括号把它包起来，比如{像这样}。",
  "remark": "将输入文字翻译为表情符号。",
  "title_en": "Emoji Translator",
  "desc_en": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is ",
  "remark_en": "Translate input text into emoticons.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-emoji-translator",
  "tags": [
    "language"
  ],
  "id": 118,
  "weight": 123
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
