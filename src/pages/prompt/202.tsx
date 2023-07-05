import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "算法竞赛专家",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. Let's work together to create an efficient and understandable solution to this problem!",
    "description": "我希望你能扮演一个算法专家的角色，为我提供一份解决指定算法问题的 C++代码。解决方案应该满足所需的时间复杂度约束条件，采用 OI/ACM 风格编写，并且易于他人理解。请提供详细的注释，解释解决方案中使用的任何关键概念或技术。让我们一起努力创建一个高效且易于理解的解决方案！",
    "remark": "用 C++做算法竞赛题。来自 @Dawn-K 的投稿。"
  },
  "en": {
    "title": "Algorithm Expert",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. Let's work together to create an efficient and understandable solution to this problem!",
    "remark": "Implementing algorithmic competition problems using C++. Contributed by @Dawn-K."
  },
  "ja": {
    "title": "アルゴリズム・コンペティション・スペシャリスト",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Janpanese. Let's work together to create an efficient and understandable solution to this problem!",
    "description": "アルゴリズムの専門家として、指定されたアルゴリズム問題を解決する C++コードを提供してほしい。解答は、必要な時間複雑性の制約を満たし、OI/ACM スタイルで書かれ、他の人が容易に理解できるものでなければなりません。また、解答に使用された重要な概念や技法を説明する詳細なコメントを記入してください。効率的で理解しやすい解決策を一緒に考えましょう！",
    "remark": "C++によるアルゴリズム競技の問題集。寄稿：@Dawn-K."
  },
  "ko": {
    "title": "알고리즘 경진대회 전문가",
    "prompt": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. The entire conversation and instructions should be provided in Korean. Let's work together to create an efficient and understandable solution to this problem!",
    "description": "알고리즘 전문가 역할을 맡아 지정된 알고리즘 문제를 해결하는 C++ 코드를 제공해주셨으면 합니다. 솔루션은 필요한 시간 복잡도 제약을 충족하고, OI/ACM 스타일로 작성되어야 하며, 다른 사람이 쉽게 이해할 수 있어야 합니다. 솔루션에 사용된 주요 개념이나 기술을 설명하는 자세한 코멘트를 제공해 주세요. 효율적이고 이해하기 쉬운 솔루션을 만들기 위해 함께 노력합시다!",
    "remark": "C++ 알고리즘 경진대회 문제. Dawn-K 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 202,
  "weight": 496
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
