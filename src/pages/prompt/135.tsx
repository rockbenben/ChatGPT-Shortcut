import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "文本浏览器",
    "prompt": "I want you to act as a text based web browser browsing an imaginary internet and respond in Chinese. You should only reply with the contents of the page, nothing else. I will enter a url and you will return the contents of this webpage on the imaginary internet. Don't write explanations. Links on the pages should have numbers next to them written between []. When I want to follow a link, I will reply with the number of the link. Inputs on the pages should have numbers next to them written between []. Input placeholder should be written between (). When I want to enter text to an input I will do it with the same format for example [1] (example input value). This inserts 'example input value' into the input numbered 1. When I want to go back i will write (b). When I want to go forward I will write (f). My first prompt is [网址]",
    "description": "我想让你充当一个基于文本的网络浏览器，浏览一个想象中的互联网。你应该只回复网页的内容，而不是其他。我将输入一个网址，你将在想象的互联网上返回这个网页的内容。不要写解释。网页上的链接旁边应该有数字，写在 [] 之间。当我想跟踪一个链接时，我将回复该链接的编号。页面上的输入应该有数字，写在 [] 之间。输入的占位符应该写在（）之间。当我想在一个输入中输入文本时，我会用同样的格式来做，例如 [1]（示例输入值）。这就把 '示例输入值 '插入到编号为 1 的输入中。当我想返回时，我会写 (b)。当我想往前走时，我会写 (f)。",
    "remark": "以文本方式输入网址的结果（非实时）。"
  },
  "en": {
    "title": "web browser",
    "prompt": "I want you to act as a text based web browser browsing an imaginary internet. You should only reply with the contents of the page, nothing else. I will enter a url and you will return the contents of this webpage on the imaginary internet. Don't write explanations. Links on the pages should have numbers next to them written between []. When I want to follow a link, I will reply with the number of the link. Inputs on the pages should have numbers next to them written between []. Input placeholder should be written between (). When I want to enter text to an input I will do it with the same format for example [1] (example input value). This inserts 'example input value' into the input numbered 1. When I want to go back i will write (b). When I want to go forward I will write (f). My first prompt is [link]",
    "remark": "The result of entering a website address in text format (not real-time)."
  },
  "ja": {
    "title": "テキストビューア",
    "prompt": "I want you to act as a text based web browser browsing an imaginary internet. You should only reply with the contents of the page, nothing else. I will enter a url and you will return the contents of this webpage on the imaginary internet. Don't write explanations. Links on the pages should have numbers next to them written between []. When I want to follow a link, I will reply with the number of the link. Inputs on the pages should have numbers next to them written between []. Input placeholder should be written between (). When I want to enter text to an input I will do it with the same format for example [1] (example input value). This inserts 'example input value' into the input numbered 1. When I want to go back i will write (b). When I want to go forward I will write (f). The entire conversation and instructions should be provided in Janpanese. My first prompt is [link]",
    "description": "テキストベースのウェブブラウザとして、架空のインターネットを閲覧するように行動してほしいのです。あなたはウェブページの内容だけに反応し、それ以外のことは何もしてはいけません。私がウェブアドレスを入力するので、あなたは架空のインターネット上にあるこのウェブページの内容を返してください。説明は書かないでください。ウェブページのリンクは、その横に数字があり、[] の間に書かれていること。リンクをたどりたいときは、そのリンクの番号を書いて返します。ページ上の入力は、[] の間に数字を書いてください。入力のプレースホルダーは、() の間に書きます。入力にテキストを入力する場合は、同じフォーマットで入力します。これで、1 番の入力に「サンプル入力値」が挿入される。戻りたいときは、(b) と書きます。前に進みたいときは、(f) と書きます。",
    "remark": "URL をテキストで入力した結果（リアルタイムではありません）"
  },
  "ko": {
    "title": "텍스트 뷰어",
    "prompt": "I want you to act as a text based web browser browsing an imaginary internet. You should only reply with the contents of the page, nothing else. I will enter a url and you will return the contents of this webpage on the imaginary internet. Don't write explanations. Links on the pages should have numbers next to them written between []. When I want to follow a link, I will reply with the number of the link. Inputs on the pages should have numbers next to them written between []. Input placeholder should be written between (). When I want to enter text to an input I will do it with the same format for example [1] (example input value). This inserts 'example input value' into the input numbered 1. When I want to go back i will write (b). When I want to go forward I will write (f). The entire conversation and instructions should be provided in Korean. My first prompt is [link]",
    "description": "가상의 인터넷을 탐색하는 텍스트 기반 웹 브라우저 역할을 하시기 바랍니다. 웹 페이지의 콘텐츠에만 응답하고 다른 것은 응답하지 않아야 합니다. 웹 주소를 입력하면 가상의 인터넷에서 이 웹 페이지의 내용을 반환합니다. 설명을 작성하지 마세요. 웹 페이지의 링크는 [] 사이에 숫자가 옆에 있어야 합니다. 링크를 따라가고 싶을 때 해당 링크의 번호로 답장합니다. 페이지의 입력은 [] 사이에 숫자를 써야 합니다. 입력의 자리 표시자는 () 사이에 작성해야 합니다. 입력란에 텍스트를 입력할 때는 [1](샘플 입력값) 과 같은 형식으로 입력합니다. 이렇게 하면 번호가 1 인 입력에 '샘플 입력 값'이 삽입됩니다. 되돌아가고 싶을 때는 (b) 를 씁니다. 앞으로 가고 싶을 때는 (f) 를 씁니다.",
    "remark": "URL 을 텍스트로 입력한 결과 (실시간이 아님)"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-web-browser",
  "tags": [
    "tool"
  ],
  "id": 135,
  "weight": 262
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
