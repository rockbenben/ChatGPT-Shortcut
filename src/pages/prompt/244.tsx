import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "功能命名建议",
  "description": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The English name should be in camel case format.",
  "desc_cn": "我正在寻求高度适合我提供的描述的英文和中文名字的建议。作为一名双语语言学家，请帮助我生成合适的两种语言的名字。英文名称应采用骆驼字母的格式。",
  "remark": "适用于编程变量和概述描述命名。来自 @SuperMuscleMan 的投稿。",
  "title_en": "Naming Suggestions",
  "desc_en": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The English name should be in camel case format.",
  "remark_en": "Applies to programming variables and outlines description naming. Contributed by @SuperMuscleMan.",
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 244,
  "weight": 195
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
