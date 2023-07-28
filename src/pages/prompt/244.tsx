import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "功能命名建议",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The English name should be in camel case format.",
    "description": "我正在寻求高度适合我提供的描述的英文和中文名字的建议。作为一名双语语言学家，请帮助我生成合适的两种语言的名字。英文名称应采用骆驼字母的格式。",
    "remark": "适用于编程变量和概述描述命名。来自 @SuperMuscleMan 的投稿。"
  },
  "en": {
    "title": "Naming Suggestions",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The English name should be in camel case format.",
    "remark": "Applies to programming variables and outlines description naming. Contributed by @SuperMuscleMan."
  },
  "ja": {
    "title": "機能のネーミングの提案",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Janpanese. The English name should be in camel case format.",
    "description": "私が提供した説明に非常に適した英語と中国語の名前の提案を求めています。バイリンガルの言語学者として、両言語での適切な名前の生成にご協力をお願いします。英語名は、キャメル文字でお願いします。",
    "remark": "プログラミングの変数に適用し、記述の命名について概説する。SuperMuscleMan さんからの寄稿です。"
  },
  "ko": {
    "title": "함수 이름 제안",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Korean. The English name should be in camel case format.",
    "description": "제가 제공한 설명에 매우 적합한 영어 및 중국어 이름에 대한 제안을 찾고 있습니다. 이중 언어를 구사하는 언어 전문가로서 두 언어 모두에 적합한 이름을 생성할 수 있도록 도와주세요. 영어 이름은 낙타 글자 형식이어야 합니다.",
    "remark": "프로그래밍 변수에 적용하고 설명 명명 개요를 설명합니다. 슈퍼머슬맨의 기여."
  },
  "es": {
    "title": "Sugerencias de nombres de funciones",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Spanish. The English name should be in camel case format.",
    "description": "Busco sugerencias de nombres en inglés y chino que se ajusten a la descripción que he proporcionado. Como lingüista bilingüe, por favor ayúdeme a generar nombres apropiados en ambos idiomas. El nombre en inglés debe tener formato de letra de camello.",
    "remark": "Se aplica a las variables de programación y describe la nomenclatura de las descripciones. Contribución de @SuperMuscleMan."
  },
  "fr": {
    "title": "Suggestions de noms de fonctions",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in French. The English name should be in camel case format.",
    "description": "Je suis à la recherche de suggestions de noms anglais et chinois qui conviennent parfaitement à la description que j'ai fournie. En tant que linguiste bilingue, je vous prie de m'aider à trouver des noms appropriés dans les deux langues. Le nom anglais doit être rédigé en lettres de chameau.",
    "remark": "S'applique aux variables de programmation et décrit le nommage des descriptions. Contribution de @SuperMuscleMan."
  },
  "de": {
    "title": "Vorschläge für die Funktionsbenennung",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in German. The English name should be in camel case format.",
    "description": "Ich bin auf der Suche nach Vorschlägen für englische und chinesische Namen, die gut zu der von mir gegebenen Beschreibung passen. Als zweisprachiger Linguist helfen Sie mir bitte, geeignete Namen in beiden Sprachen zu finden. Der englische Name sollte im Kamelbuchstabenformat sein.",
    "remark": "Gilt für die Programmierung von Variablen und umreißt die Benennung von Beschreibungen. Beitrag von @SuperMuscleMan."
  },
  "it": {
    "title": "Suggerimenti sui nomi delle funzioni",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Italian. The English name should be in camel case format.",
    "description": "Sono alla ricerca di suggerimenti per nomi inglesi e cinesi che siano altamente adatti alla descrizione che ho fornito. In qualità di linguista bilingue, vi prego di aiutarmi a generare nomi appropriati in entrambe le lingue. Il nome inglese dovrebbe essere in formato lettera di cammello.",
    "remark": "Si applica alle variabili di programmazione e delinea la denominazione delle descrizioni. Contributo di @SuperMuscleMan."
  },
  "ru": {
    "title": "Предложения по наименованию функций",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Russian. The English name should be in camel case format.",
    "description": "Мне нужны предложения по английским и китайским именам, которые в наибольшей степени соответствуют представленному мной описанию. Как лингвист, владеющий двумя языками, прошу помочь мне подобрать подходящие имена на обоих языках. Английское имя должно быть написано в формате camel letter.",
    "remark": "Применяется для программирования переменных и описывает именование описаний. Вклад от @SuperMuscleMan."
  },
  "pt": {
    "title": "Sugestões de nomes de funções",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Portuguese. The English name should be in camel case format.",
    "description": "Estou à procura de sugestões de nomes ingleses e chineses que sejam altamente adequados à descrição que forneci. Como linguista bilingue, ajude-me a criar nomes adequados em ambas as línguas. O nome em inglês deve ser em formato de letra de camelo.",
    "remark": "Aplica-se a variáveis de programação e descreve a nomeação de descrições. Contribuição de @SuperMuscleMan."
  },
  "hi": {
    "title": "फ़ीचर नामकरण सुझाव",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Hindi. The English name should be in camel case format.",
    "description": "मैं अंग्रेजी और चीनी नामों के लिए सुझाव ढूंढ रहा हूं जो मेरे द्वारा प्रदान किए गए विवरण के लिए बिल्कुल उपयुक्त हों। एक द्विभाषी भाषाविद् के रूप में, कृपया दोनों भाषाओं में उचित नाम उत्पन्न करने में मेरी सहायता करें। अंग्रेजी नाम कैमल फॉर्मेट में होने चाहिए।",
    "remark": "प्रोग्रामिंग चर और अवलोकन विवरण नामकरण के लिए उपयुक्त। @SuperMuscleMan का योगदान।"
  },
  "ar": {
    "title": "اقتراحات تسمية الميزة",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Arabic. The English name should be in camel case format.",
    "description": "أنا أبحث عن اقتراحات للأسماء الإنجليزية والصينية التي تناسب الوصف الذي قدمته. بصفتي لغويًا ثنائي اللغة ، الرجاء مساعدتي في إنشاء أسماء العلم بكلتا اللغتين. يجب أن تكون الأسماء الإنجليزية بصيغة الجمل.",
    "remark": "مناسبة لبرمجة المتغيرات وتسمية وصف نظرة عامة. مساهمة منSuperMuscleMan."
  },
  "bn": {
    "title": "বৈশিষ্ট্য নামকরণ পরামর্শ",
    "prompt": "I am seeking suggestions for both English and Chinese names that are highly suitable for a description I provide. As a bilingual linguist, please help me generate appropriate names in both languages. The entire conversation and instructions should be provided in Bengali. The English name should be in camel case format.",
    "description": "আমি ইংরেজি এবং চাইনিজ নামের জন্য পরামর্শ খুঁজছি যা আমার দেওয়া বর্ণনার সাথে খুবই মানানসই হবে। একজন দ্বিভাষিক ভাষাবিদ হিসেবে, অনুগ্রহ করে আমাকে উভয় ভাষায় সঠিক নাম তৈরি করতে সাহায্য করুন। ইংরেজি নাম উটের বিন্যাসে হওয়া উচিত।",
    "remark": "প্রোগ্রামিং ভেরিয়েবল এবং ওভারভিউ বর্ণনা নামকরণের জন্য উপযুক্ত। @SuperMuscleMan এর থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 244,
  "weight": 242
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
