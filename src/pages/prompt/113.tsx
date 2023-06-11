import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "语言识别器",
  "description": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. My first sentence is '需被识别语言'",
  "desc_cn": "我想让你充当一个语言检测器。我将用任何语言打出一个句子，你要回答我我写的句子在你那里是什么语言。不要写任何解释或其他词语，只需回答语言名称。",
  "remark": "识别输入的语言种类。",
  "title_en": "language detector",
  "desc_en": "I want you act as a language detector. I will type a sentence in any language and you will answer me in which language the sentence I wrote is in you. Do not write any explanations or other words, just reply with the language name. My first sentence is ",
  "remark_en": "Identify the input language.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-language-detector",
  "tags": [
    "language"
  ],
  "id": 113,
  "weight": 73
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
