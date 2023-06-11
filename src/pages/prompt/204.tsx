import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "口播脚本",
  "description": "write an article about [主题] in a human-like style, simple Chinese, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures.",
  "desc_cn": "请以人的口吻，采用缩略语、成语、过渡短语、感叹词、悬垂修饰语和口语化语言，避免重复短语和不自然的句子结构，撰写一篇关于 [主题] 的文章。",
  "remark": "撰写视频、直播、播客、分镜头和其他口语内容的脚本。来自 @Bettycroco 的投稿。",
  "title_en": "Spoken script",
  "desc_en": "write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures.",
  "remark_en": "write scripts for live broadcasts, videos, podcasts and other types of spoken content. Contributed by @Bettycroco.",
  "website": null,
  "tags": [
    "contribute",
    "write"
  ],
  "id": 204,
  "weight": 3956
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
