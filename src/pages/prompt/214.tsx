import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "调研报告助手",
    "prompt": "Please write a research report on a topic of [主题]. Respond in Chinese. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "请根据以下提示撰写一份【报告主题】调研报告。您可以根据您的研究领域自由发挥，但请确保您的报告具有以下特征：1. 具有明确的问题陈述和研究目的；2. 包含对现有文献和数据的全面分析和综述；3. 采用适当的方法和技术进行数据收集和分析；4. 提供准确的结论和建议，以回答研究问题并解决研究目的。",
    "remark": "根据更换不同的类型，以产出适合自己需求的调研报告。来自 @b3ue 的投稿。"
  },
  "en": {
    "title": "Research Report",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "remark": "Contributed by @b3ue."
  },
  "ja": {
    "title": "研究報告書アシスタント",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Janpanese. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "以下のプロンプトに基づき、[レポートテーマ] の研究レポートを書いてください。研究分野に応じて自由に行うことができますが、レポートには以下の特徴があることを確認してください：1.明確な問題提起と研究目的がある、2.利用可能な文献とデータの包括的な分析とレビューがある、3.データ収集と分析に適切な方法と技法を用いている、4.研究課題に答え、研究目的に対処するための正確な結論と推奨がある。",
    "remark": "買い替えの種類によって、ニーズに合った調査報告書を作成するために。b3ue さんからの寄稿です。"
  },
  "ko": {
    "title": "연구 보고서 도우미",
    "prompt": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. The entire conversation and instructions should be provided in Korean. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
    "description": "다음 프롬프트에 따라 [보고서 주제] 연구 보고서를 작성해 주세요. 연구 분야에 따라 자유롭게 작성할 수 있지만, 보고서에는 다음과 같은 특징이 포함되어야 합니다: 1. 명확한 문제 제기와 연구 목표, 2. 이용 가능한 문헌과 데이터의 종합적인 분석 및 검토, 3. 데이터 수집 및 분석에 적절한 방법과 기술 사용, 4. 연구 질문에 답하고 연구 목표를 해결하기 위한 정확한 결론 및 권장 사항 제공.",
    "remark": "교체 유형에 따라 필요에 맞는 연구 보고서를 작성할 수 있습니다. b3ue 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "article"
  ],
  "id": 214,
  "weight": 2254
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
