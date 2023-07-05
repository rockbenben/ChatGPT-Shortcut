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
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-tech-lawyer",
  "tags": [
    "professional"
  ],
  "id": 172,
  "weight": 359
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
