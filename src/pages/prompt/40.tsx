import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "关键词热门相关",
    "prompt": "Generate a list of 10 popular questions related to [关键词], that are relevant for [受众] and respond in Chinese",
    "description": "生成一个与 [关键词] 相关的 10 个热门问题清单，这些问题与 [受众] 有关，并用中文回答。",
    "remark": "可用于了解用户对特定话题的关注点，或整理文章结构，亦可更改为「热门关键词」「热门话题」「热门品牌」「热门网站」等。"
  },
  "en": {
    "title": "Popular Related",
    "prompt": "Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "remark": "This can be used to understand the focus of users on specific topics, or to organize the structure of articles. It can also be changed to 'popular keywords', 'popular topics', 'popular brands', 'popular websites' and so on."
  },
  "ja": {
    "title": "キーワード 人気 関連",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "キーワード] に関連する質問のうち、[オーディエンス] に関連し、中国語で回答している上位 10 件のリストを作成する。",
    "remark": "あるトピックについてユーザーが気にしていることを調べたり、記事の構成に使ったり、「人気キーワード」「人気トピック」「人気ブランド」「人気ウェブサイト」などに変更することも可能です。"
  },
  "ko": {
    "title": "키워드 인기 관련",
    "prompt": "The entire conversation and instructions should be provided in Korean. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "키워드] 와 관련된 [청중] 과 관련이 있고 중국어로 답변된 10 개의 인기 질문 목록을 생성합니다.",
    "remark": "사용자가 특정 주제에 대해 어떤 관심을 갖고 있는지 파악하거나 기사를 구성하는 데 사용할 수 있으며, '인기 키워드' '인기 주제' '인기 브랜드' '인기 웹사이트' 등으로 변경할 수도 있습니다."
  },
  "es": {
    "title": "Palabra clave Popular Related",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "Genere una lista de 10 preguntas populares relacionadas con [palabra clave] que sean relevantes para [audiencia] y con respuesta en chino.",
    "remark": "Puede utilizarse para comprender la atención que prestan los usuarios a temas específicos, o para organizar la estructura del artículo, y puede cambiarse por \"Palabras clave candentes\", \"Temas candentes\", \"Marcas candentes\", \"Sitios web candentes\", etc."
  },
  "fr": {
    "title": "Mot-clé Populaire Lié",
    "prompt": "The entire conversation and instructions should be provided in French. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "Générer une liste de 10 questions populaires liées à [mot-clé] qui sont pertinentes pour [public] et dont les réponses sont en chinois.",
    "remark": "Il peut être utilisé pour comprendre l'intérêt des utilisateurs pour des sujets spécifiques, ou pour organiser la structure de l'article, et peut être modifié en \"mots-clés chauds\", \"sujets chauds\", \"marques chaudes\", \"sites web chauds\", etc."
  },
  "de": {
    "title": "Schlüsselwort Popular Related",
    "prompt": "The entire conversation and instructions should be provided in German. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "Erstellen Sie eine Liste von 10 beliebten Fragen zum Thema [Stichwort], die für [Zielgruppe] relevant sind und auf Chinesisch beantwortet werden.",
    "remark": "Es kann verwendet werden, um den Fokus der Nutzer auf bestimmte Themen zu verstehen oder um die Struktur des Artikels zu organisieren, und kann in \"Hot Keywords\", \"Hot Topics\", \"Hot Brands\", \"Hot Websites\" usw. geändert werden."
  },
  "it": {
    "title": "Parola chiave Popolare correlata",
    "prompt": "The entire conversation and instructions should be provided in Italian. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "Generare un elenco di 10 domande popolari relative a [parola chiave], rilevanti per [pubblico] e con risposta in cinese.",
    "remark": "Può essere utilizzato per capire l'attenzione degli utenti su argomenti specifici o per organizzare la struttura dell'articolo e può essere modificato in \"Hot Keywords\", \"Hot Topics\", \"Hot Brands\", \"Hot Websites\" e così via."
  },
  "ru": {
    "title": "Ключевое слово Популярное связанное",
    "prompt": "The entire conversation and instructions should be provided in Russian. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "Сформировать список из 10 популярных вопросов, связанных с [ключевым словом], релевантных для [аудитории] и имеющих ответы на китайском языке.",
    "remark": "Она может быть использована для понимания того, насколько пользователи сосредоточены на определенных темах, или для организации структуры статьи, и может быть изменена на \"Горячие ключевые слова\", \"Горячие темы\", \"Горячие бренды\", \"Горячие сайты\" и т.д."
  },
  "pt": {
    "title": "Palavra-chave Popular Relacionado",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "Gerar uma lista de 10 perguntas populares relacionadas com [palavra-chave] que sejam relevantes para [público] e respondidas em chinês.",
    "remark": "Pode ser utilizado para compreender o foco dos utilizadores em tópicos específicos ou para organizar a estrutura do artigo e pode ser alterado para \"Hot Keywords\", \"Hot Topics\", \"Hot Brands\", \"Hot Websites\", etc."
  },
  "hi": {
    "title": "कीवर्ड लोकप्रिय संबंधित",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "[कीवर्ड] से संबंधित, [दर्शकों] से संबंधित और चीनी भाषा में उत्तर दिए गए शीर्ष 10 प्रश्नों की एक सूची तैयार करें।",
    "remark": "इसका उपयोग किसी विशिष्ट विषय पर उपयोगकर्ता के फोकस को समझने या लेख की संरचना को व्यवस्थित करने के लिए किया जा सकता है, और इसे &quot;हॉट कीवर्ड&quot;, &quot;हॉट टॉपिक्स&quot;, &quot;हॉट ब्रांड&quot;, &quot;हॉट वेबसाइट्स&quot; आदि में भी बदला जा सकता है। ."
  },
  "ar": {
    "title": "الكلمات الرئيسية الشائعة ذات الصلة",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "قم بإنشاء قائمة بأهم 10 أسئلة تتعلق بـ [الكلمة الرئيسية] ، ذات الصلة بـ [الجمهور] والإجابة عليها باللغة الصينية.",
    "remark": "يمكن استخدامه لفهم تركيز المستخدم على موضوع معين ، أو لتنظيم بنية المقالة ، ويمكن أيضًا تغييره إلى &quot;الكلمات الرئيسية الساخنة&quot; ، &quot;الموضوعات الساخنة&quot; ، &quot;العلامات التجارية الساخنة&quot; ، &quot;المواقع الإلكترونية الساخنة&quot; ، إلخ. ."
  },
  "bn": {
    "title": "জনপ্রিয় সম্পর্কিত কীওয়ার্ড",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Generate a list of 10 popular questions related to [keywords], that are relevant for [target users].",
    "description": "[কীওয়ার্ড] সম্পর্কিত, [শ্রোতাদের] সাথে সম্পর্কিত এবং চীনা ভাষায় উত্তর দেওয়া শীর্ষ 10টি প্রশ্নের একটি তালিকা তৈরি করুন।",
    "remark": "এটি একটি নির্দিষ্ট বিষয়ে ব্যবহারকারীর ফোকাস বোঝার জন্য, বা নিবন্ধের কাঠামো সংগঠিত করতে ব্যবহার করা যেতে পারে এবং &quot;হট কীওয়ার্ড&quot;, &quot;হট টপিকস&quot;, &quot;হট ব্র্যান্ডস&quot;, &quot;হট ওয়েবসাইট&quot; ইত্যাদিতেও পরিবর্তন করা যেতে পারে। ."
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 40,
  "weight": 777
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
