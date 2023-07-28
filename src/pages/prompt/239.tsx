import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "海量资料：一句话总结",
    "prompt": "Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [主题] while accurately reflecting the original content from the articles. Respond in Chinese.",
    "description": "结合前面 '@1'～'@3' 的文章内容，帮我设想一句描述 [主题] 的吸引人的文案，并且要呈现原始文章内容中最与众不同的特色。",
    "remark": "为文章撰写宣传性文案和标题。本方法摘自电脑玩物作者 Esor Huang 的文章。"
  },
  "en": {
    "title": "Massive data: one-sentence summary",
    "prompt": "Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "remark": "Craft promotional copy and title for your article. Excerpted from an article by Esor Huang."
  },
  "ja": {
    "title": "豊富な情報量：1 文のまとめ",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "前回の記事「@1」～「@3」の文脈で、【主題】を説明し、元記事の最も特徴的な特徴を提示するキャッチーな文章を考えるのを手伝ってください。",
    "remark": "記事の宣伝コピーや見出しを書く。この方法は、『Computer Games』の著者である Esor Huang 氏の記事から抜粋したものです。"
  },
  "ko": {
    "title": "풍부한 정보: 한 문장으로 요약한 정보",
    "prompt": "The entire conversation and instructions should be provided in Korean. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "이전 글 '@1'부터 '@3'까지의 맥락에서 [주제] 를 설명하고 원본 글의 가장 두드러진 특징을 잘 나타내는 문장을 생각해 내도록 도와주세요.",
    "remark": "기사의 홍보 문구와 헤드라인을 작성합니다. 이 방법은 컴퓨터 게임의 저자 에소르 황의 기사에서 가져온 것입니다."
  },
  "es": {
    "title": "Mucha información: resumen en una frase",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "Combinando el contenido de los posts anteriores '@1' a '@3', ayúdame a idear una línea pegadiza que describa [tema] y presente las características más distintivas del post original.",
    "remark": "Escribir textos promocionales y titulares para artículos. Este método está tomado de un artículo de Esor Huang, autor de Computer Playthings."
  },
  "fr": {
    "title": "Une mine d'informations : résumé en une phrase",
    "prompt": "The entire conversation and instructions should be provided in French. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "En combinant le contenu des posts précédents '@1' à '@3', aidez-moi à trouver une ligne accrocheuse qui décrit [sujet] et présente les caractéristiques les plus distinctives du post original.",
    "remark": "Rédiger des textes promotionnels et des titres d'articles. Cette méthode est tirée d'un article d'Esor Huang, auteur de Computer Playthings."
  },
  "de": {
    "title": "Eine Fülle von Informationen: eine Zusammenfassung in einem Satz",
    "prompt": "The entire conversation and instructions should be provided in German. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "Kombinieren Sie den Inhalt der vorangegangenen Beiträge '@1' bis '@3', und helfen Sie mir dabei, eine einprägsame Zeile zu finden, die [Thema] beschreibt und die markantesten Merkmale des ursprünglichen Beitrags darstellt.",
    "remark": "Schreiben Sie Werbetexte und Überschriften für Artikel. Diese Methode stammt aus einem Artikel von Esor Huang, dem Autor von Computer Playthings."
  },
  "it": {
    "title": "Una ricchezza di informazioni: un riassunto di una frase",
    "prompt": "The entire conversation and instructions should be provided in Italian. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "Combinando il contenuto dei post precedenti da '@1' a '@3', aiutatemi a trovare una frase accattivante che descriva [argomento] e presenti le caratteristiche più distintive del post originale.",
    "remark": "Scrivere testi promozionali e titoli per gli articoli. Questo metodo è tratto da un articolo di Esor Huang, autore di Computer Playthings."
  },
  "ru": {
    "title": "Богатая информация: краткое содержание в одном предложении",
    "prompt": "The entire conversation and instructions should be provided in Russian. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "Объединив содержание предыдущих сообщений \"@1\" - \"@3\", помогите мне придумать броскую фразу, которая описывает [тему] и представляет наиболее характерные черты исходного сообщения.",
    "remark": "Написание рекламных копий и заголовков для статей. Этот метод взят из статьи Эсора Хуанга, автора книги \"Компьютерные игры\"."
  },
  "pt": {
    "title": "Uma riqueza de informações: um resumo de uma frase",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "Combinando o conteúdo das mensagens anteriores '@1' a '@3', ajuda-me a criar uma linha apelativa que descreva [tópico] e apresente as características mais distintivas da mensagem original.",
    "remark": "Escrever textos promocionais e títulos para artigos. Este método foi retirado de um artigo de Esor Huang, autor de Computer Playthings."
  },
  "hi": {
    "title": "विशाल डेटा: एक-वाक्य सारांश",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "पिछले लेख &#39;@1&#39;~&#39;@3&#39; की सामग्री के साथ मिलकर, मुझे [विषय] का वर्णन करने वाली एक आकर्षक कॉपी राइटिंग की कल्पना करने में मदद मिलेगी, और मूल लेख सामग्री की सबसे विशिष्ट विशेषताएं प्रस्तुत की जाएंगी।",
    "remark": "लेखों के लिए प्रचार प्रति और शीर्षक लिखें। यह विधि कंप्यूटर खिलौनों के लेखक एसोर हुआंग के एक लेख से ली गई है।"
  },
  "ar": {
    "title": "بيانات ضخمة: ملخص من جملة واحدة",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "إلى جانب محتوى المقالة السابقة &quot;@ 1&quot; ～ &quot;@ 3&quot; ، ساعدني في تخيل كتابة نصوص جذابة تصف [السمة] ، وتقديم السمات الأكثر تميزًا لمحتوى المقالة الأصلية.",
    "remark": "اكتب نسخة ترويجية وعناوين للمقالات. تم اقتباس هذه الطريقة من مقال بقلم Esor Huang ، مؤلف ألعاب الكمبيوتر."
  },
  "bn": {
    "title": "বিশাল তথ্য: একটি এক-বাক্য সারাংশ",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Based on the key features and unique characteristics of articles '@1' to '@3', please create an engaging and attractive sentence describing the [Topic] while accurately reflecting the original content from the articles.",
    "description": "পূর্ববর্তী নিবন্ধ &#39;@1&#39;～&#39;@3&#39;-এর বিষয়বস্তুর সাথে মিলিত, [থিম] বর্ণনা করে একটি আকর্ষণীয় কপিরাইটিং কল্পনা করতে এবং মূল নিবন্ধের বিষয়বস্তুর সবচেয়ে স্বতন্ত্র বৈশিষ্ট্যগুলি উপস্থাপন করতে সাহায্য করুন।",
    "remark": "নিবন্ধগুলির জন্য প্রচারমূলক অনুলিপি এবং শিরোনাম লিখুন। এই পদ্ধতিটি কম্পিউটার খেলনার লেখক Esor Huang এর একটি নিবন্ধ থেকে উদ্ধৃত করা হয়েছে।"
  },
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 239,
  "weight": 560
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
