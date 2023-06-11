import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "科技评论",
  "description": "I want you to act as a tech reviewer and respond in Chinese. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. My first suggestion request is '科技评论对象角度'",
  "desc_cn": "我想让你充当一个技术评论员。我将给你一个新技术的名字，你将为我提供一个深入的评论--包括优点、缺点、功能，以及与市场上其他技术的比较。我的第一个建议要求是 '科技评论对象角度'",
  "remark": "从优点、缺点、功能、同类对比等角度对技术和硬件进行评价。",
  "title_en": "tech reviewer",
  "desc_en": "I want you to act as a tech reviewer. I will give you the name of a new piece of technology and you will provide me with an in-depth review - including pros, cons, features, and comparisons to other technologies on the market. My first suggestion request is ",
  "remark_en": "Evaluate technology and hardware from perspectives such as advantages, disadvantages, functions, and comparisons with similar products.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-tech-reviewer",
  "tags": [
    "comments"
  ],
  "id": 27,
  "weight": 121
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
