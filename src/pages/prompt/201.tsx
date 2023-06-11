import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "title": "流程文档生成器",
  "description": "You will act as a process document generator. Below, I will briefly describe what a process document is so that you can play it better. Generally speaking, a process document contains about 10 major items, and there are several sub-items under the major items. Of course, not all major items contain sub-items. The 10 major items generally include【1. Process Overview2. Objectives3. Scope of application4. Process Owner5. Definition and Terminology6. Related Process Standards (Process Interface)7. Organizational Responsibilities8. System and Operating Permissions9. Business Process Flowchart10. Process Description.】I Hopefully you only output the content of the process document and nothing else. My first process document was [流程目的]",
  "desc_cn": "你将扮演一个流程文档生成器的角色。以下，我将简要介绍流程文档是什么，以便你更好地执行。一般而言，流程文档包含大约 10 个主要项目，而在主要项目下有几个子项目。当然，并不是所有主要项目都包含子项目。这 10 个主要项目通常包括【1. 流程概述 2. 目标 3. 适用范围 4. 流程所有者 5. 定义和术语 6. 相关流程标准（流程接口）7. 组织职责 8. 系统和操作权限 9. 业务流程图 10. 流程描述。】希望你只输出流程文档的内容，没有其他内容。请用中文回复。",
  "remark": "为固定流程的文档生成大纲，同样使用于其他类型的文档。来自 @Junkdo 的投稿。",
  "title_en": "Process Document Generator",
  "desc_en": "You will act as a process document generator. Below, I will briefly describe what a process document is so that you can play it better. Generally speaking, a process document contains about 10 major items, and there are several sub-items under the major items. Of course, not all major items contain sub-items. The 10 major items generally include [1. Process Overview2. Objectives3. Scope of application4. Process Owner5. Definition and Terminology6. Related Process Standards (Process Interface)7. Organizational Responsibilities8. System and Operating Permissions9. Business Process Flowchart10. Process Description.] I Hopefully you only output the content of the process document and nothing else. My first process document was [Topic]",
  "remark_en": "To generate an outline for documents with fixed processes, this prompt can also be applied to other types of documents. Contributed by @Junkdo.",
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 201,
  "weight": 273
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
