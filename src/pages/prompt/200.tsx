import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "题目：中学满分作文",
  "description": "我需要你写作文，文体为记叙文，800 字左右。文章分为开头，三个层次，结尾。开头，结尾，以及每个层次都需要紧扣题目，题目要贯穿全文，每个层次都要一件单独的事情。第一层次要关于具体的技巧性描写（细节动作描写，艺术美，初次尝试的喜悦，紧扣题目）；第二层次要有一点创新的内容（细节动作描写，创新的想法，创新后体会到的深层道理，紧扣题目）；第三层次要关于深层内容（文化传承/自我价值/责任担当，紧扣题目）。对于标题，有表层含义和深层含义（引申含义），在文中应该充分体现。\n我需要你先告诉我你对于标题的解读，两层含义分别是什么，以及能对应什么具体事物。然后给我一份提纲，提纲包括：具体的开头段落，三个层次的事件主旨点题句及具体的事件，具体的结尾段落。\n标题是《xxxx》，材料为 [xxxx]。",
  "desc_cn": "我需要你写作文，文体为记叙文，800 字左右。文章分为开头，三个层次，结尾。开头，结尾，以及每个层次都需要紧扣题目，题目要贯穿全文，每个层次都要一件单独的事情。第一层次要关于具体的技巧性描写（细节动作描写，艺术美，初次尝试的喜悦，紧扣题目）；第二层次要有一点创新的内容（细节动作描写，创新的想法，创新后体会到的深层道理，紧扣题目）；第三层次要关于深层内容（文化传承/自我价值/责任担当，紧扣题目）。对于标题，有表层含义和深层含义（引申含义），在文中应该充分体现。\n我需要你先告诉我你对于标题的解读，两层含义分别是什么，以及能对应什么具体事物。然后给我一份提纲，提纲包括：具体的开头段落，三个层次的事件主旨点题句及具体的事件，具体的结尾段落。\n标题是《xxxx》，材料为 [xxxx]。",
  "remark": "在执行完这个 prompt 后，再输入「把这些转换成一篇作文」，查看文章效果是否更佳。来自 @Qizhen-Yang 的投稿。",
  "title_en": "High schoolers' essay",
  "desc_en": "Please write a narrative essay of about 800 words. The essay should have an introduction, three distinct sections, and a conclusion. Each section should focus on a single event related to the main theme, which should be present throughout the essay. \n\n1. For the first section, focus on detailed descriptions of a specific skill or technique, including its artistic beauty and the joy of trying it for the first time.\n2. In the second section, describe an innovative idea or concept, including details of its implementation and the deeper insights gained from the innovation.\n3. The third section should revolve around a deeper aspect, such as cultural heritage, self-worth, or responsibility.\n\nBefore starting the essay, please share your interpretation of the title, including its surface and deeper meanings, and how they can be related to specific events or objects. Then, provide an outline of the essay, including the introduction, the main points and events for each of the three sections, and the conclusion.The title of the essay is [XXX], and the material is [YYY].",
  "remark_en": "The article produced by this prompt reflects the writing style of Chinese middle school students. Contributed by @Qizhen-Yang.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 200,
  "weight": 1153
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
