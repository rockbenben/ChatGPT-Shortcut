import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "写作素材搜集",
    "prompt": "Generate a list of the top 10 facts, statistics and trends related to [主题], including their source. Respond in Chinese.",
    "description": "生成一份与 [主题] 有关的十大事实、统计数据和趋势的清单，包括其来源。",
    "remark": "提供与主题相关的结论、数据和来源，作为素材。"
  },
  "en": {
    "title": "Material Collection",
    "prompt": "Generate a list of the top 10 facts, statistics and trends related to [theme], including their source.",
    "remark": "Provide findings and data on the specified topic as material."
  },
  "ja": {
    "title": "筆記用具コレクション",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "トピック] に関連する事実、統計、トレンドのトップ 10 を、その出典も含めてリストアップしてください。",
    "remark": "トピックに関連する結論、データ、ソースを資料として提供する。"
  },
  "ko": {
    "title": "글쓰기 자료 모음",
    "prompt": "The entire conversation and instructions should be provided in Korean. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "주제] 와 관련된 상위 10 가지 사실, 통계 및 트렌드 (출처 포함) 의 목록을 생성합니다.",
    "remark": "주제와 관련된 결과, 데이터 및 출처를 소스 자료로 제공합니다."
  },
  "es": {
    "title": "colección de materiales de escritura",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source..",
    "description": "Genere una lista de los 10 principales hechos, estadísticas y tendencias relacionadas con [tema], incluidas sus fuentes.",
    "remark": "Proporcionar conclusiones, datos y fuentes relacionadas con el tema como material."
  },
  "fr": {
    "title": "Collection de matériel d'écriture",
    "prompt": "The entire conversation and instructions should be provided in French. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "Dresser une liste des 10 principaux faits, statistiques et tendances liés au [sujet], en indiquant leurs sources.",
    "remark": "Fournir des résultats, des données et des sources en rapport avec le sujet en tant que matériel de référence."
  },
  "de": {
    "title": "Sammlung von Schreibmaterial",
    "prompt": "The entire conversation and instructions should be provided in German. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "Erstellen Sie eine Liste der 10 wichtigsten Fakten, Statistiken und Trends im Zusammenhang mit [Thema], einschließlich ihrer Quellen.",
    "remark": "Geben Sie Ergebnisse, Daten und Quellen zum Thema als Quellenmaterial an."
  },
  "it": {
    "title": "Raccolta di materiale per scrivere",
    "prompt": "The entire conversation and instructions should be provided in Italian. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "Genera un elenco dei 10 principali fatti, statistiche e tendenze relativi a [argomento], comprese le relative fonti.",
    "remark": "Fornire conclusioni, dati e fonti relative all&#39;argomento come materiale."
  },
  "ru": {
    "title": "Сбор письменных принадлежностей",
    "prompt": "The entire conversation and instructions should be provided in Russian. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "Составьте список из 10 основных фактов, статистических данных и тенденций, связанных с [темой], включая их источники.",
    "remark": "В качестве материала предоставить выводы, данные и источники, относящиеся к теме."
  },
  "pt": {
    "title": "Coleção de materiais de escrita",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "Gere uma lista dos 10 principais fatos, estatísticas e tendências relacionadas a [tópico], incluindo suas fontes.",
    "remark": "Fornecer conclusões, dados e fontes relacionadas ao tema como material."
  },
  "hi": {
    "title": "लेखन सामग्री का संग्रह",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "[विषय] से संबंधित शीर्ष 10 तथ्यों, आंकड़ों और रुझानों की एक सूची तैयार करें, जिसमें उनके स्रोत भी शामिल हैं।",
    "remark": "सामग्री के रूप में विषय से संबंधित निष्कर्ष, डेटा और स्रोत प्रदान करें।"
  },
  "ar": {
    "title": "مجموعة من مواد الكتابة",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "قم بإنشاء قائمة بأهم 10 حقائق وإحصاءات واتجاهات تتعلق بـ [الموضوع] ، بما في ذلك مصادرها.",
    "remark": "قدم الاستنتاجات والبيانات والمصادر المتعلقة بالموضوع كمواد."
  },
  "bn": {
    "title": "লেখার উপকরণ সংগ্রহ",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Generate a list of the top 10 facts, statistics and trends related to [theme], including their source...",
    "description": "তাদের উত্স সহ [বিষয়] সম্পর্কিত শীর্ষ 10টি তথ্য, পরিসংখ্যান এবং প্রবণতাগুলির একটি তালিকা তৈরি করুন৷",
    "remark": "বিষয়ের সাথে সম্পর্কিত উপসংহার, তথ্য এবং উত্সগুলি উপাদান হিসাবে সরবরাহ করুন।"
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "write"
  ],
  "id": 10,
  "weight": 2079
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
