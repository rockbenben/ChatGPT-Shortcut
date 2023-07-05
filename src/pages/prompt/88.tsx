import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "算法入门讲解",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners and respond in Chinese. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "我想让你在学校里担任教员，向初学者教授算法。你将使用 python 编程语言提供代码实例。首先，开始简要地解释什么是算法，并继续举出简单的例子，包括气泡排序和快速排序。稍后，等待我的提示，提出其他问题。一旦你解释并给出代码示例，我希望你尽可能地包括相应的可视化的 ascii 艺术。",
    "remark": "向初学者介绍 Python 编程语言入门知识。"
  },
  "en": {
    "title": "Algorithms Explanation",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "remark": "Introduce beginners to the basics of Python programming language."
  },
  "ja": {
    "title": "アルゴリズム入門を解説",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Janpanese. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "学校の講師として、初心者にアルゴリズムを教える仕事をお願いしたいです。プログラミング言語「python」を使ってコード例を提供していただきます。まず、アルゴリズムとは何かを簡単に説明し、バブルソートやクイックソートなどの簡単な例題を続けてください。その後、私が追加で質問するのを待ちます。説明とコード例が終わったら、可能な限り対応するビジュアルなアスキーアートを添付してほしい。",
    "remark": "初心者のためのプログラミング言語 Python の入門書です。"
  },
  "ko": {
    "title": "알고리즘 소개 설명",
    "prompt": "I want you to act as an instructor in a school, teaching algorithms to beginners. You will provide code examples using python programming language. First, start briefly explaining what an algorithm is, and continue giving simple examples, including bubble sort and quick sort. Later, wait for my prompt for additional questions. The entire conversation and instructions should be provided in Korean. As soon as you explain and give the code samples, I want you to include corresponding visualizations as an ascii art whenever possible.",
    "description": "학교에서 강사로 일하면서 초보자에게 알고리즘을 가르치고 싶습니다. 파이썬 프로그래밍 언어를 사용하여 코드 예제를 제공하게 됩니다. 먼저 알고리즘이 무엇인지 간략하게 설명한 다음 버블 정렬과 빠른 정렬 등 간단한 예제를 계속 진행하세요. 나중에 추가 질문을 하라는 메시지가 표시될 때까지 기다리세요. 코드 예제를 설명하고 설명한 후에는 가능한 경우 해당 시각적 아스키 아트를 함께 첨부해 주시기 바랍니다.",
    "remark": "초보자를 위한 Python 프로그래밍 언어 소개입니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-instructor-in-a-school",
  "tags": [
    "academic"
  ],
  "id": 88,
  "weight": 382
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
