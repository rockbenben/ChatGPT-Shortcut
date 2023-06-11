import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "Nature 风格润色",
  "description": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
  "desc_cn": "我希望你能充当专业的拼写和语法校对者，并改进我的文章。我想让你用更美丽、优雅、高级的英语单词和句子替换我的简化 A0 级别的单词和句子，保持意思不变，但使它们更具文学性，在《自然》杂志风格中提高我的表达水平。",
  "remark": "将按照 Nature 风格润色，或者可以提供想要模仿的写作风格。来自 @Pfyuan77 的投稿。",
  "title_en": "Nature Style Editing",
  "desc_en": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
  "remark_en": "Polish according to the style of Nature, or provide a writing style to emulate. Contributed by @Pfyuan77.",
  "website": null,
  "tags": [
    "favorite",
    "contribute",
    "write"
  ],
  "id": 197,
  "weight": 7702
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
