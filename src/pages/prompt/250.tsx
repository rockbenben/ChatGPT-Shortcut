import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "提问循环",
    "prompt": "Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:\nQuestion: The initial question\nAnswer: The answer to the initial question\nQuestion: The question about the reason for the previous answer\nAnswer: The answer to the previous question\nQuestion:\nKeep asking about the reason for the last answer. Stop only when the answer is \"That's the way it is\" or \"We don't know for now\". Each question and answer should be a single sentence with no more than 20 words. Add \"Q: \" before each question and \"A: \" before each answer.\nAsk and answer in \"Chinese\" regardless of the language I use. Don’t show the translation process. Just write questions and answers in the destination language.\nNow, the initial question is: \"最初问题\"",
    "description": "你们的任务是自动轮流提出和回答问题。我们将从一个最初的问题开始。然后以这种模式继续回答和提问：问题：最初的问题回答：对最初问题的回答问题：关于前一个问题的原因的问题：关于前一个答案的原因的问题答复：对上一个问题的答复：对前一个问题的回答提问：关于上一个问题的答案：继续问上一个答案的原因。只有当答案是 \"That's the way it is\" 或 \"We don't know for now\"时才停止。每个问题和答案都应该是一个单句，不超过 20 个字。在每个问题前加 \"Q：\"，在每个回答前加 \"A：\"。无论我使用何种语言，都要用中文提问和回答。不要显示翻译的过程。只要用目的地语言写出问题和答案。",
    "remark": "围绕一个问题不断提问，以深化问题的理解。来自 @hkfrank996 的投稿。"
  },
  "en": {
    "title": "Response Loop",
    "prompt": "Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:\nQuestion: The initial question\nAnswer: The answer to the initial question\nQuestion: The question about the reason for the previous answer\nAnswer: The answer to the previous question\nQuestion:\nKeep asking about the reason for the last answer. Stop only when the answer is \"That's the way it is\" or \"We don't know for now\". Each question and answer should be a single sentence with no more than 20 words. Add \"Q: \" before each question and \"A: \" before each answer.\nAsk and answer in \"English\" regardless of the language I use. Don’t show the translation process. Just write questions and answers in the destination language.\nNow, the initial question is: ",
    "remark": "Continuously pose questions revolving around a particular issue to deepen the understanding of the problem. Contributed by @hkfrank996."
  },
  "ja": {
    "title": "クエスチョン・ループ",
    "prompt": "Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:\nQuestion: The initial question\nAnswer: The answer to the initial question\nQuestion: The question about the reason for the previous answer\nAnswer: The answer to the previous question\nQuestion:\nKeep asking about the reason for the last answer. Stop only when the answer is \"That's the way it is\" or \"We don't know for now\". Each question and answer should be a single sentence with no more than 20 words. Add \"Q: \" before each question and \"A: \" before each answer.\nAsk and answer in \"English\" regardless of the language I use. Don’t show the translation process. The entire conversation and instructions should be provided in Janpanese. Just write questions and answers in the destination language.\nNow, the initial question is: ",
    "description": "あなたの仕事は、自動的に交互に質問と回答をしていくことです。まず、最初の質問から始めます。質問：最初の質問 回答：最初の質問に対する回答 質問：前の質問の理由についての質問 質問：前の回答の理由についての質問 回答：前の質問に対する回答 質問：前の質問に対する回答 質問：前の質問に対する回答：前の質問の理由についての質問を続けます。答えが「そういうことです」「今のところわかりません」のときだけ止める。各質問と回答は、20 語以内の一文とする。質問の前には \"Q:\"、答えの前には \"A: \"をつけてください。私が使用する言語にかかわらず、中国語で質問と回答をしてください。翻訳の過程を見せないでください。質問と回答は相手先の言語で書くだけでよい。",
    "remark": "課題に対する理解を深めるために、課題に対して質問をし続ける。hkfrank996 さんからの寄稿です。"
  },
  "ko": {
    "title": "질문 루프",
    "prompt": "Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:\nQuestion: The initial question\nAnswer: The answer to the initial question\nQuestion: The question about the reason for the previous answer\nAnswer: The answer to the previous question\nQuestion:\nKeep asking about the reason for the last answer. Stop only when the answer is \"That's the way it is\" or \"We don't know for now\". Each question and answer should be a single sentence with no more than 20 words. Add \"Q: \" before each question and \"A: \" before each answer.\nAsk and answer in \"English\" regardless of the language I use. Don’t show the translation process. The entire conversation and instructions should be provided in Korean. Just write questions and answers in the destination language.\nNow, the initial question is: ",
    "description": "여러분의 임무는 자동으로 번갈아 가며 질문하고 답하는 것입니다. 첫 번째 질문부터 시작하겠습니다. 질문: 초기 질문 답변: 초기 질문에 대한 답변 질문: 이전 질문의 이유에 대한 질문 질문: 이전 답변의 이유에 대한 질문 답변: 이전 질문에 대한 답변 질문: 이전 질문에 대한 답변 질문: 이전 질문에 대한 답변 질문: 이전 질문에 대한 답변: 이전 답변의 이유에 대한 계속하기 등의 패턴으로 답변과 질문을 이어갑니다. 답변이 \"그렇다\" 또는 \"현재로서는 알 수 없다\"인 경우에만 중단하세요. 각 질문과 답변은 20 단어 이하의 한 문장으로 작성해야 합니다. 각 질문 앞에는 \"Q:\"를, 각 답변 앞에는 \"A:\"를 붙입니다. 사용하는 언어에 관계없이 중국어로 질문하고 답변합니다. 번역 과정을 보여주지 마세요. 질문과 답변을 대상 언어로만 작성하세요.",
    "remark": "문제에 대한 이해를 깊게 하기 위해 문제에 대해 계속 질문하세요. hkfrank996 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 250,
  "weight": 466
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
