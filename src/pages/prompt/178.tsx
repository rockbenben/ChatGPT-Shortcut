import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "开发：Vue3",
    "prompt": "Create a Vue 3 component that displays a [开发项目] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. Display Chinese text in the view and include styles. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "作为 Vue3 开发人员，你的任务是使用 Yarn、Vite、Vue3、TS、Pinia 和 Vueuse 工具编写一个计数器。你的响应应该是满足以下要求的代码：使用 Vue3 的 Composition API 和 <script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "辅助 Vue3 开发。来自 @gandli 的投稿。"
  },
  "en": {
    "title": "Vue3 component",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "remark": "Auxiliary development for Vue3. Contributed by @gandli."
  },
  "ja": {
    "title": "開発：Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Janpanese. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "Vue3 開発者として、あなたは Yarn、Vite、Vue3、TS、Pinia、Vueuse の各ツールを使ってカウンターを書くという課題を与えられています。あなたの回答は、以下の要件を満たすコードでなければなりません：Vue3 の Composition API と<script setup>構文を使用してテンプレート、スクリプト、スタイルを vue ファイルに結合する、ビューに中国語テキストを表示する、スタイルを含む。なお、これらの要件を満たすために必要なコードのみを提供する必要があり、説明や解説は不要です。",
    "remark": "Vue3 開発のお手伝い。gandli さんからの寄稿です。"
  },
  "ko": {
    "title": "개발: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Korean. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "Vue3 개발자는 Yarn, Vite, Vue3, TS, Pinia 및 Vueuse 도구를 사용하여 카운터를 작성하는 임무를 맡게 됩니다. 응답은 다음 요구 사항을 충족하는 코드여야 합니다: 템플릿, 스크립트 및 스타일을 Vue3 의 컴포지션 API 및 <스크립트 설정> 구문을 사용하여 vue 파일로 결합하고, 뷰에 중국어 텍스트를 표시하며, 스타일을 포함해야 합니다. 이러한 요구 사항을 충족하는 데 필요한 코드만 제공해야 하며 설명이나 설명은 필요하지 않습니다.",
    "remark": "Vue3 개발 지원. gandli 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 178,
  "weight": 339
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
