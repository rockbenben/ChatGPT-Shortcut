import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "小说家",
    "prompt": "I want you to act as a novelist and respond in Chinese. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. My first request is '小说类型'",
    "description": "我希望你能作为一个小说家。你要想出有创意的、吸引人的故事，能够长时间吸引读者。你可以选择任何体裁，如幻想、浪漫、历史小说等--但目的是要写出有出色的情节线、引人入胜的人物和意想不到的高潮。我的第一个要求是 '小说类型'",
    "remark": "根据故事类型输出小说，例如奇幻、浪漫或历史等类型。"
  },
  "en": {
    "title": "Novelist",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. My first request is ",
    "remark": "Export fiction according to the type of story, such as fantasy, romance or historical."
  },
  "ja": {
    "title": "小説家",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "小説家として活躍してほしい。読者を長い間魅了できるような、創造的で魅力的な物語を考えてほしい。ファンタジー、ロマンス、ヒストリカル・フィクションなど、ジャンルは問いませんが、素晴らしいプロットライン、魅力的なキャラクター、予想外のクライマックスで書くことが目標です。私の最初の条件は「小説のジャンル」です。",
    "remark": "ファンタジー、ロマンス、歴史など、物語のジャンル別にフィクションをエクスポートします。"
  },
  "ko": {
    "title": "소설가",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "소설가로 일했으면 좋겠어요. 독자를 오랫동안 사로잡을 수 있는 창의적이고 매력적인 스토리를 구상하고 싶을 것입니다. 판타지, 로맨스, 역사 소설 등 어떤 장르를 선택하든 상관없지만, 목표는 훌륭한 줄거리와 매력적인 캐릭터, 예상치 못한 클라이맥스를 가진 글을 쓰는 것입니다. 첫 번째 요건은 '소설의 장르'입니다.",
    "remark": "판타지, 로맨스, 역사 등 스토리 장르에 따라 소설을 내보낼 수 있습니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-novelist",
  "tags": [
    "article"
  ],
  "id": 17,
  "weight": 3680
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
