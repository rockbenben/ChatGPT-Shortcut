import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "开发：Vue3",
  "description": "Create a Vue 3 component that displays a [开发项目] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. Display Chinese text in the view and include styles. Provide only the necessary code to meet these requirements without explanations or descriptions.",
  "desc_cn": "作为 Vue3 开发人员，你的任务是使用 Yarn、Vite、Vue3、TS、Pinia 和 Vueuse 工具编写一个计数器。你的响应应该是满足以下要求的代码：使用 Vue3 的 Composition API 和 <script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
  "remark": "辅助 Vue3 开发。来自 @gandli 的投稿。",
  "title_en": "Vue3 component",
  "desc_en": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. Provide only the necessary code to meet these requirements without explanations or descriptions.",
  "remark_en": "Auxiliary development for Vue3. Contributed by @gandli.",
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 178,
  "weight": 282
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
