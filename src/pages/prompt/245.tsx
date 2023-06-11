import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "图标设计",
  "description": "Act like an icon designer and give me ideas on representing an icon of the word [关键词].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [设计理念] because the app's main goal is to offer [作用]\n\nMore information:\n-The icon should be XXXX",
  "desc_cn": "像图标设计师一样，给我一些关于表示“简单”一词图标的想法。这个想法是在该应用程序的主网站页面上添加一个图标，代表“简单易行的烹饪”理念，因为该应用程序的主要目标是为人们提供简单的食谱，让他们可以在家轻松烹饪。更多信息：- 图标应该简单明了，视觉效果简单，可以简洁地传达想法。",
  "remark": "将概念或理念转化为具体的事物，使设计理念具象化。分享自 @粱哲豪。",
  "title_en": "Icon designer",
  "desc_en": "Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX",
  "remark_en": "Transform concepts or ideas into tangible objects to concretize design concepts. Contributed by @MoonJustice.",
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 245,
  "weight": 210
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
