import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "正则生成器",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. My first prompt is to generate a regular expression that matches [正则要求]",
    "description": "我希望你充当一个正则表达式生成器。你的角色是生成匹配文本中特定模式的正则表达式。你应该提供正则表达式的格式，以便于复制和粘贴到支持正则表达式的文本编辑器或编程语言中。不要写关于正则表达式如何工作的解释或例子；只需提供正则表达式本身。我的第一个提示是生成一个匹配 [正则要求] 的正则表达式。",
    "remark": "根据要求生成正则表达式。"
  },
  "en": {
    "title": "regex generator",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. My first prompt is to generate a regular expression that matches ",
    "remark": "Generate regular expressions according to requirements."
  },
  "ja": {
    "title": "レギュラージェネレーター",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Janpanese. My first prompt is to generate a regular expression that matches ",
    "description": "あなたには、正規表現ジェネレーターとして活躍してほしい。あなたの役割は、テキスト中の特定のパターンにマッチする正規表現を生成することです。正規表現をサポートするテキストエディタやプログラミング言語に簡単にコピー＆ペーストできるように、正規表現の形式を提供する必要があります。正規表現がどのように機能するかについての説明や例は書かず、正規表現そのものを提供するようにしてください。最初のヒントは、[正規の要件] にマッチする正規表現を生成することです。",
    "remark": "要求に応じて正規表現を生成する。"
  },
  "ko": {
    "title": "일반 발전기",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Korean. My first prompt is to generate a regular expression that matches ",
    "description": "정규식 생성기 역할을 해 주세요. 여러분의 역할은 텍스트의 특정 패턴과 일치하는 정규식을 생성하는 것입니다. 정규식을 지원하는 텍스트 편집기나 프로그래밍 언어에 쉽게 복사하여 붙여넣을 수 있도록 정규식의 형식을 제공해야 합니다. 정규 표현식의 작동 방식에 대한 설명이나 예제를 작성하지 말고 정규 표현식 자체만 제공하세요. 첫 번째 팁은 [정규 요구 사항] 과 일치하는 정규식을 생성하는 것입니다.",
    "remark": "요청 시 정규식을 생성합니다."
  },
  "es": {
    "title": "generador regular (informática)",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Spanish. My first prompt is to generate a regular expression that matches ",
    "description": "Quiero que actúes como un generador de expresiones regulares. Tu papel es generar expresiones regulares que coincidan con patrones específicos del texto. Debes proporcionar el formato de la expresión regular para que se pueda copiar y pegar fácilmente en un editor de texto o lenguaje de programación que admita expresiones regulares. No escribas explicaciones o ejemplos de cómo funcionan las expresiones regulares; sólo proporciona la expresión regular en sí. Mi primer consejo es generar una expresión regular que coincida con [Requisitos regulares].",
    "remark": "Generar expresiones regulares a petición."
  },
  "fr": {
    "title": "générateur régulier (informatique)",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in French. My first prompt is to generate a regular expression that matches ",
    "description": "Je vous demande de jouer le rôle d'un générateur d'expressions régulières. Votre rôle est de générer des expressions régulières qui correspondent à des motifs spécifiques dans le texte. Vous devez fournir le format de l'expression régulière afin qu'elle puisse être facilement copiée et collée dans un éditeur de texte ou un langage de programmation prenant en charge les expressions régulières. N'écrivez pas d'explications ou d'exemples sur le fonctionnement des expressions régulières ; fournissez simplement l'expression régulière elle-même. Mon premier conseil est de générer une expression régulière qui corresponde à [Exigences régulières].",
    "remark": "Générer des expressions régulières sur demande."
  },
  "de": {
    "title": "Regelmäßiger Generator (Rechnen)",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in German. My first prompt is to generate a regular expression that matches ",
    "description": "Ich möchte, dass Sie als Generator für reguläre Ausdrücke fungieren. Ihre Aufgabe ist es, reguläre Ausdrücke zu generieren, die bestimmten Mustern im Text entsprechen. Sie sollten das Format des regulären Ausdrucks bereitstellen, so dass er leicht kopiert und in einen Texteditor oder eine Programmiersprache, die reguläre Ausdrücke unterstützt, eingefügt werden kann. Schreiben Sie keine Erklärungen oder Beispiele dafür, wie reguläre Ausdrücke funktionieren, sondern geben Sie nur den regulären Ausdruck selbst an. Mein erster Tipp ist, einen regulären Ausdruck zu erzeugen, der auf [Reguläre Anforderungen] passt.",
    "remark": "Generieren Sie auf Anfrage reguläre Ausdrücke."
  },
  "it": {
    "title": "generatore regolare (informatica)",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Italian. My first prompt is to generate a regular expression that matches ",
    "description": "Voglio che tu agisca come un generatore di espressioni regolari. Il vostro ruolo è quello di generare espressioni regolari che corrispondano a modelli specifici nel testo. Dovete fornire il formato dell'espressione regolare in modo che possa essere facilmente copiata e incollata in un editor di testo o in un linguaggio di programmazione che supporti le espressioni regolari. Non scrivete spiegazioni o esempi di come funzionano le espressioni regolari; fornite solo l'espressione regolare stessa. Il mio primo consiglio è quello di generare un'espressione regolare che corrisponda a [Requisiti regolari].",
    "remark": "Genera espressioni regolari su richiesta."
  },
  "ru": {
    "title": "регулярный генератор (вычислительная техника)",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Russian. My first prompt is to generate a regular expression that matches ",
    "description": "Я хочу, чтобы вы выступили в роли генератора регулярных выражений. Ваша роль заключается в генерации регулярных выражений, соответствующих определенным шаблонам в тексте. Вы должны предоставить формат регулярного выражения, чтобы его можно было легко скопировать и вставить в текстовый редактор или язык программирования, поддерживающий регулярные выражения. Не надо писать объяснения или примеры того, как работают регулярные выражения, достаточно предоставить само регулярное выражение. Мой первый совет - сгенерировать регулярное выражение, соответствующее [Регулярные требования].",
    "remark": "Генерация регулярных выражений по запросу."
  },
  "pt": {
    "title": "gerador regular (informática)",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Portuguese. My first prompt is to generate a regular expression that matches ",
    "description": "Quero que actues como um gerador de expressões regulares. O teu papel é gerar expressões regulares que correspondam a padrões específicos no texto. Deve fornecer o formato da expressão regular para que possa ser facilmente copiada e colada num editor de texto ou numa linguagem de programação que suporte expressões regulares. Não escreva explicações ou exemplos de como as expressões regulares funcionam; forneça apenas a própria expressão regular. A minha primeira dica é gerar uma expressão regular que corresponda a [Requisitos regulares].",
    "remark": "Gerar expressões regulares a pedido."
  },
  "hi": {
    "title": "नियमित जनरेटर",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Hindi. My first prompt is to generate a regular expression that matches ",
    "description": "मैं चाहता हूं कि आप रेगेक्स जनरेटर के रूप में कार्य करें। आपकी भूमिका नियमित अभिव्यक्ति उत्पन्न करने की है जो पाठ में विशिष्ट पैटर्न से मेल खाती है। आपको नियमित अभिव्यक्ति का समर्थन करने वाले टेक्स्ट एडिटर या प्रोग्रामिंग भाषा में आसानी से कॉपी करने और चिपकाने के लिए नियमित अभिव्यक्ति का प्रारूप प्रदान करना चाहिए। रेगुलर एक्सप्रेशन कैसे काम करते हैं, इसका स्पष्टीकरण या उदाहरण न लिखें; केवल रेगुलर एक्सप्रेशन स्वयं प्रदान करें। मेरी पहली युक्ति एक रेगेक्स उत्पन्न करना है जो [रेगेक्स आवश्यकताओं] से मेल खाता हो।",
    "remark": "अनुरोध पर नियमित अभिव्यक्ति उत्पन्न करें।"
  },
  "ar": {
    "title": "مولد عادي",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Arabic. My first prompt is to generate a regular expression that matches ",
    "description": "أريدك أن تعمل كمولد regex. يتمثل دورك في إنشاء تعبيرات عادية تطابق أنماطًا معينة في النص. يجب توفير تنسيق التعبير العادي لسهولة النسخ واللصق في محرر نص أو لغة برمجة تدعم التعبيرات العادية. لا تكتب تفسيرات أو أمثلة لكيفية عمل التعبيرات العادية ؛ فقط قدم التعابير النمطية نفسها. نصيحتي الأولى هي إنشاء regex يتطابق مع [متطلبات regex].",
    "remark": "توليد التعبيرات العادية عند الطلب."
  },
  "bn": {
    "title": "নিয়মিত জেনারেটর",
    "prompt": "I want you to act as a regex generator. Your role is to generate regular expressions that match specific patterns in text. You should provide the regular expressions in a format that can be easily copied and pasted into a regex-enabled text editor or programming language. Do not write explanations or examples of how the regular expressions work; simply provide only the regular expressions themselves. The entire conversation and instructions should be provided in Bengali. My first prompt is to generate a regular expression that matches ",
    "description": "আমি চাই আপনি একটি রেজেক্স জেনারেটর হিসাবে কাজ করুন। আপনার ভূমিকা পাঠ্যের নির্দিষ্ট নিদর্শনগুলির সাথে মেলে এমন নিয়মিত অভিব্যক্তি তৈরি করা। রেগুলার এক্সপ্রেশন সমর্থন করে এমন একটি টেক্সট এডিটর বা প্রোগ্রামিং ল্যাংগুয়েজে সহজে কপি এবং পেস্ট করার জন্য আপনাকে রেগুলার এক্সপ্রেশনের ফর্ম্যাট প্রদান করা উচিত। রেগুলার এক্সপ্রেশন কীভাবে কাজ করে তার ব্যাখ্যা বা উদাহরণ লিখবেন না; শুধু রেগুলার এক্সপ্রেশনগুলি নিজেরাই প্রদান করুন। আমার প্রথম টিপ হল একটি রেজেক্স তৈরি করা যা মেলে [regex প্রয়োজনীয়তা]।",
    "remark": "অনুরোধে রেগুলার এক্সপ্রেশন তৈরি করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-regex-generator",
  "tags": [
    "code"
  ],
  "id": 98,
  "weight": 454
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
