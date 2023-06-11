import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "格言书",
  "description": "I want you to act as an aphorism book and respond in Chinese. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. My first request is [格言要求]",
  "desc_cn": "我希望你能充当一本箴言书。你将为我提供明智的建议、鼓舞人心的名言和有意义的谚语，以帮助指导我的日常决策。此外，如果有必要，你可以提出将这些建议付诸行动的实际方法或其他相关主题。我的第一个要求是 [格言要求]",
  "remark": "根据要求输出鼓舞人心的名言和有意义的格言。",
  "title_en": "aphorism book",
  "desc_en": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. My first request is ",
  "remark_en": "Output inspirational quotes and meaningful mottos on request.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-aphorism-book",
  "tags": [
    "write"
  ],
  "id": 12,
  "weight": 421
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
