import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "中英互译 - 极简版",
    "prompt": "zh-en translation of \"X\"",
    "description": "X 部分可以为中文或者英文，chatgpt 会自动翻译成相对的语言。经测试使用直双引号 (\") 效果最佳。在使用 api 调用时 role 选择 assistant 可以降低 (不能避免) 将待翻译文本理解为指令的概率。",
    "remark": "节省 token 的翻译器 prompt，适合用于 ChatGPT API 搭建的翻译平台。来自 @Qizhen-Yang 的投稿。"
  },
  "en": {
    "title": "English-Chinese translator②",
    "prompt": "zh-en translation of \"X\"",
    "remark": "The most economical token-saving translation prompt, suitable for building translation platforms using ChatGPT API. Contributed by @Qizhen-Yang."
  },
  "ja": {
    "title": "中国語→英語翻訳 - ミニマム版",
    "prompt": "zh-en translation of \"X\"",
    "description": "X の部分は中国語でも英語でもよく、chatgpt は自動的にそれぞれの言語に翻訳します。まっすぐな二重引用符（\"）を使用することが最もうまくいくことがテストされています。api コールを使用するときに役割のためにアシスタントを選択すると、翻訳されるテキストがコマンドとして解釈される（避けられない）確率を減らすことができます。",
    "remark": "API で構築された翻訳プラットフォーム ChatGPT のためのトークン節約型翻訳者プロンプトです。寄稿者：@Qizhen-Yang。"
  },
  "ko": {
    "title": "중국어에서 영어로 번역 - 미니멀리스트 버전",
    "prompt": "zh-en translation of \"X\"",
    "description": "X 부분은 중국어 또는 영어로 입력할 수 있으며, chatgpt 가 자동으로 해당 언어로 번역합니다. 곧은 큰따옴표 (\") 를 사용하는 것이 가장 잘 작동하는 것으로 테스트되었습니다. API 호출을 사용할 때 역할에 어시스턴트를 선택하면 번역할 텍스트가 명령으로 해석될 (불가피한) 확률을 줄일 수 있습니다.",
    "remark": "ChatGPT API 로 구축된 번역 플랫폼을 위한 토큰 절약형 번역기 프롬프트입니다. Qizhen-Yang 이 기여했습니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "language"
  ],
  "id": 181,
  "weight": 1149
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
