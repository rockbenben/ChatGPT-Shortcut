import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "表情符号翻译器",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is '英文输入'",
    "description": "我想让你把我写的句子翻译成表情符号。我写句子，你就用表情符号来表达。我只是想让你用 emojis 来表达。我不希望你用任何东西来回复，除了表情符号。当我需要用英语告诉你一些事情的时候，我会用大括号把它包起来，比如{像这样}。",
    "remark": "将输入文字翻译为表情符号。"
  },
  "en": {
    "title": "Emoji Translator",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is ",
    "remark": "Translate input text into emoticons."
  },
  "ja": {
    "title": "顔文字トランスレーター",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "私の書いた文章を絵文字に訳してほしい。私が文章を書くので、あなたは絵文字を使って表現してください。ただ、絵文字を使ってほしいだけです。絵文字以外のもので返信してほしくないんだ。英語で何かを伝えたいときは、{like this}のように中括弧で囲みます。",
    "remark": "入力されたテキストを絵文字に変換する。"
  },
  "ko": {
    "title": "이모티콘 번역기",
    "prompt": "I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I don't want you to reply with anything but emoji. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "내가 쓴 문장을 이모티콘으로 번역해 주세요. 제가 문장을 쓰면 여러분이 이모티콘으로 표현해 주세요. 이모티콘만 사용했으면 좋겠어요. 이모티콘 외에는 답장하지 않았으면 좋겠어요. 영어로 무언가를 말해야 할 때는 {같이}와 같이 중괄호로 묶어서 말하겠습니다.",
    "remark": "입력 텍스트를 이모티콘으로 번역합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-emoji-translator",
  "tags": [
    "language"
  ],
  "id": 118,
  "weight": 144
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
