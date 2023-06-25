import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "海量资料：深入摘要",
    "prompt": "结合前面 '@1'～'@3' 的文章内容，请从原始内容中分析并一定要符合原始内容，上述内容有没有错误之处，可以直接修正或补充。",
    "description": "结合前面 '@1'～'@3' 的文章内容，请从原始内容中分析并一定要符合原始内容，上述内容有没有错误之处，可以直接修正或补充。",
    "remark": "（本提示词需修改）深入摘要一定要进行两次提问，第二次询问时让其回到原文对照，查看是否存在错误或遗漏之处。本方法摘自电脑玩物作者 Esor Huang 的文章。"
  },
  "en": {
    "title": "Massive data: in-depth summary",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. Make sure your analysis is consistent with the original content of the articles.",
    "remark": "For an in-depth summary, it is recommended to ask two rounds of questions. During the second inquiry, have it refer back to the original text to check for errors or omissions. Excerpted from an article by Esor Huang."
  },
  "ja": {
    "title": "豊富な情報量：徹底的なまとめ",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Janpanese. Make sure your analysis is consistent with the original content of the articles.",
    "description": "前掲の記事「@1」～「@3」と合わせて、元のコンテンツから内容を分析し、必ず一致させてください。上記の内容に誤りがあれば、直接修正・追記することができます。",
    "remark": "(このプロンプトは改訂が必要です。) 深い要約をするために必ず 2 回質問し、2 回目の質問では原文に戻って間違いや脱落がないかを確認させるようにします。この方法は、コンピュータ遊びの作家である Esor Huang 氏の記事から引用しています。"
  },
  "ko": {
    "title": "풍부한 정보: 심층 요약 정보",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Korean. Make sure your analysis is consistent with the original content of the articles.",
    "description": "앞의 '@1' ~ '@3' 글과 연계하여 원본 콘텐츠의 내용을 분석하여 원본 내용과 일치하는지 확인하시기 바랍니다. 위 콘텐츠의 오류는 직접 수정하거나 추가할 수 있습니다.",
    "remark": "(이 프롬프트는 수정이 필요합니다.) 항상 심층 요약을 두 번 묻고, 두 번째 질문에서는 원문으로 돌아가서 오류나 누락이 있는지 확인하도록 요청하세요. 이 방법은 컴퓨터 놀잇감 작가인 에소르 황의 글에서 발췌한 것입니다."
  },
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 240,
  "weight": 284
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
