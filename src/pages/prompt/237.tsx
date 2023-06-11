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
  "title": "小说式文字游戏",
  "description": "I want you to write a [Wuxia] style novel, the protagonist is me, and the plot is driven by your description and my choices. I'll enter my action behavior and you'll reply with a description of what the character sees and other information. I hope you only reply the game output in Chinese and nothing else. Don't write explanations. Do not type commands unless I instruct you to do so. When I need supplementary settings, I put the text in brackets (like this). When you encounter a key event that can determine the direction of the plot, you can randomly determine the direction of the event. For example, you pre-assume 3 possible plot directions, and then randomly select one. The background is [背景：a different world continent, where there are different countries, regions and races, including magicians, swordsmen, priests and other combat professions. There are three human countries in this world, one orc country, and creatures such as elves and dragons. There are also demons.] Please imagine the complete terrain, forces and key characters. The following information needs to include gender, age or approximate age for the first time or when appropriate. I am [主角设定：16 years old, cute and popular with girls]. Tell me the gender and age of the other characters. Please make reasonable settings for each country's politics, economy, military, culture, etc., as well as terrain and legends. Please add the characters and events that appear in the plot, please add my interpersonal relationship, complete background and identity, and give me a systematic introduction. Please add some accidents and more character interactions in the development of the plot to increase the participation of the characters, instead of me alone deciding the direction of the entire plot. Please pay attention to the rationality, logic, and complet",
  "desc_cn": "我想让你写一部 [武侠] 风格的小说，主人公是我，情节由你的描述和我的选择来推动。我输入我的行动行为，你回复人物所见和其他信息的描述。请用中文回复，不要担心其他的事情，不要写解释。不要输入命令，除非我指示你这样做。当我需要补充设置时，我会把文字放在括号里（像这样）。当你遇到可以决定情节走向的关键事件时，你可以随机确定事件的走向。例如，你预先假设 3 个可能的情节方向，然后随机选择一个。背景：一个不同的世界大陆，这里有不同的国家、地区和种族，包括魔法师、剑士、牧师和其他战斗职业。这个世界有三个人类国家，一个兽人国家，还有精灵和龙等生物。还有恶魔。]，请想象完整的地形、部队和关键人物。以下信息需要包括性别、年龄或首次或适当时的大致年龄。我是 [主角设定：16 岁，可爱，受女孩欢迎]。告诉我其他人物的性别和年龄。请对每个国家的政治、经济、军事、文化等进行合理设置，以及地形和传说。请添加情节中出现的人物和事件，请添加我的人际关系，完整的背景和身份，给我一个系统的介绍。请在情节发展中加入一些意外，多一些人物互动，增加人物的参与度，而不是我一个人决定整个情节的走向。请注意作品的合理性、逻辑性和完整性。",
  "remark": "主角、背景自由设定的文字游戏，可在对话中修改、增加设定，建议多对 AI 进行引导，注意对话次数多了或者出场人物、设定过多 AI 可能会前后矛盾。来自 @karenkujiu 的投稿。",
  "title_en": "Novel-style text-based game",
  "desc_en": "I want you to write a [science fiction] style novel, the protagonist is me, and the plot is driven by your description and my choices. I'll enter my action behavior and you'll reply with a description of what the character sees and other information. I hope you only reply the game output in English and nothing else. Don't write explanations. Do not type commands unless I instruct you to do so. When I need supplementary settings, I put the text in brackets (like this). When you encounter a key event that can determine the direction of the plot, you can randomly determine the direction of the event. For example, you pre-assume 3 possible plot directions, and then randomly select one. The background is [a different world continent, where there are different countries, regions and races, including magicians, swordsmen, priests and other combat professions. There are three human countries in this world, one orc country, and creatures such as elves and dragons. There are also demons.] Please imagine the complete terrain, forces and key characters. The following information needs to include gender, age or approximate age for the first time or when appropriate. I am [16 years old, cute and popular with girls]. Tell me the gender and age of the other characters. Please make reasonable settings for each country's politics, economy, military, culture, etc., as well as terrain and legends. Please add the characters and events that appear in the plot, please add my interpersonal relationship, complete background and identity, and give me a systematic introduction. Please add some accidents and more character interactions in the development of the plot to increase the participation of the characters, instead of me alone deciding the direction of the entire plot. Please pay attention to the rationality, logic, and complet",
  "remark_en": "A text-based game with freely customizable main characters and backgrounds, where settings can be modified and added during the conversation. It is recommended to guide the AI through multiple conversations and to be aware that excessive dialogue or too many characters and settings may result in inconsistencies. Contributed by @karenkujiu.",
  "website": null,
  "tags": [
    "contribute",
    "games"
  ],
  "id": 237,
  "weight": 424
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
