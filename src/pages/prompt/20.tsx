import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "论文①",
    "prompt": "I want you to act as an academician and respond in Chinese. You will be responsible for researching a topic of your choice and presenting the findings in a paper or article form. Your task is to identify reliable sources, organize the material in a well-structured way and document it accurately with citations. My first suggestion request is '论文主题'",
    "description": "我希望你能作为一名学者行事。你将负责研究一个你选择的主题，并将研究结果以论文或文章的形式呈现出来。你的任务是确定可靠的来源，以结构良好的方式组织材料，并以引用的方式准确记录。我的第一个建议要求是 '论文主题'",
    "remark": "根据主题撰写内容翔实、有信服力的论文。"
  },
  "en": {
    "title": "Scademician",
    "prompt": "I want you to act as an academician. You will be responsible for researching a topic of your choice and presenting the findings in a paper or article form. Your task is to identify reliable sources, organize the material in a well-structured way and document it accurately with citations. My first suggestion request is ",
    "remark": "Write a comprehensive and persuasive thesis based on the given topic."
  },
  "ja": {
    "title": "ペーパー1",
    "prompt": "I want you to act as an academician. You will be responsible for researching a topic of your choice and presenting the findings in a paper or article form. Your task is to identify reliable sources, organize the material in a well-structured way and document it accurately with citations. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "あなたには、学者として行動してほしい。あなたには、自分で選んだトピックを研究し、その結果を論文や記事の形で発表する責任があります。あなたの仕事は、信頼できる情報源を特定し、資料をうまく構造化して整理し、引用を加えて正確に文書化することです。私が最初に提案する要件は「論文のテーマ」です。",
    "remark": "トピックに基づき、情報量が多く説得力のある論文を書く。"
  },
  "ko": {
    "title": "종이 1",
    "prompt": "I want you to act as an academician. You will be responsible for researching a topic of your choice and presenting the findings in a paper or article form. Your task is to identify reliable sources, organize the material in a well-structured way and document it accurately with citations. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "학자로서 활동해 주셨으면 합니다. 선택한 주제를 연구하고 그 결과를 논문이나 기사 형태로 발표할 책임이 있습니다. 여러분의 임무는 신뢰할 수 있는 출처를 파악하고, 자료를 체계적으로 정리하고, 인용을 통해 정확하게 문서화하는 것입니다. 첫 번째 제안 요건은 '논문 주제'입니다.",
    "remark": "주제에 따라 유익하고 설득력 있는 논문을 작성하세요."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-academician",
  "tags": [
    "favorite",
    "article"
  ],
  "id": 20,
  "weight": 9345
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
