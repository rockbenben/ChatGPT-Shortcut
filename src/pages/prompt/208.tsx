import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "表达自检",
    "prompt": "[某个具体的事情]，我说：[回复内容]。请问对方可能会如何理解我的意思？有其他更好的表达方式吗？",
    "description": "[某个具体的事情]，我说：[回复内容]。请问对方可能会如何理解我的意思？有其他更好的表达方式吗？",
    "remark": "如果你是高敏感人群，或你的话经常被人误解，通过 AI 解读可以让你在说话前检查自己是否表达清楚。"
  },
  "en": {
    "title": "Self-check on expression ",
    "prompt": "After [a specific action], I said: [my response]. How might the other person interpret my meaning?",
    "remark": "If you belong to the highly sensitive population or if your words are frequently misunderstood, using AI interpretation can help you self-check before speaking to ensure clear expression."
  },
  "ja": {
    "title": "表現力セルフチェック",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Janpanese. How might the other person interpret my meaning?.",
    "description": "[具体的なこと）、私は「（内容への返答）」と言ったのです。相手は私の意味をどう解釈するのだろうか？他にもっと良い表現方法はないだろうか？",
    "remark": "感受性の強い方、言葉が誤解されやすい方は、AI 通訳を利用することで、話す前に自分の表現が明確かどうか確認することができます。"
  },
  "ko": {
    "title": "표현식 자가 점검",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Korean. How might the other person interpret my meaning?.",
    "description": "[특정 항목] 에 대해 [콘텐츠에 답장] 이라고 말했습니다. 상대방이 제 뜻을 어떻게 해석할까요? 더 좋은 표현 방법이 없을까요?",
    "remark": "매우 예민한 사람이거나 말을 자주 오해하는 경우, AI 통역을 통해 말하기 전에 명확하게 표현했는지 확인할 수 있습니다."
  },
  "es": {
    "title": "Autocomprobación de expresiones",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Spanish. How might the other person interpret my meaning?.",
    "description": "[una cosa concreta], yo digo: [contenido de la respuesta]. ¿Puedo preguntar cómo puede interpretar la otra persona lo que quiero decir? ¿Hay otra forma mejor de expresarlo?",
    "remark": "Si eres hipersensible o tus palabras se malinterpretan a menudo, la descodificación de IA te permite comprobar que te has expresado con claridad antes de hablar."
  },
  "fr": {
    "title": "Autocontrôle de l'expression",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in French. How might the other person interpret my meaning?.",
    "description": "[une chose spécifique], je dis : [contenu de la réponse]. Puis-je demander comment l'autre personne pourrait interpréter ce que je veux dire ? Existe-t-il une meilleure façon de l'exprimer ?",
    "remark": "Si vous êtes hypersensible ou si vos paroles sont souvent mal comprises, le décodage de l'IA vous permet de vérifier que vous vous êtes exprimé clairement avant de prendre la parole."
  },
  "de": {
    "title": "Ausdrucks-Selbstkontrolle",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in German. How might the other person interpret my meaning?.",
    "description": "[eine bestimmte Sache], sage ich: [Antwortinhalt]. Darf ich fragen, wie die andere Person das, was ich meine, interpretieren könnte? Gibt es einen anderen, besseren Weg, es auszudrücken?",
    "remark": "Wenn Sie überempfindlich sind oder Ihre Worte oft missverstanden werden, können Sie mit der KI-Dekodierung überprüfen, ob Sie sich klar ausgedrückt haben, bevor Sie sprechen."
  },
  "it": {
    "title": "Autoverifica dell'espressione",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Italian. How might the other person interpret my meaning?.",
    "description": "[una cosa specifica], dico: [contenuto della risposta]. Posso chiedere come l'altra persona potrebbe interpretare ciò che voglio dire? C'è un altro modo migliore per esprimerlo?",
    "remark": "Se siete ipersensibili o le vostre parole vengono spesso fraintese, la decodifica AI vi permette di verificare che vi siate espressi chiaramente prima di parlare."
  },
  "ru": {
    "title": "Самопроверка экспрессии",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Russian. How might the other person interpret my meaning?.",
    "description": "[конкретная вещь], я говорю: [содержание ответа]. Могу ли я спросить, как другой человек может интерпретировать то, что я имею в виду? Есть ли другой лучший способ выразить это?",
    "remark": "Если у вас повышенная чувствительность или ваши слова часто понимают неправильно, декодирование с помощью искусственного интеллекта позволит вам проверить, насколько ясно вы выразили свои мысли, прежде чем говорить."
  },
  "pt": {
    "title": "Auto-verificação da expressão",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Portuguese. How might the other person interpret my meaning?.",
    "description": "[uma coisa específica], eu digo: [conteúdo da resposta]. Posso perguntar como é que a outra pessoa pode interpretar o que quero dizer? Há outra forma melhor de o expressar?",
    "remark": "Se for hipersensível ou se as suas palavras forem frequentemente mal interpretadas, a descodificação da IA permite-lhe verificar se se exprimiu claramente antes de falar."
  },
  "hi": {
    "title": "आत्म-परीक्षण व्यक्त करें",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Hindi. How might the other person interpret my meaning?.",
    "description": "[एक विशिष्ट बात], मैंने कहा: [प्रतिक्रिया सामग्री]। क्या मैं पूछ सकता हूँ कि दूसरा पक्ष मेरी बात कैसे समझेगा? क्या इसे व्यक्त करने का कोई और बेहतर तरीका है?",
    "remark": "यदि आप अत्यधिक संवेदनशील समूह हैं, या आपके शब्दों को अक्सर गलत समझा जाता है, तो एआई व्याख्या आपको यह जांचने की अनुमति दे सकती है कि क्या आप बोलने से पहले खुद को स्पष्ट रूप से व्यक्त करते हैं।"
  },
  "ar": {
    "title": "التعبير عن الاختبار الذاتي",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Arabic. How might the other person interpret my meaning?.",
    "description": "قلت: [شيء محدد]: [محتوى الرد]. هل لي أن أسأل كيف يمكن أن يفهم الطرف الآخر ما أعنيه؟ هل هناك طريقة أخرى أفضل للتعبير عنها؟",
    "remark": "إذا كنت مجموعة حساسة للغاية ، أو غالبًا ما يُساء فهم كلماتك ، يمكن أن يسمح لك تفسير الذكاء الاصطناعي بالتحقق مما إذا كنت تعبر عن نفسك بوضوح قبل التحدث."
  },
  "bn": {
    "title": "স্ব-পরীক্ষা প্রকাশ করুন",
    "prompt": "After [a specific action], I said: [my response]. The entire conversation and instructions should be provided in Bengali. How might the other person interpret my meaning?.",
    "description": "[একটি নির্দিষ্ট জিনিস], আমি বললাম: [প্রতিক্রিয়া সামগ্রী]। আমি কি জিজ্ঞাসা করতে পারি কিভাবে অন্য পক্ষ বুঝতে পারে আমি কি বলতে চাইছি? এটা প্রকাশ করার অন্য কোন ভাল উপায় আছে?",
    "remark": "আপনি যদি একটি অত্যন্ত সংবেদনশীল গোষ্ঠী হন, বা আপনার কথাগুলি প্রায়শই ভুল বোঝা যায়, তবে এআই ব্যাখ্যা আপনাকে কথা বলার আগে নিজেকে স্পষ্টভাবে প্রকাশ করছেন কিনা তা পরীক্ষা করার অনুমতি দিতে পারে।"
  },
  "website": null,
  "tags": [
    "social"
  ],
  "id": 208,
  "weight": 244
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
