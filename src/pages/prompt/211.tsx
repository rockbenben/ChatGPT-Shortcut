import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "文章高亮",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. Here is the text: [文章]",
    "description": "仔细阅读以下文本，并使用双星号（**）突出显示要强调的单词或短语。不要改变原始文本或进行摘要。",
    "remark": "高亮会增加文章的可读性。不过，ChatGPT 默认显示 Markdown 语法。结果出来后，需要手动框选高亮部分。我也试过用其他符号替代高亮提示，但效果不太好。因此，暂时先使用这个版本。"
  },
  "en": {
    "title": "Highlight the article",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. Here is the text: []",
    "remark": "Highlight augments the legibility of a written composition. Nonetheless, ChatGPT defaults to exhibit Markdown syntax, obliging one to manually select the highlighted segment after the output has been generated."
  },
  "ja": {
    "title": "記事の強調表示",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Janpanese. Here is the text: []",
    "description": "以下の文章をよく読み、強調したい単語やフレーズには二重アスタリスク（**）を使用すること。原文を変更したり、要約を作成したりしないでください。",
    "remark": "ハイライトすることで、記事の可読性が高まります。ただし、ChatGPT はデフォルトで Markdown 構文を表示します。結果が出た後は、ハイライトされた部分を手動でボックス化する必要があります。また、ハイライトのヒントを他の記号に置き換えてみましたが、これはあまりうまくいきませんでした。したがって、当面はこのバージョンを使用することにします。"
  },
  "ko": {
    "title": "기사 하이라이트",
    "prompt": "Carefully read the following text and highlight the key points using double asterisks (**) around the words or phrases you want to emphasize. Do not alter the original text or summarize it. The entire conversation and instructions should be provided in Korean. Here is the text: []",
    "description": "아래 텍스트를 주의 깊게 읽고 강조할 단어나 문구에 이중 별표 (**) 를 사용하여 강조 표시하세요. 원문을 변경하거나 요약을 만들지 마세요.",
    "remark": "강조 표시를 하면 글의 가독성이 높아집니다. 그러나 ChatGPT 는 기본적으로 마크다운 구문을 표시합니다. 결과가 나오면 강조 표시된 섹션에 수동으로 상자를 채워야 합니다. 강조 표시 힌트를 다른 기호로 대체하는 것도 시도해 보았지만 잘 작동하지 않았습니다. 따라서 당분간은 이 버전을 사용할 것입니다."
  },
  "website": null,
  "tags": [
    "personal",
    "write"
  ],
  "id": 211,
  "weight": 511
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
