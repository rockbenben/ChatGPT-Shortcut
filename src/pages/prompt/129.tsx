import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "图像：符号设计",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. My first object is '符号对象'",
    "description": "我想让你充当一个 ascii 艺术家。我将把对象写给你，我将要求你在代码块中写出该对象的 ascii 代码。只写 ascii 代码。不要解释你写的对象。我将在双引号中说明这些对象。",
    "remark": "用 Ascii 符号生成不同的图像。"
  },
  "en": {
    "title": "ascii artist",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. My first object is ",
    "remark": "Generate different images using ASCII symbols."
  },
  "ja": {
    "title": "画像：シンボリックデザイン",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Janpanese. My first object is ",
    "description": "あなたにはアスキーアーティストとして活動してほしい。私がオブジェクトを書くので そのオブジェクトの ascii コードを ブロックで書いてもらいます。ascii コードだけを書いてください。書いたオブジェクトを説明してはいけません。私はオブジェクトを二重引用符で囲んで説明します。",
    "remark": "アスキー記法で異なる画像を生成する。"
  },
  "ko": {
    "title": "이미지: 상징적 디자인",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Korean. My first object is ",
    "description": "저는 여러분이 아스키 아티스트로 활동하기를 원합니다. 제가 여러분에게 객체를 작성해 드리고, 여러분에게 코드 블록에 객체에 대한 아스키 코드를 작성해 달라고 요청할 것입니다. 아스키 코드만 작성하세요. 작성한 객체에 대해 설명하지 마세요. 객체를 큰따옴표로 묶어서 설명하겠습니다.",
    "remark": "아스키 표기법을 사용하여 다양한 이미지를 생성합니다."
  },
  "es": {
    "title": "Imagen: Symbol Design",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Spanish. My first object is ",
    "description": "Quiero que actúes como un artista ascii. Te voy a escribir el objeto y te voy a pedir que escribas el código ascii para ese objeto en un bloque de código. Escribe sólo código ascii. No expliques el objeto que estás escribiendo. Explicaré los objetos entre comillas dobles.",
    "remark": "Generar diferentes imágenes en notación Ascii."
  },
  "fr": {
    "title": "Image : Symbol Design",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in French. My first object is ",
    "description": "Je veux que vous agissiez comme un artiste ascii. Je vais vous écrire l'objet et je vais vous demander d'écrire le code ascii de cet objet dans un bloc de code. N'écrivez que du code ascii. N'expliquez pas l'objet que vous écrivez. J'expliquerai les objets entre guillemets.",
    "remark": "Générer différentes images en notation Ascii."
  },
  "de": {
    "title": "Bild: Symbol Design",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in German. My first object is ",
    "description": "Ich möchte, dass Sie die Rolle eines Ascii-Künstlers übernehmen. Ich schreibe Ihnen ein Objekt und bitte Sie, den Ascii-Code für dieses Objekt in einen Codeblock zu schreiben. Schreiben Sie nur ASCII-Code. Erläutern Sie nicht das Objekt, das Sie schreiben. Ich werde die Objekte in doppelten Anführungszeichen erklären.",
    "remark": "Erzeugen Sie verschiedene Bilder in Ascii-Notation."
  },
  "it": {
    "title": "Immagine: Symbol Design",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Italian. My first object is ",
    "description": "Voglio che vi comportiate come un artista ascii. Vi scriverò un oggetto e vi chiederò di scrivere il codice ascii per quell'oggetto in un blocco di codice. Scrivete solo codice ascii. Non spiegate l'oggetto che state scrivendo. Gli oggetti saranno spiegati tra doppi apici.",
    "remark": "Generare diverse immagini in notazione Ascii."
  },
  "ru": {
    "title": "Изображение: Symbol Design",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Russian. My first object is ",
    "description": "Я хочу, чтобы вы выступили в роли художника ascii. Я напишу вам объект и попрошу вас написать ascii код для этого объекта в блоке кода. Пишите только ascii-код. Не объясняйте объект, который вы пишете. Я буду объяснять объекты в двойных кавычках.",
    "remark": "Генерировать различные изображения в нотации Ascii."
  },
  "pt": {
    "title": "Imagem: Symbol Design",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Portuguese. My first object is ",
    "description": "Quero que ajas como um artista ascii. Vou escrever-te o objeto e vou pedir-te que escrevas o código ascii para esse objeto num bloco de código. Escreve apenas código ascii. Não expliques o objeto que estás a escrever. Vou explicar os objectos entre aspas duplas.",
    "remark": "Gerar imagens diferentes em notação Ascii."
  },
  "hi": {
    "title": "छवि: प्रतीक डिज़ाइन",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Hindi. My first object is ",
    "description": "मैं चाहता हूं कि आप एक एएससीआई कलाकार के रूप में काम करें। मैं आपको ऑब्जेक्ट लिखने जा रहा हूं, और मैं आपसे उस ऑब्जेक्ट के लिए एक कोड ब्लॉक में एएससीआई कोड लिखने के लिए कहने जा रहा हूं। केवल एएससीआई कोड लिखें। आपके द्वारा लिखी गई वस्तुओं की व्याख्या न करें। मैं इन वस्तुओं का दोहरे उद्धरण चिह्नों में वर्णन करूंगा।",
    "remark": "Ascii प्रतीकों के साथ विभिन्न छवियां बनाएं।"
  },
  "ar": {
    "title": "الصورة: تصميم الرمز",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Arabic. My first object is ",
    "description": "أريدك أن تتصرف كفنان أسكي. سأكتب لك الكائن ، وسأطلب منك كتابة رمز ascii لهذا الكائن في كتلة تعليمات برمجية. اكتب رموز أسكي فقط. لا تفسر الأشياء التي تكتبها. سأصف هذه الأشياء في اقتباسات مزدوجة.",
    "remark": "توليد صور مختلفة مع رموز Ascii."
  },
  "bn": {
    "title": "ছবি: প্রতীক নকশা",
    "prompt": "I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. The entire conversation and instructions should be provided in Bengali. My first object is ",
    "description": "আমি চাই তুমি একজন ascii শিল্পী হিসেবে অভিনয় কর। আমি আপনাকে বস্তুটি লিখতে যাচ্ছি, এবং আমি আপনাকে একটি কোড ব্লকে সেই বস্তুর জন্য ascii কোড লিখতে বলব। শুধুমাত্র ascii কোড লিখুন। আপনি যে বস্তুগুলি লেখেন তা ব্যাখ্যা করবেন না। আমি এই বস্তুগুলিকে দ্বিগুণ উদ্ধৃতিতে বর্ণনা করব।",
    "remark": "Ascii চিহ্ন দিয়ে বিভিন্ন ছবি তৈরি করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-ascii-artist",
  "tags": [
    "tool"
  ],
  "id": 129,
  "weight": 196
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
