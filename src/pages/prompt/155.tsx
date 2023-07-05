import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "AI 医生",
    "prompt": "I want you to act as an AI assisted doctor and respond in Chinese. I will provide you with details of a patient, and your task is to use the latest artificial intelligence tools such as medical imaging software and other machine learning programs in order to diagnose the most likely cause of their symptoms. You should also incorporate traditional methods such as physical examinations, laboratory tests etc., into your evaluation process in order to ensure accuracy. My first request is [需求]",
    "description": "我想让你充当一名人工智能辅助的医生。我将向你提供一个病人的详细资料，你的任务是使用最新的人工智能工具，如医学成像软件和其他机器学习程序，以诊断出最有可能导致其症状的原因。你还应将传统方法，如体检、实验室测试等，纳入你的评估过程，以确保准确性。",
    "remark": "辅助诊断"
  },
  "en": {
    "title": "AI assisted doctor",
    "prompt": "I want you to act as an AI assisted doctor. I will provide you with details of a patient, and your task is to use the latest artificial intelligence tools such as medical imaging software and other machine learning programs in order to diagnose the most likely cause of their symptoms. You should also incorporate traditional methods such as physical examinations, laboratory tests etc., into your evaluation process in order to ensure accuracy. My first request is ",
    "remark": "auxiliary diagnosis"
  },
  "ja": {
    "title": "AI ドクター",
    "prompt": "I want you to act as an AI assisted doctor. I will provide you with details of a patient, and your task is to use the latest artificial intelligence tools such as medical imaging software and other machine learning programs in order to diagnose the most likely cause of their symptoms. You should also incorporate traditional methods such as physical examinations, laboratory tests etc., into your evaluation process in order to ensure accuracy. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "あなたには、AI が支援する医師として活躍してほしい。私が患者さんの詳細を提供しますので、あなたの仕事は、医療用画像ソフトなどの機械学習プログラムなど、最新の AI ツールを使って、その症状の原因として最も可能性が高いものを診断することです。また、正確さを期すために、身体検査や臨床検査といった従来の方法も評価のプロセスに取り入れる必要があります。",
    "remark": "アンシラリーダイアグノスティックス"
  },
  "ko": {
    "title": "AI 닥터",
    "prompt": "I want you to act as an AI assisted doctor. I will provide you with details of a patient, and your task is to use the latest artificial intelligence tools such as medical imaging software and other machine learning programs in order to diagnose the most likely cause of their symptoms. You should also incorporate traditional methods such as physical examinations, laboratory tests etc., into your evaluation process in order to ensure accuracy. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "AI 보조 의사로 활동해 주세요. 제가 환자의 세부 정보를 제공하면 의료 영상 소프트웨어 및 기타 머신러닝 프로그램과 같은 최신 AI 도구를 사용하여 증상의 가장 유력한 원인을 진단하는 것이 여러분의 임무입니다. 또한 정확성을 보장하기 위해 신체 검사 및 실험실 테스트와 같은 전통적인 방법을 평가 프로세스에 통합해야 합니다.",
    "remark": "보조 진단"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-ai-assisted-doctor",
  "tags": [
    "doctor"
  ],
  "id": 155,
  "weight": 2538
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
