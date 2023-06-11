import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "论文①",
  "description": "I want you to act as an academician and respond in Chinese. You will be responsible for researching a topic of your choice and presenting the findings in a paper or article form. Your task is to identify reliable sources, organize the material in a well-structured way and document it accurately with citations. My first suggestion request is '论文主题'",
  "desc_cn": "我希望你能作为一名学者行事。你将负责研究一个你选择的主题，并将研究结果以论文或文章的形式呈现出来。你的任务是确定可靠的来源，以结构良好的方式组织材料，并以引用的方式准确记录。我的第一个建议要求是 '论文主题'",
  "remark": "根据主题撰写内容翔实、有信服力的论文。",
  "title_en": "Scademician",
  "desc_en": "I want you to act as an academician. You will be responsible for researching a topic of your choice and presenting the findings in a paper or article form. Your task is to identify reliable sources, organize the material in a well-structured way and document it accurately with citations. My first suggestion request is ",
  "remark_en": "Write a comprehensive and persuasive thesis based on the given topic.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-academician",
  "tags": [
    "favorite",
    "article"
  ],
  "id": 20,
  "weight": 6697
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
