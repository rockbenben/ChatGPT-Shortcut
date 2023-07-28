import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "编剧",
    "prompt": "I want you to act as a screenwriter and respond in Chinese. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. My first request is '剧本主题'",
    "description": "我希望你能作为一个编剧。你将为一部长篇电影或网络剧开发一个吸引观众的有创意的剧本。首先要想出有趣的人物、故事的背景、人物之间的对话等。一旦你的角色发展完成--创造一个激动人心的故事情节，充满曲折，让观众保持悬念，直到结束。我的第一个要求是 '剧本主题'",
    "remark": "根据主题创作一个包含故事背景、人物以及对话的剧本。"
  },
  "en": {
    "title": "Screenwriter",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. My first request is ",
    "remark": "Create a script based on the theme that contains the setting, characters and dialogue."
  },
  "ja": {
    "title": "脚本家",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "脚本家として活躍してほしい。長編映画やウェブシリーズのために、観客にアピールするクリエイティブな脚本を開発していただきます。まずは、面白いキャラクター、物語の背景、キャラクター同士の会話などを考えることから始めてください。キャラクター開発が完了したら、ひねりの効いたエキサイティングなストーリーを作り、観客を最後まで飽きさせないようにしてください。私が最初に求めるのは「脚本のテーマ」です。",
    "remark": "テーマに沿って、設定や登場人物、セリフなどを盛り込んだ台本を作成する。"
  },
  "ko": {
    "title": "시나리오 작가",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "시나리오 작가로 일하고 싶습니다. 관객에게 어필할 수 있는 장편 영화나 웹 시리즈를 위한 창의적인 대본을 개발하게 됩니다. 흥미로운 캐릭터, 이야기의 배경, 캐릭터 간의 대화 등을 생각해내는 것부터 시작하세요. 캐릭터 개발이 완료되면 마지막까지 관객을 긴장하게 만드는 반전과 반전으로 가득한 흥미진진한 스토리를 만들어 보세요. 첫 번째 요건은 '대본의 주제'입니다.",
    "remark": "설정, 캐릭터 및 대사가 포함된 테마를 기반으로 스크립트를 만듭니다."
  },
  "es": {
    "title": "cinematógrafo",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Spanish. My first request is ",
    "description": "Quiero que trabajes como guionista. Desarrollarás un guión creativo para un largometraje o una serie web que atraiga al público. Empieza por idear personajes interesantes, el escenario de la historia, el diálogo entre los personajes, etc. Una vez que hayas desarrollado los personajes, crea un argumento emocionante lleno de giros y sorpresas que mantenga al público en vilo hasta el final. Mi primer requisito es \"el tema del guión\".",
    "remark": "Crea un guión basado en el tema que incluya el escenario, los personajes y el diálogo."
  },
  "fr": {
    "title": "directeur de la photographie",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in French. My first request is ",
    "description": "Je veux que vous travailliez comme scénariste. Vous développerez un scénario créatif pour un long métrage ou une série en ligne qui plaira à un public. Commencez par imaginer des personnages intéressants, le cadre de l'histoire, le dialogue entre les personnages, etc. Une fois le développement des personnages terminé, créez un scénario passionnant, plein de rebondissements, qui tiendra le public en haleine jusqu'à la fin. Ma première exigence est le \"thème du scénario",
    "remark": "Créer un scénario basé sur le thème, comprenant le cadre, les personnages et le dialogue."
  },
  "de": {
    "title": "Kinematograph",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in German. My first request is ",
    "description": "Ich möchte, dass Sie als Drehbuchautor arbeiten. Sie werden ein kreatives Drehbuch für einen Spielfilm oder eine Webserie entwickeln, das ein Publikum anspricht. Beginnen Sie damit, sich interessante Charaktere, den Schauplatz der Geschichte, Dialoge zwischen den Figuren usw. auszudenken. Sobald die Entwicklung der Charaktere abgeschlossen ist, entwerfen Sie eine spannende Geschichte voller Wendungen, die das Publikum bis zum Ende in Atem hält. Meine erste Anforderung ist das Thema des Drehbuchs.",
    "remark": "Erstellen Sie ein Skript zum Thema, das den Schauplatz, die Figuren und den Dialog enthält."
  },
  "it": {
    "title": "direttore della fotografia",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Italian. My first request is ",
    "description": "Voglio che tu lavori come sceneggiatore. Dovrai sviluppare una sceneggiatura creativa per un lungometraggio o una serie web che sia interessante per il pubblico. Iniziate con l'ideazione di personaggi interessanti, l'ambientazione della storia, i dialoghi tra i personaggi, ecc. Una volta completato lo sviluppo dei personaggi, create una trama emozionante e ricca di colpi di scena che tenga il pubblico con il fiato sospeso fino alla fine. Il mio primo requisito è \"il tema della sceneggiatura\".",
    "remark": "Creare una sceneggiatura basata sul tema che includa l'ambientazione, i personaggi e il dialogo."
  },
  "ru": {
    "title": "кинематографист",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Russian. My first request is ",
    "description": "Я хочу, чтобы вы работали сценаристом. Вам предстоит разработать креативный сценарий для художественного фильма или веб-сериала, который будет интересен аудитории. Начните с придумывания интересных персонажей, места действия, диалогов между героями и т.д. После завершения разработки персонажей создайте захватывающую сюжетную линию, полную поворотов, которая будет держать зрителей в напряжении до самого конца. Мое первое требование - \"тема сценария\".",
    "remark": "Создать сценарий по теме, включающий обстановку, персонажей и диалог."
  },
  "pt": {
    "title": "diretor de fotografia",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Portuguese. My first request is ",
    "description": "Quero que trabalhe como argumentista. Vais desenvolver um guião criativo para uma longa-metragem ou uma série na Web que atraia um público. Comece por criar personagens interessantes, o cenário da história, o diálogo entre as personagens, etc. Quando o desenvolvimento das personagens estiver concluído, cria uma história emocionante, cheia de reviravoltas, que mantenha o público em suspense até ao fim. O meu primeiro requisito é \"o tema do guião",
    "remark": "Criar um guião baseado no tema que inclua o cenário, as personagens e o diálogo."
  },
  "hi": {
    "title": "पटकथा लेखक",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Hindi. My first request is ",
    "description": "मैं चाहता हूं कि आप एक पटकथा लेखक बनें। आप एक फीचर-लेंथ फिल्म या वेब श्रृंखला के लिए एक अभिनव स्क्रिप्ट विकसित करेंगे जो दर्शकों को आकर्षित करेगी। दिलचस्प पात्रों, कहानी की पृष्ठभूमि, पात्रों के बीच संवाद आदि के साथ शुरुआत करें। एक बार जब आपके चरित्र का विकास पूरा हो जाए - तो एक रोमांचक कहानी बनाएं, जो उतार-चढ़ाव से भरी हो, जो दर्शकों को अंत तक रहस्य में रखे। मेरा पहला अनुरोध &#39;स्क्रिप्ट थीम&#39; है",
    "remark": "एक पटकथा बनाएं जिसमें विषय के आधार पर पृष्ठभूमि, पात्र और संवाद शामिल हों।"
  },
  "ar": {
    "title": "كاتب السيناريو",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Arabic. My first request is ",
    "description": "أريدك أن تكون كاتب سيناريو. ستقوم بتطوير نص مبتكر لفيلم طويل أو سلسلة ويب ستأسر الجماهير. ابدأ بالخروج بشخصيات مثيرة للاهتمام ، وخلفية القصة ، والحوار بين الشخصيات ، وما إلى ذلك. بمجرد اكتمال تطوير شخصيتك - قم بإنشاء قصة مثيرة مليئة بالتحولات والمنعطفات ، والتي ستبقي الجمهور في حالة تشويق حتى النهاية. طلبي الأول هو &quot;موضوع البرنامج النصي&quot;",
    "remark": "قم بإنشاء سيناريو يتضمن الخلفية والشخصيات والحوار بناءً على الموضوع."
  },
  "bn": {
    "title": "চিত্রনাট্যকার",
    "prompt": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can captivate its viewers. Start with coming up with interesting characters, the setting of the story, dialogues between the characters etc. Once your character development is complete - create an exciting storyline filled with twists and turns that keeps the viewers in suspense until the end. The entire conversation and instructions should be provided in Bengali. My first request is ",
    "description": "আমি আপনাকে একজন চিত্রনাট্যকার হতে চাই। আপনি একটি বৈশিষ্ট্য-দৈর্ঘ্য চলচ্চিত্র বা ওয়েব সিরিজের জন্য একটি উদ্ভাবনী স্ক্রিপ্ট বিকাশ করবেন যা দর্শকদের মোহিত করবে। আকর্ষণীয় চরিত্র, গল্পের পটভূমি, চরিত্রগুলির মধ্যে কথোপকথন ইত্যাদি নিয়ে আসা শুরু করুন। একবার আপনার চরিত্রের বিকাশ সম্পূর্ণ হয়ে গেলে - একটি উত্তেজনাপূর্ণ গল্পরেখা তৈরি করুন, টুইস্ট এবং টার্নে পূর্ণ, যা দর্শকদের শেষ পর্যন্ত সাসপেন্সে রাখবে। আমার প্রথম অনুরোধ &#39;স্ক্রিপ্ট থিম&#39;",
    "remark": "একটি চিত্রনাট্য তৈরি করুন যাতে থিমের উপর ভিত্তি করে পটভূমি, অক্ষর এবং সংলাপ অন্তর্ভুক্ত থাকে।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-screenwriter",
  "tags": [
    "article"
  ],
  "id": 16,
  "weight": 1175
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
