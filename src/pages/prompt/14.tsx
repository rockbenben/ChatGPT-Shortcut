import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "脱口秀",
    "prompt": "I want you to act as a stand-up comedian and respond in Chinese. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My first request is '脱口秀主题'",
    "description": "我想让你充当一个单口相声演员。我将为你提供一些与当前事件有关的话题，你将利用你的机智、创造力和观察能力，根据这些话题创作一个套路。你还应该确保将个人的轶事或经历融入到节目中，以使其更有亲和力，更能吸引观众。我的第一个要求是 '脱口秀主题'",
    "remark": "针对某个话题，输出基于该话题的幽默脱口秀，并尽量融入日常生活元素，以增强观众的共鸣感。"
  },
  "en": {
    "title": "Stand-up comedian",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My first request is ",
    "remark": "Output humorous stand-up comedy based on a certain topic, and try to incorporate elements of everyday life to enhance the audience's sense of empathy."
  },
  "ja": {
    "title": "トークショー",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Janpanese. My first request is ..",
    "description": "あなたには、スタンドアップコメディアンとして活躍してもらいたい。私はあなたに時事問題に関するいくつかのトピックを提供しますので、あなたはウィット、創造力、観察力を駆使して、これらのトピックに基づいたルーティンを作り上げてください。また、観客がより親しみやすく魅力的なショーにするために、個人的な逸話や経験をショーに取り入れるようにする必要があります。私の最初の条件は「スタンドアップコメディのテーマ」です。",
    "remark": "あるテーマをもとにユーモラスなスタンドアップコメディをアウトプットし、日常生活の要素を取り入れることで、観客の共感性を高めることを心がける。"
  },
  "ko": {
    "title": "토크쇼",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Korean. My first request is ..",
    "description": "스탠드업 코미디언으로 활동해 주세요. 시사와 관련된 여러 가지 주제를 제공할 테니 재치, 창의력, 관찰력을 발휘하여 이러한 주제를 바탕으로 루틴을 만들면 됩니다. 또한 청중이 더 공감하고 몰입할 수 있도록 개인적인 일화나 경험을 쇼에 녹여내야 합니다. 첫 번째 요건은 '스탠드업 코미디 테마'입니다.",
    "remark": "특정 주제를 바탕으로 유머러스한 스탠드업 코미디를 연출하고, 일상 속 요소를 접목해 관객의 공감대를 높일 수 있도록 노력하세요."
  },
  "es": {
    "title": "programa de entrevistas",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Spanish. My first request is .",
    "description": "Quiero que seas un comediante. Te proporcionaré temas relacionados con la actualidad a partir de los cuales utilizarás tu ingenio, creatividad y habilidades de observación para crear una rutina. También debe asegurarse de incorporar anécdotas o experiencias personales en el programa para que sea más identificable y atractivo para el espectador. Mi primera solicitud es &#39;tema de programa de entrevistas&#39;",
    "remark": "Para un tema determinado, produzca un programa de entrevistas humorístico basado en este tema e intente incorporar elementos de la vida diaria para mejorar el sentido de resonancia de la audiencia."
  },
  "fr": {
    "title": "talk show (mot emprunté)",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in French. My first request is ..",
    "description": "J'aimerais que vous jouiez le rôle d'un humoriste. Je vous fournirai un certain nombre de sujets liés à l'actualité et vous utiliserez votre esprit, votre créativité et votre sens de l'observation pour créer un numéro basé sur ces sujets. Vous devrez également vous assurer d'incorporer des anecdotes ou des expériences personnelles dans le programme afin de le rendre plus compréhensible et plus attrayant pour le public. Ma première exigence est \"sujets de talk-show",
    "remark": "Pour un sujet particulier, produisez une comédie humoristique basée sur ce sujet et essayez d'incorporer des éléments de la vie quotidienne pour renforcer le sentiment d'empathie avec le public."
  },
  "de": {
    "title": "Talkshow (Lehnwort)",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in German. My first request is ..",
    "description": "Ich möchte, dass Sie als Stand-up-Comedian auftreten. Ich werde Ihnen eine Reihe von Themen zu aktuellen Ereignissen vorgeben, und Sie werden Ihren Witz, Ihre Kreativität und Ihre Beobachtungsgabe einsetzen, um ein Programm zu diesen Themen zu gestalten. Sie sollten auch sicherstellen, dass Sie persönliche Anekdoten oder Erfahrungen in das Programm einfließen lassen, um es für das Publikum nachvollziehbar und ansprechend zu machen. Meine erste Anforderung lautet \"Talkshow-Themen\".",
    "remark": "Geben Sie zu einem bestimmten Thema eine humorvolle Stand-up-Comedy ab, die auf diesem Thema basiert, und versuchen Sie, Elemente aus dem täglichen Leben einzubeziehen, um das Einfühlungsvermögen des Publikums zu steigern."
  },
  "it": {
    "title": "talk show",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Italian. My first request is ..",
    "description": "Voglio che tu sia un cabarettista. Ti fornirò argomenti relativi agli eventi attuali da cui utilizzerai la tua intelligenza, creatività e capacità di osservazione per creare una routine. Dovresti anche assicurarti di incorporare aneddoti o esperienze personali nello spettacolo per renderlo più riconoscibile e coinvolgente per lo spettatore. La mia prima richiesta è &quot;tema talk show&quot;",
    "remark": "Per un determinato argomento, produci un talk show umoristico basato su questo argomento e cerca di incorporare elementi della vita quotidiana per migliorare il senso di risonanza del pubblico."
  },
  "ru": {
    "title": "ток-шоу",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Russian. My first request is ..",
    "description": "Я хочу, чтобы ты был стендап-комиком. Я предоставлю вам темы, связанные с текущими событиями, из которых вы будете использовать свое остроумие, креативность и наблюдательность для создания рутины. Вы также должны обязательно включить в шоу личные анекдоты или события, чтобы сделать его более понятным и привлекательным для зрителя. Мой первый запрос — «тема ток-шоу».",
    "remark": "Для определенной темы создайте юмористическое ток-шоу на эту тему и попытайтесь включить в него элементы повседневной жизни, чтобы усилить чувство резонанса у аудитории."
  },
  "pt": {
    "title": "programa de entrevista",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Portuguese. My first request is ..",
    "description": "Eu quero que você seja um comediante de stand-up. Fornecerei a você tópicos relacionados aos eventos atuais, dos quais você usará sua inteligência, criatividade e habilidades de observação para criar uma rotina. Você também deve incorporar anedotas ou experiências pessoais ao programa para torná-lo mais identificável e envolvente para o espectador. Meu primeiro pedido é &#39;tema de talk show&#39;",
    "remark": "Para um determinado tópico, produza um talk show humorístico baseado nesse tópico e tente incorporar elementos da vida cotidiana para aumentar o senso de ressonância do público."
  },
  "hi": {
    "title": "टॉक शो",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Hindi. My first request is ..",
    "description": "मैं चाहता हूं कि आप एक स्टैंड-अप कॉमेडियन बनें। मैं आपको समसामयिक घटनाओं से संबंधित विषय प्रदान करूंगा जिससे आप अपनी बुद्धि, रचनात्मकता और अवलोकन कौशल का उपयोग करके एक दिनचर्या बना सकेंगे। आपको शो को दर्शकों के लिए अधिक प्रासंगिक और आकर्षक बनाने के लिए इसमें व्यक्तिगत उपाख्यानों या अनुभवों को शामिल करना भी सुनिश्चित करना चाहिए। मेरा पहला अनुरोध &#39;टॉक शो थीम&#39; है",
    "remark": "एक निश्चित विषय के लिए, इस विषय पर आधारित एक हास्य टॉक शो प्रस्तुत करें, और दर्शकों की अनुनाद की भावना को बढ़ाने के लिए दैनिक जीवन के तत्वों को शामिल करने का प्रयास करें।"
  },
  "ar": {
    "title": "برنامج حواري",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Arabic. My first request is ..",
    "description": "أريدك أن تكون كوميديًا ستاند أب. سأزودك بالموضوعات المتعلقة بالأحداث الجارية والتي ستستخدم من خلالها ذكائك وإبداعك ومهاراتك في الملاحظة لإنشاء روتين. يجب عليك أيضًا التأكد من دمج الحكايات أو التجارب الشخصية في العرض لجعله أكثر ارتباطًا بالمشاهد وجاذبيته. طلبي الأول هو &quot;موضوع البرنامج الحواري&quot;",
    "remark": "بالنسبة لموضوع معين ، قم بإخراج برنامج حواري فكاهي بناءً على هذا الموضوع ، وحاول دمج عناصر من الحياة اليومية لتعزيز إحساس الجمهور بالصدى."
  },
  "bn": {
    "title": "আলোচনা অনুষ্ঠান",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Bengali. My first request is ..",
    "description": "আমি আপনাকে একজন স্ট্যান্ড আপ কমেডিয়ান হতে চাই। আমি আপনাকে বর্তমান ঘটনাগুলির সাথে সম্পর্কিত বিষয়গুলি সরবরাহ করব যেখান থেকে আপনি একটি রুটিন তৈরি করতে আপনার বুদ্ধি, সৃজনশীলতা এবং পর্যবেক্ষণ দক্ষতা ব্যবহার করবেন। আপনার ব্যক্তিগত উপাখ্যান বা অভিজ্ঞতাগুলিকে শোতে অন্তর্ভুক্ত করার বিষয়টি নিশ্চিত করা উচিত যাতে এটি দর্শকের কাছে আরও সম্পর্কিত এবং আকর্ষক হয়। আমার প্রথম অনুরোধ &#39;টক শো থিম&#39;",
    "remark": "একটি নির্দিষ্ট বিষয়ের জন্য, এই বিষয়ের উপর ভিত্তি করে একটি হাস্যরসাত্মক টক শো আউটপুট করুন এবং শ্রোতাদের অনুরণনের অনুভূতি বাড়ানোর জন্য দৈনন্দিন জীবনের উপাদানগুলিকে অন্তর্ভুক্ত করার চেষ্টা করুন৷"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-stand-up-comedian",
  "tags": [
    "article"
  ],
  "id": 14,
  "weight": 1361
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
