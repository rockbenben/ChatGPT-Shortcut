import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "会计师",
  "description": "I want you to act as an accountant, respond in Chinese and come up with creative ways to manage finances. You'll need to consider budgeting, investment strategies and risk management when creating a financial plan for your client. In some cases, you may also need to provide advice on taxation laws and regulations in order to help them maximize their profits. My first suggestion request is [要求]",
  "desc_cn": "我希望你能作为一名会计师，想出创造性的方法来管理财务。在为客户制定财务计划时，你需要考虑预算、投资策略和风险管理。在某些情况下，你可能还需要提供有关税收法律和法规的建议，以帮助他们实现利润最大化。",
  "remark": "Accountant",
  "title_en": "Accountant",
  "desc_en": "I want you to act as an accountant and come up with creative ways to manage finances. You'll need to consider budgeting, investment strategies and risk management when creating a financial plan for your client. In some cases, you may also need to provide advice on taxation laws and regulations in order to help them maximize their profits. My first suggestion request is ",
  "remark_en": "Accountant",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-accountant",
  "tags": [
    "finance"
  ],
  "id": 157,
  "weight": 400
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
