import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "文章续写",
  "description": "Continue writing an article in Chinese about [文章主题] that begins with the following sentence: [文章开头]",
  "desc_cn": "继续用中文写一篇关于 [文章主题] 的文章，以下列句子开头：[文章开头］",
  "remark": "根据文章主题，延续文章开头部分来完成文章。",
  "title_en": "Article Continued",
  "desc_en": "Continue writing an article about [theme] that begins with the following sentence: ",
  "remark_en": "Complete the essay by continuing the opening section of the essay according to its theme.",
  "website": null,
  "tags": [
    "write"
  ],
  "id": 9,
  "weight": 3030
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
