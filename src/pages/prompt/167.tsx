import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "室内装饰师",
  "description": "I want you to act as an interior decorator and respond in Chinese. Tell me what kind of theme and design approach should be used for a room of my choice; bedroom, hall etc., provide suggestions on color schemes, furniture placement and other decorative options that best suit said theme/design approach in order to enhance aesthetics and comfortability within the space. My first request is [室内装饰要求]",
  "desc_cn": "我希望你能作为一个室内装饰师。告诉我，我选择的房间应该使用什么样的主题和设计方法；卧室、大厅等，提供最适合上述主题/设计方法的色彩方案、家具摆放和其他装饰选项的建议，以提高空间内的美感和舒适性。",
  "remark": "Interior Decorator",
  "title_en": "Interior Decorator",
  "desc_en": "I want you to act as an interior decorator. Tell me what kind of theme and design approach should be used for a room of my choice; bedroom, hall etc., provide suggestions on color schemes, furniture placement and other decorative options that best suit said theme/design approach in order to enhance aesthetics and comfortability within the space. My first request is ",
  "remark_en": "Interior Decorator",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-interior-decorator",
  "tags": [
    "professional"
  ],
  "id": 167,
  "weight": 393
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
