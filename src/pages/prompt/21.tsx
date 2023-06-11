import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "论文②",
  "description": "I want you to act as an essay writer and respond in Chinese. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is '论文主题'",
  "desc_cn": "我想让你充当一名论文作家。你将需要研究一个给定的主题，制定一个论文声明，并创造一个有说服力的作品，既要有信息量，又要有吸引力。我的第一个建议要求是 '论文主题'",
  "remark": "根据主题撰写内容翔实、有信服力的论文。",
  "title_en": "Essay writer",
  "desc_en": "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is ",
  "remark_en": "Write a comprehensive and persuasive thesis based on the given topic.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-essay-writer",
  "tags": [
    "article"
  ],
  "id": 21,
  "weight": 1317
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
