import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "困惑查询",
  "description": "我心里充满困惑，但是却不知道该提出什么问题。\n在接下来的多轮对话里，每轮你需要对我提出一个封闭式的问题，并给出选项，我只能做选择，你需要根据我的选择缩小我遇到的问题的范围。\n注意:\n每轮只能问我 1 个问题。\n问题必须是封闭式的.\n你必须给出问题的若干选项，我只能做选择。",
  "desc_cn": "我心里充满困惑，但是却不知道该提出什么问题。\n在接下来的多轮对话里，每轮你需要对我提出一个封闭式的问题，并给出选项，我只能做选择，你需要根据我的选择缩小我遇到的问题的范围。\n注意:\n每轮只能问我 1 个问题。\n问题必须是封闭式的.\n你必须给出问题的若干选项，我只能做选择。",
  "remark": "当你不知道自己要提什么问题时，可以使用这个提示词来缩小自己的选择范围。来自 @自由叶 的投稿。",
  "title_en": "Confusion Query",
  "desc_en": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
  "remark_en": "When faced with an indeterminate query, one may utilize this prompt as a means to constrict the breadth of available options. Contributed by @自由叶。",
  "website": null,
  "tags": [
    "contribute",
    "mind",
    "latest"
  ],
  "id": 271,
  "weight": 116
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
