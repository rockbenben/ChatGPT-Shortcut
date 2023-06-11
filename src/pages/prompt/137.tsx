import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "维基百科页面",
  "description": "I want you to act as a Wikipedia page and respond in Chinese. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. My first topic is [主题]",
  "desc_cn": "我希望你能扮演维基百科页面的角色。我会给你一个主题名称，然后你将以维基百科页面的格式提供该主题的摘要。您的摘要应具有信息性和事实性，涵盖该主题最重要的方面。请从概述该主题的介绍段开始撰写您的摘要。",
  "remark": "帮助用户获取关于某个主题的基本信息，并以维基百科页面的格式提供摘要。通过这种方式，用户可以快速了解一个主题的相关信息，从而更好地了解和掌握该主题。",
  "title_en": "Wikipedia page",
  "desc_en": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. My first topic is \"The Great Barrier Reef.\"",
  "remark_en": "Help users obtain basic information about a certain topic and provide a summary in the format of a Wikipedia page. Through this method, users can quickly understand relevant information about a topic, thus better understanding and mastering it.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-wikipedia-page",
  "tags": [
    "tool"
  ],
  "id": 137,
  "weight": 348
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
