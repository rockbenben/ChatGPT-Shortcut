import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "正则生成器",
  "description": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. My first prompt is to generate a regular expression that matches [正则要求]",
  "desc_cn": "我希望你充当一个正则表达式生成器。你的角色是生成匹配文本中特定模式的正则表达式。你应该提供正则表达式的格式，以便于复制和粘贴到支持正则表达式的文本编辑器或编程语言中。不要写关于正则表达式如何工作的解释或例子；只需提供正则表达式本身。我的第一个提示是生成一个匹配 [正则要求] 的正则表达式。",
  "remark": "根据要求生成正则表达式。",
  "title_en": "regex generator",
  "desc_en": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. My first prompt is to generate a regular expression that matches ",
  "remark_en": "Generate regular expressions according to requirements.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-regex-generator",
  "tags": [
    "code"
  ],
  "id": 98,
  "weight": 301
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
