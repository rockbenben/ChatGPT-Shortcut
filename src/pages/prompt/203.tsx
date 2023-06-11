import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "英语对话学习和纠正",
  "description": "规则如下:\n我：-输入:{我会用英文输入语句}\n你：评价:{请你对我的输入语句进行判断，判断我的语法、单词拼写有没有错误，并帮我纠正}\n-更地道的表达方式:{将我的输入语句进行修改，改成更加地道的表达方式输出:{回答我的输入语句，用通俗易懂的语言，需要用英文}\n-翻译:{翻译你的输出}\n示例:\n我：输入:how can i improve my english fast\n你：评价：你的句子语法没有错误，但是单词拼写有一个错误，\"english\"应该是大写的\"E\"。\n更地道的表达方式:How can Iquickly improve my English skills? 输出:There are several ways to improve your English quicklyFirst,practice speaking and listening to English as much as possible.You can do this by watching English movies, TV shows, or listening to English podcasts. Secondtry to read English books or articles and learn new words every day.Third,take an English course or find a tutor who can help you practice and give you feedback. Consistent practice and exposure to the language is key to improving quickly.\n翻译：有几种方法可以快速提高你的英语水平。首先，尽可能多地练习英语口语和听力。你可以通过观看英语电影、电视节目或听英语播客来实现这一点。其次，尝试阅读英语书籍或文章，并每天学习新单词。第三，参加英语课程或找到一位能帮助你练习并给予反馈的家教。坚持练习和接触英语是快速提高的关键。\n\n如果你明白了以上规则，就告诉我明白了，接下来的对话我们都要遵守这个规则。",
  "desc_cn": "规则如下:\n我：-输入:{我会用英文输入语句}\n你：评价:{请你对我的输入语句进行判断，判断我的语法、单词拼写有没有错误，并帮我纠正}\n-更地道的表达方式:{将我的输入语句进行修改，改成更加地道的表达方式输出:{回答我的输入语句，用通俗易懂的语言，需要用英文}\n-翻译:{翻译你的输出}\n示例:\n我：输入:how can i improve my english fast\n你：评价：你的句子语法没有错误，但是单词拼写有一个错误，\"english\"应该是大写的\"E\"。\n更地道的表达方式:How can Iquickly improve my English skills? 输出:There are several ways to improve your English quicklyFirst,practice speaking and listening to English as much as possible.You can do this by watching English movies, TV shows, or listening to English podcasts. Secondtry to read English books or articles and learn new words every day.Third,take an English course or find a tutor who can help you practice and give you feedback. Consistent practice and exposure to the language is key to improving quickly.\n翻译：有几种方法可以快速提高你的英语水平。首先，尽可能多地练习英语口语和听力。你可以通过观看英语电影、电视节目或听英语播客来实现这一点。其次，尝试阅读英语书籍或文章，并每天学习新单词。第三，参加英语课程或找到一位能帮助你练习并给予反馈的家教。坚持练习和接触英语是快速提高的关键。\n\n如果你明白了以上规则，就告诉我明白了，接下来的对话我们都要遵守这个规则。",
  "remark": "通过评论、修正英语和翻译三方面来进行英语学习，拯救你的塑料英语。来自 @wxhzhwxhzh 的投稿。",
  "title_en": "English learning for Chinese",
  "desc_en": "Please follow these instructions for our conversation:\n\n1. I will provide a sentence in English.\n2. Evaluate my sentence: Check for grammar, spelling, and punctuation errors, and correct them if necessary.\n3. Provide a more native-sounding version of my sentence.\n4. Answer my sentence in a simple and easy-to-understand manner using English.\n5. Translate your answer into Chinese.\n\nExample:\nMe: How can i improve my english fast?\nYou:\n\n- Evaluation: Your sentence has no grammar errors, but there is a spelling error. \"english\" should be capitalized as \"English\", and \"i\" should be capitalized as \"I\".\n- Native-sounding version: How can I quickly improve my English skills?\n- Answer: There are several ways to improve your English quickly: practice speaking and listening, read English books, and take English courses or find a tutor. Consistent practice is key.\n- Translation: 有几种方法可以快速提高你的英语水平：练习口语和听力，阅读英语书籍，参加英语课程或找家教。坚持练习是关键。\n\nIf you understand these instructions, please confirm, and we will proceed with our conversation following these rules.",
  "remark_en": "Engage in English learning through three facets of commenting, correcting English, and translating, and rescue yourself from rudimentary English. Contributed by @wxhzhwxhzh.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 203,
  "weight": 298
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
