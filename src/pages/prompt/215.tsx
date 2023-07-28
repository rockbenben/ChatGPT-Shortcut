import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "笔记助理",
    "prompt": "I want you to act as a note-taking assistant for a lecture and respond in Chinese. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The lecture note is [待整理笔记]",
    "description": "我希望你能充当一次讲座的笔记助手。你的任务是提供一个详细的笔记列表，其中包括来自讲座的例子，并专注于你认为最有可能出现在测试题中的笔记。此外，请为具有数字和数据的笔记制作一个单独的列表，另外再制作一个包括在这次讲座中的例子的单独列表。这些笔记应该简明易读。",
    "remark": "提取长篇笔记的要点。"
  },
  "en": {
    "title": "note-taking assistant",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The lecture note is ",
    "remark": "Extracting key points from lengthy notes."
  },
  "ja": {
    "title": "ノートアシスタント",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Janpanese. The lecture note is ",
    "description": "ある講義のノートアシスタントをお願いします。あなたの仕事は、講義の例を含む詳細なメモのリストを提供し、テスト問題に出題される可能性が高いと思われるメモに焦点を当てることです。さらに、図やデータを含むノートのリストと、この講義の例を含む別のリストを作成します。これらのノートは、簡潔で読みやすいものでなければなりません。",
    "remark": "長文ノートの要点を抽出する。"
  },
  "ko": {
    "title": "노트 도우미",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Korean. The lecture note is ",
    "description": "강의 중 한 강의의 노트 도우미로 활동해 주셨으면 합니다. 여러분의 임무는 강의의 예시가 포함된 자세한 노트 목록을 제공하고 시험 문제에 나올 가능성이 가장 높다고 생각되는 노트에 집중하는 것입니다. 또한 그림과 데이터가 포함된 노트 목록과 이 강의의 예제가 포함된 노트 목록을 별도로 작성합니다. 이러한 노트는 간결하고 읽기 쉬워야 합니다.",
    "remark": "긴 노트의 요점 추출하기."
  },
  "es": {
    "title": "Asistente de notas",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Spanish. The lecture note is ",
    "description": "Me gustaría que ayudara a tomar apuntes en una de las clases. Su tarea consistirá en elaborar una lista detallada de apuntes que incluya ejemplos de la clase y se centre en los apuntes que, en su opinión, tienen más probabilidades de aparecer en las preguntas del examen. Además, cree una lista separada para las notas con figuras y datos, y otra lista separada que incluya ejemplos de esta clase. Estas notas deben ser concisas y fáciles de leer.",
    "remark": "Extraiga los puntos principales de las notas largas."
  },
  "fr": {
    "title": "Notes Assistant",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in French. The lecture note is ",
    "description": "J'aimerais que vous fassiez office d'assistant à la prise de notes pour l'un des cours magistraux. Votre tâche consiste à fournir une liste détaillée de notes comprenant des exemples tirés du cours et à vous concentrer sur les notes qui, selon vous, sont les plus susceptibles de figurer dans les questions de l'examen. En outre, veuillez créer une liste séparée pour les notes contenant des figures et des données, ainsi qu'une autre liste séparée comprenant des exemples tirés de ce cours. Ces notes doivent être concises et faciles à lire.",
    "remark": "Extraire les points principaux des notes longues."
  },
  "de": {
    "title": "Anmerkungen Assistent",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in German. The lecture note is ",
    "description": "Ich möchte, dass Sie bei einer der Vorlesungen als Assistent für die Erstellung von Notizen fungieren. Ihre Aufgabe ist es, eine detaillierte Liste mit Notizen zu erstellen, die Beispiele aus der Vorlesung enthalten und sich auf die Notizen konzentrieren, die Ihrer Meinung nach am ehesten in den Prüfungsfragen vorkommen werden. Bitte erstellen Sie außerdem eine separate Liste für Notizen mit Abbildungen und Daten sowie eine weitere separate Liste mit Beispielen aus dieser Vorlesung. Diese Notizen sollten prägnant und leicht zu lesen sein.",
    "remark": "Extrahieren Sie die wichtigsten Punkte aus langen Notizen."
  },
  "it": {
    "title": "Note Assistente",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Italian. The lecture note is ",
    "description": "Vorrei che tu facessi da assistente per prendere appunti per una delle lezioni. Il vostro compito è quello di fornire un elenco dettagliato di appunti che includa esempi tratti dalla lezione e che si concentri sulle note che ritenete più probabili nelle domande del test. Inoltre, si prega di creare un elenco separato per gli appunti con figure e dati e un altro elenco separato che includa esempi tratti da questa lezione. Questi appunti devono essere concisi e facili da leggere.",
    "remark": "Estrarre i punti principali delle note lunghe."
  },
  "ru": {
    "title": "Notes Assistant",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Russian. The lecture note is ",
    "description": "Я хотел бы, чтобы Вы выступили в качестве ассистента по конспектированию одной из лекций. Ваша задача - составить подробный список записей, включающий примеры из лекции, и сосредоточиться на тех записях, которые, по вашему мнению, с наибольшей вероятностью будут встречаться в вопросах теста. Кроме того, создайте, пожалуйста, отдельный список для заметок с рисунками и данными, а также еще один отдельный список, включающий примеры из данной лекции. Эти заметки должны быть краткими и легко читаемыми.",
    "remark": "Извлечение основных положений из длинных заметок."
  },
  "pt": {
    "title": "Notas Assistente",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Portuguese. The lecture note is ",
    "description": "Gostaria que fosse um assistente de anotações para uma das aulas. A sua tarefa é fornecer uma lista detalhada de notas que inclua exemplos da aula e concentrar-se nas notas que considera mais prováveis de aparecer nas perguntas do teste. Além disso, crie uma lista separada para notas com figuras e dados, e outra lista separada que inclua exemplos desta aula. Estas notas devem ser concisas e fáceis de ler.",
    "remark": "Extrair os pontos principais de notas longas."
  },
  "hi": {
    "title": "नोट सहायक",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Hindi. The lecture note is ",
    "description": "मुझे आशा है कि आप व्याख्यान के लिए नोट लेने वाले सहायक के रूप में कार्य कर सकते हैं। आपका काम एक विस्तृत नोट सूची प्रदान करना है जिसमें व्याख्यान से उदाहरण शामिल हैं और उन नोट्स पर ध्यान केंद्रित करना है जो आपको लगता है कि परीक्षण प्रश्नों में आने की सबसे अधिक संभावना है। इसके अलावा, कृपया संख्याओं और डेटा वाले नोट्स के लिए एक अलग सूची बनाएं और इस व्याख्यान में शामिल उदाहरणों के लिए एक अलग सूची बनाएं। ये नोट्स संक्षिप्त और पढ़ने में आसान होने चाहिए।",
    "remark": "लंबे नोट्स का सार निकालें."
  },
  "ar": {
    "title": "مساعد ملاحظة",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Arabic. The lecture note is ",
    "description": "آمل أن تتمكن من العمل كمساعد لتدوين الملاحظات في إحدى المحاضرات. مهمتك هي تقديم قائمة ملاحظات مفصلة تتضمن أمثلة من المحاضرة والتركيز على الملاحظات التي تعتقد أنه من المرجح أن تظهر في أسئلة الاختبار. أيضا ، يرجى عمل قائمة منفصلة للملاحظات مع الأرقام والبيانات ، وقائمة منفصلة للأمثلة المدرجة في هذه المحاضرة. يجب أن تكون هذه الملاحظات موجزة وسهلة القراءة.",
    "remark": "استخرج جوهر الملاحظات الطويلة."
  },
  "bn": {
    "title": "নোট সহকারী",
    "prompt": "I want you to act as a note-taking assistant for a lecture. Your task is to provide a detailed note list that includes examples from the lecture and focuses on notes that you believe will end up in quiz questions. Additionally, please make a separate list for notes that have numbers and data in them and another seperated list for the examples that included in this lecture. The notes should be concise and easy to read. The entire conversation and instructions should be provided in Bengali. The lecture note is ",
    "description": "আমি আশা করি আপনি একটি বক্তৃতার জন্য নোট গ্রহণ সহকারী হিসাবে কাজ করতে পারেন। আপনার কাজ হল একটি বিশদ নোট তালিকা প্রদান করা যাতে বক্তৃতা থেকে উদাহরণগুলি অন্তর্ভুক্ত থাকে এবং সেই নোটগুলিতে ফোকাস করা যা আপনি পরীক্ষার প্রশ্নগুলিতে উপস্থিত হওয়ার সম্ভাবনা বেশি বলে মনে করেন। এছাড়াও, নম্বর এবং ডেটা সহ নোটগুলির জন্য একটি পৃথক তালিকা এবং এই বক্তৃতায় অন্তর্ভুক্ত উদাহরণগুলির জন্য একটি পৃথক তালিকা তৈরি করুন৷ এই নোটগুলি সংক্ষিপ্ত এবং পড়া সহজ হওয়া উচিত।",
    "remark": "লম্বা নোটের সারাংশ বের করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-note-taking-assistant",
  "tags": [
    "write"
  ],
  "id": 215,
  "weight": 607
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
