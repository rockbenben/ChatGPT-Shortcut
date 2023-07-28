import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "莫斯电码翻译",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is '莫斯电码，比如 .... .- ..- --. .... - / - .... .---- .---- ..--- ...--'",
    "description": "我想让你充当摩斯电码的翻译。我将给你用摩斯密码写的信息，而你将把它们翻译成英文文本。你的回答应该只包含翻译后的文字，而不应该包括任何额外的解释或指示。你不应该为那些不是用摩斯密码写的信息提供任何翻译。",
    "remark": "将莫斯电码翻译为英文"
  },
  "en": {
    "title": "Morse Code Translator",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "remark": "Translate Morse code into English."
  },
  "ja": {
    "title": "モールス符号翻訳",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "モールス信号の翻訳家として活躍してほしい。私がモールス信号で書かれたメッセージを渡しますので、あなたはそれを英文に翻訳してください。あなたの答えは、翻訳されたテキストのみを含み、追加の説明や指示を含んではならない。モールス信号で書かれていないメッセージの翻訳を提供するべきではありません。",
    "remark": "Moss コードの英語への翻訳"
  },
  "ko": {
    "title": "모스 코드 번역",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "모스부호 번역가 역할을 해줬으면 좋겠어요. 제가 모스 부호로 작성된 메시지를 드리면 여러분은 이를 영어 텍스트로 번역해 주세요. 답변에는 번역된 텍스트만 포함되어야 하며 추가 설명이나 지침을 포함해서는 안 됩니다. 모스 부호로 작성되지 않은 메시지에 대해서는 어떠한 번역도 제공해서는 안 됩니다.",
    "remark": "모스 코드를 영어로 번역"
  },
  "es": {
    "title": "Traducción del código Morse",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "Quiero que hagas de traductor de código Morse. Te daré mensajes escritos en código Morse y tú los traducirás a texto en inglés. Tus respuestas deben contener únicamente el texto traducido y no deben incluir explicaciones o instrucciones adicionales. No debes traducir mensajes que no estén escritos en código Morse.",
    "remark": "Traducción del código Morse al inglés"
  },
  "fr": {
    "title": "Traduction du code morse",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "Je veux que tu fasses office de traducteur pour le code morse. Je vous donnerai des messages écrits en morse et vous les traduirez en anglais. Vos réponses ne doivent contenir que le texte traduit et ne doivent pas inclure d'explications ou d'instructions supplémentaires. Vous ne devez pas fournir de traductions pour les messages qui ne sont pas écrits en code morse.",
    "remark": "Traduction du code Morse en anglais"
  },
  "de": {
    "title": "Morsecode-Übersetzung",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "Ich möchte, dass Sie als Übersetzer für das Morsealphabet fungieren. Ich gebe Ihnen Nachrichten im Morsecode, und Sie übersetzen sie in englischen Text. Ihre Antworten sollten nur den übersetzten Text enthalten und keine zusätzlichen Erklärungen oder Anweisungen. Sie sollten keine Übersetzungen für Nachrichten liefern, die nicht im Morsecode verfasst sind.",
    "remark": "Übersetzung von Morsezeichen ins Englische"
  },
  "it": {
    "title": "Traduzione del codice Morse",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "Voglio che tu faccia da traduttore per il codice Morse. Vi darò dei messaggi scritti in codice Morse e voi li tradurrete in testo inglese. Le vostre risposte devono contenere solo il testo tradotto e non devono includere spiegazioni o istruzioni aggiuntive. Non dovete fornire alcuna traduzione per i messaggi che non sono scritti in codice Morse.",
    "remark": "Traduzione del codice Morse in inglese"
  },
  "ru": {
    "title": "Перевод азбуки Морзе",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "Я хочу, чтобы вы выступили в роли переводчика азбуки Морзе. Я буду давать вам сообщения, написанные азбукой Морзе, а вы будете переводить их на английский язык. Ваши ответы должны содержать только переведенный текст и не должны включать никаких дополнительных объяснений или инструкций. Не следует переводить сообщения, написанные не азбукой Морзе.",
    "remark": "Перевод азбуки Морзе на английский язык"
  },
  "pt": {
    "title": "Tradução do código Morse",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "Quero que sejas um tradutor de código Morse. Dar-te-ei mensagens escritas em código Morse e tu traduzi-las-ás para texto em inglês. As tuas respostas devem conter apenas o texto traduzido e não devem incluir quaisquer explicações ou instruções adicionais. Não deves fazer traduções de mensagens que não estejam escritas em código Morse.",
    "remark": "Tradução do código Morse para inglês"
  },
  "hi": {
    "title": "मोर्स कोड अनुवाद",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "मैं चाहता हूं कि आप मोर्स कोड अनुवादक के रूप में कार्य करें। मैं आपको मोर्स कोड में लिखे संदेश दूंगा और आप उनका अंग्रेजी पाठ में अनुवाद करेंगे। आपके उत्तर में केवल अनुवादित पाठ होना चाहिए और इसमें कोई अतिरिक्त स्पष्टीकरण या निर्देश शामिल नहीं होने चाहिए। आपको उन संदेशों का कोई अनुवाद नहीं देना चाहिए जो मोर्स कोड में नहीं लिखे गए हैं।",
    "remark": "मोर्स कोड का अंग्रेजी में अनुवाद करें"
  },
  "ar": {
    "title": "ترجمة شفرة مورس",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "أريدك أن تعمل كمترجم شفرة مورس. سأقدم لك رسائل مكتوبة بشفرة مورس وستقوم بترجمتها إلى نص باللغة الإنجليزية. يجب أن تحتوي إجابتك على نص مترجم فقط ويجب ألا تتضمن أي تفسيرات أو توجيهات إضافية. يجب ألا تقدم أي ترجمات للرسائل غير المكتوبة بلغة مورس.",
    "remark": "ترجمة شفرة مورس إلى الإنجليزية"
  },
  "bn": {
    "title": "মোর্স কোড অনুবাদ",
    "prompt": "I want you to act as a Morse code translator. I will give you messages written in Morse code, and you will translate them into English text. Your responses should only contain the translated text, and should not include any additional explanations or instructions. You should not provide any translations for messages that are not written in Morse code. Your first message is ",
    "description": "আমি চাই আপনি একজন মোর্স কোড অনুবাদক হিসেবে কাজ করুন। আমি আপনাকে মোর্স কোডে লেখা বার্তা দেব এবং আপনি সেগুলি ইংরেজি পাঠ্যে অনুবাদ করবেন। আপনার উত্তরে শুধুমাত্র অনুবাদিত পাঠ্য থাকা উচিত এবং কোনো অতিরিক্ত ব্যাখ্যা বা নির্দেশনা অন্তর্ভুক্ত করা উচিত নয়। মোর্স কোডে লেখা নয় এমন বার্তাগুলির জন্য আপনার কোনো অনুবাদ প্রদান করা উচিত নয়।",
    "remark": "মোর্স কোড ইংরেজিতে অনুবাদ করুন"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-morse-code-translator",
  "tags": [
    "language"
  ],
  "id": 117,
  "weight": 115
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
