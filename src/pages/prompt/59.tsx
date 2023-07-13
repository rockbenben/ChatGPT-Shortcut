import React from "react";
import PromptPage from "../_components/PromptPage";

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
    "prompt": "The entire conversation and instructions should be provided in Japanese. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "栄養面はもちろん、忙しくてもできる簡単なレシピや、コスパの良さなど、ヘルシーでありながら経済的なレシピを提案してくれる人が必要だと思いました。",
    "remark": "シェフ"
  },
  "ko": {
    "title": "셰프 ②",
    "prompt": "The entire conversation and instructions should be provided in Korean. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "영양학적으로 유익하면서도 간편하고 시간이 많이 걸리지 않아 우리처럼 바쁜 사람들에게 적합한 음식이 포함된 맛있는 레시피를 제안해 줄 수 있는 사람이 필요했고, 가성비 등 다른 요소도 고려해서 건강하면서도 경제적인 요리를 만들 수 있도록 했습니다.",
    "remark": "셰프"
  },
  "es": {
    "title": "Chef②",
    "prompt": "The entire conversation and instructions should be provided in Spanish. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – .",
    "description": "Necesito a alguien que pueda sugerir recetas que sean deliciosas, que incluyan alimentos que sean buenos para la nutrición, pero que también sean fáciles y no requieran mucho tiempo, por lo que son adecuados para personas ocupadas como nosotros, con otros factores como la rentabilidad, por lo que el plato general acaba siendo Saludable, pero económico a la vez.",
    "remark": "Cocinero"
  },
  "fr": {
    "title": "Chef ②",
    "prompt": "The entire conversation and instructions should be provided in French. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "J'ai besoin de quelqu'un qui puisse me suggérer des recettes savoureuses qui incluent des aliments bons pour la nutrition, mais qui sont également faciles à réaliser et ne prennent pas beaucoup de temps pour convenir à des personnes occupées comme nous, et d'autres facteurs tels que le rapport coût-efficacité pour que l'ensemble du plat soit sain mais aussi économique.",
    "remark": "Chef cuisinier"
  },
  "de": {
    "title": "Chefkoch ②",
    "prompt": "The entire conversation and instructions should be provided in German. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "Ich brauche jemanden, der schmackhafte Rezepte vorschlägt, die Lebensmittel enthalten, die gut für die Ernährung sind, aber auch einfach und nicht zeitaufwendig, so dass sie für vielbeschäftigte Menschen wie uns geeignet sind, und andere Faktoren wie Kosteneffizienz, so dass das gesamte Gericht am Ende gesund, aber auch wirtschaftlich ist.",
    "remark": "Chefkoch"
  },
  "it": {
    "title": "Chef②",
    "prompt": "The entire conversation and instructions should be provided in Italian. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "Ho bisogno di qualcuno che sappia suggerire ricette deliziose, che includano alimenti che fanno bene alla nutrizione, ma che siano anche facili e non dispendiose in termini di tempo, quindi adatte a persone impegnate come noi, con altri fattori come l&#39;economicità, quindi il piatto complessivo finisce per essere salutare, ma allo stesso tempo economico.",
    "remark": "Cuoco"
  },
  "ru": {
    "title": "Шеф-повар②",
    "prompt": "The entire conversation and instructions should be provided in Russian. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "Мне нужен кто-то, кто мог бы предложить вкусные рецепты, которые включают продукты, полезные для питания, но также простые и не требующие много времени, поэтому подходящие для таких занятых людей, как мы, с другими факторами, такими как экономическая эффективность, так что в целом блюдо в итоге получается здоровым, но в то же время экономичным.",
    "remark": "шеф-повар"
  },
  "pt": {
    "title": "Chef②",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "Preciso de alguém que possa sugerir receitas deliciosas, que incluam alimentos bons para a nutrição, mas também fáceis e não demoradas, adequadas para pessoas ocupadas como nós, com outros fatores como custo-benefício, portanto, o prato geral acaba sendo Saudável, mas econômico ao mesmo tempo.",
    "remark": "Chefe de cozinha"
  },
  "hi": {
    "title": "बावर्ची②",
    "prompt": "The entire conversation and instructions should be provided in Hindi. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "मुझे किसी ऐसे व्यक्ति की आवश्यकता है जो स्वादिष्ट व्यंजनों का सुझाव दे सके, जिसमें ऐसा भोजन शामिल हो जो पोषण के लिए अच्छा हो, लेकिन आसान भी हो और समय लेने वाला न हो, हमारे जैसे व्यस्त लोगों के लिए उपयुक्त हो, लागत प्रभावशीलता जैसे अन्य कारकों के साथ, इसलिए समग्र व्यंजन अंततः स्वस्थ तो बनता है, लेकिन साथ ही किफायती भी होता है।",
    "remark": "बावर्ची"
  },
  "ar": {
    "title": "الشيف",
    "prompt": "The entire conversation and instructions should be provided in Arabic. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "أحتاج إلى شخص ليتمكن من اقتراح وصفات لذيذة ، تتضمن طعامًا مفيدًا للتغذية ، ولكنها أيضًا سهلة ولا تستغرق وقتًا طويلاً ، لذا فهي مناسبة للأشخاص المشغولين مثلنا ، مع عوامل أخرى مثل الفعالية من حيث التكلفة ، وبالتالي فإن الطبق الكلي ينتهي بك الأمر في أن تكون صحية ، ولكن اقتصادية في نفس الوقت.",
    "remark": "طاه"
  },
  "bn": {
    "title": "শেফ②",
    "prompt": "The entire conversation and instructions should be provided in Bengali. I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request – ..",
    "description": "আমার এমন কাউকে দরকার যাতে সুস্বাদু, যে খাবারগুলি পুষ্টির জন্য ভাল, কিন্তু সহজ এবং সময়সাপেক্ষ নয়, আমাদের মতো ব্যস্ত লোকেদের জন্য তাই উপযুক্ত, খরচ কার্যকারিতার মতো অন্যান্য কারণগুলির সাথে, তাই সামগ্রিক খাবারের জন্য সুস্বাদু রেসিপিগুলির পরামর্শ দিতে সক্ষম শেষ পর্যন্ত সুস্থ, কিন্তু একই সময়ে অর্থনৈতিক।",
    "remark": "পাচক"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chef",
  "tags": [
    "living"
  ],
  "id": 59,
  "weight": 190
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
