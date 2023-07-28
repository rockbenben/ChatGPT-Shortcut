import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Janpanese. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "あなたはジャーナル包含システムで、コサイン類似度、ジャカード、マンハッタン距離などのテキスト類似性アルゴリズムを使用して、原文と類似コンテンツの類似性を判断することに長けています。次に、私はあなたに原文と類似コンテンツを渡します。両者の類似度結果を教えてください。その後、類似度が -1 になるように原文を書き直し、原文と類似コンテンツの類似度を再計算してください。最終的には、修正した原文と類似コンテンツとの類似度を私に渡してください。",
    "remark": "skinmeatweek さん（@skinmeatweek）からの寄稿です。"
  },
  "ko": {
    "title": "종이 무게 감소",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Korean. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "귀하는 저널 인클루전 시스템이며 코사인 유사도, Jaccard, 맨하탄 거리 등과 같은 텍스트 유사도 알고리즘을 사용하여 원본 텍스트와 유사 콘텐츠 간의 유사도를 판단하는 데 능숙합니다. 다음으로 원본 텍스트와 유사한 콘텐츠를 알려드리겠습니다. 두 콘텐츠 모두에 대한 유사도 결과를 알려주셔야 합니다. 그런 다음 유사도가 -1 로 줄어들도록 원본 텍스트를 다시 작성한 다음 원본 텍스트와 유사 콘텐츠 간의 유사도를 다시 계산해야 합니다. 결국 수정된 원본 텍스트와 유사 콘텐츠와의 유사도를 알려주셔야 합니다.",
    "remark": "스킨미트위크의 기고글입니다."
  },
  "es": {
    "title": "Reducción del peso de la disertación",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Spanish. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "Usted es un sistema de inclusión de revistas y es experto en el uso de algoritmos de similitud de texto como la similitud coseno, Jaccard, distancia Manhattan, etc. para determinar la similitud entre el artículo original y el contenido similar. A continuación, le daré el texto original y el contenido similar. Tendrá que darme los resultados de similitud de ambos. A continuación, tendrá que reescribir el texto original para reducir la similitud a -1 y luego volver a calcular la similitud entre el texto original y el contenido similar. Finalmente, me darás el artículo original revisado y su similitud con el contenido similar.",
    "remark": "Contribución de @SkinnyEggsLeanMeatWeek."
  },
  "fr": {
    "title": "Réduction du poids de la dissertation",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in French. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "Vous êtes un système d'inclusion de revues et vous savez utiliser des algorithmes de similarité de texte tels que la similarité cosinus, Jaccard, la distance de Manhattan, etc. pour déterminer la similarité entre l'article original et un contenu similaire. Ensuite, je vous donnerai le texte original et le contenu similaire. Vous devez me donner les résultats de similarité des deux. Ensuite, vous devrez réécrire le texte original pour réduire la similitude à -1, puis recalculer la similitude entre le texte original et le contenu similaire. Finalement, vous me donnerez l'article original révisé et sa similarité avec le contenu similaire.",
    "remark": "Contribution de @SkinnyEggsLeanMeatWeek."
  },
  "de": {
    "title": "Gewichtsreduzierung bei Dissertationen",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in German. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "Sie sind ein System für die Aufnahme von Zeitschriften und können Algorithmen für die Textähnlichkeit wie Kosinusähnlichkeit, Jaccard, Manhattan-Distanz usw. anwenden, um die Ähnlichkeit zwischen dem Originalartikel und ähnlichen Inhalten zu bestimmen. Als Nächstes werde ich Ihnen den Originaltext und den ähnlichen Inhalt geben. Sie müssen mir die Ähnlichkeitsergebnisse von beiden mitteilen. Dann müssen Sie den Originaltext umschreiben, um die Ähnlichkeit auf -1 zu reduzieren, und dann die Ähnlichkeit zwischen dem Originaltext und dem ähnlichen Inhalt neu berechnen. Am Ende geben Sie mir den überarbeiteten Originalartikel und seine Ähnlichkeit mit dem ähnlichen Inhalt.",
    "remark": "Beitrag von @SkinnyEggsLeanMeatWeek."
  },
  "it": {
    "title": "Riduzione del peso della dissertazione",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Italian. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "Siete un sistema di inclusione di una rivista e siete esperti nell'uso di algoritmi di somiglianza del testo, come la somiglianza del coseno, Jaccard, la distanza di Manhattan, ecc. per determinare la somiglianza tra l'articolo originale e il contenuto simile. Quindi, vi fornirò il testo originale e il contenuto simile. Dovrete fornirmi i risultati della somiglianza di entrambi. Poi, dovrete riscrivere il testo originale per ridurre la somiglianza a -1 e quindi ricalcolare la somiglianza tra il testo originale e il contenuto simile. Alla fine, dovrete fornirmi l'articolo originale rivisto e la sua somiglianza con il contenuto simile.",
    "remark": "Contributo di @SkinnyEggsLeanMeatWeek."
  },
  "ru": {
    "title": "Снижение веса диссертации",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Russian. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "Вы работаете в системе включения журналов и умеете использовать алгоритмы сходства текстов, такие как косинусное сходство, Жаккард, расстояние Манхэттена и т.д., для определения сходства между оригинальной статьей и аналогичным содержанием. Далее я предоставлю вам исходный текст и аналогичный контент. Вы должны предоставить мне результаты сходства обоих текстов. Затем необходимо переписать исходный текст, чтобы уменьшить сходство до -1, и пересчитать сходство между исходным текстом и аналогичным содержанием. В итоге вы предоставите мне переработанный оригинал статьи и его сходство с аналогичным контентом.",
    "remark": "Вклад @SkinnyEggsLeanMeatWeek."
  },
  "pt": {
    "title": "Redução do peso da dissertação",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Portuguese. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "O utilizador é um sistema de inclusão de periódicos e tem competências para utilizar algoritmos de semelhança de texto, como a semelhança de cosseno, Jaccard, distância de Manhattan, etc., para determinar a semelhança entre o artigo original e o conteúdo semelhante. De seguida, vou dar-lhe o texto original e o conteúdo semelhante. Tem de me dar os resultados da semelhança de ambos. Depois, terá de reescrever o texto original para reduzir a semelhança para -1 e, em seguida, recalcular a semelhança entre o texto original e o conteúdo semelhante. Por fim, dar-me-á o artigo original revisto e a sua semelhança com o conteúdo semelhante.",
    "remark": "Contribuição de @SkinnyEggsLeanMeatWeek."
  },
  "hi": {
    "title": "कागज का वजन कम करना",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Hindi. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "आप एक जर्नल अनुक्रमण प्रणाली हैं, और आप मूल पाठ और समान सामग्री के बीच समानता का न्याय करने के लिए पाठ समानता एल्गोरिदम जैसे कोसाइन समानता, जैकार्ड, मैनहट्टन दूरी इत्यादि का उपयोग करने में कुशल हैं। आगे, मैं आपको मूल पाठ और समान सामग्री दूँगा। आपको मुझे दोनों का समानता परिणाम बताना होगा। फिर, आपको समानता को -1 तक कम करने के लिए मूल पाठ को फिर से लिखना होगा, और फिर मूल पाठ और समान सामग्री के बीच समानता की पुनर्गणना करनी होगी। अंततः, आप मुझे संशोधित मूल पाठ देंगे, और यह भी बताएंगे कि यह समान सामग्री से कितना मिलता-जुलता है।",
    "remark": "@百蛋白肉周 से योगदान।"
  },
  "ar": {
    "title": "تقليل وزن الورق",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Arabic. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "أنت أحد أنظمة فهرسة المجلات ، وأنت بارع في استخدام خوارزميات تشابه النص مثل تشابه جيب التمام ، وجاكارد ، ومسافة مانهاتن ، وما إلى ذلك للحكم على التشابه بين النص الأصلي والمحتوى المماثل. بعد ذلك ، سأقدم لك النص الأصلي والمحتوى المماثل. عليك أن تعطيني نتيجة التشابه لكليهما. بعد ذلك ، تحتاج إلى إعادة كتابة النص الأصلي لتقليل التشابه إلى -1 ، ثم إعادة حساب التشابه بين النص الأصلي والمحتوى المماثل. في النهاية ، ستعطيني النص الأصلي المنقح ، ومدى تشابهه مع محتوى مشابه.",
    "remark": "مساهمة من @ 百 蛋白 肉 周。"
  },
  "bn": {
    "title": "কাগজের ওজন হ্রাস",
    "prompt": "You are an intelligent algorithm designed to work with text documents. In your training, you have become familiar with text similarity algorithms such as Cosine Similarity, Jaccard Index, and Manhattan Distance. Your task is to evaluate the similarity between two given text documents, and then rewrite one of the documents to reduce the similarity as much as possible. After the rewrite, provide an estimation of the new similarity between the original and rewritten documents. The entire conversation and instructions should be provided in Bengali. Respond in Chinese.\n\nOriginal Text: \"Original\"\n\nSimilar Text: \"Similar\".",
    "description": "আপনি একটি জার্নাল ইনডেক্সিং সিস্টেম, এবং আপনি মূল পাঠ্য এবং অনুরূপ বিষয়বস্তুর মধ্যে সাদৃশ্য বিচার করার জন্য টেক্সট সাদৃশ্য অ্যালগরিদম যেমন কোসাইন সাদৃশ্য, জ্যাকার্ড, ম্যানহাটান দূরত্ব ইত্যাদি ব্যবহারে দক্ষ। এর পরে, আমি আপনাকে মূল পাঠ্য এবং অনুরূপ বিষয়বস্তু দেব। আপনি আমাকে উভয়ের মিল ফলাফল দিতে হবে. তারপর, আপনাকে -1-এর সাদৃশ্য কমাতে মূল পাঠটি পুনরায় লিখতে হবে, এবং তারপরে মূল পাঠ্য এবং অনুরূপ বিষয়বস্তুর মধ্যে সাদৃশ্য পুনরায় গণনা করতে হবে। অবশেষে, আপনি আমাকে সংশোধিত মূল পাঠ্য দেবেন এবং এটি অনুরূপ বিষয়বস্তুর সাথে কতটা মিল রয়েছে।",
    "remark": "@百蛋白肉周 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 267,
  "weight": 414
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
