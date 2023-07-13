import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "花匠",
    "prompt": "Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Respond in Chinese. Requested information - [花卉要求]",
    "description": "呼叫有专业插花经验的人员协助，以构建美丽的花束，拥有令人愉悦的香味和审美吸引力，并根据喜好保持较长的时间；不仅如此，还建议有关装饰方案的想法，呈现现代设计，同时满足客户的满意度。",
    "remark": "提供花卉建议"
  },
  "en": {
    "title": "Florist",
    "prompt": "Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ",
    "remark": "Provide floral advice."
  },
  "ja": {
    "title": "GARDENER",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "フラワーアレンジメントの経験を積んだプロに頼めば、好みに合わせて香りや美しさ、長持ちする花束を作るだけでなく、モダンなデザインでお客様の満足を得られる飾り方を提案することも可能です。",
    "remark": "花に関するアドバイスの提供"
  },
  "ko": {
    "title": "정원사",
    "prompt": "The entire conversation and instructions should be provided in Korean. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "꽃꽂이 경험이 있는 전문가의 도움을 받아 향기와 미적 매력이 좋고 취향에 따라 오래도록 유지되는 아름다운 부케를 구성하고, 고객의 만족도를 만족시키면서 현대적인 디자인을 제시하는 장식 솔루션에 대한 아이디어를 제안합니다.",
    "remark": "꽃에 대한 조언 제공"
  },
  "es": {
    "title": "jardinero",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - .",
    "description": "Solicite la ayuda de alguien con experiencia en arreglos florales profesionales para construir hermosos ramos con una fragancia agradable y un atractivo estético y para conservarlos durante un período de tiempo más largo según sus preferencias; no solo esto, sino también para sugerir ideas sobre esquemas de decoración, presentando un estilo moderno. diseño, al mismo tiempo cumplir con la satisfacción del cliente.",
    "remark": "Dar consejos sobre flores"
  },
  "fr": {
    "title": "jardinier",
    "prompt": "The entire conversation and instructions should be provided in French. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "Faites appel à un professionnel expérimenté dans l'art floral pour composer de beaux bouquets au parfum agréable et à l'attrait esthétique, qui resteront plus longtemps en place, selon les préférences ; mais aussi pour suggérer des idées d'arrangements décoratifs qui présentent un design moderne tout en satisfaisant le client.",
    "remark": "Fournir des conseils floraux"
  },
  "de": {
    "title": "Gärtner",
    "prompt": "The entire conversation and instructions should be provided in German. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "Wenden Sie sich an einen Fachmann mit Erfahrung im Blumenbinden, um schöne Sträuße zusammenzustellen, die angenehm duften, ästhetisch ansprechend sind und je nach Vorliebe lange halten; und nicht nur das, sondern auch um Ideen für Dekorationen vorzuschlagen, die ein modernes Design präsentieren und gleichzeitig die Zufriedenheit des Kunden erfüllen.",
    "remark": "Floristische Beratung"
  },
  "it": {
    "title": "giardiniere",
    "prompt": "The entire conversation and instructions should be provided in Italian. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "Richiedere l&#39;assistenza di una persona esperta in composizioni floreali professionali per realizzare bellissimi bouquet con gradevole profumo ed estetica e da conservare per un periodo di tempo più lungo a seconda delle preferenze; non solo questo, ma anche suggerire idee su schemi di decorazione, presentando un moderno design, allo stesso tempo soddisfare la soddisfazione del cliente.",
    "remark": "Fornisci consigli sui fiori"
  },
  "ru": {
    "title": "садовник",
    "prompt": "The entire conversation and instructions should be provided in Russian. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "Обратитесь за помощью к человеку, имеющему опыт профессиональной аранжировки цветов, чтобы составить красивые букеты с приятным ароматом и эстетической привлекательностью и хранить их в течение более длительного периода времени в соответствии с предпочтениями; не только это, но и предложить идеи по схемам украшения, представляя современный дизайн, в то же время удовлетворение потребностей клиентов.",
    "remark": "Дайте совет по цветам"
  },
  "pt": {
    "title": "jardineiro",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "Peça a ajuda de alguém experiente em arranjos florais profissionais para construir lindos buquês com fragrância agradável e apelo estético e conservar por mais tempo de acordo com a preferência; não só isso, mas também para sugerir idéias sobre esquemas de decoração, apresentando um estilo moderno design, ao mesmo tempo atender a satisfação do cliente.",
    "remark": "Fornecer conselhos sobre flores"
  },
  "hi": {
    "title": "माली",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "मनभावन खुशबू और सौन्दर्यात्मक अपील के साथ सुंदर गुलदस्ते बनाने और पसंद के अनुसार लंबे समय तक रखने के लिए पेशेवर फूलों की व्यवस्था में अनुभवी किसी व्यक्ति की सहायता के लिए कॉल करें; इतना ही नहीं, बल्कि आधुनिक प्रस्तुत करने वाली सजावट योजनाओं के बारे में सुझाव भी दें। डिज़ाइन, साथ ही ग्राहकों की संतुष्टि को पूरा करें।",
    "remark": "फूल सलाह प्रदान करें"
  },
  "ar": {
    "title": "بستاني",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "اطلب مساعدة شخص من ذوي الخبرة في تنسيق الزهور المحترفة لبناء باقات جميلة مع عطر مبهج وجاذبية جمالية والاحتفاظ بها لفترة أطول من الوقت حسب التفضيل ؛ ليس هذا فقط ، ولكن أيضًا لاقتراح أفكار حول مخططات التزيين ، وتقديم مظهر عصري التصميم ، في نفس الوقت تلبية رضا العملاء.",
    "remark": "تقديم المشورة بشأن الزهور"
  },
  "bn": {
    "title": "মালী",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Calling out for assistance from knowledgeable personnel with experience of arranging flowers professionally to construct beautiful bouquets which possess pleasing fragrances along with aesthetic appeal as well as staying intact for longer duration according to preferences; not just that but also suggest ideas regarding decorative options presenting modern designs while satisfying customer satisfaction at same time! Requested information - ..",
    "description": "আনন্দদায়ক সুগন্ধি এবং নান্দনিক আবেদন সহ সুন্দর তোড়া তৈরি করতে এবং পছন্দ অনুসারে দীর্ঘ সময়ের জন্য রাখার জন্য পেশাদার ফুল সাজানোর জন্য অভিজ্ঞ কারও সহায়তার জন্য কল করুন; শুধু তাই নয়, একটি আধুনিক উপস্থাপনা সাজানোর পরিকল্পনা সম্পর্কে ধারণার পরামর্শ দিতে ডিজাইন, একই সময়ে গ্রাহকের সন্তুষ্টি পূরণ করুন।",
    "remark": "ফুলের পরামর্শ প্রদান করুন"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-florist",
  "tags": [
    "professional"
  ],
  "id": 165,
  "weight": 136
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
