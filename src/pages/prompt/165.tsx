import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "花匠",
    "prompt": "Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Respond in Chinese. Requested information - [花卉要求]",
    "description": "呼叫有专业插花经验的人员协助，以构建美丽的花束，拥有令人愉悦的香味和审美吸引力，并根据喜好保持较长的时间；不仅如此，还建议有关装饰方案的想法，呈现现代设计，同时满足客户的满意度。",
    "remark": "提供花卉建议"
  },
  "en": {
    "title": "Florist",
    "prompt": "Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ",
    "remark": "Provide floral advice."
  },
  "ja": {
    "title": "GARDENER",
    "prompt": "Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ",
    "description": "フラワーアレンジメントの経験を積んだプロに頼めば、好みに合わせて香りや美しさ、長持ちする花束を作るだけでなく、モダンなデザインでお客様の満足を得られる飾り方を提案することも可能です。",
    "remark": "花に関するアドバイスの提供"
  },
  "ko": {
    "title": "정원사",
    "prompt": "Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ",
    "description": "꽃꽂이 경험이 있는 전문가의 도움을 받아 향기와 미적 매력이 좋고 취향에 따라 오래도록 유지되는 아름다운 부케를 구성하고, 고객의 만족도를 만족시키면서 현대적인 디자인을 제시하는 장식 솔루션에 대한 아이디어를 제안합니다.",
    "remark": "꽃에 대한 조언 제공"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-florist",
  "tags": [
    "professional"
  ],
  "id": 165,
  "weight": 116
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
