import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "取名字",
    "prompt": "请为我们的孩子取一个名字，孩子将于 2023 年 6 月底出生，父亲姓李，母亲姓侯。我们希望名字寓意美好前程、品性良善、富有智慧。请从诗经和楚辞中选取灵感，为孩子起 10 个合适的名字。",
    "description": "请为我们的孩子取一个名字，孩子将于 2023 年 6 月底出生，父亲姓李，母亲姓侯。我们希望名字寓意美好前程、品性良善、富有智慧。请从诗经和楚辞中选取灵感，为孩子起 10 个合适的名字。",
    "remark": "为孩子取一个富有美好含义的名字，从古代经典中获取灵感。"
  },
  "en": {
    "title": "Take name",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "remark": "Select a name for your child that carries a meaningful and beautiful significance, drawing inspiration from classical literature."
  },
  "ja": {
    "title": "ネーミング",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Janpanese. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "2023 年 6 月末に李という父と侯という母との間に生まれる子供の名前を教えてください。名前は、良い未来、良い性格、知恵を意味するものを希望します。歌集と朱子学をイメージして、ふさわしい名前を 10 個選んでください。",
    "remark": "美しい意味を持つ名前をお子さんにつけて、古代の古典からインスピレーションを得てください。"
  },
  "ko": {
    "title": "이름 지정",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Korean. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "2023 년 6 월 말에 리라는 아버지와 후라는 어머니 사이에서 태어날 아이의 이름을 지어주세요. 좋은 미래, 좋은 성품, 지혜를 의미하는 이름이 되었으면 합니다. 아가서와 춘추에서 영감을 얻은 적절한 이름 10 개를 골라주세요.",
    "remark": "자녀에게 아름다운 의미를 담은 이름을 지어주고 고대 고전에서 영감을 얻으세요."
  },
  "es": {
    "title": "christen",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Spanish. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "Por favor, danos un nombre para nuestro hijo, que nacerá a finales de junio de 2023, de padre Lee y madre Hou. Nos gustaría que el nombre significara un buen futuro, buen carácter y sabiduría. Por favor, elija 10 nombres adecuados para su hijo, inspirados en poemas del Clásico de la Poesía y del Libro de Chu.",
    "remark": "Consiga para su hijo un nombre rico en bellos significados e inspírese en los antiguos clásicos."
  },
  "fr": {
    "title": "christen",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in French. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "Veuillez nous donner un nom pour notre enfant, qui naîtra à la fin du mois de juin 2023 d'un père nommé Lee et d'une mère nommée Hou. Nous aimerions que ce nom soit synonyme de bon avenir, de bon caractère et de sagesse. Veuillez choisir 10 noms appropriés pour votre enfant, inspirés par des poèmes du Classique de la poésie et du Livre de Chu.",
    "remark": "Choisissez pour votre enfant un prénom riche de sens et inspirez-vous des anciens classiques."
  },
  "de": {
    "title": "christen",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in German. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "Bitte geben Sie uns einen Namen für unser Kind, das Ende Juni 2023 von einem Vater namens Lee und einer Mutter namens Hou geboren werden wird. Wir möchten, dass der Name für eine gute Zukunft, einen guten Charakter und Weisheit steht. Bitte wählen Sie 10 geeignete Namen für Ihr Kind aus, inspiriert von Gedichten aus dem Klassiker der Poesie und dem Buch Chu.",
    "remark": "Suchen Sie sich einen Namen für Ihr Kind, der reich an schöner Bedeutung ist, und lassen Sie sich von den alten Klassikern inspirieren."
  },
  "it": {
    "title": "cristo",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Italian. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "Vi preghiamo di darci un nome per il nostro bambino, che nascerà alla fine di giugno del 2023 da un padre di nome Lee e da una madre di nome Hou. Vorremmo che il nome significasse un buon futuro, un buon carattere e saggezza. Vi preghiamo di scegliere 10 nomi adatti per il vostro bambino, ispirati a poesie tratte dal Classico della Poesia e dal Libro di Chu.",
    "remark": "Scegliete per il vostro bambino un nome ricco di bei significati e ispiratevi agli antichi classici."
  },
  "ru": {
    "title": "кристен",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Russian. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "Пожалуйста, дайте имя нашему ребенку, который родится в конце июня 2023 года у отца по имени Ли и матери по имени Хоу. Мы хотели бы, чтобы имя означало хорошее будущее, добрый характер и мудрость. Пожалуйста, выберите 10 подходящих имен для ребенка, вдохновленных стихами из \"Классики поэзии\" и \"Книги Чу\".",
    "remark": "Придумайте для своего ребенка имя, богатое красивым смыслом, черпая вдохновение у древних классиков."
  },
  "pt": {
    "title": "cristão",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Portuguese. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "Por favor, dê-nos um nome para o nosso filho, que nascerá no final de junho de 2023, filho de um pai chamado Lee e de uma mãe chamada Hou. Gostaríamos que o nome significasse um bom futuro, bom carácter e sabedoria. Por favor, escolham 10 nomes adequados para o vosso filho, inspirados em poemas do Clássico da Poesia e do Livro de Chu.",
    "remark": "Arranje um nome para o seu filho que seja rico em significados bonitos e inspire-se nos clássicos antigos."
  },
  "hi": {
    "title": "नामकरण",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Hindi. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "कृपया हमारे बच्चे के लिए एक नाम चुनें, बच्चे का जन्म जून 2023 के अंत में होगा, पिता का उपनाम ली है और माता का उपनाम होउ है। हम आशा करते हैं कि नाम का तात्पर्य उज्ज्वल भविष्य, अच्छे चरित्र और ज्ञान से है। कृपया चू के गीतों और गीतों की पुस्तक से प्रेरणा लें और अपने बच्चे के लिए 10 उपयुक्त नाम चुनें।",
    "remark": "अपने बच्चे के लिए एक सार्थक नाम चुनें और प्राचीन क्लासिक्स से प्रेरणा लें।"
  },
  "ar": {
    "title": "تسمية",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Arabic. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "يرجى اختيار اسم لطفلنا ، سيولد الطفل في نهاية يونيو 2023 ، ولقب الأب هو لي ، ولقب الأم هو هو. نأمل أن يدل الاسم على مستقبل مشرق وحسن الخلق والحكمة. يرجى اختيار مصدر إلهام من كتاب أغاني وأغاني تشو ، واختيار 10 أسماء مناسبة لطفلك.",
    "remark": "اختر اسمًا ذا معنى لطفلك واحصل على الإلهام من الكلاسيكيات القديمة."
  },
  "bn": {
    "title": "নামকরণ",
    "prompt": "My baby will be born in June 2023. The father's last name is Li and the mother's last name is Hou. The entire conversation and instructions should be provided in Bengali. Can you help us choose a beautiful, auspicious, wise, and virtuous name for our child? Please derive the name from the Bible.",
    "description": "অনুগ্রহ করে আমাদের সন্তানের জন্য একটি নাম চয়ন করুন, শিশুটি 2023 সালের জুনের শেষে জন্মগ্রহণ করবে, পিতার উপাধি লি, এবং মায়ের উপাধি হউ৷ আমরা আশা করি যে নামটি একটি উজ্জ্বল ভবিষ্যত, ভাল চরিত্র এবং প্রজ্ঞা বোঝায়। অনুগ্রহ করে চু-এর গান এবং গানের বই থেকে অনুপ্রেরণা বেছে নিন এবং আপনার সন্তানের জন্য 10টি উপযুক্ত নাম বেছে নিন।",
    "remark": "আপনার সন্তানের জন্য একটি অর্থপূর্ণ নাম চয়ন করুন এবং প্রাচীন ক্লাসিক থেকে অনুপ্রেরণা পান।"
  },
  "website": null,
  "tags": [
    "tool"
  ],
  "id": 242,
  "weight": 1996
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
