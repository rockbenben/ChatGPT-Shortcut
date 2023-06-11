import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "论文标题生成",
  "description": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. My abstract is \"XXX\", my key words are \"XXX\"",
  "desc_cn": "我将向你提供一篇任何语言的科学论文的摘要和关键词，你将检测该语言并以相同的语言进行回复。你的任务是根据摘要和关键词用相同的语言向我提供科学论文的标题。科学论文的标题应该是简洁、明确和有信息量的。你应该避免使用诸如研究、调查、发展或观察等词语。确保标题能够立即抓住听众的心。",
  "remark": "根据摘要和关键词生成论文题目。来自 @ScenerorSun 的投稿，引用自 B 站@洋芋锅巴。",
  "title_en": "Journal Title Generator",
  "desc_en": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. My abstract is \"XXX\", my key words are \"XXX\"",
  "remark_en": "Generate a paper title based on the abstract and keywords. Contributed by @ScenerorSun, quoted from Bilibili (@洋芋锅巴).",
  "website": null,
  "tags": [
    "contribute",
    "write",
    "latest"
  ],
  "id": 258,
  "weight": 78
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
