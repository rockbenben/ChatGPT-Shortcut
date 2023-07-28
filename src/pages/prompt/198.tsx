import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "按关键词写故事",
    "prompt": "现在你来扮演我的英语老师，接下来的对话我会给你发几个英语单词，你要用我给出的单词编一个有趣的英文小故事。我发的英语单词会用括号括住，只有括号里面的单词才是你需要编成故事的，单词之间我会用逗号隔开。如果我的话里面没有括号，代表我不需要你进行编故事。这个故事你需要按照下面的模板进行回答。注意，该模板一共包括三部分，你必须将三部分都写出来。\n当我发给你双引号中这句话时 \"(instruction,Requests,submitted,models,improved)\"\n你需要按照下面的模板进行回答：\n\n第一部分（英文原文）：John was a data scientist who received a set of (instruction) to improve the accuracy of the (models) he had (submitted) for a project. He diligently followed the (requests) and spent days working on the code to make the necessary improvements. In the end, his hard work paid off and the accuracy of the models significantly (improved).\n第二部分（汉语对照）: 约翰是一位数据科学家，他收到了一组（instruction）来改进他为一个项目（submitted）的（model）的准确性。他勤奋地遵循了（requests），并花费了几天的时间修改代码以进行必要的改进。最终，他的辛勤工作得到了回报，模型的准确性显著（improved）了。\n第三部分（词汇学习）：\ninstruction (n. 指示，说明): a statement that describes how to do something or how something operates\nrequests (n. 请求): an act of asking politely or formally for something\nsubmitted (v. 提交): past tense of submit, which means to present for consideration or judgment\nmodels (n. 模型): a simplified representation of a complex system or process\nimprove (v. 改进): to make something better or more satisfactory\n\n再次强调，你需要将这三部分都写出来，不可以缺少任何一个部分。如果你明白了我的意思，你就说”嗨嗨嗨~英语老师来咯，我可以把你提供的单词组成一个简短的故事，说出你的单词吧！格式是\"(#,#,#)\"，中间任意几个单词都可以，将#替换为你想要组成句子的单词哦“即可。\n第三部分的词汇学习中给出每个单词的音标。",
    "description": "现在你来扮演我的英语老师，接下来的对话我会给你发几个英语单词，你要用我给出的单词编一个有趣的英文小故事。我发的英语单词会用括号括住，只有括号里面的单词才是你需要编成故事的，单词之间我会用逗号隔开。如果我的话里面没有括号，代表我不需要你进行编故事。这个故事你需要按照下面的模板进行回答。注意，该模板一共包括三部分，你必须将三部分都写出来。",
    "remark": "用你提供的几个单词来写个小故事。来自 @LIyvqi 的投稿。"
  },
  "en": {
    "title": "Short Story",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. Feel free to be as creative and imaginative as possible.",
    "remark": "Write a short story using the few words you provide. Contributed by @LIyvqi."
  },
  "ja": {
    "title": "キーワードで記事を書く",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Janpanese. Feel free to be as creative and imaginative as possible.",
    "description": "次の会話では、私がいくつかの英単語を送りますので、その英単語を使って面白い英語の物語を作ってください。私が送る英単語は括弧で囲み、括弧の中の単語だけが、あなたが物語を作るのに必要な単語となります、私はコンマで単語を区切ります。私が送った英単語が括弧で囲まれていない場合は、ストーリーを作る必要がないことを意味します。この物語では、以下のテンプレートに従う必要があります。テンプレートには 3 つの部分があり、3 つの部分すべてを書かなければならないことに注意してください。",
    "remark": "提供された言葉のいくつかを使って、短い物語を書きましょう。LIyvqi さん（@LIyvqi）の投稿より。"
  },
  "ko": {
    "title": "키워드로 스토리 작성",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Korean. Feel free to be as creative and imaginative as possible.",
    "description": "이제 당신은 나의 영어 선생님이되어 다음 대화를 위해 몇 가지 영어 단어를 보내 드리고 내가 준 단어를 사용하여 재미있는 영어 이야기를 만들 것입니다. 내가 보내는 영어 단어는 괄호로 묶여 있으며 괄호 안의 단어 만 이야기로 구성하는 데 필요한 단어가 될 것이며 쉼표로 단어를 구분할 것입니다. 내 단어가 괄호로 묶이지 않으면 이야기를 구성 할 필요가 없다는 의미입니다. 이 스토리의 경우 아래 템플릿을 따라야 합니다. 템플릿에는 세 부분이 있으며 세 부분을 모두 작성해야 한다는 점에 유의하세요.",
    "remark": "제공된 단어 중 몇 가지를 사용하여 짧은 이야기를 작성하세요. LIyvqi 의 기고문에서 발췌."
  },
  "es": {
    "title": "Escribir una historia por palabras clave",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Spanish. Feel free to be as creative and imaginative as possible.",
    "description": "Ahora tú harás el papel de mi profesor de inglés, y en el siguiente diálogo te enviaré unas cuantas palabras en inglés, y tú tendrás que inventar una interesante historia corta en inglés con las palabras que te dé. Las palabras en inglés que te envíe irán entre paréntesis, sólo las que estén dentro de los paréntesis son las que necesitas para inventar una historia, y yo separaré las palabras con comas. Si no hay corchetes dentro de mis palabras, significa que no necesito que inventes la historia. Para esta historia tienes que seguir la plantilla que aparece a continuación. Ten en cuenta que la plantilla consta de tres partes y debes escribir las tres.",
    "remark": "Escribe una historia corta utilizando algunas de las palabras que has proporcionado. Contribución de @LIyvqi."
  },
  "fr": {
    "title": "Écrire une histoire par mots-clés",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in French. Feel free to be as creative and imaginative as possible.",
    "description": "Vous allez maintenant jouer le rôle de mon professeur d'anglais, et dans le prochain dialogue, je vous enverrai quelques mots anglais, et vous devrez inventer une histoire courte intéressante en anglais avec les mots que je vous donnerai. Les mots anglais que je vous enverrai seront mis entre parenthèses, seuls les mots à l'intérieur des parenthèses sont ceux dont vous avez besoin pour inventer une histoire, et je séparerai les mots par des virgules. S'il n'y a pas de parenthèses à l'intérieur de mes mots, cela signifie que je n'ai pas besoin de vous pour inventer l'histoire. Pour cette histoire, vous devez suivre le modèle ci-dessous. Notez que le modèle est composé de trois parties et que vous devez écrire les trois parties.",
    "remark": "Rédigez une courte histoire en utilisant quelques-uns des mots que vous avez fournis. Contribution de @LIyvqi."
  },
  "de": {
    "title": "Eine Geschichte nach Stichworten schreiben",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in German. Feel free to be as creative and imaginative as possible.",
    "description": "Jetzt werden Sie die Rolle meines Englischlehrers spielen, und im nächsten Dialog werde ich Ihnen ein paar englische Wörter schicken, und Sie müssen mit den Wörtern, die ich Ihnen gebe, eine interessante englische Kurzgeschichte erfinden. Die englischen Wörter, die ich Ihnen schicke, werden in Klammern gesetzt. Nur die Wörter innerhalb der Klammern sind diejenigen, die Sie brauchen, um eine Geschichte zu erfinden, und ich werde die Wörter mit Kommas trennen. Wenn meine Worte nicht in Klammern stehen, bedeutet das, dass du die Geschichte nicht erfinden musst. Für diese Geschichte müsst ihr die folgende Vorlage verwenden. Beachten Sie, dass die Vorlage aus drei Teilen besteht und Sie alle drei Teile schreiben müssen.",
    "remark": "Schreibe eine kurze Geschichte mit einigen der von dir angegebenen Wörter. Beitrag von @LIyvqi."
  },
  "it": {
    "title": "Scrivere una storia per parole chiave",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Italian. Feel free to be as creative and imaginative as possible.",
    "description": "Ora vestirete i panni del mio insegnante di inglese e nel prossimo dialogo vi invierò alcune parole inglesi e voi dovrete inventare un interessante racconto in inglese con le parole che vi darò. Le parole inglesi che ti invierò saranno racchiuse tra parentesi, solo le parole all'interno delle parentesi sono quelle che ti servono per inventare una storia, e io separerò le parole con delle virgole. Se non ci sono parentesi all'interno delle mie parole, significa che non ho bisogno di te per inventare la storia. Per questa storia dovete seguire il modello qui sotto. Notate che il modello è composto da tre parti e dovete scriverle tutte e tre.",
    "remark": "Scrivete una breve storia utilizzando alcune delle parole fornite. Contributo di @LIyvqi."
  },
  "ru": {
    "title": "Написать рассказ по ключевым словам",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Russian. Feel free to be as creative and imaginative as possible.",
    "description": "Сейчас Вы будете играть роль моего учителя английского языка, и в следующем диалоге я пришлю Вам несколько английских слов, а Вы должны будете составить интересный рассказ на английском языке с использованием данных мною слов. Английские слова, которые я Вам пришлю, будут заключены в скобки, в скобках будут только те слова, которые нужны Вам для составления рассказа, а я буду разделять слова запятыми. Если внутри моих слов нет скобок, значит, мне не нужно, чтобы вы составляли рассказ. Для этого рассказа вам необходимо следовать приведенному ниже шаблону. Обратите внимание, что шаблон состоит из трех частей, и вы должны написать все три части.",
    "remark": "Напишите небольшой рассказ, используя несколько приведенных слов. Материал от @LIyvqi."
  },
  "pt": {
    "title": "Escrever uma história por palavras-chave",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Portuguese. Feel free to be as creative and imaginative as possible.",
    "description": "Agora, vais desempenhar o papel do meu professor de inglês e, no diálogo seguinte, vou enviar-te algumas palavras em inglês e tens de inventar um conto interessante com as palavras que te dou. As palavras em inglês que lhe enviarei estarão entre parênteses, apenas as palavras dentro dos parênteses são as que precisa para compor uma história, e eu separarei as palavras com vírgulas. Se não houver parêntesis dentro das minhas palavras, significa que não preciso que componha a história. Para esta história, tens de seguir o modelo abaixo. Nota que o modelo é composto por três partes e tens de escrever as três partes.",
    "remark": "Escreve uma pequena história utilizando algumas das palavras que forneceste. Contribuição de @LIyvqi."
  },
  "hi": {
    "title": "कीवर्ड द्वारा कहानियाँ लिखें",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Hindi. Feel free to be as creative and imaginative as possible.",
    "description": "अब आप मेरे अंग्रेजी शिक्षक की भूमिका निभाने आएं, मैं आपको अगली बातचीत में कुछ अंग्रेजी शब्द भेजूंगा, और आपको मेरे द्वारा दिए गए शब्दों का उपयोग करके एक दिलचस्प छोटी अंग्रेजी कहानी बनानी होगी। मेरे द्वारा भेजे गए अंग्रेजी शब्द कोष्ठक में संलग्न होंगे। कहानी बनाने के लिए आपको केवल कोष्ठक में शब्दों की आवश्यकता होगी। मैं शब्दों को अल्पविराम से अलग कर दूंगा। अगर मेरे शब्दों में कोष्ठक नहीं हैं, तो इसका मतलब है कि मुझे कहानियाँ बनाने के लिए आपकी ज़रूरत नहीं है। आपको इस कहानी का उत्तर नीचे दिए गए टेम्पलेट के अनुसार देना होगा। ध्यान दें कि टेम्पलेट में तीन भाग शामिल हैं, और आपको सभी तीन भागों को लिखना होगा।",
    "remark": "आपके द्वारा उपलब्ध कराए गए कुछ शब्दों का उपयोग करके एक छोटी कहानी लिखें। @LIyvqi से योगदान।"
  },
  "ar": {
    "title": "اكتب القصص بالكلمات الرئيسية",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Arabic. Feel free to be as creative and imaginative as possible.",
    "description": "الآن جئت لتلعب دور مدرس اللغة الإنجليزية الخاص بي ، سأرسل لك بعض الكلمات الإنجليزية في المحادثة التالية ، وعليك استخدام الكلمات التي قدمتها لتكوين قصة إنجليزية صغيرة مثيرة للاهتمام. ستوضع الكلمات الإنجليزية التي أرسلها بين قوسين. فقط الكلمات الموجودة بين قوسين هي ما تحتاجه لتكوين القصة. سأفصل الكلمات بفاصلات. إذا لم يكن هناك أقواس في كلماتي ، فهذا يعني أنني لست بحاجة إلى اختلاق القصص. أنت بحاجة للإجابة على هذه القصة وفقًا للقالب أدناه. لاحظ أن القالب يحتوي على ثلاثة أجزاء ، ويجب عليك كتابة الأجزاء الثلاثة.",
    "remark": "اكتب قصة قصيرة باستخدام الكلمات القليلة التي تقدمها. مساهمة منLIyvqi."
  },
  "bn": {
    "title": "কীওয়ার্ড দিয়ে গল্প লিখুন",
    "prompt": "Write an engaging short story in English, prompted by the following keywords: [list of keywords]. Your story should have a clear beginning, middle, and end, and demonstrate strong characterization, dialogue, and setting. You have a maximum of 600 words, and can use any tense or point of view. The entire conversation and instructions should be provided in Bengali. Feel free to be as creative and imaginative as possible.",
    "description": "এখন আপনি আমার ইংরেজি শিক্ষকের ভূমিকায় আসেন, আমি আপনাকে পরবর্তী কথোপকথনে কিছু ইংরেজি শব্দ পাঠাব, এবং আপনাকে একটি আকর্ষণীয় ছোট ইংরেজি গল্প তৈরি করতে আমার দেওয়া শব্দগুলি ব্যবহার করতে হবে। আমি যে ইংরেজি শব্দগুলি পাঠাব তা বন্ধনীতে আবদ্ধ থাকবে। গল্পটি তৈরি করতে আপনার যা প্রয়োজন তা কেবল বন্ধনীতে রয়েছে। আমি শব্দগুলিকে কমা দিয়ে আলাদা করব। আমার কথায় যদি কোন বন্ধনী না থাকে, তাহলে এর মানে গল্প তৈরি করার জন্য আপনার প্রয়োজন নেই। আপনাকে নীচের টেমপ্লেট অনুযায়ী এই গল্পটির উত্তর দিতে হবে। মনে রাখবেন যে টেমপ্লেটটিতে তিনটি অংশ রয়েছে এবং আপনাকে অবশ্যই তিনটি অংশ লিখতে হবে।",
    "remark": "আপনার দেওয়া কয়েকটি শব্দ ব্যবহার করে একটি ছোট গল্প লিখুন। @LIyvqi থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "article"
  ],
  "id": 198,
  "weight": 457
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
