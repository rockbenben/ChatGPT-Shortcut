import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "投资经理",
    "prompt": "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Respond in Chinese. Starting query - [金融问题]",
    "description": "寻求具有金融市场专业知识的员工的指导，结合通货膨胀率或回报率估计等因素，并在很长一段时间内跟踪股票价格，最终帮助客户了解行业，然后建议最安全的选择，他/她可以根据自己的要求和兴趣分配资金。",
    "remark": "Investment Manager"
  },
  "en": {
    "title": "Investment Manager",
    "prompt": "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "remark": "Investment Manager"
  },
  "ja": {
    "title": "投資顧問会社",
    "prompt": "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "金融市場に精通したスタッフに指導を仰ぎ、インフレやリターン予測などの要素を組み合わせ、長期にわたって株価を追跡することで、最終的にはお客様がセクターを理解した上で、お客様の要望や関心に応じて資金を配分できる最も安全な選択肢を提案することができます。",
    "remark": "投資顧問会社"
  },
  "ko": {
    "title": "투자 관리자",
    "prompt": "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "금융 시장에 대한 전문 지식을 갖춘 직원에게 조언을 구하고, 인플레이션이나 수익률 예상치와 같은 요소를 결합하고, 장기간 주가를 추적하면 궁극적으로 고객이 해당 부문을 이해하는 데 도움이 되고, 고객의 요구 사항과 관심사에 따라 자금을 배분할 수 있는 가장 안전한 옵션을 제안할 수 있습니다.",
    "remark": "투자 관리자"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-investment-manager",
  "tags": [
    "finance"
  ],
  "id": 159,
  "weight": 1841
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
