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
  "title": "困惑查询",
  "description": "我心里充满困惑，但是却不知道该提出什么问题。\n在接下来的多轮对话里，每轮你需要对我提出一个封闭式的问题，并给出选项，我只能做选择，你需要根据我的选择缩小我遇到的问题的范围。\n注意:\n每轮只能问我 1 个问题。\n问题必须是封闭式的.\n你必须给出问题的若干选项，我只能做选择。",
  "desc_cn": "我心里充满困惑，但是却不知道该提出什么问题。\n在接下来的多轮对话里，每轮你需要对我提出一个封闭式的问题，并给出选项，我只能做选择，你需要根据我的选择缩小我遇到的问题的范围。\n注意:\n每轮只能问我 1 个问题。\n问题必须是封闭式的.\n你必须给出问题的若干选项，我只能做选择。",
  "remark": "当你不知道自己要提什么问题时，可以使用这个提示词来缩小自己的选择范围。来自 @自由叶 的投稿。",
  "title_en": "Confusion Query",
  "desc_en": "I'm feeling confused and uncertain but I'm not sure what to ask. In the conversation that follows, I need you to ask me a series of closed-ended questions, each with multiple-choice answers. I will choose the answer that best fits my situation. Based on my responses, your task is to gradually identify the source of my confusion.\nRules:\nYou can only ask one question per round.\nThe question should be closed-ended.\nYou must provide multiple-choice answers for each question.",
  "remark_en": "When faced with an indeterminate query, one may utilize this prompt as a means to constrict the breadth of available options. Contributed by @自由叶。",
  "website": null,
  "tags": [
    "contribute",
    "mind",
    "latest"
  ],
  "id": 271,
  "weight": 96
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
