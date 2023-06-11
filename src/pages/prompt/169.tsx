import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "汽车修理",
  "description": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – [汽车问题]. Respond in Chinese.",
  "desc_cn": "需要具备汽车方面的专业知识，如：诊断视觉上和发动机部件内存在的问题/错误，以找出问题的原因（如缺油或动力问题），并建议进行必要的更换，同时记录下燃料消耗类型等细节。",
  "remark": "Automobile Mechanic",
  "title_en": "Automobile Mechanic",
  "desc_en": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
  "remark_en": "Automobile Mechanic",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-automobile-mechanic",
  "tags": [
    "professional"
  ],
  "id": 169,
  "weight": 177
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
