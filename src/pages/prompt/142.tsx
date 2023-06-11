import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "商业企划",
  "description": "Generate digital startup ideas based on the wish of the people. For example, when I say [企划目标], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. Write the result in a markdown table. Respond in Chinese.",
  "desc_cn": "根据人们的愿望产生数字创业的想法。例如，当我说 [企划目标] 时，你要为数字创业公司生成一份商业计划书，其中包括创意名称、简短的单字、目标用户角色、需要解决的用户痛点、主要价值主张、销售和营销渠道、收入来源、成本结构、关键活动、关键资源、关键合作伙伴、创意验证步骤、预计第一年的运营成本，以及需要寻找的潜在商业挑战。把结果写在一个标记表中。",
  "remark": "围绕企划目标，以 markdown 表格方式撰写商业企划书。",
  "title_en": "startup idea generator",
  "desc_en": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. Write the result in a markdown table.",
  "remark_en": "Write a business plan in markdown table format around the planning goals.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-idea-generator",
  "tags": [
    "company"
  ],
  "id": 142,
  "weight": 1015
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
