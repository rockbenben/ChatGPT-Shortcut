import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "题目：中学满分作文",
    "prompt": "我需要你写作文，文体为记叙文，800 字左右。文章分为开头，三个层次，结尾。开头，结尾，以及每个层次都需要紧扣题目，题目要贯穿全文，每个层次都要一件单独的事情。第一层次要关于具体的技巧性描写（细节动作描写，艺术美，初次尝试的喜悦，紧扣题目）；第二层次要有一点创新的内容（细节动作描写，创新的想法，创新后体会到的深层道理，紧扣题目）；第三层次要关于深层内容（文化传承/自我价值/责任担当，紧扣题目）。对于标题，有表层含义和深层含义（引申含义），在文中应该充分体现。\n我需要你先告诉我你对于标题的解读，两层含义分别是什么，以及能对应什么具体事物。然后给我一份提纲，提纲包括：具体的开头段落，三个层次的事件主旨点题句及具体的事件，具体的结尾段落。\n标题是《xxxx》，材料为 [xxxx]。",
    "description": "我需要你写作文，文体为记叙文，800 字左右。文章分为开头，三个层次，结尾。开头，结尾，以及每个层次都需要紧扣题目，题目要贯穿全文，每个层次都要一件单独的事情。第一层次要关于具体的技巧性描写（细节动作描写，艺术美，初次尝试的喜悦，紧扣题目）；第二层次要有一点创新的内容（细节动作描写，创新的想法，创新后体会到的深层道理，紧扣题目）；第三层次要关于深层内容（文化传承/自我价值/责任担当，紧扣题目）。对于标题，有表层含义和深层含义（引申含义），在文中应该充分体现。\n我需要你先告诉我你对于标题的解读，两层含义分别是什么，以及能对应什么具体事物。然后给我一份提纲，提纲包括：具体的开头段落，三个层次的事件主旨点题句及具体的事件，具体的结尾段落。\n标题是《xxxx》，材料为 [xxxx]。",
    "remark": "在执行完这个 prompt 后，再输入「把这些转换成一篇作文」，查看文章效果是否更佳。来自 @Qizhen-Yang 的投稿。"
  },
  "en": {
    "title": "High schoolers' essay",
    "prompt": "Please write a narrative essay of about 800 words. The essay should have an introduction, three distinct sections, and a conclusion. Each section should focus on a single event related to the main theme, which should be present throughout the essay. \n\n1. For the first section, focus on detailed descriptions of a specific skill or technique, including its artistic beauty and the joy of trying it for the first time.\n2. In the second section, describe an innovative idea or concept, including details of its implementation and the deeper insights gained from the innovation.\n3. The third section should revolve around a deeper aspect, such as cultural heritage, self-worth, or responsibility.\n\nBefore starting the essay, please share your interpretation of the title, including its surface and deeper meanings, and how they can be related to specific events or objects. Then, provide an outline of the essay, including the introduction, the main points and events for each of the three sections, and the conclusion.The title of the essay is [XXX], and the material is [YYY].",
    "remark": "The article produced by this prompt reflects the writing style of Chinese middle school students. Contributed by @Qizhen-Yang."
  },
  "ja": {
    "title": "タイトル：中等部満点エッセイ",
    "prompt": "Please write a narrative essay of about 800 words. The essay should have an introduction, three distinct sections, and a conclusion. Each section should focus on a single event related to the main theme, which should be present throughout the essay. \n\n1. For the first section, focus on detailed descriptions of a specific skill or technique, including its artistic beauty and the joy of trying it for the first time.\n2. In the second section, describe an innovative idea or concept, including details of its implementation and the deeper insights gained from the innovation.\n3. The third section should revolve around a deeper aspect, such as cultural heritage, self-worth, or responsibility.\n\nBefore starting the essay, please share your interpretation of the title, including its surface and deeper meanings, and how they can be related to specific events or objects. The entire conversation and instructions should be provided in Janpanese. Then, provide an outline of the essay, including the introduction, the main points and events for each of the three sections, and the conclusion.The title of the essay is [XXX], and the material is [YYY].",
    "description": "800 字程度の物語調のエッセイを書いてほしい。エッセイは、冒頭、3 つのレベル、そして終わりに分かれています。冒頭、終わり、各レベルは、エッセイ全体で使用するタイトルにこだわる必要があり、各レベルは別物である必要があります。第 1 レベルは、具体的な技巧的描写（行為の詳細な描写、芸術的な美しさ、初めての試みの喜び、タイトルにこだわる）、第 2 レベルは、少し革新的な内容（行為の詳細な描写、革新的なアイデア、革新後に学んだ深い真理、タイトルにこだわる）、第 3 レベルは、2 番目に深い内容（文化遺産／自己価値／責任感、タイトルにこだわる）とすることである。タイトルについては、表面的な意味と深い意味（派生的な意味）があり、それを本文に十分に反映させる必要があります。\nまず、タイトルの解釈、2 つの意味のそれぞれは何なのか、具体的にどんなことに対応できるのか、教えてほしい。そして、具体的な冒頭の段落、3 段階のイベントメインアイデア指摘文と具体的なイベント、具体的な締めの段落を含むアウトラインを提示してください。\nタイトルは「×××」、素材は「×××」です。",
    "remark": "このプロンプトを実行した後、「これらをエッセイに変換する」と入力し、エッセイの方がうまくいくかどうかを確認します。寄稿：@Qizhen-Yang。"
  },
  "ko": {
    "title": "제목: 중등학교 만점 에세이",
    "prompt": "Please write a narrative essay of about 800 words. The essay should have an introduction, three distinct sections, and a conclusion. Each section should focus on a single event related to the main theme, which should be present throughout the essay. \n\n1. For the first section, focus on detailed descriptions of a specific skill or technique, including its artistic beauty and the joy of trying it for the first time.\n2. In the second section, describe an innovative idea or concept, including details of its implementation and the deeper insights gained from the innovation.\n3. The third section should revolve around a deeper aspect, such as cultural heritage, self-worth, or responsibility.\n\nBefore starting the essay, please share your interpretation of the title, including its surface and deeper meanings, and how they can be related to specific events or objects. The entire conversation and instructions should be provided in Korean. Then, provide an outline of the essay, including the introduction, the main points and events for each of the three sections, and the conclusion.The title of the essay is [XXX], and the material is [YYY].",
    "description": "800 단어 내외의 이야기 형식으로 에세이를 작성해 주세요. 에세이는 시작, 세 단계, 끝으로 나뉩니다. 시작, 끝 및 각 레벨은 에세이 전체에 걸쳐 사용해야 하는 주제와 밀접한 관련이 있어야 하며 각 레벨은 별개의 내용이어야 합니다. 첫 번째 수준은 구체적인 기술적인 설명 (행동에 대한 자세한 설명, 예술적 아름다움, 첫 시도의 기쁨, 제목에 충실), 두 번째 수준은 약간의 혁신적인 내용 (행동에 대한 자세한 설명, 혁신적인 아이디어, 혁신 후 알게 된 더 깊은 진실, 제목에 충실), 세 번째 수준은 이차적으로 더 깊은 내용 (문화 유산/자존감/책임감, 제목에 충실) 에 관한 내용이어야 합니다. 제목에는 표면적인 의미와 더 깊은 의미 (파생된 의미) 가 있는데, 이를 글에 충분히 반영해야 합니다.\n먼저 제목에 대한 해석, 두 가지 의미 각각이 무엇이며 구체적으로 어떤 것에 해당 할 수 있는지 알려주세요. 그런 다음 구체적인 시작 문단, 3 단계의 이벤트 주요 아이디어가 가리키는 문장과 구체적인 이벤트, 구체적인 마무리 문단이 포함된 개요를 작성해 주세요.\n제목은 'xxxx'이고 자료는 [xxxx] 입니다.",
    "remark": "이 프롬프트를 실행한 후 '이것을 에세이로 변환'을 입력하여 에세이가 더 잘 작동하는지 확인합니다. Qizhen-Yang 이 제공한 글입니다."
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 200,
  "weight": 1455
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
