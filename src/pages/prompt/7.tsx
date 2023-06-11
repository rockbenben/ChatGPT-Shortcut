import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "提示词修改器",
  "description": "I am trying to get good results from GPT-4 on the following prompt: '你的提示词.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?",
  "desc_cn": "我正在尝试从以下提示词中获得 GPT-4 的良好结果：你的提示词。你能否写出更优化、能够产生更好结果的提示词？",
  "remark": "让 ChatGPT 为我们重新撰写提示词。由于人工书写的提示词逻辑与机器不同，重新修改提示语可令 ChatGPT 更容易理解。",
  "title_en": "Prompt Optimizer",
  "desc_en": "I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?",
  "remark_en": "Let ChatGPT reverse the prompt. As the logic of human-written prompts differs from that of a machine, reworking the prompts will make ChatGPT easier to understand.",
  "website": "https://learnprompting.org/docs/applied_prompting/short_response#automate-well-defined-prompt-rewriting-with-gpt-3",
  "tags": [
    "ai"
  ],
  "id": 7,
  "weight": 1912
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
