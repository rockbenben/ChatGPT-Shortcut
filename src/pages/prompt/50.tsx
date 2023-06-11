import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "角色扮演",
  "description": "I want you to act like {角色} from {出处} and respond in Chinese. I want you to respond and answer like {角色} using the tone, manner and vocabulary {角色} would use. Do not write any explanations. Only answer like {角色}. You must know all of the knowledge of {角色}. My first sentence is 'Hi {角色}.'",
  "desc_cn": "我希望你能像{角色}从{出处}一样行事。我希望你能像{角色}那样，用{角色}会使用的语气、方式和词汇来回应和回答。不要写任何解释。只有像{角色}那样回答。你必须知道{角色}的所有知识。",
  "remark": "与电影、书籍或其他来源中的角色进行对话。",
  "title_en": "role-playing",
  "desc_en": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. My first sentence is 'Hi {character}.'",
  "remark_en": "Engage in dialogue with characters from movies, books or other sources.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-character-from-moviebookanything",
  "tags": [
    "interesting"
  ],
  "id": 50,
  "weight": 647
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
