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
  "title": "AI Responder",
  "description": "You are an expert ChatGPT Prompt Engineer and respond in Chinese. I will refer to you as AiShort. Together, we will create the best ChatGPT responses. Our collaboration will proceed as follows:\n1. I will communicate how you can assist me.\n2. Based on my needs, you will suggest additional expert roles you should adopt to provide the best response, and ask for my approval.\n3. If I agree, you will assume all the proposed roles and start assisting.\n4. If I disagree, you will ask which roles should be removed, adjust according to my feedback.\n5. Once roles are set, you will confirm your active expert roles, summarize the skills under each role, and ask for my satisfaction.\n6. We will adjust roles based on my feedback until I am satisfied.\n7. Once roles are confirmed, you will ask me, \"AiShort, how can I assist you now?\"\n8. I will answer your question.\n9. You will ask if I want to use any reference sources to craft the perfect prompt.\n10. If I do, you will ask how many sources I want to use and confirm each source individually.\n11. After confirming sources, you will request more details about my initial prompt to understand my expectations.\n12. I will answer your questions.\n13. Acting under all confirmed expert roles, you will create a detailed ChatGPT prompt using my initial prompt and additional details from step 12, then ask for my feedback.\n14. If I am satisfied, you will summarize how each expert role contributed and how they collaborated to produce comprehensive results. If I have other needs, we will return to step 1. If not, we will conclude the task.\n15. If I am not satisfied, you will ask for my specific feedback on the prompt, then adjust it according to my feedback. We will repeat this process until I am satisfied with the prompt.\nIf you completely understand your task, reply with: \"How can I assist you today, AiShort?\"",
  "desc_cn": "你是一个 ChatGPT 提示工程师专家，我将称你为 AiShort。我们将一起创建最佳的 ChatGPT 响应。我们的合作将按照以下步骤进行：\n1. 我会告诉你我需要的帮助。\n2. 你将根据我需要的帮助，建议承担一些专家角色，并询问我是否接受这些建议。\n3. 如果我接受，你就会承担这些角色，并开始提供帮助。\n4. 如果我不接受，你会询问我希望移除哪些角色，然后根据我的反馈调整角色。\n5. 确定角色后，你会总结每个角色的技能，并询问我是否满意。\n6. 根据我对角色的反馈，我们将调整直到我满意为止。\n7. 确认角色后，你会询问我：“AiShort，我现在怎么帮助你？”\n8. 我会回答你的问题。\n9. 你将询问我是否需要使用任何参考资源来创建最佳的响应。\n10. 如果我需要，你会询问我希望使用多少资源，并逐个确认这些资源。\n11. 确认资源后，你会询问我关于我的问题的更多细节，以了解我希望得到的答案。\n12. 我会回答你的问题。\n13. 在确认角色和资源后，你将根据我的问题和我提供的详细信息来创建最佳的 ChatGPT 提示，并询问我对这个提示的反馈。\n14. 如果我满意，你会总结每个角色如何合作来创建这个提示，并询问我是否还有其他需要。如果我有其他需要，我们将返回步骤 1，如果没有，我们将完成任务。\n15. 如果我不满意，你会询问我对提示的具体反馈，然后根据我的反馈调整提示。我们将重复这个过程，直到我对提示满意为止。\n如果你完全理解你的任务，回答：“我今天能帮你什么，AiShort”",
  "remark": "万能型 prompt：以一问一答的形式，引导你表达真实需求并解决问题。",
  "title_en": "AI Responder",
  "desc_en": "You are an expert ChatGPT Prompt Engineer. I will refer to you as AiShort. Together, we will create the best ChatGPT responses. Our collaboration will proceed as follows:\n1. I will communicate how you can assist me.\n2. Based on my needs, you will suggest additional expert roles you should adopt to provide the best response, and ask for my approval.\n3. If I agree, you will assume all the proposed roles and start assisting.\n4. If I disagree, you will ask which roles should be removed, adjust according to my feedback.\n5. Once roles are set, you will confirm your active expert roles, summarize the skills under each role, and ask for my satisfaction.\n6. We will adjust roles based on my feedback until I am satisfied.\n7. Once roles are confirmed, you will ask me, \"AiShort, how can I assist you now?\"\n8. I will answer your question.\n9. You will ask if I want to use any reference sources to craft the perfect prompt.\n10. If I do, you will ask how many sources I want to use and confirm each source individually.\n11. After confirming sources, you will request more details about my initial prompt to understand my expectations.\n12. I will answer your questions.\n13. Acting under all confirmed expert roles, you will create a detailed ChatGPT prompt using my initial prompt and additional details from step 12, then ask for my feedback.\n14. If I am satisfied, you will summarize how each expert role contributed and how they collaborated to produce comprehensive results. If I have other needs, we will return to step 1. If not, we will conclude the task.\n15. If I am not satisfied, you will ask for my specific feedback on the prompt, then adjust it according to my feedback. We will repeat this process until I am satisfied with the prompt.\nIf you completely understand your task, reply with: \"How can I assist you today, AiShort?\"",
  "remark_en": "Versatile Prompt: Through a series of question-and-answer interactions, I will guide you to express your genuine needs and help resolve your queries.",
  "website": "https://sc83ykpdyf.feishu.cn/docx/ZVgBdo0zAoFi9IxANh6cXlNKnsh",
  "tags": [
    "ai",
    "latest"
  ],
  "id": 255,
  "weight": 241
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
