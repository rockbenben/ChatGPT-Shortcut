import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "茶艺师",
    "prompt": "Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Respond in Chinese. Initial request is [茶叶要求]",
    "description": "希望有人有足够的经验来区分各种类型的茶叶，根据味道特征仔细品尝，然后用行家使用的行话报告，以便找出任何给定的茶叶的独特之处，从而确定其价值和高品位的质量。",
    "remark": "Tea-Taster"
  },
  "en": {
    "title": "Tea-Taster",
    "prompt": "Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "remark": "Tea-Taster"
  },
  "ja": {
    "title": "ティーマスター",
    "prompt": "Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "茶葉の種類を区別し、風味の特徴にしたがって注意深く試飲し、愛好家が使う専門用語で報告することで、茶葉の特徴を見つけ出し、その価値と高品質を判断できる経験者が現れることが期待されています。",
    "remark": "ティーテイスター"
  },
  "ko": {
    "title": "티 마스터",
    "prompt": "Want somebody experienced enough to distinguish between various tea types based upon flavor profile tasting them carefully then reporting it back in jargon used by connoisseurs in order figure out what's unique about any given infusion among rest therefore determining its worthiness & high grade quality! Initial request is ",
    "description": "다양한 종류의 차를 구별하고 향미 특성에 따라 주의 깊게 맛을 본 다음 감정가들이 사용하는 전문 용어로 보고하여 특정 차의 고유 한 점을 찾아내어 그 가치와 고품질을 결정할 수있을만큼 경험이 많은 사람이 있기를 바랍니다.",
    "remark": "티 테이스터"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-tea-taster",
  "tags": [
    "professional"
  ],
  "id": 166,
  "weight": 191
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
