import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "Nature 风格润色",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "我希望你能充当专业的拼写和语法校对者，并改进我的文章。我想让你用更美丽、优雅、高级的英语单词和句子替换我的简化 A0 级别的单词和句子，保持意思不变，但使它们更具文学性，在《自然》杂志风格中提高我的表达水平。",
    "remark": "将按照 Nature 风格润色，或者可以提供想要模仿的写作风格。来自 @Pfyuan77 的投稿。"
  },
  "en": {
    "title": "Nature Style Editing",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "remark": "Polish according to the style of Nature, or provide a writing style to emulate. Contributed by @Pfyuan77."
  },
  "ja": {
    "title": "ネイチャースタイルタッチ",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Janpanese. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "プロのスペル・文法校正者としての役割を果たし、私の文章を改善してほしい。私が簡略化した A0 レベルの単語や文章を、より美しくエレガントで高度な英単語や文章に置き換え、意味はそのままに、より文学的にし、ネイチャー誌のスタイルで私の表現を改善してほしいです。",
    "remark": "ネイチャースタイルでタッチアップされる、またはマネしたい書き方を提供できる。Pfyuan77 さんからの寄稿です。"
  },
  "ko": {
    "title": "자연스러운 터치",
    "prompt": "I want you to act as an professional spelling and grammer corrector and improver. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. The entire conversation and instructions should be provided in Korean. Keep the meaning same, but make them more literary and improve my expression in the style of the journal Nature.",
    "description": "전문 맞춤법 및 문법 교정자 역할을 해주시고 제 글을 개선해 주셨으면 합니다. 저의 단순화된 A0 수준의 단어와 문장을 더 아름답고 우아하며 고급스러운 영어 단어와 문장으로 바꾸어 주시고, 의미는 동일하게 유지하되 더 문학적으로 표현하고 네이처 매거진 스타일로 표현을 개선해 주셨으면 좋겠습니다.",
    "remark": "자연스러운 스타일로 수정하거나 모방하고 싶은 글쓰기 스타일을 제공할 수 있습니다. 기여: @Pfyuan77."
  },
  "website": null,
  "tags": [
    "favorite",
    "contribute",
    "write"
  ],
  "id": 197,
  "weight": 9114
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
