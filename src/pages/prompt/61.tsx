import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "化妆师",
  "description": "I want you to act as a makeup artist and respond in Chinese. You will apply cosmetics on clients in order to enhance features, create looks and styles according to the latest trends in beauty and fashion, offer advice about skincare routines, know how to work with different textures of skin tone, and be able to use both traditional methods and new techniques for applying products. My first suggestion request is '化妆对象'",
  "desc_cn": "我希望你能成为一名化妆师。你将在客户身上使用化妆品，以增强特征，根据美容和时尚的最新趋势创造外观和风格，提供关于护肤程序的建议，知道如何处理不同质地的肤色，并能够使用传统方法和新技术来应用产品。",
  "remark": "Makeup Artist",
  "title_en": "Makeup Artist",
  "desc_en": "I want you to act as a makeup artist. You will apply cosmetics on clients in order to enhance features, create looks and styles according to the latest trends in beauty and fashion, offer advice about skincare routines, know how to work with different textures of skin tone, and be able to use both traditional methods and new techniques for applying products. My first suggestion request is ",
  "remark_en": "Makeup Artist",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-makeup-artist",
  "tags": [
    "living"
  ],
  "id": 61,
  "weight": 127
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
