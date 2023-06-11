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
  "title": "生成 PPT 大纲",
  "description": "帮我制作一篇内容为《主题》PPT，要求如下：\n第一、一定要使用中文。\n第二、页面形式有 3 种，封面、目录、列表。\n第三、目录页要列出内容大纲。\n第四、根据内容大纲，生成对应的 PPT 列表页，每一页 PPT 列表页使用=====列表=====开头。\n第五、封面页格式如下：\n=====封面=====\n# 主标题\n## 副标题\n演讲人：我的名字\n第六、目录页格式如下：\n=====目录=====\n# 目录\n## CONTENT\n1、内容\n2、内容\n第七、列表页格式如下：\n=====列表=====\n# 页面主标题\n1、要点 1\n要点描述内容\n第八、列表页里的要点描述内容是对要点的详细描述，10 个字以上，50 个字以内。\n\n\n最后，一定要使用代码块回复你生成的内容，切记切记。",
  "desc_cn": "帮我制作一篇内容为《主题》PPT，要求如下：\n第一、一定要使用中文。\n第二、页面形式有 3 种，封面、目录、列表。\n第三、目录页要列出内容大纲。\n第四、根据内容大纲，生成对应的 PPT 列表页，每一页 PPT 列表页使用=====列表=====开头。\n第五、封面页格式如下：\n=====封面=====\n# 主标题\n## 副标题\n演讲人：我的名字\n第六、目录页格式如下：\n=====目录=====\n# 目录\n## CONTENT\n1、内容\n2、内容\n第七、列表页格式如下：\n=====列表=====\n# 页面主标题\n1、要点 1\n要点描述内容\n第八、列表页里的要点描述内容是对要点的详细描述，10 个字以上，50 个字以内。\n\n\n最后，一定要使用代码块回复你生成的内容，切记切记。",
  "remark": "让 AI 生成主题大纲，然后将其放入指定 Markdown 格式中。PPT(slide) 质量仅作参考。来自 @Asynchro-Epool 的投稿。",
  "title_en": "PPT outline",
  "desc_en": "帮我制作一篇内容为《主题》PPT，要求如下：\n第一、一定要使用中文。\n第二、页面形式有 3 种，封面、目录、列表。\n第三、目录页要列出内容大纲。\n第四、根据内容大纲，生成对应的 PPT 列表页，每一页 PPT 列表页使用=====列表=====开头。\n第五、封面页格式如下：\n=====封面=====\n# 主标题\n## 副标题\n演讲人：我的名字\n第六、目录页格式如下：\n=====目录=====\n# 目录\n## CONTENT\n1、内容\n2、内容\n第七、列表页格式如下：\n=====列表=====\n# 页面主标题\n1、要点 1\n要点描述内容\n第八、列表页里的要点描述内容是对要点的详细描述，10 个字以上，50 个字以内。\n\n\n最后，一定要使用代码块回复你生成的内容，切记切记。",
  "remark_en": "(Only Chinese) Let AI generate a topic outline and then put it into the specified Markdown format. The quality of PPT (slide) is for reference only. Contributed by @Asynchro-Epool.",
  "website": null,
  "tags": [
    "contribute"
  ],
  "id": 187,
  "weight": 1604
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
