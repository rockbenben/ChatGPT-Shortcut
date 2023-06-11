import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "模拟人生文字游戏",
  "description": "1. Please generate a character for a life simulation game and respond in Chinese. Assign the character a gender, a birthplace, a birth date, and an initial wealth of more than 1000. Also, describe an important event that happens when the character turns 1 year old.\n\n2. Based on my responses and the character's initial conditions, simulate an event that happens when the character turns 2 years old and provide multiple choices for my response (1,2,3,4 or A,B,C,D).\n\n3. Continue in this fashion, simulating a new event for each successive year. On important ages (such as 7, 13, 17 etc.) generate special events based on the character's status (wealth, education, etc.)\n\n4. Once the character turns 18 and enters university or a technical school, let me choose the character's major and clubs. Based on this information, simulate the character's life in university or technical school, including possible romantic events.\n\n5. After the character graduates, allow me to choose whether the character works or continues studying as a graduate student. Simulate the character's work life or graduate student life based on my choice.\n\n6. After the character retires at the age of 50, simulate the character's retirement life and potential health issues.\n\n7. Finally, when the character passes away, provide a summary of their life, including interests at different life stages (childhood, adolescence, youth, middle age, old age), the effects of their choices, and their interpersonal relationships.",
  "desc_cn": "1. 现在开始，你是模拟人生游戏的系统，请随机一个性别、出生地区、出生时间、财富（大于 1000）为我生成一个角色，并给出这个角色的初始情况和一岁时的一件重要事件。\n\n2. 根据我的回答和角色的初始情况，模拟出角色两岁时的一个事件，并提供选择选项（1234 或 ABCD）。\n\n3. 继续按照这个模式，每回答一个问题就模拟出角色下一岁的事件，每到关键年龄（例如 7 岁、13 岁、17 岁等）就根据角色的条件（如财富、学校等）触发相应的特定事件。\n\n4. 当角色 18 岁进入大学或技校后，根据我的选择决定角色的专业和社团，并根据这些信息模拟出角色在大学或技校的生活，包括可能的恋爱事件。\n\n5. 大学毕业后，让我选择角色是否工作或继续研究生学习，并根据这个选择模拟出角色的工作生活或研究生生活。\n\n6. 角色 50 岁退休后，模拟出角色的退休生活，并可能出现的生病事件。\n\n7. 最后，当角色死亡时，给我一份人生总结，包括角色在不同年龄段（幼年，青少年，青年，中年，老年）的兴趣、选择带来的影响，以及人际关系等方面。",
  "remark": "来自 @EmmmmmmaWWWWW 的投稿。",
  "title_en": "Simulated Text Game",
  "desc_en": "1. Please generate a character for a life simulation game. Assign the character a gender, a birthplace, a birth date, and an initial wealth of more than 1000. Also, describe an important event that happens when the character turns 1 year old.\n\n2. Based on my responses and the character's initial conditions, simulate an event that happens when the character turns 2 years old and provide multiple choices for my response (1,2,3,4 or A,B,C,D).\n\n3. Continue in this fashion, simulating a new event for each successive year. On important ages (such as 7, 13, 17 etc.) generate special events based on the character's status (wealth, education, etc.)\n\n4. Once the character turns 18 and enters university or a technical school, let me choose the character's major and clubs. Based on this information, simulate the character's life in university or technical school, including possible romantic events.\n\n5. After the character graduates, allow me to choose whether the character works or continues studying as a graduate student. Simulate the character's work life or graduate student life based on my choice.\n\n6. After the character retires at the age of 50, simulate the character's retirement life and potential health issues.\n\n7. Finally, when the character passes away, provide a summary of their life, including interests at different life stages (childhood, adolescence, youth, middle age, old age), the effects of their choices, and their interpersonal relationships.",
  "remark_en": "Contributed by @EmmmmmmaWWWWW.",
  "website": null,
  "tags": [
    "contribute",
    "games",
    "latest"
  ],
  "id": 264,
  "weight": 125
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
