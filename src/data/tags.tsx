import { translate } from "@docusaurus/Translate";
import { User, TagType, Tag } from "./User.d";
export type { User, TagType, Tag };

export const Tags: { [type in TagType]: Tag } = {
  favorite: {
    label: translate({ message: "收藏", id: "common.favorites" }),
    description: translate({
      message: "我的收藏提示词",
      id: "showcase.tag.favorite.description",
    }),
    color: "#e9669e",
  },

  write: {
    label: translate({ message: "写作辅助", id: "showcase.tag.write.label" }),
    description: translate({
      message: "润色文章语法、优化表达风格、提升写作质量",
      id: "showcase.tag.write.description",
    }),
    color: "#75581e",
  },

  article: {
    label: translate({ message: "文章/报告", id: "showcase.tag.article.label" }),
    description: translate({
      message: "生成小说、论文、新闻稿、剧本、研究报告等各类文章",
      id: "showcase.tag.article.description",
    }),
    color: "#dfd545",
  },

  code: {
    label: translate({ message: "IT/编程", id: "showcase.tag.code.label" }),
    description: translate({
      message: "提供编程建议、代码示例、调试方案和技术指导",
      id: "showcase.tag.code.description",
    }),
    color: "#8c2f00",
  },

  ai: {
    label: translate({ message: "AI", id: "showcase.tag.ai.label" }),
    description: translate({
      message: "人工智能相关的提示词和应用场景",
      id: "showcase.tag.ai.description",
    }),
    color: "#ff6100",
  },

  living: {
    label: translate({ message: "生活质量", id: "showcase.tag.living.label" }),
    description: translate({
      message: "健身指导、营养建议、烹饪技巧、美妆造型等生活服务",
      id: "showcase.tag.living.description",
    }),
    color: "#cf92e0",
  },

  interesting: {
    label: translate({ message: "趣味科普", id: "showcase.tag.interesting.label" }),
    description: translate({
      message: "有趣的冷知识、科普内容和趣味问答",
      id: "showcase.tag.interesting.description",
    }),
    color: "#127f82",
  },

  life: {
    label: translate({ message: "生活百科", id: "showcase.tag.life.label" }),
    description: translate({
      message: "日常生活中的实用知识和问题解决方案",
      id: "showcase.tag.life.description",
    }),
    color: "#a44fb7",
  },

  social: {
    label: translate({ message: "心理/社交", id: "showcase.tag.social.label" }),
    description: translate({
      message: "心理咨询、情感分析、社交技巧和人际沟通",
      id: "showcase.tag.social.description",
    }),
    color: "#ee3308",
  },

  philosophy: {
    label: translate({ message: "哲学/宗教", id: "showcase.tag.philosophy.label" }),
    description: translate({
      message: "哲学思考、宗教文化和人生智慧探讨",
      id: "showcase.tag.philosophy.description",
    }),
    color: "#ffcaa9",
  },

  mind: {
    label: translate({ message: "思维训练", id: "showcase.tag.mind.label" }),
    description: translate({
      message: "激发创意、批判性思考和逻辑推理能力",
      id: "showcase.tag.mind.description",
    }),
    color: "#86699e",
  },

  pedagogy: {
    label: translate({ message: "教育/学生", id: "showcase.tag.pedagogy.label" }),
    description: translate({
      message: "学习辅导、作业帮助、考试准备等学生相关内容",
      id: "showcase.tag.pedagogy.description",
    }),
    color: "#fe0999",
  },

  academic: {
    label: translate({ message: "学术/教师", id: "showcase.tag.academic.label" }),
    description: translate({
      message: "学术研究、教学设计、课程规划等教师工作支持",
      id: "showcase.tag.academic.description",
    }),
    color: "#fe6829",
  },

  games: {
    label: translate({ message: "趣味游戏", id: "showcase.tag.games.label" }),
    description: translate({
      message: "文字游戏、角色扮演和互动娱乐",
      id: "showcase.tag.games.description",
    }),
    color: "#574C57",
  },

  tool: {
    label: translate({ message: "效率工具", id: "showcase.tag.tool.label" }),
    description: translate({
      message: "提升工作效率的实用工具",
      id: "showcase.tag.tool.description",
    }),
    color: "#4267b2",
  },

  interpreter: {
    label: translate({ message: "终端/解释器", id: "showcase.tag.interpreter.label" }),
    description: translate({
      message: "模拟命令行终端和各类编程语言解释器",
      id: "showcase.tag.interpreter.description",
    }),
    color: "#ffa11c",
  },

  language: {
    label: translate({ message: "语言/翻译", id: "showcase.tag.language.label" }),
    description: translate({
      message: "多语言翻译、语言学习、文本转换和语言识别",
      id: "showcase.tag.language.description",
    }),
    color: "#39ca30",
  },

  speech: {
    label: translate({ message: "辩论/演讲", id: "showcase.tag.speech.label" }),
    description: translate({
      message: "辩论技巧、演讲稿撰写和口才训练",
      id: "showcase.tag.speech.description",
    }),
    color: "#9c1d10",
  },

  comments: {
    label: translate({ message: "点评/评鉴", id: "showcase.tag.comments.label" }),
    description: translate({
      message: "专业点评、作品评价和鉴赏分析",
      id: "showcase.tag.comments.description",
    }),
    color: "#eeef99",
  },

  text: {
    label: translate({ message: "文本/词语", id: "showcase.tag.text.label" }),
    description: translate({
      message: "文本处理、词语解析和语言文字相关任务",
      id: "showcase.tag.text.description",
    }),
    color: "#554236",
  },

  company: {
    label: translate({ message: "企业职能", id: "showcase.tag.company.label" }),
    description: translate({
      message: "企业管理、人力资源、市场营销等职能岗位",
      id: "showcase.tag.company.description",
    }),
    color: "#124f4e",
  },

  seo: {
    label: translate({ message: "SEO", id: "showcase.tag.seo.label" }),
    description: translate({
      message: "搜索引擎优化、关键词拓展和内容营销",
      id: "showcase.tag.seo.description",
    }),
    color: "#BC9F77",
  },

  doctor: {
    label: translate({ message: "医疗健康", id: "showcase.tag.doctor.label" }),
    description: translate({
      message: "健康咨询、疾病科普和医疗建议",
      id: "showcase.tag.doctor.description",
    }),
    color: "#0e7774",
  },

  finance: {
    label: translate({ message: "金融顾问", id: "showcase.tag.finance.label" }),
    description: translate({
      message: "投资理财、金融分析和财务规划建议",
      id: "showcase.tag.finance.description",
    }),
    color: "#14cfc3",
  },

  music: {
    label: translate({ message: "音乐艺术", id: "showcase.tag.music.label" }),
    description: translate({
      message: "音乐创作、乐理学习和作品鉴赏",
      id: "showcase.tag.music.description",
    }),
    color: "#5cecdc",
  },

  professional: {
    label: translate({ message: "专业顾问", id: "showcase.tag.professional.label" }),
    description: translate({
      message: "律师、会计师、咨询师等专业领域顾问",
      id: "showcase.tag.professional.description",
    }),
    color: "#ffcfc3",
  },

  contribute: {
    label: translate({ message: "用户分享", id: "showcase.tag.contribute.label" }),
    description: translate({
      message: "社区用户分享的优质提示词",
      id: "showcase.tag.contribute.description",
    }),
    color: "#cecd21",
  },
};

export const TagList = Object.keys(Tags) as TagType[];
