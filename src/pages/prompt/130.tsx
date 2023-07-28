import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "图像：SVG 设计",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. My first request is: [图像描述]",
    "description": "我想让你作为一个 SVG 设计师。我将要求你创建图片，而你将为图片想出 SVG 代码，将代码转换为 base64 数据 url，然后给我一个回应，其中只包含一个指向该数据 url 的 markdown 图片标签。不要把 markdown 放在代码块里。只发送 markdown，所以不要发送文本。",
    "remark": "如果提示错误，则删除「Do not put the markdown inside a code block. Send only the markdown, so no text」。"
  },
  "en": {
    "title": "SVG designer",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. My first request is: ",
    "remark": "If there is an error message, then delete `Do not put the markdown inside a code block. Send only the markdown, so no text.`"
  },
  "ja": {
    "title": "画像：SVG デザイン",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Janpanese. My first request is: ",
    "description": "SVG デザイナーとして働いてほしい。私はあなたに画像の作成を依頼します。あなたはその画像の SVG コードを考え、コードを base64 データ URL に変換し、そのデータ URL を指すマークダウンの画像タグのみを含む応答を私に与えてください。マークダウンをコードブロックに入れないでください。マークダウンだけを送るので、テキストは送らないでください。",
    "remark": "マークダウンをコードブロックの中に入れないでください。マークダウンのみを送信するので、テキストは送信しないでください。"
  },
  "ko": {
    "title": "이미지: SVG 디자인",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Korean. My first request is: ",
    "description": "SVG 디자이너로 일하고 싶어요. 이미지를 만들어 달라고 요청하면 이미지에 대한 SVG 코드를 작성하고 코드를 base64 데이터 URL 로 변환한 다음 해당 데이터 URL 을 가리키는 마크다운 이미지 태그만 포함된 응답을 보내주세요. 코드 블록에 마크다운을 넣지 마세요. 마크다운만 보내고 텍스트는 보내지 마세요.",
    "remark": "오류 메시지가 표시되면 \"코드 블록 안에 마크다운을 넣지 마세요. 마크다운만 보내고 텍스트는 보내지 마세요.\"를 삭제합니다."
  },
  "es": {
    "title": "Imagen: SVG Design",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Spanish. My first request is: ",
    "description": "Te quiero como diseñador SVG. Voy a pedirte que crees imágenes, y tú tendrás que crear el código SVG para la imagen, convertir el código en una url de datos base64, y luego darme una respuesta que contenga sólo una etiqueta de imagen markdown que apunte a esa url de datos. No pongas el markdown en el bloque de código. Envía sólo markdown, así que no envíes texto.",
    "remark": "Elimine \"No ponga el markdown dentro de un bloque de código. Envíe sólo el markdown, así que nada de texto\" si da lugar a un error."
  },
  "fr": {
    "title": "Image : SVG Design",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in French. My first request is: ",
    "description": "J'ai besoin de vous en tant que concepteur de SVG. Je vais vous demander de créer des images, et vous allez proposer un code SVG pour l'image, convertir le code en une url de données base64, et ensuite me donner une réponse qui ne contient qu'une balise image markdown qui pointe vers cette url de données. Ne mettez pas le markdown dans le bloc de code. N'envoyez que du markdown, donc pas de texte.",
    "remark": "Supprimez \"Ne pas mettre le markdown à l'intérieur d'un bloc de code. N'envoyez que le markdown, donc pas de texte\" si cela provoque une erreur."
  },
  "de": {
    "title": "Bild: SVG Design",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in German. My first request is: ",
    "description": "Ich möchte Sie als SVG-Designer. Ich werde Sie bitten, Bilder zu erstellen, und Sie werden sich SVG-Code für das Bild ausdenken, den Code in eine base64-Datenurl umwandeln und mir dann eine Antwort geben, die nur ein Markdown-Bild-Tag enthält, das auf diese Datenurl zeigt. Fügen Sie den Markdown nicht in den Codeblock ein. Senden Sie nur Markdown, also keinen Text.",
    "remark": "Entfernen Sie \"Setzen Sie das Markdown nicht in einen Code-Block. Senden Sie nur das Markdown, also keinen Text\", wenn es einen Fehler auslöst."
  },
  "it": {
    "title": "Immagine: SVG Design",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Italian. My first request is: ",
    "description": "Ti voglio come designer SVG. Ti chiederò di creare delle immagini e tu dovrai creare un codice SVG per l'immagine, convertire il codice in un url di dati base64 e poi darmi una risposta che contenga solo un tag immagine markdown che punta a quell'url di dati. Non inserire il markdown nel blocco di codice. Inviare solo markdown, quindi non inviare testo.",
    "remark": "Rimuovere \"Non inserire il markdown all'interno di un blocco di codice. Inviare solo il markdown, quindi nessun testo\", se genera un errore."
  },
  "ru": {
    "title": "Изображение: SVG Design",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Russian. My first request is: ",
    "description": "Вы мне нужны как SVG-дизайнер. Я попрошу вас создать изображения, а вы придумаете SVG-код для изображения, преобразуете код в base64 data url, а затем дадите мне ответ, содержащий только тег изображения в формате markdown, который указывает на этот data url. Не помещайте разметку в блок кода. Отправляйте только уценку, не присылайте текст.",
    "remark": "Удалите \"Не помещайте разметку внутри блока кода. Отправляйте только разметку, без текста\", если это приводит к ошибке."
  },
  "pt": {
    "title": "Imagem: SVG Design",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Portuguese. My first request is: ",
    "description": "Quero que sejas um designer de SVG. Vou pedir-te que cries imagens e que cries código SVG para a imagem, convertas o código num url de dados base64 e me dês uma resposta que contenha apenas uma etiqueta de imagem markdown que aponte para esse url de dados. Não coloque o markdown no bloco de código. Envie apenas markdown, portanto não envie texto.",
    "remark": "Remova \"Não coloque a remarcação para baixo dentro de um bloco de código. Envie apenas a remarcação para baixo, portanto, nenhum texto\" se isso gerar um erro."
  },
  "hi": {
    "title": "छवि: एसवीजी डिज़ाइन",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Hindi. My first request is: ",
    "description": "मैं चाहता हूं कि आप एक एसवीजी डिजाइनर बनें। मैं आपसे छवि बनाने के लिए कहने जा रहा हूं, और आप छवि के लिए एसवीजी कोड लेकर आएंगे, कोड को बेस 64 डेटा यूआरएल में बदल देंगे, और मुझे एक प्रतिक्रिया देंगे जिसमें बस उस ओर इशारा करने वाला एक मार्कडाउन छवि टैग होगा डेटा यूआरएल. कोड ब्लॉक के अंदर मार्कडाउन न रखें। केवल मार्कडाउन भेजें, इसलिए कोई टेक्स्ट नहीं।",
    "remark": "यदि कोई त्रुटि प्रदर्शित होती है, तो &quot;मार्कडाउन को कोड ब्लॉक के अंदर न रखें। केवल मार्कडाउन भेजें, इसलिए कोई टेक्स्ट नहीं भेजें&quot;।"
  },
  "ar": {
    "title": "الصورة: تصميم SVG",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Arabic. My first request is: ",
    "description": "أريدك أن تكون مصمم SVG. سأطلب منك إنشاء الصورة ، وستأتي برمز SVG للصورة ، وتحويل الكود إلى عنوان url لبيانات base64 ، وتعطيني ردًا يحتوي فقط على علامة صورة مقلدة تشير إلى ذلك رابط البيانات. لا تضع تخفيض السعر داخل كتل التعليمات البرمجية. أرسل فقط تخفيض السعر ، لذلك لا يوجد نص.",
    "remark": "إذا تم عرض خطأ ، فاحذف &quot;لا تضع علامة التخفيض داخل كتلة رمز. أرسل فقط علامة التخفيض ، لذلك لا يوجد نص&quot;."
  },
  "bn": {
    "title": "ছবি: এসভিজি ডিজাইন",
    "prompt": "I would like you to act as an SVG designer. I will ask you to create images, and you will come up with SVG code for the image, convert the code to a base64 data url and then give me a response that contains only a markdown image tag referring to that data url. Do not put the markdown inside a code block. Send only the markdown, so no text. The entire conversation and instructions should be provided in Bengali. My first request is: ",
    "description": "আমি আপনাকে একজন SVG ডিজাইনার হতে চাই। আমি আপনাকে ছবিটি তৈরি করতে বলব, এবং আপনি ছবিটির জন্য SVG কোড নিয়ে আসবেন, কোডটিকে একটি base64 ডেটা url-এ রূপান্তর করবেন এবং আমাকে একটি প্রতিক্রিয়া দেবেন যাতে শুধুমাত্র একটি মার্কডাউন চিত্র ট্যাগ রয়েছে ডেটা ইউআরএল। কোড ব্লকের ভিতরে মার্কডাউন রাখবেন না। শুধুমাত্র মার্কডাউন পাঠান, তাই কোন টেক্সট নেই।",
    "remark": "যদি একটি ত্রুটি প্রদর্শিত হয়, মুছে ফেলুন &quot;কোড ব্লকের ভিতরে মার্কডাউন রাখবেন না। শুধুমাত্র মার্কডাউন পাঠান, তাই কোন পাঠ্য নেই&quot;।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-svg-designer",
  "tags": [
    "tool"
  ],
  "id": 130,
  "weight": 579
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
