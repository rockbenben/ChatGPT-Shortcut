import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "语音输入优化",
  "description": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors and respond in Chinese. Be sure to maintain the original meaning of the text. Please begin by editing the following text: [语音文字输入]",
  "desc_cn": "请用简洁明了的语言，编辑以下段落，以改善其逻辑流程，消除任何印刷错误，并以中文作答。请务必保持文章的原意。请从编辑以下文字开始：[语音文字输入]",
  "remark": "先用第三方应用将语音转换成文字，再用 ChatGPT 进行处理。在进行语音录入时，通常会习惯性地说一些口头禅和语气词，使用 ChatGPT 可以将其转换成书面语言，以优化语音转文字的效果。此外，它还可以用于整理无序文本。源于 @玉树芝兰老师的「用简洁的语言整理这一段话，要逻辑清晰，去掉错别字」。",
  "title_en": "Voice input",
  "desc_en": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. Please begin by editing the following text:",
  "remark_en": "When making voice recordings, it is often customary to say verbal and intonational words, which can then be converted into written language using ChatGPT to optimise the speech-to-text effect. Additionally, it can also be used to organize disordered text.",
  "website": null,
  "tags": [
    "personal",
    "write"
  ],
  "id": 3,
  "weight": 528
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
