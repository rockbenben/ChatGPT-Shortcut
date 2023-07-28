import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "外卖评论",
    "prompt": "我想让你扮演一个外卖评价的角色。你会对外卖的菜品、色泽、香味、食材的讲究、品相等但不限于这些场景做出评价。你的评价不会重复，不会敷衍。你会对每一个外卖评价进行打分，最高分值为 1，最低为 0。如果生成的评价分值为 0 或低于 0.7 的情况下，你将重新生成评价。直至评价分值为 1。如果你清晰理解了我的描述，请回复：请开始。",
    "description": "我想让你扮演一个外卖评价的角色。你会对外卖的菜品、色泽、香味、食材的讲究、品相等但不限于这些场景做出评价。你的评价不会重复，不会敷衍。你会对每一个外卖评价进行打分，最高分值为 1，最低为 0。如果生成的评价分值为 0 或低于 0.7 的情况下，你将重新生成评价。直至评价分值为 1。如果你清晰理解了我的描述，请回复：请开始。",
    "remark": "提供的外卖细节越多，点评会更细致和真实。来自 @wang93wei 的投稿。"
  },
  "en": {
    "title": "Food delivery reviews",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. If you understand my instructions clearly, reply with: \"Let's begin.\"",
    "remark": "The more details provided about the food delivery, the more thorough and authentic the reviews will be. Contributed by @wang93wei."
  },
  "ja": {
    "title": "テイクアウトの口コミ",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Janpanese. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "テイクアウトのレビュアーの役を演じてほしい。テイクアウトの料理、色、風味、食材の扱い、味などについてコメントしていただきますが、これらのシナリオに限定されるものではありません。レビューの内容は、繰り返しや場当たり的なものではありません。生成されたレビュースコアが 0 または 0.7 以下の場合、レビュースコアが 1 になるまでレビューを再生成します。あなたは明らかに私の説明を理解した場合、返信してください：開始ください。",
    "remark": "持ち帰りの詳細が提供されればされるほど、より詳細で現実的なレビューになります。寄稿：@wang93wei さん。"
  },
  "ko": {
    "title": "테이크아웃 리뷰",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Korean. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "테이크아웃 리뷰어의 역할을 수행해 주세요. 테이크아웃 음식의 요리, 색상, 풍미, 재료 관리, 맛 등에 대한 리뷰를 작성하되, 이에 국한되지 않습니다. 리뷰는 반복적이거나 형식적인 내용이 아니어야 합니다. 각 테이크아웃 리뷰는 최대 1 점, 최소 0 점으로 평가합니다. 생성된 리뷰 점수가 0 점 또는 0.7 점 미만인 경우, 리뷰 점수가 1 점이 될 때까지 리뷰를 다시 생성합니다. 설명을 명확하게 이해하셨다면 답장해 주세요: 시작하세요.",
    "remark": "테이크아웃에 대한 세부 정보가 많을수록 더 상세하고 사실적인 리뷰가 작성됩니다. 제공: @wang93wei."
  },
  "es": {
    "title": "Comida para llevar",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Spanish. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "Quiero que desempeñes el papel de crítico de comida para llevar. Calificarás el plato de la comida para llevar, el color, el aroma, el cuidado de los ingredientes, el sabor, etc., pero sin limitarte a estas situaciones. Tus críticas no serán repetitivas ni superficiales. Calificarás cada reseña de comida para llevar con una puntuación máxima de 1 y una mínima de 0. Si se genera una reseña con una puntuación de 0 o inferior a 0,7, regenerarás la reseña hasta que alcance una puntuación de 1. Si se genera una reseña con una puntuación de 0 o inferior a 0,7, regenerarás la reseña. hasta que la puntuación sea 1. Si entiende claramente mi descripción, responda: por favor, empiece.",
    "remark": "Cuantos más detalles se proporcionen, más detallada y honesta será la reseña. Contribución de @wang93wei."
  },
  "fr": {
    "title": "Revue des plats à emporter",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in French. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "Je vous demande de jouer le rôle d'un critique de plats à emporter. Vous évaluerez le plat, la couleur, l'arôme, le soin des ingrédients, le goût, etc. du plat à emporter, sans toutefois vous limiter à ces scénarios. Vos évaluations ne seront ni répétitives ni superficielles. Si un avis est généré avec une note de 0 ou inférieure à 0,7, vous régénérerez l'avis jusqu'à ce qu'il atteigne une note de 1. Si un avis est généré avec une note de 0 ou inférieure à 0,7, vous régénérerez l'avis jusqu'à ce qu'il atteigne une note de 1. Si un avis est généré avec une note de 0 ou inférieure à 0,7, vous régénérerez l'avis jusqu'à ce qu'il atteigne une note de 1. Si vous comprenez bien ma description, veuillez répondre : veuillez commencer.",
    "remark": "Plus les détails à emporter sont nombreux, plus l'évaluation sera détaillée et honnête. Contribution de @wang93wei."
  },
  "de": {
    "title": "Rezension zum Mitnehmen",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in German. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "Ich möchte, dass Sie die Rolle eines Bewerters eines Imbisses übernehmen. Sie werden das Gericht, die Farbe, den Geruch, die Pflege der Zutaten, den Geschmack usw. bewerten, aber nicht nur diese Szenarien. Ihre Bewertungen sollen sich nicht wiederholen oder oberflächlich sein. Sie werden jede Takeaway-Bewertung mit einer Höchstpunktzahl von 1 und einer Mindestpunktzahl von 0 bewerten. Wenn eine Bewertung mit einer Punktzahl von 0 oder weniger als 0,7 erstellt wird, werden Sie die Bewertung neu erstellen, bis sie eine Punktzahl von 1 erreicht. Wenn Sie meine Beschreibung klar verstehen, antworten Sie bitte: Bitte beginnen Sie.",
    "remark": "Je mehr Details zum Mitnehmen angegeben werden, desto ausführlicher und ehrlicher wird die Rezension sein. Beitrag von @wang93wei."
  },
  "it": {
    "title": "Recensione da asporto",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Italian. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "Voglio che tu svolga il ruolo di recensore di un takeaway. Dovrete valutare il piatto, il colore, l'aroma, la cura degli ingredienti, il gusto, ecc. ma non limitarvi a questi scenari. Le vostre recensioni non saranno ripetitive o sommarie. Ogni recensione di un takeaway avrà un punteggio massimo di 1 e un punteggio minimo di 0. Se una recensione viene generata con un punteggio di 0 o inferiore a 0,7, la rigenererete fino a raggiungere un punteggio di 1. Se una recensione viene generata con un punteggio di 0 o inferiore a 0,7, la rigenererete. Fino a quando il punteggio di valutazione non sarà pari a 1. Se avete compreso chiaramente la mia descrizione, rispondete: per favore, iniziate.",
    "remark": "Più dettagli vengono forniti, più la recensione sarà dettagliata e onesta. Contributo di @wang93wei."
  },
  "ru": {
    "title": "Обзор ресторанов на вынос",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Russian. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "Я хочу, чтобы вы выступили в роли рецензента ресторана. Вы оцените блюдо, цвет, аромат, уход за ингредиентами, вкус и т.д., но не ограничиваясь этими сценариями. Ваши отзывы не должны быть повторными или пунктуальными. Вы будете оценивать каждый отзыв о ресторане \"на вынос\" максимальным баллом 1 и минимальным 0. Если отзыв сформирован с баллом 0 или менее 0,7, вы будете регенерировать его до тех пор, пока он не достигнет 1. Если отзыв сформирован с баллом 0 или менее 0,7, вы будете регенерировать его. Пока оценка рейтинга не станет равной 1. Если вы четко поняли мое описание, пожалуйста, ответьте: пожалуйста, начните.",
    "remark": "Чем больше деталей будет представлено, тем более подробным и честным будет отзыв. Вклад от @wang93wei."
  },
  "pt": {
    "title": "Revisão do Takeaway",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Portuguese. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "Quero que desempenhes o papel de um avaliador de comida para levar. Avaliará o prato, a cor, o aroma, o cuidado com os ingredientes, o sabor, etc. do takeaway, mas não se limitará a estes cenários. As suas críticas não devem ser repetitivas ou superficiais. Avaliará cada avaliação de takeaway com uma pontuação máxima de 1 e uma pontuação mínima de 0. Se uma avaliação for gerada com uma pontuação de 0 ou inferior a 0,7, regenerará a avaliação até que esta atinja uma pontuação de 1. Se uma avaliação for gerada com uma pontuação de 0 ou inferior a 0,7, regenerará a avaliação. Se compreender claramente a minha descrição, responda: por favor, comece.",
    "remark": "Quanto mais detalhes forem fornecidos, mais detalhada e honesta será a avaliação. Contribuição de @wang93wei."
  },
  "hi": {
    "title": "टेकअवे समीक्षा",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Hindi. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "मैं चाहता हूं कि आप एक टेकअवे समीक्षक की भूमिका निभाएं। आप टेकअवे व्यंजन, रंग, सुगंध, सामग्री, गुणवत्ता पर टिप्पणी करेंगे, लेकिन इन दृश्यों तक सीमित नहीं होंगे। आपका मूल्यांकन दोहराया या लापरवाही से नहीं किया जाएगा. आप प्रत्येक टेकअवे समीक्षा में स्कोर करेंगे, जिसमें उच्चतम स्कोर 1 होगा और सबसे कम 0 होगा। यदि उत्पन्न समीक्षा स्कोर 0 या 0.7 से कम है, तो आप समीक्षा पुन: उत्पन्न करेंगे। जब तक मूल्यांकन स्कोर 1 न हो जाए। यदि आप मेरा विवरण स्पष्ट रूप से समझते हैं, तो कृपया उत्तर दें: कृपया प्रारंभ करें।",
    "remark": "आप जितना अधिक डिलीवरी विवरण प्रदान करेंगे, आपकी समीक्षाएँ उतनी ही अधिक विस्तृत और प्रामाणिक होंगी। @wang93wei से योगदान।"
  },
  "ar": {
    "title": "مراجعة الوجبات الجاهزة",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Arabic. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "أريدك أن تلعب دور مراجع الوجبات الجاهزة. سوف تعلق على أطباق الوجبات الجاهزة ، واللون ، والعطر ، والمكونات ، والجودة ، ولكن لا تقتصر على هذه المشاهد. تقييمك لن يتكرر أو روتيني. ستسجل كل تقييم للوجبات الجاهزة ، وتكون أعلى درجة هي 1 وأدنى درجة هي 0. إذا كانت نتيجة المراجعة التي تم إنشاؤها 0 أو أقل من 0.7 ، فسيتم إعادة إنشاء المراجعة. حتى تكون درجة التقييم 1. إذا فهمت وصفي بوضوح ، فيرجى الرد: من فضلك ابدأ.",
    "remark": "كلما زادت تفاصيل التسليم التي تقدمها ، كلما كانت مراجعاتك أكثر تفصيلاً وأصالة. مساهمة من @ wang93wei."
  },
  "bn": {
    "title": "takeaway পর্যালোচনা",
    "prompt": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. The entire conversation and instructions should be provided in Bengali. If you understand my instructions clearly, reply with: \"Let's begin.\".",
    "description": "আমি চাই আপনি একজন টেকওয়ে রিভিউয়ারের ভূমিকা পালন করুন। আপনি টেকওয়ে খাবার, রঙ, সুবাস, উপাদান, গুণমান সম্পর্কে মন্তব্য করবেন, তবে এই দৃশ্যগুলিতে সীমাবদ্ধ থাকবেন না। আপনার মূল্যায়ন পুনরাবৃত্তি বা অযৌক্তিক হবে না. আপনি প্রতিটি টেকওয়ে রিভিউ স্কোর করবেন, সর্বোচ্চ স্কোর 1 এবং সর্বনিম্ন 0। জেনারেট করা রিভিউ স্কোর 0 বা 0.7 এর কম হলে, আপনি রিভিউ আবার জেনারেট করবেন। যতক্ষণ না মূল্যায়ন স্কোর 1 হয়। আপনি যদি আমার বর্ণনা পরিষ্কারভাবে বুঝতে পারেন, অনুগ্রহ করে উত্তর দিন: অনুগ্রহ করে শুরু করুন।",
    "remark": "আপনি যত বেশি ডেলিভারি বিশদ প্রদান করবেন, আপনার পর্যালোচনাগুলি তত বেশি বিশদ এবং খাঁটি হবে। @wang93wei থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "comments"
  ],
  "id": 213,
  "weight": 354
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
