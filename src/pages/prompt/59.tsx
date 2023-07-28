import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "厨师②",
    "prompt": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! Respond in Chinese. My first request – [饮食倾向需求]",
    "description": "我需要有人能够建议美味的食谱，其中包括对营养有益的食物，但也很容易，而且不耗费时间，因此适合像我们这样忙碌的人，还有其他因素，如成本效益，所以整体菜肴最终是健康的，但同时也是经济的。",
    "remark": "Chef"
  },
  "en": {
    "title": "Chef",
    "prompt": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "remark": "Chef"
  },
  "ja": {
    "title": "シェフ②の場合",
    "prompt": "The entire conversation and instructions should be provided in Japanese. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "栄養面はもちろん、忙しくてもできる簡単なレシピや、コスパの良さなど、ヘルシーでありながら経済的なレシピを提案してくれる人が必要だと思いました。",
    "remark": "シェフ"
  },
  "ko": {
    "title": "셰프 ②",
    "prompt": "The entire conversation and instructions should be provided in Korean. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "영양학적으로 유익하면서도 간편하고 시간이 많이 걸리지 않아 우리처럼 바쁜 사람들에게 적합한 음식이 포함된 맛있는 레시피를 제안해 줄 수 있는 사람이 필요했고, 가성비 등 다른 요소도 고려해서 건강하면서도 경제적인 요리를 만들 수 있도록 했습니다.",
    "remark": "셰프"
  },
  "es": {
    "title": "Chef ②",
    "prompt": "The entire conversation and instructions should be provided in Spanish. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "Necesito a alguien que pueda sugerirme recetas sabrosas que incluyan alimentos buenos desde el punto de vista nutricional pero que también sean fáciles y no lleven mucho tiempo, de modo que sean adecuadas para personas ocupadas como nosotros, y otros factores como la rentabilidad, de modo que el plato en general resulte sano pero también económico.",
    "remark": "Chef"
  },
  "fr": {
    "title": "Chef ②",
    "prompt": "The entire conversation and instructions should be provided in French. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "J'ai besoin de quelqu'un qui puisse me suggérer des recettes savoureuses qui incluent des aliments bons pour la nutrition, mais qui sont également faciles à réaliser et ne prennent pas beaucoup de temps pour convenir à des personnes occupées comme nous, et d'autres facteurs tels que le rapport coût-efficacité pour que l'ensemble du plat soit sain mais aussi économique.",
    "remark": "Chef cuisinier"
  },
  "de": {
    "title": "Chefkoch ②",
    "prompt": "The entire conversation and instructions should be provided in German. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "Ich brauche jemanden, der schmackhafte Rezepte vorschlägt, die Lebensmittel enthalten, die gut für die Ernährung sind, aber auch einfach und nicht zeitaufwendig, so dass sie für vielbeschäftigte Menschen wie uns geeignet sind, und andere Faktoren wie Kosteneffizienz, so dass das gesamte Gericht am Ende gesund, aber auch wirtschaftlich ist.",
    "remark": "Chefkoch"
  },
  "it": {
    "title": "Chef ②",
    "prompt": "The entire conversation and instructions should be provided in Italian. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "Ho bisogno di qualcuno che mi suggerisca ricette gustose, che includano alimenti buoni dal punto di vista nutrizionale, ma che siano anche facili e non richiedano molto tempo, quindi adatte a persone impegnate come noi, e altri fattori come l'economicità, in modo che il piatto complessivo risulti sano ma anche economico.",
    "remark": "Chef"
  },
  "ru": {
    "title": "Шеф-повар ②",
    "prompt": "The entire conversation and instructions should be provided in Russian. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "Мне нужен человек, который мог бы предложить вкусные рецепты, включающие в себя продукты, полезные для питания, но при этом простые и не требующие много времени, что подходит для таких занятых людей, как мы, а также другие факторы, такие как экономичность, чтобы в итоге блюдо было здоровым, но при этом экономичным.",
    "remark": "Шеф-повар"
  },
  "pt": {
    "title": "Chefe de cozinha ②",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "Preciso de alguém que possa sugerir receitas saborosas que incluam alimentos que sejam bons para a nutrição, mas que também sejam fáceis e não consumam muito tempo, por isso são adequadas para pessoas ocupadas como nós, e outros factores, como a relação custo-benefício, para que o prato global acabe por ser saudável, mas também económico.",
    "remark": "Cozinheiro"
  },
  "hi": {
    "title": "बावर्ची②",
    "prompt": "The entire conversation and instructions should be provided in Hindi. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "मुझे किसी ऐसे व्यक्ति की आवश्यकता है जो स्वादिष्ट व्यंजनों का सुझाव दे सके, जिसमें ऐसा भोजन शामिल हो जो पोषण के लिए अच्छा हो, लेकिन आसान भी हो और समय लेने वाला न हो, हमारे जैसे व्यस्त लोगों के लिए उपयुक्त हो, लागत प्रभावशीलता जैसे अन्य कारकों के साथ, इसलिए समग्र व्यंजन अंततः स्वस्थ तो बनता है, लेकिन साथ ही किफायती भी होता है।",
    "remark": "बावर्ची"
  },
  "ar": {
    "title": "الشيف",
    "prompt": "The entire conversation and instructions should be provided in Arabic. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "أحتاج إلى شخص ليتمكن من اقتراح وصفات لذيذة ، تتضمن طعامًا مفيدًا للتغذية ، ولكنها أيضًا سهلة ولا تستغرق وقتًا طويلاً ، لذا فهي مناسبة للأشخاص المشغولين مثلنا ، مع عوامل أخرى مثل الفعالية من حيث التكلفة ، وبالتالي فإن الطبق الكلي ينتهي بك الأمر في أن تكون صحية ، ولكن اقتصادية في نفس الوقت.",
    "remark": "طاه"
  },
  "bn": {
    "title": "শেফ②",
    "prompt": "The entire conversation and instructions should be provided in Bengali. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ",
    "description": "আমার এমন কাউকে দরকার যাতে সুস্বাদু, যে খাবারগুলি পুষ্টির জন্য ভাল, কিন্তু সহজ এবং সময়সাপেক্ষ নয়, আমাদের মতো ব্যস্ত লোকেদের জন্য তাই উপযুক্ত, খরচ কার্যকারিতার মতো অন্যান্য কারণগুলির সাথে, তাই সামগ্রিক খাবারের জন্য সুস্বাদু রেসিপিগুলির পরামর্শ দিতে সক্ষম শেষ পর্যন্ত সুস্থ, কিন্তু একই সময়ে অর্থনৈতিক।",
    "remark": "পাচক"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chef",
  "tags": [
    "living"
  ],
  "id": 59,
  "weight": 202
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
