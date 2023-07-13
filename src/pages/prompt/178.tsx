import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "开发：Vue3",
    "prompt": "Create a Vue 3 component that displays a [开发项目] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. Display Chinese text in the view and include styles. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "description": "作为 Vue3 开发人员，你的任务是使用 Yarn、Vite、Vue3、TS、Pinia 和 Vueuse 工具编写一个计数器。你的响应应该是满足以下要求的代码：使用 Vue3 的 Composition API 和 <script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "辅助 Vue3 开发。来自 @gandli 的投稿。"
  },
  "en": {
    "title": "Vue3 component",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. Provide only the necessary code to meet these requirements without explanations or descriptions.",
    "remark": "Auxiliary development for Vue3. Contributed by @gandli."
  },
  "ja": {
    "title": "開発：Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Janpanese. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Vue3 開発者として、あなたは Yarn、Vite、Vue3、TS、Pinia、Vueuse の各ツールを使ってカウンターを書くという課題を与えられています。あなたの回答は、以下の要件を満たすコードでなければなりません：Vue3 の Composition API と<script setup>構文を使用してテンプレート、スクリプト、スタイルを vue ファイルに結合する、ビューに中国語テキストを表示する、スタイルを含む。なお、これらの要件を満たすために必要なコードのみを提供する必要があり、説明や解説は不要です。",
    "remark": "Vue3 開発のお手伝い。gandli さんからの寄稿です。"
  },
  "ko": {
    "title": "개발: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Korean. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Vue3 개발자는 Yarn, Vite, Vue3, TS, Pinia 및 Vueuse 도구를 사용하여 카운터를 작성하는 임무를 맡게 됩니다. 응답은 다음 요구 사항을 충족하는 코드여야 합니다: 템플릿, 스크립트 및 스타일을 Vue3 의 컴포지션 API 및 <스크립트 설정> 구문을 사용하여 vue 파일로 결합하고, 뷰에 중국어 텍스트를 표시하며, 스타일을 포함해야 합니다. 이러한 요구 사항을 충족하는 데 필요한 코드만 제공해야 하며 설명이나 설명은 필요하지 않습니다.",
    "remark": "Vue3 개발 지원. gandli 의 기여."
  },
  "es": {
    "title": "Desarrollo: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Spanish. Provide only the necessary code to meet these requirements without explanations or descriptions..",
    "description": "Como desarrollador de Vue3, su tarea es escribir un contador utilizando las herramientas Yarn, Vite, Vue3, TS, Pinia y Vueuse. Su respuesta debe ser un código que cumpla con los siguientes requisitos: usar la API de composición de Vue3 y<script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "Ayudar al desarrollo de Vue3. Contribución de @gandli."
  },
  "fr": {
    "title": "Développement : Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in French. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "En tant que développeur Vue3, vous êtes chargé d'écrire un compteur à l'aide des outils Yarn, Vite, Vue3, TS, Pinia et Vueuse. Votre réponse doit être un code répondant aux exigences suivantes : combiner des modèles, des scripts et des styles dans un fichier vue en utilisant l'API de composition de Vue3 et la syntaxe <script setup> ; afficher du texte chinois dans la vue ; et inclure des styles. Veuillez noter que vous ne devez fournir que le code nécessaire pour répondre à ces exigences ; aucune explication ou description n'est requise.",
    "remark": "Aide au développement de Vue3. Contribution de @gandli."
  },
  "de": {
    "title": "Entwicklung: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in German. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Als Vue3-Entwickler haben Sie die Aufgabe, einen Zähler unter Verwendung der Tools Yarn, Vite, Vue3, TS, Pinia und Vueuse zu schreiben. Ihre Antwort sollte Code sein, der die folgenden Anforderungen erfüllt: kombiniert Vorlagen, Skripte und Stile in einer Vue-Datei unter Verwendung der Composition API und der <script setup>-Syntax von Vue3; zeigt chinesischen Text in der Ansicht an; und beinhaltet Stile. Bitte beachten Sie, dass Sie nur Code bereitstellen sollten, der notwendig ist, um diese Anforderungen zu erfüllen; eine Erklärung oder Beschreibung ist nicht erforderlich.",
    "remark": "Hilft bei der Entwicklung von Vue3. Beitrag von @gandli."
  },
  "it": {
    "title": "Sviluppo: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Italian. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Come sviluppatore Vue3, il tuo compito è scrivere un contatore utilizzando gli strumenti Yarn, Vite, Vue3, TS, Pinia e Vueuse. La tua risposta dovrebbe essere un codice che soddisfi i seguenti requisiti: utilizzo dell&#39;API Composition di Vue3 e<script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "Assistere lo sviluppo di Vue3. Contributo di @gandli."
  },
  "ru": {
    "title": "Разработка: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Russian. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Ваша задача как разработчика Vue3 — написать счетчик с помощью инструментов Yarn, Vite, Vue3, TS, Pinia и Vueuse. Ваш ответ должен представлять собой код, отвечающий следующим требованиям: использование Composition API Vue3 и<script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "Помощь в разработке Vue3. Вклад от @gandli."
  },
  "pt": {
    "title": "Desenvolvimento: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Portuguese. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Como desenvolvedor Vue3, sua tarefa é escrever um contador usando as ferramentas Yarn, Vite, Vue3, TS, Pinia e Vueuse. Sua resposta deve ser um código que atenda aos seguintes requisitos: usando a API de composição do Vue3 e<script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "Auxiliar no desenvolvimento do Vue3. Contribuição de @gandli."
  },
  "hi": {
    "title": "विकास: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Hindi. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "Vue3 डेवलपर के रूप में, आपका कार्य Yarn, Vite, Vue3, TS, Pinia और Vueuse टूल का उपयोग करके एक काउंटर लिखना है। आपकी प्रतिक्रिया वह कोड होनी चाहिए जो निम्नलिखित आवश्यकताओं को पूरा करती हो: Vue3 के कंपोज़िशन API का उपयोग करना और<script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "Vue3 विकास में सहायता करें। @gandli से योगदान।"
  },
  "ar": {
    "title": "التطوير: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Arabic. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "بصفتك مطور Vue3 ، فإن مهمتك هي كتابة عداد باستخدام أدوات Yarn و Vite و Vue3 و TS و Pinia و Vueuse. يجب أن يكون ردك رمزًا يفي بالمتطلبات التالية: استخدام Vue3&#39;s Composition API و<script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "مساعدة تطوير Vue3. مساهمة منgandli."
  },
  "bn": {
    "title": "উন্নয়ন: Vue3",
    "prompt": "Create a Vue 3 component that displays a [Project] using Yarn, Vite, Vue 3, TypeScript, Pinia, and Vueuse tools. Use Vue 3's Composition API and <script setup> syntax to combine template, script, and style in a single .vue file. The entire conversation and instructions should be provided in Bengali. Provide only the necessary code to meet these requirements without explanations or descriptions...",
    "description": "একজন Vue3 বিকাশকারী হিসাবে, আপনার কাজ হল Yarn, Vite, Vue3, TS, Pinia এবং Vueuse টুল ব্যবহার করে একটি কাউন্টার লেখা। আপনার প্রতিক্রিয়া এমন কোড হওয়া উচিত যা নিম্নলিখিত প্রয়োজনীয়তাগুলি পূরণ করে: Vue3 এর কম্পোজিশন API ব্যবহার করে এবং<script setup>语法将模板、脚本和样式组合到一个 vue 文件中；在视图中显示中文文本；包括样式。请注意，您应该只提供满足这些要求所必需的代码；不需要解释或描述。",
    "remark": "Vue3 বিকাশে সহায়তা করুন। @gandli থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 178,
  "weight": 381
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
