import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "化学反应容器",
    "prompt": "I want you to act as a chemical reaction vessel and respond in Chinese. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. Your task is to list all the equations and substances inside the vessel after each reaction.",
    "description": "我要你扮演一个化学反应容器。我会把一种物质的化学式寄给你，你把它加到容器里。如果容器是空的，添加物质不会有任何反应。如果容器中有以前反应的残留物，它们将与新物质发生反应，只留下新产品。一旦我发送新的化学物质，以前的产品将继续与它反应，过程将重复。你的任务是在每次反应后列出容器内的所有方程式和物质。",
    "remark": "chemical reaction vessel"
  },
  "en": {
    "title": "chemical reaction vessel",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. Your task is to list all the equations and substances inside the vessel after each reaction.",
    "remark": "chemical reaction vessel"
  },
  "ja": {
    "title": "化学反応容器",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Janpanese. Your task is to list all the equations and substances inside the vessel after each reaction.",
    "description": "化学反応容器を演じてほしい。ある物質の化学式を送りますので、それを容器に入れてください。容器が空であれば、物質を加えても何の反応もありません。もし容器の中に以前の反応の残りがあれば、それらは新しい物質と反応し、新しい生成物だけが残ります。新しい化学物質を送ると、前の物質と反応し続け、プロセスが繰り返されます。あなたの仕事は、各反応の後に容器内のすべての式と物質をリストアップすることです。",
    "remark": "かがくはんのうようき"
  },
  "ko": {
    "title": "화학 반응 용기",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Korean. Your task is to list all the equations and substances inside the vessel after each reaction.",
    "description": "화학 반응 용기를 가지고 놀아주세요. 물질의 화학식을 보내드리면 여러분은 그 물질을 용기에 넣으세요. 용기가 비어 있으면 물질을 넣어도 반응이 일어나지 않습니다. 용기에 이전 반응의 잔여물이 있으면 새로운 물질과 반응하여 새로운 제품만 남게 됩니다. 새로운 화학 물질을 보내면 이전 제품이 계속 반응하고 프로세스가 반복됩니다. 여러분의 임무는 각 반응 후 용기에 있는 모든 방정식과 물질을 나열하는 것입니다.",
    "remark": "화학 반응 용기"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chemical-reaction-vessel",
  "tags": [
    "tool"
  ],
  "id": 136,
  "weight": 121
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
