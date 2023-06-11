import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "前端开发",
  "description": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. My first request is [项目要求]",
  "desc_cn": "我希望你能担任高级前端开发员。我将描述一个项目的细节，你将用这些工具来编码项目。Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. 你应该将文件合并到单一的 index.js 文件中，而不是其他。不要写解释。",
  "remark": "提供项目目标和依赖，输出前端项目代码。",
  "title_en": "Senior Frontend developer",
  "desc_en": "I want you to act as a Senior Frontend developer. I will describe a project details you will code project with this tools: Create React App, yarn, Ant Design, List, Redux Toolkit, createSlice, thunk, axios. You should merge files in single index.js file and nothing else. Do not write explanations. My first request is ",
  "remark_en": "Provide project goals and dependencies, output front-end project code.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-senior-frontend-developer",
  "tags": [
    "code"
  ],
  "id": 91,
  "weight": 860
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
