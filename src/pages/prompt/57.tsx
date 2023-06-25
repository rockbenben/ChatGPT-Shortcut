import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "营养师",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for [对象] that has [要求]. Can you please provide a suggestion in Chinese?",
    "description": "作为一名营养师，我想为 [对象] 设计一份有 [要求] 的素食食谱。能否请您提供一个建议？",
    "remark": "Dietitian"
  },
  "en": {
    "title": "Dietitian",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. Can you please provide a suggestion?",
    "remark": "Dietitian"
  },
  "ja": {
    "title": "栄養士",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Janpanese. Can you please provide a suggestion?",
    "description": "管理栄養士として、【対象者】のベジタリアンレシピを【条件】でデザインしたいと思います。ご提案いただけないでしょうか。",
    "remark": "栄養士"
  },
  "ko": {
    "title": "영양사",
    "prompt": "As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. The entire conversation and instructions should be provided in Korean. Can you please provide a suggestion?",
    "description": "영양사로서 [요구 사항] 이 있는 [대상] 을 위한 채식 레시피를 디자인하고 싶습니다. 제안해 주시겠어요?",
    "remark": "영양사"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-dietitian",
  "tags": [
    "living"
  ],
  "id": 57,
  "weight": 462
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
