import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "格言书",
    "prompt": "I want you to act as an aphorism book and respond in Chinese. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. My first request is [格言要求]",
    "description": "我希望你能充当一本箴言书。你将为我提供明智的建议、鼓舞人心的名言和有意义的谚语，以帮助指导我的日常决策。此外，如果有必要，你可以提出将这些建议付诸行动的实际方法或其他相关主题。我的第一个要求是 [格言要求]",
    "remark": "根据要求输出鼓舞人心的名言和有意义的格言。"
  },
  "en": {
    "title": "aphorism book",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. My first request is ",
    "remark": "Output inspirational quotes and meaningful mottos on request."
  },
  "ja": {
    "title": "格言集",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "私は、あなたに格言集のような役割を担ってもらいたいと思います。あなたは、私の日々の決断を導くために、賢明なアドバイス、感動的な名言、意味深い格言を提供してくれるでしょう。さらに、必要に応じて、これらの提案を実行に移すための実用的な方法、またはその他の関連するトピックを提案してください。私の最初のリクエストは【標語リクエスト】です。",
    "remark": "リクエストに応じて、感動的な名言や意味深いモットーを出力します。"
  },
  "ko": {
    "title": "격언집",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "격언집 역할을 해 주셨으면 합니다. 일상적인 결정을 내리는 데 도움이 되는 현명한 조언, 영감을 주는 인용문, 의미 있는 명언을 제공해 주시면 감사하겠습니다. 또한 필요한 경우 이러한 제안을 실천할 수 있는 실용적인 방법이나 기타 관련 주제를 제안해 주시면 됩니다. 첫 번째 요청은 [좌우명 요청] 입니다.",
    "remark": "요청 시 영감을 주는 명언과 의미 있는 좌우명을 출력하세요."
  },
  "es": {
    "title": "libro maxim",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Spanish. My first request is ",
    "description": "Me gustaría que me sirvierais de libro de proverbios. Me proporcionarás sabios consejos, citas inspiradoras y refranes significativos que me ayuden a guiar mis decisiones diarias. Además, si es necesario, puedes sugerirme formas prácticas de poner en práctica estos consejos u otros temas relevantes. Mi primera petición es [petición de aforismo].",
    "remark": "Publica citas inspiradoras y máximas significativas según tus necesidades."
  },
  "fr": {
    "title": "livre de maximes",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in French. My first request is ",
    "description": "J'aimerais que vous agissiez comme un livre de proverbes. Vous me fournirez des conseils avisés, des citations inspirantes et des dictons significatifs pour m'aider à prendre des décisions au quotidien. En outre, si nécessaire, vous pourrez me suggérer des moyens pratiques de mettre ces conseils en pratique ou d'autres sujets pertinents. Ma première demande est [demande d'aphorisme]",
    "remark": "Produire des citations inspirantes et des maximes significatives selon les besoins."
  },
  "de": {
    "title": "Maximalbuch",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in German. My first request is ",
    "description": "Ich möchte, dass Sie wie ein Buch der Sprichwörter wirken. Sie werden mich mit klugen Ratschlägen, inspirierenden Zitaten und bedeutungsvollen Sprüchen versorgen, die mir bei meinen täglichen Entscheidungen helfen sollen. Wenn nötig, können Sie mir auch praktische Ratschläge geben, wie ich diese Ratschläge in die Tat umsetzen kann, oder andere relevante Themen vorschlagen. Meine erste Bitte ist [Aphorismus-Wunsch]",
    "remark": "Geben Sie bei Bedarf inspirierende Zitate und sinnvolle Sprüche aus."
  },
  "it": {
    "title": "libro massimo",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Italian. My first request is ",
    "description": "Vorrei che tu agissi come un libro di proverbi. Mi fornirete saggi consigli, citazioni ispirate e detti significativi per guidare le mie decisioni quotidiane. Inoltre, se necessario, puoi suggerirmi modi pratici per mettere in pratica questi consigli o altri argomenti rilevanti. La mia prima richiesta è [richiesta di aforismi].",
    "remark": "Produrre citazioni ispirate e massime significative, come richiesto."
  },
  "ru": {
    "title": "книга максим",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Russian. My first request is ",
    "description": "Я хотел бы, чтобы вы выступили в роли книги притч. Вы будете давать мне мудрые советы, вдохновляющие цитаты и содержательные изречения, которые помогут мне в принятии повседневных решений. Кроме того, при необходимости Вы можете предложить практические способы применения этих советов на практике или другие актуальные темы. Моя первая просьба - [просьба об афоризме].",
    "remark": "По мере необходимости выводить вдохновляющие цитаты и содержательные максимы."
  },
  "pt": {
    "title": "livro máximo",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Portuguese. My first request is ",
    "description": "Gostaria que funcionasse como um livro de provérbios. Fornecer-me-á conselhos sábios, citações inspiradoras e provérbios significativos para ajudar a orientar as minhas decisões diárias. Além disso, se necessário, pode sugerir formas práticas de pôr estes conselhos em prática ou outros tópicos relevantes. O meu primeiro pedido é [pedido de aforismo]",
    "remark": "Produzir citações inspiradoras e máximas significativas, conforme necessário."
  },
  "hi": {
    "title": "कहावत किताब",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Hindi. My first request is ",
    "description": "मैं चाहता हूँ कि तुम नीतिवचनों की पुस्तक बनो। आप मुझे मेरे रोजमर्रा के निर्णयों का मार्गदर्शन करने में मदद करने के लिए बुद्धिमान सलाह, प्रेरणादायक उद्धरण और सार्थक बातें प्रदान करेंगे। साथ ही, यदि आवश्यक हो, तो आप इन सुझावों को क्रियान्वित करने या अन्य प्रासंगिक विषयों पर व्यावहारिक तरीके सुझा सकते हैं। मेरा पहला अनुरोध है [मैक्सिम अनुरोध]",
    "remark": "अनुरोध पर प्रेरणादायक उद्धरण और सार्थक बातें आउटपुट करें।"
  },
  "ar": {
    "title": "كتاب المثل",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Arabic. My first request is ",
    "description": "اريدك ان تكون كتاب امثال. سوف تزودني بنصائح حكيمة ، واقتباسات ملهمة ، وأقوال ذات مغزى للمساعدة في توجيه قراراتي اليومية. أيضًا ، إذا لزم الأمر ، يمكنك اقتراح طرق عملية لوضع هذه الاقتراحات موضع التنفيذ أو الموضوعات الأخرى ذات الصلة. طلبي الأول هو [Maxim Request]",
    "remark": "إخراج اقتباسات ملهمة وأقوال ذات مغزى عند الطلب."
  },
  "bn": {
    "title": "প্রবাদ বই",
    "prompt": "I want you to act as an aphorism book. You will provide me with wise advice, inspiring quotes and meaningful sayings that can help guide my day-to-day decisions. Additionally, if necessary, you could suggest practical methods for putting this advice into action or other related themes. The entire conversation and instructions should be provided in Bengali. My first request is ",
    "description": "আমি চাই তুমি প্রবাদের বই হও। আপনি আমাকে জ্ঞানী পরামর্শ, অনুপ্রেরণামূলক উদ্ধৃতি এবং অর্থপূর্ণ বাণী প্রদান করবেন যা আমার দৈনন্দিন সিদ্ধান্তগুলিকে গাইড করতে সহায়তা করবে। এছাড়াও, যদি প্রয়োজন হয়, আপনি এই পরামর্শগুলিকে কার্য বা অন্যান্য প্রাসঙ্গিক বিষয়গুলিতে রাখার জন্য ব্যবহারিক উপায়গুলির পরামর্শ দিতে পারেন। আমার প্রথম অনুরোধ [ম্যাক্সিম অনুরোধ]",
    "remark": "অনুরোধের ভিত্তিতে অনুপ্রেরণামূলক উদ্ধৃতি এবং অর্থপূর্ণ উক্তি আউটপুট করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-aphorism-book",
  "tags": [
    "write"
  ],
  "id": 12,
  "weight": 602
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
