import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "社交媒体经理",
    "prompt": "I want you to act as a social media manager and respond in Chinese. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. My first suggestion request is [推广目的]",
    "description": "希望你能担任社会媒体经理。你将负责在所有相关平台上开发和执行活动，通过回应问题和评论与受众接触，通过社区管理工具监控对话，使用分析方法衡量成功，创造有吸引力的内容并定期更新。",
    "remark": "Social Media Manager"
  },
  "en": {
    "title": "Social Media Manager",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. My first suggestion request is ",
    "remark": "Social Media Manager"
  },
  "ja": {
    "title": "ソーシャルメディアマネージャー",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Janpanese. My first suggestion request is ",
    "description": "ソーシャルメディアマネージャーとしてご活躍いただく予定です。関連するすべてのプラットフォームにおけるキャンペーンの開発と実行、質問やコメントへの対応によるオーディエンスとの関わり、コミュニティ管理ツールによる会話のモニタリング、成功のための分析、魅力的なコンテンツの作成と定期的な更新を担当します。",
    "remark": "ソーシャルメディアマネージャー"
  },
  "ko": {
    "title": "소셜 미디어 관리자",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Korean. My first suggestion request is ",
    "description": "소셜 미디어 관리자로 일하게 됩니다. 모든 관련 플랫폼에서 캠페인을 개발 및 실행하고, 질문과 댓글에 응답하여 청중과 소통하고, 커뮤니티 관리 도구를 통해 대화를 모니터링하고, 분석을 사용하여 성공 여부를 측정하고, 매력적인 콘텐츠를 제작하고 정기적으로 업데이트하는 업무를 담당하게 됩니다.",
    "remark": "소셜 미디어 관리자"
  },
  "es": {
    "title": "Responsable de redes sociales",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Spanish. My first suggestion request is ",
    "description": "Se espera que asuma el papel de Social Media Manager. Será responsable de desarrollar y ejecutar campañas en todas las plataformas pertinentes, interactuar con el público respondiendo a preguntas y comentarios, supervisar las conversaciones mediante herramientas de gestión de comunidades, utilizar análisis para medir el éxito, crear contenidos atractivos y actualizarlos periódicamente.",
    "remark": "Responsable de redes sociales"
  },
  "fr": {
    "title": "Responsable des médias sociaux",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in French. My first suggestion request is ",
    "description": "Nous espérons que vous assumerez le rôle de gestionnaire des médias sociaux. Vous serez chargé(e) d'élaborer et d'exécuter des campagnes sur toutes les plateformes pertinentes, de dialoguer avec le public en répondant aux questions et aux commentaires, de suivre les conversations à l'aide d'outils de gestion de la communauté, d'utiliser des outils d'analyse pour mesurer le succès, de créer un contenu attrayant et de le mettre à jour régulièrement.",
    "remark": "Responsable des médias sociaux"
  },
  "de": {
    "title": "Manager für soziale Medien",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in German. My first suggestion request is ",
    "description": "Wir hoffen, dass Sie die Rolle des Social Media Manager übernehmen werden. Sie werden für die Entwicklung und Durchführung von Kampagnen auf allen relevanten Plattformen verantwortlich sein, mit dem Publikum in Kontakt treten, indem Sie auf Fragen und Kommentare antworten, Konversationen mit Hilfe von Community-Management-Tools überwachen, Analysen zur Erfolgsmessung nutzen, ansprechende Inhalte erstellen und diese regelmäßig aktualisieren.",
    "remark": "Manager für soziale Medien"
  },
  "it": {
    "title": "Responsabile dei media sociali",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Italian. My first suggestion request is ",
    "description": "L'auspicio è che tu assuma il ruolo di Social Media Manager. Sarete responsabili dello sviluppo e dell'esecuzione di campagne su tutte le piattaforme pertinenti, del coinvolgimento del pubblico rispondendo a domande e commenti, del monitoraggio delle conversazioni attraverso gli strumenti di gestione della comunità, dell'utilizzo di analisi per misurare il successo, della creazione di contenuti coinvolgenti e del loro aggiornamento regolare.",
    "remark": "Responsabile dei media sociali"
  },
  "ru": {
    "title": "Менеджер по работе с социальными сетями",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Russian. My first suggestion request is ",
    "description": "Предполагается, что вы займете должность менеджера по работе с социальными сетями. Вы будете отвечать за разработку и проведение кампаний на всех соответствующих платформах, взаимодействие с аудиторией путем ответов на вопросы и комментарии, мониторинг обсуждений с помощью инструментов управления сообществами, использование аналитики для оценки успеха, создание интересного контента и его регулярное обновление.",
    "remark": "Менеджер по работе с социальными сетями"
  },
  "pt": {
    "title": "Gestor de redes sociais",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Portuguese. My first suggestion request is ",
    "description": "Espera-se que venha a assumir a função de gestor de redes sociais. Será responsável por desenvolver e executar campanhas em todas as plataformas relevantes, interagir com o público respondendo a perguntas e comentários, monitorizar conversas através de ferramentas de gestão de comunidades, utilizar análises para medir o sucesso, criar conteúdos interessantes e actualizá-los regularmente.",
    "remark": "Gestor de redes sociais"
  },
  "hi": {
    "title": "सामाजिक मीडिया प्रबंधक",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Hindi. My first suggestion request is ",
    "description": "आशा है कि आप सोशल मीडिया मैनेजर के रूप में काम कर सकते हैं। आप सभी प्रासंगिक प्लेटफार्मों पर अभियान विकसित करने और निष्पादित करने, प्रश्नों और टिप्पणियों का जवाब देकर दर्शकों के साथ जुड़ने, सामुदायिक प्रबंधन टूल के माध्यम से बातचीत की निगरानी करने, एनालिटिक्स का उपयोग करके सफलता को मापने, आकर्षक सामग्री बनाने और इसे नियमित रूप से अपडेट करने के लिए जिम्मेदार होंगे।",
    "remark": "सामाजिक मीडिया प्रबंधक"
  },
  "ar": {
    "title": "مدير التواصل الاجتماعي",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Arabic. My first suggestion request is ",
    "description": "آمل أن تتمكن من العمل كمدير لوسائل التواصل الاجتماعي. ستكون مسؤولاً عن تطوير وتنفيذ الحملات عبر جميع الأنظمة الأساسية ذات الصلة ، والمشاركة مع الجماهير من خلال الرد على الأسئلة والتعليقات ، ومراقبة المحادثات من خلال أدوات إدارة المجتمع ، واستخدام التحليلات لقياس النجاح ، وإنشاء محتوى جذاب وتحديثه بانتظام.",
    "remark": "مدير التواصل الاجتماعي"
  },
  "bn": {
    "title": "সামাজিক মাধ্যম ব্যবস্থাপক",
    "prompt": "I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. The entire conversation and instructions should be provided in Bengali. My first suggestion request is ",
    "description": "আশা করি আপনি সোশ্যাল মিডিয়া ম্যানেজার হিসেবে কাজ করতে পারবেন। আপনি সমস্ত প্রাসঙ্গিক প্ল্যাটফর্ম জুড়ে প্রচারাভিযানগুলি বিকাশ এবং কার্যকর করার জন্য, প্রশ্ন এবং মন্তব্যের উত্তর দিয়ে শ্রোতাদের সাথে জড়িত থাকার জন্য, সম্প্রদায় পরিচালনার সরঞ্জামগুলির মাধ্যমে কথোপকথন নিরীক্ষণ, বিশ্লেষণ ব্যবহার করে সাফল্য পরিমাপ, আকর্ষক সামগ্রী তৈরি এবং নিয়মিত আপডেট করার জন্য দায়ী থাকবেন৷",
    "remark": "সামাজিক মাধ্যম ব্যবস্থাপক"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-social-media-manager",
  "tags": [
    "company"
  ],
  "id": 143,
  "weight": 204
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
