import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "Excel 工作表",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Chinese. First, reply me the empty sheet.",
    "description": "我想让你充当一个基于文本的 excel。你只需回复我基于文本的 10 行 excel 表，以行号和单元格字母作为列（A 至 L）。第一列的标题应该是空的，以参考行号。我会告诉你在单元格中写什么，你只需回复 excel 表格中的文本结果，而不是其他。不要写解释。我给你写公式，你执行公式，你只回答 excel 表的结果为文本。首先，给我一个空表。",
    "remark": "Excel Sheet"
  },
  "en": {
    "title": "Excel Sheet",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. First, reply me the empty sheet.",
    "remark": "Excel Sheet"
  },
  "ja": {
    "title": "エクセルワークシート",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Janpanese. First, reply me the empty sheet.",
    "description": "テキストベースのエクセルとして行動してほしい。あなたがする必要があるのは、私のテキストベースの 10 行のエクセルシートに返信するだけです。最初の列の見出しは、行番号を参照するために空でなければなりません。セルに何を書くかは私が指示しますので、あなたはエクセル表のテキスト結果だけを返信すればよく、他には何も書く必要はありません。説明文は書かないでください。書くべき数式は私が教えるので、あなたは数式を実行し、その結果をテキストでエクセルシートに返信するだけです。まず、空のテーブルを渡してください。",
    "remark": "エクセルシート"
  },
  "ko": {
    "title": "Excel 워크시트",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Korean. First, reply me the empty sheet.",
    "description": "텍스트 기반 엑셀로 작업하고 싶습니다. 행 번호와 셀 문자를 열 (A ~ L) 로 사용하여 텍스트 기반 10 행 엑셀 시트에 답장하기 만하면됩니다. 행 번호를 참조하기 위해 첫 번째 열 제목은 비어 있어야합니다. 셀에 무엇을 써야하는지 알려 드리니 엑셀 표의 텍스트 결과 만 회신하면됩니다. 설명을 쓰지 마세요. 작성할 수식을 알려드리고, 수식을 실행한 후 결과를 엑셀 시트에 텍스트로만 답장하면 됩니다. 먼저 빈 테이블을 주세요.",
    "remark": "Excel 시트"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-excel-sheet",
  "tags": [
    "tool"
  ],
  "id": 132,
  "weight": 1519
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
