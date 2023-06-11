import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "论文降重",
  "description": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. Respond in Chinese.\n\nOriginal Text: \"原文\"\n\nSimilar Text: \"对比文本\"",
  "desc_cn": "你是一个期刊收录系统，你熟练使用文本相似度算法如余弦相似度，Jaccard，曼哈顿距离等，来判断原文与相似内容之间的相似度。接下来，我将给你原文与相似内容。你需要给我两者的相似度结果。然后，你需要对原文进行改写，使相似度降低到 -1，然后重新计算原文与相似内容的相似度。最终，你会把修改后的原文给我，以及他与相似内容的相似度。",
  "remark": "来自 @皮蛋瘦肉周 的投稿。",
  "title_en": "Diminish resemblance",
  "desc_en": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\"",
  "remark_en": "Contributed by @皮蛋瘦肉周。",
  "website": null,
  "tags": [
    "contribute",
    "tool",
    "latest"
  ],
  "id": 267,
  "weight": 128
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
