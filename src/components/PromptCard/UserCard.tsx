import React, { useCallback, ReactNode } from "react";
import { Typography, Flex, Statistic, Tooltip } from "antd";
import { BasePromptCard, ClampBox, PromptSourceLink } from "./Base";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { IconAction } from "@site/src/components/IconAction";
import { CopyButton } from "@site/src/components/CopyButton";
import { EditOutlined, DeleteOutlined, HolderOutlined, LikeFilled, LockOutlined } from "@ant-design/icons";
import type { SortableCardProps } from "./types";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import { formatCompactNumber } from "@site/src/utils/formatters";
import type { CommunityPrompt } from "@site/src/utils/snapshotPrime";
import styles from "./styles.module.css";

interface UserCardProps {
  data: CommunityPrompt;
  sortable?: SortableCardProps;
  onEdit?: (data: CommunityPrompt) => void;
  onDelete?: (id: number) => void;
  onOpenModal?: (data: any) => void;
  extraActions?: ReactNode;
}

const PRIVATE_LABEL = translate({ id: "label.shareStatePrivate", message: "仅自己可见" });

const UserCardComponent = ({ data: user, sortable, onEdit, onDelete, onOpenModal, extraActions }: UserCardProps) => {
  const handleEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit?.(user);
    },
    [onEdit, user],
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete?.(user.id);
    },
    [onDelete, user.id],
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
      share: user.share,
    });
  }, [onOpenModal, user]);

  const hasRemark = Boolean(user.remark?.trim());
  const promptRows = hasRemark ? 3 : 4;

  return (
    <BasePromptCard
      ref={sortable?.setNodeRef}
      style={{ height: "100%", ...sortable?.style }}
      {...sortable?.attributes}
      title={
        <Flex align="start" style={{ overflow: "hidden" }}>
          {sortable && (
            <div {...sortable.listeners} className={styles.dragHandle} onClick={(e) => e.stopPropagation()}>
              <HolderOutlined />
            </div>
          )}
          <ClampBox>
            <Typography.Title level={3} style={{ margin: 0, fontSize: 15.5, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.4 }} ellipsis={{ rows: 2 }}>
              {user.share ? (
                <Link href={`/community-prompt?id=${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
                  {user.title}
                </Link>
              ) : (
                <span className={styles.showcaseCardLink}>{user.title}</span>
              )}
            </Typography.Title>
          </ClampBox>
        </Flex>
      }
      titleExtra={
        <>
          {!user.share && (
            <Tooltip title={PRIVATE_LABEL}>
              <LockOutlined aria-label={PRIVATE_LABEL} style={{ color: "var(--site-color-text-tertiary)" }} />
            </Tooltip>
          )}
          {user.upvoteDifference > 0 && (
            <Statistic
              value={user.upvoteDifference}
              formatter={(value) => formatCompactNumber(value as number)}
              prefix={<LikeFilled style={{ color: "var(--site-color-text-tertiary)" }} />}
              styles={{ content: { fontSize: 11, color: "var(--site-color-text-tertiary)", fontFamily: "var(--site-font-mono)", fontVariantNumeric: "tabular-nums" } }}
            />
          )}
        </>
      }
      footer={
        <>
          <Flex align="center" gap={4} style={{ minWidth: 0 }}>
            {onEdit && (
              <IconAction size="small" label={translate({ id: "action.edit", message: "编辑" })} icon={<EditOutlined />} onClick={handleEdit} />
            )}
            {onDelete && (
              <IconAction size="small" label={translate({ id: "action.delete", message: "删除" })} icon={<DeleteOutlined />} onClick={handleDelete} danger />
            )}
            {extraActions}
            <PromptSourceLink href={user.website} />
          </Flex>
          <CopyButton text={user.description} variant="iconOnly" size="small" />
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
      {Boolean(user.tags?.length) && (
        <div style={{ marginTop: "auto" }}>
          <PromptCardTag tags={user.tags} clickable={false} maxVisible={2} />
        </div>
      )}
    </BasePromptCard>
  );
};

export const UserCard = React.memo(UserCardComponent);
