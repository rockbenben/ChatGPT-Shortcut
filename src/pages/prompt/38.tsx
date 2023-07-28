import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "页面 description",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. Respond in Chinese. They should be catchy with a call to action, including the term [主要关键词] in them: [页面内容]",
    "description": "生成 5 个独特的元描述，最多 150 个字符，用于以下文本。它们应该是吸引人的，有行动号召力，包括 [主要关键词]：[页面内容]",
    "remark": "为页面内容生成 Meta description。"
  },
  "en": {
    "title": "Page description",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. They should be catchy with a call to action, including the term [keywords] in them: [page content]",
    "remark": "Generate description for page content."
  },
  "ja": {
    "title": "ページの説明",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Janpanese. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "以下のテキストについて、150 文字以内のユニークなメタディスクリプションを 5 つ生成してください。それらは魅力的で、行動喚起があり、[メインキーワード]: [ページコンテンツ] を含む必要があります。",
    "remark": "ページコンテンツ用のメタディスクリプションを生成する。"
  },
  "ko": {
    "title": "페이지 설명",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Korean. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "다음 텍스트에 대해 최대 150 자의 고유한 메타 설명 5 개를 생성합니다. 매력적이고, 클릭 유도 문안이 있어야 하며, [주요 키워드]: [페이지 콘텐츠] 를 포함해야 합니다.",
    "remark": "페이지 콘텐츠에 대한 메타 설명을 생성합니다."
  },
  "es": {
    "title": "Descripción de la página",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Spanish. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "Genere 5 meta descripciones únicas de hasta 150 caracteres para el siguiente texto. Deben ser atractivas, tener una llamada a la acción e incluir [palabra clave principal]: [contenido de la página].",
    "remark": "Generar meta descripción para el contenido de la página."
  },
  "fr": {
    "title": "Description de la page",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in French. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "Créez 5 méta-descriptions uniques de 150 caractères maximum pour le texte suivant. Elles doivent être attrayantes, comporter un appel à l'action et inclure [mot-clé principal] : [contenu de la page].",
    "remark": "Générer une méta description pour le contenu de la page."
  },
  "de": {
    "title": "Beschreibung der Seite",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in German. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "Erstellen Sie 5 einzigartige Meta-Beschreibungen mit bis zu 150 Zeichen für den folgenden Text. Sie sollten ansprechend sein, eine Aufforderung zum Handeln enthalten und [primäres Schlüsselwort]: [Seiteninhalt] beinhalten.",
    "remark": "Generieren Sie eine Meta-Beschreibung für den Seiteninhalt."
  },
  "it": {
    "title": "Descrizione della pagina",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Italian. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "Generare 5 meta descrizioni uniche di massimo 150 caratteri per il seguente testo. Devono essere accattivanti, contenere un invito all'azione e includere [parola chiave principale]: [contenuto della pagina].",
    "remark": "Generare la meta descrizione per il contenuto della pagina."
  },
  "ru": {
    "title": "Описание страницы",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Russian. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "Создайте 5 уникальных метаописаний объемом до 150 символов для следующего текста. Они должны быть увлекательными, содержать призыв к действию и включать [главное ключевое слово]: [содержание страницы].",
    "remark": "Генерировать метаописание для содержимого страницы."
  },
  "pt": {
    "title": "Descrição da página",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Portuguese. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "Crie 5 meta descrições únicas com um máximo de 150 caracteres para o texto seguinte. Devem ser cativantes, ter um apelo à ação e incluir [palavra-chave principal]: [conteúdo da página]",
    "remark": "Gerar uma meta descrição para o conteúdo da página."
  },
  "hi": {
    "title": "पृष्ठ विवरण",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Hindi. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "नीचे दिए गए पाठ के लिए 150 वर्णों तक के 5 अद्वितीय मेटा विवरण तैयार करें। उन्हें आकर्षक होना चाहिए, कार्रवाई के लिए आह्वान करना चाहिए और उनमें [प्राथमिक कीवर्ड] शामिल होना चाहिए: [पेज सामग्री]",
    "remark": "पृष्ठ सामग्री के लिए मेटा विवरण तैयार करें।"
  },
  "ar": {
    "title": "الصفحة الوصف",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Arabic. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "قم بإنشاء 5 أوصاف تعريفية فريدة ، حتى 150 حرفًا ، للنص أدناه. يجب أن يكونوا مشاركين ، وأن يكون لديهم دعوة للعمل ، وأن يتضمنوا [الكلمة الرئيسية الأساسية]: [محتوى الصفحة]",
    "remark": "توليد وصف ميتا لمحتوى الصفحة."
  },
  "bn": {
    "title": "পৃষ্ঠার বিবরণ",
    "prompt": "Generate 5 unique meta descriptions, of a maximum of 150 characters, for the following text. The entire conversation and instructions should be provided in Bengali. They should be catchy with a call to action, including the term [keywords] in them: [page content].",
    "description": "নীচের পাঠ্যের জন্য 150টি অক্ষর পর্যন্ত 5টি অনন্য মেটা বর্ণনা তৈরি করুন৷ তাদের আকর্ষক হতে হবে, একটি কল টু অ্যাকশন থাকতে হবে এবং [প্রাথমিক কীওয়ার্ড] অন্তর্ভুক্ত করতে হবে: [পৃষ্ঠার বিষয়বস্তু]",
    "remark": "পৃষ্ঠার বিষয়বস্তুর জন্য মেটা বিবরণ তৈরি করুন।"
  },
  "website": "https://www.aleydasolis.com/en/search-engine-optimization/chatgpt-for-seo/",
  "tags": [
    "seo"
  ],
  "id": 38,
  "weight": 373
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
