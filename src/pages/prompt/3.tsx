import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "语音输入优化",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors and respond in Chinese. Be sure to maintain the original meaning of the text. Please begin by editing the following text: [语音文字输入]",
    "description": "请用简洁明了的语言，编辑以下段落，以改善其逻辑流程，消除任何印刷错误，并以中文作答。请务必保持文章的原意。请从编辑以下文字开始：[语音文字输入]",
    "remark": "先用第三方应用将语音转换成文字，再用 ChatGPT 进行处理。在进行语音录入时，通常会习惯性地说一些口头禅和语气词，使用 ChatGPT 可以将其转换成书面语言，以优化语音转文字的效果。此外，它还可以用于整理无序文本。源于 @玉树芝兰老师的「用简洁的语言整理这一段话，要逻辑清晰，去掉错别字」。"
  },
  "en": {
    "title": "Voice input",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. Please begin by editing the following text:",
    "remark": "When making voice recordings, it is often customary to say verbal and intonational words, which can then be converted into written language using ChatGPT to optimise the speech-to-text effect. Additionally, it can also be used to organize disordered text."
  },
  "ja": {
    "title": "音声入力の最適化",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text:",
    "description": "明確で簡潔な言葉で、以下のパラグラフを編集して論理的な流れを改善し、誤字脱字をなくし、中国語で回答してください。なお、記事の本来の意味を維持するように心がけてください。まずは次の文章を編集してください：【音声テキスト入力】。",
    "remark": "サードパーティーのアプリケーションを使用して、まず音声をテキストに変換し、ChatGPT で処理する。音声録音を行う場合、口語やイントネーションの言葉を発するのが通例ですが、ChatGPT を使って書き言葉に変換することで、音声からテキストへの変換効果を最適化できます。さらに、構造化されていないテキストの整理にも利用できます。この段落を簡単な言葉で整理し、論理的にし、誤字脱字をなくす」（@Yu Shu Zhi Lan さん）より。"
  },
  "ko": {
    "title": "음성 입력 최적화",
    "prompt": "Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text:",
    "description": "명확하고 간결한 언어로 다음 단락을 편집하여 논리적 흐름을 개선하고 오탈자를 제거한 후 중국어로 답변해 주세요. 글의 원래 의미를 유지해야 합니다. 다음 텍스트부터 편집해 주세요: [음성 텍스트 입력]",
    "remark": "타사 애플리케이션을 사용하여 음성을 먼저 텍스트로 변환한 다음 ChatGPT 를 사용하여 처리하세요. 음성 녹음을 할 때 종종 구어체와 억양으로 말하는 것이 일반적이며, 이를 ChatGPT 를 사용하여 문어로 변환하여 음성 - 텍스트 변환 효과를 최적화할 수 있습니다. 또한 구조화되지 않은 텍스트를 정리하는 데에도 사용할 수 있습니다. \"이 단락을 간단한 언어로 정리하고 논리적이며 오타를 제거하세요.\" @Yu Shu Zhi Lan 의 글에서 발췌한 내용입니다."
  },
  "website": null,
  "tags": [
    "personal",
    "write"
  ],
  "id": 3,
  "weight": 687
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
