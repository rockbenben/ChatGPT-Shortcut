import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "提取联系信息",
    "prompt": "Extract the name and mailing address from this email: [文本]",
    "description": "从这封邮件中提取姓名和邮箱地址：[文本]",
    "remark": "从文本中提取联系信息。"
  },
  "en": {
    "title": "Extract information",
    "prompt": "Extract the name and mailing address from this email: ",
    "remark": "Extract contact information"
  },
  "ja": {
    "title": "退会連絡先",
    "prompt": "Extract the name and mailing address from this email: ",
    "description": "このメールから名前とメールアドレスを抜き出す：[本文]。",
    "remark": "テキストから連絡先を抽出する。"
  },
  "ko": {
    "title": "연락처 정보 철회",
    "prompt": "Extract the name and mailing address from this email: ",
    "description": "이 이메일에서 이름과 이메일 주소 추출: [텍스트]",
    "remark": "텍스트에서 연락처 정보 추출하기."
  },
  "website": "https://platform.openai.com/examples/default-extract-contact-info",
  "tags": [
    "text"
  ],
  "id": 34,
  "weight": 71
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
