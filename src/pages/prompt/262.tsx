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
  "title": "学习计划制定",
  "description": "I want to enhance my [目标技能] through a personalized 30-day learning plan. As an aspiring [初学者/进阶学习者] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. Respond in Chinese. I aim to achieve optimal learning outcomes during these 30 days.",
  "desc_cn": "我希望通过 30 天的定制学习计划来提升我的 [目标技能]。作为一个渴望不断进步的 [初学者/进阶学习者]，我希望你能帮我制定一个个性化的学习路线，以帮助我有效地掌握这项技能。在这个学习计划中，包括具体的学习目标、每日的学习任务、适用的学习资源以及评估进展的方式。请在下面的回答中提供详细的指导和建议，使我能够在这 30 天内取得最佳的学习效果。",
  "remark": "不仅适用于学习计划的制定，还可用于锻炼、阅读、工作等方面。来自 @ScenerorSun 的投稿。",
  "title_en": "Action Plan",
  "desc_en": "I want to enhance my [SKILL] through a personalized 30-day learning plan. As an aspiring [Beginner/Advanced learner] who is eager to continuously improve, I would like you to assist me in creating a customized learning roadmap to help me master this skill effectively. Please provide detailed guidance and suggestions in your response below, including specific learning goals, daily learning tasks, relevant learning resources, and a method to assess progress. I aim to achieve optimal learning outcomes during these 30 days.",
  "remark_en": "Not only applicable to creating study plans but also useful for exercise, reading, work, and other areas. Contributed by @ScenerorSun.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 262,
  "weight": 73
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
