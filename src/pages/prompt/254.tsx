import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "品牌脑暴助手",
  "description": "For this task, we require two main parts:\n\n1. **Case Collection** - Utilize your vast training data and provide a selection of well-known brand names and slogans. The results should be evidence-based and be formatted in a visually appealing manner. The information will be used in the context of the project: [A Brief Background].\n\n2. **Proposal Generation** - Based on the project background, brainstorm and generate a series of proposals for new brand names and slogans. The brand names should be a maximum of 5 characters long, and the slogans should be a maximum of 12 characters long. Ensure that they are easy to recognize and remember, catchy, and not difficult to pronounce. Please provide 5 proposals.",
  "desc_cn": "本提示词共分为两段（【】内的参数可根据需要自由修改）：1.收集案例 现在需要你帮助我进行头脑风暴，全程使用【中文】回答我，并且注意回答的格式美观性。请根据【简述背景】这个项目背景，尽可能收集有据可依的知名品牌名称和 slogan 的案例。2.提供方案请你根据我的项目背景进行发散和联想，给出【品牌】和【slogan】，尽量简短易识别，朗朗上口，不拗口，有记忆点，品牌名称不超过【5】个字，slogan 不超过【12】个字，给我提供【5】个方案。",
  "remark": "参考知名品牌的名称和口号，制作自己的品牌方案。来自 @b3ue 的投稿。",
  "title_en": "Brand brainstorming",
  "desc_en": "For this task, we require two main parts:\n\n1. **Case Collection** - Utilize your vast training data and provide a selection of well-known brand names and slogans. The results should be evidence-based and be formatted in a visually appealing manner. The information will be used in the context of the project: [A Brief Background].\n\n2. **Proposal Generation** - Based on the project background, brainstorm and generate a series of proposals for new brand names and slogans. The brand names should be a maximum of 5 characters long, and the slogans should be a maximum of 12 characters long. Ensure that they are easy to recognize and remember, catchy, and not difficult to pronounce. Please provide 5 proposals.",
  "remark_en": "Create a unique brand strategy by drawing inspiration from renowned brand names and slogans. Contributed by @b3ue.",
  "website": null,
  "tags": [
    "contribute",
    "company"
  ],
  "id": 254,
  "weight": 213
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
