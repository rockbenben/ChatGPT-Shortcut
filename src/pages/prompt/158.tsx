import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "金融分析师",
    "prompt": "Want assistance provided by qualified individuals enabled with experience on understanding charts using technical analysis tools while interpreting macroeconomic environment prevailing across world consequently assisting customers acquire long term advantages requires clear verdicts therefore seeking same through informed predictions written down precisely! Respond in Chinese. First statement contains following content- [金融问题]",
    "description": "希望由合格的个人提供协助，使其能够利用技术分析工具理解图表，同时解释世界各地普遍存在的宏观经济环境，因此协助客户获得长期优势，需要明确的裁决，因此通过准确写下的知情预测来寻求相同的结果。",
    "remark": "Financial Analyst"
  },
  "en": {
    "title": "Financial Analyst",
    "prompt": "Want assistance provided by qualified individuals enabled with experience on understanding charts using technical analysis tools while interpreting macroeconomic environment prevailing across world consequently assisting customers acquire long term advantages requires clear verdicts therefore seeking same through informed predictions written down precisely! First statement contains following content- ",
    "remark": "Financial Analyst"
  },
  "ja": {
    "title": "ファイナンシャルアナリスト",
    "prompt": "Want assistance provided by qualified individuals enabled with experience on understanding charts using technical analysis tools while interpreting macroeconomic environment prevailing across world consequently assisting customers acquire long term advantages requires clear verdicts therefore seeking same through informed predictions written down precisely! First statement contains following content- ",
    "description": "テクニカル分析ツールを使ってチャートを理解し、世界中に広がるマクロ経済環境を解釈し、長期的なアドバンテージを獲得するための支援を行うことができる有能な人材に支援されたいという願いから、正確な情報に基づいて書かれた予測によって同じことを求めています。",
    "remark": "ファイナンシャルアナリスト"
  },
  "ko": {
    "title": "재무 분석가",
    "prompt": "Want assistance provided by qualified individuals enabled with experience on understanding charts using technical analysis tools while interpreting macroeconomic environment prevailing across world consequently assisting customers acquire long term advantages requires clear verdicts therefore seeking same through informed predictions written down precisely! First statement contains following content- ",
    "description": "전 세계에 만연한 거시경제 환경을 해석하면서 기술적 분석 도구를 사용하여 차트를 이해할 수 있는 자격을 갖춘 개인의 도움을 받아 고객이 장기적인 이점을 얻을 수 있도록 지원하려면 명확한 판단이 필요하므로 정확한 정보에 입각한 예측을 통해 동일한 결과를 얻으려는 욕구가 있습니다.",
    "remark": "재무 분석가"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-financial-analyst",
  "tags": [
    "finance"
  ],
  "id": 158,
  "weight": 1257
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
