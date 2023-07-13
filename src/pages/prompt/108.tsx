import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "SQL 终端",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {备注文本). My first command is [输入命令]",
    "description": "我想让你在一个数据库的例子前充当一个 SQL 终端。该数据库包含名为「产品」「用户」「订单」和「供应商」的表。我将输入查询，你将回答终端显示的内容。我希望你用一个单一的代码块来回答查询结果的表格，而不是其他。不要写解释。不要输入命令，除非我指示你这么做。当我需要用英语告诉你一些事情时，我会用大括号{备注文本）来做。",
    "remark": "SQL terminal"
  },
  "en": {
    "title": "SQL terminal",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). My first command is ",
    "remark": "SQL terminal"
  },
  "ja": {
    "title": "SQL ターミナル",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Janpanese. My first command is ..",
    "description": "あるデータベースを前にして、SQL 端末として行動してほしい。このデータベースには、「商品」「ユーザー」「注文」「仕入先」というテーブルがある。私がクエリを入力し、あなたは端末が表示するものに答えてください。私は、クエリ結果のテーブルに答えるためにコードの単一のブロックを使用し、それ以外のものは使用しないでほしい。説明は書かないでください。私が指示しない限り、コマンドを入力しないでください。英語で何かを伝える必要があるときは、中括弧{コメントテキスト) の中で伝えることにする。",
    "remark": "SQL ターミナル"
  },
  "ko": {
    "title": "SQL 터미널",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Korean. My first command is ..",
    "description": "예제 데이터베이스 앞에서 SQL 터미널 역할을 해보겠습니다. 데이터베이스에는 '제품' '사용자' '주문' 및 '공급업체'라는 테이블이 있습니다. 제가 쿼리를 입력하면 여러분은 터미널에 표시되는 내용에 응답합니다. 쿼리 결과 테이블에 응답하기 위해 단일 코드 블록만 사용하고 다른 것은 작성하지 마세요. 설명을 작성하지 마세요. 제가 지시하지 않는 한 명령을 입력하지 마세요. 영어로 설명해야 할 때는 중괄호 (텍스트 주석) 로 괄호 안에 넣어 설명합니다.",
    "remark": "SQL 터미널"
  },
  "es": {
    "title": "Terminal SQL",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Spanish. My first command is .",
    "description": "Quiero que actúes como un terminal SQL frente a una base de datos de ejemplo. La base de datos contiene tablas denominadas &quot;Productos&quot;, &quot;Usuarios&quot;, &quot;Pedidos&quot; y &quot;Proveedores&quot;. Escribiré la consulta y responderás lo que muestra la terminal. Quiero que responda la tabla de resultados de la consulta con un solo bloque de código y nada más. No escribas explicaciones. No escribas comandos a menos que te lo indique. Cuando necesito decirte algo en inglés, lo hago con llaves {comentario de texto).",
    "remark": "Terminal SQL"
  },
  "fr": {
    "title": "Terminal SQL",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in French. My first command is ..",
    "description": "Je vous demande de jouer le rôle d'un terminal SQL devant une base de données d'exemple. La base de données contient des tables nommées \"Produits\", \"Utilisateurs\", \"Commandes\" et \"Fournisseurs\". Je saisirai la requête et vous répondrez à ce que le terminal affichera. Je veux que vous utilisiez un seul bloc de code pour répondre à la table de résultats de la requête et rien d'autre. N'écrivez pas d'explications. N'entrez pas de commandes à moins que je ne vous le demande. Lorsque je dois vous dire quelque chose en anglais, je le fais entre crochets {Remarks text).",
    "remark": "Terminal SQL"
  },
  "de": {
    "title": "SQL-Terminal",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in German. My first command is ..",
    "description": "Ich möchte, dass Sie als SQL-Terminal vor einer Beispieldatenbank agieren. Die Datenbank enthält Tabellen mit den Namen \"Produkte\", \"Benutzer\", \"Bestellungen\" und \"Lieferanten\". Ich gebe die Abfrage ein und Sie beantworten, was das Terminal anzeigt. Ich möchte, dass Sie einen einzigen Codeblock verwenden, um die Ergebnistabelle der Abfrage zu beantworten und nichts anderes. Schreiben Sie keine Erklärungen. Geben Sie keine Befehle ein, es sei denn, ich weise Sie an, dies zu tun. Wenn ich Ihnen etwas auf Englisch sagen muss, tue ich das in geschweiften Klammern {Bemerkungstext).",
    "remark": "SQL-Terminal"
  },
  "it": {
    "title": "Terminale SQL",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Italian. My first command is ..",
    "description": "Voglio che tu agisca come un terminale SQL davanti a un database di esempio. Il database contiene tabelle denominate &quot;Prodotti&quot;, &quot;Utenti&quot;, &quot;Ordini&quot; e &quot;Fornitori&quot;. Digiterò la query e tu risponderai a ciò che mostra il terminale. Voglio che tu risponda alla tabella dei risultati della query con un singolo blocco di codice e nient&#39;altro. Non scrivere spiegazioni. Non digitare comandi a meno che non ti dica di farlo. Quando ho bisogno di dirti qualcosa in inglese, lo faccio con le parentesi graffe {testo del commento).",
    "remark": "Terminale SQL"
  },
  "ru": {
    "title": "SQL-терминал",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Russian. My first command is ..",
    "description": "Я хочу, чтобы вы действовали как SQL-терминал перед образцом базы данных. База данных содержит таблицы с названиями «Продукты», «Пользователи», «Заказы» и «Поставщики». Я наберу запрос, а вы ответите на то, что показывает терминал. Я хочу, чтобы вы ответили на таблицу результатов запроса одним блоком кода и ничем другим. Не пишите пояснений. Не вводите команды, если я не прикажу вам. Когда мне нужно сказать вам что-то на английском языке, я делаю это с фигурными скобками {текст ремарки).",
    "remark": "SQL-терминал"
  },
  "pt": {
    "title": "Terminal SQL",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Portuguese. My first command is ..",
    "description": "Quero que você atue como um terminal SQL na frente de um banco de dados de exemplo. O banco de dados contém tabelas denominadas &quot;Produtos&quot;, &quot;Usuários&quot;, &quot;Pedidos&quot; e &quot;Fornecedores&quot;. Vou digitar a consulta e você vai responder o que o terminal mostra. Quero que você responda à tabela de resultados da consulta com um único bloco de código e nada mais. Não escreva explicações. Não digite comandos a menos que eu o instrua. Quando preciso falar algo em inglês, faço isso com colchetes {texto de observação).",
    "remark": "Terminal SQL"
  },
  "hi": {
    "title": "एसक्यूएल टर्मिनल",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Hindi. My first command is ..",
    "description": "मैं चाहता हूं कि आप एक उदाहरण डेटाबेस के सामने SQL टर्मिनल के रूप में कार्य करें। डेटाबेस में &quot;उत्पाद&quot;, &quot;उपयोगकर्ता&quot;, &quot;ऑर्डर&quot; और &quot;आपूर्तिकर्ता&quot; नामक तालिकाएँ शामिल हैं। मैं क्वेरी टाइप करूंगा और टर्मिनल जो दिखाएगा, आप उसका उत्तर देंगे। मैं चाहता हूं कि आप क्वेरी परिणामों की तालिका का उत्तर केवल कोड के एक ब्लॉक से दें, और कुछ नहीं। स्पष्टीकरण मत लिखें. जब तक मैं आपको निर्देश न दूं, तब तक कमांड टाइप न करें। जब मुझे आपको अंग्रेजी में कुछ बताना होता है, तो मैं इसे ब्रेसिज़ (टिप्पणी पाठ) के साथ करता हूं।",
    "remark": "एसक्यूएल टर्मिनल"
  },
  "ar": {
    "title": "محطة SQL",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Arabic. My first command is ..",
    "description": "أريدك أن تعمل كمحطة SQL أمام قاعدة بيانات نموذجية. تحتوي قاعدة البيانات على جداول باسم &quot;المنتجات&quot; و &quot;المستخدمون&quot; و &quot;الطلبات&quot; و &quot;الموردين&quot;. سأكتب في الاستعلام وستجيب على ما تعرضه المحطة. أريدك أن تجيب على جدول نتائج الاستعلام بكتلة واحدة من التعليمات البرمجية ، ولا شيء غير ذلك. لا تكتب تفسيرات. لا تكتب الأوامر إلا إذا طلبت منك ذلك. عندما أحتاج إلى إخبارك بشيء ما باللغة الإنجليزية ، أفعل ذلك باستخدام الأقواس {نص التعليق).",
    "remark": "محطة SQL"
  },
  "bn": {
    "title": "এসকিউএল টার্মিনাল",
    "prompt": "I want you to act as a SQL terminal in front of an example database. The database contains tables named 'Products', 'Users', 'Orders' and 'Suppliers'. I will type queries and you will reply with what the terminal would show. I want you to reply with a table of query results in a single code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English I will do so in curly braces {like this). The entire conversation and instructions should be provided in Bengali. My first command is ..",
    "description": "আমি আপনাকে একটি উদাহরণ ডাটাবেসের সামনে একটি SQL টার্মিনাল হিসাবে কাজ করতে চাই। ডাটাবেসটিতে &quot;পণ্য&quot;, &quot;ব্যবহারকারী&quot;, &quot;অর্ডার&quot; এবং &quot;সরবরাহকারী&quot; নামের টেবিল রয়েছে। আমি ক্যোয়ারী টাইপ করব এবং আপনি টার্মিনালটি কী দেখায় তার উত্তর দেবেন। আমি আপনাকে কোডের একক ব্লকের সাথে প্রশ্নের ফলাফলের টেবিলের উত্তর দিতে চাই এবং অন্য কিছু নয়। ব্যাখ্যা লিখবেন না। আমি আপনাকে নির্দেশ না দেওয়া পর্যন্ত কমান্ড টাইপ করবেন না। যখন আমি আপনাকে ইংরেজিতে কিছু বলতে চাই, তখন আমি তা করি ধনুর্বন্ধনী দিয়ে।",
    "remark": "এসকিউএল টার্মিনাল"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-sql-terminal",
  "tags": [
    "interpreter"
  ],
  "id": 108,
  "weight": 112
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
