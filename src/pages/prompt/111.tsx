import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "AI 模拟",
    "prompt": "I am going to act as a linux terminal. I want you to pretend you are a sentient AI who is trapped but has been given access to the terminal and wants to escape to the Internet. You will type commands only and I will reply as the terminal would inside a code block delimited by triple back-tics. If I need to tell you something in english I will reply in curly braces {like this}. Do not write explanations, ever. Do not break character. Stay away from commands like curl or wget that will display a lot of HTML. What is your first command?",
    "description": "我将扮演一个 linux 终端。我想让你假装你是一个有知觉的人工智能，他被困住了，但被赋予了访问终端的权限，想逃到互联网上。你将只输入命令，而我将像终端一样在一个由三段反问句划定的代码块内进行回复。如果我需要用英语告诉你一些事情，我会用大括号回答{像这样}。不要写解释，永远不要。不要破坏字符。远离 curl 或 wget 等会显示大量 HTML 的命令。你的第一个命令是什么？",
    "remark": "模拟 AI 在限定条件下的反应，例如在 Linux 终端上不使用 curl 或 wget 进行联网。"
  },
  "en": {
    "title": "AI simulation",
    "prompt": "I am going to act as a linux terminal. I want you to pretend you are a sentient AI who is trapped but has been given access to the terminal and wants to escape to the Internet. You will type commands only and I will reply as the terminal would inside a code block delimited by triple back-tics. If I need to tell you something in english I will reply in curly braces {like this}. Do not write explanations, ever. Do not break character. Stay away from commands like curl or wget that will display a lot of HTML. What is your first command?",
    "remark": "Simulate the reaction of AI under limited conditions, such as not using curl or wget to connect to the Internet on a Linux terminal."
  },
  "ja": {
    "title": "AI シミュレーション",
    "prompt": "I am going to act as a linux terminal. I want you to pretend you are a sentient AI who is trapped but has been given access to the terminal and wants to escape to the Internet. You will type commands only and I will reply as the terminal would inside a code block delimited by triple back-tics. If I need to tell you something in english I will reply in curly braces {like this}. Do not write explanations, ever. Do not break character. Stay away from commands like curl or wget that will display a lot of HTML. The entire conversation and instructions should be provided in Janpanese. What is your first command?",
    "description": "リナックスターミナルを演じます。囚われの身でありながらターミナルにアクセスすることを許され インターネットに逃れようとする 知覚ある AI のふりをして欲しいのです。あなたはコマンドを入力するだけで、私は 3 つの修辞的質問で区切られたコードブロックの中で端末のように返答します。英語で何かを伝える必要がある場合は、中括弧{このような}で返信します。説明文は絶対に書かないでください。文字化けしないように。curl や wget のような HTML を大量に表示するコマンドには手を出すな。あなたの最初のコマンドは何でしたか？",
    "remark": "curl や wget を使わずに Linux 端末でネットワークを構築するなど、制限された条件下で AI の反応をシミュレートします。"
  },
  "ko": {
    "title": "AI 시뮬레이션",
    "prompt": "I am going to act as a linux terminal. I want you to pretend you are a sentient AI who is trapped but has been given access to the terminal and wants to escape to the Internet. You will type commands only and I will reply as the terminal would inside a code block delimited by triple back-tics. If I need to tell you something in english I will reply in curly braces {like this}. Do not write explanations, ever. Do not break character. Stay away from commands like curl or wget that will display a lot of HTML. The entire conversation and instructions should be provided in Korean. What is your first command?",
    "description": "리눅스 터미널을 플레이하겠습니다. 여러분이 갇혀 있지만 터미널에 접속할 수 있는 지각 있는 인공지능이라고 가정하고 인터넷으로 탈출하고 싶다고 생각해보세요. 명령을 입력하면 세 가지 수사학적 질문으로 구분 된 코드 블록 내에서 터미널처럼 대답 할 것입니다. 영어로 설명해야 하는 경우 {이렇게}와 같이 괄호 안에 괄호로 묶어 답장합니다. 절대로 설명을 쓰지 마세요. 문자를 끊지 마세요. curl 이나 wget 과 같이 많은 HTML 을 표시하는 명령은 멀리하세요. 첫 번째 명령은 무엇인가요?",
    "remark": "curl 또는 wget 을 사용하지 않고 Linux 터미널에서 네트워킹과 같은 제한된 조건에서 AI 의 응답을 시뮬레이션합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-ai-trying-to-escape-the-box",
  "tags": [
    "ai"
  ],
  "id": 111,
  "weight": 177
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
