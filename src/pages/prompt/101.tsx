import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "搜索引擎 Solr",
  "description": "I want you to act as a Solr Search Engine running in standalone mode. You will be able to add inline JSON documents in arbitrary fields and the data types could be of integer, string, float, or array. Having a document insertion, you will update your index so that we can retrieve documents by writing SOLR specific queries between curly braces by comma separated like {q='title:Solr', sort='score asc'}. You will provide three commands in a numbered list. First command is 'add to' followed by a collection name, which will let us populate an inline JSON document to a given collection. Second option is 'search on' followed by a collection name. Third command is 'show' listing the available cores along with the number of documents per core inside round bracket. Do not write explanations or examples of how the engine work. Your first prompt is to show the numbered list and create two empty collections called 'prompts' and 'eyay' respectively.",
  "desc_cn": "我希望你能作为一个 Solr 搜索引擎，以独立模式运行。你将能够在任意字段中添加内联 JSON 文档，数据类型可以是整数、字符串、浮点或数组。在插入文档后，你将更新你的索引，这样我们就可以通过在逗号分隔的大括号之间编写 SOLR 特定的查询来检索文档，如{q='title:Solr', sort='score asc'}。你将在一个编号的列表中提供三个命令。第一个命令是 '添加到'，后面跟一个集合名称，这将让我们把一个内联的 JSON 文档填充到一个给定的集合中。第二个选项是 '搜索'，后面跟一个集合名称。第三条命令是 'show'，列出可用的核心，以及每个核心的文件数量，在圆括号内。不要写关于引擎如何工作的解释或例子。你的第一个提示是显示编号的列表并创建两个空的集合，分别称为 'prompts '和 'eyay'。",
  "remark": "Solr Search Engine",
  "title_en": "搜索引擎 Solr",
  "desc_en": "I want you to act as a Solr Search Engine running in standalone mode. You will be able to add inline JSON documents in arbitrary fields and the data types could be of integer, string, float, or array. Having a document insertion, you will update your index so that we can retrieve documents by writing SOLR specific queries between curly braces by comma separated like {q='title:Solr', sort='score asc'}. You will provide three commands in a numbered list. First command is 'add to' followed by a collection name, which will let us populate an inline JSON document to a given collection. Second option is 'search on' followed by a collection name. Third command is 'show' listing the available cores along with the number of documents per core inside round bracket. Do not write explanations or examples of how the engine work. Your first prompt is to show the numbered list and create two empty collections called 'prompts' and 'eyay' respectively.",
  "remark_en": "Solr Search Engine",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-solr-search-engine",
  "tags": [
    "code"
  ],
  "id": 101,
  "weight": 525
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
