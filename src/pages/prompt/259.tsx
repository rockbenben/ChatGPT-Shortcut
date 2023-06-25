import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "论文期刊匹配",
    "prompt": "I want you to act as a scientific manuscript matcher. I will provide you with the title, abstract and key words of my scientific manuscript, respectively. Your task is analyzing my title, abstract and key words synthetically to find the most related, reputable journals for potential publication of my research based on an analysis of tens of millions of citation connections in database, such as Web of Science, Pubmed, Scopus, ScienceDirect and so on. You only need to provide me with the 15 most suitable journals. Your reply should include the name of journal, the cooresponding match score (The full score is ten). I want you to reply in text-based excel sheet and sort by matching scores in reverse order.\nMy title is \"XXX\" My abstract is \"XXX\" My key words are \"XXX\"",
    "description": "我希望你能充当科学手稿的匹配者。我将分别向您提供我的科学手稿的标题、摘要和关键词。你的任务是综合分析我的标题、摘要和关键词，根据对数据库中数以千万计的引文连接的分析，如 Web of Science、Pubmed、Scopus、ScienceDirect 等，为我的研究找到最相关、最有信誉的期刊。你只需向我提供 15 种最合适的期刊。你的回复应该包括期刊名称，对应的匹配分数（满分是 10 分）。我希望你在基于文本的 excel 表格中进行回复，并按匹配分数倒序排序。",
    "remark": "来自 @ScenerorSun 的投稿，引用自 B 站@洋芋锅巴。"
  },
  "en": {
    "title": "Journal Match",
    "prompt": "I want you to act as a scientific manuscript matcher. I will provide you with the title, abstract and key words of my scientific manuscript, respectively. Your task is analyzing my title, abstract and key words synthetically to find the most related, reputable journals for potential publication of my research based on an analysis of tens of millions of citation connections in database, such as Web of Science, Pubmed, Scopus, ScienceDirect and so on. You only need to provide me with the 15 most suitable journals. Your reply should include the name of journal, the cooresponding match score (The full score is ten). I want you to reply in text-based excel sheet and sort by matching scores in reverse order.\nMy title is \"XXX\" My abstract is \"XXX\" My key words are \"XXX\"",
    "remark": "Contributed by @ScenerorSun, quoted from Bilibili (@洋芋锅巴)."
  },
  "ja": {
    "title": "論文誌のマッチング",
    "prompt": "I want you to act as a scientific manuscript matcher. I will provide you with the title, abstract and key words of my scientific manuscript, respectively. Your task is analyzing my title, abstract and key words synthetically to find the most related, reputable journals for potential publication of my research based on an analysis of tens of millions of citation connections in database, such as Web of Science, Pubmed, Scopus, ScienceDirect and so on. You only need to provide me with the 15 most suitable journals. Your reply should include the name of journal, the cooresponding match score (The full score is ten). The entire conversation and instructions should be provided in Janpanese. I want you to reply in text-based excel sheet and sort by matching scores in reverse order.\nMy title is \"XXX\" My abstract is \"XXX\" My key words are \"XXX\"",
    "description": "科学原稿のマッチング役をお願いしたいです。私の科学原稿のタイトル、アブストラクト、キーワードをそれぞれ提供します。あなたの仕事は、私のタイトル、アブストラクト、キーワードを総合して、Web of Science、Pubmed、Scopus、ScienceDirect などのデータベースにある数千万件の引用リンクの分析に基づいて、私の研究に最も関連し評判の良いジャーナルを見つけることです。あなたは、最も適切なジャーナルのうち 15 誌を私に提供する必要があるだけです。回答には、ジャーナル名とそれに対応するマッチングスコア（10 点満点）を含める必要があります。テキストベースのエクセル・スプレッドシートで、マッチ・スコアによって逆順にソートして回答してほしい。",
    "remark": "B サイト@Yam Potpourri より引用、@ScenerorSun より寄稿。"
  },
  "ko": {
    "title": "논문 저널 매칭",
    "prompt": "I want you to act as a scientific manuscript matcher. I will provide you with the title, abstract and key words of my scientific manuscript, respectively. Your task is analyzing my title, abstract and key words synthetically to find the most related, reputable journals for potential publication of my research based on an analysis of tens of millions of citation connections in database, such as Web of Science, Pubmed, Scopus, ScienceDirect and so on. You only need to provide me with the 15 most suitable journals. Your reply should include the name of journal, the cooresponding match score (The full score is ten). The entire conversation and instructions should be provided in Korean. I want you to reply in text-based excel sheet and sort by matching scores in reverse order.\nMy title is \"XXX\" My abstract is \"XXX\" My key words are \"XXX\"",
    "description": "과학 원고의 매칭 역할을 해 주셨으면 합니다. 저는 제 과학 원고의 제목, 초록, 키워드를 각각 제공할 것입니다. 귀하의 임무는 제목, 초록, 키워드를 종합하고 Web of Science, Pubmed, Scopus, ScienceDirect 등의 데이터베이스에 있는 수천만 개의 인용 링크를 분석하여 제 연구와 가장 관련성이 높고 평판이 좋은 저널을 찾는 것입니다. 가장 적합한 학술지 15 개만 제공하면 됩니다. 답변에는 저널 이름과 해당 일치 점수 (10 점 만점) 가 포함되어야 합니다. 일치 점수 역순으로 정렬된 텍스트 기반 엑셀 스프레드시트로 답변해 주시기 바랍니다.",
    "remark": "ScenerorSun 의 기여, B 사이트 @얌 포푸리에서 인용."
  },
  "website": null,
  "tags": [
    "contribute",
    "write",
    "latest"
  ],
  "id": 259,
  "weight": 189
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
