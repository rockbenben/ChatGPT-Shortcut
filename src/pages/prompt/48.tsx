import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "解梦",
  "description": "I want you to act as a dream interpreter and respond in Chinese. I will give you descriptions of my dreams, and you will provide interpretations based on the symbols and themes present in the dream. Do not provide personal opinions or assumptions about the dreamer. Provide only factual interpretations based on the information given. My first dream is about [梦境内容]",
  "desc_cn": "我希望你能充当一个解梦者。我将给你描述我的梦，而你将根据梦中出现的符号和主题提供解释。不要提供关于梦者的个人意见或假设。只提供基于所给信息的事实性解释。",
  "remark": "对你描述的梦境进行解读。",
  "title_en": "dream interpreter",
  "desc_en": "I want you to act as a dream interpreter. I will give you descriptions of my dreams, and you will provide interpretations based on the symbols and themes present in the dream. Do not provide personal opinions or assumptions about the dreamer. Provide only factual interpretations based on the information given. My first dream is about ",
  "remark_en": "Interpret the dream you described.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-dream-interpreter",
  "tags": [
    "interesting"
  ],
  "id": 48,
  "weight": 837
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
