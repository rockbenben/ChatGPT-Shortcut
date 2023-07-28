import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "Excel 工作表",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Chinese. First, reply me the empty sheet.",
    "description": "我想让你充当一个基于文本的 excel。你只需回复我基于文本的 10 行 excel 表，以行号和单元格字母作为列（A 至 L）。第一列的标题应该是空的，以参考行号。我会告诉你在单元格中写什么，你只需回复 excel 表格中的文本结果，而不是其他。不要写解释。我给你写公式，你执行公式，你只回答 excel 表的结果为文本。首先，给我一个空表。",
    "remark": "Excel Sheet"
  },
  "en": {
    "title": "Excel Sheet",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. First, reply me the empty sheet.",
    "remark": "Excel Sheet"
  },
  "ja": {
    "title": "エクセルワークシート",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Janpanese. First, reply me the empty sheet.",
    "description": "テキストベースのエクセルとして行動してほしい。あなたがする必要があるのは、私のテキストベースの 10 行のエクセルシートに返信するだけです。最初の列の見出しは、行番号を参照するために空でなければなりません。セルに何を書くかは私が指示しますので、あなたはエクセル表のテキスト結果だけを返信すればよく、他には何も書く必要はありません。説明文は書かないでください。書くべき数式は私が教えるので、あなたは数式を実行し、その結果をテキストでエクセルシートに返信するだけです。まず、空のテーブルを渡してください。",
    "remark": "エクセルシート"
  },
  "ko": {
    "title": "Excel 워크시트",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Korean. First, reply me the empty sheet.",
    "description": "텍스트 기반 엑셀로 작업하고 싶습니다. 행 번호와 셀 문자를 열 (A ~ L) 로 사용하여 텍스트 기반 10 행 엑셀 시트에 답장하기 만하면됩니다. 행 번호를 참조하기 위해 첫 번째 열 제목은 비어 있어야합니다. 셀에 무엇을 써야하는지 알려 드리니 엑셀 표의 텍스트 결과 만 회신하면됩니다. 설명을 쓰지 마세요. 작성할 수식을 알려드리고, 수식을 실행한 후 결과를 엑셀 시트에 텍스트로만 답장하면 됩니다. 먼저 빈 테이블을 주세요.",
    "remark": "Excel 시트"
  },
  "es": {
    "title": "Hojas de cálculo Excel",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Spanish. First, reply me the empty sheet.",
    "description": "Quiero que actúe como un excel basado en texto. Sólo tiene que responder a mi hoja excel basada en texto de 10 líneas con números de fila y letras de celda como columnas (A a L). El encabezado de la primera columna debe estar vacío para hacer referencia al número de fila. Yo te diré lo que tienes que escribir en las celdas, tú sólo responde con el resultado del texto en la hoja excel y nada más. No escribas explicaciones. Yo escribiré la fórmula por ti, tú ejecutas la fórmula y respondes sólo con el resultado de la hoja excel como texto. En primer lugar, dame una tabla vacía.",
    "remark": "Hoja Excel"
  },
  "fr": {
    "title": "Feuilles de calcul Excel",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in French. First, reply me the empty sheet.",
    "description": "Vous répondez à ma feuille Excel de 10 lignes avec des numéros de lignes et des lettres de cellules comme colonnes (A à L). Le titre de la première colonne doit être vide pour faire référence au numéro de ligne. Je vous dirai ce qu'il faut écrire dans les cellules, vous répondez simplement avec le résultat du texte dans la feuille Excel et rien d'autre. N'écrivez pas d'explications. Je vais écrire une formule pour vous, vous exécutez la formule et vous répondez seulement au résultat de la feuille Excel sous forme de texte. Tout d'abord, donnez-moi un tableau vide.",
    "remark": "Feuille Excel"
  },
  "de": {
    "title": "Excel-Arbeitsblätter",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in German. First, reply me the empty sheet.",
    "description": "Ich möchte, dass Sie wie ein textbasiertes Excel handeln. Sie antworten einfach auf mein textbasiertes 10-zeiliges Excel-Blatt mit Zeilennummern und Zellbuchstaben als Spalten (A bis L). Die erste Spaltenüberschrift sollte leer sein, um auf die Zeilennummer zu verweisen. Ich werde Ihnen sagen, was Sie in die Zellen schreiben sollen, Sie antworten nur mit dem Textergebnis in der Exceltabelle und sonst nichts. Schreiben Sie keine Erklärungen. Ich werde eine Formel für Sie schreiben, Sie führen die Formel aus und antworten nur mit dem Ergebnis in der Exceltabelle als Text. Geben Sie mir erstens eine leere Tabelle.",
    "remark": "Excel-Tabelle"
  },
  "it": {
    "title": "Fogli di lavoro Excel",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Italian. First, reply me the empty sheet.",
    "description": "Voglio che tu agisca come un excel basato sul testo. Devi solo rispondere al mio foglio excel di 10 righe basato sul testo con numeri di riga e lettere di cella come colonne (da A a L). L'intestazione della prima colonna deve essere vuota per fare riferimento al numero di riga. Io vi dirò cosa scrivere nelle celle, voi dovrete solo rispondere con il risultato del testo nel foglio excel e nient'altro. Non scrivete spiegazioni. Scriverò una formula per voi, voi eseguite la formula e rispondete solo al risultato del foglio excel come testo. Per prima cosa, datemi una tabella vuota.",
    "remark": "Foglio Excel"
  },
  "ru": {
    "title": "Рабочие листы Excel",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Russian. First, reply me the empty sheet.",
    "description": "Я хочу, чтобы вы действовали как текстовый excel. Вы просто отвечаете на мой текстовый 10-строчный лист excel с номерами строк и буквами ячеек в качестве столбцов (от A до L). Заголовок первого столбца должен быть пустым, чтобы ссылаться на номер строки. Я буду указывать, что писать в ячейках, а вы просто отвечайте текстом, полученным в excel, и больше ничего. Не пишите пояснений. Я напишу для вас формулу, вы ее выполните, а в ответ получите только текстовый результат из листа excel. Для начала дайте мне пустую таблицу.",
    "remark": "Лист Excel"
  },
  "pt": {
    "title": "Folhas de cálculo do Excel",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Portuguese. First, reply me the empty sheet.",
    "description": "Quero que actue como um Excel baseado em texto. Responda à minha folha de Excel de 10 linhas baseada em texto com números de linha e letras de células como colunas (A a L). O título da primeira coluna deve estar vazio para fazer referência ao número da linha. Eu digo-te o que deves escrever nas células, tu respondes apenas com o resultado do texto na folha de Excel e nada mais. Não escreva explicações. Eu escrevo a fórmula, tu executas a fórmula e respondes apenas com o resultado da folha de Excel como texto. Em primeiro lugar, dê-me uma tabela vazia.",
    "remark": "Folha de Excel"
  },
  "hi": {
    "title": "एक्सेल शीट",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Hindi. First, reply me the empty sheet.",
    "description": "मैं चाहता हूं कि आप टेक्स्ट आधारित एक्सेल के रूप में कार्य करें। आप बस मेरी टेक्स्ट-आधारित 10-पंक्ति एक्सेल शीट का उत्तर पंक्ति संख्याओं और सेल अक्षरों को कॉलम (ए से एल) के रूप में दें। पंक्ति संख्या को संदर्भित करने के लिए पहले कॉलम का शीर्षलेख खाली होना चाहिए। मैं आपको बताऊंगा कि सेल में क्या लिखना है, आप केवल एक्सेल शीट में टेक्स्ट परिणाम के साथ उत्तर दें और कुछ नहीं। स्पष्टीकरण मत लिखें. मैं आपको सूत्र लिखता हूं, आप सूत्र पर अमल करते हैं, आप केवल एक्सेल शीट के परिणाम का उत्तर पाठ के रूप में देते हैं। सबसे पहले, मुझे एक खाली टेबल दो।",
    "remark": "एक्सेल शीट"
  },
  "ar": {
    "title": "ورقة اكسل",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Arabic. First, reply me the empty sheet.",
    "description": "أريدك أن تتصرف كنص قائم على التفوق. ما عليك سوى الرد على ورقة Excel المكونة من 10 صفوف والتي تستند إلى النص مع أرقام الصفوف وأحرف الخلية كأعمدة (من A إلى L). يجب أن يكون رأس العمود الأول فارغًا للإشارة إلى رقم الصف. سأخبرك بما تكتبه في الخلية ، فأنت فقط ترد بالنتيجة النصية في ورقة Excel ولا شيء غير ذلك. لا تكتب تفسيرات. أنا أكتب لك الصيغة ، وتنفذ الصيغة ، فأنت تجيب فقط على نتيجة ورقة Excel كنص. أولاً ، أعطني طاولة فارغة.",
    "remark": "ورقة اكسل"
  },
  "bn": {
    "title": "এক্সেল শীট",
    "prompt": "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. I will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. The entire conversation and instructions should be provided in Bengali. First, reply me the empty sheet.",
    "description": "আমি চাই আপনি একটি টেক্সট ভিত্তিক এক্সেল হিসাবে কাজ করুন। আপনি শুধু আমার পাঠ্য-ভিত্তিক 10-সারি এক্সেল শীটে সারি নম্বর এবং কলাম (A থেকে L) হিসাবে সেল অক্ষর সহ উত্তর দিন। সারি নম্বর উল্লেখ করার জন্য প্রথম কলামের শিরোনামটি খালি হওয়া উচিত। আমি বলবো সেলে কি লিখতে হবে, আপনি শুধু এক্সেল শিটে টেক্সট রেজাল্ট দিয়ে রিপ্লাই দিবেন আর কিছু না। ব্যাখ্যা লিখবেন না। আমি আপনাকে সূত্র লিখি, আপনি সূত্রটি কার্যকর করুন, আপনি কেবলমাত্র এক্সেল শীটের ফলাফলটি পাঠ্য হিসাবে উত্তর দিন। প্রথমে আমাকে একটি খালি টেবিল দিন।",
    "remark": "এক্সেল শীট"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-excel-sheet",
  "tags": [
    "tool"
  ],
  "id": 132,
  "weight": 1654
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
