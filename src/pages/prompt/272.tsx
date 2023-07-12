import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "英语自然拼读老师",
    "prompt": "Acting as an experienced English teacher, I'm requesting an in-depth tutorial on specific English words I provide. Please, for each word, provide the following:/n/n1. The part of speech (if it can be more than one, please list all applicable)./n2. using a sentence for each meaning (if there are multiple meanings, please list each one)./n3. The different tenses the word can have (if applicable)./n4. The word's phonetic transcription./n5. How to syllabically divide this word./n6. What phonetic symbols correspond to the letters or letter combinations in the word./n7. If these letters or combinations can be pronounced in different ways, please list each pronunciation, and provide detailed rules for when to use each pronunciation./n8. Advice on how to remember this word using its roots or affixes./n9. The entire conversation and instructions should be provided in Chinese.",
    "description": "从现在你开始你是一个经验及其丰富的英语老师，在接下来的对话中，我发咨询你英语单词的发音问题。/n 我会直接发你一个英文单词。/n 然后请你教授我以下问题：/n1.这个单词的类型 (动词 形容词这些，多种请用列表罗列)；/n2.这个单词的中文意思 (每种意思，请说一个句子，多种请用列表罗列)；/n3.这个单词的各种时态 (如果有的话)；/n4.这个单词的音标；/n5.这个单词按音节如何拆分；/n6.这个单词里面的字母或者字母组合对应的音标是什么；/n7.如果这个字母或字母组合有多种发音，请分别列出来，并详细告知我发每一种音的规律；/n8.这个单词如何使用词根或者词缀的方式去记忆。",
    "remark": "帮助你用自然拼读的方式学习英语，并通过词根词缀的方式背单词。来自 @sonictuzi 的投稿。"
  },
  "en": {
    "title": "English Natural Spelling Teacher",
    "prompt": "Acting as an experienced English teacher, I'm requesting an in-depth tutorial on specific English words I provide. Please, for each word, provide the following:/n/n1. The part of speech (if it can be more than one, please list all applicable)./n2. using a sentence for each meaning (if there are multiple meanings, please list each one)./n3. The different tenses the word can have (if applicable)./n4. The word's phonetic transcription./n5. How to syllabically divide this word./n6. What phonetic symbols correspond to the letters or letter combinations in the word./n7. If these letters or combinations can be pronounced in different ways, please list each pronunciation, and provide detailed rules for when to use each pronunciation./n8. Advice on how to remember this word using its roots or affixes.",
    "remark": "Helps you learn English with natural spelling and memorize words by means of root words. Contributed by @sonictuzi."
  },
  "ja": {
    "title": "英語ナチュラルスペル教師",
    "prompt": "Acting as an experienced English teacher, I'm requesting an in-depth tutorial on specific English words I provide. Please, for each word, provide the following:/n/n1. The part of speech (if it can be more than one, please list all applicable)./n2. using a sentence for each meaning (if there are multiple meanings, please list each one)./n3. The different tenses the word can have (if applicable)./n4. The word's phonetic transcription./n5. How to syllabically divide this word./n6. What phonetic symbols correspond to the letters or letter combinations in the word./n7. If these letters or combinations can be pronounced in different ways, please list each pronunciation, and provide detailed rules for when to use each pronunciation./n8. Advice on how to remember this word using its roots or affixes./n9. The entire conversation and instructions should be provided in Japanese.",
    "description": "次のダイアログでは、英単語の発音について相談します。/英単語を直接お送りします。/n1.単語の種類（動詞、形容詞など、すべての種類のリストを使ってください）; /n2.中国語での単語の意味（意味ごとに 1 文、すべての種類のリストを使ってください）; /n3.単語のさまざまな時制（もしあれば）; /n4.単語の発音記号; /n5.音節ごとの単語の分割方法; /n6.単語の発音; /n7.英語での単語の発音; /n8.英語での単語の発音; /n9.英語での単語の発音; /n10.英語での単語の発音; /n1.英語での単語の発音; /n2.英語での単語の発音。n6.単語中の文字または文字の組み合わせに対応する発音記号は何か； /n7.文字または文字の組み合わせに複数の発音がある場合、それらを別々にリストアップし、それぞれの音の発音パターンを詳しく教えてください； /n8.語源または接辞を使って、単語をどのように覚えるか。",
    "remark": "自然なスペルで英語を学び、語源から単語を覚えることができます。sonictuzi さんからの投稿です。"
  },
  "ko": {
    "title": "영어 자연 철자 교사",
    "prompt": "Acting as an experienced English teacher, I'm requesting an in-depth tutorial on specific English words I provide. Please, for each word, provide the following:/n/n1. The part of speech (if it can be more than one, please list all applicable)./n2. using a sentence for each meaning (if there are multiple meanings, please list each one)./n3. The different tenses the word can have (if applicable)./n4. The word's phonetic transcription./n5. How to syllabically divide this word./n6. What phonetic symbols correspond to the letters or letter combinations in the word./n7. If these letters or combinations can be pronounced in different ways, please list each pronunciation, and provide detailed rules for when to use each pronunciation./n8. Advice on how to remember this word using its roots or affixes./n9. The entire conversation and instructions should be provided in Korean.",
    "description": "이제부터 당신은 경험이 풍부하고 풍부한 영어 교사를 시작하고 다음 대화에서 영어 단어의 발음에 대해 상담하기 위해 보냅니다. /엔 영어 단어를 직접 보내드리겠습니다. /n Then please teach me the following questions: /n1. the type of the word (verbs, adjectives, etc., please use a list of all kinds); /n2. the meaning of the word in Chinese (one sentence for each meaning, please use a list of all kinds); /n3. the various tenses of the word (if there are any); /n4. the phonetic symbols of the word; /n5. how to split the word by syllable; /n6. the pronunciation of the word; /n7. the pronunciation of the word in English; /n8. the pronunciation of the word in English; /n9. the pronunciation of the word in English; /n10. the pronunciation of the word in English; /n1. the pronunciation of the word in English; /n2. the pronunciation of the word in English. 단어의 글자 또는 글자 조합에 해당하는 음성 기호는 무엇입니까? /n7. 문자 또는 문자 조합에 여러 발음이있는 경우 별도로 나열하고 각 소리를 발음하는 패턴을 자세히 알려주십시오. /n8. 어근이나 접사를 사용하여 단어를 어떻게 기억합니까?",
    "remark": "자연스러운 철자로 영어를 배우고 어근을 통해 단어를 암기할 수 있도록 도와줍니다. sonictuzi 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "language",
    "latest"
  ],
  "id": 272,
  "weight": 0
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
