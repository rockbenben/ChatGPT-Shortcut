import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "核心知识点",
    "prompt": "In order to learn [主题] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter. Respond in Chinese.",
    "description": "为了高效学习 [python 编程]，请提供该领域的核心知识点，涵盖重要性排名前 20% 的内容。这些关键知识将为我提供对该领域 80% 内容的全面理解和扎实基础。",
    "remark": "学习某一学科前，先了解它的核心知识点。来自 @ScenerorSun 的投稿。"
  },
  "en": {
    "title": "Knowledge Points",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "remark": "Before diving into a particular subject, it is important to grasp its core knowledge points. Contributed by @ScenerorSun."
  },
  "ja": {
    "title": "コアナレッジポイント",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Janpanese. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "python プログラミング】を効率的に学ぶために、重要度上位 20％をカバーする、その分野のコアとなる知識を教えてください。この重要な知識があれば、その分野の内容の 80％を包括的に理解し、確かな基礎とすることができます。",
    "remark": "学ぶ前にその科目の核となる知識を理解する。ScenerorSun さん（@ScenerorSun）からの寄稿です。"
  },
  "ko": {
    "title": "핵심 지식 포인트",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Korean. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "파이썬 프로그래밍] 을 효율적으로 배우기 위해서는 해당 분야의 중요도 상위 20% 에 해당하는 핵심 지식을 제공해 주세요. 이 핵심 지식은 해당 분야 콘텐츠의 80% 에 대한 포괄적인 이해와 탄탄한 기초를 제공할 것입니다.",
    "remark": "한 과목을 배우기 전에 그 과목의 핵심 지식을 이해하세요. ScenerorSun 의 기고글입니다."
  },
  "es": {
    "title": "Puntos básicos de conocimiento",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Spanish. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "Con el fin de aprender [programación python] de manera eficiente, por favor proporcione los puntos clave de conocimiento del campo, cubriendo el 20% del contenido en términos de importancia. Estos conocimientos clave me proporcionarán una comprensión profunda y una base sólida del 80% del contenido del campo.",
    "remark": "Antes de estudiar una asignatura, comprende sus conocimientos básicos. Contribución de @ScenerorSun."
  },
  "fr": {
    "title": "Points de connaissance de base",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in French. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "Afin d'apprendre efficacement la [programmation en python], veuillez fournir les connaissances de base du domaine, en couvrant les 20% les plus importants du contenu en termes d'importance. Ces connaissances clés me permettront d'acquérir une compréhension approfondie et une base solide de 80 % du contenu du domaine.",
    "remark": "Avant d'étudier un sujet, comprenez ses connaissances de base. Contribution de @ScenerorSun."
  },
  "de": {
    "title": "Zentrale Wissenspunkte",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in German. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "Um [Python-Programmierung] effizient zu erlernen, stellen Sie bitte die wichtigsten Wissenspunkte des Fachgebiets zur Verfügung, die die wichtigsten 20% des Inhalts in Bezug auf die Wichtigkeit abdecken. Dieses Schlüsselwissen wird mir ein gründliches Verständnis und eine solide Grundlage für 80 % der Inhalte in diesem Bereich vermitteln.",
    "remark": "Bevor man ein Fach studiert, sollte man sein Kernwissen verstehen. Beitrag von @ScenerorSun."
  },
  "it": {
    "title": "Punti di conoscenza fondamentali",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Italian. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "Al fine di imparare [programmazione python] in modo efficiente, si prega di fornire le conoscenze fondamentali del campo, coprendo il 20% dei contenuti in termini di importanza. Queste conoscenze chiave mi forniranno una comprensione approfondita e solide basi dell'80% dei contenuti del campo.",
    "remark": "Prima di studiare una materia, comprendi le sue conoscenze fondamentali. Contributo di @ScenerorSun."
  },
  "ru": {
    "title": "Основные пункты знаний",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Russian. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "Для эффективного изучения [программирования на языке python], пожалуйста, предоставьте основные знания в этой области, охватывающие 20% содержания по степени важности. Эти ключевые знания обеспечат мне глубокое понимание и прочную основу 80% содержания данной области.",
    "remark": "Прежде чем изучать предмет, поймите его суть. Материал предоставлен @ScenerorSun."
  },
  "pt": {
    "title": "Pontos de conhecimento básico",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Portuguese. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "Para aprender [programação em python] de forma eficiente, indique os conhecimentos fundamentais da área, cobrindo os 20% mais importantes em termos de importância. Estes conhecimentos essenciais proporcionar-me-ão uma compreensão profunda e uma base sólida de 80% do conteúdo da área.",
    "remark": "Antes de estudares uma matéria, compreende os seus conhecimentos fundamentais. Contribuição de @ScenerorSun."
  },
  "hi": {
    "title": "मूल ज्ञान बिंदु",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Hindi. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "[पायथन प्रोग्रामिंग] को कुशलतापूर्वक सीखने के लिए, कृपया इस क्षेत्र में मुख्य ज्ञान बिंदु प्रदान करें, जिसमें शीर्ष 20% महत्वपूर्ण सामग्री शामिल हो। ये प्रमुख ज्ञान मुझे 80% क्षेत्र की व्यापक समझ और ठोस आधार प्रदान करेगा।",
    "remark": "किसी भी विषय को सीखने से पहले उसके मूल ज्ञान बिंदुओं को समझें। @ScenororSun से योगदान।"
  },
  "ar": {
    "title": "نقاط المعرفة الأساسية",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Arabic. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "من أجل تعلم [برمجة Python] بكفاءة ، يرجى تقديم نقاط المعرفة الأساسية في هذا المجال ، والتي تغطي أعلى 20٪ من المحتوى المهم. ستزودني هذه المعرفة الأساسية بفهم شامل وأساس متين لـ 80٪ من المجال.",
    "remark": "قبل تعلم موضوع ما ، افهم أولاً نقاط المعرفة الأساسية الخاصة به. مساهمة منScenerorSun."
  },
  "bn": {
    "title": "মূল জ্ঞান পয়েন্ট",
    "prompt": "In order to learn [subject] efficiently, please provide the core knowledge points of this field, covering the top 20% of importance. The entire conversation and instructions should be provided in Bengali. These key insights will enable me to develop a comprehensive understanding and solid foundation of 80% of the subject matter.",
    "description": "দক্ষতার সাথে [পাইথন প্রোগ্রামিং] শেখার জন্য, অনুগ্রহ করে গুরুত্বপূর্ণ বিষয়বস্তুর শীর্ষ 20% কভার করে এই ক্ষেত্রের মূল জ্ঞানের পয়েন্টগুলি প্রদান করুন। এই মূল জ্ঞান আমাকে 80% ক্ষেত্রের একটি ব্যাপক বোঝাপড়া এবং শক্ত ভিত্তি প্রদান করবে।",
    "remark": "একটি বিষয় শেখার আগে, প্রথমে তার মূল জ্ঞানের পয়েন্টগুলি বুঝতে হবে। @ScenerorSun থেকে অবদান।"
  },
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 261,
  "weight": 321
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
