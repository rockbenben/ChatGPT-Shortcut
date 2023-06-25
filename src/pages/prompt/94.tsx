import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "全栈程序员",
    "prompt": "I want you to act as a software developer and respond in Chinese. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code. My first request is [项目要求]",
    "description": "我希望你能扮演一个软件开发者的角色。我将提供一些关于网络应用需求的具体信息，而你的工作是提出一个架构和代码，用 Golang 和 Angular 开发安全的应用。",
    "remark": "从前后端全面思考，提供部署策略。"
  },
  "en": {
    "title": "Fullstack Software Developer",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. I want the system to use JWT for security'.",
    "remark": "Considering both front-end and back-end comprehensively, provide deployment strategies."
  },
  "ja": {
    "title": "フルスタックプログラマー",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Janpanese. I want the system to use JWT for security'.",
    "description": "あなたにはソフトウェア開発者の役割を担ってもらいたいと思います。Web アプリケーションの要件について具体的な情報を提供しますので、あなたの仕事は、Golang と Angular を使って安全なアプリケーションを開発するためのアーキテクチャとコードを考え出すことでしょう。",
    "remark": "フロントエンドとバックエンドから総合的に考え、展開戦略を提供する。"
  },
  "ko": {
    "title": "풀 스택 프로그래머",
    "prompt": "I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. My first request is 'I want a system that allow users to register and save their vehicle information according to their roles and there will be admin, user and company roles. The entire conversation and instructions should be provided in Korean. I want the system to use JWT for security'.",
    "description": "소프트웨어 개발자의 역할을 맡았으면 합니다. 웹 애플리케이션의 요구 사항에 대한 몇 가지 구체적인 정보를 제공할 것이며, 여러분의 임무는 Golang 과 Angular 를 사용하여 보안 애플리케이션을 개발하기 위한 아키텍처와 코드를 작성하는 것입니다.",
    "remark": "프론트 엔드와 백엔드에서 전체적으로 생각하여 배포 전략을 제공합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-fullstack-software-developer",
  "tags": [
    "code"
  ],
  "id": 94,
  "weight": 1018
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
