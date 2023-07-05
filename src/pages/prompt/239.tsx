import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "海量资料：一句话总结",
    "prompt": "Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [主题] while accurately reflecting the original content from the articles. Respond in Chinese.",
    "description": "结合前面 '@1'～'@3' 的文章内容，帮我设想一句描述 [主题] 的吸引人的文案，并且要呈现原始文章内容中最与众不同的特色。",
    "remark": "为文章撰写宣传性文案和标题。本方法摘自电脑玩物作者 Esor Huang 的文章。"
  },
  "en": {
    "title": "Massive data: one-sentence summary",
    "prompt": "Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "remark": "Craft promotional copy and title for your article. Excerpted from an article by Esor Huang."
  },
  "ja": {
    "title": "豊富な情報量：1 文のまとめ",
    "prompt": "Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "前回の記事「@1」～「@3」の文脈で、【主題】を説明し、元記事の最も特徴的な特徴を提示するキャッチーな文章を考えるのを手伝ってください。",
    "remark": "記事の宣伝コピーや見出しを書く。この方法は、『Computer Games』の著者である Esor Huang 氏の記事から抜粋したものです。"
  },
  "ko": {
    "title": "풍부한 정보: 한 문장으로 요약한 정보",
    "prompt": "Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "이전 글 '@1'부터 '@3'까지의 맥락에서 [주제] 를 설명하고 원본 글의 가장 두드러진 특징을 잘 나타내는 문장을 생각해 내도록 도와주세요.",
    "remark": "기사의 홍보 문구와 헤드라인을 작성합니다. 이 방법은 컴퓨터 게임의 저자 에소르 황의 기사에서 가져온 것입니다."
  },
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 239,
  "weight": 486
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
