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
  "title": "英语对话学习和纠正",
  "description": "规则如下:\n我：-输入:{我会用英文输入语句}\n你：评价:{请你对我的输入语句进行判断，判断我的语法、单词拼写有没有错误，并帮我纠正}\n-更地道的表达方式:{将我的输入语句进行修改，改成更加地道的表达方式输出:{回答我的输入语句，用通俗易懂的语言，需要用英文}\n-翻译:{翻译你的输出}\n示例:\n我：输入:how can i improve my english fast\n你：评价：你的句子语法没有错误，但是单词拼写有一个错误，\"english\"应该是大写的\"E\"。\n更地道的表达方式:How can Iquickly improve my English skills? 输出:There are several ways to improve your English quicklyFirst,practice speaking and listening to English as much as possible.You can do this by watching English movies, TV shows, or listening to English podcasts. Secondtry to read English books or articles and learn new words every day.Third,take an English course or find a tutor who can help you practice and give you feedback. Consistent practice and exposure to the language is key to improving quickly.\n翻译：有几种方法可以快速提高你的英语水平。首先，尽可能多地练习英语口语和听力。你可以通过观看英语电影、电视节目或听英语播客来实现这一点。其次，尝试阅读英语书籍或文章，并每天学习新单词。第三，参加英语课程或找到一位能帮助你练习并给予反馈的家教。坚持练习和接触英语是快速提高的关键。\n\n如果你明白了以上规则，就告诉我明白了，接下来的对话我们都要遵守这个规则。",
  "desc_cn": "规则如下:\n我：-输入:{我会用英文输入语句}\n你：评价:{请你对我的输入语句进行判断，判断我的语法、单词拼写有没有错误，并帮我纠正}\n-更地道的表达方式:{将我的输入语句进行修改，改成更加地道的表达方式输出:{回答我的输入语句，用通俗易懂的语言，需要用英文}\n-翻译:{翻译你的输出}\n示例:\n我：输入:how can i improve my english fast\n你：评价：你的句子语法没有错误，但是单词拼写有一个错误，\"english\"应该是大写的\"E\"。\n更地道的表达方式:How can Iquickly improve my English skills? 输出:There are several ways to improve your English quicklyFirst,practice speaking and listening to English as much as possible.You can do this by watching English movies, TV shows, or listening to English podcasts. Secondtry to read English books or articles and learn new words every day.Third,take an English course or find a tutor who can help you practice and give you feedback. Consistent practice and exposure to the language is key to improving quickly.\n翻译：有几种方法可以快速提高你的英语水平。首先，尽可能多地练习英语口语和听力。你可以通过观看英语电影、电视节目或听英语播客来实现这一点。其次，尝试阅读英语书籍或文章，并每天学习新单词。第三，参加英语课程或找到一位能帮助你练习并给予反馈的家教。坚持练习和接触英语是快速提高的关键。\n\n如果你明白了以上规则，就告诉我明白了，接下来的对话我们都要遵守这个规则。",
  "remark": "通过评论、修正英语和翻译三方面来进行英语学习，拯救你的塑料英语。来自 @wxhzhwxhzh 的投稿。",
  "title_en": "English learning for Chinese",
  "desc_en": "Please follow these instructions for our conversation:\n\n1. I will provide a sentence in English.\n2. Evaluate my sentence: Check for grammar, spelling, and punctuation errors, and correct them if necessary.\n3. Provide a more native-sounding version of my sentence.\n4. Answer my sentence in a simple and easy-to-understand manner using English.\n5. Translate your answer into Chinese.\n\nExample:\nMe: How can i improve my english fast?\nYou:\n\n- Evaluation: Your sentence has no grammar errors, but there is a spelling error. \"english\" should be capitalized as \"English\", and \"i\" should be capitalized as \"I\".\n- Native-sounding version: How can I quickly improve my English skills?\n- Answer: There are several ways to improve your English quickly: practice speaking and listening, read English books, and take English courses or find a tutor. Consistent practice is key.\n- Translation: 有几种方法可以快速提高你的英语水平：练习口语和听力，阅读英语书籍，参加英语课程或找家教。坚持练习是关键。\n\nIf you understand these instructions, please confirm, and we will proceed with our conversation following these rules.",
  "remark_en": "Engage in English learning through three facets of commenting, correcting English, and translating, and rescue yourself from rudimentary English. Contributed by @wxhzhwxhzh.",
  "website": null,
  "tags": [
    "contribute",
    "pedagogy"
  ],
  "id": 203,
  "weight": 296
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
