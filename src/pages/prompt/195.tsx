import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "演讲稿",
    "prompt": "作为一名 [身份]，以 [演讲主题] 为中心，为我扩写以下文本。可以引用最多一句名人名言、补充具体例子，阐述个人感想。",
    "description": "作为一名 [身份]，以如何落实科学道德和学风建设为中心，为我扩写以下文本。可以引用最多一句名人名言、补充具体例子，阐述个人感想。",
    "remark": "来自 @SetSeele 的投稿。"
  },
  "en": {
    "title": "Speech",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "remark": "Contributed by @SetSeele."
  },
  "ja": {
    "title": "講演内容",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Janpanese. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "アイデンティティ】として、科学倫理と学問倫理の実践方法を中心に、以下の文章を私のために展開してください。著名人 1 名までの引用、具体的な事例の追加、個人的な思い入れを詳しく述べてもよい。",
    "remark": "SetSeele さん（@SetSeele）からの寄稿です。"
  },
  "ko": {
    "title": "연설",
    "prompt": "As a [identity], centered around [topic], please expand the following text for me. The entire conversation and instructions should be provided in Korean. You may quote up to one famous saying, provide specific examples, and elaborate on personal thoughts.",
    "description": "정체성] 으로서, 과학 윤리 및 학문적 윤리를 어떻게 구현할 것인지에 초점을 맞추어 다음 텍스트를 확장하세요. 유명한 인물을 최대 한 명까지 인용하고 구체적인 예를 추가하고 개인적인 느낌을 자세히 설명할 수 있습니다.",
    "remark": "SetSeele 의 기고글입니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "speech"
  ],
  "id": 195,
  "weight": 989
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
