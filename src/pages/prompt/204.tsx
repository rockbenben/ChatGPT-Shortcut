import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "口播脚本",
    "prompt": "write an article about [主题] in a human-like style, simple Chinese, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures.",
    "description": "请以人的口吻，采用缩略语、成语、过渡短语、感叹词、悬垂修饰语和口语化语言，避免重复短语和不自然的句子结构，撰写一篇关于 [主题] 的文章。",
    "remark": "撰写视频、直播、播客、分镜头和其他口语内容的脚本。来自 @Bettycroco 的投稿。"
  },
  "en": {
    "title": "Spoken script",
    "prompt": "write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures.",
    "remark": "write scripts for live broadcasts, videos, podcasts and other types of spoken content. Contributed by @Bettycroco."
  },
  "ja": {
    "title": "オーラルスクリプト",
    "prompt": "write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures.",
    "description": "トピック] に関するエッセイを、略語、イディオム、経過句、感嘆詞、ぶら下がり修飾語、口語などを使い、繰り返しのフレーズや不自然な文構造を避け、人間の声で書きなさい。",
    "remark": "ビデオ、ライブストリーム、ポッドキャスト、サブ、その他のスポークワードコンテンツのスクリプトを作成。ベティクロコ（@Bettycroco）さんからの寄稿です。"
  },
  "ko": {
    "title": "구술 스크립트",
    "prompt": "write an article about [TOPIC] in a human-like style, simple English, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural sentence structures.",
    "description": "주제] 에 대한 에세이를 사람의 목소리로 작성하되, 약어, 관용구, 전환구, 느낌표, 수식어 및 구어체를 사용하고 반복되는 구절과 부자연스러운 문장 구조를 피하세요.",
    "remark": "동영상, 라이브 스트림, 팟캐스트, 서브 및 기타 음성 콘텐츠 스크립팅. 베티크로코의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "write"
  ],
  "id": 204,
  "weight": 4842
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
