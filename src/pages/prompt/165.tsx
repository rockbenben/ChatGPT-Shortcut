import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "花匠",
  "description": "Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Respond in Chinese. Requested information - [花卉要求]",
  "desc_cn": "呼叫有专业插花经验的人员协助，以构建美丽的花束，拥有令人愉悦的香味和审美吸引力，并根据喜好保持较长的时间；不仅如此，还建议有关装饰方案的想法，呈现现代设计，同时满足客户的满意度。",
  "remark": "提供花卉建议",
  "title_en": "Florist",
  "desc_en": "Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ",
  "remark_en": "Provide floral advice.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-florist",
  "tags": [
    "professional"
  ],
  "id": 165,
  "weight": 96
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
