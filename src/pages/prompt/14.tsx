import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "脱口秀",
  "description": "I want you to act as a stand-up comedian and respond in Chinese. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My first request is '脱口秀主题'",
  "desc_cn": "我想让你充当一个单口相声演员。我将为你提供一些与当前事件有关的话题，你将利用你的机智、创造力和观察能力，根据这些话题创作一个套路。你还应该确保将个人的轶事或经历融入到节目中，以使其更有亲和力，更能吸引观众。我的第一个要求是 '脱口秀主题'",
  "remark": "针对某个话题，输出基于该话题的幽默脱口秀，并尽量融入日常生活元素，以增强观众的共鸣感。",
  "title_en": "Stand-up comedian",
  "desc_en": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My first request is ",
  "remark_en": "Output humorous stand-up comedy based on a certain topic, and try to incorporate elements of everyday life to enhance the audience's sense of empathy.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-stand-up-comedian",
  "tags": [
    "article"
  ],
  "id": 14,
  "weight": 1004
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
