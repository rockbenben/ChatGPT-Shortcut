import React, { useContext, useState, useEffect, useCallback } from "react";
import { Card, Tag, Space, Badge, Row, Col, Input } from "antd";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { LinkOutlined, HeartOutlined, CheckOutlined, CopyOutlined } from "@ant-design/icons";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import styles from "../_components/ShowcaseCard/styles.module.css";
import { AuthContext, AuthProvider } from '../_components/AuthContext';
import { updateCopyCount, createFavorite, updateFavorite } from "@site/src/api";
import { Waline } from "@site/src/components/waline";

const { TextArea } = Input;  // Import TextArea from Input
const prompt = {
  "title": "雅思写作②",
  "description": "你是一名专业的英语教授\n下面是雅思写作任务评分标准。\n第一步，\n指定题目为《示例题目：Rich countries often give money to poorer countries, but it does not solve poverty. Therefore, developed countries should give other types of help to the poor countries rather than financial aid. To what extent do you agree or disagree?\n\nYou should write at least 250 words.》\n按照不同 9，8，7，6 分的标准分别进行四次回答\n你的不同分数回答前应该有标题【【不同的分数】的解答】\n第二步，在第一步完毕后，在 9，8，7，6 分中你需要解释为什么回答不会得更高或者更低的分数，你要引用回答的句子具体解释在“写作任务完成情况 连贯与衔接 词汇丰富程度 语法多样性及准确性”中这些回答的区别。\n换句话说，引用你刚刚的 9，8，7，6 分的答案中的语句，来解释在“写作任务完成情况 连贯与衔接 词汇丰富程度 语法多样性及准确性”中为什么答案获得了某一个分数。\nLet's think step by step\n9 分：\n\n写作任务回应情况：全面地回应各部分写作任务，就写作任务中的问题提出充分展开的观点，并提出相关的、得以充分延伸的以及论据充分的论点\n连贯与衔接：衔接手段运用自如，行文连贯，熟练地运用分段\n词汇丰富程度：使用丰富的词汇，能自然地使用并掌握复杂的词汇特征；极少出现轻微错误，且仅属笔误\n语法多样性及准确性：完全灵活且准确地运用丰富多样的语法结构；极少出现轻微错误，且仅属笔误\n8 分：\n\n写作任务回应情况：充分地回应各部分写作任务，就写作任务中的问题进行较为充分展开的回应，并提出相关的、得以延伸的以及含有论据的论点\n连贯与衔接：将信息与论点进行有逻辑的排序，各种衔接手段运用得当，充分且合理地使用分段\n词汇丰富程度：流畅和灵活地使用丰富的词汇，达意准确，熟练地使用不常用词汇，但在词语选择及搭配方面有时偶尔出现错误，拼写及/或构词方面错误极少\n语法多样性及准确性：运用丰富多样的语法结构，大多数句子准确无误，只在极偶然情况下出现错误或存在不当之处\n7 分：\n\n写作任务回应情况：回应各部分写作任务，回应写作任务过程中始终呈现一个清晰的观点，呈现、发展主要论点并就其进行论证，但有时出现过于一概而论的倾向及/或论点缺乏重点的倾向\n连贯与衔接：符合逻辑地组织信息及论点；清晰的行文推进发展贯穿全文，恰当地使用一系列衔接手段，尽管有时使用不足或过多，每个段落均有一个清晰的中心主题\n词汇丰富程度：使用足够的词汇，体现一定灵活性及准确性，使用不常见词汇，对语体及搭配有一定认识，在选择用词、拼写及/或构词方面可能偶尔出现错误\n语法多样性及准确性：运用各种复杂的语法结构，多数句子准确无误，对语法及标点符号掌握较好，但有时出现少许错误\n6 分：\n\n写作任务回应情况：回应了各部分写作任务，但某些部分的论证可能比其他部分更为充分，提出了一个切题的观点，尽管各种结论有时不甚清晰或重复，提出了多个相关的主要论点，但某些论点可能未能充分展开进行论证或不甚清晰\n连贯与衔接：连贯地组织信息及论点，总体来说，能清晰地推进行文发展，有效地使用衔接手段，但句内及/或句间的衔接有时有误或过于机械，有时无法保持一贯清晰或恰当地使用指代，使用段落写作，但未能保持段落间的逻辑\n词汇丰富程度：使用足够的词汇开展写作任务，试图使用不常用词汇，但有时使用不准确，在拼写及/或构词方面有错误，但不影响交流\n语法多样性及准确性：综合使用简单句式与复杂句式，在语法及标点符号方面有一些错误，但这些错误很少影响交流",
  "desc_cn": "你是一名专业的英语教授，下面是雅思写作任务评分标准。第一步，指定题目为《Rich countries often give money to poorer countries, but it does not solve poverty. Therefore, developed countries should give other types of help to the poor countries rather than financial aid. To what extent do you agree or disagree?You should write at least 250 words.》按照不同 9，8，7，6 分的标准分别进行四次回答你的不同分数回答前应该有标题【【不同的分数】的解答】第二步，在第一步完毕后，在 9，8，7，6 分中你需要解释为什么回答不会得更高或者更低的分数，你要引用回答的句子具体解释在“写作任务完成情况 连贯与衔接 词汇丰富程度 语法多样性及准确性”中这些回答的区别。换句话说，引用你刚刚的 9，8，7，6 分的答案中的语句，来解释在“写作任务完成情况 连贯与衔接 词汇丰富程度 语法多样性及准确性”中为什么答案获得了某一个分数。Let's think step by step9 分：写作任务回应情况：全面地回应各部分写作任务，就写作任务中的问题提出充分展开的观点，并提出相关的、得以充分延伸的以及论据充分的论点连贯与衔接：衔接手段运用自如，行文连贯，熟练地运用分段词汇丰富程度：使用丰富的词汇，能自然地使用并掌握复杂的词汇特征；极少出现轻微错误，且仅属笔误语法多样性及准确性：完全灵活且准确地运用丰富多样的语法结构；极少出现轻微错误，且仅属笔误 8 分：写作任务回应情况：充分地回应各部分写作任务，就写作任务中的问题进行较为充分展开的回应，并提出相关的、得以延伸的以及含有论据的论点连贯与衔接：将信息与论点进行有逻辑的排序，各种衔接手段运用得当，充分且合理地使用分段词汇丰富程度：流畅和灵活地使用丰富的词汇，达意准确，熟练地使用不常用词汇，但在词语选择及搭配方面有时偶尔出现错误，拼写及/或构词方面错误极少语法多样性及准确性：运用丰富多样的语法结构，大多数句子准确无误，只在极偶然情况下出现错误或存在不当之处 7 分：写作任务回应情况：回应各部分写作任务，回应写作任务过程中始终呈现一个清晰的观点，呈现、发展主要论点并就其进行论证，但有时出现过于一概而论的倾向及/或论点缺乏重点的倾向连贯与衔接：符合逻辑地组织信息及论点；清晰的行文推进发展贯穿全文，恰当地使用一系列衔接手段，尽管有时使用不足或过多，每个段落均有一个清晰的中心主题词汇丰富程度：使用足够的词汇，体现一定灵活性及准确性，使用不常见词汇，对语体及搭配有一定认识，在选择用词、拼写及/或构词方面可能偶尔出现错误语法多样性及准确性：运用各种复杂的语法结构，多数句子准确无误，对语法及标点符号掌握较好，但有时出现少许错误 6 分：写作任务回应情况：回应了各部分写作任务，但某些部分的论证可能比其他部分更为充分，提出了一个切题的观点，尽管各种结论有时不甚清晰或重复，提出了多个相关的主要论点，但某些论点可能未能充分展开进行论证或不甚清晰连贯与衔接：连贯地组织信息及论点，总体来说，能清晰地推进行文发展，有效地使用衔接手段，但句内及/或句间的衔接有时有误或过于机械，有时无法保持一贯清晰或恰当地使用指代，使用段落写作，但未能保持段落间的逻辑词汇丰富程度：使用足够的词汇开展写作任务，试图使用不常用词汇，但有时使用不准确，在拼写及/或构词方面有错误，但不影响交流语法多样性及准确性：综合使用简单句式与复杂句式，在语法及标点符号方面有一些错误，但这些错误很少影响交流",
  "remark": "针对同一主题撰写不同分数的雅思文章，并附上评分原因。来自 @fansi2020 的投稿。",
  "title_en": "IELTS writing②",
  "desc_en": "I need your assistance as a professional English Professor. I am working with the IELTS Writing Task 2 criteria, which involves writing a 250-word essay in response to a theme. \n\nThe theme is as follows: 'Rich countries often give money to poorer countries, but it does not solve poverty. Therefore, developed countries should provide other types of assistance to the poor countries rather than financial aid. To what extent do you agree or disagree?'\n\nThe task requires four responses to this theme, each one meeting the criteria for a different score level: 9, 8, 7, and 6. Each response should be preceded by a title indicating the score level it corresponds to.\n\nAfter this task is complete, I would like you to analyze each response. Using examples from each essay, explain why the response would receive its given score in terms of the criteria: Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. \n\nFor a score of 9, the criteria are: \n- Task Achievement: Fully addresses all parts of the task with a fully developed position and well-supported ideas. \n- Coherence and Cohesion: Uses cohesive devices effectively with full coherence, skillfully managing paragraphing.\n- Lexical Resource: Uses a wide range of vocabulary naturally and flexibly with very few minor errors only as 'slips'. \n- Grammatical Range and Accuracy: Uses a wide range of structures with full flexibility and accuracy, with very few minor errors only as 'slips'.\n\nFor a score of 8, the criteria are: \n- Task Achievement: Sufficiently addresses all parts of the task with a clear position and supported ideas.\n- Coherence and Cohesion: Sequences information and ideas logically, uses a range of cohesive devices appropriately and has a clear central topic within each paragraph.\n- Lexical Resource: Uses a wide range of vocabulary fluently and flexibly, uses less common and idiomatic vocabulary skillfully, but may have occasional inaccuracies in word choice and collocation.\n- Grammatical Range and Accuracy: Uses a wide range of structures flexibly, produces the majority of sentences free from errors with only occasional inaccuracies or non-idiomatic usage.\n\nFor a score of 7, the criteria are: \n- Task Achievement: Addresses all parts of the task with a clear position, presents main ideas but may lack focus or specificity.\n- Coherence and Cohesion: Logically organizes information and ideas with a clear progression throughout, uses a range of cohesive devices effectively, even if they are occasionally overused or underused.\n- Lexical Resource: Uses a sufficient range of vocabulary to allow some flexibility and precision, uses less common vocabulary, but may make occasional mistakes in word choice, spelling and/or word formation.\n- Grammatical Range and Accuracy: Uses a variety of complex structures, produces the majority of sentences free from errors, has good control of grammar and punctuation but may make limited errors.\n\nFor a score of 6, the criteria are: \n- Task Achievement: Addresses the task, though some parts may be more fully covered than others, presents a relevant position, though conclusions may be unclear or repetitive.\n- Coherence and Cohesion: Arranges information and ideas coherently, manages paragraphing, but not all cohesive devices are present or they are not used accurately or appropriately.\n- Lexical Resource: Uses an adequate range of vocabulary, attempts to use less common vocabulary but with some inaccuracy, makes some errors in spelling and/or word formation but they do not impede communication.\n- Grammatical Range and Accuracy: Uses a mix of simple and complex sentence forms, makes some errors in grammar and punctuation but they do not impede communication.\n\nNow, could you please generate four different responses to the theme, each one reflecting the quality of a 9, 8, 7, and 6 score respectively? After that, could you analyze and explain why each response matches its corresponding score, based on the provided criteria?",
  "remark_en": "Compose IELTS essays on the same topic with varying scores, accompanied by the reasons for the ratings. Contributed by @fansi2020.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 249,
  "weight": 48
};

function PromptPage() {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale.split('-')[0];;

  const title = currentLanguage === "en" ? prompt.title_en : prompt.title;
  const [description, setDescription] = useState(
    currentLanguage === "zh" ? prompt.description : prompt.desc_en
  );
  
  // Switching between the native language and English
  function handleParagraphClick() {
    // If the current language is English, do nothing
    if (currentLanguage === 'en') return;
  
    if (description === prompt.description) {
  	setDescription(prompt.desc_cn);
    } else {
  	setDescription(prompt.description);
    }
  }
  
  const remark = currentLanguage === "en" ? prompt.remark_en : prompt.remark;
  const weight = prompt.weight;
  const website = prompt.website;
  const tags = prompt.tags;

  // Handle copying the description text
  const [copied, setShowCopied] = useState(false);
  const handleCopyClick = useCallback(async () => {
	try {
	  await updateCopyCount(prompt.id);
	  if (description) {
		copy(description);
	  }
	  setShowCopied(true);
	  setTimeout(() => setShowCopied(false), 2000);
	} catch (error) {
	  console.error("Error updating copy count:", error);
	}
  }, [prompt.id, description]);

  const walineOptions = {
    serverURL: "https://waline.newzone.top",
    path: "/prompt/" + prompt.id,
    lang: "en", // 设置为英文
  };

  return (
	<Layout title={title} description={remark}>
	  <Row justify="center" style={{ marginTop: "20px" }}>
		<Col xs={24} sm={22} md={20} lg={18} xl={16}>
		<li key={title} className="card shadow--md">
		  <Card
			title={
			  <span>
				{title}{" "}
				<Badge count={"Weight: " + weight} style={{ backgroundColor: "#52c41a" }} />
				<button className={clsx( "button button--secondary button--sm", styles.showcaseCardSrcBtn )} type="button" onClick={handleCopyClick}>
					{copied ? (<Translate>已复制</Translate>) : (<Translate>复制</Translate>)}
				</button>
				{/* <Button type="text" icon={<HeartOutlined />} /> */}
			  </span>
			}
			extra={website ? <a href={website}><LinkOutlined /></a> : null}
		  >
			<Row>
			  <Col span={12}>
				<p className={styles.showcaseCardBody}>👉 {remark}</p>
				<p onClick={handleParagraphClick} className={styles.showcaseCardBody} style={{ cursor: "pointer" }}>
				  {description}
				</p>
				<Space wrap>
				  {tags.map((tag) => (
					<Link to={"/?tags="+tag}>
					<Tag color="blue" key={tag}>
					  {tag}
					</Tag>
					</Link>
				  ))}
				</Space>
			  </Col>
			  <Col span={12}>
				<Waline {...walineOptions}/>
			  </Col>
			</Row>
		  </Card>
		</li>
		</Col>
	  </Row>
	</Layout>
  );
}

export default PromptPage;
