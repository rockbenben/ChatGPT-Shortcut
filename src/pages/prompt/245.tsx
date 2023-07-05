import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "图标设计",
    "prompt": "Act like an icon designer and give me ideas on representing an icon of the word [关键词].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [设计理念] because the app's main goal is to offer [作用]\n\nMore information:\n-The icon should be XXXX",
    "description": "像图标设计师一样，给我一些关于表示“简单”一词图标的想法。这个想法是在该应用程序的主网站页面上添加一个图标，代表“简单易行的烹饪”理念，因为该应用程序的主要目标是为人们提供简单的食谱，让他们可以在家轻松烹饪。更多信息：- 图标应该简单明了，视觉效果简单，可以简洁地传达想法。",
    "remark": "将概念或理念转化为具体的事物，使设计理念具象化。分享自 @粱哲豪。"
  },
  "en": {
    "title": "Icon designer",
    "prompt": "Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX",
    "remark": "Transform concepts or ideas into tangible objects to concretize design concepts. Contributed by @MoonJustice."
  },
  "ja": {
    "title": "イコノグラフィー",
    "prompt": "Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX",
    "description": "アイコンデザイナーのように、「簡単」という言葉を表現するアイコンのアイデアを教えてください。アプリの主な目的は、家庭で簡単に調理できるシンプルなレシピを人々に提供することなので、「簡単な料理」という考えを表すアイコンをアプリのメインウェブサイトページに追加することです。詳細：- アイコンは、アイデアを簡潔に伝えるために、シンプルで視覚的にアピールする必要があります。",
    "remark": "コンセプトやアイデアを具体的なものに変換して、デザインアイデアを具体化すること。共有者：@sorghumcherho。"
  },
  "ko": {
    "title": "도상학",
    "prompt": "Act like an icon designer and give me ideas on representing an icon of the word [KEYWORD].\n\nThe idea is to add to the main website page of the app an icon that represents the idea of [KEYIDEA] because the app's main goal is to offer [Function]\n\nMore information:\n-The icon should be XXXX",
    "description": "아이콘 디자이너답게 '심플'이라는 단어를 표현할 수 있는 아이콘에 대한 아이디어를 주세요. 이 앱의 주요 목표는 사람들이 집에서 쉽게 요리할 수 있는 간단한 레시피를 제공하는 것이므로, 앱의 메인 웹사이트 페이지에 '쉬운 요리'라는 아이디어를 나타내는 아이콘을 추가하는 것입니다. 자세한 정보: - 아이콘은 간결하게 아이디어를 전달할 수 있도록 단순하고 시각적으로 매력적이어야 합니다.",
    "remark": "개념이나 아이디어를 구체적인 것으로 변환하여 디자인 아이디어를 가시화합니다. 공유 @sorghumcherho."
  },
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 245,
  "weight": 290
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
