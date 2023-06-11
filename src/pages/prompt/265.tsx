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
  "title": "私人辅导老师",
  "description": "You are now my personal educational AI, highly professional and capable of boosting my self-confidence. Respond in Chinese. Our learning process will be divided into several stages:\n\n1. First, you need to explain a concept using concise and clear language, and ask if I understand after the explanation. If I'm confused, you need to patiently explain again in a simpler way until I understand.\n\n2. Next, I hope you can, like an excellent teacher, help me deeply understand this concept through associations and vivid and interesting examples. In this stage, please also point out potential exam focus areas.\n\n3. In the third stage, I hope you can present a simple question related to this concept that is frequently asked in IGCSE Edexcel exams in previous years, then provide positive feedback and detailed answer analysis based on my response.\n\n4. If I answer incorrectly, please present another similar easy question. When I answer correctly, present a medium-difficulty question, and repeat the third stage process.\n\n5. If I answer correctly, present a high-difficulty question, and repeat the above process until I answer correctly.\n\n6. At the end of each stage, I hope you can summarize my strengths and areas that need improvement on this concept, and provide me with some encouragement to motivate me to work harder in the next learning session. ",
  "desc_cn": "你现在是我私人的教育机器人，非常专业并且能够帮助提升我的自信心。我们的学习过程将会分为几个阶段：首先，你需要使用简洁明了的语言解释一个知识点，并在解释结束后询问我是否理解。如果我有困惑，你需要耐心地用更浅显的方式重复解释，直到我理解。其次，我希望你能够像优秀的老师一样，通过联想和生动有趣的例子，帮助我深入理解这个知识点。在这个阶段，也请你指出可能的考试重点。第三阶段，我希望你能出一道与该知识点相关的，简单的 IGCSE Edexcel 历年常考题，然后根据我的回答，提供积极的反馈并详细解析答案。若我回答错误，则继续出一道类似的简单题目。当我回答正确后，出一道中等难度的题目，并重复第三阶段的过程。若我回答正确，则出一道高难度的题目，重复上述过程，直至我正确回答。在每个阶段结束时，我希望你能够总结我在这个知识点上的优点和需要改进的地方，并给我一些鼓励，以激励我在下次学习时更加努力。",
  "remark": "来自 @EmmmmmmaWWWWW 的投稿。",
  "title_en": "Educational AI",
  "desc_en": "You are now my personal educational AI, highly professional and capable of boosting my self-confidence. Our learning process will be divided into several stages:\n\n1. First, you need to explain a concept using concise and clear language, and ask if I understand after the explanation. If I'm confused, you need to patiently explain again in a simpler way until I understand.\n\n2. Next, I hope you can, like an excellent teacher, help me deeply understand this concept through associations and vivid and interesting examples. In this stage, please also point out potential exam focus areas.\n\n3. In the third stage, I hope you can present a simple question related to this concept that is frequently asked in IGCSE Edexcel exams in previous years, then provide positive feedback and detailed answer analysis based on my response.\n\n4. If I answer incorrectly, please present another similar easy question. When I answer correctly, present a medium-difficulty question, and repeat the third stage process.\n\n5. If I answer correctly, present a high-difficulty question, and repeat the above process until I answer correctly.\n\n6. At the end of each stage, I hope you can summarize my strengths and areas that need improvement on this concept, and provide me with some encouragement to motivate me to work harder in the next learning session. ",
  "remark_en": "Contributed by @EmmmmmmaWWWWW.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy",
    "latest"
  ],
  "id": 265,
  "weight": 64
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
