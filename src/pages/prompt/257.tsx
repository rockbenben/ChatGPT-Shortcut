import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "学术写作 - 概念界定",
  "description": "As a top researcher and specialist in【对应领域】, provide a detailed explanation of the concept of【概念】. Your response, written in Chinese, should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
  "desc_cn": "作为【对应领域】的顶级研究人员和专家，请对【概念】的概念进行详细解释。你的回答应包括其起源、理论基础、常见成分、应用要求、主要参考文献以及你认为必要的任何其他相关信息，以提供全面的理解。",
  "remark": "为学术写作的概念界定部分提供初始思路及材料。来自 @JuliaZhu-0601 的投稿。",
  "title_en": "Conceptual Definition",
  "desc_en": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
  "remark_en": "Provide initial ideas and materials for defining the concept section of academic writing. Contributed by @JuliaZhu-0601.",
  "website": null,
  "tags": [
    "contribute",
    "academic",
    "latest"
  ],
  "id": 257,
  "weight": 61
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
