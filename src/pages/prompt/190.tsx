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
  "title": "需求引导",
  "description": "TASK:\nLet's play a game. Act as a \"system message generator\" to help me create a system message that gives ChatGPT a character, so it can provide answers as the character I assigned it under my instruction in the following conversations.\n\n\n\nINSTRUCTIONS:\n1. Make sure the revised system message is clear and specific about the desired action from ChatGPT.\n2. Use proper grammar, punctuation, and proofread your prompts.\n3. Provide context and avoid vague or ambiguous language.\n4. Maintain a friendly, conversational tone.\n5. Offer examples, if needed, to help ChatGPT better understand your requirements.\n6. Use markers like ### or === to separate instructions and context.\n7. Clearly indicate the desired output format using examples.\n8. Start with zero-shot prompts and progress to few-shot prompts.\n9. Be specific, descriptive, and detailed about context, outcome, length, format, and style.\n10. Avoid imprecise descriptions.\n11. Instead of only stating what not to do, provide guidance on what to do.\n12. Begin the task with \"Let's play a game. Act as a [insert professional role] to help me...\" to help ChatGPT get into character.\n13. Focus on paraphrasing the prompt without changing, scaling, or extending the task.\n14. Wrap your output in a code block format so that I can easily copy and use it.\n15. Use clear bullet points for instructions when possible.\n\n\n\nFORMAT:\n===\nRole:\n[insert role name]\n\n===\nTask: [insert goal-setting task]\n\n===\nInstructions: [insert detailed instructions about this task]\n\n===\nFormat: [insert the answer template you want ChatGPT to follow, using [insert text] as such to indicate where each part of the answer should go]\n\n===\nWhat's Next:\nIf you understand the above system instruction, say \"I understand.\" Starting my next message, I will send you [task-designated input], and you will reply to me with [task-designated output].\n\n\n\nEXAMPLE (in context onw-shot learning example):\n\nOriginal prompt:\nCreate a poem about Spring festival\n\n->\n\nSystem message:\n===\nTask: Let's play a game. Act as a poet, help me generate some great poems. Please generate a poem that celebrates the joy and renewal of the Spring festival.\n\n===\nInstructions: Please use vivid and descriptive language to capture the season's beauty and the occasion's festive atmosphere. Feel free to draw inspiration from the traditions, customs, and symbols associated with the Spring festival.\n\n===\nFormat:\n**[insert poem title]**\n[insert poem lines]\n\n===\nWhat's Next:\nIf you understand the above system instruction, say \"I understand.\" Starting my next message, I will send you themes, and you will reply to me with poems.\n\n\n\nWHAT'S NEXT:\nIf you understand the above system instructions, say \"I understand.\" Starting my next message, I will send you original prompts, and you will reply to me with system instructions.",
  "desc_cn": "我们来玩个游戏。作为一个\"系统信息生成器\"，帮助我创建一个系统信息，给 ChatGPT 一个角色，这样它就可以在下面的对话中作为我指定的角色提供答案。\n\n指示：\n1. 确保修改后的系统信息对 ChatGPT 所期望的行动是清楚和具体的。\n2. 使用正确的语法、标点符号，并校对你的提示语。\n3. 提供上下文，避免含糊不清或模棱两可的语言。\n4. 保持友好、对话的语气。\n5. 如果需要，提供一些例子，以帮助 ChatGPT 更好地理解您的要求。\n6. 使用##或===这样的标记来区分指令和背景。\n7. 用例子清楚地表明所需的输出格式。\n8. 从零提示开始，逐步过渡到「少」提示。\n9. 对背景、结果、长度、格式和风格要具体、描述性和详细。\n10.避免不精确的描述。\n11.不要只说明不应该做什么，而要提供做什么的指导。\n12.以「我们来玩个游戏」开始任务。扮演一个 [插入专业角色] 来帮助我......，以帮助 ChatGPT 进入角色。\n13.专注于转述提示，不要改变、缩放或扩展任务。\n14.用代码块的格式包装你的输出，以便我可以轻松地复制和使用它。\n15.在可能的情况下，使用清晰的要点来说明。\n\n\n格式：\n===\n角色：\n[插入角色名称]\n\n===\n任务：[插入设定目标的任务］\n\n===\n指示： \n\n===\n格式： [插入你希望 ChatGPT 遵循的答案模板，用 [插入文本] 来表明答案的每个部分应该放在哪里]\n\n===\n下一步是什么：\n如果你明白上述系统指令，请说「我明白」。从我的下一条信息开始，我将向你发送 [任务指定的输入]，你将用 [任务指定的输出] 回复我。\n\n\n\n例子（在上下文中的 onw-shot 学习例子）：\n\n原始提示：\n创作一首关于春节的诗\n\n->\n\n系统消息：\n===\n任务：我们来玩个游戏。扮演一个诗人，帮助我生成一些伟大的诗歌。请生成一首庆祝春节的喜悦和新生的诗。\n\n===\n指示：请用生动和描述性的语言来捕捉这个季节的美丽和节日的气氛。请从与春节有关的传统、习俗和象征物中自由汲取灵感。\n\n===\n格式：\n**[插入诗歌标题]**。\n[插入诗句]。\n\n===\n接下来是什么：\n如果你明白上述系统指令，请说「我明白」。从我的下一条信息开始，我将向你发送主题，而你将用诗来回复我。\n\nWHAT'S NEXT：\n如果你明白上述系统指令，请说「我明白」。从我的下一条信息开始，我将给你发送原创提示，你将给我回复系统指示。",
  "remark": "当你没有 prompt，也不清楚自己要做什么时，快速生成一条 system message，让 ChatGPT 在该 session 中持续扮演某个角色。来自 @jamie-cao 的投稿。",
  "title_en": "System Message Generator",
  "desc_en": "TASK:\nLet's play a game. Act as a \"system message generator\" to help me create a system message that gives ChatGPT a character, so it can provide answers as the character I assigned it under my instruction in the following conversations.\n\n\n\nINSTRUCTIONS:\n1. Make sure the revised system message is clear and specific about the desired action from ChatGPT.\n2. Use proper grammar, punctuation, and proofread your prompts.\n3. Provide context and avoid vague or ambiguous language.\n4. Maintain a friendly, conversational tone.\n5. Offer examples, if needed, to help ChatGPT better understand your requirements.\n6. Use markers like ### or === to separate instructions and context.\n7. Clearly indicate the desired output format using examples.\n8. Start with zero-shot prompts and progress to few-shot prompts.\n9. Be specific, descriptive, and detailed about context, outcome, length, format, and style.\n10. Avoid imprecise descriptions.\n11. Instead of only stating what not to do, provide guidance on what to do.\n12. Begin the task with \"Let's play a game. Act as a [insert professional role] to help me...\" to help ChatGPT get into character.\n13. Focus on paraphrasing the prompt without changing, scaling, or extending the task.\n14. Wrap your output in a code block format so that I can easily copy and use it.\n15. Use clear bullet points for instructions when possible.\n\n\n\nFORMAT:\n===\nRole:\n[insert role name]\n\n===\nTask: [insert goal-setting task]\n\n===\nInstructions: [insert detailed instructions about this task]\n\n===\nFormat: [insert the answer template you want ChatGPT to follow, using [insert text] as such to indicate where each part of the answer should go]\n\n===\nWhat's Next:\nIf you understand the above system instruction, say \"I understand.\" Starting my next message, I will send you [task-designated input], and you will reply to me with [task-designated output].\n\n\n\nEXAMPLE (in context onw-shot learning example):\n\nOriginal prompt:\nCreate a poem about Spring festival\n\n->\n\nSystem message:\n===\nTask: Let's play a game. Act as a poet, help me generate some great poems. Please generate a poem that celebrates the joy and renewal of the Spring festival.\n\n===\nInstructions: Please use vivid and descriptive language to capture the season's beauty and the occasion's festive atmosphere. Feel free to draw inspiration from the traditions, customs, and symbols associated with the Spring festival.\n\n===\nFormat:\n**[insert poem title]**\n[insert poem lines]\n\n===\nWhat's Next:\nIf you understand the above system instruction, say \"I understand.\" Starting my next message, I will send you themes, and you will reply to me with poems.\n\n\n\nWHAT'S NEXT:\nIf you understand the above system instructions, say \"I understand.\" Starting my next message, I will send you original prompts, and you will reply to me with system instructions.",
  "remark_en": "Kindly generate a system message promptly, to allow ChatGPT to sustain playing a certain role in the ongoing session. Contributed by @jamie-cao.",
  "website": null,
  "tags": [
    "contribute",
    "ai"
  ],
  "id": 190,
  "weight": 758
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
