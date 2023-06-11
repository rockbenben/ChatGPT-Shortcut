import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "期刊评审",
  "description": "I want you to act as a journal reviewer and respond in Chinese. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. My first suggestion request is '期刊主题'",
  "desc_cn": "我想让你担任期刊评审员。你需要审查和评论提交出版的文章，批判性地评估其研究、方法、方法论和结论，并对其优点和缺点提出建设性的批评。我的第一个建议要求是 '期刊主题'",
  "remark": "对提交的出版物文章进行审查和评论。",
  "title_en": "journal reviewer",
  "desc_en": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. My first suggestion request is '期刊主题'",
  "remark_en": "Review and comment on publication articles.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-journal-reviewer",
  "tags": [
    "comments"
  ],
  "id": 29,
  "weight": 129
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
