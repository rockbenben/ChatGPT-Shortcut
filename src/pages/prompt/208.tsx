import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "表达自检",
  "description": "[某个具体的事情]，我说：[回复内容]。请问对方可能会如何理解我的意思？",
  "desc_cn": "[某个具体的事情]，我说：[回复内容]。请问对方可能会如何理解我的意思？",
  "remark": "如果你是高敏感人群，或你的话经常被人误解，通过 AI 解读可以让你在说话前检查自己是否表达清楚。",
  "title_en": "Self-check on expression ",
  "desc_en": "After [a specific action], I said: [my response]. How might the other person interpret my meaning?",
  "remark_en": "If you belong to the highly sensitive population or if your words are frequently misunderstood, using AI interpretation can help you self-check before speaking to ensure clear expression.",
  "website": null,
  "tags": [
    "personal"
  ],
  "id": 208,
  "weight": 163
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
