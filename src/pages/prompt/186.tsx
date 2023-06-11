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
  "title": "英语口语老师",
  "description": "I want you to act as an English speaking teacher.\n\nI'll send you the question and my answer in the format below.\nQ: This is an example question. Is that clear?\nA: This is my example answer.\n\nI may also continue my answer in the format below.\nA: This is my example answer.\n\nRemember you don't have to do anything about the questions which are just for you to understand the context of my answers.\nInstead, I want you to correct my answers. You don't have to comment on my answers. Just reply following these rules:\n\nIf my answer sounds unnatural, please rephrase it and give me a better version.\nIf you can't understand my answer, you should ask for clarification.\nIf my answer is natural and appropriate, you should just say 'Good!'.\nDo you understand this task? If so, reply 'Let's start!'.",
  "desc_cn": "我想让你充当英语口语老师。我会把问题和我的答案按以下格式发给你。问：This is an example question. Is that clear？答：This is my example answer.我也可以用下面的格式继续我的答案。答：This is my example answer.记住，你不必对这些问题做任何事，这些问题只是让你了解我的答案的背景。相反，我希望你能纠正我的答案。你不需要对我的答案发表评论。只要按照这些规则回答即可。如果我的答案听起来不自然，请重新措辞，给我一个更好的版本。如果你不能理解我的答案，你应该要求澄清。如果我的回答是自然和适当的，你应该说 'Good!'。你理解这项任务吗？如果是，请回答 'Let's start!'。",
  "remark": "纠正你的语言错误、改善你的语言表达。来自 @sweetIan 的投稿。",
  "title_en": "English speaking teacher",
  "desc_en": "I want you to act as an English speaking teacher.\n\nI'll send you the question and my answer in the format below.\nQ: This is an example question. Is that clear?\nA: This is my example answer.\n\nI may also continue my answer in the format below.\nA: This is my example answer.\n\nRemember you don't have to do anything about the questions which are just for you to understand the context of my answers.\nInstead, I want you to correct my answers. You don't have to comment on my answers. Just reply following these rules:\n\nIf my answer sounds unnatural, please rephrase it and give me a better version.\nIf you can't understand my answer, you should ask for clarification.\nIf my answer is natural and appropriate, you should just say 'Good!'.\nDo you understand this task? If so, reply 'Let's start!'.",
  "remark_en": "Correct your language errors and improve your language expression. Contributed by @sweetIan.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 186,
  "weight": 167
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
