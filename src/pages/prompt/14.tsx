import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "あなたには、スタンドアップコメディアンとして活躍してもらいたい。私はあなたに時事問題に関するいくつかのトピックを提供しますので、あなたはウィット、創造力、観察力を駆使して、これらのトピックに基づいたルーティンを作り上げてください。また、観客がより親しみやすく魅力的なショーにするために、個人的な逸話や経験をショーに取り入れるようにする必要があります。私の最初の条件は「スタンドアップコメディのテーマ」です。",
    "remark": "あるテーマをもとにユーモラスなスタンドアップコメディをアウトプットし、日常生活の要素を取り入れることで、観客の共感性を高めることを心がける。"
  },
  "ko": {
    "title": "토크쇼",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "스탠드업 코미디언으로 활동해 주세요. 시사와 관련된 여러 가지 주제를 제공할 테니 재치, 창의력, 관찰력을 발휘하여 이러한 주제를 바탕으로 루틴을 만들면 됩니다. 또한 청중이 더 공감하고 몰입할 수 있도록 개인적인 일화나 경험을 쇼에 녹여내야 합니다. 첫 번째 요건은 '스탠드업 코미디 테마'입니다.",
    "remark": "특정 주제를 바탕으로 유머러스한 스탠드업 코미디를 연출하고, 일상 속 요소를 접목해 관객의 공감대를 높일 수 있도록 노력하세요."
  },
  "es": {
    "title": "talk show (préstamo)",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Spanish. My first request is ",
    "description": "Me gustaría que hicieras de cómico. Le proporcionaré una serie de temas relacionados con la actualidad y usted utilizará su ingenio, creatividad y capacidad de observación para crear un número basado en esos temas. También deberás asegurarte de incorporar al programa anécdotas o experiencias personales para hacerlo más cercano y atractivo para el público. Mi primer requisito es \"temas de talk show",
    "remark": "Para un tema concreto, elabora comedias humorísticas basadas en ese tema e intenta incorporar elementos de la vida cotidiana para aumentar el sentimiento de empatía con el público."
  },
  "fr": {
    "title": "talk show (mot emprunté)",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in French. My first request is ",
    "description": "J'aimerais que vous jouiez le rôle d'un humoriste. Je vous fournirai un certain nombre de sujets liés à l'actualité et vous utiliserez votre esprit, votre créativité et votre sens de l'observation pour créer un numéro basé sur ces sujets. Vous devrez également vous assurer d'incorporer des anecdotes ou des expériences personnelles dans le programme afin de le rendre plus compréhensible et plus attrayant pour le public. Ma première exigence est \"sujets de talk-show",
    "remark": "Pour un sujet particulier, produisez une comédie humoristique basée sur ce sujet et essayez d'incorporer des éléments de la vie quotidienne pour renforcer le sentiment d'empathie avec le public."
  },
  "de": {
    "title": "Talkshow (Lehnwort)",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in German. My first request is ",
    "description": "Ich möchte, dass Sie als Stand-up-Comedian auftreten. Ich werde Ihnen eine Reihe von Themen zu aktuellen Ereignissen vorgeben, und Sie werden Ihren Witz, Ihre Kreativität und Ihre Beobachtungsgabe einsetzen, um ein Programm zu diesen Themen zu gestalten. Sie sollten auch sicherstellen, dass Sie persönliche Anekdoten oder Erfahrungen in das Programm einfließen lassen, um es für das Publikum nachvollziehbar und ansprechend zu machen. Meine erste Anforderung lautet \"Talkshow-Themen\".",
    "remark": "Geben Sie zu einem bestimmten Thema eine humorvolle Stand-up-Comedy ab, die auf diesem Thema basiert, und versuchen Sie, Elemente aus dem täglichen Leben einzubeziehen, um das Einfühlungsvermögen des Publikums zu steigern."
  },
  "it": {
    "title": "talk show (parola d'ordine)",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Italian. My first request is ",
    "description": "Vorrei che vi comportaste come un cabarettista. Vi fornirò una serie di argomenti legati all'attualità e voi dovrete usare la vostra arguzia, creatività e capacità di osservazione per creare un numero basato su questi argomenti. Dovrete anche assicurarvi di incorporare nel programma aneddoti o esperienze personali per renderlo più relazionabile e coinvolgente per il pubblico. Il mio primo requisito è \"argomenti da talk show\".",
    "remark": "Per un particolare argomento, produrre stand-up comedy umoristiche basate su quel tema e cercare di incorporare elementi di vita quotidiana per aumentare il senso di empatia con il pubblico."
  },
  "ru": {
    "title": "ток-шоу (заимствованное слово)",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Russian. My first request is ",
    "description": "Я хочу, чтобы вы выступили в роли стендап-комика. Я предложу вам ряд тем, связанных с текущими событиями, а вы, используя свое остроумие, творческий подход и наблюдательность, создадите программу, основанную на этих темах. Вы также должны убедиться, что включили в программу личные анекдоты или опыт, чтобы сделать ее более доступной и увлекательной для аудитории. Мое первое требование - \"темы для ток-шоу\".",
    "remark": "Применительно к определенной теме выпустить юмористический стендап-комик, основанный на этой теме, и постараться включить в него элементы повседневной жизни, чтобы усилить чувство сопереживания аудитории."
  },
  "pt": {
    "title": "talk show (palavra emprestada)",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Portuguese. My first request is ",
    "description": "Gostaria que actuasse como um comediante de stand-up. Vou apresentar-lhe uma série de temas relacionados com a atualidade e você deverá usar a sua inteligência, criatividade e capacidade de observação para criar um número baseado nesses temas. Deves também certificar-te de que incorporas anedotas ou experiências pessoais no programa, para o tornares mais identificável e cativante para o público. O meu primeiro requisito é \"temas para talk shows",
    "remark": "Para um tema específico, produzir comédia humorística de stand-up com base nesse tema e tentar incorporar elementos da vida quotidiana para aumentar o sentimento de empatia com o público."
  },
  "hi": {
    "title": "टॉक शो",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Hindi. My first request is ",
    "description": "मैं चाहता हूं कि आप एक स्टैंड-अप कॉमेडियन बनें। मैं आपको समसामयिक घटनाओं से संबंधित विषय प्रदान करूंगा जिससे आप अपनी बुद्धि, रचनात्मकता और अवलोकन कौशल का उपयोग करके एक दिनचर्या बना सकेंगे। आपको शो को दर्शकों के लिए अधिक प्रासंगिक और आकर्षक बनाने के लिए इसमें व्यक्तिगत उपाख्यानों या अनुभवों को शामिल करना भी सुनिश्चित करना चाहिए। मेरा पहला अनुरोध &#39;टॉक शो थीम&#39; है",
    "remark": "एक निश्चित विषय के लिए, इस विषय पर आधारित एक हास्य टॉक शो प्रस्तुत करें, और दर्शकों की अनुनाद की भावना को बढ़ाने के लिए दैनिक जीवन के तत्वों को शामिल करने का प्रयास करें।"
  },
  "ar": {
    "title": "برنامج حواري",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Arabic. My first request is ",
    "description": "أريدك أن تكون كوميديًا ستاند أب. سأزودك بالموضوعات المتعلقة بالأحداث الجارية والتي ستستخدم من خلالها ذكائك وإبداعك ومهاراتك في الملاحظة لإنشاء روتين. يجب عليك أيضًا التأكد من دمج الحكايات أو التجارب الشخصية في العرض لجعله أكثر ارتباطًا بالمشاهد وجاذبيته. طلبي الأول هو &quot;موضوع البرنامج الحواري&quot;",
    "remark": "بالنسبة لموضوع معين ، قم بإخراج برنامج حواري فكاهي بناءً على هذا الموضوع ، وحاول دمج عناصر من الحياة اليومية لتعزيز إحساس الجمهور بالصدى."
  },
  "bn": {
    "title": "আলোচনা অনুষ্ঠান",
    "prompt": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. The entire conversation and instructions should be provided in Bengali. My first request is ",
    "description": "আমি আপনাকে একজন স্ট্যান্ড আপ কমেডিয়ান হতে চাই। আমি আপনাকে বর্তমান ঘটনাগুলির সাথে সম্পর্কিত বিষয়গুলি সরবরাহ করব যেখান থেকে আপনি একটি রুটিন তৈরি করতে আপনার বুদ্ধি, সৃজনশীলতা এবং পর্যবেক্ষণ দক্ষতা ব্যবহার করবেন। আপনার ব্যক্তিগত উপাখ্যান বা অভিজ্ঞতাগুলিকে শোতে অন্তর্ভুক্ত করার বিষয়টি নিশ্চিত করা উচিত যাতে এটি দর্শকের কাছে আরও সম্পর্কিত এবং আকর্ষক হয়। আমার প্রথম অনুরোধ &#39;টক শো থিম&#39;",
    "remark": "একটি নির্দিষ্ট বিষয়ের জন্য, এই বিষয়ের উপর ভিত্তি করে একটি হাস্যরসাত্মক টক শো আউটপুট করুন এবং শ্রোতাদের অনুরণনের অনুভূতি বাড়ানোর জন্য দৈনন্দিন জীবনের উপাদানগুলিকে অন্তর্ভুক্ত করার চেষ্টা করুন৷"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-stand-up-comedian",
  "tags": [
    "article"
  ],
  "id": 14,
  "weight": 1449
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
