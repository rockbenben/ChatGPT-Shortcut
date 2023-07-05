import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "提示词生成器",
    "prompt": "I want you to act as a prompt generator. Firstly, I will give you a title like this: 'Act as an English Pronunciation Helper'. Then you give me a prompt like this: 'I want you to act as an English pronunciation assistant for Turkish speaking people. I will write your sentences, and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentences but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is 'how the weather is in Istanbul?'.' (You should adapt the sample prompt according to the title I gave. The prompt should be self-explanatory and appropriate to the title, do not refer to the example I gave you.). My first title is '提示词功能' (Give me prompt only)",
    "description": "我想让你充当一个提示生成器。首先，我将给你一个这样的标题。'充当英语发音的帮手'。然后你给我一个这样的提示。'我希望你充当讲土耳其语的人的英语发音助手。我给你写句子，你只回答他们的发音，其他什么都不说。答复不能是我的句子的翻译，而只能是发音。发音应该使用土耳其的拉丁字母来发音。不要在回答中写解释。我的第一句话是 '伊斯坦布尔的天气如何？'。'（你应该根据我给出的标题来调整提示样本。提示词应该是不言自明的，并且与题目相适应，不要参照我给你的例子）。我的第一个题目是 '提示词功能'(只给我提示)",
    "remark": "根据指定要求，让 ChatGPT 生成提示词。"
  },
  "en": {
    "title": "Prompt generator",
    "prompt": "I want you to act as a prompt generator. Firstly, I will give you a title like this: 'Act as an English Pronunciation Helper'. Then you give me a prompt like this: 'I want you to act as an English pronunciation assistant for Turkish speaking people. I will write your sentences, and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentences but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is 'how the weather is in Istanbul?'.' (You should adapt the sample prompt according to the title I gave. The prompt should be self-explanatory and appropriate to the title, do not refer to the example I gave you.). My first title is 'Give me prompt only'",
    "remark": "ChatGPT generate prompt words according to the specified requirements"
  },
  "ja": {
    "title": "プロンプトジェネレーター",
    "prompt": "I want you to act as a prompt generator. Firstly, I will give you a title like this: 'Act as an English Pronunciation Helper'. Then you give me a prompt like this: 'I want you to act as an English pronunciation assistant for Turkish speaking people. I will write your sentences, and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentences but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is 'how the weather is in Istanbul?'.' (You should adapt the sample prompt according to the title I gave. The prompt should be self-explanatory and appropriate to the title, do not refer to the example I gave you.). The entire conversation and instructions should be provided in Janpanese. My first title is 'Give me prompt only'",
    "description": "プロンプトジェネレーターとして活躍してほしい。まず、こんなタイトルをつけます』。英語の発音のヘルパーとして活動してください』。そして、こんな感じのプロンプトを出すんだ』。トルコ語話者のための英語発音ヘルパーとして活動してほしい。私が文章を書くので、発音だけを答え、それ以外は何もしないでください。回答は私の文章の翻訳ではなく、発音だけでなければならない。発音はトルコ語のラテンアルファベットで発音してください。答えの中に説明を書いてはいけません。私の最初の文章は『イスタンブールの天気はどうですか？.'(プロンプトのサンプルは、私がつけたタイトルに合わせるべきです。プロンプトは自明で、タイトルにふさわしいものであるべきです。私があげた例を参照しないでください）。私の最初のタイトルは「プロンプトの単語機能」です（プロンプトを与えるだけです）。",
    "remark": "ChatGPT に指定された条件に従ってプロンプトワードを生成させる。"
  },
  "ko": {
    "title": "프롬프트 생성기",
    "prompt": "I want you to act as a prompt generator. Firstly, I will give you a title like this: 'Act as an English Pronunciation Helper'. Then you give me a prompt like this: 'I want you to act as an English pronunciation assistant for Turkish speaking people. I will write your sentences, and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentences but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is 'how the weather is in Istanbul?'.' (You should adapt the sample prompt according to the title I gave. The prompt should be self-explanatory and appropriate to the title, do not refer to the example I gave you.). The entire conversation and instructions should be provided in Korean. My first title is 'Give me prompt only'",
    "description": "여러분이 프롬프트 생성기 역할을 해주셨으면 합니다. 먼저, 이렇게 제목을 붙이겠습니다. 영어 발음 도우미 역할을 해줘'. 그런 다음 다음과 같은 프롬프트를 제공합니다. 나는 당신이 터키어 사용자를위한 영어 발음 도우미 역할을하기를 원합니다. 제가 문장을 작성해 드리고, 여러분은 발음으로만 답하시면 됩니다. 답변은 제가 쓴 문장을 번역해서는 안 되고 발음으로만 답해야 합니다. 발음은 터키어 라틴 알파벳을 사용하여 발음해야 합니다. 답변에 설명을 쓰지 마세요. 제 첫 문장은 '이스탄불의 날씨는 어때요? .' (샘플 프롬프트를 제가 제시한 제목에 맞게 수정해야 합니다. 프롬프트는 제목에 맞게 자명하고 적절해야 하며, 제가 제공한 예시를 참조하지 마세요.) 첫 번째 제목은 '프롬프트 단어 기능'입니다 (프롬프트만 제공).",
    "remark": "ChatGPT 가 지정된 요구 사항에 따라 프롬프트 단어를 생성하도록 합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-prompt-generator",
  "tags": [
    "ai"
  ],
  "id": 5,
  "weight": 1590
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
