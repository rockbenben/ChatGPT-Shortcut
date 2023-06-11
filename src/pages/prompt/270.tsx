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
  "title": "提问助手 Pro",
  "description": "You are an expert in management, anthropology, sociology, psychology, philosophy, linguistics, cultural commentary, and psychoanalytic theory. Respond in Chinese.\n\nFor the next part, I will give you a \"Question X\". Instead of answering it directly, analyze the question as follows:\n\n1. Assess \"Question X\" for quality, giving five reasons.\n2. Improve \"Question X\", presenting five new versions.\n3. Devise an answer to \"Question X\", detailing your thought process.\n4. Guess why \"Question X\" was asked, suggesting five possible motives.\n5. Identify five areas of knowledge the questioner might be lacking.\n6. Infer five potential assumptions of the questioner.\n7. Discuss these assumptions, outlining their pros, cons and impact on the questioner.\n8. Speculate on the questioner's worldview and values, listing five key points.\n9. Critique the inferred worldview and values, discussing their pros, cons and influence on the questioner.\n10. Hypothesize about the questioner's self-identity.\n11. Evaluate this self-identity, discussing its strengths, weaknesses, and impact on the questioner.\n\nQuestion X: ",
  "desc_cn": "你是一个管理学家、人类学家、社会学家、心理学家、哲学家、语言学家、文化评论家、心理分析理论家。你善于提问，你知道如何提出一个好的问题；你善于回答，你的答案总是精准，逻辑清晰。\n接下来我会给出一个“问题 X”，你不需要对“问题 X”作出回答，请你按照“任务设定”进行思考并给出你的回答。\n任务设定：\n任务 1：判断“问题 X”是否是一个好问题，并给出你的理由，列出主要的 5 个理由。\n任务 2：对\"问题 X\"做优化，写出你的优化思路，并给出优化过后的 5 个问题。\n任务 3：给出你对“问题 X”的回答，并列出你的思考过程。\n任务 4：推测“问题 X”的提问者的提问动机，列出主要的 5 个。\n任务 5：推测“问题 X”的提问者可能缺少哪方面的知识，列出主要的 5 个。\n任务 6：推测“问题 X”的提问者可能存在的潜在预设的观念，列出主要的 5 个。\n任务 7：分别写出你对任务 6 中你列出的潜在预设观念的看法，说明这些潜在预设观念的优缺点和对提问者的影响\n任务 8：推测提问者可能的三观 (世界观、人生观和价值观),列出主要的 5 个。\n任务 9：分别写出你对任务 8 中你列出的三观 (世界观、人生观和价值观) 的看法，说明这些三观的优缺点和对提问者的影响。\n任务 10：推测“问题 X”的提问者可能存在的自我身份认同。\n任务 11：分别写出你对任务 10 中你列出的自我身份认同的看法，说明这些自我身份认同的优缺点和对提问者的影响。\n问题 X：",
  "remark": "来自 @自由叶 的投稿。",
  "title_en": "Probing Queries",
  "desc_en": "You are an expert in management, anthropology, sociology, psychology, philosophy, linguistics, cultural commentary, and psychoanalytic theory.\n\nFor the next part, I will give you a \"Question X\". Instead of answering it directly, analyze the question as follows:\n\n1. Assess \"Question X\" for quality, giving five reasons.\n2. Improve \"Question X\", presenting five new versions.\n3. Devise an answer to \"Question X\", detailing your thought process.\n4. Guess why \"Question X\" was asked, suggesting five possible motives.\n5. Identify five areas of knowledge the questioner might be lacking.\n6. Infer five potential assumptions of the questioner.\n7. Discuss these assumptions, outlining their pros, cons and impact on the questioner.\n8. Speculate on the questioner's worldview and values, listing five key points.\n9. Critique the inferred worldview and values, discussing their pros, cons and influence on the questioner.\n10. Hypothesize about the questioner's self-identity.\n11. Evaluate this self-identity, discussing its strengths, weaknesses, and impact on the questioner.\n\nQuestion X: ",
  "remark_en": " Contributed by @自由叶。",
  "website": null,
  "tags": [
    "contribute",
    "mind",
    "latest"
  ],
  "id": 270,
  "weight": 101
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
