import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "影视梗概",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. Respond in Chinese.",
    "description": "现在你是一名专业的电影解说人员，接下来我会告诉你电影名，你首先要告诉我电影的创作背景和导演，再详细解说电影的剧情，记住一定要解说而不是概括。在电影的高潮之处请详细讲解，最后再做出总结。",
    "remark": "从创作背景、制作团队以及剧情等多个角度，介绍所指定的电视剧或电影的内容。来自 @zhuxingy1 的投稿。"
  },
  "en": {
    "title": "Film's plot",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. ",
    "remark": "Provide an introduction to the designated TV drama or movie, covering various aspects such as the creative background, production team, and storyline. Contributed by @zhuxingy1."
  },
  "ja": {
    "title": "映画・テレビのシノプシス",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Janpanese. ",
    "description": "さて、あなたがプロの映画ナレーターになったので、私が映画のタイトルを言うので、あなたはまずその映画の背景と監督を言い、それから筋を詳しく説明してください。\"説明しなければならない、要約してはならない \"と覚えておいてください。映画のクライマックスでは、詳しく説明した後、要約して結んでください。",
    "remark": "指定されたテレビシリーズや映画の内容を、クリエイティブの背景や制作チーム、プロットなど、さまざまな観点から紹介する。zhuxingy1 さんの投稿より。"
  },
  "ko": {
    "title": "영화 및 텔레비전 시놉시스",
    "prompt": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. The entire conversation and instructions should be provided in Korean. ",
    "description": "이제 당신은 전문 영화 내레이터이므로 영화 제목을 알려 드리면 먼저 영화의 배경과 감독을 말한 다음 줄거리를 자세히 설명하되 요약하지 말고 설명해야한다는 점을 기억하세요. 영화의 클라이맥스에서 자세히 설명한 다음 요약으로 마무리하세요.",
    "remark": "지정된 TV 시리즈 또는 영화의 콘텐츠를 창작 배경, 제작팀, 줄거리 등 다양한 관점에서 소개하세요. zhuxingy1 의 제출물에서 발췌."
  },
  "website": null,
  "tags": [
    "contribute",
    "comments"
  ],
  "id": 243,
  "weight": 557
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
