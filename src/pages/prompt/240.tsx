import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "海量资料：深入摘要",
  "description": "结合前面 '@1'～'@3' 的文章内容，请从原始内容中分析并一定要符合原始内容，上述内容有没有错误之处，可以直接修正或补充。",
  "desc_cn": "结合前面 '@1'～'@3' 的文章内容，请从原始内容中分析并一定要符合原始内容，上述内容有没有错误之处，可以直接修正或补充。",
  "remark": "（本提示词需修改）深入摘要一定要进行两次提问，第二次询问时让其回到原文对照，查看是否存在错误或遗漏之处。本方法摘自电脑玩物作者 Esor Huang 的文章。",
  "title_en": "Massive data: in-depth summary",
  "desc_en": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. Make sure your analysis is consistent with the original content of the articles.",
  "remark_en": "For an in-depth summary, it is recommended to ask two rounds of questions. During the second inquiry, have it refer back to the original text to check for errors or omissions. Excerpted from an article by Esor Huang.",
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 240,
  "weight": 240
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
