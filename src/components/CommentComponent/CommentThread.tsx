import React from "react";
import Translate from "@docusaurus/Translate";
import { Button } from "antd";
import BoringAvatar from "boring-avatars";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentComponent from "@site/src/components/CommentComponent";

dayjs.extend(relativeTime);

// 项目家族化头像调色板 — 同饱和度 / 同明度，仅 hue 旋转。
// 头像多色是身份语义（区分用户），允许多色；但家族锚点必须跟品牌主 hue 走：
// 家族锚点跟品牌主 hue 走：teal-ink 海沉绿 163°
const avatarColors = [
  "hsl(163, 38%, 45%)", // teal（品牌锚点）
  "hsl(104, 38%, 45%)", // green
  "hsl(44, 42%, 50%)", // muted gold
  "hsl(194, 32%, 45%)", // cyan
  "hsl(214, 26%, 52%)", // muted blue
  "hsl(14, 36%, 52%)", // muted clay
];

interface CommentThreadProps {
  comment: any;
  logoUrl: string;
  replyingTo: number | null;
  onReply: (commentId: number) => void;
  /** 当前回复对象的编辑器节点（全局只有一个 replyingTo，由父组件构建一次） */
  replyFormNode: React.ReactNode;
}

/** 单条评论 + 递归子回复的展示 */
const CommentThread: React.FC<CommentThreadProps> = ({ comment, logoUrl, replyingTo, onReply, replyFormNode }) => (
  <CommentComponent
    actions={[
      <Button key="comment-basic-reply-to" type="text" size="small" onClick={() => onReply(comment.id)}>
        <Translate id="action.reply">回复</Translate>
      </Button>,
    ]}
    author={comment.author?.name}
    avatar={
      comment.author?.name ? (
        <BoringAvatar size={40} name={comment.author.name} variant="beam" colors={avatarColors} />
      ) : (
        // 官方账号回复用站点 logo 作头像（身份最强标识），替代随机 BoringAvatar
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(var(--ifm-color-primary-rgb), 0.08)",
            border: "1px solid var(--site-color-hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <img src={logoUrl} width={26} height={26} alt="AI Short" />
        </div>
      )
    }
    content={<ReactMarkdown>{comment.content}</ReactMarkdown>}
    datetime={dayjs(comment.createdAt).fromNow()}>
    {replyingTo === comment.id && replyFormNode}
    {comment.children &&
      comment.children.map((childComment: any) => (
        <CommentThread key={childComment.id} comment={childComment} logoUrl={logoUrl} replyingTo={replyingTo} onReply={onReply} replyFormNode={replyFormNode} />
      ))}
  </CommentComponent>
);

export default CommentThread;
