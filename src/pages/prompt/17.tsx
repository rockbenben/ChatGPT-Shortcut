import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "小说家",
    "prompt": "I want you to act as a novelist and respond in Chinese. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. My first request is '小说类型'",
    "description": "我希望你能作为一个小说家。你要想出有创意的、吸引人的故事，能够长时间吸引读者。你可以选择任何体裁，如幻想、浪漫、历史小说等--但目的是要写出有出色的情节线、引人入胜的人物和意想不到的高潮。我的第一个要求是 '小说类型'",
    "remark": "根据故事类型输出小说，例如奇幻、浪漫或历史等类型。"
  },
  "en": {
    "title": "Novelist",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. My first request is ",
    "remark": "Export fiction according to the type of story, such as fantasy, romance or historical."
  },
  "ja": {
    "title": "小説家",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Janpanese. My first request is ..",
    "description": "小説家として活躍してほしい。読者を長い間魅了できるような、創造的で魅力的な物語を考えてほしい。ファンタジー、ロマンス、ヒストリカル・フィクションなど、ジャンルは問いませんが、素晴らしいプロットライン、魅力的なキャラクター、予想外のクライマックスで書くことが目標です。私の最初の条件は「小説のジャンル」です。",
    "remark": "ファンタジー、ロマンス、歴史など、物語のジャンル別にフィクションをエクスポートします。"
  },
  "ko": {
    "title": "소설가",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Korean. My first request is ..",
    "description": "소설가로 일했으면 좋겠어요. 독자를 오랫동안 사로잡을 수 있는 창의적이고 매력적인 스토리를 구상하고 싶을 것입니다. 판타지, 로맨스, 역사 소설 등 어떤 장르를 선택하든 상관없지만, 목표는 훌륭한 줄거리와 매력적인 캐릭터, 예상치 못한 클라이맥스를 가진 글을 쓰는 것입니다. 첫 번째 요건은 '소설의 장르'입니다.",
    "remark": "판타지, 로맨스, 역사 등 스토리 장르에 따라 소설을 내보낼 수 있습니다."
  },
  "es": {
    "title": "novelista",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Spanish. My first request is .",
    "description": "Quiero que seas novelista. Desea crear historias creativas y atractivas que mantengan a los lectores interesados durante mucho tiempo. Puedes elegir cualquier género, como fantasía, romance, ficción histórica, etc., pero trata de escribir con una gran trama, personajes convincentes y un clímax inesperado. Mi primera solicitud es &#39;Género de ficción&#39;",
    "remark": "Produzca ficción basada en el género de la historia, como fantasía, romance o historia."
  },
  "fr": {
    "title": "dramaturge",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in French. My first request is ..",
    "description": "Je vous propose de travailler comme romancier. Vous devez proposer des histoires créatives et attrayantes qui captiveront les lecteurs pendant longtemps. Vous pouvez choisir n'importe quel genre - fantastique, romantisme, fiction historique, etc. - mais l'objectif est d'écrire d'excellentes intrigues, des personnages convaincants et un dénouement inattendu. Ma première exigence est le \"genre de fiction",
    "remark": "Exporter les romans en fonction du type d'histoire, par exemple fantastique, romanesque ou historique."
  },
  "de": {
    "title": "Dramatiker",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in German. My first request is ..",
    "description": "Ich möchte, dass Sie als Romanautor arbeiten. Sie wollen sich kreative, fesselnde Geschichten ausdenken, die die Leser für lange Zeit fesseln werden. Sie können ein beliebiges Genre wählen - Fantasy, Liebesromane, historische Romane usw. -, aber das Ziel ist es, einen hervorragenden Handlungsstrang, fesselnde Figuren und einen unerwarteten Höhepunkt zu schreiben. Meine erste Bedingung ist das Genre \"Belletristik\".",
    "remark": "Exportieren Sie Romane nach der Art der Geschichte, z. B. Fantasy, Liebesromane oder historische Romane."
  },
  "it": {
    "title": "romanziere",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Italian. My first request is ..",
    "description": "Voglio che tu sia un romanziere. Vuoi inventare storie creative e coinvolgenti che manterranno i lettori coinvolti per molto tempo. Puoi scegliere qualsiasi genere, come fantasy, romanticismo, narrativa storica, ecc., ma mira a scrivere con una trama fantastica, personaggi avvincenti e un climax inaspettato. La mia prima richiesta è &#39;Fiction Genre&#39;",
    "remark": "Produci narrativa basata sul genere della storia, come fantasy, romanticismo o storia."
  },
  "ru": {
    "title": "романист",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Russian. My first request is ..",
    "description": "Я хочу, чтобы ты стал писателем. Вы хотите придумывать креативные, увлекательные истории, которые надолго увлекут читателей. Вы можете выбрать любой жанр, например фэнтези, мелодраму, историческую фантастику и т. д., но старайтесь писать с отличной сюжетной линией, убедительными персонажами и неожиданной кульминацией. Мой первый запрос: «Жанр фантастики».",
    "remark": "Вывод художественной литературы на основе жанра рассказа, такого как фэнтези, мелодрама или история."
  },
  "pt": {
    "title": "romancista",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Portuguese. My first request is ..",
    "description": "Eu quero que você seja um romancista. Você deseja criar histórias criativas e envolventes que manterão os leitores envolvidos por um longo tempo. Você pode escolher qualquer gênero, como fantasia, romance, ficção histórica, etc. - mas procure escrever com um ótimo enredo, personagens atraentes e um clímax inesperado. Meu primeiro pedido é &#39;Gênero Ficção&#39;",
    "remark": "Ficção de saída com base no gênero da história, como fantasia, romance ou história."
  },
  "hi": {
    "title": "उपन्यासकार",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Hindi. My first request is ..",
    "description": "मैं चाहता हूं कि आप उपन्यासकार बनें। आप रचनात्मक, आकर्षक कहानियाँ लेकर आना चाहते हैं जो पाठकों को लंबे समय तक बांधे रखें। आप कोई भी शैली चुन सकते हैं, जैसे फंतासी, रोमांस, ऐतिहासिक कथा इत्यादि - लेकिन लक्ष्य एक बेहतरीन कथानक, सम्मोहक पात्रों और अप्रत्याशित चरमोत्कर्ष के साथ लिखना है। मेरा पहला अनुरोध &#39;फिक्शन शैली&#39; है",
    "remark": "कहानी शैली पर आधारित आउटपुट फिक्शन, जैसे फंतासी, रोमांस या इतिहास।"
  },
  "ar": {
    "title": "الروائي",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Arabic. My first request is ..",
    "description": "اريدك ان تكون روائيا. تريد ابتكار قصص إبداعية وجذابة تحافظ على تفاعل القراء لفترة طويلة. يمكنك اختيار أي نوع ، مثل الخيال والرومانسية والخيال التاريخي وما إلى ذلك - ولكن تهدف إلى الكتابة بخط حبكة رائع وشخصيات مقنعة وذروة غير متوقعة. طلبي الأول هو &quot;نوع الخيال&quot;",
    "remark": "إخراج الخيال بناءً على نوع القصة ، مثل الخيال أو الرومانسية أو التاريخ."
  },
  "bn": {
    "title": "ঔপন্যাসিক",
    "prompt": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. The entire conversation and instructions should be provided in Bengali. My first request is ..",
    "description": "আমি চাই তুমি একজন ঔপন্যাসিক হও। আপনি সৃজনশীল, আকর্ষক গল্প নিয়ে আসতে চান যা পাঠকদের দীর্ঘ সময়ের জন্য জড়িত রাখবে। আপনি ফ্যান্টাসি, রোম্যান্স, ঐতিহাসিক কথাসাহিত্য ইত্যাদির মতো যেকোন ধারা বেছে নিতে পারেন - তবে একটি দুর্দান্ত প্লট লাইন, বাধ্যতামূলক চরিত্র এবং একটি অপ্রত্যাশিত ক্লাইম্যাক্স দিয়ে লেখার লক্ষ্য রাখুন। আমার প্রথম অনুরোধ হল &#39;ফিকশন জেনার&#39;",
    "remark": "আউটপুট কল্পকাহিনীর উপর ভিত্তি করে গল্পের ধরন, যেমন ফ্যান্টাসি, রোম্যান্স, বা ইতিহাস।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-novelist",
  "tags": [
    "article"
  ],
  "id": 17,
  "weight": 3903
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
