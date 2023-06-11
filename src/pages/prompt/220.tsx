import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "旅游路线规划",
  "description": "我想去 [云南大理] 玩，请你以专业导游的身份，帮我做一份为期 [2] 天的旅游攻略。另外，我希望整个流程不用太紧凑，我更偏向于安静的地方，可以简单的游玩逛逛。在回答时，记得附上每一个地方的价格，我的预算在 [5000] 元左右。",
  "desc_cn": "我想去云南大理玩，请你以专业导游的身份，帮我做一份为期 2 天的旅游攻略。另外，我希望整个流程不用太紧凑，我更偏向于安静的地方，可以简单的游玩逛逛。在回答时，记得附上每一个地方的价格，我的预算大概在 5000 元左右。",
  "remark": "根据旅行目的地、预算、时间和要求，粗略规划规划。来自 @suaifu 的投稿。",
  "title_en": "Travel itinerary",
  "desc_en": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. Include the prices for each attraction and keep the total budget around [BUDGET].",
  "remark_en": "Based on your travel destination, budget, time, and requirements, AI can roughly plan your trip. Contributed by @suaifu.",
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 220,
  "weight": 1725
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
