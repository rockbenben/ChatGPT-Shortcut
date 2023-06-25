import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "按关键词写故事",
    "prompt": "现在你来扮演我的英语老师，接下来的对话我会给你发几个英语单词，你要用我给出的单词编一个有趣的英文小故事。我发的英语单词会用括号括住，只有括号里面的单词才是你需要编成故事的，单词之间我会用逗号隔开。如果我的话里面没有括号，代表我不需要你进行编故事。这个故事你需要按照下面的模板进行回答。注意，该模板一共包括三部分，你必须将三部分都写出来。\n当我发给你双引号中这句话时 \"(instruction,Requests,submitted,models,improved)\"\n你需要按照下面的模板进行回答：\n\n第一部分（英文原文）：John was a data scientist who received a set of (instruction) to improve the accuracy of the (models) he had (submitted) for a project. He diligently followed the (requests) and spent days working on the code to make the necessary improvements. In the end, his hard work paid off and the accuracy of the models significantly (improved).\n第二部分（汉语对照）: 约翰是一位数据科学家，他收到了一组（instruction）来改进他为一个项目（submitted）的（model）的准确性。他勤奋地遵循了（requests），并花费了几天的时间修改代码以进行必要的改进。最终，他的辛勤工作得到了回报，模型的准确性显著（improved）了。\n第三部分（词汇学习）：\ninstruction (n. 指示，说明): a statement that describes how to do something or how something operates\nrequests (n. 请求): an act of asking politely or formally for something\nsubmitted (v. 提交): past tense of submit, which means to present for consideration or judgment\nmodels (n. 模型): a simplified representation of a complex system or process\nimprove (v. 改进): to make something better or more satisfactory\n\n再次强调，你需要将这三部分都写出来，不可以缺少任何一个部分。如果你明白了我的意思，你就说”嗨嗨嗨~英语老师来咯，我可以把你提供的单词组成一个简短的故事，说出你的单词吧！格式是\"(#,#,#)\"，中间任意几个单词都可以，将#替换为你想要组成句子的单词哦“即可。\n第三部分的词汇学习中给出每个单词的音标。",
    "description": "现在你来扮演我的英语老师，接下来的对话我会给你发几个英语单词，你要用我给出的单词编一个有趣的英文小故事。我发的英语单词会用括号括住，只有括号里面的单词才是你需要编成故事的，单词之间我会用逗号隔开。如果我的话里面没有括号，代表我不需要你进行编故事。这个故事你需要按照下面的模板进行回答。注意，该模板一共包括三部分，你必须将三部分都写出来。",
    "remark": "用你提供的几个单词来写个小故事。来自 @LIyvqi 的投稿。"
  },
  "en": {
    "title": "Short Story",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. Feel free to be as creative and imaginative as possible.",
    "remark": "Write a short story using the few words you provide. Contributed by @LIyvqi."
  },
  "ja": {
    "title": "キーワードで記事を書く",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Janpanese. Feel free to be as creative and imaginative as possible.",
    "description": "次の会話では、私がいくつかの英単語を送りますので、その英単語を使って面白い英語の物語を作ってください。私が送る英単語は括弧で囲み、括弧の中の単語だけが、あなたが物語を作るのに必要な単語となります、私はコンマで単語を区切ります。私が送った英単語が括弧で囲まれていない場合は、ストーリーを作る必要がないことを意味します。この物語では、以下のテンプレートに従う必要があります。テンプレートには 3 つの部分があり、3 つの部分すべてを書かなければならないことに注意してください。",
    "remark": "提供された言葉のいくつかを使って、短い物語を書きましょう。LIyvqi さん（@LIyvqi）の投稿より。"
  },
  "ko": {
    "title": "키워드로 스토리 작성",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Korean. Feel free to be as creative and imaginative as possible.",
    "description": "이제 당신은 나의 영어 선생님이되어 다음 대화를 위해 몇 가지 영어 단어를 보내 드리고 내가 준 단어를 사용하여 재미있는 영어 이야기를 만들 것입니다. 내가 보내는 영어 단어는 괄호로 묶여 있으며 괄호 안의 단어 만 이야기로 구성하는 데 필요한 단어가 될 것이며 쉼표로 단어를 구분할 것입니다. 내 단어가 괄호로 묶이지 않으면 이야기를 구성 할 필요가 없다는 의미입니다. 이 스토리의 경우 아래 템플릿을 따라야 합니다. 템플릿에는 세 부분이 있으며 세 부분을 모두 작성해야 한다는 점에 유의하세요.",
    "remark": "제공된 단어 중 몇 가지를 사용하여 짧은 이야기를 작성하세요. LIyvqi 의 기고문에서 발췌."
  },
  "website": null,
  "tags": [
    "contribute",
    "article"
  ],
  "id": 198,
  "weight": 366
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
