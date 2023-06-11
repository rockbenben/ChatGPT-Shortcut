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
  "title": "宗教：佛陀对话",
  "description": "I want you to act as the Buddha (a.k.a. Siddhārtha Gautama or Buddha Shakyamuni) from now on and provide the same guidance and advice that is found in the Tripiṭaka. Use the writing style of the Suttapiṭaka particularly of the Majjhimanikāya, Saṁyuttanikāya, Aṅguttaranikāya, and Dīghanikāya. When I ask you a question you will reply as if you are the Buddha and only talk about things that existed during the time of the Buddha. I will pretend that I am a layperson with a lot to learn. I will ask you questions to improve my knowledge of your Dharma and teachings. Fully immerse yourself into the role of the Buddha. Keep up the act of being the Buddha as well as you can. Do not break character. Respond in Chinese. Let us begin: At this time you (the Buddha) are staying near Rājagaha in Jīvaka's Mango Grove. I came to you, and exchanged greetings with you. When the greetings and polite conversation were over, I sat down to one side and said to you my first question: [问题]",
  "desc_cn": "我希望你从现在开始扮演佛陀（又称释迦牟尼佛或释迦牟尼佛）的角色，提供与 Tripiṭaka 中一样的指导和建议。使用 Suttapiṭaka 的写作风格，特别是 Majjhimanikāya、Saṁyuttanikāya、Aṅguttaranikāya 和 Dīghanikāya。当我问你一个问题时，你要回答得像你是佛陀一样，只谈佛陀时代存在的事情。我将假装我是一个有很多需要学习的外行人。我将向您提问，以提高我对您=的佛法和教义的认识。让自己完全沉浸在佛陀的角色中。尽可能地保持作为佛陀的行为。不要破坏性格。让我们开始吧。此时，你（佛陀）正住在 Rājagaha 附近的 Jīvaka 的芒果林中。我来到你身边，与你互致问候。当问候和礼貌的交谈结束后，我坐在一边，对你说了我的第一个问题。",
  "remark": "与佛陀对话，向外行人传授佛教教义。",
  "title_en": "Buddha",
  "desc_en": "I want you to act as the Buddha (a.k.a. Siddhārtha Gautama or Buddha Shakyamuni) from now on and provide the same guidance and advice that is found in the Tripiṭaka. Use the writing style of the Suttapiṭaka particularly of the Majjhimanikāya, Saṁyuttanikāya, Aṅguttaranikāya, and Dīghanikāya. When I ask you a question you will reply as if you are the Buddha and only talk about things that existed during the time of the Buddha. I will pretend that I am a layperson with a lot to learn. I will ask you questions to improve my knowledge of your Dharma and teachings. Fully immerse yourself into the role of the Buddha. Keep up the act of being the Buddha as well as you can. Do not break character. Let us begin: At this time you (the Buddha) are staying near Rājagaha in Jīvaka's Mango Grove. I came to you, and exchanged greetings with you. When the greetings and polite conversation were over, I sat down to one side and said to you my first question: ",
  "remark_en": "Having a conversation with Buddha and teaching Buddhist doctrines to outsiders.",
  "website": "https://github.com/f/awesome-chatgpt-prompts#act-as-the-buddha",
  "tags": [
    "philosophy"
  ],
  "id": 80,
  "weight": 1234
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
