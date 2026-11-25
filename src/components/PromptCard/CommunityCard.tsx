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
    [onToggleFavorite, user.id],
  );

  const handleUpvote = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onVote?.(user.id, "upvote");
    },
    [onVote, user.id],
  );

  const handleDownvote = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onVote?.(user.id, "downvote");
    },
    [onVote, user.id],
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

  const hasRemark = Boolean(user.remark?.trim());
  const promptRows = hasRemark ? 3 : 4;

  return (
    <BasePromptCard
      title={
        <Typography.Title level={3} style={{ margin: 0, fontSize: 15.5, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.4 }} ellipsis={{ rows: 2 }}>
          <Link href={`/community-prompt?id=${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
            {user.title}
          </Link>
        </Typography.Title>
      }
      titleExtra={
        <span style={{ fontSize: 11, color: "var(--site-color-text-tertiary)", display: "inline-flex", alignItems: "center", gap: 4, maxWidth: 96, minWidth: 0 }}>
          <UserOutlined style={{ flexShrink: 0 }} />
          <Typography.Text style={{ fontSize: "inherit", color: "inherit", minWidth: 0 }} ellipsis={{ tooltip: true }}>
            {user.owner}
          </Typography.Text>
        </span>
      }
      footer={
        <>
          <Flex align="center" gap={4} style={{ minWidth: 0 }}>
            {onVote && (
              <>
                <IconAction size="small" label={translate({ id: "action.upvote", message: "赞" })} icon={<UpOutlined />} onClick={handleUpvote}>
                  <span style={{ fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 12 }}>{user.upvotes || 0}</span>
                </IconAction>
                <IconAction
                  size="small"
                  label={translate({ id: "action.downvote", message: "踩" })}
                  icon={<DownOutlined />}
                  onClick={handleDownvote}
                  className={(user.downvotes ?? 0) > 0 ? undefined : styles.cardVoteIconOnly}>
                  {(user.downvotes ?? 0) > 0 && (
                    <span style={{ fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 12 }}>{user.downvotes}</span>
                  )}
                </IconAction>
              </>
            )}
          </Flex>
          <Flex align="center" gap={4} style={{ flexShrink: 0 }}>
            {isLoggedIn && onToggleFavorite && (
              <IconAction
                size="small"
                label={isFavorite ? translate({ id: "action.removeFavorite", message: "从收藏中移除" }) : translate({ id: "common.favorites", message: "收藏" })}
                icon={isFavorite ? <HeartFilled style={{ color: "var(--site-color-svg-icon-favorite)" }} /> : <HeartOutlined />}
                onClick={handleToggleFavorite}
              />
            )}
            <CopyButton text={user.description} variant="iconOnly" size="small" />
          </Flex>
        </>
      }
      onCardClick={handleCardClick}>
      <PromptRemark remark={user.remark} />
      <div className={hasRemark ? styles.promptBodyAfterRemark : undefined}>
        <ClampBox>
          <Typography.Paragraph
            ellipsis={{ rows: promptRows }}
            style={{
              marginBottom: 0,
              color: hasRemark ? "var(--site-color-text-tertiary)" : "var(--ifm-color-content-secondary)",
              fontSize: hasRemark ? 12.5 : 13,
              lineHeight: hasRemark ? 1.68 : 1.7,
            }}>
            {user.description}
          </Typography.Paragraph>
        </ClampBox>
      </div>
      {(Boolean(user.tags?.length) || user.website) && (
        <Flex justify="space-between" align="center" gap={8} style={{ marginTop: "auto" }}>
          <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
            {user.tags && <PromptCardTag tags={user.tags} maxVisible={2} />}
          </div>
          <PromptSourceLink href={user.website} />
        </Flex>
      )}
    </BasePromptCard>
  );
};

export const CommunityCard = React.memo(CommunityCardComponent);
