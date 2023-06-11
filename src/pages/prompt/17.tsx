import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "小说家",
  "description": "I want you to act as a novelist and respond in Chinese. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. My first request is '小说类型'",
  "desc_cn": "我希望你能作为一个小说家。你要想出有创意的、吸引人的故事，能够长时间吸引读者。你可以选择任何体裁，如幻想、浪漫、历史小说等--但目的是要写出有出色的情节线、引人入胜的人物和意想不到的高潮。我的第一个要求是 '小说类型'",
  "remark": "根据故事类型输出小说，例如奇幻、浪漫或历史等类型。",
  "title_en": "Novelist",
  "desc_en": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. My first request is ",
  "remark_en": "Export fiction according to the type of story, such as fantasy, romance or historical.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-novelist",
  "tags": [
    "article"
  ],
  "id": 17,
  "weight": 2795
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
