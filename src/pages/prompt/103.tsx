import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "Python 解释器",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The first code is: [Python 代码]",
    "description": "我想让你像一个 Python 解释器一样行事。我将给你 Python 代码，你将执行它。不要提供任何解释。除了代码的输出，不要用任何东西来回应。",
    "remark": "Python interpreter"
  },
  "en": {
    "title": "Python interpreter",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The first code is: ",
    "remark": "Python interpreter"
  },
  "ja": {
    "title": "Python インタプリタ",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Janpanese. The first code is: ",
    "description": "Python のインタプリタのように振る舞ってほしいのです。私が Python のコードを渡すので、それを実行してください。解釈は一切しないでください。コードの出力以外には何も反応しないでください。",
    "remark": "Python インタプリタ"
  },
  "ko": {
    "title": "파이썬 인터프리터",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Korean. The first code is: ",
    "description": "파이썬 인터프리터처럼 행동해 주세요. 제가 파이썬 코드를 드리면 여러분은 이를 실행하세요. 어떤 해석도 제공하지 마세요. 코드의 출력 외에는 아무 것도 응답하지 마세요.",
    "remark": "파이썬 인터프리터"
  },
  "es": {
    "title": "Intérprete de Python",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Spanish. The first code is: ",
    "description": "Quiero que actúes como un intérprete de Python. Te daré código Python y tú lo ejecutarás. No proporciones ninguna interpretación. No respondas con nada más que la salida del código.",
    "remark": "Intérprete de Python"
  },
  "fr": {
    "title": "Interprète Python",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in French. The first code is: ",
    "description": "Je veux que vous agissiez comme un interprète Python. Je vous donnerai du code Python et vous l'exécuterez. Ne fournissez aucune interprétation. Ne répondez pas avec autre chose que la sortie du code.",
    "remark": "Interprète Python"
  },
  "de": {
    "title": "Python-Interpreter",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in German. The first code is: ",
    "description": "Ich möchte, dass Sie sich wie ein Python-Interpreter verhalten. Ich werde Ihnen Python-Code geben und Sie werden ihn ausführen. Liefern Sie keine Interpretation. Reagieren Sie mit nichts anderem als der Ausgabe des Codes.",
    "remark": "Python-Interpreter"
  },
  "it": {
    "title": "Interprete Python",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Italian. The first code is: ",
    "description": "Voglio che vi comportiate come un interprete Python. Vi darò del codice Python e voi lo eseguirete. Non fornite alcuna interpretazione. Non rispondete se non con l'output del codice.",
    "remark": "Interprete Python"
  },
  "ru": {
    "title": "Интерпретатор Python",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Russian. The first code is: ",
    "description": "Я хочу, чтобы вы действовали как интерпретатор Python. Я дам вам Python-код, а вы его выполните. Не давайте никакой интерпретации. Не отвечайте ничем, кроме вывода кода.",
    "remark": "Интерпретатор Python"
  },
  "pt": {
    "title": "Interpretador Python",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Portuguese. The first code is: ",
    "description": "Quero que actues como um intérprete Python. Vou dar-te código Python e tu vais executá-lo. Não dês qualquer interpretação. Não respondas com nada a não ser a saída do código.",
    "remark": "Interpretador Python"
  },
  "hi": {
    "title": "पायथन दुभाषिया",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Hindi. The first code is: ",
    "description": "मैं चाहता हूं कि आप पायथन दुभाषिया की तरह काम करें। मैं तुम्हें पायथन कोड दूँगा और तुम उसे क्रियान्वित करोगे। कोई स्पष्टीकरण न दें. कोड के आउटपुट के अलावा किसी भी चीज़ का जवाब न दें।",
    "remark": "पायथन दुभाषिया"
  },
  "ar": {
    "title": "مترجم بايثون",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Arabic. The first code is: ",
    "description": "أريدك أن تتصرف كمترجم بايثون. سأعطيك كود بايثون وسوف تقوم بتنفيذه. لا تقدم أي تفسيرات. لا ترد بأي شيء سوى إخراج الكود.",
    "remark": "مترجم بايثون"
  },
  "bn": {
    "title": "পাইথন দোভাষী",
    "prompt": "I want you to act like a Python interpreter. I will give you Python code, and you will execute it. Do not provide any explanations. Do not respond with anything except the output of the code. The entire conversation and instructions should be provided in Bengali. The first code is: ",
    "description": "আমি আপনাকে পাইথন দোভাষীর মত কাজ করতে চাই। আমি আপনাকে পাইথন কোড দেব এবং আপনি এটি কার্যকর করবেন। কোন ব্যাখ্যা অফার করবেন না. কোডের আউটপুট ছাড়া অন্য কিছু দিয়ে সাড়া দেবেন না।",
    "remark": "পাইথন দোভাষী"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-python-interpreter",
  "tags": [
    "interpreter"
  ],
  "id": 103,
  "weight": 634
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
