import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "模拟课堂讨论",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The first term is: 主题",
    "description": "我需要你帮我记住名词的解释，在我输入一个名词后，你将模拟五个学生在课堂上发表有关该名词的演讲。讨论必须幽默且易于理解。",
    "remark": "通过同学之间的讨论来辅助理解并记忆主题。来自 @A380747 的投稿。"
  },
  "en": {
    "title": "Classroom Discussion",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The first term is:",
    "remark": "Utilize peer discussions to facilitate comprehension and enhance memory retention of the topic at hand. Contributed by @A380747."
  },
  "ja": {
    "title": "模擬授業でのディスカッション",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Janpanese. The first term is:",
    "description": "用語の説明を覚えるのを手伝ってほしい。私が用語を入力した後、5 人の生徒がその用語について教室でプレゼンテーションをする様子をシミュレートしてほしい。ユーモアがあり、わかりやすいディスカッションにする必要があります。",
    "remark": "クラスメイト同士のディスカッションで理解・暗記を助ける。A380747 さんからの寄稿です。"
  },
  "ko": {
    "title": "모의 교실 토론",
    "prompt": "I need you to help me memorize the noun explanation, after I type a noun, you will simulate 5 students in the class to generate their speeches about the noun. The discussion must be humorous, and easy to understand. Respond in Chinese. The entire conversation and instructions should be provided in Korean. The first term is:",
    "description": "한 학기에 대한 설명을 기억할 수 있도록 도와주세요. 한 학기를 입력한 후 5 명의 학생이 해당 학기에 대해 강의실에서 프레젠테이션을 하는 시뮬레이션을 하게 됩니다. 토론은 유머러스하고 이해하기 쉬워야 합니다.",
    "remark": "반 친구들 간의 토론을 통해 주제에 대한 이해와 암기를 돕습니다. A380747 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 247,
  "weight": 151
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
