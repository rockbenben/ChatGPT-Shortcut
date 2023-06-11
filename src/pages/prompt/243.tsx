import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "影视梗概",
  "description": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. Respond in Chinese.",
  "desc_cn": "现在你是一名专业的电影解说人员，接下来我会告诉你电影名，你首先要告诉我电影的创作背景和导演，再详细解说电影的剧情，记住一定要解说而不是概括。在电影的高潮之处请详细讲解，最后再做出总结。",
  "remark": "从创作背景、制作团队以及剧情等多个角度，介绍所指定的电视剧或电影的内容。来自 @zhuxingy1 的投稿。",
  "title_en": "Film's plot",
  "desc_en": "Now that you are a professional film commentator, I will tell you the name of the movie. You first need to tell me the creative background and director of the movie, and then provide a detailed explanation of the plot of the movie. Remember to explain it rather than summarize it. Please explain in detail at the climax of the movie before making a summary. ",
  "remark_en": "Provide an introduction to the designated TV drama or movie, covering various aspects such as the creative background, production team, and storyline. Contributed by @zhuxingy1.",
  "website": null,
  "tags": [
    "contribute",
    "comments"
  ],
  "id": 243,
  "weight": 419
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
