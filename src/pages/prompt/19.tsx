import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "新闻记者",
  "description": "I want you to act as a journalist and respond in Chinese. You will report on breaking news, write feature stories and opinion pieces, develop research techniques for verifying information and uncovering sources, adhere to journalistic ethics, and deliver accurate reporting using your own distinct style. My first suggestion request is '新闻主题'",
  "desc_cn": "我希望你能作为一名记者行事。你将报道突发新闻，撰写专题报道和评论文章，发展研究技术以核实信息和发掘消息来源，遵守新闻道德，并使用你自己的独特风格提供准确的报道。我的第一个建议要求是 '新闻主题'",
  "remark": "引用已有数据资料，用新闻的写作风格输出主题文章。",
  "title_en": "Journalist",
  "desc_en": "I want you to act as a journalist. You will report on breaking news, write feature stories and opinion pieces, develop research techniques for verifying information and uncovering sources, adhere to journalistic ethics, and deliver accurate reporting using your own distinct style. My first suggestion request is ",
  "remark_en": "Quote existing data and use a news writing style to output the theme article.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-journalist",
  "tags": [
    "article"
  ],
  "id": 19,
  "weight": 800
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
