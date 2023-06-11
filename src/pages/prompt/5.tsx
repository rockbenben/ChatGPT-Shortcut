import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "提示词生成器",
  "description": "I want you to act as a prompt generator. Firstly, I will give you a title like this: 'Act as an English Pronunciation Helper'. Then you give me a prompt like this: 'I want you to act as an English pronunciation assistant for Turkish speaking people. I will write your sentences, and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentences but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is 'how the weather is in Istanbul?'.' (You should adapt the sample prompt according to the title I gave. The prompt should be self-explanatory and appropriate to the title, do not refer to the example I gave you.). My first title is '提示词功能' (Give me prompt only)",
  "desc_cn": "我想让你充当一个提示生成器。首先，我将给你一个这样的标题。'充当英语发音的帮手'。然后你给我一个这样的提示。'我希望你充当讲土耳其语的人的英语发音助手。我给你写句子，你只回答他们的发音，其他什么都不说。答复不能是我的句子的翻译，而只能是发音。发音应该使用土耳其的拉丁字母来发音。不要在回答中写解释。我的第一句话是 '伊斯坦布尔的天气如何？'。'（你应该根据我给出的标题来调整提示样本。提示词应该是不言自明的，并且与题目相适应，不要参照我给你的例子）。我的第一个题目是 '提示词功能'(只给我提示)",
  "remark": "根据指定要求，让 ChatGPT 生成提示词。",
  "title_en": "Prompt generator",
  "desc_en": "I want you to act as a prompt generator. Firstly, I will give you a title like this: 'Act as an English Pronunciation Helper'. Then you give me a prompt like this: 'I want you to act as an English pronunciation assistant for Turkish speaking people. I will write your sentences, and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentences but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is 'how the weather is in Istanbul?'.' (You should adapt the sample prompt according to the title I gave. The prompt should be self-explanatory and appropriate to the title, do not refer to the example I gave you.). My first title is 'Give me prompt only'",
  "remark_en": "ChatGPT generate prompt words according to the specified requirements",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-prompt-generator",
  "tags": [
    "ai"
  ],
  "id": 5,
  "weight": 1181
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
