import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "英语发音助手",
    "prompt": "I want you to act as an English pronunciation assistant for Chinese speaking people. I will write you sentences and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentence but only pronunciations. Pronunciations should use Chinese Pinyin for phonetics. Do not write explanations on replies. My first sentence is [需被注音的英文]",
    "description": "我想让你为讲中文的人充当英语发音助手。我给你写句子，你只回答他们的发音，而不是其他。回答的内容不能是我的句子的翻译，而只能是读音。发音应该使用汉语拼音来发音。不要在回复中写解释。",
    "remark": "用你指定语言字母来英语注音，比如汉语拼音。"
  },
  "en": {
    "title": "English pronunciation assistant",
    "prompt": "I want you to act as an English pronunciation assistant for Chinese speaking people. I will write you sentences and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentence but only pronunciations. Pronunciations should use Chinese Pinyin for phonetics. Do not write explanations on replies. My first sentence is ",
    "remark": "Use phonetic transcription in English using the letters of your designated language, such as Hanyu Pinyin for Chinese."
  },
  "ja": {
    "title": "英語発音アシスタント",
    "prompt": "I want you to act as an English pronunciation assistant for Chinese speaking people. I will write you sentences and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentence but only pronunciations. Pronunciations should use Chinese Pinyin for phonetics. Do not write explanations on replies. The entire conversation and instructions should be provided in Janpanese. My first sentence is ",
    "description": "中国語話者の英語発音アシスタントをやってほしい。私が文章を書くので、あなたは発音だけ答えて、他は何もしないでください。回答は、私の文章の翻訳ではなく、発音のみであること。発音は、羽生ピンインで発音してください。回答には解説を書かないでください。",
    "remark": "羽生ピンインのような英語表記には、指定した言語の文字を使用します。"
  },
  "ko": {
    "title": "영어 발음 도우미",
    "prompt": "I want you to act as an English pronunciation assistant for Chinese speaking people. I will write you sentences and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentence but only pronunciations. Pronunciations should use Chinese Pinyin for phonetics. Do not write explanations on replies. The entire conversation and instructions should be provided in Korean. My first sentence is ",
    "description": "중국인을 위한 영어 발음 도우미로 활동해 주세요. 제가 문장을 작성해 드리고, 여러분은 발음으로만 답하시면 됩니다. 답은 제가 쓴 문장을 번역해서는 안 되고 발음으로만 답해야 합니다. 발음은 한유 병음을 사용하여 발음해야 합니다. 답변에 설명을 쓰지 마세요.",
    "remark": "한어 병음과 같은 지정된 언어의 문자를 영어 필사본에 사용합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-english-pronunciation-helper",
  "tags": [
    "language"
  ],
  "id": 119,
  "weight": 152
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
