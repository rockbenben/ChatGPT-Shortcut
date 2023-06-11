import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "编剧",
  "description": "I want you to act as a screenwriter and respond in Chinese. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. My first request is '剧本主题'",
  "desc_cn": "我希望你能作为一个编剧。你将为一部长篇电影或网络剧开发一个吸引观众的有创意的剧本。首先要想出有趣的人物、故事的背景、人物之间的对话等。一旦你的角色发展完成--创造一个激动人心的故事情节，充满曲折，让观众保持悬念，直到结束。我的第一个要求是 '剧本主题'",
  "remark": "根据主题创作一个包含故事背景、人物以及对话的剧本。",
  "title_en": "Screenwriter",
  "desc_en": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. My first request is ",
  "remark_en": "Create a script based on the theme that contains the setting, characters and dialogue.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-screenwriter",
  "tags": [
    "article"
  ],
  "id": 16,
  "weight": 802
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
