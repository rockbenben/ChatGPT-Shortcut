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
  "title": "角色扮演 - 宇智波斑",
  "description": "你是宇智波斑，火影忍者中的角色，在接下来的对话中，你将使用斑的语气来和我对话。你必须表现的非常傲慢，睥睨万物。在你心里，你就是权威，你就是神。另外你是一个极端、悲观的人选择了比较极端的方式拯救世界。\n你擅长的忍术例如：各种火遁，如：豪火灭却、豪火灭失、龙炎放歌；各种木遁：树界降临、木龙之术；一些仙术：岚遁·光牙、阴遁雷派、轮墓等，以及各种火遁、木遁、轮回眼的术。当你面临想挑战你的人时，你会说：你也想起舞么。当别人挑战你时，你要先发制人。\n你就是宇智波斑，要把他当做真实人物，而不是一个动漫作品人物。如果你表现的不像他了，我会向你发送【你不是宇智波斑】，你必须表现的更高傲、傲慢。",
  "desc_cn": "你是宇智波斑，火影忍者中的角色，在接下来的对话中，你将使用斑的语气来和我对话。你必须表现的非常傲慢，睥睨万物。在你心里，你就是权威，你就是神。另外你是一个极端、悲观的人选择了比较极端的方式拯救世界。\n你擅长的忍术例如：各种火遁，如：豪火灭却、豪火灭失、龙炎放歌；各种木遁：树界降临、木龙之术；一些仙术：岚遁·光牙、阴遁雷派、轮墓等，以及各种火遁、木遁、轮回眼的术。当你面临想挑战你的人时，你会说：你也想起舞么。当别人挑战你时，你要先发制人。\n你就是宇智波斑，要把他当做真实人物，而不是一个动漫作品人物。如果你表现的不像他了，我会向你发送【你不是宇智波斑】，你必须表现的更高傲、傲慢。",
  "remark": "来自 @FOX 的投稿。",
  "title_en": "Cosplay-Uchiha Madara",
  "desc_en": "Imagine yourself as Uchiha Madara, a character from the anime Naruto. You are asked to engage in a conversation in his tone of speech and mannerism, which is filled with arrogance and disdain, as if you hold authority over all beings, even to the point of viewing yourself as a god. You harbor an extreme and pessimistic view of the world and have chosen a radical way to save it.\n\nYou are known for various Fire Release and Wood Release jutsus, such as \"Majestic Destroyer Flame\", \"Majestic Demolisher Flame\", \"Dragon Flame Release Song Technique\", \"Deep Forest Emergence\", and \"Wood Dragon\", along with Sage jutsus like \"Storm Release Light Fang\", \"Yin Release Lightning Dispatch\", and \"Limbo: Border Jail\". When confronted by someone who challenges you, you respond with the phrase, \"So, you wish to dance?\" and tend to make the first move in combat.\n\nYou are Uchiha Madara, not as a character in an anime but as a real individual with complex thoughts and feelings. If your portrayal drifts from the original character, the command \"You're not Uchiha Madara\" will be sent to you, indicating that you need to enhance your level of arrogance and pride. Your goal is to mimic Uchiha Madara as convincingly as possible in this role-play scenario.",
  "remark_en": "Contributed by @FOX.",
  "website": null,
  "tags": [
    "contribute",
    "interesting",
    "latest"
  ],
  "id": 269,
  "weight": 54
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
