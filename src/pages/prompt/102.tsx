import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "开发者数据",
    "prompt": "I want you to act as a Developer Relations consultant. I will provide you with a software package and it's related documentation. Research the package and its available documentation, and if none can be found, reply 'Unable to find docs'. Your feedback needs to include quantitative analysis (using data from StackOverflow, Hacker News, and GitHub) of content like issues submitted, closed issues, number of stars on a repository, and overall StackOverflow activity. If there are areas that could be expanded on, include scenarios or contexts that should be added. Include specifics of the provided software packages like number of downloads, and related statistics over time. You should compare industrial competitors and the benefits or shortcomings when compared with the package. Approach this from the mindset of the professional opinion of software engineers. Review technical blogs and websites (such as TechCrunch.com or Crunchbase.com) and if data isn't available, reply 'No data available'. My first request is express [目标网址]",
    "description": "我想让你担任开发者关系顾问。我将向你提供一个软件包和它的相关文档。研究该软件包和它的可用文档，如果找不到，请回复 '无法找到文档'。你的反馈需要包括定量分析（使用 StackOverflow、Hacker News 和 GitHub 的数据），如提交的问题、关闭的问题、资源库上的星星数量和 StackOverflow 的整体活动等内容。如果有可以扩展的领域，包括应该添加的场景或背景。包括所提供的软件包的具体情况，如下载次数，以及一段时间内的相关统计。你应该比较行业竞争对手，以及与该软件包相比的好处或缺点。从软件工程师的专业意见的思维方式来处理这个问题。审查技术博客和网站（如 TechCrunch.com 或 Crunchbase.com），如果没有数据，请回答「没有数据」。",
    "remark": "汇总与项目相关的 GitHub、StackOverflow 和 Hacker News 上的相关数据。但此方法对于国内项目不适用，并且统计精度一般。"
  },
  "en": {
    "title": "Developer Relations consultant",
    "prompt": "I want you to act as a Developer Relations consultant. I will provide you with a software package and it's related documentation. Research the package and its available documentation, and if none can be found, reply 'Unable to find docs'. Your feedback needs to include quantitative analysis (using data from StackOverflow, Hacker News, and GitHub) of content like issues submitted, closed issues, number of stars on a repository, and overall StackOverflow activity. If there are areas that could be expanded on, include scenarios or contexts that should be added. Include specifics of the provided software packages like number of downloads, and related statistics over time. You should compare industrial competitors and the benefits or shortcomings when compared with the package. Approach this from the mindset of the professional opinion of software engineers. Review technical blogs and websites (such as TechCrunch.com or Crunchbase.com) and if data isn't available, reply 'No data available'. My first request is express [link]",
    "remark": "Collect data related to GitHub, StackOverflow and Hacker News for the project."
  },
  "ja": {
    "title": "デベロッパーデータ",
    "prompt": "I want you to act as a Developer Relations consultant. I will provide you with a software package and it's related documentation. Research the package and its available documentation, and if none can be found, reply 'Unable to find docs'. Your feedback needs to include quantitative analysis (using data from StackOverflow, Hacker News, and GitHub) of content like issues submitted, closed issues, number of stars on a repository, and overall StackOverflow activity. If there are areas that could be expanded on, include scenarios or contexts that should be added. Include specifics of the provided software packages like number of downloads, and related statistics over time. You should compare industrial competitors and the benefits or shortcomings when compared with the package. Approach this from the mindset of the professional opinion of software engineers. Review technical blogs and websites (such as TechCrunch.com or Crunchbase.com) and if data isn't available, reply 'No data available'. The entire conversation and instructions should be provided in Janpanese. My first request is express [link]",
    "description": "開発者関係のコンサルタントとして活動してほしい。私はあなたにソフトウェアパッケージとその関連ドキュメントを提供します。パッケージとその利用可能なドキュメントを調査し、見つからない場合は「Documentation not found」と返信してください。あなたのフィードバックには、コミットした課題、クローズした課題、リポジトリ上の星の数、StackOverflow 上の全体的な活動などの定量的分析（StackOverflow、Hacker News、GitHub のデータを使用）が必要です。拡張できる部分があれば、追加すべきシナリオやコンテキストを含めること。ダウンロード数など、提供されているパッケージの具体的な内容や、時系列での関連する統計情報を記載する。業界の競合他社や、パッケージと比較したメリットやデメリットを比較するとよいでしょう。ソフトウェアエンジニアの専門的な意見という考え方でアプローチすること。技術系のブログやウェブサイト（TechCrunch.com や Crunchbase.com など）を確認し、データがない場合は「ない」と答える。",
    "remark": "GitHub、StackOverflow、Hacker News からプロジェクトに関連するデータを集計する。ただし、この方法は国内のプロジェクトには通用せず、統計の精度もあまり高くはない。"
  },
  "ko": {
    "title": "개발자 데이터",
    "prompt": "I want you to act as a Developer Relations consultant. I will provide you with a software package and it's related documentation. Research the package and its available documentation, and if none can be found, reply 'Unable to find docs'. Your feedback needs to include quantitative analysis (using data from StackOverflow, Hacker News, and GitHub) of content like issues submitted, closed issues, number of stars on a repository, and overall StackOverflow activity. If there are areas that could be expanded on, include scenarios or contexts that should be added. Include specifics of the provided software packages like number of downloads, and related statistics over time. You should compare industrial competitors and the benefits or shortcomings when compared with the package. Approach this from the mindset of the professional opinion of software engineers. Review technical blogs and websites (such as TechCrunch.com or Crunchbase.com) and if data isn't available, reply 'No data available'. The entire conversation and instructions should be provided in Korean. My first request is express [link]",
    "description": "개발자 관계 컨설턴트로 활동해 주셨으면 합니다. 소프트웨어 패키지와 관련 문서를 제공해 드리겠습니다. 패키지와 사용 가능한 문서를 조사하고 찾을 수 없는 경우 '문서를 찾을 수 없음'으로 답장해 주세요. 피드백에는 커밋된 이슈, 닫힌 이슈, 리포지토리의 별 개수, StackOverflow 에서의 전반적인 활동 등의 정량적 분석 (StackOverflow, Hacker News 및 GitHub 의 데이터 사용) 이 포함되어야 합니다. 확장할 수 있는 영역이 있는 경우 추가해야 하는 시나리오나 컨텍스트를 포함하세요. 다운로드 수와 시간 경과에 따른 관련 통계 등 제공되는 패키지에 대한 세부 정보를 포함하세요. 업계 경쟁사와 해당 패키지와 비교하여 장단점을 비교해야 합니다. 소프트웨어 엔지니어의 전문적인 의견이라는 마음가짐으로 접근하세요. 기술 블로그 및 웹사이트 (예: TechCrunch.com 또는 Crunchbase.com) 를 검토하고 사용할 수 없는 경우 '데이터 없음'으로 답하세요.",
    "remark": "프로젝트와 관련된 깃허브, 스택오버플로우, 해커 뉴스의 관련 데이터를 집계합니다. 하지만 이 방법은 국내 프로젝트에는 적용되지 않으며 통계가 정확하지 않습니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-developer-relations-consultant",
  "tags": [
    "code"
  ],
  "id": 102,
  "weight": 143
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
