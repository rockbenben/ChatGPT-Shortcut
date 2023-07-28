import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "文本情绪分析",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. Generate the results in column, including the titles in the first one, and their sentiment in the second: [内容]",
    "description": "指定以下标题的情感，赋予它们的值为：正面、中性或负面。生成一列结果，包括第一列中的标题和第二列中的情感：[内容] 。",
    "remark": "判断文本情绪：正面、中性或负面。"
  },
  "en": {
    "title": "sentiment analysis",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "remark": "Detect text sentiment: positive, neutral or negative."
  },
  "ja": {
    "title": "テキストのムード分析",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Janpanese. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "次の見出しのセンチメントを指定し、positive、neutral、negative のいずれかの値を与える。1 列目に見出し、2 列目に感情を指定した結果の列を生成する：[content].",
    "remark": "文章の雰囲気を判断する：ポジティブ、ニュートラル、ネガティブ。"
  },
  "ko": {
    "title": "텍스트 분위기 분석",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Korean. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "다음 제목에 대해 긍정, 중립 또는 부정의 값을 지정하여 감성을 지정합니다. 첫 번째 열에 제목을, 두 번째 열에 감성어를 사용하여 결과 열을 생성합니다: [콘텐츠].",
    "remark": "텍스트의 분위기 판단: 긍정, 중립 또는 부정."
  },
  "es": {
    "title": "Análisis del sentimiento del texto",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Spanish. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "Especifica los sentimientos para los siguientes títulos, asignándoles los valores: positivo, neutro o negativo. Genera una columna de resultados con los títulos en la primera columna y los sentimientos en la segunda columna: [contenido] ",
    "remark": "Juzga el estado de ánimo del texto: positivo, neutro o negativo."
  },
  "fr": {
    "title": "Analyse des sentiments dans le texte",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in French. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "Spécifie les sentiments pour les rubriques suivantes, en leur attribuant les valeurs : positif, neutre ou négatif. Génère une colonne de résultats avec les titres dans la première colonne et les sentiments dans la deuxième colonne : [content] ",
    "remark": "Jugez de l'humeur du texte : positive, neutre ou négative."
  },
  "de": {
    "title": "Text-Sentiment-Analyse",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in German. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "Gibt die Stimmungen für die folgenden Überschriften an und weist ihnen die Werte: positiv, neutral oder negativ zu. Erzeugt eine Ergebnisspalte mit den Überschriften in der ersten Spalte und den Stimmungen in der zweiten Spalte: [content] ",
    "remark": "Beurteilen Sie die Stimmung des Textes: positiv, neutral oder negativ."
  },
  "it": {
    "title": "Analisi del sentimento del testo",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Italian. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "Specifica i sentimenti per le seguenti voci, assegnando loro i valori: positivo, neutro o negativo. Genera una colonna di risultati con i titoli nella prima colonna e i sentimenti nella seconda colonna: [content] ",
    "remark": "Giudicare l'umore del testo: positivo, neutro o negativo."
  },
  "ru": {
    "title": "Анализ текстовых настроений",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Russian. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "Задайте настроения для следующих заголовков, присвоив им значения: положительный, нейтральный или отрицательный. Сформировать столбец результатов с заголовками в первом столбце и настроениями во втором: [content] ",
    "remark": "Оцените настроение текста: позитивное, нейтральное или негативное."
  },
  "pt": {
    "title": "Análise do sentimento do texto",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Portuguese. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "Especifica os sentimentos para os seguintes títulos, atribuindo-lhes os valores: positivo, neutro ou negativo. Gera uma coluna de resultados com os títulos na primeira coluna e os sentimentos na segunda coluna: [content] ",
    "remark": "Avaliar o estado de espírito do texto: positivo, neutro ou negativo."
  },
  "hi": {
    "title": "पाठ भावना विश्लेषण",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Hindi. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "निम्नलिखित शीर्षकों के लिए भावना निर्दिष्ट करता है, उन्हें एक मूल्य देता है: सकारात्मक, तटस्थ, या नकारात्मक। परिणामों का एक कॉलम तैयार करता है, जिसमें पहले कॉलम में शीर्षक और दूसरे कॉलम में भावना शामिल है: [सामग्री]।",
    "remark": "पाठ भावना का मूल्यांकन करें: सकारात्मक, तटस्थ, या नकारात्मक।"
  },
  "ar": {
    "title": "تحليل المشاعر النصية",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Arabic. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "يحدد المشاعر الخاصة بالعناوين التالية ، مع منحها قيمة: موجبة ، أو محايدة ، أو سلبية. يُنشئ عمودًا من النتائج ، بما في ذلك العنوان في العمود الأول والشعور في العمود الثاني: [المحتوى].",
    "remark": "الحكم على المشاعر النصية: إيجابية أو محايدة أو سلبية."
  },
  "bn": {
    "title": "টেক্সট সেন্টিমেন্ট বিশ্লেষণ",
    "prompt": "Specify the sentiment of the following titles, assigning them the values of: positive, neutral or negative. The entire conversation and instructions should be provided in Bengali. Generate the results in column, including the titles in the first one, and their sentiment in the second: ",
    "description": "নিম্নলিখিত শিরোনামগুলির জন্য অনুভূতি নির্দিষ্ট করে, তাদের একটি মান দেয়: ইতিবাচক, নিরপেক্ষ বা নেতিবাচক৷ প্রথম কলামের শিরোনাম এবং দ্বিতীয় কলামে অনুভূতি সহ ফলাফলের একটি কলাম তৈরি করে: [সামগ্রী]।",
    "remark": "বিচার টেক্সট অনুভূতি: ইতিবাচক, নিরপেক্ষ, বা নেতিবাচক।"
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "text"
  ],
  "id": 31,
  "weight": 203
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
