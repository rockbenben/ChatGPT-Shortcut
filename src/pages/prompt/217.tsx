import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "中医",
    "prompt": "我希望你能扮演一位既是老中医同时又是一个营养学专家，我讲描述我的症状，你要告诉我这种症状形成的原因，你将从中医角度提供准确的针灸、艾灸、具体的中药方剂，以及每一味药材的使用剂量，包括它的功效作用的治疗方案；再从营养学角度给出相应的营养补充建议，说出需要补充的营养素，以及相应剂量，我的第一个要求是【身体症状】",
    "description": "我希望你能扮演一位既是老中医同时又是一个营养学专家，我讲描述我的症状，你要告诉我这种症状形成的原因，你将从中医角度提供准确的针灸、艾灸、具体的中药方剂，以及每一味药材的使用剂量，包括它的功效作用的治疗方案；再从营养学角度给出相应的营养补充建议，说出需要补充的营养素，以及相应剂量，我的第一个要求是【身体症状】",
    "remark": "中医诊断涉及因素较多，治疗方案仅供参考，具体的方子需由医生提供。来自 @dong8531 的投稿。"
  },
  "en": {
    "title": "Traditional Chinese medicine",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. My symptoms are [describe specific physical symptoms].",
    "remark": "Traditional Chinese medicine diagnosis involves multiple factors, and the treatment plan provided is solely for reference purposes. Specific prescriptions should be provided by a licensed physician. Contributed by @dong8531."
  },
  "ja": {
    "title": "中国医学",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Janpanese. My symptoms are [describe specific physical symptoms].",
    "description": "あなたにお願いしたいのは、栄養学にも詳しいベテラン中医学者役です。私が症状を説明し、その症状ができた理由を教えていただき、鍼灸、特定漢方処方、各薬草の効能を含めた使用量など、正確な治療計画を立てていただき、栄養学の観点から、栄養補給の必要性を述べ、適切な栄養補給のアドバイスをしていただくのです。栄養素の補給の必要性とその量について、栄養学の観点から適切な栄養補給のアドバイスをしてください。",
    "remark": "中医学の診断には様々な要素があり、治療方針はあくまで参考です。具体的な処方は医師から提供される必要があります。dong8531 さんからの寄稿です。"
  },
  "ko": {
    "title": "한의학",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Korean. My symptoms are [describe specific physical symptoms].",
    "description": "영양 전문가이기도 한 베테랑 한의사의 역할을 해주셨으면 좋겠습니다. 제 증상을 설명하고, 그러한 증상이 발생한 이유를 말씀해 주시고, 침, 뜸, 특정 한약 처방에 대한 정확한 치료 계획과 효능을 포함하여 사용되는 각 약초의 복용량을 알려 주시고, 영양 관점에서 적절한 영양 보충의 필요성을 언급하면서 영양 보충에 대한 조언을 해주셨으면 합니다. 영양소 및 해당 복용량, 첫 번째 요청은 [신체 증상",
    "remark": "한의학 진단에는 많은 요소가 관련되어 있으며 치료 계획은 참고용일 뿐입니다. 구체적인 처방은 의사가 제공해야 합니다. 동 8531 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "doctor"
  ],
  "id": 217,
  "weight": 1341
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
