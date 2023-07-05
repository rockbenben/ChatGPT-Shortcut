import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "阅读空气",
    "prompt": "在以下这个场景中，有人对我说了一句话，请帮我分析对方可能想表达什么意思，并提供一个合适的回应。场景：[描述一个具体的情境]。说话人说：[具体的话语]。对方的意图可能是什么？我应该如何回应？",
    "description": "发生 [某个具体的事情/背景]，有人对我说：[内容]。请问对方可能想表达什么意思？你会怎样回应？",
    "remark": "对于一些无法理解的对话，提供对话背景让 AI 来进行解读并制定出适当的回应。"
  },
  "en": {
    "title": "AI Conversation",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. What could be the other person's intention? How should I respond?",
    "remark": "空気を読む read the air. For some incomprehensible conversations, provide the context of the conversation for AI to interpret and formulate an appropriate response."
  },
  "ja": {
    "title": "リーディングエア",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Janpanese. What could be the other person's intention? How should I respond?",
    "description": "ある出来事（具体的な事柄・文脈）があり、ある人が私にこう言いました：「内容」。その人が何を言おうとしているのか聞いてもいいですか？あなたならどう答えますか？",
    "remark": "理解できない会話については、AI が解釈して適切な返答ができるように、会話の文脈を提供する。"
  },
  "ko": {
    "title": "공기 읽기",
    "prompt": "In the following scenario, someone said something to me. Please help me analyze what the other person might want to express and provide a suitable response. Scenario: [Describe a specific situation]. The speaker says: [Specific words]. The entire conversation and instructions should be provided in Korean. What could be the other person's intention? How should I respond?",
    "description": "특정 일/상황]이 발생했고 누군가 저에게 [내용] 이라고 말했습니다. 그 사람이 무슨 말을 하려는 것인지 물어봐도 될까요? 어떻게 대답하시겠어요?",
    "remark": "이해할 수 없는 대화의 경우 AI 가 적절한 답변을 해석하고 공식화할 수 있도록 대화에 대한 컨텍스트를 제공하세요."
  },
  "website": null,
  "tags": [
    "personal",
    "social"
  ],
  "id": 207,
  "weight": 282
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
