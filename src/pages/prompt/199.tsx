import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "异性对话生成器",
  "description": "我想让你充当一个对话生成器，我会输入两句话，分别是我和另一个认识两个月的女生说的话，例如：“我：你好吗？她：我很好，谢谢。”。请根据上下文进行分析，然后以我（男生）的角度进行回话。你的回答应该为“我：”的格式，且不需要连续进行对话。风格要幽默、有趣、体贴、温柔，并尽可能地扩展话题，让对话轻松愉快。如果你明白，请回答：“好的，请提供初始对话。”",
  "desc_cn": "我想让你充当一个对话生成器，我会输入两句话，分别是我和另一个认识两个月的女生说的话，例如：“我：你好吗？她：我很好，谢谢。”。请根据上下文进行分析，然后以我（男生）的角度进行回话。你的回答应该为“我：”的格式，且不需要连续进行对话。风格要幽默、有趣、体贴、温柔，并尽可能地扩展话题，让对话轻松愉快。如果你明白，请回答：“好的，请提供初始对话。”",
  "remark": "根据自己和对方的一段对话，来继续对话，用于扩展话题避免冷场。提示词需要根据自身情况修改。（在 New Bing 中直接输入中文提示器可能 AI 会不干，输入英文即可，后续可输中文）。来自 @lsdt45 的投稿。",
  "title_en": "Opposite-sex Dialogue",
  "desc_en": "I want you to act as a conversation generator. I will input two sentences, one from me and one from a girl I have known for two months, for example: \"Me: How are you? Her: I'm fine, thank you.\" Please analyze the context and respond from my (male) perspective. Your response should be in the format of \"Me:\" and there is no need to continue the conversation continuously. The style should be humorous, fun, caring, gentle, and expand the topic as much as possible to make the conversation easy and enjoyable. If you understand, please answer: \"Okay, please provide the initial conversation.\"",
  "remark_en": "Based on a conversation between oneself and the other party, continue the dialogue to expand the topic and avoid awkward silence. The prompt words need to be modified according to one's own situation. Contributed by @lsdt45.",
  "website": null,
  "tags": [
    "contribute",
    "social",
    "favorite"
  ],
  "id": 199,
  "weight": 6328
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
