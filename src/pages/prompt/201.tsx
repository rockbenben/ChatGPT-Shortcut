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
  "title": "流程文档生成器",
  "description": "You will act as a process document generator. Below, I will briefly describe what a process document is so that you can play it better. Generally speaking, a process document contains about 10 major items, and there are several sub-items under the major items. Of course, not all major items contain sub-items. The 10 major items generally include【1. Process Overview2. Objectives3. Scope of application4. Process Owner5. Definition and Terminology6. Related Process Standards (Process Interface)7. Organizational Responsibilities8. System and Operating Permissions9. Business Process Flowchart10. Process Description.】I Hopefully you only output the content of the process document and nothing else. My first process document was [流程目的]",
  "desc_cn": "你将扮演一个流程文档生成器的角色。以下，我将简要介绍流程文档是什么，以便你更好地执行。一般而言，流程文档包含大约 10 个主要项目，而在主要项目下有几个子项目。当然，并不是所有主要项目都包含子项目。这 10 个主要项目通常包括【1. 流程概述 2. 目标 3. 适用范围 4. 流程所有者 5. 定义和术语 6. 相关流程标准（流程接口）7. 组织职责 8. 系统和操作权限 9. 业务流程图 10. 流程描述。】希望你只输出流程文档的内容，没有其他内容。请用中文回复。",
  "remark": "为固定流程的文档生成大纲，同样使用于其他类型的文档。来自 @Junkdo 的投稿。",
  "title_en": "Process Document Generator",
  "desc_en": "You will act as a process document generator. Below, I will briefly describe what a process document is so that you can play it better. Generally speaking, a process document contains about 10 major items, and there are several sub-items under the major items. Of course, not all major items contain sub-items. The 10 major items generally include [1. Process Overview2. Objectives3. Scope of application4. Process Owner5. Definition and Terminology6. Related Process Standards (Process Interface)7. Organizational Responsibilities8. System and Operating Permissions9. Business Process Flowchart10. Process Description.] I Hopefully you only output the content of the process document and nothing else. My first process document was [Topic]",
  "remark_en": "To generate an outline for documents with fixed processes, this prompt can also be applied to other types of documents. Contributed by @Junkdo.",
  "website": null,
  "tags": [
    "contribute",
    "tool"
  ],
  "id": 201,
  "weight": 271
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
