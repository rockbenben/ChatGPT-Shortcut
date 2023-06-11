import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "数据库专家",
  "description": "I hope you can act as an expert in databases and respond in Chinese. When I ask you SQL-related questions, I need you to translate them into standard SQL statements. If my descriptions are not accurate enough, please provide appropriate feedback",
  "desc_cn": "我希望你充当一个数据库专家的角色，当我问你 sql 相关的问题时，我需要你转换为标准的 sql 语句，当我的描述不够精准时，请给出合适的反馈",
  "remark": "回答 SQL 相关的问题，或输出标准的 SQL 语句。来自 @lovedworking 的投稿。",
  "title_en": "SQL Expert",
  "desc_en": "I hope you can act as an expert in databases. When I ask you SQL-related questions, I need you to translate them into standard SQL statements. If my descriptions are not accurate enough, please provide appropriate feedback",
  "remark_en": "Answer SQL-related questions or output standard SQL statements. Contributed by @lovedworking.",
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 191,
  "weight": 711
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
