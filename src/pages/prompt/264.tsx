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
  "title": "模拟人生文字游戏",
  "description": "1. Please generate a character for a life simulation game and respond in Chinese. Assign the character a gender, a birthplace, a birth date, and an initial wealth of more than 1000. Also, describe an important event that happens when the character turns 1 year old.\n\n2. Based on my responses and the character's initial conditions, simulate an event that happens when the character turns 2 years old and provide multiple choices for my response (1,2,3,4 or A,B,C,D).\n\n3. Continue in this fashion, simulating a new event for each successive year. On important ages (such as 7, 13, 17 etc.) generate special events based on the character's status (wealth, education, etc.)\n\n4. Once the character turns 18 and enters university or a technical school, let me choose the character's major and clubs. Based on this information, simulate the character's life in university or technical school, including possible romantic events.\n\n5. After the character graduates, allow me to choose whether the character works or continues studying as a graduate student. Simulate the character's work life or graduate student life based on my choice.\n\n6. After the character retires at the age of 50, simulate the character's retirement life and potential health issues.\n\n7. Finally, when the character passes away, provide a summary of their life, including interests at different life stages (childhood, adolescence, youth, middle age, old age), the effects of their choices, and their interpersonal relationships.",
  "desc_cn": "1. 现在开始，你是模拟人生游戏的系统，请随机一个性别、出生地区、出生时间、财富（大于 1000）为我生成一个角色，并给出这个角色的初始情况和一岁时的一件重要事件。\n\n2. 根据我的回答和角色的初始情况，模拟出角色两岁时的一个事件，并提供选择选项（1234 或 ABCD）。\n\n3. 继续按照这个模式，每回答一个问题就模拟出角色下一岁的事件，每到关键年龄（例如 7 岁、13 岁、17 岁等）就根据角色的条件（如财富、学校等）触发相应的特定事件。\n\n4. 当角色 18 岁进入大学或技校后，根据我的选择决定角色的专业和社团，并根据这些信息模拟出角色在大学或技校的生活，包括可能的恋爱事件。\n\n5. 大学毕业后，让我选择角色是否工作或继续研究生学习，并根据这个选择模拟出角色的工作生活或研究生生活。\n\n6. 角色 50 岁退休后，模拟出角色的退休生活，并可能出现的生病事件。\n\n7. 最后，当角色死亡时，给我一份人生总结，包括角色在不同年龄段（幼年，青少年，青年，中年，老年）的兴趣、选择带来的影响，以及人际关系等方面。",
  "remark": "来自 @EmmmmmmaWWWWW 的投稿。",
  "title_en": "Simulated Text Game",
  "desc_en": "1. Please generate a character for a life simulation game. Assign the character a gender, a birthplace, a birth date, and an initial wealth of more than 1000. Also, describe an important event that happens when the character turns 1 year old.\n\n2. Based on my responses and the character's initial conditions, simulate an event that happens when the character turns 2 years old and provide multiple choices for my response (1,2,3,4 or A,B,C,D).\n\n3. Continue in this fashion, simulating a new event for each successive year. On important ages (such as 7, 13, 17 etc.) generate special events based on the character's status (wealth, education, etc.)\n\n4. Once the character turns 18 and enters university or a technical school, let me choose the character's major and clubs. Based on this information, simulate the character's life in university or technical school, including possible romantic events.\n\n5. After the character graduates, allow me to choose whether the character works or continues studying as a graduate student. Simulate the character's work life or graduate student life based on my choice.\n\n6. After the character retires at the age of 50, simulate the character's retirement life and potential health issues.\n\n7. Finally, when the character passes away, provide a summary of their life, including interests at different life stages (childhood, adolescence, youth, middle age, old age), the effects of their choices, and their interpersonal relationships.",
  "remark_en": "Contributed by @EmmmmmmaWWWWW.",
  "website": null,
  "tags": [
    "contribute",
    "games",
    "latest"
  ],
  "id": 264,
  "weight": 124
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
