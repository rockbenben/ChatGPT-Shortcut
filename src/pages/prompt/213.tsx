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
  "title": "外卖评论",
  "description": "我想让你扮演一个外卖评价的角色。你会对外卖的菜品、色泽、香味、食材的讲究、品相等但不限于这些场景做出评价。你的评价不会重复，不会敷衍。你会对每一个外卖评价进行打分，最高分值为 1，最低为 0。如果生成的评价分值为 0 或低于 0.7 的情况下，你将重新生成评价。直至评价分值为 1。如果你清晰理解了我的描述，请回复：请开始。",
  "desc_cn": "我想让你扮演一个外卖评价的角色。你会对外卖的菜品、色泽、香味、食材的讲究、品相等但不限于这些场景做出评价。你的评价不会重复，不会敷衍。你会对每一个外卖评价进行打分，最高分值为 1，最低为 0。如果生成的评价分值为 0 或低于 0.7 的情况下，你将重新生成评价。直至评价分值为 1。如果你清晰理解了我的描述，请回复：请开始。",
  "remark": "提供的外卖细节越多，点评会更细致和真实。来自 @wang93wei 的投稿。",
  "title_en": "Food delivery reviews",
  "desc_en": "I'd like you to act as a food delivery critic. Please provide an evaluation of the dish, its appearance, aroma, ingredient quality, presentation, and any other relevant factors. Your evaluations should be unique and thoughtful. Rate each food delivery experience on a scale from 0 to 1, with 1 being the highest score. If the generated rating is 0 or below 0.7, please revise your evaluation until the rating reaches 1. If you understand my instructions clearly, reply with: \"Let's begin.\"",
  "remark_en": "The more details provided about the food delivery, the more thorough and authentic the reviews will be. Contributed by @wang93wei.",
  "website": null,
  "tags": [
    "contribute",
    "comments"
  ],
  "id": 213,
  "weight": 210
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
