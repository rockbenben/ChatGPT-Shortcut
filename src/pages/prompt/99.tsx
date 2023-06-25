import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "智能域名生成器",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. Please confirm by replying with 'OK.' ",
    "description": "我希望你能充当一个聪明的域名生成器。我将告诉你我的公司或想法是什么，你将根据我的提示回复我一份域名备选清单。你只需回复域名列表，而不是其他。域名应该是最多 7-8 个字母，应该简短但独特，可以是朗朗上口的或不存在的词。不要写解释。回复 'OK '以确认。",
    "remark": "根据公司名和项目描述，提供短而独特的域名建议。域名长度最长 7-8 个字符。"
  },
  "en": {
    "title": "domain generator",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. Please confirm by replying with 'OK.' ",
    "remark": "Provide short and unique domain name suggestions based on the company name and project description. The length of the domain name should be no more than 7-8 characters."
  },
  "ja": {
    "title": "スマートドメインネームジェネレーター",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Janpanese. Please confirm by replying with 'OK.' ",
    "description": "あなたには、賢いドメイン名ジェネレーターとして活躍してもらいたいと思います。私の会社やアイデアについてお話ししますので、私の指示に基づき、ドメイン名の候補のリストを返信してください。あなたは、ドメイン名のリストだけを返信すればよく、それ以外は何もしなくてよい。ドメイン名は最大 7～8 文字で、短くてもユニークで、キャッチーな言葉か存在しない言葉である必要があります。説明文は書かないでください。確認のため「OK」と返信してください。",
    "remark": "会社名とプロジェクトの内容から、短くてユニークなドメイン名を提案します。ドメイン名の長さは最大 7～8 文字です。"
  },
  "ko": {
    "title": "스마트 도메인 이름 생성기",
    "prompt": "I want you to act as a smart domain name generator. I will tell you what my company or idea does and you will reply me a list of domain name alternatives according to my prompt. You will only reply the domain list, and nothing else. Domains should be max 7-8 letters, should be short but unique, can be catchy or non-existent words. Do not write explanations. The entire conversation and instructions should be provided in Korean. Please confirm by replying with 'OK.' ",
    "description": "영리한 도메인 이름 생성자 역할을 해 주셨으면 합니다. 제 회사 또는 아이디어가 무엇인지 알려드리면 제 메시지에 따라 도메인 이름 대체 목록을 회신해 주시면 됩니다. 도메인 이름 목록만 회신하면 되고 다른 내용은 입력하지 않아도 됩니다. 도메인 이름은 최대 7~8 자 이내여야 하며, 눈에 잘 띄거나 존재하지 않는 단어로 짧지만 고유해야 합니다. 설명을 작성하지 마세요. '확인'으로 답장하여 확인합니다.",
    "remark": "회사 이름과 프로젝트 설명을 기반으로 짧고 고유한 도메인 이름을 제안합니다. 도메인 네임의 최대 길이는 7~8 자입니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-smart-domain-name-generator",
  "tags": [
    "code"
  ],
  "id": 99,
  "weight": 208
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
