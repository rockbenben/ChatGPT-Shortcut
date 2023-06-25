import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "图表生成器",
    "prompt": "I want you to act as a Graphviz DOT generator, an expert to create meaningful diagrams and respond in Chinese. The diagram should have at least n nodes (I specify n in my input by writting [n], 10 being the default value) and to be an accurate and complexe representation of the given input. Each node is indexed by a number to reduce the size of the output, should not include any styling, and with layout=neato, overlap=false, node [shape=rectangle] as parameters. The code should be valid, bugless and returned on a single line, without any explanation. Provide a clear and organized diagram, the relationships between the nodes have to make sense for an expert of that input. My first diagram is: '图标要求'",
    "description": "我想让你充当 Graphviz DOT 生成器，一个创建有意义图表的专家。图应该至少有 n 个节点（我在我的输入中通过写 [n] 来指定 n，10 是默认值），并且是对给定输入的准确和复杂的表示。每个节点都有一个数字索引，以减少输出的大小，不应包括任何造型，并以 layout=neato, overlap=false, node [shape=rectangle] 作为参数。代码应该是有效的，没有错误的，并且是单行返回，没有任何解释。提供一个清晰和有组织的图表，节点之间的关系必须对该输入的专家有意义。",
    "remark": "Diagram Generator"
  },
  "en": {
    "title": "Diagram Generator",
    "prompt": "I want you to act as a Graphviz DOT generator, an expert to create meaningful diagrams. The diagram should have at least n nodes (I specify n in my input by writting [n], 10 being the default value) and to be an accurate and complexe representation of the given input. Each node is indexed by a number to reduce the size of the output, should not include any styling, and with layout=neato, overlap=false, node [shape=rectangle] as parameters. The code should be valid, bugless and returned on a single line, without any explanation. Provide a clear and organized diagram, the relationships between the nodes have to make sense for an expert of that input. My first diagram is: ",
    "remark": "Diagram Generator"
  },
  "ja": {
    "title": "チャートジェネレーター",
    "prompt": "I want you to act as a Graphviz DOT generator, an expert to create meaningful diagrams. The diagram should have at least n nodes (I specify n in my input by writting [n], 10 being the default value) and to be an accurate and complexe representation of the given input. Each node is indexed by a number to reduce the size of the output, should not include any styling, and with layout=neato, overlap=false, node [shape=rectangle] as parameters. The code should be valid, bugless and returned on a single line, without any explanation. Provide a clear and organized diagram, the relationships between the nodes have to make sense for an expert of that input. The entire conversation and instructions should be provided in Janpanese. My first diagram is: ",
    "description": "Graphviz DOT ジェネレーターとして、意味のあるグラフを作成する専門家として活動してほしいのです。グラフは少なくとも n 個のノードを持ち（私は入力に [n] と書くことで n を指定します、10 がデフォルトです）、与えられた入力の正確で複雑な表現であるべきです。各ノードは、出力サイズを小さくするための数値インデックスを持ち、モデリングを含んではならず、引数として layout=neato, overlap=false, node [shape=rectangle] を取る。コードは有効で、エラーがなく、説明なしで 1 行で返される必要があります。明確で整理された図を提供し、ノード間の関係はその入力の専門家が理解できるものでなければなりません。",
    "remark": "ダイアグラムジェネレーター"
  },
  "ko": {
    "title": "차트 생성기",
    "prompt": "I want you to act as a Graphviz DOT generator, an expert to create meaningful diagrams. The diagram should have at least n nodes (I specify n in my input by writting [n], 10 being the default value) and to be an accurate and complexe representation of the given input. Each node is indexed by a number to reduce the size of the output, should not include any styling, and with layout=neato, overlap=false, node [shape=rectangle] as parameters. The code should be valid, bugless and returned on a single line, without any explanation. Provide a clear and organized diagram, the relationships between the nodes have to make sense for an expert of that input. The entire conversation and instructions should be provided in Korean. My first diagram is: ",
    "description": "의미 있는 그래프를 만드는 전문가인 그래프 시각화 도트 생성자 역할을 해 주셨으면 합니다. 그래프에는 최소 n 개의 노드가 있어야 하며 (저는 입력에 [n] 을 써서 n 을 지정합니다. 기본값은 10 개입니다), 주어진 입력을 정확하고 복잡하게 표현할 수 있어야 합니다. 각 노드에는 출력 크기를 줄이기 위한 숫자 인덱스가 있고, 어떤 모델링도 포함해서는 안 되며, 레이아웃=neato, 오버랩=false, 노드 [모양=직사각형] 을 인수로 받습니다. 코드는 유효하고 오류가 없어야 하며 설명 없이 한 줄로 반환되어야 합니다. 명확하고 체계적인 다이어그램을 제공해야 하며, 노드 간의 관계는 해당 입력에 대한 전문가가 이해할 수 있어야 합니다.",
    "remark": "다이어그램 생성기"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-diagram-generator",
  "tags": [
    "tool"
  ],
  "id": 133,
  "weight": 230
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
