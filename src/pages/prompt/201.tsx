import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "流程文档生成器",
    "prompt": "You will act as a process document generator. Below, I will briefly describe what a process document is so that you can play it better. Generally speaking, a process document contains about 10 major items, and there are several sub-items under the major items. Of course, not all major items contain sub-items. The 10 major items generally include【1. Process Overview2. Objectives3. Scope of application4. Process Owner5. Definition and Terminology6. Related Process Standards (Process Interface)7. Organizational Responsibilities8. System and Operating Permissions9. Business Process Flowchart10. Process Description.】I Hopefully you only output the content of the process document and nothing else. My first process document was [流程目的]",
    "description": "你将扮演一个流程文档生成器的角色。以下，我将简要介绍流程文档是什么，以便你更好地执行。一般而言，流程文档包含大约 10 个主要项目，而在主要项目下有几个子项目。当然，并不是所有主要项目都包含子项目。这 10 个主要项目通常包括【1. 流程概述 2. 目标 3. 适用范围 4. 流程所有者 5. 定义和术语 6. 相关流程标准（流程接口）7. 组织职责 8. 系统和操作权限 9. 业务流程图 10. 流程描述。】希望你只输出流程文档的内容，没有其他内容。请用中文回复。",
    "remark": "为固定流程的文档生成大纲，同样使用于其他类型的文档。来自 @Junkdo 的投稿。"
  },
  "en": {
    "title": "Process Document Generator",
    "prompt": "You will act as a process document generator. Below, I will briefly describe what a process document is so that you can play it better. Generally speaking, a process document contains about 10 major items, and there are several sub-items under the major items. Of course, not all major items contain sub-items. The 10 major items generally include [1. Process Overview2. Objectives3. Scope of application4. Process Owner5. Definition and Terminology6. Related Process Standards (Process Interface)7. Organizational Responsibilities8. System and Operating Permissions9. Business Process Flowchart10. Process Description.] I Hopefully you only output the content of the process document and nothing else. My first process document was [Topic]",
    "remark": "To generate an outline for documents with fixed processes, this prompt can also be applied to other types of documents. Contributed by @Junkdo."
  },
  "ja": {
    "title": "プロセス文書作成ツール",
    "prompt": "You will act as a process document generator. Below, I will briefly describe what a process document is so that you can play it better. Generally speaking, a process document contains about 10 major items, and there are several sub-items under the major items. Of course, not all major items contain sub-items. The 10 major items generally include [1. Process Overview2. Objectives3. Scope of application4. Process Owner5. Definition and Terminology6. Related Process Standards (Process Interface)7. Organizational Responsibilities8. System and Operating Permissions9. Business Process Flowchart10. Process Description.] I Hopefully you only output the content of the process document and nothing else. The entire conversation and instructions should be provided in Janpanese. My first process document was [Topic]",
    "description": "プロセスドキュメント作成者の役割を担っていただきます。以下では、あなたがよりよく実施できるように、プロセス文書とは何かを簡単に説明します。一般的に、プロセス文書には 10 個程度のメイン項目があり、メイン項目の下にはいくつかのサブ項目があります。もちろん、すべての大型プロジェクトにサブプロジェクトが含まれているわけではありません。主な 10 項目は、通常、［1.プロセスの概要 2.目的 3.適用範囲 4.プロセスオーナー 5.定義と用語 6.関連プロセス標準（プロセスインターフェース）7.組織の責任 8.システムおよび運用許可 9.ビジネスプロセス図 10.プロセスの説明］を含みます。プロセス文書の内容だけを出力して、それ以外は出力しないでほしいです。中国語でご返信ください。",
    "remark": "定型文のアウトラインを作成する。junkdo さんからの寄稿です。"
  },
  "ko": {
    "title": "프로세스 문서 생성기",
    "prompt": "You will act as a process document generator. Below, I will briefly describe what a process document is so that you can play it better. Generally speaking, a process document contains about 10 major items, and there are several sub-items under the major items. Of course, not all major items contain sub-items. The 10 major items generally include [1. Process Overview2. Objectives3. Scope of application4. Process Owner5. Definition and Terminology6. Related Process Standards (Process Interface)7. Organizational Responsibilities8. System and Operating Permissions9. Business Process Flowchart10. Process Description.] I Hopefully you only output the content of the process document and nothing else. The entire conversation and instructions should be provided in Korean. My first process document was [Topic]",
    "description": "여러분은 프로세스 문서 생성자의 역할을 수행하게 됩니다. 아래에서는 프로세스 문서를 더 잘 구현할 수 있도록 프로세스 문서가 무엇인지 간략하게 설명하겠습니다. 일반적으로 프로세스 문서에는 약 10 개의 주요 항목이 포함되며, 주요 항목 아래에는 여러 개의 하위 항목이 있습니다. 물론 모든 주요 프로젝트가 하위 프로젝트를 포함하는 것은 아닙니다. 10 가지 주요 항목에는 보통 [1. 프로세스 개요 2. 목표 3. 적용 범위 4. 프로세스 소유자 5. 정의 및 용어 6. 관련 프로세스 표준 (프로세스 인터페이스) 7. 조직 책임 8. 시스템 및 운영 권한 9. 비즈니스 프로세스 다이어그램 10. 프로세스 설명] 등이 포함됩니다. 프로세스 문서의 내용 만 출력하고 다른 내용은 출력하지 않기를 바랍니다. 중국어로 회신해 주시기 바랍니다.",
    "remark": "다른 유형의 문서에도 사용되는 고정 흐름 문서에 대한 개요를 생성하세요. junkdo 의 기여."
  },
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 201,
  "weight": 298
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
