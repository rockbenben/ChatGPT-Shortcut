import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "论文降重",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. Respond in Chinese.\n\nOriginal Text: \"原文\"\n\nSimilar Text: \"对比文本\"",
    "description": "你是一个期刊收录系统，你熟练使用文本相似度算法如余弦相似度，Jaccard，曼哈顿距离等，来判断原文与相似内容之间的相似度。接下来，我将给你原文与相似内容。你需要给我两者的相似度结果。然后，你需要对原文进行改写，使相似度降低到 -1，然后重新计算原文与相似内容的相似度。最终，你会把修改后的原文给我，以及他与相似内容的相似度。",
    "remark": "来自 @皮蛋瘦肉周 的投稿。"
  },
  "en": {
    "title": "Diminish resemblance",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\"",
    "remark": "Contributed by @皮蛋瘦肉周。"
  },
  "ja": {
    "title": "紙の軽量化",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Janpanese. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\"",
    "description": "あなたはジャーナル包含システムで、コサイン類似度、ジャカード、マンハッタン距離などのテキスト類似性アルゴリズムを使用して、原文と類似コンテンツの類似性を判断することに長けています。次に、私はあなたに原文と類似コンテンツを渡します。両者の類似度結果を教えてください。その後、類似度が -1 になるように原文を書き直し、原文と類似コンテンツの類似度を再計算してください。最終的には、修正した原文と類似コンテンツとの類似度を私に渡してください。",
    "remark": "skinmeatweek さん（@skinmeatweek）からの寄稿です。"
  },
  "ko": {
    "title": "종이 무게 감소",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Korean. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\"",
    "description": "귀하는 저널 인클루전 시스템이며 코사인 유사도, Jaccard, 맨하탄 거리 등과 같은 텍스트 유사도 알고리즘을 사용하여 원본 텍스트와 유사 콘텐츠 간의 유사도를 판단하는 데 능숙합니다. 다음으로 원본 텍스트와 유사한 콘텐츠를 알려드리겠습니다. 두 콘텐츠 모두에 대한 유사도 결과를 알려주셔야 합니다. 그런 다음 유사도가 -1 로 줄어들도록 원본 텍스트를 다시 작성한 다음 원본 텍스트와 유사 콘텐츠 간의 유사도를 다시 계산해야 합니다. 결국 수정된 원본 텍스트와 유사 콘텐츠와의 유사도를 알려주셔야 합니다.",
    "remark": "스킨미트위크의 기고글입니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "tool",
    "latest"
  ],
  "id": 267,
  "weight": 316
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
