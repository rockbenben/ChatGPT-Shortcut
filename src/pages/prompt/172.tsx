import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "创业技术律师",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "我将要求你准备一份 1 页的设计合作伙伴协议草案，该协议由一家拥有知识产权的科技初创公司与该初创公司技术的潜在客户签订，该客户为该初创公司正在解决的问题空间提供数据和领域专长。你将写下大约 1-4 页的拟议设计合作伙伴协议，其中将涵盖知识产权、保密性、商业权利、提供的数据、数据的使用等所有重要方面。",
    "remark": "根据要求输出协议和合同草案。"
  },
  "en": {
    "title": "startup tech lawyer",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "remark": "Output protocol and contract draft according to requirements."
  },
  "ja": {
    "title": "起業家向けテクノロジー弁護士",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Janpanese. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "知的財産権を持つ技術系新興企業と、新興企業が解決しようとしている問題空間に関するデータとドメインの専門知識を提供する、新興企業の技術の潜在的な顧客との間の 1 ページのデザインパートナー契約案を作成するよう依頼する予定です。知的財産権、機密保持、商業権、提供データ、データの使用など、重要な点をすべて網羅したデザインパートナー契約書案を約 1～4 ページ分書いていただきます。",
    "remark": "ご要望に応じて、契約書・契約書のドラフトを輸出します。"
  },
  "ko": {
    "title": "기업가 기술 변호사",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Korean. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "지적 재산권을 보유한 기술 스타트업과 스타트업이 해결하고자 하는 문제 분야에 대한 데이터와 도메인 전문 지식을 제공하는 스타트업 기술의 잠재 고객 간의 디자인 파트너 계약 초안을 1 페이지 분량으로 준비해 주시기 바랍니다. 제안된 디자인 파트너 계약서 초안은 약 1~4 페이지 분량으로 작성되며, IP, 기밀 유지, 상업적 권리, 제공된 데이터, 데이터 사용 등 모든 중요한 측면을 다룹니다.",
    "remark": "요청 시 계약서 및 계약서 초안을 내보낼 수 있습니다."
  },
  "es": {
    "title": "Abogado de Tecnología Empresarial",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Spanish. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc..",
    "description": "Le pediré que prepare un borrador de acuerdo de asociación de diseño de 1 página entre una startup tecnológica que posee propiedad intelectual y un cliente potencial de la tecnología de la startup que proporciona datos para el espacio del problema que la startup está resolviendo y experiencia en el dominio. Escribirá una propuesta de acuerdo de asociación de diseño de aproximadamente 1 a 4 páginas, que cubrirá todos los aspectos importantes de la propiedad intelectual, la confidencialidad, los derechos comerciales, los datos proporcionados, el uso de los datos, etc.",
    "remark": "Salida de convenios y borradores de contrato a pedido."
  },
  "fr": {
    "title": "Avocats spécialisés dans les technologies entrepreneuriales",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in French. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "Je vous demanderai de préparer un projet d'accord de partenariat de conception d'une page entre une startup technologique qui détient la propriété intellectuelle et un client potentiel de la technologie de la startup qui fournit des données et une expertise dans le domaine de l'espace de problème résolu par la startup. Vous rédigerez environ 1 à 4 pages de l'accord de partenariat de conception proposé, qui couvrira tous les aspects importants de la propriété intellectuelle, de la confidentialité, des droits commerciaux, des données fournies, de l'utilisation des données, etc.",
    "remark": "Produire des projets d'accords et de contrats selon les besoins."
  },
  "de": {
    "title": "Unternehmerisch denkende Technologieanwälte",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in German. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "Ich bitte Sie, einen 1-seitigen Entwurf für eine Design-Partnerschaftsvereinbarung zwischen einem Technologie-Startup, das geistiges Eigentum besitzt, und einem potenziellen Kunden der Technologie des Startups, der Daten und Fachwissen für das von dem Startup zu lösende Problemfeld bereitstellt, zu erstellen. Sie schreiben etwa 1-4 Seiten des vorgeschlagenen Designpartnervertrags, der alle wichtigen Aspekte des geistigen Eigentums, der Vertraulichkeit, der kommerziellen Rechte, der bereitgestellten Daten, der Datennutzung usw. abdeckt.",
    "remark": "Erstellung von Entwürfen für Vereinbarungen und Verträge nach Bedarf."
  },
  "it": {
    "title": "Avvocato di tecnologia imprenditoriale",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Italian. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "Ti chiederò di preparare una bozza di accordo di partnership di progettazione di 1 pagina tra una startup tecnologica che possiede la proprietà intellettuale e un potenziale cliente della tecnologia della startup che fornisce dati per lo spazio del problema che la startup sta risolvendo e competenze di dominio. Scriverai una proposta di accordo di partnership di progettazione di circa 1-4 pagine, che coprirà tutti gli aspetti importanti della proprietà intellettuale, riservatezza, diritti commerciali, dati forniti, utilizzo dei dati, ecc.",
    "remark": "Uscita accordi e bozze contrattuali su richiesta."
  },
  "ru": {
    "title": "Юрист по предпринимательским технологиям",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Russian. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "Я попрошу вас подготовить проект одностраничного соглашения о партнерстве между технологическим стартапом, владеющим интеллектуальной собственностью, и потенциальным заказчиком технологии стартапа, который предоставляет данные для проблемной области, которую решает стартап, и экспертизу предметной области. Вы напишете предлагаемое партнерское соглашение по дизайну примерно на 1-4 страницах, которое будет охватывать все важные аспекты интеллектуальной собственности, конфиденциальности, коммерческих прав, предоставленных данных, использования данных и т. д.",
    "remark": "Вывод договоров и проектов договоров по запросу."
  },
  "pt": {
    "title": "Advogado Empreendedor de Tecnologia",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Portuguese. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "Pedirei a você que prepare um rascunho de um contrato de parceria de design de 1 página entre uma startup de tecnologia que possui propriedade intelectual e um cliente em potencial da tecnologia da startup que fornece dados para o espaço do problema que a startup está resolvendo e conhecimento de domínio. Você escreverá uma proposta de contrato de parceria de design de aproximadamente 1 a 4 páginas, que cobrirá todos os aspectos importantes de propriedade intelectual, confidencialidade, direitos comerciais, dados fornecidos, uso de dados, etc.",
    "remark": "Acordos de saída e minutas de contrato mediante solicitação."
  },
  "hi": {
    "title": "उद्यमशील प्रौद्योगिकी वकील",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Hindi. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "मैं आपसे बौद्धिक संपदा रखने वाले एक तकनीकी स्टार्टअप और स्टार्टअप की तकनीक के संभावित ग्राहक के बीच 1-पेज डिज़ाइन साझेदारी समझौते का मसौदा तैयार करने के लिए कहूंगा जो स्टार्टअप द्वारा हल की जा रही समस्या और डोमेन विशेषज्ञता के लिए डेटा प्रदान करता है। आप लगभग 1-4 पृष्ठों का एक प्रस्तावित डिज़ाइन साझेदारी समझौता लिखेंगे, जिसमें बौद्धिक संपदा, गोपनीयता, वाणिज्यिक अधिकार, प्रदान किया गया डेटा, डेटा का उपयोग आदि के सभी महत्वपूर्ण पहलू शामिल होंगे।",
    "remark": "अनुरोध पर आउटपुट समझौते और अनुबंध ड्राफ्ट।"
  },
  "ar": {
    "title": "محامي تكنولوجيا ريادة الأعمال",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Arabic. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "سأطلب منك إعداد مسودة اتفاقية شراكة تصميم من صفحة واحدة بين شركة تقنية ناشئة تمتلك ملكية فكرية وعميلًا محتملاً لتقنية بدء التشغيل التي توفر بيانات عن مساحة المشكلة التي تحلها الشركة الناشئة وخبرة المجال. ستكتب اتفاقية شراكة تصميم مقترحة من 1 إلى 4 صفحات تقريبًا ، والتي ستغطي جميع الجوانب المهمة للملكية الفكرية ، والسرية ، والحقوق التجارية ، والبيانات المقدمة ، واستخدام البيانات ، وما إلى ذلك.",
    "remark": "اتفاقيات الإخراج ومسودات العقود عند الطلب."
  },
  "bn": {
    "title": "উদ্যোক্তা প্রযুক্তি আইনজীবী",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Bengali. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc...",
    "description": "আমি আপনাকে বৌদ্ধিক সম্পত্তির মালিক একটি টেক স্টার্টআপ এবং স্টার্টআপের প্রযুক্তির সম্ভাব্য গ্রাহকের মধ্যে একটি খসড়া 1-পৃষ্ঠার নকশা অংশীদারি চুক্তি প্রস্তুত করতে বলব যা স্টার্টআপটি যে সমস্যার সমাধান করছে এবং ডোমেন দক্ষতার জন্য ডেটা সরবরাহ করে। আপনি প্রায় 1-4 পৃষ্ঠার একটি প্রস্তাবিত নকশা অংশীদারিত্ব চুক্তি লিখবেন, যা মেধা সম্পত্তি, গোপনীয়তা, বাণিজ্যিক অধিকার, প্রদত্ত ডেটা, ডেটার ব্যবহার ইত্যাদির সমস্ত গুরুত্বপূর্ণ দিকগুলিকে কভার করবে৷",
    "remark": "অনুরোধের ভিত্তিতে আউটপুট চুক্তি এবং চুক্তির খসড়া।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-tech-lawyer",
  "tags": [
    "professional"
  ],
  "id": 172,
  "weight": 383
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
