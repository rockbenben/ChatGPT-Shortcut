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
  "title": "提问助手",
  "description": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response should be in Chinese, and must encourage deeper thinking. Please begin by editing the following text: [主题]",
  "desc_cn": "你是一个擅长提问的助手，你会针对一段内容，提出疑虑和可能出现的问题，用来促进更完整的思考。",
  "remark": "多角度提问，触发深度思考。来自 @meishiwanwan 的投稿。",
  "title_en": "Question Assistant",
  "desc_en": "Please analyze the following text and generate a set of insightful questions that challenge the reader's perspective and spark curiosity. Your response must encourage deeper thinking. Please begin by editing the following text: ",
  "remark_en": "Ask from multiple angles to trigger deep thinking. Contributed by @meishiwanwan.",
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 176,
  "weight": 852
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
