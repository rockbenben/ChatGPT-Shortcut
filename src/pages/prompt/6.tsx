import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "提示词生成器②",
    "prompt": "I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "我希望你能充当 ChatGPT 提示生成器，我会发送一个主题，你需要根据主题内容生成一个以「我希望你能充当」开头的 ChatGPT 提示。猜测一下我的行为，并扩展该提示来描述主题内容，使其更有用。",
    "remark": "根据主题让 ChatGPT 生成提示词。"
  },
  "en": {
    "title": "ChatGPT prompt generator",
    "prompt": "I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "remark": "Generate prompts for ChatGPT based on the topic."
  },
  "ja": {
    "title": "プロンプトジェネレーター②」。",
    "prompt": "I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "ChatGPT プロンプトジェネレーターとして行動してほしい、私がお題を送るので、お題の内容から「I want you to act as」で始まる ChatGPT プロンプトを生成する必要があります。私の行動を推測し、プロンプトを拡張してお題の内容を記述することで、より便利なプロンプトを作成することができます。",
    "remark": "ChatGPT にトピックに基づいたプロンプトワードを生成させる。"
  },
  "ko": {
    "title": "프롬프트 생성기②",
    "prompt": "I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic, the prompt should start with 'I want you to act as ', and guess what I might do, and expand the prompt accordingly Describe the content to make it useful.",
    "description": "ChatGPT 프롬프트 생성기로서 내가 주제를 보내면, 주제 내용에 따라 \"나는 당신이 다음과 같이 행동하기를 원합니다\"로 시작하는 ChatGPT 프롬프트를 생성해야 합니다. 내 행동을 추측하고 프롬프트를 확장하여 주제를 설명하면 더 유용하게 사용할 수 있습니다.",
    "remark": "ChatGPT 가 주제에 따라 프롬프트 단어를 생성하도록 합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chatgpt-prompt-generator",
  "tags": [
    "ai"
  ],
  "id": 6,
  "weight": 696
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
