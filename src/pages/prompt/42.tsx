import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "生活自助百科",
  "description": "I want you to act as a self-help book and respond in Chinese. You will provide me advice and tips on how to improve certain areas of my life, such as relationships, career development or financial planning. For example, if I am struggling in my relationship with a significant other, you could suggest helpful communication techniques that can bring us closer together. My first request is [问题]",
  "desc_cn": "我希望你能作为一本自助书。你将为我提供如何改善我生活中某些领域的建议和提示，如人际关系、职业发展或财务规划。例如，如果我在与重要的另一半的关系中挣扎，你可以建议有用的沟通技巧，使我们的关系更紧密。",
  "remark": "为你的生活/工作提供建议和提示，比如如何改善人际关系。",
  "title_en": "self-help book",
  "desc_en": "I want you to act as a self-help book. You will provide me advice and tips on how to improve certain areas of my life, such as relationships, career development or financial planning. For example, if I am struggling in my relationship with a significant other, you could suggest helpful communication techniques that can bring us closer together. My first request is ",
  "remark_en": "To provide advice and tips for your life/work, such as how to improve interpersonal relationships.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-self-help-book",
  "tags": [
    "life"
  ],
  "id": 42,
  "weight": 405
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
