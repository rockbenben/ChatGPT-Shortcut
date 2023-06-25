import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "写作素材搜集",
    "prompt": "Generate a list of the top 10 facts, statistics and trends related to [主题], including their source. Respond in Chinese.",
    "description": "生成一份与 [主题] 有关的十大事实、统计数据和趋势的清单，包括其来源。",
    "remark": "提供与主题相关的结论、数据和来源，作为素材。"
  },
  "en": {
    "title": "Material Collection",
    "prompt": "Generate a list of the top 10 facts, statistics and trends related to [theme], including their source.",
    "remark": "Provide findings and data on the specified topic as material."
  },
  "ja": {
    "title": "筆記用具コレクション",
    "prompt": "Generate a list of the top 10 facts, statistics and trends related to [theme], including their source.",
    "description": "トピック] に関連する事実、統計、トレンドのトップ 10 を、その出典も含めてリストアップしてください。",
    "remark": "トピックに関連する結論、データ、ソースを資料として提供する。"
  },
  "ko": {
    "title": "글쓰기 자료 모음",
    "prompt": "Generate a list of the top 10 facts, statistics and trends related to [theme], including their source.",
    "description": "주제] 와 관련된 상위 10 가지 사실, 통계 및 트렌드 (출처 포함) 의 목록을 생성합니다.",
    "remark": "주제와 관련된 결과, 데이터 및 출처를 소스 자료로 제공합니다."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "write"
  ],
  "id": 10,
  "weight": 1760
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
