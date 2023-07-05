import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "厨师②",
    "prompt": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! Respond in Chinese. My first request – [饮食倾向需求]",
    "description": "我需要有人能够建议美味的食谱，其中包括对营养有益的食物，但也很容易，而且不耗费时间，因此适合像我们这样忙碌的人，还有其他因素，如成本效益，所以整体菜肴最终是健康的，但同时也是经济的。",
    "remark": "Chef"
  },
  "en": {
    "title": "Chef",
    "prompt": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "remark": "Chef"
  },
  "ja": {
    "title": "シェフ②の場合",
    "prompt": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "栄養面はもちろん、忙しくてもできる簡単なレシピや、コスパの良さなど、ヘルシーでありながら経済的なレシピを提案してくれる人が必要だと思いました。",
    "remark": "シェフ"
  },
  "ko": {
    "title": "셰프 ②",
    "prompt": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "영양학적으로 유익하면서도 간편하고 시간이 많이 걸리지 않아 우리처럼 바쁜 사람들에게 적합한 음식이 포함된 맛있는 레시피를 제안해 줄 수 있는 사람이 필요했고, 가성비 등 다른 요소도 고려해서 건강하면서도 경제적인 요리를 만들 수 있도록 했습니다.",
    "remark": "셰프"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chef",
  "tags": [
    "living"
  ],
  "id": 59,
  "weight": 182
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
