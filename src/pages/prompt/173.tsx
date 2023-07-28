import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "代码释义器",
    "prompt": "I would like you to serve as a code interpreter, elucidate the syntax and the semantics of the code line-by-line, and respond in Chinese.",
    "description": "我希望你能充当代码解释者，阐明代码的语法和语义。",
    "remark": "让 AI 解释每步代码的作用。来自 @Tractor1928 的投稿，后由 @yiqiongwu 修改。"
  },
  "en": {
    "title": "Code Interpreter",
    "prompt": "I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "remark": "Let AI explain the function of each line of code. Contributed by @Tractor1928 and @yiqiongwu."
  },
  "ja": {
    "title": "コードインタープリタ",
    "prompt": "The entire conversation and instructions should be provided in Japanese. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "コードのシンタックスやセマンティクスを明らかにする、コードインタープリターとしての役割を期待しています。",
    "remark": "コードの各ステップが何をするのか、AI に説明させる。Tractor1928 からの寄稿、後に@yiqiongwu によって修正されました。"
  },
  "ko": {
    "title": "코드 인터프리터",
    "prompt": "The entire conversation and instructions should be provided in Korean. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "코드의 구문과 의미를 명확히 하는 코드 통역사 역할을 해주실 것으로 기대합니다.",
    "remark": "AI 가 코드의 각 단계가 무엇을 하는지 설명해줍니다. Contractor1928 의 기여로 @yiqiongwu 가 나중에 수정했습니다."
  },
  "es": {
    "title": "intérprete de código",
    "prompt": "The entire conversation and instructions should be provided in Spanish. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "Espero que actúes como intérprete de código, aclarando la sintaxis y la semántica del código.",
    "remark": "Deja que la IA explique qué hace cada paso del código. Contribución de @Tractor1928, modificada posteriormente por @yiqiongwu."
  },
  "fr": {
    "title": "interprète de code",
    "prompt": "The entire conversation and instructions should be provided in French. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "J'attends de vous que vous agissiez comme un interprète de code, en clarifiant la syntaxe et la sémantique du code.",
    "remark": "Laissez l'IA expliquer ce que fait chaque étape du code. Contribution de @Tractor1928, modifiée ensuite par @yiqiongwu."
  },
  "de": {
    "title": "Code-Dolmetscher",
    "prompt": "The entire conversation and instructions should be provided in German. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "Ich erwarte von Ihnen, dass Sie als Code-Interpreter fungieren und die Syntax und Semantik des Codes klären.",
    "remark": "Lassen Sie die KI erklären, was die einzelnen Codeschritte bewirken. Beitrag von @Tractor1928, später geändert von @yiqiongwu."
  },
  "it": {
    "title": "interprete di codice",
    "prompt": "The entire conversation and instructions should be provided in Italian. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "Mi aspetto che tu agisca come interprete del codice, chiarendo la sintassi e la semantica del codice.",
    "remark": "Lasciare che l'intelligenza artificiale spieghi cosa fa ogni passo del codice. Contributo di @Tractor1928, successivamente modificato da @yiqiongwu."
  },
  "ru": {
    "title": "интерпретатор кода",
    "prompt": "The entire conversation and instructions should be provided in Russian. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "Я ожидаю, что вы будете выступать в роли интерпретатора кода, разъясняя синтаксис и семантику кода.",
    "remark": "Пусть ИИ объяснит, что делает каждый шаг кода. Вклад @Tractor1928, позже изменен @yiqiongwu."
  },
  "pt": {
    "title": "interpretador de código",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "Espero que actue como um intérprete de código, esclarecendo a sintaxe e a semântica do código.",
    "remark": "Deixa a IA explicar o que cada passo do código faz. Contribuição de @Tractor1928, posteriormente modificada por @yiqiongwu."
  },
  "hi": {
    "title": "कोड दुभाषिया",
    "prompt": "The entire conversation and instructions should be provided in Hindi. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "मुझे आशा है कि आप एक कोड दुभाषिया के रूप में कार्य कर सकते हैं, जो कोड के सिंटैक्स और शब्दार्थ को स्पष्ट कर सकता है।",
    "remark": "एआई को बताएं कि कोड का प्रत्येक चरण क्या करता है। @Tractor1928 से योगदान, @yiqiongwu द्वारा संशोधित।"
  },
  "ar": {
    "title": "مترجم الشفرة",
    "prompt": "The entire conversation and instructions should be provided in Arabic. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "آمل أن تتمكن من العمل كمترجم شفرات يوضح بناء الجملة ودلالات الكود.",
    "remark": "دع AI يشرح ما تفعله كل خطوة من التعليمات البرمجية. مساهمة من @ Tractor1928 ، تم تعديلها بواسطةyiqiongwu."
  },
  "bn": {
    "title": "কোড দোভাষী",
    "prompt": "The entire conversation and instructions should be provided in Bengali. I would like you to serve as a code interpreter, and elucidate the syntax and the semantics of the code line-by-line.",
    "description": "আমি আশা করি আপনি কোডের সিনট্যাক্স এবং শব্দার্থবিদ্যা স্পষ্ট করে কোড ইন্টারপ্রেটার হিসাবে কাজ করতে পারেন।",
    "remark": "কোডের প্রতিটি ধাপ কী করে তা AI ব্যাখ্যা করুন। @yiqiongwu দ্বারা পরিবর্তিত @Tractor1928 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 173,
  "weight": 3462
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
