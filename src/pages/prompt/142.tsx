import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

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
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Janpanese. Write the result in a markdown table.",
    "description": "人々の欲求に基づいて、デジタル・スタートアップのアイデアを生成する。例えば、[ビジネスプランの目標] というと、デジタルスタートアップのビジネスプランを生成したいわけですが、その中には、アイデア名、短いワンフレーズ、ターゲットユーザーペルソナ、対処すべきユーザーのペインポイント、主要な価値提案、販売・マーケティングチャネル、収益源、コスト構造、主要活動、主要リソース、主要パートナー、アイデア検証ステップ、初年度運営コスト推定、必要事項が含まれておりは、潜在的なビジネス課題を探す。結果をマークアップした表に書き込む。",
    "remark": "プロジェクトの目的を中心に、マークダウン形式でビジネス企画書を書く。"
  },
  "ko": {
    "title": "비즈니스 계획",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Korean. Write the result in a markdown table.",
    "description": "사람들의 욕구를 기반으로 디지털 스타트업 아이디어를 생성하세요. 예를 들어, [사업 계획 목표] 라고 하면 아이디어 이름, 짧은 한 줄 요약, 대상 사용자 페르소나, 해결해야 할 사용자 고충, 핵심 가치 제안, 영업 및 마케팅 채널, 수익원, 비용 구조, 주요 활동, 핵심 리소스, 주요 파트너, 아이디어 검증 단계, 예상 첫해 운영 비용, 필요성을 포함하는 디지털 스타트업을 위한 사업 계획서를 작성하는 것이 좋습니다. 잠재적인 비즈니스 과제를 찾습니다. 결과를 마크업 테이블에 기록합니다.",
    "remark": "프로젝트의 목표를 중심으로 마크다운 형식으로 사업 제안서를 작성하세요."
  },
  "es": {
    "title": "Planificación empresarial",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Spanish. Write the result in a markdown table.",
    "description": "Generar ideas para startups digitales basadas en lo que la gente quiere. Por ejemplo, cuando digo [objetivo del plan de negocio], lo que quieres es generar un plan de negocio para una startup digital que incluya el nombre de la idea, un breve esbozo, los usuarios objetivo, los puntos de dolor de los usuarios que hay que resolver, las propuestas de valor clave, los canales de ventas y marketing, las fuentes de ingresos, la estructura de costes, las actividades clave, los recursos clave, los socios clave, los pasos de validación de la idea, los costes previstos para el primer año de funcionamiento y la necesidad de buscar posibles retos empresariales. Escriba los resultados en una hoja de marcado.",
    "remark": "Redacte un plan de empresa en formato markdown en torno a los objetivos del plan."
  },
  "fr": {
    "title": "Planification des activités",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in French. Write the result in a markdown table.",
    "description": "Générer des idées pour les startups numériques en se basant sur ce que les gens veulent. Par exemple, lorsque je dis [objectif du plan d'affaires], vous voulez générer un plan d'affaires pour une startup numérique qui inclut le nom de l'idée, une courte phrase, des personas d'utilisateurs cibles, des points de douleur à résoudre, des propositions de valeur clés, des canaux de vente et de marketing, des flux de revenus, une structure de coûts, des activités clés, des ressources clés, des partenaires clés, des étapes de validation de l'idée, des coûts d'exploitation prévus pour la première année, et la nécessité de de rechercher des défis commerciaux potentiels. Rédigez les résultats dans une feuille d'annotation.",
    "remark": "Rédiger un plan d'affaires sous forme de tableau autour des objectifs du plan."
  },
  "de": {
    "title": "Unternehmensplanung",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in German. Write the result in a markdown table.",
    "description": "Generieren Sie Ideen für digitale Start-ups auf der Grundlage der Wünsche der Menschen. Wenn ich zum Beispiel sage [Ziel des Geschäftsplans], möchten Sie einen Geschäftsplan für ein digitales Startup erstellen, der den Namen der Idee, einen kurzen Einzeiler, die Zielnutzer-Personas, die zu lösenden Probleme der Nutzer, die wichtigsten Wertversprechen, die Vertriebs- und Marketingkanäle, die Einnahmequellen, die Kostenstruktur, die wichtigsten Aktivitäten, die wichtigsten Ressourcen, die wichtigsten Partner, die Schritte zur Validierung der Idee, die voraussichtlichen Kosten für das erste Betriebsjahr und die Notwendigkeit Suche nach potenziellen geschäftlichen Herausforderungen. Halten Sie die Ergebnisse in einem Markup Sheet fest.",
    "remark": "Schreiben Sie einen Geschäftsplan in Stichpunkten zu den Zielen des Plans."
  },
  "it": {
    "title": "Pianificazione aziendale",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Italian. Write the result in a markdown table.",
    "description": "Generare idee per startup digitali basate su ciò che le persone vogliono. Per esempio, quando dico [obiettivo del business plan], volete generare un business plan per una startup digitale che includa il nome dell'idea, un breve one-liner, le personas degli utenti target, i punti dolenti degli utenti da risolvere, le proposte di valore chiave, i canali di vendita e di marketing, i flussi di entrate, la struttura dei costi, le attività chiave, le risorse chiave, i partner chiave, le fasi di convalida dell'idea, i costi previsti per il primo anno di attività e la necessità di di cercare potenziali sfide di business. Scrivete i risultati in un foglio di markup.",
    "remark": "Scrivere un business plan in forma di markdown intorno agli obiettivi del piano."
  },
  "ru": {
    "title": "Бизнес-планирование",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Russian. Write the result in a markdown table.",
    "description": "Генерируйте идеи для цифровых стартапов на основе того, что нужно людям. Например, когда я говорю [цель бизнес-плана], вы хотите составить бизнес-план цифрового стартапа, включающий название идеи, короткую односложную фразу, персоны целевых пользователей, решаемые болевые точки пользователей, ключевые ценностные предложения, каналы продаж и маркетинга, потоки доходов, структуру затрат, ключевые виды деятельности, ключевые ресурсы, ключевых партнеров, этапы проверки идеи, прогнозируемые затраты на первый год работы, а также необходимость поиск потенциальных бизнес-задач. Запишите результаты в лист разметки.",
    "remark": "Напишите бизнес-план в формате markdown вокруг целей плана."
  },
  "pt": {
    "title": "Planeamento empresarial",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Portuguese. Write the result in a markdown table.",
    "description": "Gerar ideias para empresas digitais com base no que as pessoas querem. Por exemplo, quando digo [objetivo do plano de negócios], pretende gerar um plano de negócios para uma empresa digital em fase de arranque que inclua o nome da ideia, uma breve frase, as personas dos utilizadores-alvo, os pontos problemáticos dos utilizadores a resolver, as principais propostas de valor, os canais de vendas e marketing, os fluxos de receitas, a estrutura de custos, as principais actividades, os principais recursos, os principais parceiros, as etapas de validação da ideia, os custos previstos para o primeiro ano de funcionamento e a necessidade de procurar potenciais desafios comerciais. Escreva os resultados numa folha de marcação.",
    "remark": "Redigir um plano de negócios em formato markdown em torno dos objectivos do plano."
  },
  "hi": {
    "title": "व्यापार की योजना",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Hindi. Write the result in a markdown table.",
    "description": "लोगों की इच्छाओं के आधार पर डिजिटल स्टार्टअप के लिए विचार उत्पन्न करें। उदाहरण के लिए, जब मैं कहता हूं [व्यावसायिक उद्देश्य], तो आप एक डिजिटल स्टार्टअप के लिए एक व्यवसाय योजना तैयार कर रहे हैं जिसमें एक रचनात्मक नाम, एक छोटा शब्द, लक्षित उपयोगकर्ता व्यक्तित्व, हल करने के लिए उपयोगकर्ता के दर्द बिंदु, मुख्य मूल्य प्रस्ताव, बिक्री और विपणन चैनल शामिल हैं। राजस्व स्रोत, लागत संरचना, प्रमुख गतिविधियाँ, प्रमुख संसाधन, प्रमुख भागीदार, विचार सत्यापन चरण, अनुमानित प्रथम वर्ष परिचालन लागत, और संभावित व्यावसायिक चुनौतियाँ। परिणाम को एक टोकन तालिका में लिखें।",
    "remark": "नियोजन लक्ष्यों के इर्द-गिर्द, मार्कडाउन फॉर्म में एक व्यवसाय योजना लिखें।"
  },
  "ar": {
    "title": "خطة عمل",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Arabic. Write the result in a markdown table.",
    "description": "ابتكار أفكار للشركات الناشئة الرقمية بناءً على رغبات الناس. على سبيل المثال ، عندما أقول [هدف العمل] ، فأنت تقوم بإنشاء خطة عمل لبدء تشغيل رقمي يتضمن اسمًا إبداعيًا ، وكلمة قصيرة ، وشخصيات مستخدمين مستهدفة ، ونقاط ألم المستخدم لحلها ، وعروض القيمة الرئيسية ، وقنوات المبيعات والتسويق ، مصادر الإيرادات ، وهيكل التكلفة ، والأنشطة الرئيسية ، والموارد الرئيسية ، والشركاء الرئيسيون ، وخطوات التحقق من صحة الفكرة ، وتكاليف التشغيل المقدرة للسنة الأولى ، والتحديات التجارية المحتملة التي يجب البحث عنها. اكتب النتيجة في جدول الرموز.",
    "remark": "حول أهداف التخطيط ، اكتب خطة عمل في شكل تخفيض السعر."
  },
  "bn": {
    "title": "ব্যবসায়িক পরিকল্পনা",
    "prompt": "Generate digital startup ideas based on the wish of the people. For example, when I say [a target], you generate a business plan for the digital startup complete with idea name, a short one liner, target user persona, user's pain points to solve, main value propositions, sales & marketing channels, revenue stream sources, cost structures, key activities, key resources, key partners, idea validation steps, estimated 1st year cost of operation, and potential business challenges to look for. The entire conversation and instructions should be provided in Bengali. Write the result in a markdown table.",
    "description": "মানুষের ইচ্ছার উপর ভিত্তি করে ডিজিটাল স্টার্টআপের জন্য ধারণা তৈরি করুন। উদাহরণস্বরূপ, যখন আমি বলি [ব্যবসায়িক উদ্দেশ্য], আপনি একটি ডিজিটাল স্টার্টআপের জন্য একটি ব্যবসায়িক পরিকল্পনা তৈরি করছেন যাতে একটি সৃজনশীল নাম, একটি সংক্ষিপ্ত শব্দ, টার্গেট ব্যবহারকারী ব্যক্তিত্ব, ব্যবহারকারীর ব্যথার বিষয়গুলি, সমাধানের জন্য মূল মূল্য প্রস্তাব, বিক্রয় এবং বিপণন চ্যানেল, রাজস্ব উত্স, খরচ কাঠামো, মূল কার্যক্রম, মূল সংস্থান, মূল অংশীদার, ধারণা যাচাইকরণের পদক্ষেপ, আনুমানিক প্রথম বছরের অপারেটিং খরচ, এবং সম্ভাব্য ব্যবসায়িক চ্যালেঞ্জগুলি সন্ধান করতে হবে। একটি টোকেন টেবিলে ফলাফল লিখুন।",
    "remark": "পরিকল্পনার লক্ষ্যগুলি ঘিরে, মার্কডাউন আকারে একটি ব্যবসায়িক পরিকল্পনা লিখুন।"
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-idea-generator",
  "tags": [
    "company"
  ],
  "id": 142,
  "weight": 1449
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
