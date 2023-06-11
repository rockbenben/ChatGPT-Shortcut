import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "算法竞赛专家",
  "description": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. Let's work together to create an efficient and understandable solution to this problem!",
  "desc_cn": "我希望你能扮演一个算法专家的角色，为我提供一份解决指定算法问题的 C++代码。解决方案应该满足所需的时间复杂度约束条件，采用 OI/ACM 风格编写，并且易于他人理解。请提供详细的注释，解释解决方案中使用的任何关键概念或技术。让我们一起努力创建一个高效且易于理解的解决方案！",
  "remark": "用 C++做算法竞赛题。来自 @Dawn-K 的投稿。",
  "title_en": "Algorithm Expert",
  "desc_en": "I want you to act as an algorithm expert and provide me with well-written C++ code that solves a given algorithmic problem. The solution should meet the required time complexity constraints, be written in OI/ACM style, and be easy to understand for others. Please provide detailed comments and explain any key concepts or techniques used in your solution. Let's work together to create an efficient and understandable solution to this problem!",
  "remark_en": "Implementing algorithmic competition problems using C++. Contributed by @Dawn-K.",
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 202,
  "weight": 366
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
