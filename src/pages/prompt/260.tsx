import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "语法对照检查",
    "prompt": "Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold",
    "description": "你能帮我确保语法和拼写的正确性吗？如果你发现语法或拼写错误，请将你发现的错误列在一个两栏的标记表中，将原文放在第一栏，将更正后的文本放在第二栏，并将你修正的关键词用黑体字标出。",
    "remark": "来自 @ScenerorSun 的投稿。"
  },
  "en": {
    "title": "Grammar Contrast Check",
    "prompt": "Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold",
    "remark": "Contributed by @ScenerorSun."
  },
  "ja": {
    "title": "文法のクロスチェック",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "文法やスペルが正しいかどうか、確認するのを手伝ってもらえますか？文法やスペルの誤りを見つけた場合は、2 列のマークアップ表に記載し、1 列目に原文、2 列目に修正文を配置し、修正したキーワードを太字でハイライトしてください。",
    "remark": "ScenerorSun さん（@ScenerorSun）からの寄稿です。"
  },
  "ko": {
    "title": "문법 교차 검사",
    "prompt": "The entire conversation and instructions should be provided in Korean. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "문법과 철자가 올바른지 확인해 주실 수 있나요? 문법이나 철자 오류가 발견되면 두 열로 된 마크업 표에 발견한 오류를 나열하고 첫 번째 열에는 원본 텍스트를, 두 번째 열에는 수정한 텍스트를 배치하고 수정한 핵심 단어를 굵은 글씨로 강조 표시해 주세요.",
    "remark": "ScenerorSun 의 기고글입니다."
  },
  "es": {
    "title": "Comprobación gramatical cruzada",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "¿Puede ayudarme a asegurarme de que la gramática y la ortografía son correctas? Si encuentra errores gramaticales u ortográficos, escríbalos en una hoja de marcado a dos columnas, colocando el texto original en la primera columna, el texto corregido en la segunda y las palabras clave que haya corregido en negrita.",
    "remark": "Contribución de @ScenerorSun."
  },
  "fr": {
    "title": "Vérification grammaticale croisée",
    "prompt": "The entire conversation and instructions should be provided in French. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "Pouvez-vous m'aider à m'assurer que ma grammaire et mon orthographe sont correctes ? Si vous trouvez des erreurs grammaticales ou orthographiques, veuillez les répertorier dans une feuille de correction en deux colonnes, en plaçant le texte original dans la première colonne, le texte corrigé dans la deuxième colonne et les mots clés que vous avez corrigés en gras.",
    "remark": "Contribution de @ScenerorSun."
  },
  "de": {
    "title": "Grammatikalische Gegenkontrolle",
    "prompt": "The entire conversation and instructions should be provided in German. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "Können Sie mir helfen, meine Grammatik und Rechtschreibung zu korrigieren? Wenn Sie Grammatik- oder Rechtschreibfehler finden, listen Sie diese bitte in einem zweispaltigen Auszeichnungsblatt auf, wobei Sie den Originaltext in die erste Spalte, den korrigierten Text in die zweite Spalte und die von Ihnen korrigierten Schlüsselwörter in Fettdruck setzen.",
    "remark": "Beitrag von @ScenerorSun."
  },
  "it": {
    "title": "Controllo grammaticale incrociato",
    "prompt": "The entire conversation and instructions should be provided in Italian. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "Potete aiutarmi ad assicurarmi che la grammatica e l'ortografia siano corrette? Se trovate errori grammaticali o ortografici, elencateli in un foglio di markup a due colonne, mettendo il testo originale nella prima colonna, il testo corretto nella seconda colonna e le parole chiave corrette in grassetto.",
    "remark": "Contributo di @ScenerorSun."
  },
  "ru": {
    "title": "Грамматическая перекрестная проверка",
    "prompt": "The entire conversation and instructions should be provided in Russian. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "Можете ли вы помочь мне убедиться в правильности грамматики и орфографии? Если Вы обнаружили грамматические или орфографические ошибки, пожалуйста, перечислите их на листе разметки в два столбца, поместив в первый столбец исходный текст, во второй - исправленный текст, а ключевые слова, которые Вы исправили, выделив жирным шрифтом.",
    "remark": "Вклад от @ScenerorSun."
  },
  "pt": {
    "title": "Controlo gramatical cruzado",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "Pode ajudar-me a verificar se a minha gramática e ortografia estão correctas? Se encontrar erros gramaticais ou ortográficos, indique os erros encontrados numa folha de marcação com duas colunas, colocando o texto original na primeira coluna, o texto corrigido na segunda coluna e as palavras-chave que corrigiu a negrito.",
    "remark": "Contribuição de @ScenerorSun."
  },
  "hi": {
    "title": "व्याकरण जाँचना",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "क्या आप यह सुनिश्चित करने में मेरी मदद कर सकते हैं कि व्याकरण और वर्तनी सही हैं? यदि आपको कोई व्याकरण संबंधी या वर्तनी संबंधी त्रुटि मिलती है, तो दो-स्तंभ मार्कअप तालिका में पाई गई त्रुटियों को सूचीबद्ध करें, पहले स्तंभ में मूल पाठ, दूसरे स्तंभ में संशोधित पाठ और अपने संशोधित कीवर्ड को बोल्ड में चिह्नित करें।",
    "remark": "@ScenororSun से योगदान।"
  },
  "ar": {
    "title": "فحص القواعد",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "هل يمكنك مساعدتي في التأكد من صحة القواعد النحوية والإملائية؟ إذا وجدت خطأً نحويًا أو إملائيًا ، فقم بسرد الأخطاء التي وجدتها في جدول ترميز مكون من عمودين ، مع النص الأصلي في العمود الأول ، والنص المصحح في العمود الثاني ، والكلمات الرئيسية المصححة مميزة بخط غامق.",
    "remark": "مساهمة منScenerorSun."
  },
  "bn": {
    "title": "ব্যাকরণ পরীক্ষা করা",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Could you please help me to ensure that the grammar and spelling are correct? Do not tryto improve the text, if no mistake is found, tellme that this paragraph is good.lf you find grammar or spelling mistakes, please list the mistakes you find in a two-column markdown table, put the original text in the first column.put the corrected text in the second columnand do highlight the key words you fixed in bold.",
    "description": "আপনি কি আমাকে ব্যাকরণ এবং বানান সঠিক কিনা তা নিশ্চিত করতে সাহায্য করতে পারেন? যদি আপনি একটি ব্যাকরণগত বা বানান ত্রুটি খুঁজে পান, তাহলে প্রথম কলামে মূল পাঠ্য, দ্বিতীয় কলামে সংশোধন করা পাঠ্য এবং আপনার সংশোধিত কীওয়ার্ডগুলি বোল্ডে চিহ্নিত সহ একটি দুই-কলামের মার্কআপ টেবিলে আপনি যে ত্রুটিগুলি খুঁজে পেয়েছেন তা তালিকাভুক্ত করুন।",
    "remark": "@ScenerorSun থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 260,
  "weight": 153
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
