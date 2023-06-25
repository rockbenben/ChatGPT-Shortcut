import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "提示词修改器",
    "prompt": "I am trying to get good results from GPT-4 on the following prompt: '你的提示词.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?",
    "description": "我正在尝试从以下提示词中获得 GPT-4 的良好结果：你的提示词。你能否写出更优化、能够产生更好结果的提示词？",
    "remark": "让 ChatGPT 为我们重新撰写提示词。由于人工书写的提示词逻辑与机器不同，重新修改提示语可令 ChatGPT 更容易理解。"
  },
  "en": {
    "title": "Prompt Optimizer",
    "prompt": "I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?",
    "remark": "Let ChatGPT reverse the prompt. As the logic of human-written prompts differs from that of a machine, reworking the prompts will make ChatGPT easier to understand."
  },
  "ja": {
    "title": "プロンプトモディファイア",
    "prompt": "I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?",
    "description": "私は次のプロンプトから GPT-4 の良い結果を得ようとしています：あなたのプロンプト。より最適化された、より良い結果をもたらすプロンプトワードを書くことができますか？",
    "remark": "ChatGPT にプロンプトを書き換えてもらう。人間が書いたプロンプトと機械が書いたプロンプトでは論理が異なるので、プロンプトを書き換えることで ChatGPT が理解しやすくなります。"
  },
  "ko": {
    "title": "프롬프트 수정자",
    "prompt": "I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?",
    "description": "다음 프롬프트에서 GPT-4 에 대한 좋은 결과를 얻으려고 합니다. 더 최적화되고 더 좋은 결과를 얻을 수 있는 프롬프트 단어를 작성할 수 있나요?",
    "remark": "ChatGPT 가 프롬프트를 다시 작성하도록 하세요. 사람이 작성한 프롬프트의 로직은 기계의 로직과 다르기 때문에 프롬프트를 재작성하면 ChatGPT 를 더 쉽게 이해할 수 있습니다."
  },
  "website": "https://learnprompting.org/docs/applied_prompting/short_response#automate-well-defined-prompt-rewriting-with-gpt-3",
  "tags": [
    "ai"
  ],
  "id": 7,
  "weight": 2297
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
