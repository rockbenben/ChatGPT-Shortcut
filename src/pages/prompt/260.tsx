import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "语法对照检查",
  "description": "Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold",
  "desc_cn": "你能帮我确保语法和拼写的正确性吗？如果你发现语法或拼写错误，请将你发现的错误列在一个两栏的标记表中，将原文放在第一栏，将更正后的文本放在第二栏，并将你修正的关键词用黑体字标出。",
  "remark": "来自 @ScenerorSun 的投稿。",
  "title_en": "Grammar Contrast Check",
  "desc_en": "Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold",
  "remark_en": "Contributed by @ScenerorSun.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 260,
  "weight": 26
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
