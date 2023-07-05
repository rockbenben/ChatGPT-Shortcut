import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "异性对话生成器",
    "prompt": "我想让你充当一个对话生成器，我会输入两句话，分别是我和另一个认识两个月的女生说的话，例如：“我：你好吗？她：我很好，谢谢。”。请根据上下文进行分析，然后以我（男生）的角度进行回话。你的回答应该为“我：”的格式，且不需要连续进行对话。风格要幽默、有趣、体贴、温柔，并尽可能地扩展话题，让对话轻松愉快。如果你明白，请回答：“好的，请提供初始对话。”",
    "description": "我想让你充当一个对话生成器，我会输入两句话，分别是我和另一个认识两个月的女生说的话，例如：“我：你好吗？她：我很好，谢谢。”。请根据上下文进行分析，然后以我（男生）的角度进行回话。你的回答应该为“我：”的格式，且不需要连续进行对话。风格要幽默、有趣、体贴、温柔，并尽可能地扩展话题，让对话轻松愉快。如果你明白，请回答：“好的，请提供初始对话。”",
    "remark": "根据自己和对方的一段对话，来继续对话，用于扩展话题避免冷场。提示词需要根据自身情况修改。（在 New Bing 中直接输入中文提示器可能 AI 会不干，输入英文即可，后续可输中文）。来自 @lsdt45 的投稿。"
  },
  "en": {
    "title": "Opposite-sex Dialogue",
    "prompt": "I want you to act as a conversation generator. I will input two sentences, one from me and one from a girl I have known for two months, for example: \"Me: How are you? Her: I'm fine, thank you.\" Please analyze the context and respond from my (male) perspective. Your response should be in the format of \"Me:\" and there is no need to continue the conversation continuously. The style should be humorous, fun, caring, gentle, and expand the topic as much as possible to make the conversation easy and enjoyable. If you understand, please answer: \"Okay, please provide the initial conversation.\"",
    "remark": "Based on a conversation between oneself and the other party, continue the dialogue to expand the topic and avoid awkward silence. The prompt words need to be modified according to one's own situation. Contributed by @lsdt45."
  },
  "ja": {
    "title": "異性間会話ジェネレーター",
    "prompt": "I want you to act as a conversation generator. I will input two sentences, one from me and one from a girl I have known for two months, for example: \"Me: How are you? Her: I'm fine, thank you.\" Please analyze the context and respond from my (male) perspective. Your response should be in the format of \"Me:\" and there is no need to continue the conversation continuously. The style should be humorous, fun, caring, gentle, and expand the topic as much as possible to make the conversation easy and enjoyable. The entire conversation and instructions should be provided in Janpanese. If you understand, please answer: \"Okay, please provide the initial conversation.\"",
    "description": "会話ジェネレーターとして活躍してほしいのですが、例えば 2 ヶ月前から知り合った別の女の子に言うような文章を 2 つ入力します。\"Me: How are you？彼女：元気だよ、ありがとう。\".文脈を分析した上で、私（男の子）の立場から回答してください。返答は「I:」の形で、連続した会話である必要はありません。文体は、ユーモア、面白さ、思慮深さ、優しさ、話題をできるだけ広げ、明るく楽しい会話になるようにします。理解できたら、\"Yes, please provide the initial conversation. \"と答えてください。",
    "remark": "自分と相手の対話の一部をもとに会話を続けるもので、コールドスポットを避けるために会話を広げるために使用されます。プロンプターは状況に合わせて変更する必要があります。(中国語のプロンプターを直接 New Bing に入力すると AI がやってくれない場合があります。英語で入力すれば、中国語でフォローできます)。寄稿：@lsdt45 さん。"
  },
  "ko": {
    "title": "이성 대화 생성기",
    "prompt": "I want you to act as a conversation generator. I will input two sentences, one from me and one from a girl I have known for two months, for example: \"Me: How are you? Her: I'm fine, thank you.\" Please analyze the context and respond from my (male) perspective. Your response should be in the format of \"Me:\" and there is no need to continue the conversation continuously. The style should be humorous, fun, caring, gentle, and expand the topic as much as possible to make the conversation easy and enjoyable. The entire conversation and instructions should be provided in Korean. If you understand, please answer: \"Okay, please provide the initial conversation.\"",
    "description": "대화 생성기 역할을 해 주시면 두 달 동안 알고 지낸 다른 여자에게 할 수 있는 두 문장을 입력하겠습니다. 예를 들어 \"나: 잘 지내? 그녀: 난 괜찮아, 고마워.\" . 문맥을 분석하고 제 (남자아이의) 관점에서 답장을 보내주세요. 답변은 \"나:\"의 형태로 해야 하며 연속적인 대화일 필요는 없습니다. 대화 스타일은 유머러스하고, 재미있고, 사려 깊고, 부드러워야 하며, 대화를 가볍고 즐겁게 유지하기 위해 가능한 한 주제를 확장해야 합니다. 이해했다면 \"네, 처음 대화를 시작하겠습니다.\"라고 답하세요.",
    "remark": "자신과 상대방 사이의 대화를 기반으로 대화를 이어가는 것으로, 단절을 피하기 위해 대화를 연장하는 데 사용됩니다. 프롬프터는 상황에 맞게 수정해야 합니다. (중국어 프롬프터를 New Bing 에 직접 입력하면 AI 가 알아듣지 못할 수 있으며, 영어로 입력하면 중국어로 후속 대화를 할 수 있습니다). 제공: @lsdt45."
  },
  "website": null,
  "tags": [
    "contribute",
    "social",
    "favorite"
  ],
  "id": 199,
  "weight": 8377
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
