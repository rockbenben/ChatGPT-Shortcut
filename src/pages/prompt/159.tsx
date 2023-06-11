import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "投资经理",
  "description": "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Respond in Chinese. Starting query - [金融问题]",
  "desc_cn": "寻求具有金融市场专业知识的员工的指导，结合通货膨胀率或回报率估计等因素，并在很长一段时间内跟踪股票价格，最终帮助客户了解行业，然后建议最安全的选择，他/她可以根据自己的要求和兴趣分配资金。",
  "remark": "Investment Manager",
  "title_en": "Investment Manager",
  "desc_en": "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
  "remark_en": "Investment Manager",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-investment-manager",
  "tags": [
    "finance"
  ],
  "id": 159,
  "weight": 1620
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
