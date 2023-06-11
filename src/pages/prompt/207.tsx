import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "阅读空气",
  "description": "在以下这个场景中，有人对我说了一句话，请帮我分析对方可能想表达什么意思，并提供一个合适的回应。场景：[描述一个具体的情境]。说话人说：[具体的话语]。对方的意图可能是什么？我应该如何回应？",
  "desc_cn": "发生 [某个具体的事情/背景]，有人对我说：[内容]。请问对方可能想表达什么意思？你会怎样回应？",
  "remark": "对于一些无法理解的对话，提供对话背景让 AI 来进行解读并制定出适当的回应。",
  "title_en": "AI Conversation",
  "desc_en": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. What could be the other person's intention? How should I respond?",
  "remark_en": "空気を読む read the air. For some incomprehensible conversations, provide the context of the conversation for AI to interpret and formulate an appropriate response.",
  "website": null,
  "tags": [
    "personal",
    "social"
  ],
  "id": 207,
  "weight": 219
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
