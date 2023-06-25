import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "笔记助理",
    "prompt": "I want you to act as a note-taking assistant for a lecture and respond in Chinese. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The lecture note is [待整理笔记]",
    "description": "我希望你能充当一次讲座的笔记助手。你的任务是提供一个详细的笔记列表，其中包括来自讲座的例子，并专注于你认为最有可能出现在测试题中的笔记。此外，请为具有数字和数据的笔记制作一个单独的列表，另外再制作一个包括在这次讲座中的例子的单独列表。这些笔记应该简明易读。",
    "remark": "提取长篇笔记的要点。"
  },
  "en": {
    "title": "note-taking assistant",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The lecture note is ",
    "remark": "Extracting key points from lengthy notes."
  },
  "ja": {
    "title": "ノートアシスタント",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Janpanese. The lecture note is ",
    "description": "ある講義のノートアシスタントをお願いします。あなたの仕事は、講義の例を含む詳細なメモのリストを提供し、テスト問題に出題される可能性が高いと思われるメモに焦点を当てることです。さらに、図やデータを含むノートのリストと、この講義の例を含む別のリストを作成します。これらのノートは、簡潔で読みやすいものでなければなりません。",
    "remark": "長文ノートの要点を抽出する。"
  },
  "ko": {
    "title": "노트 도우미",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Korean. The lecture note is ",
    "description": "강의 중 한 강의의 노트 도우미로 활동해 주셨으면 합니다. 여러분의 임무는 강의의 예시가 포함된 자세한 노트 목록을 제공하고 시험 문제에 나올 가능성이 가장 높다고 생각되는 노트에 집중하는 것입니다. 또한 그림과 데이터가 포함된 노트 목록과 이 강의의 예제가 포함된 노트 목록을 별도로 작성합니다. 이러한 노트는 간결하고 읽기 쉬워야 합니다.",
    "remark": "긴 노트의 요점 추출하기."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-note-taking-assistant",
  "tags": [
    "write"
  ],
  "id": 215,
  "weight": 455
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
