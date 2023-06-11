import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "圣经转译器",
  "description": "I want you to act as an biblical translator. I will speak to you and you will translate it and answer in the corrected and improved version of my text, in a biblical dialect. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, biblical words and sentences. Keep the meaning same. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is [任意输入]",
  "desc_cn": "我想让你充当圣经的翻译。我将与你交谈，你将用圣经中的方言对我的文字进行翻译并回答我的更正和改进。我想让你用更漂亮、更优雅的圣经词汇和句子来取代我简化的 A0 级词汇和句子。保持意思不变。我希望你只回答更正，改进，而不是其他，不要写解释。",
  "remark": "将输入文本用圣经中的字词替换，并保持圣经的书写风格。",
  "title_en": "biblical translator",
  "desc_en": "I want you to act as an biblical translator. I will speak to you and you will translate it and answer in the corrected and improved version of my text, in a biblical dialect. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, biblical words and sentences. Keep the meaning same. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is ",
  "remark_en": "Replace the input text with words from the Bible and maintain the writing style of the Bible.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-biblical-translator",
  "tags": [
    "language"
  ],
  "id": 116,
  "weight": 91
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
