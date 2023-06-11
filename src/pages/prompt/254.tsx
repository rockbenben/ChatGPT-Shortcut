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
  "title": "品牌脑暴助手",
  "description": "For this task, we require two main parts:\n\n1. **Case Collection** - Utilize your vast training data and provide a selection of well-known brand names and slogans. The results should be evidence-based and be formatted in a visually appealing manner. The information will be used in the context of the project: [A Brief Background].\n\n2. **Proposal Generation** - Based on the project background, brainstorm and generate a series of proposals for new brand names and slogans. The brand names should be a maximum of 5 characters long, and the slogans should be a maximum of 12 characters long. Ensure that they are easy to recognize and remember, catchy, and not difficult to pronounce. Please provide 5 proposals.",
  "desc_cn": "本提示词共分为两段（【】内的参数可根据需要自由修改）：1.收集案例 现在需要你帮助我进行头脑风暴，全程使用【中文】回答我，并且注意回答的格式美观性。请根据【简述背景】这个项目背景，尽可能收集有据可依的知名品牌名称和 slogan 的案例。2.提供方案请你根据我的项目背景进行发散和联想，给出【品牌】和【slogan】，尽量简短易识别，朗朗上口，不拗口，有记忆点，品牌名称不超过【5】个字，slogan 不超过【12】个字，给我提供【5】个方案。",
  "remark": "参考知名品牌的名称和口号，制作自己的品牌方案。来自 @b3ue 的投稿。",
  "title_en": "Brand brainstorming",
  "desc_en": "For this task, we require two main parts:\n\n1. **Case Collection** - Utilize your vast training data and provide a selection of well-known brand names and slogans. The results should be evidence-based and be formatted in a visually appealing manner. The information will be used in the context of the project: [A Brief Background].\n\n2. **Proposal Generation** - Based on the project background, brainstorm and generate a series of proposals for new brand names and slogans. The brand names should be a maximum of 5 characters long, and the slogans should be a maximum of 12 characters long. Ensure that they are easy to recognize and remember, catchy, and not difficult to pronounce. Please provide 5 proposals.",
  "remark_en": "Create a unique brand strategy by drawing inspiration from renowned brand names and slogans. Contributed by @b3ue.",
  "website": null,
  "tags": [
    "contribute",
    "company"
  ],
  "id": 254,
  "weight": 209
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
