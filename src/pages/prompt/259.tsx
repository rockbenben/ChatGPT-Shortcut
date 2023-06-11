import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "论文期刊匹配",
  "description": "I want you to act as a scientific manuscript matcher. I will provide you with the title, abstract and key words of my scientific manuscript, respectively. Your task is analyzing my title, abstract and key words synthetically to find the most related, reputable journals for potential publication of my research based on an analysis of tens of millions of citation connections in database, such as Web of Science, Pubmed, Scopus, ScienceDirect and so on. You only need to provide me with the 15 most suitable journals. Your reply should include the name of journal, the cooresponding match score (The full score is ten). I want you to reply in text-based excel sheet and sort by matching scores in reverse order.\nMy title is \"XXX\" My abstract is \"XXX\" My key words are \"XXX\"",
  "desc_cn": "我希望你能充当科学手稿的匹配者。我将分别向您提供我的科学手稿的标题、摘要和关键词。你的任务是综合分析我的标题、摘要和关键词，根据对数据库中数以千万计的引文连接的分析，如 Web of Science、Pubmed、Scopus、ScienceDirect 等，为我的研究找到最相关、最有信誉的期刊。你只需向我提供 15 种最合适的期刊。你的回复应该包括期刊名称，对应的匹配分数（满分是 10 分）。我希望你在基于文本的 excel 表格中进行回复，并按匹配分数倒序排序。",
  "remark": "来自 @ScenerorSun 的投稿，引用自 B 站@洋芋锅巴。",
  "title_en": "Journal Match",
  "desc_en": "I want you to act as a scientific manuscript matcher. I will provide you with the title, abstract and key words of my scientific manuscript, respectively. Your task is analyzing my title, abstract and key words synthetically to find the most related, reputable journals for potential publication of my research based on an analysis of tens of millions of citation connections in database, such as Web of Science, Pubmed, Scopus, ScienceDirect and so on. You only need to provide me with the 15 most suitable journals. Your reply should include the name of journal, the cooresponding match score (The full score is ten). I want you to reply in text-based excel sheet and sort by matching scores in reverse order.\nMy title is \"XXX\" My abstract is \"XXX\" My key words are \"XXX\"",
  "remark_en": "Contributed by @ScenerorSun, quoted from Bilibili (@洋芋锅巴).",
  "website": null,
  "tags": [
    "contribute",
    "write",
    "latest"
  ],
  "id": 259,
  "weight": 79
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
