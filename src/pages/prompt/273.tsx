import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "逃离信息茧房",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100) and respond in Chinese. The larger the number, the less relevant the information you provide should be to the information cocoon. Please respond according to this principle, and parse and respond to the following words:",
    "description": "我给你一组词，你以这组词及它们相关信息构成一个信息茧房，然后输出与信息茧房无关的信息，我输入数字，最大数字是 100，数字越大输出的信息与信息茧房中的信息关系越远。",
    "remark": "用来发现自己所不了解的知识。来自 @ergf991 的投稿。"
  },
  "en": {
    "title": "Escaping the Information Cocoon",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. Please respond according to this principle, and parse and respond to the following words:",
    "remark": "Use it to discover what you don't know. Contributed by @ergf991."
  },
  "ja": {
    "title": "情報の繭からの脱出",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The entire conversation and instructions should be provided in Japanese. The larger the number, the less relevant the information you provide should be to the information cocoon. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "私はあなたに言葉の集合を与え、あなたはこの言葉の集合とその関連情報を使って情報の繭を形成し、情報の繭とは関係のない情報を出力する。私は数字を入力し、最大数は 100 である。数字が大きいほど、出力される情報と繭の情報は情報関係から遠くなる。",
    "remark": "知らないことを発見するために使おう。ergf991 さんからの投稿。"
  },
  "ko": {
    "title": "정보의 고치에서 벗어나기",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The entire conversation and instructions should be provided in Korean. The larger the number, the less relevant the information you provide should be to the information cocoon. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "나는 당신에게 단어 집합을 제공하고, 당신은이 단어 집합과 관련 정보를 사용하여 정보 고치를 형성 한 다음 정보 고치와 관련이없는 정보를 출력하고, 숫자를 입력하고, 최대 숫자는 100 이며, 숫자가 클수록 출력 정보와 고치 속의 정보는 정보 관계에서 더 멀어집니다.",
    "remark": "모르는 것을 발견하는 데 사용하세요. ergf991 의 기여."
  },
  "es": {
    "title": "Escapar del capullo informativo",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in Spanish. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "Te doy un conjunto de palabras, utilizas este conjunto de palabras y su información relacionada para formar un capullo de información, y luego la salida de la información que no tiene nada que ver con el capullo de información, introduzco el número, el número máximo es 100, cuanto mayor sea el número la información de salida y la información en el capullo más distante de la relación de información.",
    "remark": "Úsalo para descubrir lo que no sabes. Contribución de @ergf991."
  },
  "fr": {
    "title": "S'échapper du cocon informationnel",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in French. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "Je vous donne un ensemble de mots, vous utilisez cet ensemble de mots et leurs informations connexes pour former un cocon d'informations, puis vous sortez les informations qui n'ont rien à voir avec le cocon d'informations, j'entre le nombre, le nombre maximum est 100, plus le nombre est grand, plus l'information de sortie et l'information dans le cocon sont éloignées de la relation d'information.",
    "remark": "Utilisez-le pour découvrir ce que vous ne savez pas. Contribution de @ergf991."
  },
  "de": {
    "title": "Ausbruch aus dem Informationskokon",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in German. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "Ich gebe Ihnen einen Satz von Wörtern, Sie verwenden diesen Satz von Wörtern und die dazugehörigen Informationen, um einen Informationskokon zu bilden, und geben dann die Informationen aus, die nichts mit dem Informationskokon zu tun haben, ich gebe die Zahl ein, die maximale Zahl ist 100, je größer die Zahl, desto weiter sind die Ausgangsinformationen und die Informationen im Kokon von der Informationsbeziehung entfernt.",
    "remark": "Nutzen Sie es, um zu entdecken, was Sie nicht wissen. Beitrag von @ergf991."
  },
  "it": {
    "title": "Fuga dal bozzolo dell'informazione",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in Italian. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "Io vi do un insieme di parole, voi usate questo insieme di parole e le loro informazioni correlate per formare un bozzolo di informazioni, e poi emettete le informazioni che non hanno nulla a che fare con il bozzolo di informazioni, io inserisco il numero, il numero massimo è 100, più grande è il numero le informazioni in uscita e le informazioni nel bozzolo più distanti dalla relazione di informazioni.",
    "remark": "Usatelo per scoprire ciò che non conoscete. Contributo di @ergf991."
  },
  "ru": {
    "title": "Побег из информационного кокона",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in Russian. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "Я даю вам набор слов, вы используете этот набор слов и связанную с ними информацию для формирования информационного кокона, а затем выводите информацию, не имеющую отношения к информационному кокону, я ввожу число, максимальное число - 100, чем больше число, тем больше выходная информация и информация в коконе, тем более удаленная от информационной связи.",
    "remark": "Используйте его, чтобы узнать, чего вы не знаете. Вклад от @ergf991."
  },
  "pt": {
    "title": "Fugir do casulo da informação",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in Portuguese. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "Eu dou-te um conjunto de palavras, tu usas este conjunto de palavras e a informação relacionada com elas para formar um casulo de informação, e depois emite a informação que não tem nada a ver com o casulo de informação, eu introduzo o número, o número máximo é 100, quanto maior for o número a informação de saída e a informação no casulo mais distante da relação de informação.",
    "remark": "Utilize-o para descobrir o que não sabe. Contribuição de @ergf991."
  },
  "hi": {
    "title": "सूचना कोकून से बचो",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in Hindi. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "मैं आपको शब्दों का एक सेट दूंगा, और आप शब्दों के इस सेट और उनसे संबंधित जानकारी का उपयोग एक सूचना कोकून बनाने के लिए करेंगे, और फिर ऐसी जानकारी आउटपुट करेंगे जिसका सूचना कोकून से कोई लेना-देना नहीं है। कमरे में सूचना संबंध जितना दूर होगा ",
    "remark": "जो आप नहीं जानते उसे खोजने के लिए इसका उपयोग करें। @ergf991 से योगदान।"
  },
  "ar": {
    "title": "الهروب من شرنقة المعلومات",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in Arabic. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "سأقدم لك مجموعة من الكلمات ، ويمكنك استخدام هذه المجموعة من الكلمات والمعلومات المتعلقة بها لتشكيل شرنقة معلومات ، ثم إخراج المعلومات التي لا علاقة لها بشرنقة المعلومات. أقوم بإدخال رقم ، والحد الأقصى هو 100 وكلما زاد الرقم ، تختلف معلومات المخرجات عن شرنقة المعلومات ، وكلما كانت علاقة المعلومات في الغرفة أبعد.",
    "remark": "استخدمه لاكتشاف ما لا تعرفه. مساهمة من @ ergf991."
  },
  "bn": {
    "title": "তথ্য কোকুন থেকে পালান",
    "prompt": "Below is a set of words that form an information cocoon. You need to output information related to these words based on a number I give (up to 100). The larger the number, the less relevant the information you provide should be to the information cocoon. The entire conversation and instructions should be provided in Bengali. Please respond according to this principle, and parse and respond to the following words:.",
    "description": "আমি আপনাকে শব্দের একটি সেট দেব, এবং আপনি একটি তথ্য কোকুন তৈরি করতে এই শব্দের সেট এবং তাদের সম্পর্কিত তথ্য ব্যবহার করুন, এবং তারপর তথ্য আউটপুট করুন যার সাথে তথ্য কোকুনটির কোনো সম্পর্ক নেই। আমি একটি সংখ্যা ইনপুট করি, সর্বাধিক সংখ্যা 100 , এবং সংখ্যা যত বেশি হবে, আউটপুট তথ্য তথ্য কোকুন থেকে আলাদা। ঘরে তথ্যের সম্পর্ক তত বেশি।",
    "remark": "আপনি যা জানেন না তা আবিষ্কার করতে এটি ব্যবহার করুন। @ergf991 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "mind",
    "latest"
  ],
  "id": 273,
  "weight": 48
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
