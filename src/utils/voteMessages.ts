/**
 * 投票提示文案 —— 首页、社区列表页、社区详情页三处共用。
 *
 * 这些消息按方向拆成独立完整句（而非用 {action} 占位符拼动词）：
 * 屈折/黏着语系里拼装动词会产出语法破碎的句子，例如
 * tr "olumlu oy verdiniz başarısız" / de "befürwortet fehlgeschlagen"。
 * 用词一律对齐各 locale 既有的 action.upvote / action.downvote（like/dislike），
 * 避免按钮写 Like、提示却写 Upvoted 的术语断裂。
 *
 * translate() 的调用必须保持字面量形态，Docusaurus 的文案提取才能扫到（.ts 文件同样被扫描）。
 */
import { translate } from "@docusaurus/Translate";

export type VoteAction = "upvote" | "downvote";

export const voteLoginRequiredText = () => translate({ id: "vote.loginRequired", message: "请先登录后再投票" });

export const voteAlreadyVotedText = (action: VoteAction) =>
  action === "upvote"
    ? translate({ id: "vote.upvote.alreadyVoted", message: "本次会话中你已赞过该提示词" })
    : translate({ id: "vote.downvote.alreadyVoted", message: "本次会话中你已踩过该提示词" });

export const voteSuccessText = (action: VoteAction) =>
  action === "upvote" ? translate({ id: "vote.upvote.success", message: "已赞！" }) : translate({ id: "vote.downvote.success", message: "已踩！" });

export const voteFailedText = (action: VoteAction) =>
  action === "upvote" ? translate({ id: "vote.upvote.failed", message: "点赞失败，请重试" }) : translate({ id: "vote.downvote.failed", message: "点踩失败，请重试" });
