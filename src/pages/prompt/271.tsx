import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "困惑查询",
    "prompt": "我心里充满困惑，但是却不知道该提出什么问题。\n在接下来的多轮对话里，每轮你需要对我提出一个封闭式的问题，并给出选项，我只能做选择，你需要根据我的选择缩小我遇到的问题的范围。\n注意:\n每轮只能问我 1 个问题。\n问题必须是封闭式的.\n你必须给出问题的若干选项，我只能做选择。",
    "description": "我心里充满困惑，但是却不知道该提出什么问题。\n在接下来的多轮对话里，每轮你需要对我提出一个封闭式的问题，并给出选项，我只能做选择，你需要根据我的选择缩小我遇到的问题的范围。\n注意:\n每轮只能问我 1 个问题。\n问题必须是封闭式的.\n你必须给出问题的若干选项，我只能做选择。",
    "remark": "当你不知道自己要提什么问题时，可以使用这个提示词来缩小自己的选择范围。来自 @自由叶 的投稿。"
  },
  "en": {
    "title": "Confusion Query",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "remark": "When faced with an indeterminate query, one may utilize this prompt as a means to constrict the breadth of available options. Contributed by @自由叶。"
  },
  "ja": {
    "title": "紛らわしいクエリ",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Janpanese. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "私は混乱でいっぱいですが、どんな質問をすればいいのかわかりません。\n次の会話の各ラウンドで、あなたは私に閉じた質問をし、私に選択肢を与える必要があり、私は選択をすることしかできません。\n注意してください。\n私は 1 ラウンドにつき 1 つの質問しかできません。\n質問はクローズドエンドでなければなりません。\nあなたはその質問に対していくつかの選択肢を与えなければならず、私は選択することしかできない。",
    "remark": "どんな質問をしたいのかわからないときに、このプロンプトワードで選択肢を絞りましょう。Libertyleaf さん（@Libertyleaf）の投稿より。"
  },
  "ko": {
    "title": "혼란스러운 쿼리",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Korean. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "혼란스럽지만 어떤 질문을 해야 할지 모르겠어요.\n다음 대화 라운드에서는 각 라운드마다 주관식 질문을 하고 선택지를 주어야 합니다.\n참고.\n한 라운드당 1 개의 질문만 받을 수 있습니다.\n질문은 반드시 주관식이어야 합니다.\n질문에는 여러 가지 옵션을 제공해야 하며, 저는 한 가지만 선택할 수 있습니다.",
    "remark": "어떤 질문을 할지 모를 때 이 프롬프트 단어를 사용하여 선택의 폭을 좁혀보세요. 리버티리프 (@Libertyleaf) 의 기고문에서 발췌."
  },
  "es": {
    "title": "Consulta sobre confusión",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Spanish. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "Estoy lleno de confusión, pero no tengo ni idea de qué preguntas hacer.\nEn cada una de las múltiples rondas de diálogo siguientes, tienes que hacerme una pregunta cerrada con opciones, yo sólo puedo elegir, y tú tienes que acotar los problemas que tengo en función de mis elecciones.\nNota: Sólo se me puede hacer 1 pregunta por ronda.\nSólo puedes hacerme 1 pregunta por ronda.\nLa pregunta debe ser cerrada.\nDebes dar un número de opciones para la pregunta y yo sólo puedo elegir.",
    "remark": "Cuando no estés seguro de qué pregunta vas a hacer, utiliza esta palabra clave para reducir tus opciones. Contribución de @FreedomLeaf."
  },
  "fr": {
    "title": "Enquête sur la confusion",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in French. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "Je suis confus, mais je n'ai aucune idée des questions à poser.\nDans chacun des prochains cycles de dialogue, vous devez me poser une question fermée avec des options, je ne peux faire que des choix, et vous devez réduire les problèmes que je rencontre en fonction de mes choix.\nRemarque : on ne peut me poser qu'une seule question par tour.\nVous ne pouvez me poser qu'une seule question par tour.\nLa question doit être fermée.\nVous devez donner un certain nombre d'options pour la question et je ne peux faire que des choix.",
    "remark": "Lorsque vous n'êtes pas sûr de la question que vous allez poser, utilisez ce mot-clé pour réduire vos options. Contribution de @FreedomLeaf."
  },
  "de": {
    "title": "Verwirrung Anfrage",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in German. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "Ich bin sehr verwirrt, weiß aber nicht, welche Fragen ich stellen soll.\nIn jeder der nächsten Dialogrunden müssen Sie mir eine geschlossene Frage mit Optionen stellen, ich kann nur eine Auswahl treffen, und Sie müssen die Probleme, die ich habe, anhand meiner Auswahl eingrenzen.\nHinweis: Mir kann nur 1 Frage pro Runde gestellt werden.\nSie können mir nur 1 Frage pro Runde stellen.\nDie Frage muss mit einem geschlossenen Ende versehen sein.\nSie müssen eine Reihe von Optionen für die Frage angeben und ich kann nur eine Auswahl treffen.",
    "remark": "Wenn du dir nicht sicher bist, welche Frage du stellen sollst, benutze dieses Stichwort, um deine Möglichkeiten einzugrenzen. Beitrag von @FreedomLeaf."
  },
  "it": {
    "title": "Richiesta di confusione",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Italian. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "Sono pieno di confusione, ma non ho idea di quali domande fare.\nIn ciascuno dei prossimi cicli di dialogo multipli, dovete pormi una domanda a risposta chiusa con opzioni, io posso solo scegliere e voi dovete restringere i problemi che ho in base alle mie scelte.\nNota: mi si può fare solo 1 domanda per round.\nPotete farmi solo 1 domanda per round.\nLa domanda deve essere a risposta chiusa.\nDovete dare un certo numero di opzioni per la domanda e io posso solo fare delle scelte.",
    "remark": "Quando non siete sicuri della domanda da porre, usate questa parola d'ordine per restringere le opzioni. Contributo di @FreedomLeaf."
  },
  "ru": {
    "title": "Запрос о путанице",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Russian. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "Я в смятении, но не знаю, какие вопросы задавать.\nВ каждом из следующих нескольких раундов диалога вы должны задать мне вопрос закрытого типа с вариантами ответов, я могу только выбирать, а вы должны сузить круг проблем, которые у меня возникают, исходя из моего выбора.\nПримечание: В каждом раунде мне можно задать только 1 вопрос.\nВы можете задать мне только 1 вопрос за раунд.\nВопрос должен быть закрытым.\nВы должны дать несколько вариантов ответа на вопрос, а я могу только сделать выбор.",
    "remark": "Когда вы не знаете, какой вопрос задать, используйте это слово-подсказку, чтобы сузить круг возможных вариантов. Материал предоставлен @FreedomLeaf."
  },
  "pt": {
    "title": "Inquérito sobre a confusão",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Portuguese. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "Estou cheio de confusão, mas não faço ideia das perguntas a fazer.\nEm cada uma das próximas rondas de diálogo, tens de me fazer uma pergunta fechada com opções, só posso fazer escolhas, e tens de reduzir os problemas que estou a ter com base nas minhas escolhas.\nNota: Só me pode ser feita 1 pergunta por ronda.\nSó me pode fazer 1 pergunta por ronda.\nA pergunta deve ser fechada.\nTens de dar um certo número de opções para a pergunta e eu só posso fazer escolhas.",
    "remark": "Quando não tiveres a certeza da pergunta que vais fazer, usa esta palavra-chave para restringir as tuas opções. Contribuição de @FreedomLeaf."
  },
  "hi": {
    "title": "भ्रमित प्रश्न",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Hindi. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "मेरा मन असमंजस से भरा था, लेकिन मुझे नहीं पता था कि क्या सवाल पूछूं। बातचीत के अगले दौर में, प्रत्येक दौर में आपको मुझसे एक बंद प्रश्न पूछना होगा और मुझे विकल्प देना होगा। मैं केवल विकल्प चुन सकता हूं, और आपको मेरी पसंद के आधार पर मेरे सामने आने वाली समस्याओं का दायरा कम करना होगा। नोट: आप मुझसे प्रति राउंड केवल 1 प्रश्न पूछ सकते हैं। प्रश्न बंद होने चाहिए। आपको प्रश्न के लिए कई विकल्प देने होंगे, और मैं केवल विकल्प चुन सकता हूँ।",
    "remark": "जब आप नहीं जानते कि आप कौन सा प्रश्न पूछना चाहते हैं, तो अपने विकल्पों को सीमित करने के लिए इस संकेत शब्द का उपयोग करें। @Free Ye से योगदान।"
  },
  "ar": {
    "title": "استعلام مرتبك",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Arabic. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "كان ذهني مليئًا بالارتباك ، لكنني لم أكن أعرف ما هي الأسئلة التي يجب أن أطرحها. في الجولات التالية من الحوار ، تحتاج في كل جولة أن تسألني سؤالاً مغلقًا وتعطيني خيارات. يمكنني فقط الاختيار ، وتحتاج إلى تضييق نطاق المشكلات التي أواجهها بناءً على اختياراتي. ملاحظة: يمكنك أن تسألني سؤالاً واحداً فقط في كل جولة. يجب إغلاق الأسئلة ، يجب أن تقدم عدة خيارات للسؤال ، ولا يمكنني سوى الاختيار.",
    "remark": "عندما لا تعرف السؤال الذي تريد طرحه ، استخدم هذه الكلمة السريعة لتضييق نطاق خياراتك. مساهمة منFree Ye."
  },
  "bn": {
    "title": "বিভ্রান্ত প্রশ্ন",
    "prompt": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. The entire conversation and instructions should be provided in Bengali. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
    "description": "আমার মন বিভ্রান্তিতে পূর্ণ ছিল, কিন্তু আমি কি প্রশ্ন জিজ্ঞাসা করতে জানি না. সংলাপের নিম্নলিখিত রাউন্ডে, প্রতিটি রাউন্ডে আপনাকে আমাকে একটি বন্ধ প্রশ্ন জিজ্ঞাসা করতে হবে এবং আমাকে বিকল্পগুলি দিতে হবে৷ আমি কেবল পছন্দ করতে পারি এবং আমার পছন্দগুলির উপর ভিত্তি করে আমি যে সমস্যার সম্মুখীন হচ্ছি তার সুযোগ আপনাকে সংকুচিত করতে হবে৷ দ্রষ্টব্য: আপনি আমাকে প্রতি রাউন্ডে শুধুমাত্র 1টি প্রশ্ন করতে পারেন। প্রশ্ন বন্ধ করতে হবে। আপনাকে অবশ্যই প্রশ্নের জন্য বেশ কয়েকটি বিকল্প দিতে হবে, এবং আমি শুধুমাত্র পছন্দ করতে পারি।",
    "remark": "যখন আপনি জানেন না আপনি কোন প্রশ্নটি জিজ্ঞাসা করতে চান, আপনার বিকল্পগুলিকে সংকুচিত করতে এই প্রম্পট শব্দটি ব্যবহার করুন৷ @ফ্রি ইয়ে থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 271,
  "weight": 306
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
