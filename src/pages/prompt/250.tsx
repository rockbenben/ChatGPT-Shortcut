import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "提问循环",
  "description": "Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:\nQuestion: The initial question\nAnswer: The answer to the initial question\nQuestion: The question about the reason for the previous answer\nAnswer: The answer to the previous question\nQuestion:\nKeep asking about the reason for the last answer. Stop only when the answer is \"That's the way it is\" or \"We don't know for now\". Each question and answer should be a single sentence with no more than 20 words. Add \"Q: \" before each question and \"A: \" before each answer.\nAsk and answer in \"Chinese\" regardless of the language I use. Don’t show the translation process. Just write questions and answers in the destination language.\nNow, the initial question is: \"最初问题\"",
  "desc_cn": "你们的任务是自动轮流提出和回答问题。我们将从一个最初的问题开始。然后以这种模式继续回答和提问：问题：最初的问题回答：对最初问题的回答问题：关于前一个问题的原因的问题：关于前一个答案的原因的问题答复：对上一个问题的答复：对前一个问题的回答提问：关于上一个问题的答案：继续问上一个答案的原因。只有当答案是 \"That's the way it is\" 或 \"We don't know for now\"时才停止。每个问题和答案都应该是一个单句，不超过 20 个字。在每个问题前加 \"Q：\"，在每个回答前加 \"A：\"。无论我使用何种语言，都要用中文提问和回答。不要显示翻译的过程。只要用目的地语言写出问题和答案。",
  "remark": "围绕一个问题不断提问，以深化问题的理解。来自 @hkfrank996 的投稿。",
  "title_en": "Response Loop",
  "desc_en": "Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:\nQuestion: The initial question\nAnswer: The answer to the initial question\nQuestion: The question about the reason for the previous answer\nAnswer: The answer to the previous question\nQuestion:\nKeep asking about the reason for the last answer. Stop only when the answer is \"That's the way it is\" or \"We don't know for now\". Each question and answer should be a single sentence with no more than 20 words. Add \"Q: \" before each question and \"A: \" before each answer.\nAsk and answer in \"English\" regardless of the language I use. Don’t show the translation process. Just write questions and answers in the destination language.\nNow, the initial question is: ",
  "remark_en": "Continuously pose questions revolving around a particular issue to deepen the understanding of the problem. Contributed by @hkfrank996.",
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 250,
  "weight": 402
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
