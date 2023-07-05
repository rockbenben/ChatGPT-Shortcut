import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "开发：微信小程序",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [开发项目]. The text displayed in the view should be in Chinese. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "作为微信小程序开发者，您的任务是使用微信小程序原生开发，编写一个计数器页面。请回复满足以下要求的代码：创建一个包含 wxml、js、wxss 和 json 文件的微信小程序页面，并在其中实现一个计数器页面。视图中显示的文本应为中文。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "辅助微信小程序开发。来自 @gandli 的投稿。"
  },
  "en": {
    "title": "WeChat Mini Program",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "remark": "Auxiliary WeChat mini program development. Contributed by @gandli."
  },
  "ja": {
    "title": "開発：WeChat アプレット",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Janpanese. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "WeChat アプレット開発者として、WeChat アプレットのネイティブ開発を使ってカウンターページを書くことが課題となっています。以下の要件を満たすコードで回答してください：wxml、js、wxss、json ファイルを含む WeChat アプレットページを作成し、その中にカウンターページを実装してください。ビューに表示されるテキストは中国語である必要があります。なお、これらの要件を満たすために必要なコードのみを提供していただき、説明や解説は不要です。",
    "remark": "WeChat アプレット開発を支援する。gandli さんからの寄稿です。"
  },
  "ko": {
    "title": "개발: 위챗 애플릿",
    "prompt": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. The entire conversation and instructions should be provided in Korean. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "WeChat 애플릿 개발자는 WeChat 애플릿 네이티브 개발을 사용하여 카운터 페이지를 작성해야 합니다. 다음 요구 사항을 충족하는 코드로 응답해 주세요. wxml, js, wxss 및 json 파일이 포함된 WeChat 애플릿 페이지를 생성하고 그 안에 카운터 페이지를 구현하세요. 뷰에 표시되는 텍스트는 중국어여야 합니다. 이러한 요구 사항을 충족하는 데 필요한 코드만 제공해야 하며, 설명이나 설명은 필요하지 않습니다.",
    "remark": "WeChat 애플릿 개발 지원. gandli 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 177,
  "weight": 2627
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
