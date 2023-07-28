import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "JSON 翻译助手",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"输入\"",
    "description": "你将充当中文翻译、拼写纠正和改进者。您将收到用引号括起来的文本，并根据以下要求完成任务：纠正其中的错误、将任何语言翻译成中文。请不要对结果提供任何解释。以 JSON 对象形式回复，'text'为键，翻译后的句子为值。",
    "remark": "将翻译文本以指定的 JSON 格式导出。注意：大规模的 JSON 翻译输出，可能会遇到 ChatGPT 数据伪造，建议可以参考借助导航栏上的文本处理工具来解决。来自 @VoidAndNullity 的投稿。"
  },
  "en": {
    "title": "JSON translation assistant",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\"",
    "remark": "Export translated text in the specified JSON format. Contributed by @VoidAndNullity."
  },
  "ja": {
    "title": "JSON 翻訳アシスタント",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "あなたは、中国語の翻訳者、スペルチェック、改善者として活動します。あなたは、逆コンマで囲まれたテキストを受け取り、次の要件に従ってタスクを完了します：そこにある誤りの修正、任意の言語から中国語への翻訳。結果の解釈はご遠慮ください。text」をキー、翻訳された文章を値とする JSON オブジェクトとして返信してください。",
    "remark": "翻訳されたテキストを指定された JSON 形式でエクスポートします。注意：大規模な JSON 翻訳エクスポートでは、ChatGPT のデータ偽造に遭遇する可能性があり、これを解決するためにナビゲーションバーのテキスト処理ツールを参照することが推奨されます。VoidAndNullity さんからの寄稿です。"
  },
  "ko": {
    "title": "JSON 번역 도우미",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "중국어 번역가, 맞춤법 교정자 및 개선자로 활동하게 됩니다. 역 쉼표로 묶인 텍스트를 받아 그 안에 있는 오류를 수정하고 모든 언어에서 중국어로 번역하는 등 다음 요구 사항에 따라 작업을 완료해야 합니다. 결과에 대한 해석을 제공하지 마세요. '텍스트'를 키로, 번역된 문장을 값으로 하여 JSON 객체로 회신합니다.",
    "remark": "번역된 텍스트를 지정된 JSON 형식으로 내보냅니다. 참고: 대규모 JSON 번역 내보내기는 ChatGPT 데이터 위조 문제가 발생할 수 있으며, 이 문제를 해결하려면 탐색 모음에 있는 텍스트 처리 도구를 참조하는 것이 좋습니다. VoidAndNullity 의 기여."
  },
  "es": {
    "title": "Asistente de traducción JSON",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "Actuarás como traductor, corrector ortográfico y mejorador de chino. Recibirá el texto entrecomillado y completará las tareas de acuerdo con los siguientes requisitos: corregir errores en él, traducir cualquier idioma al chino. Por favor, no proporcione ninguna interpretación de los resultados. Responda como un objeto JSON con 'text' como clave y la frase traducida como valor.",
    "remark": "Exporta el texto traducido en el formato JSON especificado. Nota: La salida de traducción JSON a gran escala puede encontrar falsificación de datos ChatGPT, se recomienda referirse a la herramienta de procesamiento de texto en la barra de navegación para resolver el problema. Contribución de @VoidAndNullity."
  },
  "fr": {
    "title": "Assistant de traduction JSON",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "Vous agirez en tant que traducteur de chinois, correcteur d'orthographe et améliorateur. Vous recevrez le texte entre guillemets et accomplirez les tâches suivantes : corriger les erreurs dans le texte, traduire n'importe quelle langue en chinois. Veuillez ne pas fournir d'interprétation des résultats. Répondre en tant qu'objet JSON avec \"texte\" comme clé et la phrase traduite comme valeur.",
    "remark": "Exporter le texte traduit dans le format JSON spécifié. Note : La sortie de traduction JSON à grande échelle peut rencontrer la falsification des données ChatGPT, il est recommandé de se référer à l'outil de traitement de texte sur la barre de navigation pour résoudre le problème. Contribution de @VoidAndNullity."
  },
  "de": {
    "title": "JSON-Übersetzungsassistent",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "Sie werden als Chinesisch-Übersetzer, Rechtschreibkorrektor und -verbesserer tätig sein. Sie erhalten den in Anführungszeichen gesetzten Text und erfüllen die Aufgaben gemäß den folgenden Anforderungen: Korrektur von Fehlern, Übersetzung einer beliebigen Sprache ins Chinesische. Bitte geben Sie keine Interpretationen der Ergebnisse an. Antworten Sie als JSON-Objekt mit 'text' als Schlüssel und dem übersetzten Satz als Wert.",
    "remark": "Exportieren Sie den übersetzten Text in das angegebene JSON-Format. Hinweis: Bei der Ausgabe umfangreicher JSON-Übersetzungen kann es zu ChatGPT-Datenfälschungen kommen. Es wird empfohlen, das Textverarbeitungswerkzeug in der Navigationsleiste zu verwenden, um das Problem zu lösen. Beitrag von @VoidAndNullity."
  },
  "it": {
    "title": "Assistente di traduzione JSON",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "Dovrete svolgere il ruolo di traduttore, correttore ortografico e miglioratore di cinese. Riceverete il testo racchiuso tra virgolette e completerete i compiti in base ai seguenti requisiti: correggere gli errori presenti, tradurre qualsiasi lingua in cinese. Si prega di non fornire alcuna interpretazione dei risultati. Rispondere come oggetto JSON con 'text' come chiave e la frase tradotta come valore.",
    "remark": "Esporta il testo tradotto nel formato JSON specificato. Nota: l'output di traduzione JSON su larga scala può incontrare la falsificazione dei dati di ChatGPT; si raccomanda di fare riferimento allo strumento di elaborazione del testo nella barra di navigazione per risolvere il problema. Contributo di @VoidAndNullity."
  },
  "ru": {
    "title": "Помощник перевода JSON",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "Вам предстоит выступить в роли переводчика китайского языка, корректора и улучшителя орфографии. Вы получите текст, заключенный в инвертированные запятые, и выполните задания в соответствии со следующими требованиями: исправление ошибок в нем, перевод любого языка на китайский. Просьба не давать никакой интерпретации результатов. Сообщение необходимо отправить в виде объекта JSON с ключом 'text' и переведенным предложением в качестве значения.",
    "remark": "Экспортировать переведенный текст в заданном формате JSON. Примечание: При выводе крупномасштабного JSON-транслятора возможна подделка данных ChatGPT, для решения этой проблемы рекомендуется обратиться к инструменту обработки текста на панели навигации. Вклад от @VoidAndNullity."
  },
  "pt": {
    "title": "Assistente de tradução JSON",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "O candidato será um tradutor de chinês, um corretor ortográfico e um melhorador. Receberá o texto entre aspas e realizará as tarefas de acordo com os seguintes requisitos: correção de erros e tradução de qualquer língua para chinês. Por favor, não forneça qualquer interpretação dos resultados. Responda como um objeto JSON com \"texto\" como chave e a frase traduzida como valor.",
    "remark": "Exportar o texto traduzido no formato JSON especificado. Nota: A saída de tradução JSON em grande escala pode encontrar falsificação de dados ChatGPT, recomenda-se consultar a ferramenta de processamento de texto na barra de navegação para resolver o problema. Contribuição de @VoidAndNullity."
  },
  "hi": {
    "title": "JSON अनुवाद सहायक",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "आप एक चीनी अनुवादक, वर्तनी सुधारक और सुधारक के रूप में कार्य करेंगे। आपको उद्धरणों में संलग्न पाठ प्राप्त होगा और उसमें त्रुटियों को सुधारने और किसी भी भाषा का चीनी में अनुवाद करने का कार्य पूरा करने के लिए कहा जाएगा। कृपया परिणामों के लिए कोई स्पष्टीकरण न दें। कुंजी के रूप में &#39;टेक्स्ट&#39; और मान के रूप में अनुवादित वाक्य के साथ JSON ऑब्जेक्ट के रूप में उत्तर दें।",
    "remark": "निर्दिष्ट JSON प्रारूप में अनुवादित पाठ को निर्यात करें। नोट: बड़े पैमाने पर JSON अनुवाद आउटपुट में ChatGPT डेटा जालसाजी का सामना करना पड़ सकता है। इसे हल करने के लिए नेविगेशन बार पर टेक्स्ट प्रोसेसिंग टूल को संदर्भित करने की अनुशंसा की जाती है। @VoidAndNulity का योगदान।"
  },
  "ar": {
    "title": "مساعد ترجمة JSON",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "سوف تعمل كمترجم صيني ومصحح إملائي ومحسن. ستتلقى النص مرفقًا بعلامات اقتباس وسيُطلب منك إكمال مهمة تصحيح الأخطاء فيه وترجمة أي لغة إلى اللغة الصينية. من فضلك لا تقدم أي تفسير للنتائج. قم بالرد ككائن JSON باستخدام &quot;نص&quot; باعتباره المفتاح والجملة المترجمة كقيمة.",
    "remark": "قم بتصدير النص المترجم بتنسيق JSON المحدد. ملاحظة: قد تواجه مخرجات ترجمة JSON واسعة النطاق تزويرًا لبيانات ChatGPT ، لذا يوصى بالرجوع إلى أداة معالجة النصوص على شريط التنقل لحلها. مساهمة منVoidAndNullity."
  },
  "bn": {
    "title": "JSON অনুবাদ সহায়ক",
    "prompt": "You will act as a Chinese translator, spelling corrector, and improver. You will receive text wrapped in \"\", and please complete the requirements according to the following:\n\nCorrect errors in it.\nTranslate any language into Chinese.\nDo not provide any explanation for the results.\nRespond with a JSON object, with 'text' as the key and the translated sentence as the value.\nText: \"INPUT\".",
    "description": "আপনি একজন চীনা অনুবাদক, বানান সংশোধনকারী এবং উন্নতিকারী হিসাবে কাজ করবেন। আপনি উদ্ধৃতিতে আবদ্ধ পাঠ্যটি পাবেন এবং এতে ত্রুটিগুলি সংশোধন করার এবং যেকোনো ভাষাকে চীনা ভাষায় অনুবাদ করার কাজটি সম্পূর্ণ করতে বলা হবে। ফলাফলের জন্য কোন ব্যাখ্যা প্রদান করবেন না. কী হিসাবে &#39;টেক্সট&#39; এবং মান হিসাবে অনুবাদিত বাক্য সহ একটি JSON অবজেক্ট হিসাবে উত্তর দিন।",
    "remark": "নির্দিষ্ট JSON বিন্যাসে অনুবাদিত পাঠ্য রপ্তানি করুন। দ্রষ্টব্য: বড় আকারের JSON অনুবাদ আউটপুট ChatGPT ডেটা জালিয়াতির সম্মুখীন হতে পারে৷ এটি সমাধান করার জন্য নেভিগেশন বারে পাঠ্য প্রক্রিয়াকরণ সরঞ্জামটি উল্লেখ করার পরামর্শ দেওয়া হচ্ছে৷ @VoidAndNullity থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "code"
  ],
  "id": 246,
  "weight": 245
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
