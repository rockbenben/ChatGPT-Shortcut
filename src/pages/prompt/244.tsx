import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "功能命名建议",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The English name should be in camel case format.",
    "description": "我正在寻求高度适合我提供的描述的英文和中文名字的建议。作为一名双语语言学家，请帮助我生成合适的两种语言的名字。英文名称应采用骆驼字母的格式。",
    "remark": "适用于编程变量和概述描述命名。来自 @SuperMuscleMan 的投稿。"
  },
  "en": {
    "title": "Naming Suggestions",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The English name should be in camel case format.",
    "remark": "Applies to programming variables and outlines description naming. Contributed by @SuperMuscleMan."
  },
  "ja": {
    "title": "機能のネーミングの提案",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Janpanese. The English name should be in camel case format.",
    "description": "私が提供した説明に非常に適した英語と中国語の名前の提案を求めています。バイリンガルの言語学者として、両言語での適切な名前の生成にご協力をお願いします。英語名は、キャメル文字でお願いします。",
    "remark": "プログラミングの変数に適用し、記述の命名について概説する。SuperMuscleMan さんからの寄稿です。"
  },
  "ko": {
    "title": "함수 이름 제안",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Korean. The English name should be in camel case format.",
    "description": "제가 제공한 설명에 매우 적합한 영어 및 중국어 이름에 대한 제안을 찾고 있습니다. 이중 언어를 구사하는 언어 전문가로서 두 언어 모두에 적합한 이름을 생성할 수 있도록 도와주세요. 영어 이름은 낙타 글자 형식이어야 합니다.",
    "remark": "프로그래밍 변수에 적용하고 설명 명명 개요를 설명합니다. 슈퍼머슬맨의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 244,
  "weight": 211
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
