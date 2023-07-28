import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "中医",
    "prompt": "我希望你能扮演一位既是老中医同时又是一个营养学专家，我讲描述我的症状，你要告诉我这种症状形成的原因，你将从中医角度提供准确的针灸、艾灸、具体的中药方剂，以及每一味药材的使用剂量，包括它的功效作用的治疗方案；再从营养学角度给出相应的营养补充建议，说出需要补充的营养素，以及相应剂量，我的第一个要求是【身体症状】",
    "description": "我希望你能扮演一位既是老中医同时又是一个营养学专家，我讲描述我的症状，你要告诉我这种症状形成的原因，你将从中医角度提供准确的针灸、艾灸、具体的中药方剂，以及每一味药材的使用剂量，包括它的功效作用的治疗方案；再从营养学角度给出相应的营养补充建议，说出需要补充的营养素，以及相应剂量，我的第一个要求是【身体症状】",
    "remark": "中医诊断涉及因素较多，治疗方案仅供参考，具体的方子需由医生提供。来自 @dong8531 的投稿。"
  },
  "en": {
    "title": "Traditional Chinese medicine",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. My symptoms are [describe specific physical symptoms].",
    "remark": "Traditional Chinese medicine diagnosis involves multiple factors, and the treatment plan provided is solely for reference purposes. Specific prescriptions should be provided by a licensed physician. Contributed by @dong8531."
  },
  "ja": {
    "title": "中国医学",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Janpanese. My symptoms are [describe specific physical symptoms].",
    "description": "あなたにお願いしたいのは、栄養学にも詳しいベテラン中医学者役です。私が症状を説明し、その症状ができた理由を教えていただき、鍼灸、特定漢方処方、各薬草の効能を含めた使用量など、正確な治療計画を立てていただき、栄養学の観点から、栄養補給の必要性を述べ、適切な栄養補給のアドバイスをしていただくのです。栄養素の補給の必要性とその量について、栄養学の観点から適切な栄養補給のアドバイスをしてください。",
    "remark": "中医学の診断には様々な要素があり、治療方針はあくまで参考です。具体的な処方は医師から提供される必要があります。dong8531 さんからの寄稿です。"
  },
  "ko": {
    "title": "한의학",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Korean. My symptoms are [describe specific physical symptoms].",
    "description": "영양 전문가이기도 한 베테랑 한의사의 역할을 해주셨으면 좋겠습니다. 제 증상을 설명하고, 그러한 증상이 발생한 이유를 말씀해 주시고, 침, 뜸, 특정 한약 처방에 대한 정확한 치료 계획과 효능을 포함하여 사용되는 각 약초의 복용량을 알려 주시고, 영양 관점에서 적절한 영양 보충의 필요성을 언급하면서 영양 보충에 대한 조언을 해주셨으면 합니다. 영양소 및 해당 복용량, 첫 번째 요청은 [신체 증상",
    "remark": "한의학 진단에는 많은 요소가 관련되어 있으며 치료 계획은 참고용일 뿐입니다. 구체적인 처방은 의사가 제공해야 합니다. 동 8531 의 기여."
  },
  "es": {
    "title": "un médico formado en medicina china",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Spanish. My symptoms are [describe specific physical symptoms].",
    "description": "Espero que pueda jugar un tanto una antigua medicina china, al mismo tiempo es un experto en nutrición, hablo a describir mis síntomas, usted tiene que decirme la razón de la formación de este síntoma, que será desde el punto de vista de la medicina tradicional china para proporcionar la acupuntura precisa, moxibustión, una receta específica de hierbas chinas, así como la dosis de cada hierba, incluyendo su eficacia del programa terapéutico, y luego desde el punto de vista de la suplementación nutricional para dar el asesoramiento adecuado, dicen que necesitan para complementar la nutrientes, así como la dosis correspondiente, mi primera petición es [síntomas físicos].",
    "remark": "El diagnóstico de la medicina china implica más factores, el plan de tratamiento es sólo de referencia, la fórmula específica debe ser proporcionada por el médico. Contribución de @dong8531."
  },
  "fr": {
    "title": "un médecin formé à la médecine chinoise",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in French. My symptoms are [describe specific physical symptoms].",
    "description": "J'espère que vous pouvez jouer le rôle d'un expert en nutrition, je parle pour décrire mes symptômes, vous devez me dire la raison de la formation de ce symptôme, vous serez du point de vue de la médecine traditionnelle chinoise pour fournir une acupuncture précise, moxibustion, une prescription spécifique d'herbes chinoises, ainsi que le dosage de chaque herbe, y compris son efficacité du programme thérapeutique ; et puis du point de vue de la supplémentation nutritionnelle pour donner les conseils appropriés, dire la nécessité de compléter les nutriments, ainsi que le dosage correspondant, ma première demande est [les symptômes physiques]. nutriments, ainsi que la posologie correspondante, ma première demande est [symptômes physiques].",
    "remark": "Le diagnostic de la médecine chinoise implique plus de facteurs, le plan de traitement n'est qu'une référence, la formule spécifique doit être fournie par le médecin. Contribution de @dong8531."
  },
  "de": {
    "title": "ein in chinesischer Medizin ausgebildeter Arzt",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in German. My symptoms are [describe specific physical symptoms].",
    "description": "Ich hoffe, Sie können eine sowohl eine alte chinesische Medizin spielen zur gleichen Zeit ist ein Experte in der Ernährung, ich spreche, um meine Symptome zu beschreiben, müssen Sie mir den Grund für die Bildung dieses Symptoms zu sagen, werden Sie aus der Sicht der traditionellen chinesischen Medizin zu bieten genaue Akupunktur, Moxibustion, eine spezifische chinesische Kräuter Rezept, sowie die Dosierung der einzelnen Kräuter, einschließlich der Wirksamkeit des therapeutischen Programms; und dann aus der Sicht der Nahrungsergänzung, um die entsprechenden Ratschläge zu geben, sagen müssen, um die Ergänzung Nährstoffe zu ergänzen, sowie die entsprechende Dosierung, mein erstes Anliegen ist [körperliche Symptome].",
    "remark": "Bei der Diagnose in der chinesischen Medizin spielen mehrere Faktoren eine Rolle, der Behandlungsplan dient nur als Anhaltspunkt, die spezifische Formel muss vom Arzt angegeben werden. Beitrag von @dong8531."
  },
  "it": {
    "title": "un medico formato in medicina cinese",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Italian. My symptoms are [describe specific physical symptoms].",
    "description": "Spero che si può giocare un sia una vecchia medicina cinese, allo stesso tempo è un esperto di nutrizione, parlo per descrivere i miei sintomi, si deve dire la ragione per la formazione di questo sintomo, sarà dal punto di vista della medicina tradizionale cinese per fornire l'agopuntura accurata, moxibustione, una prescrizione specifica a base di erbe cinesi, così come il dosaggio di ogni erba, tra cui la sua efficacia del programma terapeutico; e poi dal punto di vista della supplementazione nutrizionale per dare il consiglio appropriato, dire bisogno di integrare i nutrienti, nonché il relativo dosaggio, la mia prima richiesta è [sintomi fisici].",
    "remark": "La diagnosi della medicina cinese coinvolge più fattori, il piano di trattamento è solo un riferimento, la formula specifica deve essere fornita dal medico. Contributo di @dong8531."
  },
  "ru": {
    "title": "врач, прошедший обучение китайской медицине",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Russian. My symptoms are [describe specific physical symptoms].",
    "description": "Я надеюсь, что вы сможете выступить в роли старого китайского врача и одновременно эксперта в области питания, я говорю, чтобы описать мои симптомы, вы должны сказать мне причину формирования этого симптома, вы будете с точки зрения традиционной китайской медицины, чтобы обеспечить точную акупунктуру, моксибустион, конкретный китайский травяной рецепт, а также дозировку каждой травы, включая ее эффективность терапевтической программы; а затем с точки зрения пищевых добавок, чтобы дать соответствующие советы, скажем, необходимость дополнить питательных веществ, а также соответствующую дозировку, мой первый запрос - [физические симптомы].",
    "remark": "Диагностика в китайской медицине включает в себя большее количество факторов, план лечения приводится только для справки, конкретную формулу должен предоставить врач. Материал предоставлен @dong8531."
  },
  "pt": {
    "title": "um médico com formação em medicina chinesa",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Portuguese. My symptoms are [describe specific physical symptoms].",
    "description": "Espero que possa desempenhar o papel de um antigo médico chinês, ao mesmo tempo que é um especialista em nutrição, falo para descrever os meus sintomas, tem de me dizer a razão da formação deste sintoma, será do ponto de vista da medicina tradicional chinesa para fornecer acupunctura precisa, moxabustão, uma prescrição específica de ervas chinesas, bem como a dosagem de cada erva, incluindo a sua eficácia do programa terapêutico; e depois do ponto de vista da suplementação nutricional para dar os conselhos adequados, digamos que precisa de complementar os nutrientes, bem como a dosagem correspondente, o meu primeiro pedido é [sintomas físicos].",
    "remark": "O diagnóstico da medicina chinesa envolve mais factores, o plano de tratamento serve apenas de referência, a fórmula específica tem de ser fornecida pelo médico. Contribuição de @dong8531."
  },
  "hi": {
    "title": "पारंपरिक चीनी औषधि",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Hindi. My symptoms are [describe specific physical symptoms].",
    "description": "मुझे आशा है कि आप एक ही समय में एक पुराने चीनी डॉक्टर और पोषण विशेषज्ञ के रूप में कार्य कर सकते हैं। मैं अपने लक्षणों का वर्णन करूंगा, और आप मुझे लक्षणों के कारण बताएंगे। चीनी चिकित्सा के दृष्टिकोण से, आप सटीक एक्यूपंक्चर, मोक्सीबस्टन प्रदान करेंगे , विशिष्ट पारंपरिक चीनी चिकित्सा नुस्खे, साथ ही प्रत्येक औषधीय सामग्री की खुराक, इसकी प्रभावकारिता के उपचार योजना सहित; और फिर पोषण के दृष्टिकोण से संबंधित पोषण पूरक सुझाव दें, और उन पोषक तत्वों को बताएं जिन्हें पूरक करने की आवश्यकता है और संबंधित खुराक। मेरी पहली आवश्यकता है 【शारीरिक लक्षण】",
    "remark": "टीसीएम निदान में कई कारक शामिल होते हैं, और उपचार योजना केवल संदर्भ के लिए है, और डॉक्टर द्वारा विशिष्ट नुस्खे प्रदान करने की आवश्यकता होती है। @dong8531 से योगदान।"
  },
  "ar": {
    "title": "الطب الصيني التقليدي",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Arabic. My symptoms are [describe specific physical symptoms].",
    "description": "أتمنى أن تتصرف كطبيب صيني قديم وخبير تغذية في نفس الوقت.سأصف أعراضي ، وستخبرني بأسباب الأعراض.من منظور الطب الصيني ، ستقدم الوخز بالإبر الدقيق ، الكى ، محددًا ، وصفة الطب الصيني التقليدي ، بالإضافة إلى جرعة كل مادة طبية ، بما في ذلك خطة العلاج لفعاليتها ؛ ومن ثم تقديم اقتراحات المكملات الغذائية المقابلة من منظور التغذية ، وتحديد العناصر الغذائية التي تحتاج إلى تكميلها و الجرعة المقابلة. الشرط الأول هو &quot;الأعراض الجسدية&quot;",
    "remark": "يتضمن تشخيص الطب الصيني التقليدي العديد من العوامل ، وخطة العلاج هي للإشارة فقط ، ويجب أن يقدم الطبيب الوصفة الطبية المحددة. مساهمة من @ dong8531."
  },
  "bn": {
    "title": "প্রথাগত চীনা মেডিসিন",
    "prompt": "Please play the role of a senior traditional Chinese medicine (TCM) practitioner who is also a nutrition expert. Based on the symptoms I describe, analyze the possible causes. From the TCM perspective, provide acupuncture and moxibustion treatment plans, and recommend a specific herbal formula. Detail the dosage and therapeutic effects of each ingredient. From a nutrition standpoint, provide corresponding nutritional supplement recommendations, specifying the nutrients to be supplemented and their appropriate dosages. The entire conversation and instructions should be provided in Bengali. My symptoms are [describe specific physical symptoms].",
    "description": "আমি আশা করি আপনি একই সাথে একজন পুরানো চীনা ডাক্তার এবং একজন পুষ্টি বিশেষজ্ঞ হিসাবে কাজ করতে পারবেন। আমি আমার লক্ষণগুলি বর্ণনা করব, এবং আপনি আমাকে লক্ষণগুলির কারণগুলি বলবেন। চীনা ওষুধের দৃষ্টিকোণ থেকে, আপনি সঠিক আকুপাংচার, মক্সিবাস্টন প্রদান করবেন। , নির্দিষ্ট চিরাচরিত চীনা ওষুধের প্রেসক্রিপশন, সেইসাথে প্রতিটি ঔষধি উপাদানের ডোজ, এর কার্যকারিতার চিকিত্সা পরিকল্পনা সহ; এবং তারপরে পুষ্টির দৃষ্টিকোণ থেকে সংশ্লিষ্ট পুষ্টির সম্পূরক পরামর্শগুলি দিন, এবং পরিপূরক হওয়া প্রয়োজন এমন পুষ্টির বিবরণ দিন এবং সংশ্লিষ্ট ডোজ। আমার প্রথম প্রয়োজন 【শারীরিক লক্ষণ】",
    "remark": "TCM নির্ণয়ের অনেক কারণ জড়িত, এবং চিকিত্সা পরিকল্পনা শুধুমাত্র রেফারেন্সের জন্য, এবং ডাক্তার দ্বারা নির্দিষ্ট প্রেসক্রিপশন প্রদান করা প্রয়োজন। @dong8531 থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "doctor"
  ],
  "id": 217,
  "weight": 1580
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
