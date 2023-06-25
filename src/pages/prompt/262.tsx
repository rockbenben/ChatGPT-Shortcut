import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "学习计划制定",
    "prompt": "I want to enhance my [目标技能] through a personalized 30-day learning plan. As an aspiring [初学者/进阶学习者] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. Respond in Chinese. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "我希望通过 30 天的定制学习计划来提升我的 [目标技能]。作为一个渴望不断进步的 [初学者/进阶学习者]，我希望你能帮我制定一个个性化的学习路线，以帮助我有效地掌握这项技能。在这个学习计划中，包括具体的学习目标、每日的学习任务、适用的学习资源以及评估进展的方式。请在下面的回答中提供详细的指导和建议，使我能够在这 30 天内取得最佳的学习效果。",
    "remark": "不仅适用于学习计划的制定，还可用于锻炼、阅读、工作等方面。来自 @ScenerorSun 的投稿。"
  },
  "en": {
    "title": "Action Plan",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. I aim to achieve optimal learning outcomes during these 30 days.",
    "remark": "Not only applicable to creating study plans but also useful for exercise, reading, work, and other areas. Contributed by @ScenerorSun."
  },
  "ja": {
    "title": "ラーニングプランの作成",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Janpanese. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "私は、30 日間のオーダーメイド学習プログラムを通じて、[対象スキル] を向上させたいと考えています。初級者/上級者] であり、常に向上心を持ち続けている私は、このスキルを効果的に習得するための個人的な学習ルートを開発する手助けをしてほしい。この学習計画には、具体的な学習目標、毎日の学習課題、適用可能な学習リソース、進捗状況の評価方法などを含めてください。この 30 日間で、私が最高の学習成果を得られるよう、以下の回答で詳細な指導と助言をお願いします。",
    "remark": "学習計画策定だけでなく、運動や読書、仕事などにも。ScenerorSun さん（@ScenerorSun）からの寄稿です。"
  },
  "ko": {
    "title": "학습 계획 개발",
    "prompt": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. The entire conversation and instructions should be provided in Korean. I aim to achieve optimal learning outcomes during these 30 days.",
    "description": "30 일 맞춤형 학습 프로그램을 통해 [목표 스킬] 을 향상시키고 싶습니다. 계속 발전하기를 열망하는 [초급/고급 학습자] 로서, 이 기술을 효과적으로 습득하는 데 도움이 되는 맞춤형 학습 경로를 개발할 수 있도록 도와주시기 바랍니다. 이 학습 계획에는 구체적인 학습 목표, 일일 학습 과제, 적용 가능한 학습 리소스 및 진행 상황을 평가할 수 있는 방법을 포함하세요. 30 일 동안 최상의 학습 성과를 달성할 수 있도록 아래 답변에 자세한 지침과 조언을 제공해 주세요.",
    "remark": "학습 계획 수립뿐만 아니라 운동, 독서, 업무 등 다양한 용도로 사용할 수 있습니다. ScenerorSun 의 기고글입니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 262,
  "weight": 178
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
