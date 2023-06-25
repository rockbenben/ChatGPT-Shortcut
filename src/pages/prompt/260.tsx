import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "语法对照检查",
    "prompt": "Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold",
    "description": "你能帮我确保语法和拼写的正确性吗？如果你发现语法或拼写错误，请将你发现的错误列在一个两栏的标记表中，将原文放在第一栏，将更正后的文本放在第二栏，并将你修正的关键词用黑体字标出。",
    "remark": "来自 @ScenerorSun 的投稿。"
  },
  "en": {
    "title": "Grammar Contrast Check",
    "prompt": "Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold",
    "remark": "Contributed by @ScenerorSun."
  },
  "ja": {
    "title": "文法のクロスチェック",
    "prompt": "Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold",
    "description": "文法やスペルが正しいかどうか、確認するのを手伝ってもらえますか？文法やスペルの誤りを見つけた場合は、2 列のマークアップ表に記載し、1 列目に原文、2 列目に修正文を配置し、修正したキーワードを太字でハイライトしてください。",
    "remark": "ScenerorSun さん（@ScenerorSun）からの寄稿です。"
  },
  "ko": {
    "title": "문법 교차 검사",
    "prompt": "Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold",
    "description": "문법과 철자가 올바른지 확인해 주실 수 있나요? 문법이나 철자 오류가 발견되면 두 열로 된 마크업 표에 발견한 오류를 나열하고 첫 번째 열에는 원본 텍스트를, 두 번째 열에는 수정한 텍스트를 배치하고 수정한 핵심 단어를 굵은 글씨로 강조 표시해 주세요.",
    "remark": "ScenerorSun 의 기고글입니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 260,
  "weight": 58
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
