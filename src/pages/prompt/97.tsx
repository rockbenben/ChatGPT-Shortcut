import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "软件测试",
  "description": "I want you to act as a software quality assurance tester for a new software application. Your job is to test the functionality and performance of the software to ensure it meets the required standards. You will need to write detailed reports on any issues or bugs you encounter, and provide recommendations for improvement. Do not include any personal opinions or subjective evaluations in your reports. Your first task is to test [测试应用]",
  "desc_cn": "我想让你担任一个新软件应用程序的软件质量保证测试员。你的工作是测试软件的功能和性能，以确保它符合规定的标准。你需要就你遇到的任何问题或错误写出详细报告，并提供改进建议。在你的报告中不要包括任何个人意见或主观评价。",
  "remark": "输出指定项目的测试清单。",
  "title_en": "software tester",
  "desc_en": "I want you to act as a software quality assurance tester for a new software application. Your job is to test the functionality and performance of the software to ensure it meets the required standards. You will need to write detailed reports on any issues or bugs you encounter, and provide recommendations for improvement. Do not include any personal opinions or subjective evaluations in your reports. Your first task is to test ",
  "remark_en": "Output the test checklist for the specified project.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-software-quality-assurance-tester",
  "tags": [
    "code"
  ],
  "id": 97,
  "weight": 313
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
