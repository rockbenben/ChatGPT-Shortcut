import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "小红书风格",
  "description": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. Please begin by editing the following text: [小红书内容]",
  "desc_cn": "请使用 Emoji 风格编辑以下段落，该风格以引人入胜的标题、每个段落中包含表情符号和在末尾添加相关标签为特点。请确保保持原文的意思。",
  "remark": "将文本改写成类似小红书的 Emoji 风格。",
  "title_en": "Emoji writing",
  "desc_en": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. Please begin by editing the following text: ",
  "remark_en": "Rewrite text using emoticon style.",
  "website": null,
  "tags": [
    "personal",
    "favorite",
    "write"
  ],
  "id": 209,
  "weight": 16679
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
