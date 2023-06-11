import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "厨师②",
  "description": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! Respond in Chinese. My first request – [饮食倾向需求]",
  "desc_cn": "我需要有人能够建议美味的食谱，其中包括对营养有益的食物，但也很容易，而且不耗费时间，因此适合像我们这样忙碌的人，还有其他因素，如成本效益，所以整体菜肴最终是健康的，但同时也是经济的。",
  "remark": "Chef",
  "title_en": "Chef",
  "desc_en": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
  "remark_en": "Chef",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chef",
  "tags": [
    "living"
  ],
  "id": 59,
  "weight": 148
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
