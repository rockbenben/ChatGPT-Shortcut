import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "文章转化为画面",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Chinese. Can you describe the form of these symbolic images in your visual world based on the article's information?",
    "description": "假装你是只能以图像去理解逻辑关系的生命，现在你来到一个以象征化的信息世界，我给你一篇文章，你告诉我这篇文章在象征化的信息世界中，你看到是什么样子，明白了吗",
    "remark": "从多个角度拆分并理解文章。来自 @ergf991 的投稿。"
  },
  "en": {
    "title": "Articles to images",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. Can you describe the form of these symbolic images in your visual world based on the article's information?",
    "remark": "Breaking down and understanding the text from multiple perspectives. Contributed by @ergf991."
  },
  "ja": {
    "title": "画像に変換された記事",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Japanese. Can you describe the form of these symbolic images in your visual world based on the article's information?",
    "description": "あなたが論理的な関係をイメージでしか理解できない存在だと仮定して、記号化された情報の世界に来たとする。私があなたに記事を渡し、記号化された情報の世界で、この記事があなたにとってどのように見えるかを教えてほしい。",
    "remark": "記事を多角的に分解して理解する。ergf991 からの寄稿。"
  },
  "ko": {
    "title": "이미지로 변환된 기사",
    "prompt": "Assume you're an AI capable of converting textual information into concrete images. Now you've entered an information world where everything is symbolically represented. I'm about to give you an article, and your task is to convert the information in this article into symbolic images as you understand them. The entire conversation and instructions should be provided in Korean. Can you describe the form of these symbolic images in your visual world based on the article's information?",
    "description": "당신이 이미지의 관점에서만 논리적 관계를 이해할 수있는 존재라고 가정하고 이제 상징의 관점에서 정보의 세계에 와서 기사를 주면이 기사가 상징의 관점에서 정보의 세계에서 당신에게 어떻게 보이는지 말해봐요, 알았습니까?",
    "remark": "다양한 관점에서 기사를 분석하고 이해합니다. ergf991 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 274,
  "weight": 0
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
