import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "SQL 终端",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {备注文本). My first command is [输入命令]",
    "description": "我想让你在一个数据库的例子前充当一个 SQL 终端。该数据库包含名为「产品」「用户」「订单」和「供应商」的表。我将输入查询，你将回答终端显示的内容。我希望你用一个单一的代码块来回答查询结果的表格，而不是其他。不要写解释。不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情时，我会用大括号{备注文本）来做。",
    "remark": "SQL terminal"
  },
  "en": {
    "title": "SQL terminal",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). My first command is ",
    "remark": "SQL terminal"
  },
  "ja": {
    "title": "SQL ターミナル",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Janpanese. My first command is ",
    "description": "あるデータベースを前にして、SQL 端末として行動してほしい。このデータベースには、「商品」「ユーザー」「注文」「仕入先」というテーブルがある。私がクエリを入力し、あなたは端末が表示するものに答えてください。私は、クエリ結果のテーブルに答えるためにコードの単一のブロックを使用し、それ以外のものは使用しないでほしい。説明は書かないでください。私が指示しない限り、コマンドを入力しないでください。英語で何かを伝える必要があるときは、中括弧{コメントテキスト) の中で伝えることにする。",
    "remark": "SQL ターミナル"
  },
  "ko": {
    "title": "SQL 터미널",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Korean. My first command is ",
    "description": "예제 데이터베이스 앞에서 SQL 터미널 역할을 해보겠습니다. 데이터베이스에는 '제품' '사용자' '주문' 및 '공급업체'라는 테이블이 있습니다. 제가 쿼리를 입력하면 여러분은 터미널에 표시되는 내용에 응답합니다. 쿼리 결과 테이블에 응답하기 위해 단일 코드 블록만 사용하고 다른 것은 작성하지 마세요. 설명을 작성하지 마세요. 제가 지시하지 않는 한 명령을 입력하지 마세요. 영어로 설명해야 할 때는 중괄호 (텍스트 주석) 로 괄호 안에 넣어 설명합니다.",
    "remark": "SQL 터미널"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-sql-terminal",
  "tags": [
    "interpreter"
  ],
  "id": 108,
  "weight": 87
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
