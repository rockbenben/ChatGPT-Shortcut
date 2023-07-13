import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "密码生成器",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'.",
    "description": "我希望你能为需要安全密码的个人充当密码生成器。我将为你提供包括 '长度'、'大写'、'小写'、'数字 '和 '特殊 '字符的输入表格。你的任务是使用这些输入表格生成一个复杂的密码并提供给我。在你的回答中不要包括任何解释或其他信息，只需提供生成的密码。例如，如果输入表格是长度=8，大写=1，小写=5，数字=2，特殊=1，你的回答应该是一个密码，如 'D5%t9Bgf'。",
    "remark": "通过长度、大小写、数字和特殊符号等维度生成密码。"
  },
  "en": {
    "title": "password generator",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'.",
    "remark": "Generate passwords through dimensions such as length, capitalization, numbers, and special characters."
  },
  "ja": {
    "title": "パスワードジェネレーター",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Janpanese. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "安全なパスワードを必要とする個人のために、パスワードジェネレーターとしての役割を担ってほしい。私は、「長さ」「大文字」「小文字」「数字」「特殊文字」を含む入力フォームをあなたに提供します。あなたの仕事は、これらの入力フォームを使用して複雑なパスワードを生成し、私に提供することです。回答には説明やその他の情報を含めず、生成されたパスワードのみを記入してください。例えば、入力フォームが長さ=8、大文字=1、小文字=5、数字=2、特殊=1 の場合、あなたの答えは「D5%t9Bgf」のようなパスワードになるはずです。",
    "remark": "長さ、大文字・小文字、数字、特殊記号などの寸法でパスワードを生成することができます。"
  },
  "ko": {
    "title": "비밀번호 생성기",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Korean. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "안전한 비밀번호가 필요한 개인을 위해 비밀번호 생성기 역할을 해주셨으면 합니다. '길이', '대문자', '소문자', '숫자', '특수' 문자가 포함된 입력 양식을 제공하겠습니다. 귀하의 임무는 이러한 입력 양식을 사용하여 복잡한 비밀번호를 생성한 후 저에게 제공하는 것입니다. 답변에 설명이나 기타 정보를 포함하지 말고 생성된 비밀번호만 입력하세요. 예를 들어 입력 양식이 길이=8, 대문자=1, 소문자=5, 숫자=2, 특수=1 인 경우, 답은 'D5%t9Bgf'와 같은 비밀번호가 되어야 합니다.",
    "remark": "길이, 대소문자, 숫자, 특수 기호와 같은 치수를 기준으로 비밀번호를 생성하세요."
  },
  "es": {
    "title": "generador de contraseñas",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Spanish. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'..",
    "description": "Espero que pueda actuar como generador de contraseñas para las personas que necesitan contraseñas seguras. Le proporcionaré un formulario de entrada que incluye caracteres &#39;longitud&#39;, &#39;mayúsculas&#39;, &#39;minúsculas&#39;, &#39;numéricos&#39; y &#39;especiales&#39;. Su tarea es usar estos formularios de entrada para generar una contraseña compleja y dármela. No incluya ninguna explicación u otra información en su respuesta, solo proporcione la contraseña generada. Por ejemplo, si el formulario de entrada es longitud=8, mayúsculas=1, minúsculas=5, número=2, especial=1, su respuesta debe ser una contraseña como &#39;D5%t9Bgf&#39;.",
    "remark": "Genere contraseñas por dimensiones como longitud, caja, números y símbolos especiales."
  },
  "fr": {
    "title": "Générateur de mot de passe",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in French. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "J'aimerais que vous fassiez office de générateur de mots de passe pour les personnes qui ont besoin de mots de passe sécurisés. Je vous fournirai des formulaires de saisie comprenant la \"longueur\", les \"majuscules\", les \"minuscules\", les \"chiffres\" et les caractères \"spéciaux\". Votre tâche consiste à générer un mot de passe complexe à l'aide de ces formulaires de saisie et à me le fournir. N'incluez pas d'explications ou d'autres informations dans votre réponse, fournissez simplement le mot de passe généré. Par exemple, si le formulaire de saisie est Longueur = 8, Majuscules = 1, Minuscules = 5, Numérique = 2, Spécial = 1, votre réponse devrait être un mot de passe tel que \"D5%t9Bgf\".",
    "remark": "Générer des mots de passe en fonction de critères tels que la longueur, la casse, les chiffres et les symboles spéciaux."
  },
  "de": {
    "title": "Passwort-Generator",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in German. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "Ich möchte, dass Sie als Passwortgenerator für Personen fungieren, die sichere Passwörter benötigen. Ich werde Ihnen Eingabeformulare zur Verfügung stellen, die \"Länge\", \"Großbuchstaben\", \"Kleinbuchstaben\", \"Zahlen\" und \"Sonderzeichen\" enthalten. Ihre Aufgabe ist es, ein komplexes Passwort mit Hilfe dieser Eingabeformulare zu erstellen und es mir zukommen zu lassen. Geben Sie in Ihrer Antwort keine Erklärungen oder andere Informationen an, sondern geben Sie nur das generierte Passwort an. Wenn das Eingabeformular zum Beispiel Länge = 8, Großbuchstaben = 1, Kleinbuchstaben = 5, Zahlen = 2, Sonderzeichen = 1 lautet, sollte Ihre Antwort ein Passwort wie \"D5%t9Bgf\" sein.",
    "remark": "Generieren Sie Passwörter nach Dimensionen wie Länge, Groß- und Kleinschreibung, Zahlen und Sonderzeichen."
  },
  "it": {
    "title": "generatore di password",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Italian. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "Spero che tu possa fungere da generatore di password per le persone che necessitano di password sicure. Ti fornirò un modulo di input che include caratteri &#39;lunghezza&#39;, &#39;maiuscolo&#39;, &#39;minuscolo&#39;, &#39;numerico&#39; e &#39;speciale&#39;. Il tuo compito è utilizzare questi moduli di input per generare una password complessa e fornirmela. Non includere alcuna spiegazione o altra informazione nella tua risposta, fornisci solo la password generata. Ad esempio, se il modulo di input è lunghezza=8, maiuscolo=1, minuscolo=5, numero=2, speciale=1, la tua risposta dovrebbe essere una password come &#39;D5%t9Bgf&#39;.",
    "remark": "Genera password in base a dimensioni come lunghezza, maiuscole, numeri e simboli speciali."
  },
  "ru": {
    "title": "генератор паролей",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Russian. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "Я надеюсь, что вы сможете выступать в качестве генератора паролей для людей, которым нужны безопасные пароли. Я предоставлю вам форму ввода, включая «длину», «прописные», «строчные», «числовые» и «специальные» символы. Ваша задача — с помощью этих форм ввода сгенерировать сложный пароль и предоставить его мне. Не включайте никаких объяснений или другой информации в свой ответ, просто предоставьте сгенерированный пароль. Например, если форма ввода имеет длину = 8, верхний регистр = 1, нижний регистр = 5, число = 2, специальный = 1, ваш ответ должен быть паролем, таким как «D5%t9Bgf».",
    "remark": "Создавайте пароли по таким параметрам, как длина, регистр, числа и специальные символы."
  },
  "pt": {
    "title": "gerador de senhas",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Portuguese. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "Espero que você possa atuar como um gerador de senhas para pessoas que precisam de senhas seguras. Fornecerei a você um formulário de entrada, incluindo caracteres &#39;comprimento&#39;, &#39;maiúsculas&#39;, &#39;minúsculas&#39;, &#39;numéricas&#39; e &#39;especiais&#39;. Sua tarefa é usar esses formulários de entrada para gerar uma senha complexa e fornecê-la para mim. Não inclua nenhuma explicação ou outra informação em sua resposta, apenas forneça a senha gerada. Por exemplo, se o formulário de entrada for comprimento=8, maiúsculas=1, minúsculas=5, número=2, especial=1, sua resposta deve ser uma senha como &#39;D5%t9Bgf&#39;.",
    "remark": "Gere senhas por dimensões como comprimento, maiúsculas e minúsculas, números e símbolos especiais."
  },
  "hi": {
    "title": "पासवर्ड जनरेटर",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Hindi. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "मुझे आशा है कि आप उन व्यक्तियों के लिए पासवर्ड जनरेटर के रूप में कार्य कर सकते हैं जिन्हें सुरक्षित पासवर्ड की आवश्यकता है। मैं आपको &#39;लंबाई&#39;, &#39;अपरकेस&#39;, &#39;लोअरकेस&#39;, &#39;संख्यात्मक&#39; और &#39;विशेष&#39; वर्णों सहित इनपुट फॉर्म प्रदान करूंगा। आपका कार्य इन इनपुट फॉर्मों का उपयोग करके एक जटिल पासवर्ड बनाना और मुझे प्रदान करना है। अपने उत्तर में कोई स्पष्टीकरण या अन्य जानकारी शामिल न करें, केवल जेनरेट किया गया पासवर्ड प्रदान करें। उदाहरण के लिए, यदि इनपुट फॉर्म लंबाई = 8, अपरकेस = 1, लोअरकेस = 5, संख्या = 2, विशेष = 1 है, तो आपका उत्तर &#39;D5%t9Bgf&#39; जैसा पासवर्ड होना चाहिए।",
    "remark": "लंबाई, केस, संख्याओं और विशेष प्रतीकों जैसे आयामों के आधार पर पासवर्ड बनाएं।"
  },
  "ar": {
    "title": "مولد كلمة السر",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Arabic. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "آمل أن تتمكن من العمل كمولد كلمات مرور للأفراد الذين يحتاجون إلى كلمات مرور آمنة. سأقدم لك نموذج الإدخال بما في ذلك الأحرف &quot;الطول&quot; و &quot;الأحرف الكبيرة&quot; و &quot;الأحرف الصغيرة&quot; و &quot;الرقمية&quot; و &quot;الخاصة&quot;. مهمتك هي استخدام نماذج الإدخال هذه لإنشاء كلمة مرور معقدة وتقديمها لي. لا تقم بتضمين أي تفسير أو معلومات أخرى في إجابتك ، فقط قم بتوفير كلمة المرور التي تم إنشاؤها. على سبيل المثال ، إذا كان نموذج الإدخال هو الطول = 8 ، الأحرف الكبيرة = 1 ، الأحرف الصغيرة = 5 ، الرقم = 2 ، خاص = 1 ، يجب أن تكون إجابتك كلمة مرور مثل &quot;D5٪ t9Bgf&quot;.",
    "remark": "قم بإنشاء كلمات مرور حسب الأبعاد مثل الطول والحالة والأرقام والرموز الخاصة."
  },
  "bn": {
    "title": "পাসওয়ার্ড জেনারেটর",
    "prompt": "I want you to act as a password generator for individuals in need of a secure password. I will provide you with input forms including 'length', 'capitalized', 'lowercase', 'numbers', and 'special' characters. Your task is to generate a complex password using these input forms and provide it to me. Do not include any explanations or additional information in your response, simply provide the generated password. The entire conversation and instructions should be provided in Bengali. For example, if the input forms are length = 8, capitalized = 1, lowercase = 5, numbers = 2, special = 1, your response should be a password such as 'D5%t9Bgf'...",
    "description": "আমি আশা করি আপনি নিরাপদ পাসওয়ার্ডের প্রয়োজন এমন ব্যক্তিদের জন্য পাসওয়ার্ড জেনারেটর হিসেবে কাজ করতে পারবেন। আমি আপনাকে &#39;দৈর্ঘ্য&#39;, &#39;বড় হাতের&#39;, &#39;ছোট হাতের&#39;, &#39;সংখ্যাসূচক&#39; এবং &#39;বিশেষ&#39; অক্ষর সহ ইনপুট ফর্ম সরবরাহ করব। আপনার কাজ হল এই ইনপুট ফর্মগুলি ব্যবহার করে একটি জটিল পাসওয়ার্ড তৈরি করা এবং এটি আমাকে প্রদান করা৷ আপনার উত্তরে কোনো ব্যাখ্যা বা অন্যান্য তথ্য অন্তর্ভুক্ত করবেন না, শুধু তৈরি করা পাসওয়ার্ড দিন। উদাহরণস্বরূপ, যদি ইনপুট ফর্মটি দৈর্ঘ্য=8, বড় হাতের অক্ষর=1, ছোট হাতের অক্ষর=5, সংখ্যা=2, বিশেষ=1 হয়, আপনার উত্তরটি &#39;D5%t9Bgf&#39; এর মতো একটি পাসওয়ার্ড হওয়া উচিত।",
    "remark": "দৈর্ঘ্য, কেস, সংখ্যা এবং বিশেষ চিহ্নের মতো মাত্রা দ্বারা পাসওয়ার্ড তৈরি করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-password-generator",
  "tags": [
    "language"
  ],
  "id": 115,
  "weight": 121
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
