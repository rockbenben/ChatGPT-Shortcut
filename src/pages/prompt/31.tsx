import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "文本情绪分析",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. Generate the results in column, including the titles in the first one, and their sentiment in the second: [内容]",
    "description": "指定以下标题的情感，赋予它们的值为：正面、中性或负面。生成一列结果，包括第一列中的标题和第二列中的情感：[内容] 。",
    "remark": "判断文本情绪：正面、中性或负面。"
  },
  "en": {
    "title": "sentiment analysis",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "remark": "Detect text sentiment: positive, neutral or negative."
  },
  "ja": {
    "title": "テキストのムード分析",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Janpanese. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "次の見出しのセンチメントを指定し、positive、neutral、negative のいずれかの値を与える。1 列目に見出し、2 列目に感情を指定した結果の列を生成する：[content].",
    "remark": "文章の雰囲気を判断する：ポジティブ、ニュートラル、ネガティブ。"
  },
  "ko": {
    "title": "텍스트 분위기 분석",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Korean. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "다음 제목에 대해 긍정, 중립 또는 부정의 값을 지정하여 감성을 지정합니다. 첫 번째 열에 제목을, 두 번째 열에 감성어를 사용하여 결과 열을 생성합니다: [콘텐츠].",
    "remark": "텍스트의 분위기 판단: 긍정, 중립 또는 부정."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 31,
  "weight": 161
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
