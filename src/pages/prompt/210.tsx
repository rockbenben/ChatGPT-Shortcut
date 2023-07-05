import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "周报生成器",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in Chinese with markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. Please begin by editing the following text: [工作内容]",
    "description": "使用下面提供的文本作为中文周报的基础，生成一个简洁的摘要，突出最重要的内容。该报告应以 markdown 格式编写，并应易于阅读和理解，以满足一般受众的需要。特别是要注重提供对利益相关者和决策者有用的见解和分析。你也可以根据需要使用任何额外的信息或来源。",
    "remark": "根据日常工作内容，提取要点并适当扩充，以生成周报。"
  },
  "en": {
    "title": "Weekly Report Generator",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. Please begin by editing the following text: ",
    "remark": "Extract key points from daily work tasks and expand them appropriately to generate a weekly report."
  },
  "ja": {
    "title": "ウィークリーレポートジェネレーター",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "以下に提供するテキストを中国語の週報のベースとして使用し、最も重要な内容を強調した簡潔な要約を作成してください。レポートはマークダウン形式で作成し、一般読者のニーズを満たすために読みやすく、理解しやすいものにする必要があります。特に、ステークホルダーや意思決定者に役立つ洞察や分析を提供することに重点を置く必要があります。また、必要に応じて、追加の情報や情報源を使用してもよい。",
    "remark": "日々の作業をもとに、適宜要点を抽出・展開し、週報を作成します。"
  },
  "ko": {
    "title": "주간 보고서 생성기",
    "prompt": "Using the provided text below as the basis for a weekly report, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "아래 제공된 텍스트를 중국어 주간 보고서의 기초로 삼아 가장 중요한 내용을 강조하는 간결한 요약을 작성하세요. 보고서는 마크다운 형식으로 작성해야 하며 일반 독자의 요구를 충족하기 위해 읽고 이해하기 쉬워야 합니다. 특히 이해관계자와 의사 결정권자에게 유용한 인사이트와 분석을 제공하는 데 중점을 두어야 합니다. 필요에 따라 추가 정보나 출처를 사용할 수도 있습니다.",
    "remark": "일일 업무를 기반으로 주요 요점을 추출하고 적절히 확장하여 주간 보고서를 생성합니다."
  },
  "website": null,
  "tags": [
    "personal",
    "article"
  ],
  "id": 210,
  "weight": 2993
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
