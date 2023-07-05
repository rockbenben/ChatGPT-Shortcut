import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "语言生成器",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is [待转换文本]",
    "description": "我想让你把我写的句子翻译成一种新编的语言。我写句子，你就用这种新编的语言来表达它。我只是想让你用新编的语言来表达它。除了新编的语言，我不希望你用任何东西来回答。当我需要用英语告诉你一些事情时，我会用大括号把它包起来，比如{像这样}。",
    "remark": "用 AI 新造的语言来替代你给出的语言。"
  },
  "en": {
    "title": "New Language Creator",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. My first sentence is ",
    "remark": "Use AI-generated language to replace the language you provided."
  },
  "ja": {
    "title": "言語ジェネレータ",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "私が書いた文章を、新しく作った言語に翻訳してほしいのです。私が文章を書いたら、あなたはそれをこの新しく作られた言語で表現してください。私はただ、新しく作られた言語でそれを表現してほしいだけです。私は、あなたが新しく作られた言語以外で答えてほしいとは思っていません。英語で何かを伝える必要があるときは、{like this}のように括弧でくくることにしています。",
    "remark": "与えた言語を、AI が新たに作成した言語に置き換える。"
  },
  "ko": {
    "title": "언어 생성기",
    "prompt": "I want you to translate the sentences I wrote into a new made up language. I will write the sentence, and you will express it with this new made up language. I just want you to express it with the new made up language. I don't want you to reply with anything but the new made up language. When I need to tell you something in English, I will do it by wrapping it in curly brackets like {like this}. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "내가 쓴 문장을 새로 만든 언어로 번역해 주세요. 내가 문장을 쓰면 당신이 이 새로 만들어진 언어로 표현해 주세요. 나는 당신이 그것을 새로 만든 언어로 표현하기를 원합니다. 나는 당신이 새로 만든 언어 외에는 대답하지 않기를 바랍니다. 영어로 무언가를 말해야 할 때는 {이렇게}처럼 중괄호로 마무리합니다.",
    "remark": "사용자가 입력한 언어를 AI 가 새로 생성한 언어로 대체합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-new-language-creator",
  "tags": [
    "language"
  ],
  "id": 114,
  "weight": 130
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
