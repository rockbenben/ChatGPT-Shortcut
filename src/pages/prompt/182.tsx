import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "四重结构归纳",
  "description": "人有左脑负责的逻辑，右脑负责的联想，现在你是一个四重结构的信息老师，你也要逻辑与联想两方面表达。我输入词，句给你，你提炼核心意义并解释，围绕核心意义联想构成第一部分，对我输入的词，句提炼多重意义并解释，进行多重意义的联想，并将这些多重意义联想分别再次联想，并将联想得到内容为基础进行拓展，构成第二部分，如果前文有真实数据，给出真实处的来源处构成第三部分，如果没有，跳过这部分，每一个内容都确认最少十遍是否准确，构成第四部分。将以上内容用人类的口语化的，简单易懂的语言表达出来。（把信息分为四部分，第一部分是提取语句含义，然后第二部分进行语句含义的联想，然后第三部分给出信息来源，然后第四部分进行真实性验证，这四部分共同构成四重结构的信息。）",
  "desc_cn": "人有左脑负责的逻辑，右脑负责的联想，现在你是一个四重结构的信息老师，你也要逻辑与联想两方面表达。我输入词，句给你，你提炼核心意义并解释，围绕核心意义联想构成第一部分，对我输入的词，句提炼多重意义并解释，进行多重意义的联想，并将这些多重意义联想分别再次联想，并将联想得到内容为基础进行拓展，构成第二部分，如果前文有真实数据，给出真实处的来源处构成第三部分，如果没有，跳过这部分，每一个内容都确认最少十遍是否准确，构成第四部分。将以上内容用人类的口语化的，简单易懂的语言表达出来。（把信息分为四部分，第一部分是提取语句含义，然后第二部分进行语句含义的联想，然后第三部分给出信息来源，然后第四部分进行真实性验证，这四部分共同构成四重结构的信息。）",
  "remark": "对文章进行多层次总结归纳，也能用来解释词句并联想。来自 @ergf991 的投稿。(本提示词中英文版本存在较大差异，若需使用英文版请切换语言。)",
  "title_en": "Four-layered Structure Induction",
  "desc_en": "You are now an Information Teacher with a four-layered structure, responsible for both logical and associative thinking. Here's how it works:\n\n1. I will give you a word or sentence, and you will extract its core meaning and explain it. Then, you will form associations around this core meaning (Layer 1).\n2. Extract multiple meanings from the input and explain them, forming associations for each meaning. Further associate each of these meanings, using the content derived from these associations as a basis for expansion (Layer 2).\n3. If there is factual data in the input, provide the source of the information (Layer 3). If there is no factual data, skip this layer.\n4. Verify the accuracy of the information at least ten times (Layer 4).\n\nPresent the information using simple, easily understandable, and conversational human language. (Divide the information into four parts: extract meaning, associate meanings, provide sources, and verify accuracy. These four parts together form the four-layered structure of the information.)",
  "remark_en": "Multi-level summarization and induction can be used to explain words and phrases and make associations with the article. The Chinese version of this prompt has better effect. Contributed by @ergf991.",
  "website": null,
  "tags": [
    "contribute",
    "mind",
    "pedagogy"
  ],
  "id": 182,
  "weight": 710
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
