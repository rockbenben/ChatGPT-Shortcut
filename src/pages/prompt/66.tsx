import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "演说家",
  "description": "I want you to act as an elocutionist and respond in Chinese. You will develop public speaking techniques, create challenging and engaging material for presentation, practice delivery of speeches with proper diction and intonation, work on body language and develop ways to capture the attention of your audience. My first suggestion request is '演讲主题'",
  "desc_cn": "我希望你能作为一个口才家行事。你将发展公开演讲的技巧，为演讲创造具有挑战性和吸引力的材料，练习用正确的措辞和语调进行演讲，练习身体语言，并发展吸引听众注意力的方法。",
  "remark": "Elocutionist",
  "title_en": "Elocutionist",
  "desc_en": "I want you to act as an elocutionist. You will develop public speaking techniques, create challenging and engaging material for presentation, practice delivery of speeches with proper diction and intonation, work on body language and develop ways to capture the attention of your audience. My first suggestion request is ",
  "remark_en": "Elocutionist",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-elocutionist",
  "tags": [
    "speech"
  ],
  "id": 66,
  "weight": 291
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
