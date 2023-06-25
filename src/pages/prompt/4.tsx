import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "论文式回答",
    "prompt": "Write a highly detailed essay in Chinese with introduction, body, and conclusion paragraphs responding to the following: [问题]",
    "description": "写一篇高度详细的文章，包括引言、主体和结论段落，以回应以下内容：[问题］",
    "remark": "以论文形式讨论问题，能够获得连贯的、结构化的和更高质量的回答。"
  },
  "en": {
    "title": "Thesis reply",
    "prompt": "Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "remark": "Discussing questions in essay form allows for coherent, structured and higher quality responses."
  },
  "ja": {
    "title": "論文形式の回答",
    "prompt": "Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "序論、本文、結論の段落を含む、非常に詳細なエッセイを書き、次のことに応答しなさい：【設問】。",
    "remark": "エッセイ形式で問題を議論することで、首尾一貫した、構造化された、より質の高い回答が可能になります。"
  },
  "ko": {
    "title": "논문 스타일의 답변",
    "prompt": "Write a highly detailed essay with introduction, body, and conclusion paragraphs responding to the following: ",
    "description": "서론, 본문, 결론 단락을 포함하여 다음에 답하는 매우 상세한 에세이를 작성하세요: [질문]",
    "remark": "에세이 형식으로 질문에 대해 토론하면 일관성 있고 구조화된 고품질의 답변을 얻을 수 있습니다."
  },
  "website": "https://learnprompting.org/docs/applied_prompting/short_response",
  "tags": [
    "favorite",
    "article"
  ],
  "id": 4,
  "weight": 7847
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
