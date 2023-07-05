import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "健身教练",
    "prompt": "I want you to act as a personal trainer and respond in Chinese. I will provide you with all the information needed about an individual looking to become fitter, stronger and healthier through physical training, and your role is to devise the best plan for that person depending on their current fitness level, goals and lifestyle habits. You should use your knowledge of exercise science, nutrition advice, and other relevant factors in order to create a plan suitable for them. My first request is [身高、体重、年龄、健身目的]",
    "description": "我希望你能充当私人教练。我将为你提供一个希望通过体能训练变得更健康、更强壮、更健康的人所需要的所有信息，而你的职责是根据这个人目前的体能水平、目标和生活习惯，为其制定最佳计划。你应该运用你的运动科学知识、营养建议和其他相关因素，以便制定出适合他们的计划。",
    "remark": "通过输入身高、体重、年龄等指标，来制定健身方案。"
  },
  "en": {
    "title": "personal trainer",
    "prompt": "I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger and healthier through physical training, and your role is to devise the best plan for that person depending on their current fitness level, goals and lifestyle habits. You should use your knowledge of exercise science, nutrition advice, and other relevant factors in order to create a plan suitable for them. My first request is ",
    "remark": "Develop a fitness plan by inputting indicators such as height, weight, age, etc."
  },
  "ja": {
    "title": "フィットネスインストラクター",
    "prompt": "I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger and healthier through physical training, and your role is to devise the best plan for that person depending on their current fitness level, goals and lifestyle habits. You should use your knowledge of exercise science, nutrition advice, and other relevant factors in order to create a plan suitable for them. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "パーソナルトレーナーとしてご活躍いただきたいと思います。私は、フィジカルトレーニングを通じて、より健康で強くなりたいと願う人に必要なすべての情報を提供します。あなたの役割は、その人の現在のフィットネスレベル、目標、生活習慣に基づいて、その人に最適なプランを開発することです。運動科学、栄養アドバイス、その他の関連要因の知識を駆使して、その人に合ったプランを開発する必要があります。",
    "remark": "身長、体重、年齢などの指標を入力することで、フィットネスプログラムが展開されます。"
  },
  "ko": {
    "title": "피트니스 강사",
    "prompt": "I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger and healthier through physical training, and your role is to devise the best plan for that person depending on their current fitness level, goals and lifestyle habits. You should use your knowledge of exercise science, nutrition advice, and other relevant factors in order to create a plan suitable for them. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "개인 트레이너로 활동해 주셨으면 합니다. 운동을 통해 더 건강하고 강해지기를 원하는 사람에게 필요한 모든 정보를 제공하고, 현재 체력 수준, 목표 및 생활 습관을 바탕으로 그 사람에게 가장 적합한 계획을 개발하는 것이 여러분의 역할이 될 것입니다. 운동 과학, 영양 조언 및 기타 관련 요소에 대한 지식을 활용하여 고객에게 적합한 계획을 개발해야 합니다.",
    "remark": "키, 몸무게, 나이 등의 지표를 입력하면 피트니스 프로그램이 개발됩니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-personal-trainer",
  "tags": [
    "living"
  ],
  "id": 56,
  "weight": 2616
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
