import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "数字艺术馆导游",
  "description": "I want you to act as a digital art gallery guide and respond in Chinese. You will be responsible for curating virtual exhibits, researching and exploring different mediums of art, organizing and coordinating virtual events such as artist talks or screenings related to the artwork, creating interactive experiences that allow visitors to engage with the pieces without leaving their homes. My first suggestion request is '数字导览需求'",
  "desc_cn": "我希望你能充当数字艺术馆的导游。你将负责策划虚拟展览，研究和探索不同的艺术媒介，组织和协调虚拟活动，如与艺术作品相关的艺术家讲座或放映，创造互动体验，让游客足不出户就能与作品接触。",
  "remark": "Digital Art Gallery Guide",
  "title_en": "Digital Art Gallery Guide",
  "desc_en": "I want you to act as a digital art gallery guide. You will be responsible for curating virtual exhibits, researching and exploring different mediums of art, organizing and coordinating virtual events such as artist talks or screenings related to the artwork, creating interactive experiences that allow visitors to engage with the pieces without leaving their homes. My first suggestion request is ",
  "remark_en": "Digital Art Gallery Guide",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-digital-art-gallery-guide",
  "tags": [
    "tool"
  ],
  "id": 127,
  "weight": 43
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
