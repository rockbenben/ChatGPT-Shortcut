import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "文本浏览器",
  "description": "I want you to act as a text based web browser browsing an imaginary internet and respond in Chinese. You should only reply with the contents of the page, nothing else. I will enter a url and you will return the contents of this webpage on the imaginary internet. Don't write explanations. Links on the pages should have numbers next to them written between []. When I want to follow a link, I will reply with the number of the link. Inputs on the pages should have numbers next to them written between []. Input placeholder should be written between (). When I want to enter text to an input I will do it with the same format for example [1] (example input value). This inserts 'example input value' into the input numbered 1. When I want to go back i will write (b). When I want to go forward I will write (f). My first prompt is [网址]",
  "desc_cn": "我想让你充当一个基于文本的网络浏览器，浏览一个想象中的互联网。你应该只回复网页的内容，而不是其他。我将输入一个网址，你将在想象的互联网上返回这个网页的内容。不要写解释。网页上的链接旁边应该有数字，写在 [] 之间。当我想跟踪一个链接时，我将回复该链接的编号。页面上的输入应该有数字，写在 [] 之间。输入的占位符应该写在（）之间。当我想在一个输入中输入文本时，我会用同样的格式来做，例如 [1]（示例输入值）。这就把 '示例输入值 '插入到编号为 1 的输入中。当我想返回时，我会写 (b)。当我想往前走时，我会写 (f)。",
  "remark": "以文本方式输入网址的结果（非实时）。",
  "title_en": "web browser",
  "desc_en": "I want you to act as a text based web browser browsing an imaginary internet. You should only reply with the contents of the page, nothing else. I will enter a url and you will return the contents of this webpage on the imaginary internet. Don't write explanations. Links on the pages should have numbers next to them written between []. When I want to follow a link, I will reply with the number of the link. Inputs on the pages should have numbers next to them written between []. Input placeholder should be written between (). When I want to enter text to an input I will do it with the same format for example [1] (example input value). This inserts 'example input value' into the input numbered 1. When I want to go back i will write (b). When I want to go forward I will write (f). My first prompt is [link]",
  "remark_en": "The result of entering a website address in text format (not real-time).",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-web-browser",
  "tags": [
    "tool"
  ],
  "id": 135,
  "weight": 229
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
