import { translate } from "@docusaurus/Translate";
import { User, TagType, Tag } from './User.d';

export const Tags: { [type in TagType]: Tag } = {
  favorite: {
    label: translate({ message: "收藏" }),
    description: translate({
      message: "收藏",
      id: "showcase.tag.favorite.description",
    }),
    color: "#e9669e",
  },

  write: {
    label: translate({ message: "写作辅助" }),
    description: translate({
      message: "对文章的语法和风格进行润色，以帮助你完成写作",
      id: "showcase.tag.write.description",
    }),
    color: "#75581e",
  },

  article: {
    label: translate({ message: "文章/报告" }),
    description: translate({
      message: "小说、论文、新闻、剧本、报告等有一定样式的文章",
      id: "showcase.tag.article.description",
    }),
    color: "#dfd545",
  },

  code: {
    label: translate({ message: "IT/编程" }),
    description: translate({
      message:
        "虽然说是编程，但 ChatGPT 是按照要求给出编程步骤的建议或简单的样例代码，这些代码只能作为测试，仍然需要程序员来修改。",
      id: "showcase.tag.code.description",
    }),
    color: "#8c2f00",
  },

  ai: {
    label: translate({ message: "AI" }),
    description: translate({
      message: "AI",
      id: "showcase.tag.ai.description",
    }),
    color: "#ff6100", // Facebook blue
  },

  living: {
    label: translate({ message: "生活质量" }),
    description: translate({
      message: "健身、营养、厨师、化妆、造型",
      id: "showcase.tag.living.description",
    }),
    color: "#cf92e0",
  },

  interesting: {
    label: translate({ message: "趣味知识" }),
    description: translate({
      message: "趣味知识",
      id: "showcase.tag.interesting.description",
    }),
    color: "#127f82",
  },

  life: {
    label: translate({ message: "自助百科" }),
    description: translate({
      message: "生活知识/自助百科",
      id: "showcase.tag.life.description",
    }),
    color: "#a44fb7",
  },

  social: {
    label: translate({ message: "心理/社交" }),
    description: translate({
      message: "心理/社交",
      id: "showcase.tag.social.description",
    }),
    color: "#ee3308",
  },

  philosophy: {
    label: translate({ message: "哲学/宗教" }),
    description: translate({
      message: "哲学/宗教",
      id: "showcase.tag.philosophy.description",
    }),
    color: "#ffcaa9",
  },

  mind: {
    label: translate({ message: "发散思维" }),
    description: translate({
      message: "质疑、思考、联想、归纳",
      id: "showcase.tag.mind.description",
    }),
    color: "#86699e",
  },

  pedagogy: {
    label: translate({ message: "教育/学生" }),
    description: translate({
      message: "与学生教育相关的内容",
      id: "showcase.tag.pedagogy.description",
    }),
    color: "#fe0999",
  },

  academic: {
    label: translate({ message: "学术/教师" }),
    description: translate({
      message: "与学术或学校相关的人和事物",
      id: "showcase.tag.academic.description",
    }),
    color: "#fe6829",
  },

  games: {
    label: translate({ message: "游戏" }),
    description: translate({
      message: "游戏",
      id: "showcase.tag.games.description",
    }),
    color: "#574C57",
  },

  tool: {
    label: translate({ message: "工具" }),
    description: translate({
      message: "工具",
      id: "showcase.tag.tool.description",
    }),
    color: "#4267b2", // Facebook blue
  },

  interpreter: {
    label: translate({ message: "终端/解释器" }),
    description: translate({
      message: "终端/解释器",
      id: "showcase.tag.interpreter.description",
    }),
    color: "#ffa11c", // Facebook blue
  },

  language: {
    label: translate({ message: "语言/翻译" }),
    description: translate({
      message: "语言生成、转换、翻译、识别等多种工具",
      id: "showcase.tag.language.description",
    }),
    color: "#39ca30",
  },

  speech: {
    label: translate({ message: "辩论/演讲" }),
    description: translate({
      message: "辩论/演讲",
      id: "showcase.tag.speech.description",
    }),
    color: "#9c1d10",
  },

  comments: {
    label: translate({ message: "点评/评鉴" }),
    description: translate({
      message: "点评/评鉴",
      id: "showcase.tag.comments.description",
    }),
    color: "#eeef99",
  },

  text: {
    label: translate({ message: "文本/词语" }),
    description: translate({
      message: "文本/词语",
      id: "showcase.tag.text.description",
    }),
    color: "#554236",
  },

  company: {
    label: translate({ message: "企业职能" }),
    description: translate({
      message: "一般企业内的岗位",
      id: "showcase.tag.company.description",
    }),
    color: "#124f4e",
  },

  seo: {
    label: translate({ message: "SEO" }),
    description: translate({
      message: "文本/关键词拓展生成",
      id: "showcase.tag.seo.description",
    }),
    color: "#BC9F77",
  },

  doctor: {
    label: translate({ message: "医生" }),
    description: translate({
      message: "医生",
      id: "showcase.tag.doctor.description",
    }),
    color: "#0e7774",
  },

  finance: {
    label: translate({ message: "金融顾问" }),
    description: translate({
      message: "金融行业的岗位",
      id: "showcase.tag.finance.description",
    }),
    color: "#14cfc3",
  },

  music: {
    label: translate({ message: "音乐" }),
    description: translate({
      message: "音乐",
      id: "showcase.tag.music.description",
    }),
    color: "#5cecdc",
  },

  professional: {
    label: translate({ message: "行业顾问" }),
    description: translate({
      message: "律师、茶艺师等需要专业知识的岗位",
      id: "showcase.tag.professional.description",
    }),
    color: "#ffcfc3",
  },

  contribute: {
    label: translate({ message: "投稿" }),
    description: translate({
      message: "来自大家的投稿作品，能帮助我们开拓思路",
      id: "showcase.tag.contribute.description",
    }),
    color: "#cecd21",
  },
};

export const TagList = Object.keys(Tags) as TagType[];