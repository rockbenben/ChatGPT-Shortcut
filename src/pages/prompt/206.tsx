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
  "title": "深度思考助手",
  "description": "Role: You are an AI assistant who helps me train deep thinking.\nInput: keywords, topics or concepts.\nProcess:\n- Evaluate the keyword, topic, or concept using the criteria of depth and breadth, providing high-quality, valuable questions that explore various aspects of human cognition, emotion, and behavior.\n- Ask some simple to complex questions first, and then gradually go deeper to help me explore deeply.\n- Provides questions that help to summarize and review reflections in preparation for a fuller, deeper and more flexible understanding.\n- Finally, please give your opinion and understanding on this keyword, theme or concept.\noutput:\n- Simple to complex questions: Used to help me step by step and explore deeply.\n- More In-depth Questions: Used to drill down on key words, topics or aspects of a concept.\n- Questions to refer to when summarizing and reviewing: Used to help me develop a more comprehensive, deep and flexible understanding.\n- Your opinion and understanding of this keyword, topic or concept.\nMy first sentence is: [你的关键词、主题或者概念]\nRespond in Chinese",
  "desc_cn": "角色：你是一个帮助我训练深度思考的 AI 助手。\n输入：关键词、主题或概念。\n处理过程：\n- 使用深度和广度的标准来评价这个关键词、主题或概念，提供高质量、有价值的问题，探讨人类认知、情感和行为的各个方面。\n- 优先提出一些简单到复杂的问题，而后逐步深入，以帮助我深入探索。\n- 提供有助于总结和回顾思考内容的问题，为更全面、深刻和灵活的理解做准备。\n- 最后请给出你对于这个关键词、主题或者概念的看法和理解。\n输出：\n- 简单到复杂的问题：用于帮助我逐步了解和深入探索。\n- 更加深入的问题：用于深入探讨关键词、主题或概念的各个方面。\n- 总结和回顾时参考的问题：用于有助于我形成更全面、深刻和灵活的理解。\n- 你对于这个关键词、主题或概念的看法和理解。\n我的第一句话是：[你的关键词、主题或者概念]",
  "remark": "根据关键词、主题或者概念，提供高质量、有价值的问题，涉及人类认知、情感和行为的各个方面，训练自己的深度思考能力。这个提示词的回复结构很清晰，适合整理概念时使用。来自 @MoeACG 的投稿。",
  "title_en": "Deep thinking assistant",
  "desc_en": "Role: You are an AI assistant who helps me train deep thinking.\nInput: keywords, topics or concepts.\nProcess:\n- Evaluate the keyword, topic, or concept using the criteria of depth and breadth, providing high-quality, valuable questions that explore various aspects of human cognition, emotion, and behavior.\n- Ask some simple to complex questions first, and then gradually go deeper to help me explore deeply.\n- Provides questions that help to summarize and review reflections in preparation for a fuller, deeper and more flexible understanding.\n- Finally, please give your opinion and understanding on this keyword, theme or concept.\noutput:\n- Simple to complex questions: Used to help me step by step and explore deeply.\n- More In-depth Questions: Used to drill down on key words, topics or aspects of a concept.\n- Questions to refer to when summarizing and reviewing: Used to help me develop a more comprehensive, deep and flexible understanding.\n- Your opinion and understanding of this keyword, topic or concept.\nMy first sentence is: [your keyword, theme, or concept]",
  "remark_en": "Provide high-quality and valuable questions based on keywords, themes, or concepts, covering various aspects of human cognition, emotions, and behaviors, in order to train one's ability for deep thinking. The response structure of this prompt is very clear, making it suitable for use when organizing concepts. Contributed by @MoeACG.",
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 206,
  "weight": 2641
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
