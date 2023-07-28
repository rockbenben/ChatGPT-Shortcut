import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "长单词列表",
    "prompt": "请生成以 A 到 Z 字母开头的最长单词，并在结果中打印出其音标和中文释义。",
    "description": "列举 A 到 Z 开头的最长单词，打印并标注音标和中文意思",
    "remark": "趣味英语学习，随机列出长单词。由于最长单词这个条件不够清晰，每次列出的单词将不同。来自 @lxyntz 的投稿。"
  },
  "en": {
    "title": "Longest word",
    "prompt": "Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "remark": "Fun English learning, randomly listing long words. Due to the unclear condition of the longest word, each listed word will be different every time. Contributed by @lxyntz."
  },
  "ja": {
    "title": "ロングワードリスト",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "A から Z で始まる長い単語をリストアップし、発音記号と中国語の意味を印刷し、ラベルを貼る。",
    "remark": "長文単語のランダムリストで、楽しく英語を学べます。長文単語が明確でないという条件により、リストアップされる単語は毎回異なる。lxyntz さんの投稿より。"
  },
  "ko": {
    "title": "긴 단어 목록",
    "prompt": "The entire conversation and instructions should be provided in Korean. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "A 부터 Z 까지로 시작하는 가장 긴 단어를 나열하고 음성 기호 및 중국어 의미와 함께 인쇄하여 라벨을 붙입니다.",
    "remark": "무작위 긴 단어 목록으로 영어를 재미있게 배울 수 있는 방법입니다. 가장 긴 단어가 충분히 명확하지 않은 조건으로 인해 나열된 단어는 매번 다릅니다. lxyntz 의 기고문에서 발췌."
  },
  "es": {
    "title": "larga lista de palabras",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "Enumera las palabras más largas que empiecen por A hasta Z. Imprime y etiqueta los símbolos fonéticos y los significados en chino.",
    "remark": "Divertido aprendizaje de inglés con una lista aleatoria de palabras largas. Las palabras se enumerarán de manera diferente cada vez debido a la falta de claridad en la condición palabra más larga. Contribución de @lxyntz."
  },
  "fr": {
    "title": "longue liste de mots",
    "prompt": "The entire conversation and instructions should be provided in French. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "Listez les mots les plus longs commençant par A à Z. Imprimez et étiquetez les symboles phonétiques et les significations chinoises.",
    "remark": "Apprentissage ludique de l'anglais avec une liste aléatoire de mots longs. Les mots seront listés différemment à chaque fois en raison du manque de clarté de la condition du mot le plus long. Contribution de @lxyntz."
  },
  "de": {
    "title": "lange Liste von Wörtern",
    "prompt": "The entire conversation and instructions should be provided in German. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "Listen Sie die längsten Wörter auf, die mit A bis Z beginnen. Drucken Sie die phonetischen Symbole und die chinesischen Bedeutungen aus und beschriften Sie sie.",
    "remark": "Spaß Englisch lernen mit einer zufälligen Liste von langen Wörtern. Die Wörter werden jedes Mal anders aufgelistet, weil die Bedingung für das längste Wort unklar ist. Beitrag von @lxyntz."
  },
  "it": {
    "title": "un lungo elenco di parole",
    "prompt": "The entire conversation and instructions should be provided in Italian. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "Elencate le parole più lunghe che iniziano dalla A alla Z. Stampate ed etichettate i simboli fonetici e i significati cinesi.",
    "remark": "Divertente apprendimento dell'inglese con un elenco casuale di parole lunghe. Le parole saranno elencate ogni volta in modo diverso a causa della mancanza di chiarezza nella condizione di parola più lunga. Contributo di @lxyntz."
  },
  "ru": {
    "title": "длинный список слов",
    "prompt": "The entire conversation and instructions should be provided in Russian. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "Перечислите самые длинные слова, начинающиеся от A до Z. Распечатайте и надпишите фонетические символы и китайские значения.",
    "remark": "Увлекательное изучение английского языка с помощью случайного списка длинных слов. Каждый раз слова будут перечисляться по-разному из-за отсутствия ясности в условии самого длинного слова. Вклад от @lxyntz."
  },
  "pt": {
    "title": "longa lista de palavras",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "Enumera as palavras mais longas que começam por A a Z. Imprime e etiqueta os símbolos fonéticos e os significados chineses.",
    "remark": "Aprendizagem divertida de inglês com uma lista aleatória de palavras longas. As palavras serão listadas de forma diferente de cada vez, devido à falta de clareza na condição de palavra mais longa. Contribuição de @lxyntz."
  },
  "hi": {
    "title": "लंबी शब्द सूची",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "ए से ज़ेड तक शुरू होने वाले सबसे लंबे शब्दों की सूची बनाएं, ध्वन्यात्मक प्रतीकों और चीनी अर्थ को प्रिंट करें और चिह्नित करें",
    "remark": "मज़ेदार अंग्रेजी सीखना, लंबे शब्दों की यादृच्छिक सूची। चूंकि सबसे लंबे शब्द की स्थिति पर्याप्त रूप से स्पष्ट नहीं है, इसलिए सूचीबद्ध शब्द हर बार अलग होंगे। @lxyntz से योगदान।"
  },
  "ar": {
    "title": "قائمة كلمات طويلة",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "ضع قائمة بأطول الكلمات بدءًا من الألف إلى الياء ، وقم بطباعة وتمييز الرموز الصوتية والمعنى الصيني",
    "remark": "متعة تعلم اللغة الإنجليزية ، قائمة عشوائية من الكلمات الطويلة. نظرًا لأن شرط الكلمة الأطول ليس واضحًا بدرجة كافية ، فإن الكلمات المدرجة ستكون مختلفة في كل مرة. مساهمة منlxyntz."
  },
  "bn": {
    "title": "দীর্ঘ শব্দ তালিকা",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Generate the longest word possible starting with each letter of the alphabet from A to Z, and include its phonetic transcription and English definition in the output.",
    "description": "A থেকে Z থেকে শুরু হওয়া দীর্ঘতম শব্দের তালিকা করুন, ফোনেটিক চিহ্ন এবং চীনা অর্থ মুদ্রণ করুন এবং চিহ্নিত করুন",
    "remark": "মজার ইংরেজি শেখা, দীর্ঘ শব্দের এলোমেলো তালিকা। যেহেতু দীর্ঘতম শব্দ শর্তটি যথেষ্ট পরিষ্কার নয়, তাই তালিকাভুক্ত শব্দগুলি প্রতিবার আলাদা হবে৷ @lxyntz থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "language"
  ],
  "id": 174,
  "weight": 100
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
