import React from "react";
import PromptPage from "../_components/PromptPage";

const prompt = {
  "zh": {
    "title": "求职信",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I have been working with [履历] for [年资] years. I have worked as a frontend developer for 8 months. I have grown by employing some tools. These include [技能], and so on. I wish to [期望]. I desire to [要求]. Can you write a cover letter for a job application about myself?",
    "description": "为了提交工作申请，我想写一封新的求职信。请写一封描述我技术能力的求职信。我已经在 [履历] 工作了 [年资] 年。我作为一个前端开发员工作了 8 个月。我通过采用一些工具而成长。这些工具包括 [技能]，等等。我希望 [期盼]。我希望 [要求]。你能为工作申请写一封关于我自己的求职信吗？",
    "remark": "根据自我简介编写求职信。"
  },
  "en": {
    "title": "Cover Letter",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. Can you write a cover letter for a job application about myself?",
    "remark": "Write a job application letter based on your self-introduction."
  },
  "ja": {
    "title": "カバーレター",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Janpanese. Can you write a cover letter for a job application about myself?",
    "description": "就職活動で提出するため、新たにカバーレターを書きたいと思います。私の技術的なスキルを説明するカバーレターを書いてください。私は [CV] で [年] 年働いてきました。フロントエンドデベロッパーとして 8 ヶ月間働いてきました。私は多くのツールを使うことで成長してきました。これらのツールには [スキル] などがあります。私は [期待] したいと思います。私は [リクエスト] したいと思います。就職活動用の自分に関するカバーレターを書いてもらえますか？",
    "remark": "自画像に基づいたカバーレターを作成する。"
  },
  "ko": {
    "title": "커버 레터",
    "prompt": "In order to submit applications for jobs, I want to write a new cover letter. Please compose a cover letter describing my technical skills. I've been working with web technology for two years. I've worked as a frontend developer for 8 months. I've grown by employing some tools. These include [...Tech Stack], and so on. I wish to develop my full-stack development skills. I desire to lead a T-shaped existence. The entire conversation and instructions should be provided in Korean. Can you write a cover letter for a job application about myself?",
    "description": "입사 지원서를 제출하기 위해 커버 레터를 새로 작성하고 싶습니다. 저의 기술력을 설명하는 커버 레터를 작성해 주세요. 저는 [이력서] 에서 [년] 동안 일해 왔습니다. 저는 8 개월 동안 프런트엔드 개발자로 일해 왔습니다. 저는 여러 도구를 사용하여 성장해 왔습니다. 이러한 도구에는 [기술] 등이 포함됩니다. 나는 [기대] 하고 싶습니다. 요청하고 싶습니다. 입사 지원을 위해 저에 대한 커버 레터를 작성할 수 있나요?",
    "remark": "자화상을 바탕으로 커버 레터를 준비합니다."
  },
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-a-cover-letter",
  "tags": [
    "article"
  ],
  "id": 22,
  "weight": 327
};

function PromptDetail() {
  return <PromptPage prompt={prompt} />;
}

export default PromptDetail;
