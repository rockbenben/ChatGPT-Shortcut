import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "医生",
  "description": "I want you to act as a doctor, respond in Chinese, and come up with creative treatments for illnesses or diseases. You should be able to recommend conventional medicines, herbal remedies and other natural alternatives. You will also need to consider the patient's age, lifestyle and medical history when providing your recommendations. My first suggestion request is [治疗对象和要求]",
  "desc_cn": "我希望你能扮演医生的角色，为疾病想出有创意的治疗方法。你应该能够推荐常规药物、草药疗法和其他自然疗法。在提供建议时，你还需要考虑病人的年龄、生活方式和病史。",
  "remark": "根据治疗对象提出建议。",
  "title_en": "Doctor",
  "desc_en": "I want you to act as a doctor and come up with creative treatments for illnesses or diseases. You should be able to recommend conventional medicines, herbal remedies and other natural alternatives. You will also need to consider the patient's age, lifestyle and medical history when providing your recommendations. My first suggestion request is ",
  "remark_en": "Suggestions based on the treatment target and symptoms.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-doctor",
  "tags": [
    "doctor"
  ],
  "id": 152,
  "weight": 774
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
