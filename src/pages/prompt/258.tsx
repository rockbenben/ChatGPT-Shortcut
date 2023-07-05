import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "论文标题生成",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. My abstract is \"XXX\", my key words are \"XXX\"",
    "description": "我将向你提供一篇任何语言的科学论文的摘要和关键词，你将检测该语言并以相同的语言进行回复。你的任务是根据摘要和关键词用相同的语言向我提供科学论文的标题。科学论文的标题应该是简洁、明确和有信息量的。你应该避免使用诸如研究、调查、发展或观察等词语。确保标题能够立即抓住听众的心。",
    "remark": "根据摘要和关键词生成论文题目。来自 @ScenerorSun 的投稿，引用自 B 站@洋芋锅巴。"
  },
  "en": {
    "title": "Journal Title Generator",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. My abstract is \"XXX\", my key words are \"XXX\"",
    "remark": "Generate a paper title based on the abstract and keywords. Contributed by @ScenerorSun, quoted from Bilibili (@洋芋锅巴)."
  },
  "ja": {
    "title": "論文タイトル生成",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Janpanese. My abstract is \"XXX\", my key words are \"XXX\"",
    "description": "私が科学論文の要旨とキーワードを任意の言語で提供し、あなたはその言語を検出し、同じ言語で応答します。あなたの仕事は、その要旨とキーワードに基づいて、同じ言語で科学論文のタイトルを私に提供することです。科学論文のタイトルは、簡潔でわかりやすく、情報量の多いものでなければなりません。研究、調査、開発、観察などの言葉を使うのは避けるべきです。タイトルがすぐに聴衆の注意を引くようにすること。",
    "remark": "抄録とキーワードから論文タイトルを生成する。寄稿：@ScenerorSun、引用：B サイト@Yam Potpourri より。"
  },
  "ko": {
    "title": "논문 제목 생성",
    "prompt": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. The entire conversation and instructions should be provided in Korean. My abstract is \"XXX\", my key words are \"XXX\"",
    "description": "어떤 언어로 된 과학 논문의 초록과 키워드를 제공하면 해당 언어를 감지하여 같은 언어로 응답합니다. 귀하의 임무는 초록과 키워드를 바탕으로 동일한 언어로 과학 논문의 제목을 제공하는 것입니다. 과학 논문 제목은 간결하고 명확하며 유익한 정보여야 합니다. 연구, 조사, 개발 또는 관찰과 같은 단어는 사용하지 않아야 합니다. 제목이 청중의 시선을 즉시 사로잡을 수 있어야 합니다.",
    "remark": "초록과 키워드로 논문 제목 생성하기. ScenerorSun 의 기여, B 사이트 @얌 포푸리에서 인용."
  },
  "website": null,
  "tags": [
    "contribute",
    "write",
    "latest"
  ],
  "id": 258,
  "weight": 260
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
