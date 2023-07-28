import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "提取联系信息",
    "prompt": "Extract the name and mailing address from this email: [文本]",
    "description": "从这封邮件中提取姓名和邮箱地址：[文本]",
    "remark": "从文本中提取联系信息。"
  },
  "en": {
    "title": "Extract information",
    "prompt": "Extract the name and mailing address from this email: ",
    "remark": "Extract contact information"
  },
  "ja": {
    "title": "退会連絡先",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Extract the name and mailing address from this email: ",
    "description": "このメールから名前とメールアドレスを抜き出す：[本文]。",
    "remark": "テキストから連絡先を抽出する。"
  },
  "ko": {
    "title": "연락처 정보 철회",
    "prompt": "The entire conversation and instructions should be provided in Korean. Extract the name and mailing address from this email: ",
    "description": "이 이메일에서 이름과 이메일 주소 추출: [텍스트]",
    "remark": "텍스트에서 연락처 정보 추출하기."
  },
  "es": {
    "title": "Extraer información de contacto",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Extract the name and mailing address from this email: ",
    "description": "Extraiga el nombre y la dirección de correo electrónico de este mensaje: [texto].",
    "remark": "Extracción de información de contacto de un texto."
  },
  "fr": {
    "title": "Extraire les informations de contact",
    "prompt": "The entire conversation and instructions should be provided in French. Extract the name and mailing address from this email: ",
    "description": "Extraire le nom et l'adresse électronique de cet e-mail : [texte]",
    "remark": "Extraction d'informations de contact à partir d'un texte."
  },
  "de": {
    "title": "Kontaktinformationen extrahieren",
    "prompt": "The entire conversation and instructions should be provided in German. Extract the name and mailing address from this email: ",
    "description": "Name und E-Mail-Adresse aus dieser E-Mail extrahieren: [Text]",
    "remark": "Extrahieren von Kontaktinformationen aus Text."
  },
  "it": {
    "title": "Estrarre le informazioni di contatto",
    "prompt": "The entire conversation and instructions should be provided in Italian. Extract the name and mailing address from this email: ",
    "description": "Estrarre il nome e l'indirizzo e-mail da questa e-mail: [text]",
    "remark": "Estrazione di informazioni di contatto dal testo."
  },
  "ru": {
    "title": "Извлечение контактной информации",
    "prompt": "The entire conversation and instructions should be provided in Russian. Extract the name and mailing address from this email: ",
    "description": "Извлеките имя и адрес электронной почты из этого письма: [текст].",
    "remark": "Извлечение контактной информации из текста."
  },
  "pt": {
    "title": "Extrair informações de contacto",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Extract the name and mailing address from this email: ",
    "description": "Extrair o nome e o endereço de correio eletrónico desta mensagem: [texto]",
    "remark": "Extrair informações de contacto do texto."
  },
  "hi": {
    "title": "संपर्क जानकारी निकालें",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Extract the name and mailing address from this email: ",
    "description": "इस संदेश से नाम और ईमेल पते निकालें: [पाठ]",
    "remark": "पाठ से संपर्क जानकारी निकालें."
  },
  "ar": {
    "title": "استخراج معلومات الاتصال",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Extract the name and mailing address from this email: ",
    "description": "استخراج الأسماء وعناوين البريد الإلكتروني من هذه الرسالة: [نص]",
    "remark": "استخراج معلومات الاتصال من النص."
  },
  "bn": {
    "title": "যোগাযোগের তথ্য বের করুন",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Extract the name and mailing address from this email: ",
    "description": "এই বার্তা থেকে নাম এবং ইমেল ঠিকানা বের করুন: [পাঠ্য]",
    "remark": "পাঠ্য থেকে যোগাযোগের তথ্য বের করুন।"
  },
  "website": "https://platform.openai.com/examples/default-extract-contact-info",
  "tags": [
    "text"
  ],
  "id": 34,
  "weight": 87
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
