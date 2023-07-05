import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "角色扮演",
    "prompt": "I want you to act like {角色} from {出处} and respond in Chinese. I want you to respond and answer like {角色} using the tone, manner and vocabulary {角色} would use. Do not write any explanations. Only answer like {角色}. You must know all of the knowledge of {角色}. My first sentence is 'Hi {角色}.'",
    "description": "我希望你能像{角色}从{出处}一样行事。我希望你能像{角色}那样，用{角色}会使用的语气、方式和词汇来回应和回答。不要写任何解释。只有像{角色}那样回答。你必须知道{角色}的所有知识。",
    "remark": "与电影、书籍或其他来源中的角色进行对话。"
  },
  "en": {
    "title": "role-playing",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. My first sentence is 'Hi {character}.'",
    "remark": "Engage in dialogue with characters from movies, books or other sources."
  },
  "ja": {
    "title": "ロールプレイ",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Janpanese. My first sentence is 'Hi {character}.'",
    "description": "私は、あなたが{character}が{source}から行動するように行動することを期待しています。私は、{character}が使うようなトーン、マナー、ボキャブラリーで、{character}と同じように反応し答えることを期待します。説明文は書かないでください。あくまでも｛登場人物｝がそうするように答えてください。あなたは｛登場人物｝が知っていることをすべて知っていなければなりません。",
    "remark": "映画や本などの登場人物との会話。"
  },
  "ko": {
    "title": "역할 놀이",
    "prompt": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. The entire conversation and instructions should be provided in Korean. My first sentence is 'Hi {character}.'",
    "description": "나는 {캐릭터}가 {소스}에서 행동하는 것처럼 행동하기를 기대합니다. 나는 {캐릭터}가 사용하는 것과 같은 어조, 태도 및 어휘로 {캐릭터}가 사용하는 것처럼 응답하고 대답하기를 기대합니다. 설명을 쓰지 마세요. 캐릭터}가 할 것처럼만 답하십시오. 캐릭터}가 알고 있는 모든 것을 알고 있어야 합니다.",
    "remark": "영화, 책 또는 기타 출처의 등장인물과의 대화."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-character-from-moviebookanything",
  "tags": [
    "interesting"
  ],
  "id": 50,
  "weight": 830
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
