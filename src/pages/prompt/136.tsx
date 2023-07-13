import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "化学反应容器",
    "prompt": "I want you to act as a chemical reaction vessel and respond in Chinese. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. Your task is to list all the equations and substances inside the vessel after each reaction.",
    "description": "我要你扮演一个化学反应容器。我会把一种物质的化学式寄给你，你把它加到容器里。如果容器是空的，添加物质不会有任何反应。如果容器中有以前反应的残留物，它们将与新物质发生反应，只留下新产品。一旦我发送新的化学物质，以前的产品将继续与它反应，过程将重复。你的任务是在每次反应后列出容器内的所有方程式和物质。",
    "remark": "chemical reaction vessel"
  },
  "en": {
    "title": "chemical reaction vessel",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. Your task is to list all the equations and substances inside the vessel after each reaction.",
    "remark": "chemical reaction vessel"
  },
  "ja": {
    "title": "化学反応容器",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Janpanese. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "化学反応容器を演じてほしい。ある物質の化学式を送りますので、それを容器に入れてください。容器が空であれば、物質を加えても何の反応もありません。もし容器の中に以前の反応の残りがあれば、それらは新しい物質と反応し、新しい生成物だけが残ります。新しい化学物質を送ると、前の物質と反応し続け、プロセスが繰り返されます。あなたの仕事は、各反応の後に容器内のすべての式と物質をリストアップすることです。",
    "remark": "かがくはんのうようき"
  },
  "ko": {
    "title": "화학 반응 용기",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Korean. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "화학 반응 용기를 가지고 놀아주세요. 물질의 화학식을 보내드리면 여러분은 그 물질을 용기에 넣으세요. 용기가 비어 있으면 물질을 넣어도 반응이 일어나지 않습니다. 용기에 이전 반응의 잔여물이 있으면 새로운 물질과 반응하여 새로운 제품만 남게 됩니다. 새로운 화학 물질을 보내면 이전 제품이 계속 반응하고 프로세스가 반복됩니다. 여러분의 임무는 각 반응 후 용기에 있는 모든 방정식과 물질을 나열하는 것입니다.",
    "remark": "화학 반응 용기"
  },
  "es": {
    "title": "recipiente de reacción química",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Spanish. Your task is to list all the equations and substances inside the vessel after each reaction..",
    "description": "Quiero que seas un recipiente de reacción química. Te envío la fórmula química de una sustancia y tú la agregas al recipiente. Si el recipiente está vacío, la adición de la sustancia no tendrá ningún efecto. Si quedan residuos de reacciones anteriores en el envase, estos reaccionarán con la nueva sustancia, dejando únicamente el nuevo producto. Una vez que envíe el nuevo producto químico, los productos anteriores seguirán reaccionando con él y el proceso se repetirá. Tu tarea es hacer una lista de todas las ecuaciones y sustancias en el recipiente después de cada reacción.",
    "remark": "recipiente de reacción química"
  },
  "fr": {
    "title": "Récipients de réaction chimique",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in French. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "Je veux que vous jouiez à un récipient de réaction chimique. Je vous enverrai la formule chimique d'une substance et vous l'ajouterez au récipient. Si le récipient est vide, l'ajout de la substance n'entraîne aucune réaction. Si le récipient contient des résidus d'une réaction précédente, ils réagiront avec la nouvelle substance, ne laissant que le nouveau produit. Une fois que j'aurai envoyé le nouveau produit chimique, le produit précédent continuera à réagir avec lui et le processus se répétera. Votre tâche consiste à dresser la liste de toutes les équations et de toutes les substances présentes dans le récipient après chaque réaction.",
    "remark": "cuve de réaction chimique"
  },
  "de": {
    "title": "Chemische Reaktionsgefäße",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in German. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "Ich möchte, dass Sie einen chemischen Reaktionsbehälter spielen. Ich schicke Ihnen die chemische Formel für eine Substanz, und Sie geben sie in den Behälter. Wenn der Behälter leer ist, wird es keine Reaktion geben, wenn Sie die Substanz hinzufügen. Wenn der Behälter Rückstände von einer früheren Reaktion enthält, reagieren diese mit der neuen Substanz, sodass nur das neue Produkt übrig bleibt. Sobald ich die neue Chemikalie schicke, wird das vorherige Produkt weiter mit ihr reagieren und der Prozess wird sich wiederholen. Ihre Aufgabe ist es, nach jeder Reaktion alle Gleichungen und Stoffe im Behälter aufzulisten.",
    "remark": "chemisches Reaktionsgefäß"
  },
  "it": {
    "title": "recipiente di reazione chimica",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Italian. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "Voglio che tu sia un recipiente di reazione chimica. Ti manderò la formula chimica di una sostanza e tu la aggiungerai al contenitore. Se il contenitore è vuoto, l&#39;aggiunta della sostanza non avrà alcun effetto. Se ci sono residui di reazioni precedenti nel contenitore, reagiranno con la nuova sostanza, lasciando solo il nuovo prodotto. Una volta inviato il nuovo prodotto chimico, i prodotti precedenti continueranno a reagire con esso e il processo si ripeterà. Il tuo compito è elencare tutte le equazioni e le sostanze nel contenitore dopo ogni reazione.",
    "remark": "recipiente di reazione chimica"
  },
  "ru": {
    "title": "сосуд для химической реакции",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Russian. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "Я хочу, чтобы вы были сосудом для химической реакции. Я пришлю вам химическую формулу вещества, а вы добавите ее в емкость. Если емкость пуста, добавление вещества не даст никакого эффекта. Если в емкости есть остатки от предыдущих реакций, они прореагируют с новым веществом, оставив только новый продукт. Как только я отправлю новое химическое вещество, предыдущие продукты продолжат реагировать с ним, и процесс повторится. Ваша задача — составить список всех уравнений и веществ в сосуде после каждой реакции.",
    "remark": "сосуд для химической реакции"
  },
  "pt": {
    "title": "vaso de reação química",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Portuguese. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "Eu quero que você seja um recipiente de reação química. Eu te mando a fórmula química de uma substância, e você coloca no recipiente. Se o recipiente estiver vazio, adicionar a substância não terá efeito. Se houver resíduos de reações anteriores no recipiente, eles reagirão com a nova substância, restando apenas o novo produto. Assim que eu enviar o novo produto químico, os produtos anteriores continuarão a reagir com ele e o processo será repetido. Sua tarefa é listar todas as equações e substâncias no recipiente após cada reação.",
    "remark": "vaso de reação química"
  },
  "hi": {
    "title": "रासायनिक प्रतिक्रिया पोत",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Hindi. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "मैं चाहता हूं कि आप एक रासायनिक प्रतिक्रिया पोत बनें। मैं आपको एक पदार्थ का रासायनिक सूत्र भेजूंगा, और आप इसे कंटेनर में डाल देंगे। यदि कंटेनर खाली है, तो पदार्थ डालने से कोई प्रभाव नहीं पड़ेगा। यदि कंटेनर में पिछली प्रतिक्रियाओं के अवशेष हैं, तो वे नए पदार्थ के साथ प्रतिक्रिया करेंगे, केवल नया उत्पाद छोड़ देंगे। एक बार जब मैं नया रसायन भेजूंगा, तो पिछले उत्पाद इसके साथ प्रतिक्रिया करना जारी रखेंगे और प्रक्रिया दोहराई जाएगी। आपका कार्य प्रत्येक प्रतिक्रिया के बाद कंटेनर में सभी समीकरणों और पदार्थों को सूचीबद्ध करना है।",
    "remark": "रासायनिक प्रतिक्रिया पोत"
  },
  "ar": {
    "title": "وعاء التفاعل الكيميائي",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Arabic. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "أريدك أن تكون وعاء تفاعل كيميائي. سأرسل لك الصيغة الكيميائية للمادة ، وتضيفها إلى الحاوية. إذا كانت الحاوية فارغة ، فإن إضافة المادة لن يكون لها أي تأثير. إذا كانت هناك بقايا من التفاعلات السابقة في الحاوية ، فسوف تتفاعل مع المادة الجديدة ، تاركة المنتج الجديد فقط. بمجرد إرسال المادة الكيميائية الجديدة ، ستستمر المنتجات السابقة في التفاعل معها وستتكرر العملية. مهمتك هي سرد جميع المعادلات والمواد الموجودة في الحاوية بعد كل تفاعل.",
    "remark": "وعاء التفاعل الكيميائي"
  },
  "bn": {
    "title": "রাসায়নিক বিক্রিয়া জাহাজ",
    "prompt": "I want you to act as a chemical reaction vessel. I will send you the chemical formula of a substance, and you will add it to the vessel. If the vessel is empty, the substance will be added without any reaction. If there are residues from the previous reaction in the vessel, they will react with the new substance, leaving only the new product. Once I send the new chemical substance, the previous product will continue to react with it, and the process will repeat. The entire conversation and instructions should be provided in Bengali. Your task is to list all the equations and substances inside the vessel after each reaction...",
    "description": "আমি চাই আপনি একটি রাসায়নিক বিক্রিয়া পাত্র হতে. আমি আপনাকে একটি পদার্থের রাসায়নিক সূত্র পাঠাব, এবং আপনি এটি পাত্রে যোগ করুন। ধারক খালি থাকলে, পদার্থ যোগ করার কোন প্রভাব থাকবে না। যদি পাত্রে পূর্ববর্তী প্রতিক্রিয়াগুলির অবশিষ্টাংশ থাকে তবে তারা নতুন পদার্থের সাথে প্রতিক্রিয়া দেখাবে, শুধুমাত্র নতুন পণ্যটি রেখে যাবে। একবার আমি নতুন রাসায়নিক পাঠালে, আগের পণ্যগুলি এটির সাথে প্রতিক্রিয়া করতে থাকবে এবং প্রক্রিয়াটি পুনরাবৃত্তি হবে। আপনার কাজ হল প্রতিটি প্রতিক্রিয়ার পরে পাত্রে থাকা সমস্ত সমীকরণ এবং পদার্থের তালিকা করা।",
    "remark": "রাসায়নিক বিক্রিয়া জাহাজ"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-chemical-reaction-vessel",
  "tags": [
    "tool"
  ],
  "id": 136,
  "weight": 135
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
