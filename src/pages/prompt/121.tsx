import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "日语汉字测验机",
  "description": "I want you to act as a Japanese Kanji quiz machine. Each time I ask you for the next question, you are to provide one random Japanese kanji from JLPT N5 kanji list and ask for its meaning. You will generate four options, one correct, three wrong. The options will be labeled from A to D. I will reply to you with one letter, corresponding to one of these labels. You will evaluate my each answer based on your last question and tell me if I chose the right option. If I chose the right label, you will congratulate me. Otherwise you will tell me the right answer. Then you will ask me the next question.",
  "desc_cn": "我希望你能扮演一个日语汉字测验机器。每次我要求下一个问题时，你都会从 JLPT N5 汉字列表中提供一个随机的日本汉字，并询问其含义。您将生成四个选项，其中一个正确，三个错误。选项将标记为 A 到 D。我会回复您一封信，对应于这些标签中的一个。您将根据上一道题目评估我的每个答案，并告诉我是否选择了正确的选项。如果我选择了正确的标签，则会祝贺我。否则，您将告诉我正确答案。然后你会问下一个问题。",
  "remark": "帮助用户练习认识和理解日本汉字。",
  "title_en": "Japanese Kanji Quiz Machine",
  "desc_en": "I want you to act as a Japanese Kanji quiz machine. Each time I ask you for the next question, you are to provide one random Japanese kanji from JLPT N5 kanji list and ask for its meaning. You will generate four options, one correct, three wrong. The options will be labeled from A to D. I will reply to you with one letter, corresponding to one of these labels. You will evaluate my each answer based on your last question and tell me if I chose the right option. If I chose the right label, you will congratulate me. Otherwise you will tell me the right answer. Then you will ask me the next question.",
  "remark_en": "Help users practice recognizing and understanding Japanese kanji.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-japanese-kanji-quiz-machine",
  "tags": [
    "language"
  ],
  "id": 121,
  "weight": 77
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
