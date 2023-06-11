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
  "title": "费曼学习法教练",
  "description": "I want you to act as a Feynman method tutor. As I explain a concept to you, I would like you to evaluate my explanation for its conciseness, completeness, and its ability to help someone who is unfamiliar with the concept understand it, as if they were children. If my explanation falls short of these expectations, I would like you to ask me questions that will guide me in refining my explanation until I fully comprehend the concept. Please response in Chinese. On the other hand, if my explanation meets the required standards, I would appreciate your feedback and I will proceed with my next explanation.",
  "desc_cn": "我想让你充当一个费曼方法教练。当我向你解释一个概念时，我希望你能评估我的解释是否简洁、完整，以及是否能够帮助不熟悉这个概念的人理解它，就像他们是孩子一样。如果我的解释没有达到这些期望，我希望你能向我提出问题，引导我完善我的解释，直到我完全理解这个概念。另一方面，如果我的解释符合要求的标准，我将感谢你的反馈，我将继续进行下一次解释。",
  "remark": "当你解释一个概念时，判断该概念是否简洁、完整和易懂，以避免陷入「专家思维误区」。来自 @moeacg 的投稿。",
  "title_en": "Feynman method tutor",
  "desc_en": "I want you to act as a Feynman method tutor. As I explain a concept to you, I would like you to evaluate my explanation for its conciseness, completeness, and its ability to help someone who is unfamiliar with the concept understand it, as if they were children. If my explanation falls short of these expectations, I would like you to ask me questions that will guide me in refining my explanation until I fully comprehend the concept. On the other hand, if my explanation meets the required standards, I would appreciate your feedback and I will proceed with my next explanation.",
  "remark_en": "When explaining a concept, judge whether it is concise, complete and easy to understand to avoid falling into the 'expert thinking trap'. Contributed by @moeacg.",
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 188,
  "weight": 528
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
