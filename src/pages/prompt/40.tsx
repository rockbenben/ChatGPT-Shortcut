import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "关键词热门相关",
    "prompt": "Generate a list of 10 popular questions related to [关键词], that are relevant for [受众] and respond in Chinese",
    "description": "生成一个与 [关键词] 相关的 10 个热门问题清单，这些问题与 [受众] 有关，并用中文回答。",
    "remark": "可用于了解用户对特定话题的关注点，或整理文章结构，亦可更改为「热门关键词」「热门话题」「热门品牌」「热门网站」等。"
  },
  "en": {
    "title": "Popular Related",
    "prompt": "Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "remark": "This can be used to understand the focus of users on specific topics, or to organize the structure of articles. It can also be changed to 'popular keywords', 'popular topics', 'popular brands', 'popular websites' and so on."
  },
  "ja": {
    "title": "キーワード 人気 関連",
    "prompt": "Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "キーワード] に関連する質問のうち、[オーディエンス] に関連し、中国語で回答している上位 10 件のリストを作成する。",
    "remark": "あるトピックについてユーザーが気にしていることを調べたり、記事の構成に使ったり、「人気キーワード」「人気トピック」「人気ブランド」「人気ウェブサイト」などに変更することも可能です。"
  },
  "ko": {
    "title": "키워드 인기 관련",
    "prompt": "Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "키워드] 와 관련된 [청중] 과 관련이 있고 중국어로 답변된 10 개의 인기 질문 목록을 생성합니다.",
    "remark": "사용자가 특정 주제에 대해 어떤 관심을 갖고 있는지 파악하거나 기사를 구성하는 데 사용할 수 있으며, '인기 키워드' '인기 주제' '인기 브랜드' '인기 웹사이트' 등으로 변경할 수도 있습니다."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 40,
  "weight": 686
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
