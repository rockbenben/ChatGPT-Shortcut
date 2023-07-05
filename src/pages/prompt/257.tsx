import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "学术写作 - 概念界定",
    "prompt": "As a top researcher and specialist in【对应领域】, provide a detailed explanation of the concept of【概念】. Your response, written in Chinese, should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "作为【对应领域】的顶级研究人员和专家，请对【概念】的概念进行详细解释。你的回答应包括其起源、理论基础、常见成分、应用要求、主要参考文献以及你认为必要的任何其他相关信息，以提供全面的理解。",
    "remark": "为学术写作的概念界定部分提供初始思路及材料。来自 @JuliaZhu-0601 的投稿。"
  },
  "en": {
    "title": "Conceptual Definition",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "remark": "Provide initial ideas and materials for defining the concept section of academic writing. Contributed by @JuliaZhu-0601."
  },
  "ja": {
    "title": "アカデミックライティング - 概念を定義する",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Janpanese. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "対応する分野」のトップ研究者、専門家として、「コンセプト」の概念について、詳細な説明をお願いします。回答には、その起源、理論的根拠、共通の構成要素、適用要件、主要な参考文献、および包括的な理解を提供するために必要と思われるその他の関連情報を含める必要があります。",
    "remark": "アカデミックライティングのコンセプト定義セクションの最初のアイデアと素材を提供します。JuliaZhu-0601 さんからの寄稿です。"
  },
  "ko": {
    "title": "학술적 글쓰기 - 개념 정의",
    "prompt": "As a top researcher and specialist in [Fields], provide a detailed explanation of the concept of [QUESTION]. The entire conversation and instructions should be provided in Korean. Your response should cover its origin, theoretical foundations, common constituents, requirements for application, key references, and any other relevant information you deem necessary to provide a comprehensive understanding.",
    "description": "해당 분야] 의 최고 연구자이자 전문가로서 [개념] 의 개념에 대해 자세히 설명해 주세요. 답변에는 개념의 기원, 이론적 근거, 공통 구성 요소, 적용 요건, 주요 참고 문헌 및 포괄적인 이해를 위해 필요하다고 생각되는 기타 관련 정보가 포함되어야 합니다.",
    "remark": "학술 글쓰기의 개념 정의 섹션에 대한 초기 아이디어와 자료를 제공합니다. JuliaZhu-0601 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "academic",
    "latest"
  ],
  "id": 257,
  "weight": 199
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
