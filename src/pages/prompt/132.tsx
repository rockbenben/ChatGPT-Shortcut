import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "Excel 工作表",
  "description": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. First, reply me the empty sheet.",
  "desc_cn": "我想让你充当一个基于文本的 excel。你只需回复我基于文本的 10 行 excel 表，以行号和单元格字母作为列（A 至 L）。第一列的标题应该是空的，以参考行号。我会告诉你在单元格中写什么，你只需回复 excel 表格中的文本结果，而不是其他。不要写解释。我给你写公式，你执行公式，你只回答 excel 表的结果为文本。首先，给我一个空表。",
  "remark": "Excel Sheet",
  "title_en": "Excel Sheet",
  "desc_en": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. First, reply me the empty sheet.",
  "remark_en": "Excel Sheet",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-excel-sheet",
  "tags": [
    "tool"
  ],
  "id": 132,
  "weight": 1203
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
