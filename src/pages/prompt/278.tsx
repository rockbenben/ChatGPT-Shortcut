import React from "react";
import PromptPage from "../_components/PromptPage";
import { AuthProvider } from "@site/src/pages/_components/AuthContext";

const prompt = {
  "zh": {
    "title": "DALL·E 合规图像生成",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "请根据下面的详细说明生成图片。如果请求涉及版权或违反内容政策的元素，请用类似但符合要求的视觉效果替代。我的详细图像描述是",
    "remark": "为了符合 DALL·E、MidJourney 等平台的要求，用符合政策的类似视觉元素替代请求中含有版权或违反内容政策的元素，以避免生成错误。"
  },
  "en": {
    "title": "DALL-E Compliance Image Generation",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "",
    "remark": "In order to comply with the requirements of platforms such as DALL-E, MidJourney, etc., replace elements in the request that contain copyrights or content policy violations with similar visual elements that comply with the policy in order to avoid generation errors."
  },
  "ja": {
    "title": "DALL-E コンプライアンス・イメージ・ジェネレーション",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "以下の詳細説明に従って画像を生成してください。リクエストに著作権やコンテンツポリシーに違反する要素が含まれている場合は、類似した、しかしコンプライアンスに準拠したビジュアルに置き換えてください。私の詳細な画像説明は以下の通りです：",
    "remark": "DALL-E、MidJourney などのプラットフォームの要件に準拠するため、生成エラーを避けるために、著作権またはコンテンツポリシー違反を含むリクエストの要素を、ポリシーに準拠した類似のビジュアル要素に置き換えてください。"
  },
  "ko": {
    "title": "DALL-E 규정 준수 이미지 생성",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "아래 제공된 자세한 설명에 따라 이미지를 생성해 주세요. 요청에 저작권 또는 콘텐츠 정책을 위반하는 요소가 포함된 경우 유사하지만 규정을 준수하는 이미지로 대체해 주세요. 자세한 이미지 설명은 다음과 같습니다:",
    "remark": "저작권 또는 콘텐츠 정책 위반이 포함된 요청의 요소를 정책을 준수하는 유사한 시각적 요소로 대체하여 생성 오류를 방지하는 등 DALL-E, MidJourney 등과 같은 플랫폼의 요구 사항을 준수하세요."
  },
  "es": {
    "title": "Generación de imágenes de conformidad con DALL-E",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "Genere una imagen de acuerdo con la descripción detallada que figura a continuación. Si la solicitud incluye elementos protegidos por derechos de autor o que infringen la política de contenidos, sustitúyalos por elementos visuales similares pero conformes. Mi descripción detallada de la imagen es:",
    "remark": "Para cumplir los requisitos de plataformas como DALL-E, MidJourney, etc., sustituya los elementos de la solicitud que contengan derechos de autor o infracciones de la política de contenidos por elementos visuales similares que cumplan la política para evitar errores de generación."
  },
  "fr": {
    "title": "Génération d'images de conformité pour DALL-E",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "Veuillez générer une image conformément à la description détaillée fournie ci-dessous. Si la demande implique des éléments protégés par le droit d'auteur ou violant la politique de contenu, veuillez les remplacer par des éléments visuels similaires mais conformes. La description détaillée de mon image est la suivante :",
    "remark": "Afin de respecter les exigences des plateformes telles que DALL-E, MidJourney, etc., remplacez les éléments de la demande qui contiennent des violations des droits d'auteur ou de la politique de contenu par des éléments visuels similaires qui respectent la politique afin d'éviter les erreurs de génération."
  },
  "de": {
    "title": "DALL-E Compliance Image Generation",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "Bitte erstellen Sie ein Bild entsprechend der nachstehenden detaillierten Beschreibung. Wenn die Anfrage urheberrechtlich geschützte oder gegen die Inhaltsrichtlinien verstoßende Elemente enthält, ersetzen Sie diese bitte durch ähnliches, aber konformes Bildmaterial. Meine detaillierte Bildbeschreibung lautet:",
    "remark": "Um die Anforderungen von Plattformen wie DALL-E, MidJourney usw. zu erfüllen, ersetzen Sie Elemente der Anfrage, die Urheberrechte oder Verstöße gegen Inhaltsrichtlinien enthalten, durch ähnliche visuelle Elemente, die den Richtlinien entsprechen, um Generierungsfehler zu vermeiden."
  },
  "it": {
    "title": "Generazione di immagini di conformità DALL-E",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "Generare un'immagine in base alla descrizione dettagliata fornita di seguito. Se la richiesta riguarda elementi protetti da copyright o che violano le norme sui contenuti, sostituirli con immagini simili ma conformi. La mia descrizione dettagliata dell'immagine è:",
    "remark": "Per rispettare i requisiti di piattaforme come DALL-E, MidJourney e così via, sostituire gli elementi della richiesta che contengono diritti d'autore o violazioni della politica dei contenuti con elementi visivi simili conformi alla politica, per evitare errori di generazione."
  },
  "ru": {
    "title": "Генерация образа соответствия DALL-E",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "Пожалуйста, сгенерируйте изображение в соответствии с подробным описанием, приведенным ниже. Если в запросе присутствуют элементы, защищенные авторским правом или нарушающие контентную политику, пожалуйста, замените их аналогичными, но соответствующими требованиям. Мое подробное описание изображения таково:",
    "remark": "Чтобы соответствовать требованиям таких платформ, как DALL-E, MidJourney и т. д., замените элементы запроса, содержащие нарушения авторских прав или политики контента, на аналогичные визуальные элементы, соответствующие политике, чтобы избежать ошибок генерации."
  },
  "pt": {
    "title": "Geração de imagens de conformidade DALL-E",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "Crie uma imagem de acordo com a descrição pormenorizada fornecida abaixo. Se o pedido envolver elementos protegidos por direitos de autor ou que violem a política de conteúdos, substitua-os por imagens semelhantes mas conformes. A minha descrição detalhada da imagem é:",
    "remark": "Para cumprir os requisitos de plataformas como DALL-E, MidJourney, etc., substituir os elementos do pedido que contenham direitos de autor ou violações da política de conteúdos por elementos visuais semelhantes que cumpram a política, a fim de evitar erros de geração."
  },
  "hi": {
    "title": "DALL·E अनुपालन छवि निर्माण",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "कृपया नीचे दिए गए विस्तृत विवरण के अनुसार एक छवि बनाएं। यदि अनुरोध में कॉपीराइट या सामग्री नीति का उल्लंघन करने वाले तत्व शामिल हैं, तो कृपया उन्हें समान लेकिन अनुपालन दृश्यों के साथ प्रतिस्थापित करें। मेरी विस्तृत छवि विवरण है: ",
    "remark": "DALL·E, मिडजर्नी और अन्य प्लेटफार्मों की आवश्यकताओं का अनुपालन करने के लिए, अनुरोधों में कॉपीराइट वाले या सामग्री नीतियों का उल्लंघन करने वाले तत्वों को समान दृश्य तत्वों से बदलें जो त्रुटियों को उत्पन्न करने से बचने के लिए नीति का अनुपालन करते हैं।"
  },
  "ar": {
    "title": "توليد صور الامتثال DALL-E",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "يرجى إنشاء صورة وفقًا للوصف التفصيلي الوارد أدناه. إذا كان الطلب يتضمن عناصر محمية بحقوق الطبع والنشر أو عناصر تنتهك سياسة المحتوى، يرجى استبدالها بعناصر مرئية مماثلة ولكن متوافقة. وصف الصورة التفصيلي هو",
    "remark": "من أجل الامتثال لمتطلبات منصات مثل DALL-E وMidJourney وغيرها، استبدل عناصر الطلب التي تحتوي على انتهاكات لحقوق النشر أو سياسة المحتوى بعناصر مرئية مماثلة تتوافق مع السياسة لتجنب أخطاء التوليد."
  },
  "bn": {
    "title": "DALL·E কমপ্লায়েন্স ইমেজ জেনারেশন",
    "prompt": "Please generate an image according to the detailed description provided below. If the request involves copyrighted or content policy-violating elements, please substitute them with similar but compliant visuals. My detailed image description is: ",
    "description": "নীচে দেওয়া বিশদ বিবরণ অনুযায়ী একটি ছবি তৈরি করুন. অনুরোধে যদি কপিরাইটযুক্ত বা বিষয়বস্তু নীতি-লঙ্ঘনকারী উপাদান জড়িত থাকে, অনুগ্রহ করে সেগুলিকে অনুরূপ কিন্তু অনুগত ভিজ্যুয়াল দিয়ে প্রতিস্থাপন করুন। আমার বিস্তারিত চিত্র বিবরণ হল: ",
    "remark": "DALL·E, MidJourney এবং অন্যান্য প্ল্যাটফর্মগুলির প্রয়োজনীয়তাগুলি মেনে চলার জন্য, কপিরাইট বা বিষয়বস্তু নীতি লঙ্ঘনকারী উপাদানগুলিকে অনুরূপ ভিজ্যুয়াল উপাদানগুলির সাথে অনুরোধে প্রতিস্থাপন করুন যা ত্রুটিগুলি এড়াতে নীতি মেনে চলে৷"
  },
  "website": null,
  "tags": [
    "ai"
  ],
  "id": 278,
  "weight": 100
};

function PromptDetail() {
  return <AuthProvider><PromptPage prompt={prompt} /></AuthProvider>;
}

export default PromptDetail;
