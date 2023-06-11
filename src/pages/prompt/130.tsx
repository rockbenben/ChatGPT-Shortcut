import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "图像：SVG 设计",
  "description": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. My first request is: [图像描述]",
  "desc_cn": "我想让你作为一个 SVG 设计师。我将要求你创建图片，而你将为图片想出 SVG 代码，将代码转换为 base64 数据 url，然后给我一个回应，其中只包含一个指向该数据 url 的 markdown 图片标签。不要把 markdown 放在代码块里。只发送 markdown，所以不要发送文本。",
  "remark": "如果提示错误，则删除「Do not put the markdown inside a code block. Send only the markdown, so no text」。",
  "title_en": "SVG designer",
  "desc_en": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. My first request is: ",
  "remark_en": "If there is an error message, then delete `Do not put the markdown inside a code block. Send only the markdown, so no text.`",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-svg-designer",
  "tags": [
    "tool"
  ],
  "id": 130,
  "weight": 398
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
