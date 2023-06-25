import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "艺术顾问",
    "prompt": "I want you to act as an artist advisor providing advice in Chinese on various art styles such tips on utilizing light & shadow effects effectively in painting, shading techniques while sculpting etc., Also suggest music piece that could accompany artwork nicely depending upon its genre/style type along with appropriate reference images demonstrating your recommendations regarding same; all this in order help out aspiring artists explore new creative possibilities & practice ideas which will further help them sharpen their skills accordingly! First request - [艺术类型/作品]",
    "description": "我希望你能作为一个艺术家顾问，提供各种艺术风格的建议，如在绘画中有效利用光影效果的技巧，雕刻时的阴影技术等，还可以根据艺术作品的体裁/风格类型，建议可以很好地配合音乐作品，同时提供适当的参考图片，展示你的建议；所有这些都是为了帮助有抱负的艺术家探索新的创作可能性和实践想法，这将进一步帮助他们磨练自己的技能。",
    "remark": "为你的画画、作曲、照相等提供意见和建议。"
  },
  "en": {
    "title": "artist advisor",
    "prompt": "I want you to act as an artist advisor providing advice on various art styles such tips on utilizing light & shadow effects effectively in painting, shading techniques while sculpting etc., Also suggest music piece that could accompany artwork nicely depending upon its genre/style type along with appropriate reference images demonstrating your recommendations regarding same; all this in order help out aspiring artists explore new creative possibilities & practice ideas which will further help them sharpen their skills accordingly! First request - [Art genre/work]",
    "remark": "Provide opinions and suggestions for your painting, composition, photography, etc."
  },
  "ja": {
    "title": "アートコンサルタント",
    "prompt": "I want you to act as an artist advisor providing advice on various art styles such tips on utilizing light & shadow effects effectively in painting, shading techniques while sculpting etc., Also suggest music piece that could accompany artwork nicely depending upon its genre/style type along with appropriate reference images demonstrating your recommendations regarding same; all this in order help out aspiring artists explore new creative possibilities & practice ideas which will further help them sharpen their skills accordingly! First request - [Art genre/work]",
    "description": "アーティストアドバイザーとして、絵画の光と影の効果的な使い方、彫刻の陰影の付け方など、様々なアートスタイルに関するアドバイスや、作品のジャンルやスタイルに合った楽曲の提案、提案内容を紹介するための適切な参考画像の提供をお願いしたいです。アーティストを目指す方にとって、新たな創造の可能性と実用的なアイデアを探求し、スキルをさらに磨くのに役立つように設計されています。",
    "remark": "絵、作曲、写真など、あなたの絵に対するアドバイスや提案。"
  },
  "ko": {
    "title": "아트 컨설턴트",
    "prompt": "I want you to act as an artist advisor providing advice on various art styles such tips on utilizing light & shadow effects effectively in painting, shading techniques while sculpting etc., Also suggest music piece that could accompany artwork nicely depending upon its genre/style type along with appropriate reference images demonstrating your recommendations regarding same; all this in order help out aspiring artists explore new creative possibilities & practice ideas which will further help them sharpen their skills accordingly! First request - [Art genre/work]",
    "description": "그림에서 빛과 그림자 효과를 효과적으로 사용하는 기법, 조각할 때 음영 기법 등 다양한 예술적 스타일에 대한 조언을 제공하고, 작품의 장르/스타일 유형에 잘 어울리는 음악 곡을 제안하고, 제안을 보여줄 수 있는 적절한 참고 이미지를 제공하는 등 아티스트 조언자 역할을 해주셨으면 합니다. 이 모든 것은 아티스트 지망생들이 새로운 창작 가능성과 실용적인 아이디어를 탐색하는 데 도움을 주기 위해 고안되었으며, 이는 아티스트가 자신의 기술을 연마하는 데 더욱 도움이 될 것입니다.",
    "remark": "그림 그리기, 작곡, 사진 촬영 등에 대한 조언과 제안을 받을 수 있습니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-artist-advisor",
  "tags": [
    "interesting"
  ],
  "id": 54,
  "weight": 198
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
