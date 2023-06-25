import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "表达自检",
    "prompt": "[某个具体的事情]，我说：[回复内容]。请问对方可能会如何理解我的意思？有其他更好的表达方式吗？",
    "description": "[某个具体的事情]，我说：[回复内容]。请问对方可能会如何理解我的意思？有其他更好的表达方式吗？",
    "remark": "如果你是高敏感人群，或你的话经常被人误解，通过 AI 解读可以让你在说话前检查自己是否表达清楚。"
  },
  "en": {
    "title": "Self-check on expression ",
    "prompt": "After [a specific action], I said: [my response]. How might the other person interpret my meaning?",
    "remark": "If you belong to the highly sensitive population or if your words are frequently misunderstood, using AI interpretation can help you self-check before speaking to ensure clear expression."
  },
  "ja": {
    "title": "表現力セルフチェック",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Janpanese. How might the other person interpret my meaning?",
    "description": "[具体的なこと）、私は「（内容への返答）」と言ったのです。相手は私の意味をどう解釈するのだろうか？他にもっと良い表現方法はないだろうか？",
    "remark": "感受性の強い方、言葉が誤解されやすい方は、AI 通訳を利用することで、話す前に自分の表現が明確かどうか確認することができます。"
  },
  "ko": {
    "title": "표현식 자가 점검",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Korean. How might the other person interpret my meaning?",
    "description": "[특정 항목] 에 대해 [콘텐츠에 답장] 이라고 말했습니다. 상대방이 제 뜻을 어떻게 해석할까요? 더 좋은 표현 방법이 없을까요?",
    "remark": "매우 예민한 사람이거나 말을 자주 오해하는 경우, AI 통역을 통해 말하기 전에 명확하게 표현했는지 확인할 수 있습니다."
  },
  "website": null,
  "tags": [
    "personal"
  ],
  "id": 208,
  "weight": 200
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
