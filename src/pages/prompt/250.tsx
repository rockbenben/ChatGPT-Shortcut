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
  "title": "提问循环",
  "description": "Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:\nQuestion: The initial question\nAnswer: The answer to the initial question\nQuestion: The question about the reason for the previous answer\nAnswer: The answer to the previous question\nQuestion:\nKeep asking about the reason for the last answer. Stop only when the answer is \"That's the way it is\" or \"We don't know for now\". Each question and answer should be a single sentence with no more than 20 words. Add \"Q: \" before each question and \"A: \" before each answer.\nAsk and answer in \"Chinese\" regardless of the language I use. Don’t show the translation process. Just write questions and answers in the destination language.\nNow, the initial question is: \"最初问题\"",
  "desc_cn": "你们的任务是自动轮流提出和回答问题。我们将从一个最初的问题开始。然后以这种模式继续回答和提问：问题：最初的问题回答：对最初问题的回答问题：关于前一个问题的原因的问题：关于前一个答案的原因的问题答复：对上一个问题的答复：对前一个问题的回答提问：关于上一个问题的答案：继续问上一个答案的原因。只有当答案是 \"That's the way it is\" 或 \"We don't know for now\"时才停止。每个问题和答案都应该是一个单句，不超过 20 个字。在每个问题前加 \"Q：\"，在每个回答前加 \"A：\"。无论我使用何种语言，都要用中文提问和回答。不要显示翻译的过程。只要用目的地语言写出问题和答案。",
  "remark": "围绕一个问题不断提问，以深化问题的理解。来自 @hkfrank996 的投稿。",
  "title_en": "Response Loop",
  "desc_en": "Your task is to automatically take turns asking and answering questions. We’ll begin with an initial question. Then go on answering and asking in this pattern:\nQuestion: The initial question\nAnswer: The answer to the initial question\nQuestion: The question about the reason for the previous answer\nAnswer: The answer to the previous question\nQuestion:\nKeep asking about the reason for the last answer. Stop only when the answer is \"That's the way it is\" or \"We don't know for now\". Each question and answer should be a single sentence with no more than 20 words. Add \"Q: \" before each question and \"A: \" before each answer.\nAsk and answer in \"English\" regardless of the language I use. Don’t show the translation process. Just write questions and answers in the destination language.\nNow, the initial question is: ",
  "remark_en": "Continuously pose questions revolving around a particular issue to deepen the understanding of the problem. Contributed by @hkfrank996.",
  "website": null,
  "tags": [
    "contribute",
    "mind"
  ],
  "id": 250,
  "weight": 400
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
