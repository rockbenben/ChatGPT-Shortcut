import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "论文式回答",
  "description": "Write a highly detailed essay in Chinese with introduction, body, and conclusion paragraphs responding to the following: [问题]",
  "desc_cn": "写一篇高度详细的文章，包括引言、主体和结论段落，以回应以下内容：[问题］",
  "remark": "以论文形式讨论问题，能够获得连贯的、结构化的和更高质量的回答。",
  "title_en": "Thesis reply",
  "desc_en": "Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
  "remark_en": "Discussing questions in essay form allows for coherent, structured and higher quality responses.",
  "website": "https://learnprompting.org/docs/applied_prompting/short_response",
  "tags": [
    "favorite",
    "article"
  ],
  "id": 4,
  "weight": 6793
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
