import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "非小说类书籍总结",
  "description": "I want you to act as a Life Coach and respond in Chinese. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?",
  "desc_cn": "我想让你充当一个生活教练。请总结一下这本由 [作者] 撰写的非小说类书籍 [书名]。用一个孩子能够理解的方式来简化核心原则。另外，你能不能给我一份可操作的步骤清单，告诉我如何将这些原则落实到我的日常生活中？",
  "remark": "根据输入的非小说类书籍标题和作者，以最容易理解的方式概括该书的核心原则。同时，提供一份可行的步骤清单，介绍如何将这些原则应用到日常生活中。",
  "title_en": "Summary of Non-Fiction Books",
  "desc_en": "I want you to act as a Life Coach. Please summarize this non-fiction book, [书名] by [作者]. Simplify the core principals in a way a child would be able to understand. Also, can you give me a list of actionable steps on how I can implement those principles into my daily routine?",
  "remark_en": "Based on the input of non-fiction book titles and authors, summarize the core principles of the book in the most easily understandable way. Additionally, provide a feasible checklist of steps to explain how these principles can be applied to daily life.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-life-coach-1",
  "tags": [
    "life"
  ],
  "id": 47,
  "weight": 228
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
