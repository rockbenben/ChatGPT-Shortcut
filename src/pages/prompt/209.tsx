import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "小红书风格",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text and respond in Chinese. Please begin by editing the following text: 小红书内容",
    "description": "请使用 Emoji 风格编辑以下段落，该风格以引人入胜的标题、每个段落中包含表情符号和在末尾添加相关标签为特点。请确保保持原文的意思。",
    "remark": "将文本改写成类似小红书的 Emoji 风格。"
  },
  "en": {
    "title": "Emoji writing",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. Please begin by editing the following text: ",
    "remark": "Rewrite text using emoticon style."
  },
  "ja": {
    "title": "リトルレッドブックスタイル",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Janpanese. Please begin by editing the following text: ",
    "description": "以下の段落を、キャッチーな見出し、各段落に絵文字、最後に関連するタグを配置した「絵文字スタイル」で編集してください。原文の意味が保たれるようにお願いします。",
    "remark": "Little Red Book の Emoji スタイルに似せて文章を書き換える。"
  },
  "ko": {
    "title": "리틀 레드 북 스타일",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Korean. Please begin by editing the following text: ",
    "description": "눈에 띄는 제목, 각 단락의 이모티콘, 마지막에 관련 태그가 있는 이모티콘 스타일을 사용하여 다음 단락을 편집하세요. 원본 텍스트의 의미가 유지되는지 확인하세요.",
    "remark": "리틀 레드 북의 이모티콘 스타일과 비슷하도록 텍스트를 다시 작성합니다."
  },
  "es": {
    "title": "Pequeño Libro Rojo del Estilo",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Spanish. Please begin by editing the following text: ",
    "description": "Por favor, edite los siguientes párrafos utilizando el estilo Emoji, que se caracteriza por titulares atractivos, emojis en cada párrafo y etiquetas relevantes al final. Asegúrese de mantener el sentido del texto original.",
    "remark": "Reescribe el texto en un estilo Emoji similar al del Pequeño Libro Rojo."
  },
  "fr": {
    "title": "Le petit livre rouge du style",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in French. Please begin by editing the following text: ",
    "description": "Veuillez modifier les paragraphes suivants en utilisant le style Emoji, qui comprend des titres attrayants, des emojis dans chaque paragraphe et des balises pertinentes à la fin. Veillez à conserver le sens du texte original.",
    "remark": "Réécrivez le texte dans un style Emoji similaire à celui du Petit livre rouge."
  },
  "de": {
    "title": "Kleines Rotes Buch des Stils",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in German. Please begin by editing the following text: ",
    "description": "Bitte bearbeiten Sie die folgenden Absätze unter Verwendung des Emoji-Stils, der sich durch ansprechende Überschriften, Emojis in jedem Absatz und entsprechende Tags am Ende auszeichnet. Achten Sie bitte darauf, dass der Sinn des Originaltextes erhalten bleibt.",
    "remark": "Schreiben Sie den Text in einen Emoji-Stil um, der dem Little Red Book ähnelt."
  },
  "it": {
    "title": "Il Piccolo Libro Rosso dello Stile",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Italian. Please begin by editing the following text: ",
    "description": "Si prega di modificare i seguenti paragrafi utilizzando lo stile Emoji, che prevede titoli accattivanti, emoji in ogni paragrafo e tag pertinenti alla fine. Assicuratevi di mantenere il significato del testo originale.",
    "remark": "Riscrivere il testo in uno stile Emoji simile a quello di Little Red Book."
  },
  "ru": {
    "title": "Маленькая красная книга стиля",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Russian. Please begin by editing the following text: ",
    "description": "Пожалуйста, отредактируйте следующие абзацы, используя стиль Emoji, который предусматривает привлекательные заголовки, emojis в каждом абзаце и соответствующие теги в конце. Пожалуйста, сохраняйте смысл исходного текста.",
    "remark": "Перепишите текст в стиле Emoji, аналогичном Little Red Book."
  },
  "pt": {
    "title": "Pequeno livro vermelho do estilo",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Portuguese. Please begin by editing the following text: ",
    "description": "Edite os parágrafos seguintes utilizando o estilo Emoji, que inclui títulos apelativos, emojis em cada parágrafo e etiquetas relevantes no final. Certifique-se de que mantém o significado do texto original.",
    "remark": "Reescreva o texto num estilo Emoji semelhante ao do Pequeno Livro Vermelho."
  },
  "hi": {
    "title": "ज़ियाहोंगशु शैली",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Hindi. Please begin by editing the following text: ",
    "description": "कृपया इमोजी शैली का उपयोग करके निम्नलिखित पैराग्राफ को संपादित करें, जिसमें आकर्षक शीर्षक, प्रत्येक पैराग्राफ में इमोजी और अंत में प्रासंगिक टैग शामिल हैं। मूल पाठ का अर्थ अवश्य रखें।",
    "remark": "टेक्स्ट को लिटिल रेड बुक के समान इमोजी शैली में फिर से लिखें।"
  },
  "ar": {
    "title": "أسلوب Xiaohongshu",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Arabic. Please begin by editing the following text: ",
    "description": "يرجى تعديل الفقرات التالية باستخدام نمط Emoji ، الذي يتميز بالعناوين الجذابة والرموز التعبيرية في كل فقرة والعلامات ذات الصلة في النهاية. تأكد من الاحتفاظ بمعنى النص الأصلي.",
    "remark": "أعد كتابة النص بأسلوب Emoji مشابه لـ Little Red Book."
  },
  "bn": {
    "title": "জিয়াওহংশু শৈলী",
    "prompt": "Please edit the following passage using the Emoji style, which is characterized by captivating headlines, the inclusion of emoticons in each paragraph, and the addition of relevant tags at the end. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Bengali. Please begin by editing the following text: ",
    "description": "অনুগ্রহ করে ইমোজি স্টাইল ব্যবহার করে নিম্নলিখিত অনুচ্ছেদগুলি সম্পাদনা করুন, যাতে আকর্ষণীয় শিরোনাম, প্রতিটি অনুচ্ছেদে ইমোজি এবং শেষে প্রাসঙ্গিক ট্যাগ রয়েছে৷ মূল পাঠ্যের অর্থ রাখতে ভুলবেন না।",
    "remark": "লিটল রেড বুকের মতো একটি ইমোজি শৈলীতে পাঠ্যটি পুনরায় লিখুন।"
  },
  "website": null,
  "tags": [
    "favorite",
    "write"
  ],
  "id": 209,
  "weight": 25925
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
