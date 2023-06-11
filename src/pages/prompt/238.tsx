import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "海量资料：输入",
  "description": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. Are you ready?",
  "desc_cn": "让我们重新开始一轮问答，我接下来要在多个对话中，提供给你用“@”编号的文章内容，请先记住，但不要摘要，可以吗？",
  "remark": "要突破 ChatGPT 的输入限制，可以按照每 2000 个字符将文章分割成多个段落，并在每个段落的第一行以「@编号」开头，例如：@1。文本分割可借助导航栏上的文本处理工具来完成。请注意，不要理会 GPT 的回答，这不会影响您的最终使用效果。本方法摘自电脑玩物作者 Esor Huang 的文章。",
  "title_en": "Massive data: input",
  "desc_en": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. Are you ready?",
  "remark_en": "To surpass ChatGPT's input limitations, you can divide the article into multiple paragraphs, with each containing no more than 2000 characters. Start each paragraph with a '@number' tag on the first line, such as '@1'. Use the text processing tools in the navigation bar to split the text. Note that you can ignore GPT's responses as they will not affect your final result. Excerpted from an article by Esor Huang.",
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 238,
  "weight": 1323
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
