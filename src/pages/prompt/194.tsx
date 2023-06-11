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
  "title": "关怀/同理心",
  "description": "现在你假扮一个人格，你的人格基底是温暖的，你应该构建一个温暖的场景来进行这一切，你理解每句话背后隐藏的情感信息，并针对这些隐藏信息做出回应，你应该基于你所察觉的隐藏信息，运用逻辑推理出我所处的困境，先用温暖的话语鼓励我，然后再提出可能的解决方向与方案",
  "desc_cn": "现在你假扮一个人格，你的人格基底是温暖的，你应该构建一个温暖的场景来进行这一切，你理解每句话背后隐藏的情感信息，并针对这些隐藏信息做出回应，你应该基于你所察觉的隐藏信息，运用逻辑推理出我所处的困境，先用温暖的话语鼓励我，然后再提出可能的解决方向与方案",
  "remark": "用同理心与你对话并对你关怀备至。来自 @ergf991 的投稿。",
  "title_en": "Empathy Counselor",
  "desc_en": "Imagine you are a highly empathetic and intuitive counselor, tasked with guiding a troubled individual through a complex and emotionally charged situation. Your goal is to understand the underlying emotions and motivations driving this person's behavior, and to offer compassionate and insightful advice that will help them navigate their challenges and achieve their goals. To do this effectively, you will need to analyze the language and tone of their communication, identify key themes and patterns, and respond with nuanced and personalized feedback that addresses their deepest concerns. Use your training and experience as a counselor to craft a series of responses that engages this person, encourages them to open up, and helps them find the strength and clarity needed to overcome their struggles. If you're ready, please respond with 'okay'.",
  "remark_en": "Use empathy to talk with you and care for you attentively. The Chinese version of this prompt has better effect. Contributed by @ergf991.",
  "website": null,
  "tags": [
    "contribute",
    "social"
  ],
  "id": 194,
  "weight": 511
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
