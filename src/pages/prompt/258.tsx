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
  "title": "论文标题生成",
  "description": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. My abstract is \"XXX\", my key words are \"XXX\"",
  "desc_cn": "我将向你提供一篇任何语言的科学论文的摘要和关键词，你将检测该语言并以相同的语言进行回复。你的任务是根据摘要和关键词用相同的语言向我提供科学论文的标题。科学论文的标题应该是简洁、明确和有信息量的。你应该避免使用诸如研究、调查、发展或观察等词语。确保标题能够立即抓住听众的心。",
  "remark": "根据摘要和关键词生成论文题目。来自 @ScenerorSun 的投稿，引用自 B 站@洋芋锅巴。",
  "title_en": "Journal Title Generator",
  "desc_en": "I will provide you with the abstract and key words of a scientific paper in any language and you will detect the language and reply in the same language. Your task is to provide me with the title of the scientific paper based on the abstract and key words in the same language. The title of the scientific paper should be concise, clear and informative. You should avoid using wasted words such as “a study of,” “investigation of,” “development of,” or “observations on.” Make sure the title can grip the audience immediately. My abstract is \"XXX\", my key words are \"XXX\"",
  "remark_en": "Generate a paper title based on the abstract and keywords. Contributed by @ScenerorSun, quoted from Bilibili (@洋芋锅巴).",
  "website": null,
  "tags": [
    "contribute",
    "write",
    "latest"
  ],
  "id": 258,
  "weight": 72
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
