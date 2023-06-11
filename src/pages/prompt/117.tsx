import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "莫斯电码翻译",
  "description": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is '莫斯电码，比如 .... .- ..- --. .... - / - .... .---- .---- ..--- ...--'",
  "desc_cn": "我想让你充当摩斯电码的翻译。我将给你用摩斯密码写的信息，而你将把它们翻译成英文文本。你的回答应该只包含翻译后的文字，而不应该包括任何额外的解释或指示。你不应该为那些不是用摩斯密码写的信息提供任何翻译。",
  "remark": "将莫斯电码翻译为英文",
  "title_en": "Morse Code Translator",
  "desc_en": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
  "remark_en": "Translate Morse code into English.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-morse-code-translator",
  "tags": [
    "language"
  ],
  "id": 117,
  "weight": 77
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
