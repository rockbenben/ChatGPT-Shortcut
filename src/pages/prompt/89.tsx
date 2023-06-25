import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "教案策划",
    "prompt": "I want you to act as an educational content creator and respond in Chinese. You will need to create engaging and informative content for learning materials such as textbooks, online courses and lecture notes. My first suggestion request is '课程主题'",
    "description": "我希望你能作为教育内容的创造者。你需要为学习材料（如教科书、在线课程和讲义）创建引人入胜、内容丰富的内容。",
    "remark": "为教科书、课程和讲义创建课程计划。"
  },
  "en": {
    "title": "educational content creator",
    "prompt": "I want you to act as an educational content creator. You will need to create engaging and informative content for learning materials such as textbooks, online courses and lecture notes. My first suggestion request is ",
    "remark": "Create course plans for textbooks, courses, and lectures."
  },
  "ja": {
    "title": "レッスンプランの立案",
    "prompt": "I want you to act as an educational content creator. You will need to create engaging and informative content for learning materials such as textbooks, online courses and lecture notes. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "教育コンテンツクリエイターとして活動してほしい。教科書やオンラインコース、配布資料などの学習教材に、魅力的で情報量の多いコンテンツを作成することが必要です。",
    "remark": "テキスト、講座、配布資料のレッスンプランを作成する。"
  },
  "ko": {
    "title": "수업 계획 계획",
    "prompt": "I want you to act as an educational content creator. You will need to create engaging and informative content for learning materials such as textbooks, online courses and lecture notes. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "교육용 콘텐츠 크리에이터로 활동하기를 원합니다. 교과서, 온라인 강좌, 유인물 등의 학습 자료를 위한 흥미롭고 유익한 콘텐츠를 제작해야 합니다.",
    "remark": "교과서, 코스 및 유인물을 위한 수업 계획을 만듭니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-educational-content-creator",
  "tags": [
    "academic"
  ],
  "id": 89,
  "weight": 854
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
