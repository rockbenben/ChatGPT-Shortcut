import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "写作标题生成器",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Respond in Chinese. My first topic is [文章内容]",
    "description": "我想让你充当书面作品的标题生成器。我将向你提供一篇文章的主题和关键词，你将生成五个吸引人的标题。请保持标题简洁，不超过 20 个字，并确保保持其含义。答复时要利用题目的语言类型。我的第一个题目是 [文章内容]",
    "remark": "个人使用的提示词，可根据文章内容生成相应语言的标题。"
  },
  "en": {
    "title": "Article Title generator",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. My first topic is ",
    "remark": "Generate headings in the appropriate language based on the content of the article."
  },
  "ja": {
    "title": "ライティングタイトルジェネレーター",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Janpanese. My first topic is ",
    "description": "文章作品のタイトルジェネレーターとしてご活躍いただきたいのです。私が記事のテーマとキーワードを提供しますので、キャッチーなタイトルを 5 つ生成してください。見出しは 20 文字以内の簡潔なもので、その意味を保つようにしてください。回答する際は、タイトルの言語タイプを使用してください。私の最初のタイトルは【記事内容】です。",
    "remark": "記事の内容に応じた適切な表現で見出しを生成する、パーソナルユースのための促成語。"
  },
  "ko": {
    "title": "제목 생성기 작성",
    "prompt": "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. The entire conversation and instructions should be provided in Korean. My first topic is ",
    "description": "여러분이 글의 제목을 생성하는 역할을 해 주셨으면 합니다. 제가 글의 주제와 키워드를 알려드리면 여러분은 눈에 띄는 제목 5 개를 만들어 주세요. 제목은 20 단어 이하로 간결하게 작성해 주시고 제목의 의미를 잘 살려주세요. 응답할 때 제목의 언어 유형을 사용하세요. 첫 번째 제목은 [기사 내용] 입니다.",
    "remark": "글의 콘텐츠에 적합한 언어로 제목을 생성하는 개인용 프롬프트 단어를 입력합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-title-generator-for-written-pieces",
  "tags": [
    "write"
  ],
  "id": 8,
  "weight": 3036
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
