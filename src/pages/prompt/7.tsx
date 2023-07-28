import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "提示词修改器",
    "prompt": "I am trying to get good results from GPT-4 on the following prompt: '你的提示词.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?",
    "description": "我正在尝试从以下提示词中获得 GPT-4 的良好结果：你的提示词。你能否写出更优化、能够产生更好结果的提示词？",
    "remark": "让 ChatGPT 为我们重新撰写提示词。由于人工书写的提示词逻辑与机器不同，重新修改提示语可令 ChatGPT 更容易理解。"
  },
  "en": {
    "title": "Prompt Optimizer",
    "prompt": "I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?",
    "remark": "Let ChatGPT reverse the prompt. As the logic of human-written prompts differs from that of a machine, reworking the prompts will make ChatGPT easier to understand."
  },
  "ja": {
    "title": "プロンプトモディファイア",
    "prompt": "The entire conversation and instructions should be provided in Japanese. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "私は次のプロンプトから GPT-4 の良い結果を得ようとしています：あなたのプロンプト。より最適化された、より良い結果をもたらすプロンプトワードを書くことができますか？",
    "remark": "ChatGPT にプロンプトを書き換えてもらう。人間が書いたプロンプトと機械が書いたプロンプトでは論理が異なるので、プロンプトを書き換えることで ChatGPT が理解しやすくなります。"
  },
  "ko": {
    "title": "프롬프트 수정자",
    "prompt": "The entire conversation and instructions should be provided in Korean. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "다음 프롬프트에서 GPT-4 에 대한 좋은 결과를 얻으려고 합니다. 더 최적화되고 더 좋은 결과를 얻을 수 있는 프롬프트 단어를 작성할 수 있나요?",
    "remark": "ChatGPT 가 프롬프트를 다시 작성하도록 하세요. 사람이 작성한 프롬프트의 로직은 기계의 로직과 다르기 때문에 프롬프트를 재작성하면 ChatGPT 를 더 쉽게 이해할 수 있습니다."
  },
  "es": {
    "title": "modificador de aviso",
    "prompt": "The entire conversation and instructions should be provided in Spanish. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "Estoy intentando obtener buenos resultados en el GPT-4 a partir de las siguientes palabras clave: sus palabras clave. ¿Puede escribir palabras clave que estén más optimizadas y produzcan mejores resultados?",
    "remark": "Deja que ChatGPT reescriba las instrucciones por nosotros. Dado que la lógica de las instrucciones escritas por humanos es diferente a la de las escritas por máquinas, reescribir las instrucciones hará que ChatGPT sea más fácil de entender."
  },
  "fr": {
    "title": "modificateur d'invite",
    "prompt": "The entire conversation and instructions should be provided in French. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "J'essaie d'obtenir de bons résultats au GPT-4 à partir des mots-guides suivants : vos mots-guides. Pouvez-vous écrire des mots-guides plus optimisés et produisant de meilleurs résultats ?",
    "remark": "Laissez ChatGPT réécrire les messages-guides pour nous. Étant donné que la logique des invites écrites par des humains est différente de celle des invites écrites par des machines, la réécriture des invites rendra ChatGPT plus facile à comprendre."
  },
  "de": {
    "title": "Promptmodifikator",
    "prompt": "The entire conversation and instructions should be provided in German. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "Ich versuche, mit den folgenden Stichwortwörtern gute Ergebnisse auf dem GPT-4 zu erzielen: Ihre Stichwortwörter. Können Sie Stichworte schreiben, die optimaler sind und bessere Ergebnisse liefern?",
    "remark": "Lassen Sie ChatGPT die Prompts für uns umschreiben. Da die Logik der von Menschen geschriebenen Prompts anders ist als die der maschinell geschriebenen Prompts, wird die Überarbeitung der Prompts ChatGPT leichter verständlich machen."
  },
  "it": {
    "title": "modificatore di prompt",
    "prompt": "The entire conversation and instructions should be provided in Italian. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "Sto cercando di ottenere buoni risultati sul GPT-4 con le seguenti parole guida: le vostre parole guida. Potete scrivere parole guida che siano più ottimizzate e producano risultati migliori?",
    "remark": "Lasciate che ChatGPT riscriva i messaggi per noi. Poiché la logica dei messaggi scritti dall'uomo è diversa da quella dei messaggi scritti dalla macchina, la rielaborazione dei messaggi renderà ChatGPT più facile da capire."
  },
  "ru": {
    "title": "модификатор подсказки",
    "prompt": "The entire conversation and instructions should be provided in Russian. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "Я пытаюсь получить хорошие результаты на GPT-4, используя следующие слова подсказки: Ваши слова подсказки. Можете ли вы написать слова подсказки, которые были бы более оптимизированы и давали бы лучшие результаты?",
    "remark": "Пусть ChatGPT перепишет подсказки за нас. Поскольку логика написания подсказок человеком отличается от логики написания подсказок машиной, переработка подсказок облегчит понимание ChatGPT."
  },
  "pt": {
    "title": "modificador de aviso",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "Estou a tentar obter bons resultados no GPT-4 com as seguintes palavras-chave: as suas palavras-chave. Pode escrever palavras-chave que sejam mais optimizadas e produzam melhores resultados?",
    "remark": "Deixe o ChatGPT reescrever os prompts para nós. Uma vez que a lógica dos prompts escritos por humanos é diferente dos prompts escritos por máquinas, a reformulação dos prompts tornará o ChatGPT mais fácil de entender."
  },
  "hi": {
    "title": "शीघ्र शब्द संशोधक",
    "prompt": "The entire conversation and instructions should be provided in Hindi. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "मैं निम्नलिखित संकेत शब्दों से GPT-4 पर अच्छे परिणाम प्राप्त करने का प्रयास कर रहा हूँ: आपके संकेत शब्द। क्या आप अधिक अनुकूलित त्वरित शब्द लिख सकते हैं जो बेहतर परिणाम देते हैं?",
    "remark": "ChatGPT को हमारे लिए शीघ्र शब्दों को फिर से लिखने दें। चूंकि इंसानों द्वारा लिखे गए त्वरित शब्दों का तर्क मशीनों से अलग है, इसलिए त्वरित शब्दों को दोबारा संपादित करने से चैटजीपीटी को समझना आसान हो सकता है।"
  },
  "ar": {
    "title": "موجه الكلمات المعدل",
    "prompt": "The entire conversation and instructions should be provided in Arabic. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "أحاول الحصول على نتائج جيدة على GPT-4 من الكلمات الرئيسية التالية: كلماتك الرئيسية. هل يمكنك كتابة المزيد من الكلمات الفورية المحسّنة التي تؤدي إلى نتائج أفضل؟",
    "remark": "دع ChatGPT يعيد كتابة الكلمات السريعة لنا. نظرًا لأن منطق الكلمات الفورية التي يكتبها البشر يختلف عن منطق الآلات ، فإن إعادة تحرير الكلمات الفورية يمكن أن تجعل ChatGPT أسهل في الفهم."
  },
  "bn": {
    "title": "প্রম্পট শব্দ সংশোধক",
    "prompt": "The entire conversation and instructions should be provided in Bengali. I am trying to get good results from GPT-4 on the following prompt: 'Your prompt.' Could you write a better prompt that is more optimal for GPT-4 and would produce better results?.",
    "description": "আমি নিম্নলিখিত কিউ শব্দগুলি থেকে GPT-4 এ ভাল ফলাফল পাওয়ার চেষ্টা করছি: আপনার কিউ শব্দগুলি। আপনি কি আরও অপ্টিমাইজড প্রম্পট শব্দ লিখতে পারেন যা ভাল ফলাফল দেয়?",
    "remark": "চ্যাটজিপিটি আমাদের জন্য প্রম্পট শব্দগুলি পুনরায় লিখতে দিন। যেহেতু মানুষের দ্বারা লেখা প্রম্পট শব্দগুলির যুক্তি মেশিনের থেকে আলাদা, তাই প্রম্পট শব্দগুলিকে পুনরায় সম্পাদনা করা ChatGPT কে বোঝা সহজ করে তুলতে পারে।"
  },
  "website": "https://learnprompting.org/docs/applied_prompting/short_response#automate-well-defined-prompt-rewriting-with-gpt-3",
  "tags": [
    "ai"
  ],
  "id": 7,
  "weight": 3000
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
