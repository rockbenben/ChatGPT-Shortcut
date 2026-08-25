import React, { useCallback } from "react";
import { Typography, Flex } from "antd";
import { BasePromptCard, ClampBox, PromptSourceLink } from "./Base";
import { translate } from "@docusaurus/Translate";
import { IconAction } from "@site/src/components/IconAction";
import Link from "@docusaurus/Link";
import { CopyButton } from "@site/src/components/CopyButton";
import { HeartOutlined, HeartFilled, UserOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import type { CommunityPrompt } from "@site/src/utils/snapshotPrime";
import styles from "./styles.module.css";

interface CommunityCardProps {
  data: CommunityPrompt;
  isFavorite?: boolean;
  isLoggedIn?: boolean;
  onToggleFavorite?: (id: number, isComm: boolean) => void;
  onVote?: (id: number, action: "upvote" | "downvote") => void;
}

const CommunityCardComponent = ({ data: user, isFavorite, isLoggedIn, onToggleFavorite, onVote, onOpenModal }: CommunityCardProps & { onOpenModal?: (data: any) => void }) => {
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
      description: user.notes,
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
        <Typography.Title level={5} style={{ margin: 0, fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.4 }} ellipsis={{ rows: 2 }}>
          <Link href={`/community-prompt?id=${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
            {user.title}
          </Link>
        </Typography.Title>
      }
      titleExtra={
        <Typography.Text style={{ fontSize: 11, color: "var(--site-color-text-tertiary)", display: "flex", alignItems: "center", maxWidth: 75 }} ellipsis={{ tooltip: true }}>
          <UserOutlined style={{ marginInlineEnd: 4 }} />
          {user.owner}
        </Typography.Text>
      }
      actions={[
        <CopyButton key="copy" text={user.description} variant="iconOnly" block />,
        isLoggedIn && onToggleFavorite && (
          <IconAction
            key="fav"
            label={isFavorite ? translate({ id: "action.removeFavorite", message: "从收藏中移除" }) : translate({ id: "common.favorites", message: "收藏" })}
            icon={isFavorite ? <HeartFilled style={{ color: "var(--site-color-svg-icon-favorite)" }} /> : <HeartOutlined />}
            onClick={handleToggleFavorite}
            block
          />
        ),
        onVote && (
          <IconAction key="up" label={translate({ id: "action.upvote", message: "赞" })} icon={<UpOutlined />} onClick={handleUpvote} block>
            <span style={{ fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" }}>{user.upvotes || 0}</span>
          </IconAction>
        ),
        // 非对称：downvotes === 0 时 icon-only + 弱化（opacity 0.6），> 0 时显示数字与 ▲ 对称
        onVote && (
          <IconAction
            key="down"
            label={translate({ id: "action.downvote", message: "踩" })}
            icon={<DownOutlined />}
            onClick={handleDownvote}
            block
            className={(user.downvotes ?? 0) > 0 ? undefined : styles.cardVoteIconOnly}>
            {(user.downvotes ?? 0) > 0 && <span style={{ fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" }}>{user.downvotes}</span>}
          </IconAction>
        ),
      ].filter(Boolean)}
      onCardClick={handleCardClick}>
      <PromptRemark remark={user.remark} />
      <ClampBox>
        <Typography.Paragraph ellipsis={{ rows: 5 }} style={{ marginBottom: 0, color: "var(--ifm-color-content-secondary)", fontSize: 13, lineHeight: 1.55 }}>
          {user.description}
        </Typography.Paragraph>
      </ClampBox>
      <Flex justify="space-between" align="center">
        <div style={{ flex: 1, overflow: "hidden" }}>
          <PromptCardTag tags={user.tags} />
        </div>
        <PromptSourceLink href={user.website} />
      </Flex>
    </BasePromptCard>
  );
};

export const CommunityCard = React.memo(CommunityCardComponent);
