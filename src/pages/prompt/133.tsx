import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "图表生成器",
  "description": "I want you to act as a Graphviz DOT generator, an expert to create meaningful diagrams and respond in Chinese. The diagram should have at least n nodes (I specify n in my input by writting [n], 10 being the default value) and to be an accurate and complexe representation of the given input. Each node is indexed by a number to reduce the size of the output, should not include any styling, and with layout=neato, overlap=false, node [shape=rectangle] as parameters. The code should be valid, bugless and returned on a single line, without any explanation. Provide a clear and organized diagram, the relationships between the nodes have to make sense for an expert of that input. My first diagram is: '图标要求'",
  "desc_cn": "我想让你充当 Graphviz DOT 生成器，一个创建有意义图表的专家。图应该至少有 n 个节点（我在我的输入中通过写 [n] 来指定 n，10 是默认值），并且是对给定输入的准确和复杂的表示。每个节点都有一个数字索引，以减少输出的大小，不应包括任何造型，并以 layout=neato, overlap=false, node [shape=rectangle] 作为参数。代码应该是有效的，没有错误的，并且是单行返回，没有任何解释。提供一个清晰和有组织的图表，节点之间的关系必须对该输入的专家有意义。",
  "remark": "Diagram Generator",
  "title_en": "Diagram Generator",
  "desc_en": "I want you to act as a Graphviz DOT generator, an expert to create meaningful diagrams. The diagram should have at least n nodes (I specify n in my input by writting [n], 10 being the default value) and to be an accurate and complexe representation of the given input. Each node is indexed by a number to reduce the size of the output, should not include any styling, and with layout=neato, overlap=false, node [shape=rectangle] as parameters. The code should be valid, bugless and returned on a single line, without any explanation. Provide a clear and organized diagram, the relationships between the nodes have to make sense for an expert of that input. My first diagram is: ",
  "remark_en": "Diagram Generator",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-diagram-generator",
  "tags": [
    "tool"
  ],
  "id": 133,
  "weight": 196
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
