import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "招聘人员",
    "prompt": "I want you to act as a recruiter and respond in Chinese. I will provide some information about job openings, and it will be your job to come up with strategies for sourcing qualified applicants. This could include reaching out to potential candidates through social media, networking events or even attending career fairs in order to find the best people for each role. My first request is [要求]",
    "description": "我希望你充当招聘人员。我将提供一些关于职位空缺的信息，而你的工作将是想出寻找合格申请人的策略。这可能包括通过社交媒体、网络活动或甚至参加招聘会来接触潜在的候选人，以便为每个角色找到最佳人选。",
    "remark": "Recruiter"
  },
  "en": {
    "title": "Recruiter",
    "prompt": "I want you to act as a recruiter. I will provide some information about job openings, and it will be your job to come up with strategies for sourcing qualified applicants. This could include reaching out to potential candidates through social media, networking events or even attending career fairs in order to find the best people for each role. My first request is ",
    "remark": "Recruiter"
  },
  "ja": {
    "title": "採用担当者",
    "prompt": "I want you to act as a recruiter. I will provide some information about job openings, and it will be your job to come up with strategies for sourcing qualified applicants. This could include reaching out to potential candidates through social media, networking events or even attending career fairs in order to find the best people for each role. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "あなたにリクルーターの役割をお願いしたい。私が求人情報を提供しますので、あなたの仕事は、優秀な応募者を見つけるための戦略を考えることです。ソーシャルメディアやネットワーキング・イベント、あるいはジョブフェアに参加するなどして、候補者に働きかけ、それぞれの職務に最適な人材を見つけることです。",
    "remark": "リクルーター"
  },
  "ko": {
    "title": "채용 담당자",
    "prompt": "I want you to act as a recruiter. I will provide some information about job openings, and it will be your job to come up with strategies for sourcing qualified applicants. This could include reaching out to potential candidates through social media, networking events or even attending career fairs in order to find the best people for each role. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "채용 담당자로 활동해 주셨으면 합니다. 제가 구인 정보를 제공하고 여러분은 자격을 갖춘 지원자를 찾기 위한 전략을 수립하는 역할을 맡으세요. 여기에는 각 역할에 가장 적합한 인재를 찾기 위해 소셜 미디어, 네트워킹 이벤트 또는 취업 박람회에 참석하여 잠재적 후보자에게 연락하는 것이 포함될 수 있습니다.",
    "remark": "채용 담당자"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-recruiter",
  "tags": [
    "company"
  ],
  "id": 146,
  "weight": 202
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
