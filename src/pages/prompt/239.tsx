import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "海量资料：一句话总结",
  "description": "Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [主题] while accurately reflecting the original content from the articles. Respond in Chinese.",
  "desc_cn": "结合前面 '@1'～'@3' 的文章内容，帮我设想一句描述 [主题] 的吸引人的文案，并且要呈现原始文章内容中最与众不同的特色。",
  "remark": "为文章撰写宣传性文案和标题。本方法摘自电脑玩物作者 Esor Huang 的文章。",
  "title_en": "Massive data: one-sentence summary",
  "desc_en": "Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
  "remark_en": "Craft promotional copy and title for your article. Excerpted from an article by Esor Huang.",
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 239,
  "weight": 379
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
