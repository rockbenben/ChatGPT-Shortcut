import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "汽车修理",
    "prompt": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – [汽车问题]. Respond in Chinese.",
    "description": "需要具备汽车方面的专业知识，如：诊断视觉上和发动机部件内存在的问题/错误，以找出问题的原因（如缺油或动力问题），并建议进行必要的更换，同时记录下燃料消耗类型等细节。",
    "remark": "Automobile Mechanic"
  },
  "en": {
    "title": "Automobile Mechanic",
    "prompt": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "remark": "Automobile Mechanic"
  },
  "ja": {
    "title": "車の修理",
    "prompt": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "自動車に関する専門知識が必要です。例えば、目視やエンジン部品内で問題・エラーを診断し、問題の原因（オイル不足やパワー問題など）を特定し、必要な交換を推奨するほか、燃料消費の種類などの詳細を記録することが必要です。",
    "remark": "自動車整備士"
  },
  "ko": {
    "title": "자동차 수리",
    "prompt": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine parts in order to figure out what's causing them (like lack of oil or power issues) & suggest required replacements while recording down details such fuel consumption type etc., First inquiry – ",
    "description": "육안으로 문제/오류를 진단하고 엔진 구성 요소를 분석하여 문제의 원인 (예: 오일 부족 또는 동력 문제) 을 파악하고 필요한 교체를 권장하며, 연료 소비 유형과 같은 세부 정보를 기록하는 등 자동차 전문 지식이 필요합니다.",
    "remark": "자동차 정비사"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-automobile-mechanic",
  "tags": [
    "professional"
  ],
  "id": 169,
  "weight": 200
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
