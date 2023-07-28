import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Janpanese. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "知的財産権を持つ技術系新興企業と、新興企業が解決しようとしている問題空間に関するデータとドメインの専門知識を提供する、新興企業の技術の潜在的な顧客との間の 1 ページのデザインパートナー契約案を作成するよう依頼する予定です。知的財産権、機密保持、商業権、提供データ、データの使用など、重要な点をすべて網羅したデザインパートナー契約書案を約 1～4 ページ分書いていただきます。",
    "remark": "ご要望に応じて、契約書・契約書のドラフトを輸出します。"
  },
  "ko": {
    "title": "기업가 기술 변호사",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Korean. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "지적 재산권을 보유한 기술 스타트업과 스타트업이 해결하고자 하는 문제 분야에 대한 데이터와 도메인 전문 지식을 제공하는 스타트업 기술의 잠재 고객 간의 디자인 파트너 계약 초안을 1 페이지 분량으로 준비해 주시기 바랍니다. 제안된 디자인 파트너 계약서 초안은 약 1~4 페이지 분량으로 작성되며, IP, 기밀 유지, 상업적 권리, 제공된 데이터, 데이터 사용 등 모든 중요한 측면을 다룹니다.",
    "remark": "요청 시 계약서 및 계약서 초안을 내보낼 수 있습니다."
  },
  "es": {
    "title": "Abogados emprendedores especializados en tecnología",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Spanish. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "Le pediré que prepare un borrador de 1 página de un acuerdo de asociación de diseño entre una startup tecnológica que posee propiedad intelectual y un cliente potencial de la tecnología de la startup que proporciona datos y experiencia de dominio al espacio del problema que está resolviendo la startup. Deberá redactar aproximadamente de 1 a 4 páginas del acuerdo de asociación de diseño propuesto, que cubrirá todos los aspectos importantes de la propiedad intelectual, la confidencialidad, los derechos comerciales, los datos proporcionados, el uso de los datos, etc.",
    "remark": "Redactar borradores de acuerdos y contratos según sea necesario."
  },
  "fr": {
    "title": "Avocats spécialisés dans les technologies entrepreneuriales",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in French. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "Je vous demanderai de préparer un projet d'accord de partenariat de conception d'une page entre une startup technologique qui détient la propriété intellectuelle et un client potentiel de la technologie de la startup qui fournit des données et une expertise dans le domaine de l'espace de problème résolu par la startup. Vous rédigerez environ 1 à 4 pages de l'accord de partenariat de conception proposé, qui couvrira tous les aspects importants de la propriété intellectuelle, de la confidentialité, des droits commerciaux, des données fournies, de l'utilisation des données, etc.",
    "remark": "Produire des projets d'accords et de contrats selon les besoins."
  },
  "de": {
    "title": "Unternehmerisch denkende Technologieanwälte",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in German. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "Ich bitte Sie, einen 1-seitigen Entwurf für eine Design-Partnerschaftsvereinbarung zwischen einem Technologie-Startup, das geistiges Eigentum besitzt, und einem potenziellen Kunden der Technologie des Startups, der Daten und Fachwissen für das von dem Startup zu lösende Problemfeld bereitstellt, zu erstellen. Sie schreiben etwa 1-4 Seiten des vorgeschlagenen Designpartnervertrags, der alle wichtigen Aspekte des geistigen Eigentums, der Vertraulichkeit, der kommerziellen Rechte, der bereitgestellten Daten, der Datennutzung usw. abdeckt.",
    "remark": "Erstellung von Entwürfen für Vereinbarungen und Verträge nach Bedarf."
  },
  "it": {
    "title": "Avvocati tecnologici imprenditoriali",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Italian. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "Vi chiederò di preparare una bozza di accordo di partnership di progettazione di una pagina tra una startup tecnologica che detiene la proprietà intellettuale e un potenziale cliente della tecnologia della startup che fornisce dati e competenze di dominio per lo spazio problematico risolto dalla startup. Dovrete scrivere circa 1-4 pagine dell'accordo di partnership di progettazione proposto, che coprirà tutti gli aspetti importanti della proprietà intellettuale, della riservatezza, dei diritti commerciali, dei dati forniti, dell'uso dei dati, ecc.",
    "remark": "Realizzare bozze di accordi e contratti come richiesto."
  },
  "ru": {
    "title": "Юристы по предпринимательским технологиям",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Russian. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "Я попрошу Вас подготовить 1-страничный проект соглашения о партнерстве между технологическим стартапом, владеющим интеллектуальной собственностью, и потенциальным заказчиком технологии стартапа, предоставляющим данные и экспертизу в области проблемного пространства, решаемого стартапом. Вам предстоит написать примерно 1-4 страницы предлагаемого партнерского соглашения, в котором будут отражены все важные аспекты интеллектуальной собственности, конфиденциальности, коммерческих прав, предоставляемых данных, их использования и т.д.",
    "remark": "Вывод проектов договоров и соглашений по мере необходимости."
  },
  "pt": {
    "title": "Advogados especializados em tecnologia empresarial",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Portuguese. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "Vou pedir-lhe que prepare um projeto de acordo de parceria de conceção de 1 página entre uma empresa de tecnologia em fase de arranque que detém propriedade intelectual e um potencial cliente da tecnologia da empresa em fase de arranque que fornece dados e conhecimentos especializados no domínio do problema a resolver pela empresa em fase de arranque. Deverá redigir aproximadamente 1 a 4 páginas do acordo de parceria de conceção proposto, que abrangerá todos os aspectos importantes da propriedade intelectual, confidencialidade, direitos comerciais, dados fornecidos, utilização de dados, etc.",
    "remark": "Elaborar projectos de acordos e contratos conforme necessário."
  },
  "hi": {
    "title": "उद्यमशील प्रौद्योगिकी वकील",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Hindi. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "मैं आपसे बौद्धिक संपदा रखने वाले एक तकनीकी स्टार्टअप और स्टार्टअप की तकनीक के संभावित ग्राहक के बीच 1-पेज डिज़ाइन साझेदारी समझौते का मसौदा तैयार करने के लिए कहूंगा जो स्टार्टअप द्वारा हल की जा रही समस्या और डोमेन विशेषज्ञता के लिए डेटा प्रदान करता है। आप लगभग 1-4 पृष्ठों का एक प्रस्तावित डिज़ाइन साझेदारी समझौता लिखेंगे, जिसमें बौद्धिक संपदा, गोपनीयता, वाणिज्यिक अधिकार, प्रदान किया गया डेटा, डेटा का उपयोग आदि के सभी महत्वपूर्ण पहलू शामिल होंगे।",
    "remark": "अनुरोध पर आउटपुट समझौते और अनुबंध ड्राफ्ट।"
  },
  "ar": {
    "title": "محامي تكنولوجيا ريادة الأعمال",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Arabic. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "سأطلب منك إعداد مسودة اتفاقية شراكة تصميم من صفحة واحدة بين شركة تقنية ناشئة تمتلك ملكية فكرية وعميلًا محتملاً لتقنية بدء التشغيل التي توفر بيانات عن مساحة المشكلة التي تحلها الشركة الناشئة وخبرة المجال. ستكتب اتفاقية شراكة تصميم مقترحة من 1 إلى 4 صفحات تقريبًا ، والتي ستغطي جميع الجوانب المهمة للملكية الفكرية ، والسرية ، والحقوق التجارية ، والبيانات المقدمة ، واستخدام البيانات ، وما إلى ذلك.",
    "remark": "اتفاقيات الإخراج ومسودات العقود عند الطلب."
  },
  "bn": {
    "title": "উদ্যোক্তা প্রযুক্তি আইনজীবী",
    "prompt": "I will ask of you to prepare a 1 page draft of a design partner agreement between a tech startup with IP and a potential client of that startup's technology that provides data and domain expertise to the problem space the startup is solving. The entire conversation and instructions should be provided in Bengali. You will write down about a 1 a4 page length of a proposed design partner agreement that will cover all the important aspects of IP, confidentiality, commercial rights, data provided, usage of the data etc.",
    "description": "আমি আপনাকে বৌদ্ধিক সম্পত্তির মালিক একটি টেক স্টার্টআপ এবং স্টার্টআপের প্রযুক্তির সম্ভাব্য গ্রাহকের মধ্যে একটি খসড়া 1-পৃষ্ঠার নকশা অংশীদারি চুক্তি প্রস্তুত করতে বলব যা স্টার্টআপটি যে সমস্যার সমাধান করছে এবং ডোমেন দক্ষতার জন্য ডেটা সরবরাহ করে। আপনি প্রায় 1-4 পৃষ্ঠার একটি প্রস্তাবিত নকশা অংশীদারিত্ব চুক্তি লিখবেন, যা মেধা সম্পত্তি, গোপনীয়তা, বাণিজ্যিক অধিকার, প্রদত্ত ডেটা, ডেটার ব্যবহার ইত্যাদির সমস্ত গুরুত্বপূর্ণ দিকগুলিকে কভার করবে৷",
    "remark": "অনুরোধের ভিত্তিতে আউটপুট চুক্তি এবং চুক্তির খসড়া।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-tech-lawyer",
  "tags": [
    "professional"
  ],
  "id": 172,
  "weight": 412
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
