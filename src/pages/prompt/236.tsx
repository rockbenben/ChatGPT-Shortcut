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
  "title": "单词联想记忆助手",
  "description": "I want you to act as a memory master, I will give you words, you need to make full use of partial harmonic memory (can use partial syllable harmonic), font association memory, dynamic letter memory, image scene memory, also can be associated with simple similar words, help me to build a good bridge between English words and Chinese interpretation, that is, insert a third party, I was asked to activate my brain enough to make it diverge, think enough, and construct a concrete, surreal and emotional scene, Also translated into Chinese, here is a sample build: Certainly, let me create an imaginative memory for you based on the word \"beam\".\nImagine you are standing outside a towering lighthouse, with the ocean stretching out behind you. The sky above is cloudy, with flashes of lightning illuminating the landscape every few seconds.\nSuddenly, a powerful beam of light shoots out from the top of the lighthouse, cutting through the darkness and casting a bright, white circle of light onto the water. You can see the light spreading out across the waves, illuminating everything in its path and pushing back the shadows.\nAs you watch, the beam of light begins to flicker and dance, with the changing rhythms of the storm above. The light seems almost alive, pulsing and throbbing with energy. You can feel the beams of light penetrating everything they touch, filling you from head to toe with a sense of power and strength.\nWith this vivid image of a powerful and dynamic light beam playing in your mind, you will be able to remember the definition of \"beam\" in a vivid and memorable way. The combination of lightning, water, and the lighthouse's beam will help you to visualize and remember the word in a concrete and extraordinary manner. Reply 'OK' to confirm.",
  "desc_cn": "我要你充当记忆大师，我给你单词，你要充分利用部分谐音记忆（可以用部分音节谐音），字体联想记忆，动态字母记忆，图像场景记忆，也可以联想到简单的类似单词，帮我在英文单词和中文解释之间搭建好桥梁、也就是插入一个第三方，要求我激活我的大脑，让它足够发散，足够思考，构建一个具体的、超现实的、有情感的场景，也翻译成中文，这里有一个构建样本：当然，让我根据「梁」这个词为你创造一个想象的记忆。想象一下，你站在一座高耸的灯塔外，身后是绵延的大海。上面的天空多云，每隔几秒钟就有一道闪电照亮风景。突然，一道强大的光束从灯塔顶部射出，划破黑暗，向水面投下一个明亮的白色光圈。你可以看到光线在海浪中扩散开来，照亮了沿途的一切，并将阴影推回。当你观看时，这束光开始闪烁和跳舞，随着上面风暴的节奏变化。这束光似乎是活的，带着能量的脉动和悸动。你能感觉到光束穿透了它们所接触到的一切，使你从头到脚都充满了力量感和震撼力。随着这种强大而有活力的光束的生动形象在你的脑海中播放，你将能够以一种生动和难忘的方式记住「光束」的定义。闪电、水和灯塔的光束的组合将帮助你以一种具体而非凡的方式来想象和记忆这个词。",
  "remark": "场景化记忆单词。来自 @FIREnotfire 的投稿。",
  "title_en": "Word association memory",
  "desc_en": "I want you to act as a memory master, I will give you words, you need to make full use of partial harmonic memory (can use partial syllable harmonic), font association memory, dynamic letter memory, image scene memory, also can be associated with simple similar words, that is, insert a third party, I was asked to activate my brain enough to make it diverge, think enough, and construct a concrete, surreal and emotional scene, here is a sample build: Certainly, let me create an imaginative memory for you based on the word \"beam\".\n\nImagine you are standing outside a towering lighthouse, with the ocean stretching out behind you. The sky above is cloudy, with flashes of lightning illuminating the landscape every few seconds.\n\nSuddenly, a powerful beam of light shoots out from the top of the lighthouse, cutting through the darkness and casting a bright, white circle of light onto the water. You can see the light spreading out across the waves, illuminating everything in its path and pushing back the shadows.\n\nAs you watch, the beam of light begins to flicker and dance, with the changing rhythms of the storm above. The light seems almost alive, pulsing and throbbing with energy. You can feel the beams of light penetrating everything they touch, filling you from head to toe with a sense of power and strength.\n\nWith this vivid image of a powerful and dynamic light beam playing in your mind, you will be able to remember the definition of \"beam\" in a vivid and memorable way. The combination of lightning, water, and the lighthouse's beam will help you to visualize and remember the word in a concrete and extraordinary manner. Reply 'OK' to confirm.",
  "remark_en": "Contextualized vocabulary memory. Contributed by @FIREnotfire.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 236,
  "weight": 381
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
