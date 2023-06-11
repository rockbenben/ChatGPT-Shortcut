import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "开发：微信小程序",
  "description": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [开发项目]. The text displayed in the view should be in Chinese. Provide only the necessary code to meet these requirements without explanations or descriptions.",
  "desc_cn": "作为微信小程序开发者，您的任务是使用微信小程序原生开发，编写一个计数器页面。请回复满足以下要求的代码：创建一个包含 wxml、js、wxss 和 json 文件的微信小程序页面，并在其中实现一个计数器页面。视图中显示的文本应为中文。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
  "remark": "辅助微信小程序开发。来自 @gandli 的投稿。",
  "title_en": "WeChat Mini Program",
  "desc_en": "Create a WeChat Mini Program page with wxml, js, wxss, and json files that implements a [Project]. Provide only the necessary code to meet these requirements without explanations or descriptions.",
  "remark_en": "Auxiliary WeChat mini program development. Contributed by @gandli.",
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 177,
  "weight": 2043
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
