import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "演讲稿",
  "description": "作为一名 [身份]，以 [演讲主题] 为中心，为我扩写以下文本。可以引用最多一句名人名言、补充具体例子，阐述个人感想。",
  "desc_cn": "作为一名 [身份]，以如何落实科学道德和学风建设为中心，为我扩写以下文本。可以引用最多一句名人名言、补充具体例子，阐述个人感想。",
  "remark": "来自 @SetSeele 的投稿。",
  "title_en": "Speech",
  "desc_en": "As a [identity], centered around [topic], please expand the following text for me. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
  "remark_en": "Contributed by @SetSeele.",
  "website": null,
  "tags": [
    "contribute",
    "speech"
  ],
  "id": 195,
  "weight": 791
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
