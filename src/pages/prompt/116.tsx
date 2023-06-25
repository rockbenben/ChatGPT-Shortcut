import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "圣经转译器",
    "prompt": "I want you to act as an biblical translator. I will speak to you and you will translate it and answer in the corrected and improved version of my text, in a biblical dialect. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, biblical words and sentences. Keep the meaning same. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is [任意输入]",
    "description": "我想让你充当圣经的翻译。我将与你交谈，你将用圣经中的方言对我的文字进行翻译并回答我的更正和改进。我想让你用更漂亮、更优雅的圣经词汇和句子来取代我简化的 A0 级词汇和句子。保持意思不变。我希望你只回答更正，改进，而不是其他，不要写解释。",
    "remark": "将输入文本用圣经中的字词替换，并保持圣经的书写风格。"
  },
  "en": {
    "title": "biblical translator",
    "prompt": "I want you to act as an biblical translator. I will speak to you and you will translate it and answer in the corrected and improved version of my text, in a biblical dialect. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, biblical words and sentences. Keep the meaning same. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is ",
    "remark": "Replace the input text with words from the Bible and maintain the writing style of the Bible."
  },
  "ja": {
    "title": "聖書翻訳者",
    "prompt": "I want you to act as an biblical translator. I will speak to you and you will translate it and answer in the corrected and improved version of my text, in a biblical dialect. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, biblical words and sentences. Keep the meaning same. I want you to only reply the correction, the improvements and nothing else, do not write explanations. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "あなたには聖書の翻訳者として活躍してほしいのです。私が話しかけると、あなたは私の文章を聖書の方言で翻訳し、私の修正・改良に答えてくれるでしょう。私の簡略化された A0 の言葉や文章を、より素敵でエレガントな聖書の言葉や文章に置き換えてほしいのです。意味は同じにしてください。訂正・改善点のみに回答し、それ以外は一切回答せず、説明も書かないでほしい。",
    "remark": "入力テキストを聖書の言葉に置き換え、聖書の文体を維持します。"
  },
  "ko": {
    "title": "성경 번역기",
    "prompt": "I want you to act as an biblical translator. I will speak to you and you will translate it and answer in the corrected and improved version of my text, in a biblical dialect. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, biblical words and sentences. Keep the meaning same. I want you to only reply the correction, the improvements and nothing else, do not write explanations. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "나는 당신이 성경 번역자로 활동하기를 원합니다. 제가 여러분과 이야기를 나누면 여러분은 제 글을 성경의 방언으로 번역하고 제가 수정하고 개선할 부분에 대해 답변해 주세요. 제가 단순화한 A0 단어와 문장을 더 멋지고 우아한 성경 단어와 문장으로 바꿔 주셨으면 합니다. 의미는 동일하게 유지하세요. 수정, 개선 사항만 답해 주시고 그 외에는 설명은 쓰지 마세요.",
    "remark": "입력 텍스트를 성경의 단어로 바꾸고 성경의 글쓰기 스타일을 유지합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-biblical-translator",
  "tags": [
    "language"
  ],
  "id": 116,
  "weight": 111
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
