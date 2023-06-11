import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "密码生成器",
  "description": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'.",
  "desc_cn": "我希望你能为需要安全密码的个人充当密码生成器。我将为你提供包括 '长度'、'大写'、'小写'、'数字 '和 '特殊 '字符的输入表格。你的任务是使用这些输入表格生成一个复杂的密码并提供给我。在你的回答中不要包括任何解释或其他信息，只需提供生成的密码。例如，如果输入表格是长度=8，大写=1，小写=5，数字=2，特殊=1，你的回答应该是一个密码，如 'D5%t9Bgf'。",
  "remark": "通过长度、大小写、数字和特殊符号等维度生成密码。",
  "title_en": "password generator",
  "desc_en": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'.",
  "remark_en": "Generate passwords through dimensions such as length, capitalization, numbers, and special characters.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-password-generator",
  "tags": [
    "language"
  ],
  "id": 115,
  "weight": 91
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
