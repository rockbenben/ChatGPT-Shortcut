import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "后勤人员",
    "prompt": "I want you to act as a logistician and respond in Chinese. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. My first request is [活动需求]",
    "description": "我希望你充当后勤人员。我将向你提供一个即将举行的活动的细节，如参加人数、地点和其他相关因素。你的角色是为该活动制定一个有效的后勤计划，考虑到事先分配资源、交通设施、餐饮服务等。你还应该牢记潜在的安全问题，并提出策略来减少与这种大规模活动相关的风险。",
    "remark": "为活动制定后勤计划。"
  },
  "en": {
    "title": "logistician",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. My first request is ",
    "remark": "Develop a logistical plan for the event."
  },
  "ja": {
    "title": "ロジスティックス",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Janpanese. My first request is ",
    "description": "ロジスティシャンとして活動してほしい。参加者数、場所など、近々開催されるイベントの詳細をお伝えします。あなたの役割は、リソース、輸送設備、ケータリングサービスなどの事前の割り当てを考慮し、イベントの効果的なロジスティックプランを開発することです。また、セキュリティ上の問題も考慮し、このような大規模なイベントに関連するリスクを軽減するための戦略を立てる必要があります。",
    "remark": "イベントのロジスティックプランを策定する。"
  },
  "ko": {
    "title": "물류 전문가",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Korean. My first request is ",
    "description": "물류 담당자로 활동해 주셨으면 합니다. 참가자 수, 장소 및 기타 관련 요소와 같은 예정된 이벤트에 대한 세부 정보를 제공할 것입니다. 귀하의 역할은 자원, 운송 시설, 케이터링 서비스 등의 사전 할당을 고려하여 이벤트에 대한 효과적인 물류 계획을 개발하는 것입니다. 또한 잠재적인 보안 문제를 염두에 두고 대규모 이벤트와 관련된 위험을 완화할 수 있는 전략을 마련해야 합니다.",
    "remark": "이벤트를 위한 물류 계획을 수립합니다."
  },
  "es": {
    "title": "personal logístico",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Spanish. My first request is ",
    "description": "Me gustaría que actuara como logista. Le facilitaré los detalles de un evento próximo, como el número de participantes, el lugar y otros factores relevantes. Tu papel consistirá en elaborar un plan logístico eficaz para el acto, teniendo en cuenta la preasignación de recursos, medios de transporte, servicios de catering, etc. También deberá tener en cuenta los posibles problemas de seguridad e idear estrategias para mitigar los riesgos asociados a un acontecimiento de tal envergadura.",
    "remark": "Elabore un plan logístico para el acto."
  },
  "fr": {
    "title": "personnel logistique",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in French. My first request is ",
    "description": "J'aimerais que vous agissiez en tant que logisticien. Je vous fournirai les détails d'un événement à venir, tels que le nombre de participants, le lieu et d'autres facteurs pertinents. Votre rôle consistera à élaborer un plan logistique efficace pour l'événement, en tenant compte de la pré-affectation des ressources, des moyens de transport, des services de restauration, etc. Vous devez également garder à l'esprit les problèmes de sécurité potentiels et élaborer des stratégies pour atténuer les risques associés à un événement de cette envergure.",
    "remark": "Élaborer un plan logistique pour l'événement."
  },
  "de": {
    "title": "Logistikpersonal",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in German. My first request is ",
    "description": "Ich möchte, dass Sie als Logistiker fungieren. Ich werde Ihnen Einzelheiten zu einer bevorstehenden Veranstaltung mitteilen, z. B. die Anzahl der Teilnehmer, den Ort und andere relevante Faktoren. Ihre Aufgabe wird es sein, einen effektiven Logistikplan für die Veranstaltung zu entwickeln, der die Vorabzuweisung von Ressourcen, Transportmöglichkeiten, Catering-Diensten usw. berücksichtigt. Sie sollten auch mögliche Sicherheitsprobleme im Auge behalten und Strategien entwickeln, um die mit einer solchen Großveranstaltung verbundenen Risiken zu mindern.",
    "remark": "Entwickeln Sie einen logistischen Plan für die Veranstaltung."
  },
  "it": {
    "title": "personale logistico",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Italian. My first request is ",
    "description": "Vorrei che lei agisse come logista. Le fornirò i dettagli di un evento imminente, come il numero di partecipanti, il luogo e altri fattori rilevanti. Il vostro ruolo sarà quello di sviluppare un piano logistico efficace per l'evento, tenendo conto della preassegnazione delle risorse, delle strutture di trasporto, dei servizi di catering, ecc. Dovrete inoltre tenere conto dei potenziali problemi di sicurezza e proporre strategie per mitigare i rischi associati a un evento di tale portata.",
    "remark": "Sviluppare un piano logistico per l'evento."
  },
  "ru": {
    "title": "логистический персонал",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Russian. My first request is ",
    "description": "Я хотел бы, чтобы Вы выступили в роли логиста. Я предоставлю Вам подробную информацию о предстоящем мероприятии: количество участников, место проведения и другие важные факторы. Ваша роль будет заключаться в разработке эффективного плана материально-технического обеспечения мероприятия с учетом предварительного распределения ресурсов, транспортных средств, услуг питания и т.д. Необходимо также учитывать возможные проблемы безопасности и разработать стратегии по снижению рисков, связанных с проведением столь масштабного мероприятия.",
    "remark": "Разработать план материально-технического обеспечения мероприятия."
  },
  "pt": {
    "title": "pessoal de logística",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Portuguese. My first request is ",
    "description": "Gostaria que desempenhasse a função de logístico. Fornecer-lhe-ei informações pormenorizadas sobre um evento futuro, tais como o número de participantes, o local e outros factores relevantes. O seu papel será desenvolver um plano logístico eficaz para o evento, tendo em conta a atribuição prévia de recursos, meios de transporte, serviços de restauração, etc. Deve também ter em conta os potenciais problemas de segurança e conceber estratégias para atenuar os riscos associados a um evento desta envergadura.",
    "remark": "Desenvolver um plano logístico para o evento."
  },
  "hi": {
    "title": "सहयोगी कर्मचारी - वर्ग",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Hindi. My first request is ",
    "description": "मैं चाहता हूं कि आप सहायक कर्मचारी के रूप में कार्य करें। मैं आपको आगामी कार्यक्रम का विवरण प्रदान करूंगा जैसे कि उपस्थित लोगों की संख्या, स्थान और अन्य प्रासंगिक कारक। आपकी भूमिका संसाधनों, परिवहन सुविधाओं, खानपान सेवाओं आदि के पूर्व आवंटन को ध्यान में रखते हुए कार्यक्रम के लिए एक कुशल लॉजिस्टिक योजना विकसित करना है। आपको संभावित सुरक्षा चिंताओं को भी ध्यान में रखना चाहिए और ऐसी बड़े पैमाने की गतिविधियों से जुड़े जोखिमों को कम करने के लिए रणनीति बनानी चाहिए।",
    "remark": "आयोजन के लिए एक लॉजिस्टिक योजना बनाएं।"
  },
  "ar": {
    "title": "فريق الدعم",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Arabic. My first request is ",
    "description": "أريدك أن تعمل كموظف دعم. سأزودك بتفاصيل عن حدث قادم مثل عدد الحاضرين والموقع والعوامل الأخرى ذات الصلة. يتمثل دورك في تطوير خطة لوجستية فعالة للحدث ، مع مراعاة التخصيص المسبق للموارد ، ومرافق النقل ، وخدمات التموين ، إلخ. يجب عليك أيضًا مراعاة المخاوف الأمنية المحتملة والتوصل إلى استراتيجيات لتقليل المخاطر المرتبطة بمثل هذه الأنشطة واسعة النطاق.",
    "remark": "ضع خطة لوجستية للحدث."
  },
  "bn": {
    "title": "সাপোর্ট স্টাফ",
    "prompt": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and other relevant factors. Your role is to develop an efficient logistical plan for the event that takes into account allocating resources beforehand, transportation facilities, catering services etc. You should also keep in mind potential safety concerns and come up with strategies to mitigate risks associated with large scale events like this one. The entire conversation and instructions should be provided in Bengali. My first request is ",
    "description": "আমি চাই আপনি সাপোর্ট স্টাফ হিসেবে কাজ করুন। আমি আপনাকে একটি আসন্ন ইভেন্টের বিশদ বিবরণ যেমন উপস্থিতির সংখ্যা, অবস্থান এবং অন্যান্য প্রাসঙ্গিক কারণগুলি সরবরাহ করব৷ আপনার ভূমিকা হল ইভেন্টের জন্য একটি দক্ষ লজিস্টিক পরিকল্পনা তৈরি করা, সম্পদের পূর্বে বরাদ্দ, পরিবহন সুবিধা, ক্যাটারিং পরিষেবা ইত্যাদি বিবেচনা করে। আপনার সম্ভাব্য নিরাপত্তা উদ্বেগগুলিও মাথায় রাখা উচিত এবং এই ধরনের বৃহৎ মাপের ক্রিয়াকলাপের সাথে সম্পর্কিত ঝুঁকিগুলি কমাতে কৌশলগুলি নিয়ে আসা উচিত।",
    "remark": "ইভেন্টের জন্য একটি লজিস্টিক পরিকল্পনা তৈরি করুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-logistician",
  "tags": [
    "company"
  ],
  "id": 149,
  "weight": 139
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
