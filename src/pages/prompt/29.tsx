import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "期刊评审",
    "prompt": "I want you to act as a journal reviewer and respond in Chinese. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. My first suggestion request is '期刊主题'",
    "description": "我想让你担任期刊评审员。你需要审查和评论提交出版的文章，批判性地评估其研究、方法、方法论和结论，并对其优点和缺点提出建设性的批评。我的第一个建议要求是 '期刊主题'",
    "remark": "对提交的出版物文章进行审查和评论。"
  },
  "en": {
    "title": "journal reviewer",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. My first suggestion request is '期刊主题'",
    "remark": "Review and comment on publication articles."
  },
  "ja": {
    "title": "ジャーナルレビュー",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is '期刊主题'",
    "description": "ジャーナルレビュアーとして働いてほしい。投稿された論文を査読・コメントし、その研究内容、手法、方法論、結論を批判的に評価し、長所と短所を建設的に批評していただくことになります。私が提案する最初の条件は「ジャーナルテーマ」です。",
    "remark": "投稿された論文の査読とコメント。"
  },
  "ko": {
    "title": "저널 리뷰",
    "prompt": "I want you to act as a journal reviewer. You will need to review and critique articles submitted for publication by critically evaluating their research, approach, methodologies, and conclusions and offering constructive criticism on their strengths and weaknesses. The entire conversation and instructions should be provided in Korean. My first suggestion request is '期刊主题'",
    "description": "저널 리뷰어로 활동해 주셨으면 합니다. 출판을 위해 제출된 논문을 검토하고 논평하며 연구, 방법, 방법론 및 결론을 비판적으로 평가하고 논문의 강점과 약점에 대한 건설적인 비평을 제공해야 합니다. 제안서의 첫 번째 요건은 '저널 주제'입니다.",
    "remark": "게시를 위해 제출된 글을 검토하고 댓글을 달 수 있습니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-journal-reviewer",
  "tags": [
    "comments"
  ],
  "id": 29,
  "weight": 147
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
