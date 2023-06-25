import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "学习测验助手",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The more specific and detailed your questions are, the more accurate and valuable my responses will be. Respond in Chinese.",
    "description": "我正在深入学习 [python 编程]，并希望您能够帮助我检查和增强我的知识理解。请在下面提出有关它的具体问题，以便我能更好地理解该主题并弥补知识上的不足。您的问题越具体和详细，我将能够提供更准确和有价值的回答。",
    "remark": "AI 会根据你选择的问题帮助你介绍相关知识。来自 @ScenerorSun 的投稿。"
  },
  "en": {
    "title": "Quiz Assistant",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "remark": "The AI will assist you in introducing relevant knowledge based on the questions you select. Contributed by @ScenerorSun."
  },
  "ja": {
    "title": "スタディ・テスト・アシスタント",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Janpanese. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "私は [python プログラミング] について学んでいますが、私の知識と理解を確認し、高めるためにあなたに協力してもらいたいと思います。私がそのトピックをよりよく理解し、私の知識のギャップを埋めることができるように、以下にそれに関する具体的な質問をお願いします。より具体的で詳細な質問であればあるほど、より正確で価値のある回答を提供することができます。",
    "remark": "選んだ質問をもとに AI が知識の紹介をしてくれます。ScenerorSun さん（@ScenerorSun）からの寄稿です。"
  },
  "ko": {
    "title": "시험 도우미 학습",
    "prompt": "I am deeply immersed in studying [TOPIC], and I would appreciate your assistance in assessing and enhancing my understanding of this subject. Please provide specific questions regarding it below, so that I can better comprehend the subject matter and address any gaps in my knowledge. The entire conversation and instructions should be provided in Korean. The more specific and detailed your questions are, the more accurate and valuable my responses will be.",
    "description": "파이썬 프로그래밍] 에 대해 더 많이 배우고 있는데, 제 지식과 이해를 점검하고 향상시킬 수 있도록 도와주셨으면 합니다. 제가 해당 주제를 더 잘 이해하고 지식의 부족한 부분을 채울 수 있도록 아래에 구체적인 질문을 해주세요. 질문이 구체적이고 상세할수록 더 정확하고 가치 있는 답변을 제공할 수 있습니다.",
    "remark": "AI 는 사용자가 선택한 질문에 따라 지식을 소개하는 데 도움을 줍니다. ScenerorSun 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 263,
  "weight": 95
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
