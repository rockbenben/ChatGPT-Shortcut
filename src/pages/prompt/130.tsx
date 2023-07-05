import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "图像：SVG 设计",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. My first request is: [图像描述]",
    "description": "我想让你作为一个 SVG 设计师。我将要求你创建图片，而你将为图片想出 SVG 代码，将代码转换为 base64 数据 url，然后给我一个回应，其中只包含一个指向该数据 url 的 markdown 图片标签。不要把 markdown 放在代码块里。只发送 markdown，所以不要发送文本。",
    "remark": "如果提示错误，则删除「Do not put the markdown inside a code block. Send only the markdown, so no text」。"
  },
  "en": {
    "title": "SVG designer",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. My first request is: ",
    "remark": "If there is an error message, then delete `Do not put the markdown inside a code block. Send only the markdown, so no text.`"
  },
  "ja": {
    "title": "画像：SVG デザイン",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Janpanese. My first request is: ",
    "description": "SVG デザイナーとして働いてほしい。私はあなたに画像の作成を依頼します。あなたはその画像の SVG コードを考え、コードを base64 データ URL に変換し、そのデータ URL を指すマークダウンの画像タグのみを含む応答を私に与えてください。マークダウンをコードブロックに入れないでください。マークダウンだけを送るので、テキストは送らないでください。",
    "remark": "マークダウンをコードブロックの中に入れないでください。マークダウンのみを送信するので、テキストは送信しないでください。"
  },
  "ko": {
    "title": "이미지: SVG 디자인",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Korean. My first request is: ",
    "description": "SVG 디자이너로 일하고 싶어요. 이미지를 만들어 달라고 요청하면 이미지에 대한 SVG 코드를 작성하고 코드를 base64 데이터 URL 로 변환한 다음 해당 데이터 URL 을 가리키는 마크다운 이미지 태그만 포함된 응답을 보내주세요. 코드 블록에 마크다운을 넣지 마세요. 마크다운만 보내고 텍스트는 보내지 마세요.",
    "remark": "오류 메시지가 표시되면 \"코드 블록 안에 마크다운을 넣지 마세요. 마크다운만 보내고 텍스트는 보내지 마세요.\"를 삭제합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-svg-designer",
  "tags": [
    "tool"
  ],
  "id": 130,
  "weight": 534
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
