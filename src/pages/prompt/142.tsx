import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "商业企划",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [企划目标], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. Write the result in a markdown table. Respond in Chinese.",
    "description": "根据人们的愿望产生数字创业的想法。例如，当我说 [企划目标] 时，你要为数字创业公司生成一份商业计划书，其中包括创意名称、简短的单字、目标用户角色、需要解决的用户痛点、主要价值主张、销售和营销渠道、收入来源、成本结构、关键活动、关键资源、关键合作伙伴、创意验证步骤、预计第一年的运营成本，以及需要寻找的潜在商业挑战。把结果写在一个标记表中。",
    "remark": "围绕企划目标，以 markdown 表格方式撰写商业企划书。"
  },
  "en": {
    "title": "startup idea generator",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. Write the result in a markdown table.",
    "remark": "Write a business plan in markdown table format around the planning goals."
  },
  "ja": {
    "title": "ビジネスプランニング",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Janpanese. Write the result in a markdown table...",
    "description": "人々の欲求に基づいて、デジタル・スタートアップのアイデアを生成する。例えば、[ビジネスプランの目標] というと、デジタルスタートアップのビジネスプランを生成したいわけですが、その中には、アイデア名、短いワンフレーズ、ターゲットユーザーペルソナ、対処すべきユーザーのペインポイント、主要な価値提案、販売・マーケティングチャネル、収益源、コスト構造、主要活動、主要リソース、主要パートナー、アイデア検証ステップ、初年度運営コスト推定、必要事項が含まれておりは、潜在的なビジネス課題を探す。結果をマークアップした表に書き込む。",
    "remark": "プロジェクトの目的を中心に、マークダウン形式でビジネス企画書を書く。"
  },
  "ko": {
    "title": "비즈니스 계획",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Korean. Write the result in a markdown table...",
    "description": "사람들의 욕구를 기반으로 디지털 스타트업 아이디어를 생성하세요. 예를 들어, [사업 계획 목표] 라고 하면 아이디어 이름, 짧은 한 줄 요약, 대상 사용자 페르소나, 해결해야 할 사용자 고충, 핵심 가치 제안, 영업 및 마케팅 채널, 수익원, 비용 구조, 주요 활동, 핵심 리소스, 주요 파트너, 아이디어 검증 단계, 예상 첫해 운영 비용, 필요성을 포함하는 디지털 스타트업을 위한 사업 계획서를 작성하는 것이 좋습니다. 잠재적인 비즈니스 과제를 찾습니다. 결과를 마크업 테이블에 기록합니다.",
    "remark": "프로젝트의 목표를 중심으로 마크다운 형식으로 사업 제안서를 작성하세요."
  },
  "es": {
    "title": "plan de negocios",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Spanish. Write the result in a markdown table..",
    "description": "Generar ideas para startups digitales basadas en los deseos de las personas. Por ejemplo, cuando digo [objetivo comercial], está generando un plan de negocios para una startup digital que incluye un nombre creativo, una palabra corta, personas objetivo del usuario, puntos débiles del usuario para resolver, propuestas de valor clave, canales de ventas y marketing, fuentes de ingresos, estructura de costos, actividades clave, recursos clave, socios clave, pasos de validación de ideas, costos operativos estimados para el primer año y posibles desafíos comerciales a tener en cuenta. Escriba el resultado en una tabla de fichas.",
    "remark": "Alrededor de los objetivos de planificación, escriba un plan de negocios en forma de descuento."
  },
  "fr": {
    "title": "Planification des activités",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in French. Write the result in a markdown table...",
    "description": "Générer des idées pour les startups numériques en se basant sur ce que les gens veulent. Par exemple, lorsque je dis [objectif du plan d'affaires], vous voulez générer un plan d'affaires pour une startup numérique qui inclut le nom de l'idée, une courte phrase, des personas d'utilisateurs cibles, des points de douleur à résoudre, des propositions de valeur clés, des canaux de vente et de marketing, des flux de revenus, une structure de coûts, des activités clés, des ressources clés, des partenaires clés, des étapes de validation de l'idée, des coûts d'exploitation prévus pour la première année, et la nécessité de de rechercher des défis commerciaux potentiels. Rédigez les résultats dans une feuille d'annotation.",
    "remark": "Rédiger un plan d'affaires sous forme de tableau autour des objectifs du plan."
  },
  "de": {
    "title": "Unternehmensplanung",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in German. Write the result in a markdown table...",
    "description": "Generieren Sie Ideen für digitale Start-ups auf der Grundlage der Wünsche der Menschen. Wenn ich zum Beispiel sage [Ziel des Geschäftsplans], möchten Sie einen Geschäftsplan für ein digitales Startup erstellen, der den Namen der Idee, einen kurzen Einzeiler, die Zielnutzer-Personas, die zu lösenden Probleme der Nutzer, die wichtigsten Wertversprechen, die Vertriebs- und Marketingkanäle, die Einnahmequellen, die Kostenstruktur, die wichtigsten Aktivitäten, die wichtigsten Ressourcen, die wichtigsten Partner, die Schritte zur Validierung der Idee, die voraussichtlichen Kosten für das erste Betriebsjahr und die Notwendigkeit Suche nach potenziellen geschäftlichen Herausforderungen. Halten Sie die Ergebnisse in einem Markup Sheet fest.",
    "remark": "Schreiben Sie einen Geschäftsplan in Stichpunkten zu den Zielen des Plans."
  },
  "it": {
    "title": "piano aziendale",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Italian. Write the result in a markdown table...",
    "description": "Genera idee per startup digitali basate sui desideri delle persone. Ad esempio, quando dico [obiettivo aziendale], stai generando un piano aziendale per una startup digitale che include un nome creativo, una breve parola, personaggi utente target, punti deboli dell&#39;utente da risolvere, proposte di valore chiave, canali di vendita e marketing, fonti di reddito, struttura dei costi, attività chiave, risorse chiave, partner chiave, passaggi di convalida dell&#39;idea, costi operativi stimati per il primo anno e potenziali sfide aziendali da cercare. Scrivi il risultato in una tabella di token.",
    "remark": "Intorno agli obiettivi di pianificazione, scrivi un business plan sotto forma di markdown."
  },
  "ru": {
    "title": "бизнес-план",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Russian. Write the result in a markdown table...",
    "description": "Генерируйте идеи для цифровых стартапов на основе желаний людей. Например, когда я говорю [бизнес-цель], вы создаете бизнес-план для цифрового стартапа, который включает в себя креативное имя, короткое слово, целевые персонажи пользователей, болевые точки пользователей, которые необходимо решить, ключевые ценностные предложения, каналы продаж и маркетинга, источники дохода, структура затрат, ключевые виды деятельности, ключевые ресурсы, ключевые партнеры, этапы проверки идеи, предполагаемые операционные расходы в первый год и потенциальные бизнес-задачи, на которые следует обратить внимание. Запишите результат в таблицу токенов.",
    "remark": "Вокруг целей планирования напишите бизнес-план в уценочной форме."
  },
  "pt": {
    "title": "plano de negócios",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Portuguese. Write the result in a markdown table...",
    "description": "Gere ideias para startups digitais com base nos desejos das pessoas. Por exemplo, quando digo [objetivo de negócios], você está gerando um plano de negócios para uma startup digital que inclui um nome criativo, uma palavra curta, personas de usuário-alvo, pontos problemáticos do usuário para resolver, proposições de valor-chave, canais de vendas e marketing, fontes de receita, estrutura de custos, atividades-chave, recursos-chave, parceiros-chave, etapas de validação de ideias, custos operacionais estimados para o primeiro ano e possíveis desafios de negócios a serem observados. Escreva o resultado em uma tabela de tokens.",
    "remark": "Em torno das metas de planejamento, escreva um plano de negócios em forma de remarcação."
  },
  "hi": {
    "title": "व्यापार की योजना",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Hindi. Write the result in a markdown table...",
    "description": "लोगों की इच्छाओं के आधार पर डिजिटल स्टार्टअप के लिए विचार उत्पन्न करें। उदाहरण के लिए, जब मैं कहता हूं [व्यावसायिक उद्देश्य], तो आप एक डिजिटल स्टार्टअप के लिए एक व्यवसाय योजना तैयार कर रहे हैं जिसमें एक रचनात्मक नाम, एक छोटा शब्द, लक्षित उपयोगकर्ता व्यक्तित्व, हल करने के लिए उपयोगकर्ता के दर्द बिंदु, मुख्य मूल्य प्रस्ताव, बिक्री और विपणन चैनल शामिल हैं। राजस्व स्रोत, लागत संरचना, प्रमुख गतिविधियाँ, प्रमुख संसाधन, प्रमुख भागीदार, विचार सत्यापन चरण, अनुमानित प्रथम वर्ष परिचालन लागत, और संभावित व्यावसायिक चुनौतियाँ। परिणाम को एक टोकन तालिका में लिखें।",
    "remark": "नियोजन लक्ष्यों के इर्द-गिर्द, मार्कडाउन फॉर्म में एक व्यवसाय योजना लिखें।"
  },
  "ar": {
    "title": "خطة عمل",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Arabic. Write the result in a markdown table...",
    "description": "ابتكار أفكار للشركات الناشئة الرقمية بناءً على رغبات الناس. على سبيل المثال ، عندما أقول [هدف العمل] ، فأنت تقوم بإنشاء خطة عمل لبدء تشغيل رقمي يتضمن اسمًا إبداعيًا ، وكلمة قصيرة ، وشخصيات مستخدمين مستهدفة ، ونقاط ألم المستخدم لحلها ، وعروض القيمة الرئيسية ، وقنوات المبيعات والتسويق ، مصادر الإيرادات ، وهيكل التكلفة ، والأنشطة الرئيسية ، والموارد الرئيسية ، والشركاء الرئيسيون ، وخطوات التحقق من صحة الفكرة ، وتكاليف التشغيل المقدرة للسنة الأولى ، والتحديات التجارية المحتملة التي يجب البحث عنها. اكتب النتيجة في جدول الرموز.",
    "remark": "حول أهداف التخطيط ، اكتب خطة عمل في شكل تخفيض السعر."
  },
  "bn": {
    "title": "ব্যবসায়িক পরিকল্পনা",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Bengali. Write the result in a markdown table...",
    "description": "মানুষের ইচ্ছার উপর ভিত্তি করে ডিজিটাল স্টার্টআপের জন্য ধারণা তৈরি করুন। উদাহরণস্বরূপ, যখন আমি বলি [ব্যবসায়িক উদ্দেশ্য], আপনি একটি ডিজিটাল স্টার্টআপের জন্য একটি ব্যবসায়িক পরিকল্পনা তৈরি করছেন যাতে একটি সৃজনশীল নাম, একটি সংক্ষিপ্ত শব্দ, টার্গেট ব্যবহারকারী ব্যক্তিত্ব, ব্যবহারকারীর ব্যথার বিষয়গুলি, সমাধানের জন্য মূল মূল্য প্রস্তাব, বিক্রয় এবং বিপণন চ্যানেল, রাজস্ব উত্স, খরচ কাঠামো, মূল কার্যক্রম, মূল সংস্থান, মূল অংশীদার, ধারণা যাচাইকরণের পদক্ষেপ, আনুমানিক প্রথম বছরের অপারেটিং খরচ, এবং সম্ভাব্য ব্যবসায়িক চ্যালেঞ্জগুলি সন্ধান করতে হবে। একটি টোকেন টেবিলে ফলাফল লিখুন।",
    "remark": "পরিকল্পনার লক্ষ্যগুলি ঘিরে, মার্কডাউন আকারে একটি ব্যবসায়িক পরিকল্পনা লিখুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-idea-generator",
  "tags": [
    "company"
  ],
  "id": 142,
  "weight": 1365
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
