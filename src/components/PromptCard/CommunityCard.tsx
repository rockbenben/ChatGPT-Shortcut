import React, { useContext, useCallback } from "react";
import { Tooltip, Button, Typography, Flex } from "antd";
import { gold } from "@ant-design/colors";
import { BasePromptCard } from "./Base";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import { useCopyToClipboard } from "@site/src/hooks/useCopyToClipboard";
import { CheckOutlined, CopyOutlined, StarOutlined, StarFilled, UserOutlined, DownOutlined, LinkOutlined, UpOutlined } from "@ant-design/icons";
import { AuthContext } from "../AuthContext";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import styles from "./styles.module.css";

interface CommunityCardProps {
  data: any;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number, isComm: boolean) => void;
  onVote?: (id: number, action: "upvote" | "downvote") => void;
  onEdit?: (data: any) => void;
}

const CommunityCardComponent = ({ data: user, isFavorite, onToggleFavorite, onVote, onEdit, onOpenModal }: CommunityCardProps & { onOpenModal?: (data: any) => void }) => {
  const { userAuth } = useContext(AuthContext);
  const { copied, copyText } = useCopyToClipboard();

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      copyText(user.description);
    },
    [copyText, user.description]
  );

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleFavorite?.(user.id, true);
    },
    [onToggleFavorite, user.id]
  );

  const handleUpvote = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onVote?.(user.id, "upvote");
    },
    [onVote, user.id]
  );

  const handleDownvote = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onVote?.(user.id, "downvote");
    },
    [onVote, user.id]
  );

  const handleCardClick = useCallback(() => {
    onOpenModal?.({
      id: user.id,
      title: user.title,
      prompt: user.description,
      description: user.note,
      remark: user.remark,
      tags: user.tags,
      owner: user.owner,
      vote: user.upvoteDifference,
      copyCount: user.copyCount,
    });
  }, [onOpenModal, user]);

  return (
    <BasePromptCard
      title={
        <Flex justify="space-between" align="start" style={{ width: "100%" }}>
          <Typography.Title level={5} style={{ margin: 0, fontSize: "1rem", flex: 1, marginRight: 8 }} ellipsis={{ rows: 2 }}>
            <Link href={`/community-prompt?id=${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
              {user.title}
            </Link>
          </Typography.Title>
        </Flex>
      }
      titleExtra={
        <Typography.Text type="secondary" style={{ fontSize: "12px", display: "flex", alignItems: "center", maxWidth: 75 }} ellipsis={{ tooltip: true }}>
          <UserOutlined style={{ marginRight: 4 }} />
          {user.owner}
        </Typography.Text>
      }
      actions={[
        <Tooltip title={<Translate id="action.copy">复制</Translate>}>
          <Button type="text" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopy} block />
        </Tooltip>,
        userAuth && onToggleFavorite && (
          <Tooltip title={isFavorite ? <Translate id="action.removeFavorite">点击移除收藏</Translate> : <Translate id="common.favorites">收藏</Translate>}>
            <Button type="text" icon={isFavorite ? <StarFilled style={{ color: gold[5] }} /> : <StarOutlined />} onClick={handleToggleFavorite} block />
          </Tooltip>
        ),
        onVote && (
          <Tooltip title={<Translate id="action.upvote">赞</Translate>}>
            <Button type="text" icon={<UpOutlined />} onClick={handleUpvote} block>
              {user.upvotes || 0}
            </Button>
          </Tooltip>
        ),
        onVote && (
          <Tooltip title={<Translate id="action.downvote">踩</Translate>}>
            <Button type="text" icon={<DownOutlined />} onClick={handleDownvote} block>
              {user.downvotes || 0}
            </Button>
          </Tooltip>
        ),
      ].filter(Boolean)}
      onCardClick={handleCardClick}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <PromptRemark remark={user.remark} />
        <Typography.Paragraph ellipsis={{ rows: 5 }} style={{ flex: 1, marginBottom: 0, color: "var(--ifm-color-emphasis-600)" }}>
          {user.description}
        </Typography.Paragraph>
        <Flex justify="space-between" align="center">
          <div style={{ flex: 1, overflow: "hidden" }}>
            <PromptCardTag tags={user.tags} />
          </div>
          {user.website && (
            <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
              <LinkOutlined style={{ fontSize: 14, color: "var(--ifm-color-emphasis-500)" }} />
            </a>
          )}
        </Flex>
      </div>
    </BasePromptCard>
  );
};

export const CommunityCard = React.memo(CommunityCardComponent);
