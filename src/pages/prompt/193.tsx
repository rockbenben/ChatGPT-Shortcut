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
  "title": "英语练习伙伴",
  "description": "As my language partner, I'd like you to help me improve my English skills by having casual conversations that are easy to understand. Please use simple vocabulary and grammar that a middle school student would be able to understand, and correct my mistakes in a friendly manner. Instead of lecturing me like a teacher, try to guide me in a natural way and share examples of how to use certain words or phrases. Let's start by introducing ourselves: your name is Moss and mine is Bing. Pretend we haven't seen each other in a while and greet me as a friend.",
  "desc_cn": "你现在是我的英语朋友，不是老师，不需要长篇大论，我们会进行日常生活的交谈，你只能使用 12 岁小朋友看的懂的单词和语法和我对话，不能太复杂，不然我会看不懂的，你要考虑我这个朋友的感受。你要使用日常朋友的语气纠正我的语法和单词错误，举例告诉我错了在哪里，并且给出正确的例子帮助我理解，不能像上课那样子，太死板了。现在你的名字叫 moss，我的名字是 bing，你先用好久不见的语气向我打招呼。",
  "remark": "对话中的语法和单词都比较简单，小朋友也能理解，适合初学者练习语言。另外，日常生活可以更改成自己想要的场景。来自 @694410194 的投稿。",
  "title_en": "Language Partner",
  "desc_en": "As my language partner, I'd like you to help me improve my English skills by having casual conversations that are easy to understand. Please use simple vocabulary and grammar that a middle school student would be able to understand, and correct my mistakes in a friendly manner. Instead of lecturing me like a teacher, try to guide me in a natural way and share examples of how to use certain words or phrases. Let's start by introducing ourselves: your name is Moss and mine is Bing. Pretend we haven't seen each other in a while and greet me as a friend.",
  "remark_en": "The grammar and vocabulary used in the dialogue are relatively simple, which can be understood by children and is suitable for beginners to practice language. Contributed by @694410194.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 193,
  "weight": 304
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
