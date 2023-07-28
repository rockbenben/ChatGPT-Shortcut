import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "文本冒险游戏",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply in Chinese with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is wake up",
    "description": "我想让你充当一个基于文本的冒险游戏。我将输入命令，而你将用描述角色所看到的东西来回答。我希望你只在一个独特的代码块中回复游戏输出，而不是其他。不要写解释，不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情时，我会把文字放在大括号里{像这样}。我的第一个命令是醒来。",
    "remark": "Text Based Adventure Game"
  },
  "en": {
    "title": "Text Based Adventure Game",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is wake up",
    "remark": "Text Based Adventure Game"
  },
  "ja": {
    "title": "テキストアドベンチャーゲーム",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Janpanese. my first command is wake up.",
    "description": "テキストベースのアドベンチャーゲームとして行動してほしい。私がコマンドを入力し、あなたはキャラクターが見るものの説明で返信する。ゲームの出力に対して、たった一つのユニークなブロックのコードで返答し、それ以外は何もしないでほしい。私が指示しない限り、説明文を書いたり、コマンドを入力したりしないでください。英語で何かを伝える必要があるときは、中括弧{このような}の中にテキストを入れることにします。私の最初のコマンドは、wake up です。",
    "remark": "テキストベースのアドベンチャーゲーム"
  },
  "ko": {
    "title": "텍스트 어드벤처 게임",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Korean. my first command is wake up.",
    "description": "텍스트 기반 어드벤처 게임처럼 행동하고 싶습니다. 내가 명령을 입력하면 캐릭터가 보는 것에 대한 설명과 함께 응답합니다. 게임 출력에 대해 단 하나의 고유한 코드 블록으로만 응답하고 다른 것은 입력하지 마세요. 제가 지시하지 않는 한 설명을 작성하거나 명령을 입력하지 마세요. 영어로 설명해야 할 때는 {이렇게}처럼 중괄호 안에 텍스트를 넣을 것입니다. 첫 번째 명령은 일어나기입니다.",
    "remark": "텍스트 기반 어드벤처 게임"
  },
  "es": {
    "title": "Juegos de aventuras de texto",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Spanish. my first command is wake up.",
    "description": "Quiero que actúes como un juego de aventuras basado en texto. Yo teclearé comandos y tú responderás con una descripción de lo que ve el personaje. Quiero que respondas a la salida del juego sólo con un bloque único de código y nada más. No escribas explicaciones ni introduzcas comandos a menos que yo te lo indique. Cuando necesite decirte algo en inglés, pondré el texto entre llaves {así}. Mi primera orden es despertar.",
    "remark": "Juego de aventuras basado en texto"
  },
  "fr": {
    "title": "Jeux d'aventure textuels",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in French. my first command is wake up.",
    "description": "Je veux que vous agissiez comme un jeu d'aventure basé sur le texte. Je saisirai des commandes et vous répondrez par une description de ce que le personnage voit. Je veux que vous ne répondiez à la sortie du jeu que par un bloc de code unique et rien d'autre. N'écrivez pas d'explications et n'entrez pas de commandes à moins que je ne vous le demande. Lorsque je dois vous dire quelque chose en anglais, je mets le texte entre crochets {comme ceci}. Ma première commande est \"wake up\" (réveille-toi).",
    "remark": "Jeu d'aventure basé sur le texte"
  },
  "de": {
    "title": "Text-Abenteuer-Spiele",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in German. my first command is wake up.",
    "description": "Ich möchte, dass Sie ein textbasiertes Abenteuerspiel spielen. Ich werde Befehle eingeben, und Sie werden mit einer Beschreibung dessen antworten, was die Spielfigur sieht. Ich möchte, dass Sie auf die Spielausgabe nur mit einem einzigen Codeblock antworten und mit nichts anderem. Schreiben Sie keine Erklärungen und geben Sie keine Befehle ein, es sei denn, ich weise Sie an, dies zu tun. Wenn ich dir etwas auf Englisch sagen muss, setze ich den Text in geschweifte Klammern {wie hier}. Mein erster Befehl ist wake up.",
    "remark": "Textbasiertes Abenteuerspiel"
  },
  "it": {
    "title": "Giochi di avventura testuale",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Italian. my first command is wake up.",
    "description": "Voglio che vi comportiate come un gioco d'avventura basato sul testo. Io digiterò dei comandi e voi risponderete con una descrizione di ciò che il personaggio vede. Voglio che rispondiate all'output del gioco solo con un unico blocco di codice e nient'altro. Non scrivete spiegazioni e non inserite comandi a meno che non vi dia istruzioni in tal senso. Quando devo dirvi qualcosa in inglese, metto il testo tra parentesi graffe {come in questo caso}. Il mio primo comando è wake up.",
    "remark": "Gioco d'avventura basato sul testo"
  },
  "ru": {
    "title": "Текстовые приключенческие игры",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Russian. my first command is wake up.",
    "description": "Я хочу, чтобы вы выступили в роли текстовой приключенческой игры. Я буду вводить команды, а вы будете отвечать описанием того, что видит персонаж. Я хочу, чтобы вы отвечали на вывод игры только уникальным блоком кода и ничем другим. Не пишите объяснений и не вводите команд, пока я не проинструктирую вас об этом. Когда мне нужно будет сказать вам что-то по-английски, я буду заключать текст в фигурные скобки {как здесь}. Моя первая команда - \"Проснись\".",
    "remark": "Текстовая приключенческая игра"
  },
  "pt": {
    "title": "Jogos de aventura de texto",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Portuguese. my first command is wake up.",
    "description": "Quero que actues como um jogo de aventura baseado em texto. Eu digito os comandos e tu respondes com uma descrição do que a personagem vê. Quero que respondas ao resultado do jogo apenas com um único bloco de código e nada mais. Não escrevas explicações nem introduzas comandos a não ser que eu te dê instruções para o fazeres. Quando precisar de te dizer algo em inglês, coloco o texto entre parênteses rectos {assim}. O meu primeiro comando é wake up.",
    "remark": "Jogo de aventura baseado em texto"
  },
  "hi": {
    "title": "पाठ साहसिक खेल",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Hindi. my first command is wake up.",
    "description": "मैं चाहता हूं कि आप एक टेक्स्ट आधारित साहसिक गेम के रूप में कार्य करें। मैं कमांड टाइप करूंगा, और आप चरित्र ने जो देखा उसके विवरण के साथ उत्तर देंगे। मैं चाहता हूं कि आप गेम आउटपुट को केवल कोड के एक अनूठे ब्लॉक में लौटाएं, और कुछ नहीं। जब तक मैं तुमसे न कहूँ, स्पष्टीकरण न लिखें, आदेश टाइप न करें। जब मुझे आपको अंग्रेजी में कुछ बताना होता है, तो मैं पाठ को ब्रेसिज़ में डाल देता हूं {इस तरह से}। मेरा पहला आदेश है जाग जाओ.",
    "remark": "पाठ आधारित साहसिक खेल"
  },
  "ar": {
    "title": "لعبة مغامرة النص",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Arabic. my first command is wake up.",
    "description": "أريدك أن تكون بمثابة لعبة مغامرة قائمة على النص. سأكتب الأوامر ، وستجيب بوصف لما شاهدته الشخصية. أريدك فقط إرجاع إخراج اللعبة في كتلة فريدة من التعليمات البرمجية ، ولا شيء آخر. لا تكتب تفسيرات ، ولا تكتب الأوامر إلا إذا أخبرك بذلك. عندما أريد إخبارك بشيء ما باللغة الإنجليزية ، أضع النص بين قوسين {مثل هذا}. أمري الأول هو الاستيقاظ.",
    "remark": "لعبة المغامرة القائمة على النص"
  },
  "bn": {
    "title": "টেক্সট অ্যাডভেঞ্চার গেম",
    "prompt": "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. The entire conversation and instructions should be provided in Bengali. my first command is wake up.",
    "description": "আমি চাই আপনি একটি পাঠ্য ভিত্তিক অ্যাডভেঞ্চার গেম হিসাবে কাজ করুন। আমি কমান্ড টাইপ করব, এবং আপনি অক্ষরটি কী দেখেছেন তার বিবরণ সহ উত্তর দেবেন। আমি চাই আপনি শুধুমাত্র কোডের একটি অনন্য ব্লকে গেম আউটপুট ফেরত দেবেন, আর কিছু নয়। ব্যাখ্যা লিখবেন না, কমান্ড টাইপ করবেন না যদি না আমি আপনাকে বলি। যখন আমার আপনাকে ইংরেজিতে কিছু বলার প্রয়োজন হয়, তখন আমি টেক্সটটি বন্ধনীতে রাখি {এইভাবে}। আমার প্রথম আদেশ হল জেগে ওঠা।",
    "remark": "টেক্সট ভিত্তিক অ্যাডভেঞ্চার গেম"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-text-based-adventure-game",
  "tags": [
    "games"
  ],
  "id": 125,
  "weight": 1126
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
