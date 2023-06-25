import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "维基百科页面",
    "prompt": "I want you to act as a Wikipedia page and respond in Chinese. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. My first topic is [主题]",
    "description": "我希望你能扮演维基百科页面的角色。我会给你一个主题名称，然后你将以维基百科页面的格式提供该主题的摘要。您的摘要应具有信息性和事实性，涵盖该主题最重要的方面。请从概述该主题的介绍段开始撰写您的摘要。",
    "remark": "帮助用户获取关于某个主题的基本信息，并以维基百科页面的格式提供摘要。通过这种方式，用户可以快速了解一个主题的相关信息，从而更好地了解和掌握该主题。"
  },
  "en": {
    "title": "Wikipedia page",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. My first topic is \"The Great Barrier Reef.\"",
    "remark": "Help users obtain basic information about a certain topic and provide a summary in the format of a Wikipedia page. Through this method, users can quickly understand relevant information about a topic, thus better understanding and mastering it."
  },
  "ja": {
    "title": "ウィキペディアのページ",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Janpanese. My first topic is \"The Great Barrier Reef.\"",
    "description": "ウィキペディアのページの役割を担っていただきたいのです。私はあなたにトピック名を与え、あなたはそのトピックの要約をウィキペディアのページのフォーマットで提供してください。あなたのアブストラクトは、トピックの最も重要な側面をカバーする、情報的で事実的なものでなければなりません。抄録は、トピックの概要を説明する序文で始めてください。",
    "remark": "ユーザーがトピックに関する基本的な情報にアクセスするのを助け、Wikipedia のページの形式で要約を提供します。このように、ユーザーはトピックについて素早く学ぶことができ、その結果、そのテーマについてより深く理解し、把握することができます。"
  },
  "ko": {
    "title": "위키피디아 페이지",
    "prompt": "I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. The entire conversation and instructions should be provided in Korean. My first topic is \"The Great Barrier Reef.\"",
    "description": "여러분이 위키백과 페이지의 역할을 해 주셨으면 합니다. 제가 주제 이름을 알려드리면 여러분은 해당 주제에 대한 요약을 위키백과 페이지 형식으로 작성해 주세요. 초록은 주제의 가장 중요한 측면을 다루면서 유익하고 사실적이어야 합니다. 초록은 주제를 개괄적으로 설명하는 서론 단락으로 시작하세요.",
    "remark": "사용자가 주제에 대한 기본 정보에 액세스할 수 있도록 도와주고 위키백과 페이지 형식의 요약을 제공합니다. 이러한 방식으로 사용자는 주제에 대해 빠르게 학습하여 해당 주제를 더 잘 이해하고 파악할 수 있습니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-wikipedia-page",
  "tags": [
    "tool"
  ],
  "id": 137,
  "weight": 385
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
