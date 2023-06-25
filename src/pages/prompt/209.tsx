import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "小红书风格",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text and respond in Chinese. Please begin by editing the following text: [小红书内容]",
    "description": "请使用 Emoji 风格编辑以下段落，该风格以引人入胜的标题、每个段落中包含表情符号和在末尾添加相关标签为特点。请确保保持原文的意思。",
    "remark": "将文本改写成类似小红书的 Emoji 风格。"
  },
  "en": {
    "title": "Emoji writing",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. Please begin by editing the following text: ",
    "remark": "Rewrite text using emoticon style."
  },
  "ja": {
    "title": "リトルレッドブックスタイル",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "以下の段落を、キャッチーな見出し、各段落に絵文字、最後に関連するタグを配置した「絵文字スタイル」で編集してください。原文の意味が保たれるようにお願いします。",
    "remark": "Little Red Book の Emoji スタイルに似せて文章を書き換える。"
  },
  "ko": {
    "title": "리틀 레드 북 스타일",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "눈에 띄는 제목, 각 단락의 이모티콘, 마지막에 관련 태그가 있는 이모티콘 스타일을 사용하여 다음 단락을 편집하세요. 원본 텍스트의 의미가 유지되는지 확인하세요.",
    "remark": "리틀 레드 북의 이모티콘 스타일과 비슷하도록 텍스트를 다시 작성합니다."
  },
  "website": null,
  "tags": [
    "personal",
    "favorite",
    "write"
  ],
  "id": 209,
  "weight": 19945
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
