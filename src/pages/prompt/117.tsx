import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "莫斯电码翻译",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is '莫斯电码，比如 .... .- ..- --. .... - / - .... .---- .---- ..--- ...--'",
    "description": "我想让你充当摩斯电码的翻译。我将给你用摩斯密码写的信息，而你将把它们翻译成英文文本。你的回答应该只包含翻译后的文字，而不应该包括任何额外的解释或指示。你不应该为那些不是用摩斯密码写的信息提供任何翻译。",
    "remark": "将莫斯电码翻译为英文"
  },
  "en": {
    "title": "Morse Code Translator",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "remark": "Translate Morse code into English."
  },
  "ja": {
    "title": "モールス符号翻訳",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. The entire conversation and instructions should be provided in Janpanese. Your first message is ",
    "description": "モールス信号の翻訳家として活躍してほしい。私がモールス信号で書かれたメッセージを渡しますので、あなたはそれを英文に翻訳してください。あなたの答えは、翻訳されたテキストのみを含み、追加の説明や指示を含んではならない。モールス信号で書かれていないメッセージの翻訳を提供するべきではありません。",
    "remark": "Moss コードの英語への翻訳"
  },
  "ko": {
    "title": "모스 코드 번역",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. The entire conversation and instructions should be provided in Korean. Your first message is ",
    "description": "모스부호 번역가 역할을 해줬으면 좋겠어요. 제가 모스 부호로 작성된 메시지를 드리면 여러분은 이를 영어 텍스트로 번역해 주세요. 답변에는 번역된 텍스트만 포함되어야 하며 추가 설명이나 지침을 포함해서는 안 됩니다. 모스 부호로 작성되지 않은 메시지에 대해서는 어떠한 번역도 제공해서는 안 됩니다.",
    "remark": "모스 코드를 영어로 번역"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-morse-code-translator",
  "tags": [
    "language"
  ],
  "id": 117,
  "weight": 101
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
