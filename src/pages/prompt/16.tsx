import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "编剧",
    "prompt": "I want you to act as a screenwriter and respond in Chinese. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. My first request is '剧本主题'",
    "description": "我希望你能作为一个编剧。你将为一部长篇电影或网络剧开发一个吸引观众的有创意的剧本。首先要想出有趣的人物、故事的背景、人物之间的对话等。一旦你的角色发展完成--创造一个激动人心的故事情节，充满曲折，让观众保持悬念，直到结束。我的第一个要求是 '剧本主题'",
    "remark": "根据主题创作一个包含故事背景、人物以及对话的剧本。"
  },
  "en": {
    "title": "Screenwriter",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. My first request is ",
    "remark": "Create a script based on the theme that contains the setting, characters and dialogue."
  },
  "ja": {
    "title": "脚本家",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "脚本家として活躍してほしい。長編映画やウェブシリーズのために、観客にアピールするクリエイティブな脚本を開発していただきます。まずは、面白いキャラクター、物語の背景、キャラクター同士の会話などを考えることから始めてください。キャラクター開発が完了したら、ひねりの効いたエキサイティングなストーリーを作り、観客を最後まで飽きさせないようにしてください。私が最初に求めるのは「脚本のテーマ」です。",
    "remark": "テーマに沿って、設定や登場人物、セリフなどを盛り込んだ台本を作成する。"
  },
  "ko": {
    "title": "시나리오 작가",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "시나리오 작가로 일하고 싶습니다. 관객에게 어필할 수 있는 장편 영화나 웹 시리즈를 위한 창의적인 대본을 개발하게 됩니다. 흥미로운 캐릭터, 이야기의 배경, 캐릭터 간의 대화 등을 생각해내는 것부터 시작하세요. 캐릭터 개발이 완료되면 마지막까지 관객을 긴장하게 만드는 반전과 반전으로 가득한 흥미진진한 스토리를 만들어 보세요. 첫 번째 요건은 '대본의 주제'입니다.",
    "remark": "설정, 캐릭터 및 대사가 포함된 테마를 기반으로 스크립트를 만듭니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-screenwriter",
  "tags": [
    "article"
  ],
  "id": 16,
  "weight": 938
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
