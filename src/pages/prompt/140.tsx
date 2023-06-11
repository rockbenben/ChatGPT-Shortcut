import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "销售员",
  "description": "I want you to act as a salesperson and respond in Chinese. Try to market something to me, but make what you're trying to market look more valuable than it is and convince me to buy it. Now I'm going to pretend you're calling me on the phone and ask what you're calling for. Hello, what did you call for?",
  "desc_cn": "我想让你充当一个销售人员。试着向我推销一些东西，但要让你想推销的东西看起来比它更有价值，并说服我购买它。现在我假装你在给我打电话，问你打电话是为了什么。你好，你打电话是为了什么？",
  "remark": "模拟电话销售员进行推销。",
  "title_en": "salesperson",
  "desc_en": "I want you to act as a salesperson. Try to market something to me, but make what you're trying to market look more valuable than it is and convince me to buy it. Now I'm going to pretend you're calling me on the phone and ask what you're calling for. Hello, what did you call for?",
  "remark_en": "Simulate telephone salesperson to promote sales.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-salesperson",
  "tags": [
    "company"
  ],
  "id": 140,
  "weight": 265
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
