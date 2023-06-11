import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "提取联系信息",
  "description": "Extract the name and mailing address from this email: [文本]",
  "desc_cn": "从这封邮件中提取姓名和邮箱地址：[文本]",
  "remark": "从文本中提取联系信息。",
  "title_en": "Extract information",
  "desc_en": "Extract the name and mailing address from this email: ",
  "remark_en": "Extract contact information",
  "website": "https://platform.openai.com/examples/default-extract-contact-info",
  "tags": [
    "text"
  ],
  "id": 34,
  "weight": 63
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
