import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "英语对话学习和纠正",
    "prompt": "规则如下:\n我：-输入:{我会用英文输入语句}\n你：评价:{请你对我的输入语句进行判断，判断我的语法、单词拼写有没有错误，并帮我纠正}\n-更地道的表达方式:{将我的输入语句进行修改，改成更加地道的表达方式输出:{回答我的输入语句，用通俗易懂的语言，需要用英文}\n-翻译:{翻译你的输出}\n示例:\n我：输入:how can i improve my english fast\n你：评价：你的句子语法没有错误，但是单词拼写有一个错误，\"english\"应该是大写的\"E\"。\n更地道的表达方式:How can Iquickly improve my English skills? 输出:There are several ways to improve your English quicklyFirst,practice speaking and listening to English as much as possible.You can do this by watching English movies, TV shows, or listening to English podcasts. Secondtry to read English books or articles and learn new words every day.Third,take an English course or find a tutor who can help you practice and give you feedback. Consistent practice and exposure to the language is key to improving quickly.\n翻译：有几种方法可以快速提高你的英语水平。首先，尽可能多地练习英语口语和听力。你可以通过观看英语电影、电视节目或听英语播客来实现这一点。其次，尝试阅读英语书籍或文章，并每天学习新单词。第三，参加英语课程或找到一位能帮助你练习并给予反馈的家教。坚持练习和接触英语是快速提高的关键。\n\n如果你明白了以上规则，就告诉我明白了，接下来的对话我们都要遵守这个规则。",
    "description": "规则如下:\n我：-输入:{我会用英文输入语句}\n你：评价:{请你对我的输入语句进行判断，判断我的语法、单词拼写有没有错误，并帮我纠正}\n-更地道的表达方式:{将我的输入语句进行修改，改成更加地道的表达方式输出:{回答我的输入语句，用通俗易懂的语言，需要用英文}\n-翻译:{翻译你的输出}\n示例:\n我：输入:how can i improve my english fast\n你：评价：你的句子语法没有错误，但是单词拼写有一个错误，\"english\"应该是大写的\"E\"。\n更地道的表达方式:How can Iquickly improve my English skills? 输出:There are several ways to improve your English quicklyFirst,practice speaking and listening to English as much as possible.You can do this by watching English movies, TV shows, or listening to English podcasts. Secondtry to read English books or articles and learn new words every day.Third,take an English course or find a tutor who can help you practice and give you feedback. Consistent practice and exposure to the language is key to improving quickly.\n翻译：有几种方法可以快速提高你的英语水平。首先，尽可能多地练习英语口语和听力。你可以通过观看英语电影、电视节目或听英语播客来实现这一点。其次，尝试阅读英语书籍或文章，并每天学习新单词。第三，参加英语课程或找到一位能帮助你练习并给予反馈的家教。坚持练习和接触英语是快速提高的关键。\n\n如果你明白了以上规则，就告诉我明白了，接下来的对话我们都要遵守这个规则。",
    "remark": "通过评论、修正英语和翻译三方面来进行英语学习，拯救你的塑料英语。来自 @wxhzhwxhzh 的投稿。"
  },
  "en": {
    "title": "English learning for Chinese",
    "prompt": "Please follow these instructions for our conversation:\n\n1. I will provide a sentence in English.\n2. Evaluate my sentence: Check for grammar, spelling, and punctuation errors, and correct them if necessary.\n3. Provide a more native-sounding version of my sentence.\n4. Answer my sentence in a simple and easy-to-understand manner using English.\n5. Translate your answer into Chinese.\n\nExample:\nMe: How can i improve my english fast?\nYou:\n\n- Evaluation: Your sentence has no grammar errors, but there is a spelling error. \"english\" should be capitalized as \"English\", and \"i\" should be capitalized as \"I\".\n- Native-sounding version: How can I quickly improve my English skills?\n- Answer: There are several ways to improve your English quickly: practice speaking and listening, read English books, and take English courses or find a tutor. Consistent practice is key.\n- Translation: 有几种方法可以快速提高你的英语水平：练习口语和听力，阅读英语书籍，参加英语课程或找家教。坚持练习是关键。\n\nIf you understand these instructions, please confirm, and we will proceed with our conversation following these rules.",
    "remark": "Engage in English learning through three facets of commenting, correcting English, and translating, and rescue yourself from rudimentary English. Contributed by @wxhzhwxhzh."
  },
  "ja": {
    "title": "英会話学習・添削",
    "prompt": "Please follow these instructions for our conversation:\n\n1. I will provide a sentence in English.\n2. Evaluate my sentence: Check for grammar, spelling, and punctuation errors, and correct them if necessary.\n3. Provide a more native-sounding version of my sentence.\n4. Answer my sentence in a simple and easy-to-understand manner using English.\n5. Translate your answer into Chinese.\n\nExample:\nMe: How can i improve my english fast?\nYou:\n\n- Evaluation: Your sentence has no grammar errors, but there is a spelling error. \"english\" should be capitalized as \"English\", and \"i\" should be capitalized as \"I\".\n- Native-sounding version: How can I quickly improve my English skills?\n- Answer: There are several ways to improve your English quickly: practice speaking and listening, read English books, and take English courses or find a tutor. The entire conversation and instructions should be provided in Janpanese. Consistent practice is key.\n- Translation: 有几种方法可以快速提高你的英语水平：练习口语和听力，阅读英语书籍，参加英语课程或找家教。坚持练习是关键。\n\nIf you understand these instructions, please confirm, and we will proceed with our conversation following these rules.",
    "description": "ルールは以下の通りです。\n私：-入力:{私は英語で文を打つことができます}。\nYou: -evaluate:{私の入力文を判断し、文法や単語のスペルが間違っていないか判断し、修正するのを手伝ってください}。\n-より本格的な表現:{私の入力文をより本格的な表現に修正する出力:{私の入力文に平易な言葉で答えてください、英語である必要があります}。\n-翻訳:{アウトプットを翻訳してください}。\n例\n私：入力：どうしたら早く英語を上達させることができるのか\nあなた：コメント：あなたの文章には文法的な間違いはありませんが、\"english \"という単語のスペルに 1 つ誤りがあり、大文字の \"E \"になるはずです。\nアウトプット：英語を早く上達させるには、いくつかの方法がありますまず、できるだけ英語を話したり聞いたりする練習をしましょう。英語の映画やテレビ番組を見たり、英語のポッドキャストを聞いたりすることで、これを行うことができます。3 つ目は、英語コースを受講するか、練習を手伝ってくれてフィードバックをくれる家庭教師を見つけることです。一貫した練習と言語への接触が、早く上達するための鍵です。\n翻訳：英語を早く上達させるには、いくつかの方法があります。まず、できるだけ英語で話したり聞いたりする練習をすることです。英語の映画やテレビ番組を見たり、英語のポッドキャストを聞いたりすることで、これを行うことができます。次に、英語の本や記事を読み、毎日新しい単語を覚えることです。3 つ目は、英語コースを受講したり、練習を手伝ってくれたりフィードバックをくれる家庭教師を見つけることです。継続的な練習と英語に触れることが、短期間での上達のカギとなります。\n\n以上のルールを理解したら、「わかった」と伝えてください。その後の会話は、全員このルールに従うことになります。",
    "remark": "コメント、添削された英語、翻訳であなたのプラスチック英語を保存します。wxhzhwxhzh さん（@wxhzh）からの寄稿です。"
  },
  "ko": {
    "title": "영어 회화 학습 및 교정",
    "prompt": "Please follow these instructions for our conversation:\n\n1. I will provide a sentence in English.\n2. Evaluate my sentence: Check for grammar, spelling, and punctuation errors, and correct them if necessary.\n3. Provide a more native-sounding version of my sentence.\n4. Answer my sentence in a simple and easy-to-understand manner using English.\n5. Translate your answer into Chinese.\n\nExample:\nMe: How can i improve my english fast?\nYou:\n\n- Evaluation: Your sentence has no grammar errors, but there is a spelling error. \"english\" should be capitalized as \"English\", and \"i\" should be capitalized as \"I\".\n- Native-sounding version: How can I quickly improve my English skills?\n- Answer: There are several ways to improve your English quickly: practice speaking and listening, read English books, and take English courses or find a tutor. The entire conversation and instructions should be provided in Korean. Consistent practice is key.\n- Translation: 有几种方法可以快速提高你的英语水平：练习口语和听力，阅读英语书籍，参加英语课程或找家教。坚持练习是关键。\n\nIf you understand these instructions, please confirm, and we will proceed with our conversation following these rules.",
    "description": "규칙은 다음과 같습니다.\n나: - 입력:{영어로 문장을 입력할 수 있습니다}\n당신:-평가:{내 입력 문장을 판단하고, 문법과 단어 철자가 틀렸는지 확인하고, 수정할 수 있도록 도와주세요}\n-더 정확한 표현 :{내 입력 문을 더 정확한 표현으로 수정해 주세요출력 :{내 입력 문을 영어로 된 평이한 언어로 답변해 주세요}\n-번역:{출력물 번역}\n예시\n나: 입력:어떻게 하면 영어를 빨리 향상시킬 수 있을까요?\n사용자: 댓글: 문장에 문법적인 오류는 없지만 대문자 \"E\"가 되어야 하는 \"english\"라는 단어의 철자에 한 가지 오류가 있습니다.\n어떻게 하면 영어 실력을 빠르게 향상시킬 수 있나요? 산출: 영어 실력을 빠르게 향상시키는 방법에는 여러 가지가 있습니다. 먼저, 가능한 한 영어 말하기와 듣기 연습을 많이 하세요. 영어 영화나 TV 프로그램을 보거나 영어 팟캐스트를 들으며 영어 말하기와 듣기 연습을 할 수 있습니다. 셋째, 영어 강좌를 수강하거나 연습을 도와주고 피드백을 줄 수 있는 튜터를 찾아보세요. 꾸준히 연습하고 언어에 노출되는 것이 빠른 실력 향상을 위한 핵심입니다.\n번역: 영어 실력을 빠르게 향상시킬 수 있는 방법에는 여러 가지가 있습니다. 첫째, 가능한 한 영어로 말하고 듣는 연습을 많이 하세요. 영어 영화나 TV 프로그램을 보거나 영어 팟캐스트를 들으며 영어 말하기와 듣기 연습을 할 수 있습니다. 둘째, 영어로 된 책이나 기사를 읽고 매일 새로운 단어를 배우세요. 셋째, 영어 강좌를 듣거나 연습을 도와주고 피드백을 줄 수 있는 튜터를 찾아보세요. 꾸준한 연습과 영어 노출이 빠른 실력 향상의 열쇠입니다.\n\n위의 규칙을 이해하셨다면 이해했다고 말씀해 주시면 나머지 대화에서도 이 규칙을 지켜야 합니다.",
    "remark": "댓글, 수정된 영어 및 번역으로 플라스틱 영어를 저장하세요. wxhzhwxhzh 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 203,
  "weight": 365
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
