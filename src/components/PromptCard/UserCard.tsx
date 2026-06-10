import React, { useCallback, ReactNode } from "react";
import { Tooltip, Button, Typography, Flex, Statistic } from "antd";
import { BasePromptCard } from "./Base";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { CopyButton } from "@site/src/components/CopyButton";
import { EditOutlined, DeleteOutlined, HolderOutlined, LinkOutlined, LikeFilled, LockOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import { formatCompactNumber } from "@site/src/utils/formatters";
import type { CommunityPrompt } from "./types";
import styles from "./styles.module.css";

interface UserCardProps {
  data: CommunityPrompt;
  sortableId?: string | number;
  isFiltered?: boolean;
  onEdit?: (data: CommunityPrompt) => void;
  onDelete?: (id: number) => void;
  onOpenModal?: (data: any) => void;
  extraActions?: ReactNode;
}

const UserCardComponent = ({ data: user, sortableId, isFiltered, onEdit, onDelete, onOpenModal, extraActions }: UserCardProps) => {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sortableId ?? user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: "100%",
  };


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

  return (
    <BasePromptCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      title={
        <Flex justify="space-between" align="start" style={{ width: "100%" }}>
          <Flex align="start" style={{ flex: 1, minWidth: 0, marginRight: 8, overflow: "hidden" }}>
            {!isFiltered && (
              <div {...listeners} style={{ cursor: "grab", marginRight: 8, display: "flex", alignItems: "center", flexShrink: 0, paddingTop: 6 }}>
                <HolderOutlined style={{ color: "var(--site-color-text-tertiary)" }} />
              </div>
            )}
            <Typography.Title level={5} style={{ margin: 0, fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.4, flex: 1, minWidth: 0 }} ellipsis={{ rows: 2 }}>
              {user.share ? (
                <Link href={`/community-prompt?id=${user.id}`} className={styles.showcaseCardLink} onClick={(e) => e.stopPropagation()}>
                  {user.title}
                </Link>
              ) : (
                <span className={styles.showcaseCardLink}>{user.title}</span>
              )}
            </Typography.Title>
          </Flex>
        </Flex>
      }
      titleExtra={
        <>
          {!user.share && <LockOutlined style={{ color: "var(--site-color-text-tertiary)" }} />}
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
      actions={[
        <CopyButton key="copy" text={user.description} variant="iconOnly" block />,
        // 仅在传入 handler 时渲染编辑/删除：explore/搜索视图复用 UserCard 但不接 onEdit/onDelete，
        // 此时不应显示点击无反应的「编辑/删除」按钮（真正入口在 MySpace 收藏页）。
        onEdit && (
          <Tooltip key="edit" title={<Translate id="action.edit">编辑</Translate>}>
            <Button type="text" icon={<EditOutlined />} onClick={handleEdit} block />
          </Tooltip>
        ),
        onDelete && (
          <Tooltip key="delete" title={<Translate id="action.delete">删除</Translate>}>
            <Button type="text" danger icon={<DeleteOutlined />} onClick={handleDelete} block />
          </Tooltip>
        ),
        extraActions && <React.Fragment key="extra">{extraActions}</React.Fragment>,
      ].filter(Boolean)}
      onCardClick={handleCardClick}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <PromptRemark remark={user.remark} />
        <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 0, color: "var(--ifm-color-content-secondary)", fontSize: 13, lineHeight: 1.55 }}>
          {user.description}
        </Typography.Paragraph>
        <Flex justify="space-between" align="center">
          <div style={{ flex: 1, overflow: "hidden" }}>
            <PromptCardTag tags={user.tags} clickable={false} />
          </div>
          {user.website && (
            <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
              <LinkOutlined style={{ fontSize: 12, color: "var(--site-color-text-tertiary)" }} />
            </a>
          )}
        </Flex>
      </div>
    </BasePromptCard>
  );
};

export const UserCard = React.memo(UserCardComponent);
