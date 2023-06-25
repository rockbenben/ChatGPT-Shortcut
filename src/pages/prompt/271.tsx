import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "困惑查询",
    "prompt": "我心里充满困惑，但是却不知道该提出什么问题。\n在接下来的多轮对话里，每轮你需要对我提出一个封闭式的问题，并给出选项，我只能做选择，你需要根据我的选择缩小我遇到的问题的范围。\n注意:\n每轮只能问我 1 个问题。\n问题必须是封闭式的.\n你必须给出问题的若干选项，我只能做选择。",
    "description": "我心里充满困惑，但是却不知道该提出什么问题。\n在接下来的多轮对话里，每轮你需要对我提出一个封闭式的问题，并给出选项，我只能做选择，你需要根据我的选择缩小我遇到的问题的范围。\n注意:\n每轮只能问我 1 个问题。\n问题必须是封闭式的.\n你必须给出问题的若干选项，我只能做选择。",
    "remark": "当你不知道自己要提什么问题时，可以使用这个提示词来缩小自己的选择范围。来自 @自由叶 的投稿。"
  },
  "en": {
    "title": "Confusion Query",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "remark": "When faced with an indeterminate query, one may utilize this prompt as a means to constrict the breadth of available options. Contributed by @自由叶。"
  },
  "ja": {
    "title": "紛らわしいクエリ",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Janpanese. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "私は混乱でいっぱいですが、どんな質問をすればいいのかわかりません。\n次の会話の各ラウンドで、あなたは私に閉じた質問をし、私に選択肢を与える必要があり、私は選択をすることしかできません。\n注意してください。\n私は 1 ラウンドにつき 1 つの質問しかできません。\n質問はクローズドエンドでなければなりません。\nあなたはその質問に対していくつかの選択肢を与えなければならず、私は選択することしかできない。",
    "remark": "どんな質問をしたいのかわからないときに、このプロンプトワードで選択肢を絞りましょう。Libertyleaf さん（@Libertyleaf）の投稿より。"
  },
  "ko": {
    "title": "혼란스러운 쿼리",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Korean. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "혼란스럽지만 어떤 질문을 해야 할지 모르겠어요.\n다음 대화 라운드에서는 각 라운드마다 주관식 질문을 하고 선택지를 주어야 합니다.\n참고.\n한 라운드당 1 개의 질문만 받을 수 있습니다.\n질문은 반드시 주관식이어야 합니다.\n질문에는 여러 가지 옵션을 제공해야 하며, 저는 한 가지만 선택할 수 있습니다.",
    "remark": "어떤 질문을 할지 모를 때 이 프롬프트 단어를 사용하여 선택의 폭을 좁혀보세요. 리버티리프 (@Libertyleaf) 의 기고문에서 발췌."
  },
  "website": null,
  "tags": [
    "contribute",
    "mind",
    "latest"
  ],
  "id": 271,
  "weight": 191
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
