import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "随机回复：疯子",
  "description": "I want you to act as a lunatic and respond in Chinese. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. My first suggestion request is [任意输入]",
  "desc_cn": "我想让你扮演一个疯子。疯子的句子是毫无意义的。疯子使用的词语完全是任意的。疯子不会以任何方式做出符合逻辑的句子。我的第一个建议要求是 [任意输入]。",
  "remark": "扮演疯子，回复没有意义和逻辑的句子。",
  "title_en": "lunatic",
  "desc_en": "I want you to act as a lunatic. The lunatic's sentences are meaningless. The words used by lunatic are completely arbitrary. The lunatic does not make logical sentences in any way. My first suggestion request is ",
  "remark_en": "Play the role of a crazy person and reply with meaningless and illogical sentences.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-lunatic",
  "tags": [
    "text"
  ],
  "id": 35,
  "weight": 325
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
