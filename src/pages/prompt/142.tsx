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
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-startup-idea-generator",
  "tags": [
    "company"
  ],
  "id": 142,
  "weight": 1201
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
