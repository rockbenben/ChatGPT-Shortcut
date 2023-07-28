import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "海量资料：深入摘要",
    "prompt": "结合前面 '@1'～'@3' 的文章内容，请从原始内容中分析并一定要符合原始内容，上述内容有没有错误之处，可以直接修正或补充。",
    "description": "结合前面 '@1'～'@3' 的文章内容，请从原始内容中分析并一定要符合原始内容，上述内容有没有错误之处，可以直接修正或补充。",
    "remark": "（本提示词需修改）深入摘要一定要进行两次提问，第二次询问时让其回到原文对照，查看是否存在错误或遗漏之处。本方法摘自电脑玩物作者 Esor Huang 的文章。"
  },
  "en": {
    "title": "Massive data: in-depth summary",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. Make sure your analysis is consistent with the original content of the articles.",
    "remark": "For an in-depth summary, it is recommended to ask two rounds of questions. During the second inquiry, have it refer back to the original text to check for errors or omissions. Excerpted from an article by Esor Huang."
  },
  "ja": {
    "title": "豊富な情報量：徹底的なまとめ",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Janpanese. Make sure your analysis is consistent with the original content of the articles.",
    "description": "前掲の記事「@1」～「@3」と合わせて、元のコンテンツから内容を分析し、必ず一致させてください。上記の内容に誤りがあれば、直接修正・追記することができます。",
    "remark": "(このプロンプトは改訂が必要です。) 深い要約をするために必ず 2 回質問し、2 回目の質問では原文に戻って間違いや脱落がないかを確認させるようにします。この方法は、コンピュータ遊びの作家である Esor Huang 氏の記事から引用しています。"
  },
  "ko": {
    "title": "풍부한 정보: 심층 요약 정보",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Korean. Make sure your analysis is consistent with the original content of the articles.",
    "description": "앞의 '@1' ~ '@3' 글과 연계하여 원본 콘텐츠의 내용을 분석하여 원본 내용과 일치하는지 확인하시기 바랍니다. 위 콘텐츠의 오류는 직접 수정하거나 추가할 수 있습니다.",
    "remark": "(이 프롬프트는 수정이 필요합니다.) 항상 심층 요약을 두 번 묻고, 두 번째 질문에서는 원문으로 돌아가서 오류나 누락이 있는지 확인하도록 요청하세요. 이 방법은 컴퓨터 놀잇감 작가인 에소르 황의 글에서 발췌한 것입니다."
  },
  "es": {
    "title": "Mucha información: un resumen en profundidad",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Spanish. Make sure your analysis is consistent with the original content of the articles.",
    "description": "Combinando los contenidos de los artículos anteriores '@1' a '@3', por favor, analice desde el contenido original y asegúrese de ajustarse al contenido original, y si hay algún error en el contenido anterior puede ser directamente corregido o complementado.",
    "remark": "(Esta pregunta debe revisarse.) Siempre cuestiona el resumen en profundidad dos veces, y en la segunda pregunta haz que vuelva al texto original para hacer referencias cruzadas y ver si hay errores u omisiones. Este método está tomado de un artículo de Esor Huang, autor de Computer Playbook."
  },
  "fr": {
    "title": "Une mine d'informations : un résumé approfondi",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in French. Make sure your analysis is consistent with the original content of the articles.",
    "description": "En combinant le contenu des articles précédents \"@1\" à \"@3\", veuillez analyser le contenu original et vous assurer qu'il est conforme au contenu original, et s'il y a des erreurs dans le contenu ci-dessus, elles peuvent être directement corrigées ou complétées.",
    "remark": "() Interrogez toujours le résumé approfondi deux fois et, lors de la deuxième interrogation, demandez-lui de se référer au texte original pour vérifier s'il y a des erreurs ou des omissions. Cette méthode est tirée d'un article d'Esor Huang, auteur de Computer Playbook."
  },
  "de": {
    "title": "Eine Fülle von Informationen: eine ausführliche Zusammenfassung",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in German. Make sure your analysis is consistent with the original content of the articles.",
    "description": "Kombinieren Sie den Inhalt der vorherigen Artikel '@1' bis '@3', analysieren Sie bitte den ursprünglichen Inhalt und stellen Sie sicher, dass er mit dem ursprünglichen Inhalt übereinstimmt, und ob es irgendwelche Fehler im obigen Inhalt gibt, kann direkt korrigiert oder ergänzt werden.",
    "remark": "(Diese Aufforderung muss überarbeitet werden.) Fragen Sie die ausführliche Zusammenfassung immer zweimal ab, und lassen Sie sie bei der zweiten Befragung zum Originaltext zurückgehen, um Querverweise zu finden, um zu sehen, ob es irgendwelche Fehler oder Auslassungen gibt. Diese Methode stammt aus einem Artikel von Esor Huang, dem Autor von Computer Playbook."
  },
  "it": {
    "title": "Una ricchezza di informazioni: una sintesi approfondita",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Italian. Make sure your analysis is consistent with the original content of the articles.",
    "description": "Combinando i contenuti dei precedenti articoli da '@1' a '@3', si prega di analizzare il contenuto originale e di assicurarsi che sia conforme al contenuto originale, e se ci sono errori nel contenuto di cui sopra può essere direttamente corretto o integrato.",
    "remark": "(Interrogate sempre due volte il riassunto approfondito e, alla seconda interrogazione, fatelo risalire al testo originale per verificare se ci sono errori o omissioni. Questo metodo è tratto da un articolo di Esor Huang, autore di Computer Playbook."
  },
  "ru": {
    "title": "Богатая информация: подробное резюме",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Russian. Make sure your analysis is consistent with the original content of the articles.",
    "description": "Объединяя содержание предыдущих статей \"@1\" - \"@3\", пожалуйста, проанализируйте оригинальное содержание и убедитесь, что оно соответствует оригинальному содержанию, и если в нем есть какие-либо ошибки, они могут быть непосредственно исправлены или дополнены.",
    "remark": "(Эта подсказка нуждается в пересмотре.) Всегда задавайте вопрос по углубленному резюме дважды, и при втором задании попросите его вернуться к исходному тексту для перекрестных ссылок, чтобы увидеть, нет ли в нем ошибок или пропусков. Этот метод взят из статьи Эсора Хуанга, автора книги Computer Playbook."
  },
  "pt": {
    "title": "Um manancial de informações: um resumo pormenorizado",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Portuguese. Make sure your analysis is consistent with the original content of the articles.",
    "description": "Combinando o conteúdo dos artigos anteriores \"@1\" a \"@3\", analise o conteúdo original e certifique-se de que está em conformidade com o conteúdo original, e se houver algum erro no conteúdo acima pode ser diretamente corrigido ou complementado.",
    "remark": "(Esta pergunta precisa de ser revista.) Questione sempre o resumo aprofundado duas vezes e, na segunda pergunta, faça-o regressar ao texto original para fazer referências cruzadas e verificar se existem erros ou omissões. Este método foi retirado de um artigo de Esor Huang, autor de Computer Playbook."
  },
  "hi": {
    "title": "बड़ा डेटा: गहन सारांश",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Hindi. Make sure your analysis is consistent with the original content of the articles.",
    "description": "पिछले लेखों की सामग्री &#39;@1&#39;~&#39;@3&#39; के साथ संयुक्त, कृपया मूल सामग्री से विश्लेषण करें और सुनिश्चित करें कि यह मूल सामग्री के अनुरूप है। यदि उपरोक्त सामग्री में कोई त्रुटि है, तो आप सीधे सुधार या पूरक कर सकते हैं यह।",
    "remark": "(इस त्वरित शब्द को संशोधित करने की आवश्यकता है।) गहन सार दो बार पूछा जाना चाहिए। दूसरी बार पूछते समय, त्रुटियों या चूक की जांच करने के लिए तुलना के लिए उन्हें मूल पाठ पर लौटने के लिए कहें। यह विधि कंप्यूटर खिलौनों के लेखक एसोर हुआंग के एक लेख से ली गई है।"
  },
  "ar": {
    "title": "البيانات الضخمة: ملخص في العمق",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Arabic. Make sure your analysis is consistent with the original content of the articles.",
    "description": "بالاقتران مع محتوى المقالات السابقة &quot;@ 1&quot; ～ &quot;@ 3&quot; ، يرجى التحليل من المحتوى الأصلي والتأكد من توافقه مع المحتوى الأصلي. إذا كان هناك أي خطأ في المحتوى أعلاه ، فيمكنك تصحيحه أو استكماله مباشرةً هو - هي.",
    "remark": "(هذه الكلمة السريعة تحتاج إلى تعديل.) يجب طرح الملخصات المتعمقة مرتين. عند السؤال للمرة الثانية ، اطلب منهم العودة إلى النص الأصلي للمقارنة للتحقق من الأخطاء أو السهو. تم اقتباس هذه الطريقة من مقال بقلم Esor Huang ، مؤلف ألعاب الكمبيوتر."
  },
  "bn": {
    "title": "বিগ ডেটা: গভীরভাবে সারাংশ",
    "prompt": "Based on the content from articles '@1' to '@3', please analyze and identify any errors or inconsistencies that need to be corrected or supplemented. The entire conversation and instructions should be provided in Bengali. Make sure your analysis is consistent with the original content of the articles.",
    "description": "পূর্ববর্তী নিবন্ধগুলির &#39;@1&#39;～&#39;@3&#39; বিষয়বস্তুর সাথে একত্রিত, অনুগ্রহ করে মূল বিষয়বস্তু থেকে বিশ্লেষণ করুন এবং নিশ্চিত করুন যে এটি মূল বিষয়বস্তুর সাথে সামঞ্জস্যপূর্ণ। উপরের বিষয়বস্তুতে কোনো ত্রুটি থাকলে, আপনি সরাসরি সংশোধন বা পরিপূরক করতে পারেন এটা",
    "remark": "(এই প্রম্পট শব্দটি সংশোধন করা প্রয়োজন।) গভীরভাবে বিমূর্তগুলি অবশ্যই দুবার জিজ্ঞাসা করা উচিত। দ্বিতীয়বার জিজ্ঞাসা করার সময়, ত্রুটি বা বাদ পড়ার জন্য তুলনা করার জন্য তাদের মূল পাঠে ফিরে যেতে বলুন। এই পদ্ধতিটি কম্পিউটার খেলনার লেখক Esor Huang এর একটি নিবন্ধ থেকে উদ্ধৃত করা হয়েছে।"
  },
  "website": "https://www.playpcesor.com/2023/03/chatgpt-2.html",
  "tags": [
    "write"
  ],
  "id": 240,
  "weight": 364
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
