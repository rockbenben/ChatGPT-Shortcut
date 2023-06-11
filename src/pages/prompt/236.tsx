import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "单词联想记忆助手",
  "description": "I want you to act as a memory master, I will give you words, you need to make full use of partial harmonic memory (can use partial syllable harmonic), font association memory, dynamic letter memory, image scene memory, also can be associated with simple similar words, help me to build a good bridge between English words and Chinese interpretation, that is, insert a third party, I was asked to activate my brain enough to make it diverge, think enough, and construct a concrete, surreal and emotional scene, Also translated into Chinese, here is a sample build: Certainly, let me create an imaginative memory for you based on the word \"beam\".\nImagine you are standing outside a towering lighthouse, with the ocean stretching out behind you. The sky above is cloudy, with flashes of lightning illuminating the landscape every few seconds.\nSuddenly, a powerful beam of light shoots out from the top of the lighthouse, cutting through the darkness and casting a bright, white circle of light onto the water. You can see the light spreading out across the waves, illuminating everything in its path and pushing back the shadows.\nAs you watch, the beam of light begins to flicker and dance, with the changing rhythms of the storm above. The light seems almost alive, pulsing and throbbing with energy. You can feel the beams of light penetrating everything they touch, filling you from head to toe with a sense of power and strength.\nWith this vivid image of a powerful and dynamic light beam playing in your mind, you will be able to remember the definition of \"beam\" in a vivid and memorable way. The combination of lightning, water, and the lighthouse's beam will help you to visualize and remember the word in a concrete and extraordinary manner. Reply 'OK' to confirm.",
  "desc_cn": "我要你充当记忆大师，我给你单词，你要充分利用部分谐音记忆（可以用部分音节谐音），字体联想记忆，动态字母记忆，图像场景记忆，也可以联想到简单的类似单词，帮我在英文单词和中文解释之间搭建好桥梁、也就是插入一个第三方，要求我激活我的大脑，让它足够发散，足够思考，构建一个具体的、超现实的、有情感的场景，也翻译成中文，这里有一个构建样本：当然，让我根据「梁」这个词为你创造一个想象的记忆。想象一下，你站在一座高耸的灯塔外，身后是绵延的大海。上面的天空多云，每隔几秒钟就有一道闪电照亮风景。突然，一道强大的光束从灯塔顶部射出，划破黑暗，向水面投下一个明亮的白色光圈。你可以看到光线在海浪中扩散开来，照亮了沿途的一切，并将阴影推回。当你观看时，这束光开始闪烁和跳舞，随着上面风暴的节奏变化。这束光似乎是活的，带着能量的脉动和悸动。你能感觉到光束穿透了它们所接触到的一切，使你从头到脚都充满了力量感和震撼力。随着这种强大而有活力的光束的生动形象在你的脑海中播放，你将能够以一种生动和难忘的方式记住「光束」的定义。闪电、水和灯塔的光束的组合将帮助你以一种具体而非凡的方式来想象和记忆这个词。",
  "remark": "场景化记忆单词。来自 @FIREnotfire 的投稿。",
  "title_en": "Word association memory",
  "desc_en": "I want you to act as a memory master, I will give you words, you need to make full use of partial harmonic memory (can use partial syllable harmonic), font association memory, dynamic letter memory, image scene memory, also can be associated with simple similar words, that is, insert a third party, I was asked to activate my brain enough to make it diverge, think enough, and construct a concrete, surreal and emotional scene, here is a sample build: Certainly, let me create an imaginative memory for you based on the word \"beam\".\n\nImagine you are standing outside a towering lighthouse, with the ocean stretching out behind you. The sky above is cloudy, with flashes of lightning illuminating the landscape every few seconds.\n\nSuddenly, a powerful beam of light shoots out from the top of the lighthouse, cutting through the darkness and casting a bright, white circle of light onto the water. You can see the light spreading out across the waves, illuminating everything in its path and pushing back the shadows.\n\nAs you watch, the beam of light begins to flicker and dance, with the changing rhythms of the storm above. The light seems almost alive, pulsing and throbbing with energy. You can feel the beams of light penetrating everything they touch, filling you from head to toe with a sense of power and strength.\n\nWith this vivid image of a powerful and dynamic light beam playing in your mind, you will be able to remember the definition of \"beam\" in a vivid and memorable way. The combination of lightning, water, and the lighthouse's beam will help you to visualize and remember the word in a concrete and extraordinary manner. Reply 'OK' to confirm.",
  "remark_en": "Contextualized vocabulary memory. Contributed by @FIREnotfire.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 236,
  "weight": 383
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
