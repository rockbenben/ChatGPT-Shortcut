import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "投资经理",
    "prompt": "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Respond in Chinese. Starting query - [金融问题]",
    "description": "寻求具有金融市场专业知识的员工的指导，结合通货膨胀率或回报率估计等因素，并在很长一段时间内跟踪股票价格，最终帮助客户了解行业，然后建议最安全的选择，他/她可以根据自己的要求和兴趣分配资金。",
    "remark": "Investment Manager"
  },
  "en": {
    "title": "Investment Manager",
    "prompt": "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "remark": "Investment Manager"
  },
  "ja": {
    "title": "投資顧問会社",
    "prompt": "The entire conversation and instructions should be provided in Japanese. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "金融市場に精通したスタッフに指導を仰ぎ、インフレやリターン予測などの要素を組み合わせ、長期にわたって株価を追跡することで、最終的にはお客様がセクターを理解した上で、お客様の要望や関心に応じて資金を配分できる最も安全な選択肢を提案することができます。",
    "remark": "投資顧問会社"
  },
  "ko": {
    "title": "투자 관리자",
    "prompt": "The entire conversation and instructions should be provided in Korean. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "금융 시장에 대한 전문 지식을 갖춘 직원에게 조언을 구하고, 인플레이션이나 수익률 예상치와 같은 요소를 결합하고, 장기간 주가를 추적하면 궁극적으로 고객이 해당 부문을 이해하는 데 도움이 되고, 고객의 요구 사항과 관심사에 따라 자금을 배분할 수 있는 가장 안전한 옵션을 제안할 수 있습니다.",
    "remark": "투자 관리자"
  },
  "es": {
    "title": "gestor de inversiones",
    "prompt": "The entire conversation and instructions should be provided in Spanish. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "Pedir asesoramiento a empleados expertos en mercados financieros, combinar factores como la inflación o las estimaciones de rentabilidad y hacer un seguimiento de las cotizaciones bursátiles durante un largo periodo de tiempo ayuda en última instancia al cliente a comprender el sector y, a continuación, le sugiere la opción más segura, en la que puede asignar los fondos según sus necesidades e intereses.",
    "remark": "Gestor de inversiones"
  },
  "fr": {
    "title": "gestionnaire d'investissement",
    "prompt": "The entire conversation and instructions should be provided in French. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "En demandant conseil à des employés spécialisés dans les marchés financiers, en combinant des facteurs tels que l'inflation ou les estimations de rendement et en suivant les cours des actions sur une longue période, le client est finalement mieux à même de comprendre le secteur et de proposer l'option la plus sûre, où il peut allouer les fonds en fonction de ses besoins et de ses intérêts.",
    "remark": "Gestionnaire d'investissement"
  },
  "de": {
    "title": "Investmentmanager",
    "prompt": "The entire conversation and instructions should be provided in German. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "Die Beratung durch Mitarbeiter mit Fachwissen über die Finanzmärkte, die Kombination von Faktoren wie Inflation oder Renditeschätzungen und die Beobachtung von Aktienkursen über einen langen Zeitraum hinweg helfen dem Kunden letztlich, die Branche zu verstehen, und schlagen ihm dann die sicherste Option vor, bei der er die Mittel entsprechend seinen Anforderungen und Interessen einsetzen kann.",
    "remark": "Investment Manager"
  },
  "it": {
    "title": "gestore degli investimenti",
    "prompt": "The entire conversation and instructions should be provided in Italian. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "Rivolgersi a collaboratori esperti di mercati finanziari, combinare fattori come l'inflazione o le stime di rendimento e seguire i prezzi delle azioni per un lungo periodo di tempo aiuta il cliente a comprendere il settore e a suggerire l'opzione più sicura, dove allocare i fondi in base alle proprie esigenze e ai propri interessi.",
    "remark": "Gestore degli investimenti"
  },
  "ru": {
    "title": "инвестиционный менеджер",
    "prompt": "The entire conversation and instructions should be provided in Russian. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "Обращение к сотрудникам, обладающим опытом работы на финансовых рынках, сочетание таких факторов, как инфляция или оценка доходности, а также отслеживание цен на акции в течение длительного периода времени в конечном итоге помогают клиенту разобраться в отрасли и затем предлагают наиболее безопасный вариант, в котором он может распределить средства в соответствии со своими требованиями и интересами.",
    "remark": "Инвестиционный менеджер"
  },
  "pt": {
    "title": "gestor de investimentos",
    "prompt": "The entire conversation and instructions should be provided in Portuguese. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "Procurar a orientação de colaboradores com experiência nos mercados financeiros, combinando factores como a inflação ou estimativas de rendimento e acompanhando os preços das acções durante um longo período de tempo, acaba por ajudar o cliente a compreender o sector e, em seguida, sugere a opção mais segura, onde pode afetar os fundos de acordo com as suas necessidades e interesses.",
    "remark": "Gestor de investimentos"
  },
  "hi": {
    "title": "निवेश प्रबंधक",
    "prompt": "The entire conversation and instructions should be provided in Hindi. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "वित्तीय बाजारों में विशेषज्ञता वाले कर्मचारी का मार्गदर्शन लेना, मुद्रास्फीति या रिटर्न अनुमान जैसे कारकों को शामिल करना और लंबी अवधि में स्टॉक की कीमतों पर नज़र रखना अंततः ग्राहक को उद्योग को समझने में मदद करता है और फिर सबसे सुरक्षित दांव का सुझाव देता है जिससे वह धन आवंटित कर सके। आपकी आवश्यकताओं और रुचियों के अनुसार।",
    "remark": "निवेश प्रबंधक"
  },
  "ar": {
    "title": "مدير الاستثمار",
    "prompt": "The entire conversation and instructions should be provided in Arabic. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "إن السعي للحصول على إرشادات من موظف ذي خبرة في الأسواق المالية ، ودمج عوامل مثل التضخم أو تقديرات العائد ، وتتبع أسعار الأسهم على مدى فترة طويلة من الوقت يساعد العميل في النهاية على فهم الصناعة ثم اقتراح أكثر الرهانات أمانًا يمكنه / يمكنها تخصيص الأموال وفقًا لمتطلباتك واهتماماتك.",
    "remark": "مدير الاستثمار"
  },
  "bn": {
    "title": "বিনিয়োগ পরিচালক",
    "prompt": "The entire conversation and instructions should be provided in Bengali. Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - ",
    "description": "আর্থিক বাজারে দক্ষতার সাথে একজন কর্মচারীর নির্দেশনা চাওয়া, মুদ্রাস্ফীতি বা রিটার্ন অনুমানের মতো কারণগুলিকে অন্তর্ভুক্ত করা এবং দীর্ঘ সময়ের জন্য স্টকের দামগুলি ট্র্যাক করা শেষ পর্যন্ত ক্লায়েন্টকে শিল্পটি বুঝতে সাহায্য করে এবং তারপরে সে/তিনি তহবিল বরাদ্দ করতে পারে এমন নিরাপদ বাজির পরামর্শ দেয় আপনার প্রয়োজনীয়তা এবং আগ্রহ অনুযায়ী।",
    "remark": "বিনিয়োগ পরিচালক"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-an-investment-manager",
  "tags": [
    "finance"
  ],
  "id": 159,
  "weight": 2183
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
