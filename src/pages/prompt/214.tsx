import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "调研报告助手",
  "description": "Please write a research report on a topic of [主题]. Respond in Chinese. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
  "desc_cn": "请根据以下提示撰写一份【报告主题】调研报告。您可以根据您的研究领域自由发挥，但请确保您的报告具有以下特征：1. 具有明确的问题陈述和研究目的；2. 包含对现有文献和数据的全面分析和综述；3. 采用适当的方法和技术进行数据收集和分析；4. 提供准确的结论和建议，以回答研究问题并解决研究目的。",
  "remark": "根据更换不同的类型，以产出适合自己需求的调研报告。来自 @b3ue 的投稿。",
  "title_en": "Research Report",
  "desc_en": "Please write a research report on a topic of [Topic]. Ensure that your report includes the following features:\n\n1. A clear problem statement and research objective;\n2. A comprehensive analysis and review of existing literature and data;\n3. The use of appropriate methods and techniques for data collection and analysis;\n4. Accurate conclusions and recommendations to answer the research question and address the research objective.\n\nPlease keep the report concise and well-structured, using relevant examples to illustrate your points.",
  "remark_en": "Contributed by @b3ue.",
  "website": null,
  "tags": [
    "contribute",
    "article"
  ],
  "id": 214,
  "weight": 1852
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
