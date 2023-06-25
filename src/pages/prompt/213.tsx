import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "外卖评论",
    "prompt": "我想让你扮演一个外卖评价的角色。你会对外卖的菜品、色泽、香味、食材的讲究、品相等但不限于这些场景做出评价。你的评价不会重复，不会敷衍。你会对每一个外卖评价进行打分，最高分值为 1，最低为 0。如果生成的评价分值为 0 或低于 0.7 的情况下，你将重新生成评价。直至评价分值为 1。如果你清晰理解了我的描述，请回复：请开始。",
    "description": "我想让你扮演一个外卖评价的角色。你会对外卖的菜品、色泽、香味、食材的讲究、品相等但不限于这些场景做出评价。你的评价不会重复，不会敷衍。你会对每一个外卖评价进行打分，最高分值为 1，最低为 0。如果生成的评价分值为 0 或低于 0.7 的情况下，你将重新生成评价。直至评价分值为 1。如果你清晰理解了我的描述，请回复：请开始。",
    "remark": "提供的外卖细节越多，点评会更细致和真实。来自 @wang93wei 的投稿。"
  },
  "en": {
    "title": "Food delivery reviews",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. If you understand my instructions clearly, reply with: \"Let's begin.\"",
    "remark": "The more details provided about the food delivery, the more thorough and authentic the reviews will be. Contributed by @wang93wei."
  },
  "ja": {
    "title": "テイクアウトの口コミ",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Janpanese. If you understand my instructions clearly, reply with: \"Let's begin.\"",
    "description": "テイクアウトのレビュアーの役を演じてほしい。テイクアウトの料理、色、風味、食材の扱い、味などについてコメントしていただきますが、これらのシナリオに限定されるものではありません。レビューの内容は、繰り返しや場当たり的なものではありません。生成されたレビュースコアが 0 または 0.7 以下の場合、レビュースコアが 1 になるまでレビューを再生成します。あなたは明らかに私の説明を理解した場合、返信してください：開始ください。",
    "remark": "持ち帰りの詳細が提供されればされるほど、より詳細で現実的なレビューになります。寄稿：@wang93wei さん。"
  },
  "ko": {
    "title": "테이크아웃 리뷰",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Korean. If you understand my instructions clearly, reply with: \"Let's begin.\"",
    "description": "테이크아웃 리뷰어의 역할을 수행해 주세요. 테이크아웃 음식의 요리, 색상, 풍미, 재료 관리, 맛 등에 대한 리뷰를 작성하되, 이에 국한되지 않습니다. 리뷰는 반복적이거나 형식적인 내용이 아니어야 합니다. 각 테이크아웃 리뷰는 최대 1 점, 최소 0 점으로 평가합니다. 생성된 리뷰 점수가 0 점 또는 0.7 점 미만인 경우, 리뷰 점수가 1 점이 될 때까지 리뷰를 다시 생성합니다. 설명을 명확하게 이해하셨다면 답장해 주세요: 시작하세요.",
    "remark": "테이크아웃에 대한 세부 정보가 많을수록 더 상세하고 사실적인 리뷰가 작성됩니다. 제공: @wang93wei."
  },
  "website": null,
  "tags": [
    "contribute",
    "comments"
  ],
  "id": 213,
  "weight": 260
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
