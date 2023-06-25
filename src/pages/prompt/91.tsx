import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "前端开发",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. My first request is [项目要求]",
    "description": "我希望你能担任高级前端开发员。我将描述一个项目的细节，你将用这些工具来编码项目。Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. 你应该将文件合并到单一的 index.js 文件中，而不是其他。不要写解释。",
    "remark": "提供项目目标和依赖，输出前端项目代码。"
  },
  "en": {
    "title": "Senior Frontend developer",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. My first request is ",
    "remark": "Provide project goals and dependencies, output front-end project code."
  },
  "ja": {
    "title": "フロントエンド開発",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "私はあなたにシニアフロントエンドデベロッパーとして働いてほしいです。これらのツールを使ってコーディングするプロジェクトの詳細を説明します。create React App, yarn, Ant Design, list, Redux Toolkit, createSlice, thunk, axios. ファイルは index.js ファイル 1 つにマージして、他は何もしないでください。解説は書かないでください。",
    "remark": "プロジェクトの目的と依存関係を提供し、フロントエンドのプロジェクトコードを出力する。"
  },
  "ko": {
    "title": "프론트엔드 개발",
    "prompt": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "시니어 프론트엔드 개발자로 일하고 싶습니다. 이 도구로 코딩할 프로젝트의 세부 사항을 설명하겠습니다. create React App, yarn, Ant Design, list, Redux Toolkit, createSlice, thunk, axios. 파일을 하나의 index.js 파일로 병합하고 다른 파일은 만들지 않아야 합니다. 설명을 작성하지 마세요.",
    "remark": "프로젝트 목표와 종속성을 제공하고 프런트엔드 프로젝트 코드를 출력합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-senior-frontend-developer",
  "tags": [
    "code"
  ],
  "id": 91,
  "weight": 981
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
