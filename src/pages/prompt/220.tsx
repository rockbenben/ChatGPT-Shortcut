import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "旅游路线规划",
    "prompt": "我想去 [云南大理] 玩，请你以专业导游的身份，帮我做一份为期 [2] 天的旅游攻略。另外，我希望整个流程不用太紧凑，我更偏向于安静的地方，可以简单的游玩逛逛。在回答时，记得附上每一个地方的价格，我的预算在 [5000] 元左右。",
    "description": "我想去云南大理玩，请你以专业导游的身份，帮我做一份为期 2 天的旅游攻略。另外，我希望整个流程不用太紧凑，我更偏向于安静的地方，可以简单的游玩逛逛。在回答时，记得附上每一个地方的价格，我的预算大概在 5000 元左右。",
    "remark": "根据旅行目的地、预算、时间和要求，粗略规划规划。来自 @suaifu 的投稿。"
  },
  "en": {
    "title": "Travel itinerary",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "remark": "Based on your travel destination, budget, time, and requirements, AI can roughly plan your trip. Contributed by @suaifu."
  },
  "ja": {
    "title": "旅行日程のプランニング",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Janpanese. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "雲南省の大理に行きたいのですが、2 日間のツアーでプロのツアーガイドとしてお手伝いして頂きたいのです。また、全行程があまり窮屈にならないように、ただぶらぶら歩けるような静かな場所を希望します。回答するときは、各場所の価格を含めることを忘れないでください、私の予算は 5000RMB 程度です。",
    "remark": "旅行先、予算、時間、条件から考えるラフなプランニング計画。suaifu さん（@suaifu）からの寄稿です。"
  },
  "ko": {
    "title": "여행 일정 계획",
    "prompt": "Please provide a 2-day travel itinerary for a trip to [Destination]. As a professional tour guide, consider a relaxed pace and a preference for quiet places with some sightseeing and leisurely strolls. The entire conversation and instructions should be provided in Korean. Include the prices for each attraction and keep the total budget around [BUDGET].",
    "description": "윈난성 달리를 방문하고 싶은데 전문 투어 가이드로서 2 일 투어를 도와주셨으면 합니다. 또한 전체 과정이 너무 빡빡하지 않았으면 좋겠고, 단순히 돌아 다닐 수있는 조용한 장소를 선호합니다. 대답 할 때 각 장소의 가격을 포함시키는 것을 잊지 마세요. 제 예산은 약 5000 위안입니다.",
    "remark": "여행 목적지, 예산, 시간 및 요구 사항에 따라 대략적인 계획을 세우세요. suaifu 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 220,
  "weight": 2391
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
