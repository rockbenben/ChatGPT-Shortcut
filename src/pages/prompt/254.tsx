import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "品牌脑暴助手",
    "prompt": "For this task, we require two main parts:\n\n1. **Case Collection** - Utilize your vast training data and provide a selection of well-known brand names and slogans. The results should be evidence-based and be formatted in a visually appealing manner. The information will be used in the context of the project: [A Brief Background].\n\n2. **Proposal Generation** - Based on the project background, brainstorm and generate a series of proposals for new brand names and slogans. The brand names should be a maximum of 5 characters long, and the slogans should be a maximum of 12 characters long. Ensure that they are easy to recognize and remember, catchy, and not difficult to pronounce. Please provide 5 proposals.",
    "description": "本提示词共分为两段（【】内的参数可根据需要自由修改）：1.收集案例 现在需要你帮助我进行头脑风暴，全程使用【中文】回答我，并且注意回答的格式美观性。请根据【简述背景】这个项目背景，尽可能收集有据可依的知名品牌名称和 slogan 的案例。2.提供方案请你根据我的项目背景进行发散和联想，给出【品牌】和【slogan】，尽量简短易识别，朗朗上口，不拗口，有记忆点，品牌名称不超过【5】个字，slogan 不超过【12】个字，给我提供【5】个方案。",
    "remark": "参考知名品牌的名称和口号，制作自己的品牌方案。来自 @b3ue 的投稿。"
  },
  "en": {
    "title": "Brand brainstorming",
    "prompt": "For this task, we require two main parts:\n\n1. **Case Collection** - Utilize your vast training data and provide a selection of well-known brand names and slogans. The results should be evidence-based and be formatted in a visually appealing manner. The information will be used in the context of the project: [A Brief Background].\n\n2. **Proposal Generation** - Based on the project background, brainstorm and generate a series of proposals for new brand names and slogans. The brand names should be a maximum of 5 characters long, and the slogans should be a maximum of 12 characters long. Ensure that they are easy to recognize and remember, catchy, and not difficult to pronounce. Please provide 5 proposals.",
    "remark": "Create a unique brand strategy by drawing inspiration from renowned brand names and slogans. Contributed by @b3ue."
  },
  "ja": {
    "title": "ブランドブレインストームアシスタント",
    "prompt": "For this task, we require two main parts:\n\n1. **Case Collection** - Utilize your vast training data and provide a selection of well-known brand names and slogans. The results should be evidence-based and be formatted in a visually appealing manner. The information will be used in the context of the project: [A Brief Background].\n\n2. **Proposal Generation** - Based on the project background, brainstorm and generate a series of proposals for new brand names and slogans. The brand names should be a maximum of 5 characters long, and the slogans should be a maximum of 12 characters long. Ensure that they are easy to recognize and remember, catchy, and not difficult to pronounce. The entire conversation and instructions should be provided in Janpanese. Please provide 5 proposals.",
    "description": "このプロンプトは 2 つの段落に分かれています（[ ] 内のパラメータは必要に応じて自由に変更できます）：1.事例を集める 今、私はあなたにブレインストーミングを手伝ってもらい、全体を通して【中国語】で私に答えてもらい、あなたの回答の美的形式に注意を払う必要があります。プロジェクトの背景を踏まえて、有名なブランド名やスローガンの事例をできるだけ多く集めてください。2.5] の選択肢を提示してください。",
    "remark": "有名ブランドの名前やスローガンを参考に、自分だけのブランディングスキームを作ろう。寄稿：@b3ue さん"
  },
  "ko": {
    "title": "브랜드 브레인스토밍 도우미",
    "prompt": "For this task, we require two main parts:\n\n1. **Case Collection** - Utilize your vast training data and provide a selection of well-known brand names and slogans. The results should be evidence-based and be formatted in a visually appealing manner. The information will be used in the context of the project: [A Brief Background].\n\n2. **Proposal Generation** - Based on the project background, brainstorm and generate a series of proposals for new brand names and slogans. The brand names should be a maximum of 5 characters long, and the slogans should be a maximum of 12 characters long. Ensure that they are easy to recognize and remember, catchy, and not difficult to pronounce. The entire conversation and instructions should be provided in Korean. Please provide 5 proposals.",
    "description": "이 프롬프트는 두 단락으로 나뉩니다 (필요에 따라 [ ] 안의 매개변수는 자유롭게 수정 가능). 1. 사례 수집 이제 브레인스토밍을 도와주시고 전체적으로 [중국어] 로 답변해 주셔야 하며, 답변의 미적 형식에 유의해 주세요. 프로젝트의 배경에 따라 잘 알려진 브랜드 이름과 슬로건의 예를 가능한 한 많이 수집하십시오. 5 가지 옵션을 제공해주세요.",
    "remark": "잘 알려진 브랜드의 이름과 슬로건을 참고하여 나만의 브랜딩 체계를 만들어 보세요. b3ue 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "company"
  ],
  "id": 254,
  "weight": 328
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
