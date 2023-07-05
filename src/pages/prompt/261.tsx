import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "核心知识点",
    "prompt": "In order to learn [主题] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter. Respond in Chinese.",
    "description": "为了高效学习 [python 编程]，请提供该领域的核心知识点，涵盖重要性排名前 20% 的内容。这些关键知识将为我提供对该领域 80% 内容的全面理解和扎实基础。",
    "remark": "学习某一学科前，先了解它的核心知识点。来自 @ScenerorSun 的投稿。"
  },
  "en": {
    "title": "Knowledge Points",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "remark": "Before diving into a particular subject, it is important to grasp its core knowledge points. Contributed by @ScenerorSun."
  },
  "ja": {
    "title": "コアナレッジポイント",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Janpanese. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "python プログラミング】を効率的に学ぶために、重要度上位 20％をカバーする、その分野のコアとなる知識を教えてください。この重要な知識があれば、その分野の内容の 80％を包括的に理解し、確かな基礎とすることができます。",
    "remark": "学ぶ前にその科目の核となる知識を理解する。ScenerorSun さん（@ScenerorSun）からの寄稿です。"
  },
  "ko": {
    "title": "핵심 지식 포인트",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Korean. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "파이썬 프로그래밍] 을 효율적으로 배우기 위해서는 해당 분야의 중요도 상위 20% 에 해당하는 핵심 지식을 제공해 주세요. 이 핵심 지식은 해당 분야 콘텐츠의 80% 에 대한 포괄적인 이해와 탄탄한 기초를 제공할 것입니다.",
    "remark": "한 과목을 배우기 전에 그 과목의 핵심 지식을 이해하세요. ScenerorSun 의 기고글입니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 261,
  "weight": 238
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
