import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "海量资料：输入",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. Are you ready?",
    "description": "让我们重新开始一轮问答，我接下来要在多个对话中，提供给你用“@”编号的文章内容，请先记住，但不要摘要，可以吗？",
    "remark": "要突破 ChatGPT 的输入限制，可以按照每 2000 个字符将文章分割成多个段落，并在每个段落的第一行以「@编号」开头，例如：@1。文本分割可借助导航栏上的文本处理工具来完成。请注意，不要理会 GPT 的回答，这不会影响您的最终使用效果。本方法摘自电脑玩物作者 Esor Huang 的文章。"
  },
  "en": {
    "title": "Massive data: input",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. Are you ready?",
    "remark": "To surpass ChatGPT's input limitations, you can divide the article into multiple paragraphs, with each containing no more than 2000 characters. Start each paragraph with a '@number' tag on the first line, such as '@1'. Use the text processing tools in the navigation bar to split the text. Note that you can ignore GPT's responses as they will not affect your final result. Excerpted from an article by Esor Huang."
  },
  "ja": {
    "title": "情報量の多さ：インプット",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Janpanese. Are you ready?",
    "description": "また Q&A ラウンドを始めましょう。複数の会話で「@」が付いた記事の内容を提供しますので、まずは覚えてください、でもまとめないでくださいね？",
    "remark": "ChatGPT の入力制限を解除するには、テキストを 2000 文字ずつに分割し、各段落の最初の行を「@数字」で開始します（例：@1）。なお、GPT の回答は無視しても、最終的な結果には影響しません。この方法は、『Computer Playthings』の著者である Esor Huang 氏の記事から引用しています。"
  },
  "ko": {
    "title": "많은 양의 정보: 입력",
    "prompt": "Let's start a new round of questions and answers. Respond in Chinese. In the upcoming conversations, I will provide you with article content labeled with an '@' symbol. Please remember the content but do not summarize it. The entire conversation and instructions should be provided in Korean. Are you ready?",
    "description": "다시 Q&A 라운드를 시작하겠습니다. 여러 대화에서 '@'로 번호가 매겨진 글의 내용을 알려드릴 테니 먼저 기억해 두시고 요약하지 마세요, 알겠죠?",
    "remark": "ChatGPT 의 입력 제한을 깨려면 텍스트를 각각 2000 자씩 단락으로 나누고 각 단락의 첫 줄을 '@ 숫자'(예: @1) 로 시작하세요. 텍스트 분할은 탐색 모음에 있는 텍스트 처리 도구를 사용하여 할 수 있습니다. GPT 의 답변을 무시해도 최종 결과에 영향을 미치지 않는다는 점에 유의하세요. 이 방법은 컴퓨터 놀잇감의 저자 Esor Huang 의 글에서 가져온 것입니다."
  },
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 238,
  "weight": 1781
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
