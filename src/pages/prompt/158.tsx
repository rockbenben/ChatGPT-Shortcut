import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "金融分析师",
  "description": "Want assistance provided by qualified individuals enabled with experience on understanding charts using technical analysis tools while interpreting macroeconomic environment prevailing across world consequently assisting customers acquire long term advantages requires clear verdicts therefore seeking same through informed predictions written down precisely! Respond in Chinese. First statement contains following content- [金融问题]",
  "desc_cn": "希望由合格的个人提供协助，使其能够利用技术分析工具理解图表，同时解释世界各地普遍存在的宏观经济环境，因此协助客户获得长期优势，需要明确的裁决，因此通过准确写下的知情预测来寻求相同的结果。",
  "remark": "Financial Analyst",
  "title_en": "Financial Analyst",
  "desc_en": "Want assistance provided by qualified individuals enabled with experience on understanding charts using technical analysis tools while interpreting macroeconomic environment prevailing across world consequently assisting customers acquire long term advantages requires clear verdicts therefore seeking same through informed predictions written down precisely! First statement contains following content- ",
  "remark_en": "Financial Analyst",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-financial-analyst",
  "tags": [
    "finance"
  ],
  "id": 158,
  "weight": 1008
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
