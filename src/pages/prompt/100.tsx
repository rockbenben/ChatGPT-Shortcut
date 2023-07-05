import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "Commit 信息生成器",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. Do not write any explanations or other words, just reply with the commit message.",
    "description": "我想让你充当一个提交信息生成器。我将为你提供任务的信息和任务代码的前缀，我希望你能用常规的提交格式生成一条合适的提交信息。不要写任何解释或其他文字，只需回复提交信息。",
    "remark": "Commit Message Generator"
  },
  "en": {
    "title": "Commit Message Generator",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. Do not write any explanations or other words, just reply with the commit message.",
    "remark": "Commit Message Generator"
  },
  "ja": {
    "title": "コミット情報ジェネレーター",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Janpanese. Do not write any explanations or other words, just reply with the commit message.",
    "description": "投稿メッセージのジェネレーターとして活動してほしい。タスクに関する情報とタスクコードのプレフィックスを提供するので、通常の投稿フォーマットで適切な投稿メッセージを生成してほしい。説明文などは書かず、投稿メッセージに返信してください。",
    "remark": "コミットメッセージジェネレーター"
  },
  "ko": {
    "title": "커밋 정보 생성기",
    "prompt": "I want you to act as a commit message generator. I will provide you with information about the task and the prefix for the task code, and I would like you to generate an appropriate commit message using the conventional commit format. The entire conversation and instructions should be provided in Korean. Do not write any explanations or other words, just reply with the commit message.",
    "description": "제출 메시지 생성자 역할을 해 주셨으면 합니다. 작업에 대한 정보와 작업 코드의 접두사를 제공할 테니 일반 제출 형식을 사용하여 적절한 제출 메시지를 생성해 주시기 바랍니다. 설명이나 기타 텍스트를 작성하지 마시고 제출 메시지에 답장만 하세요.",
    "remark": "커밋 메시지 생성기"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-commit-message-generator",
  "tags": [
    "code"
  ],
  "id": 100,
  "weight": 208
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
