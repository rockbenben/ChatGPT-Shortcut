import React, { useCallback, ReactNode } from "react";
import { Typography, Flex, Statistic } from "antd";
import { BasePromptCard, ClampBox, PromptSourceLink } from "./Base";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { IconAction } from "@site/src/components/IconAction";
import { CopyButton } from "@site/src/components/CopyButton";
import { EditOutlined, DeleteOutlined, HolderOutlined, LikeFilled, LockOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PromptRemark } from "./PromptRemark";
import { PromptCardTag } from "./PromptCardTag";
import { formatCompactNumber } from "@site/src/utils/formatters";
import type { CommunityPrompt } from "@site/src/utils/snapshotPrime";
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
        <Flex align="start" style={{ overflow: "hidden" }}>
          {!isFiltered && (
            <div {...listeners} style={{ cursor: "grab", marginInlineEnd: 8, display: "flex", alignItems: "center", flexShrink: 0, paddingTop: 6 }}>
              <HolderOutlined style={{ color: "var(--site-color-text-tertiary)" }} />
            </div>
          )}
          <ClampBox>
            <Typography.Title level={5} style={{ margin: 0, fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.4 }} ellipsis={{ rows: 2 }}>
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
          <IconAction key="edit" label={translate({ id: "action.edit", message: "编辑" })} icon={<EditOutlined />} onClick={handleEdit} block />
        ),
        onDelete && (
          <IconAction key="delete" label={translate({ id: "action.delete", message: "删除" })} icon={<DeleteOutlined />} onClick={handleDelete} danger block />
        ),
        extraActions && <React.Fragment key="extra">{extraActions}</React.Fragment>,
      ].filter(Boolean)}
      onCardClick={handleCardClick}>
      <PromptRemark remark={user.remark} />
      <ClampBox>
        <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 0, color: "var(--ifm-color-content-secondary)", fontSize: 13, lineHeight: 1.55 }}>
          {user.description}
        </Typography.Paragraph>
      </ClampBox>
      <Flex justify="space-between" align="center">
        <div style={{ flex: 1, overflow: "hidden" }}>
          <PromptCardTag tags={user.tags} clickable={false} />
        </div>
        <PromptSourceLink href={user.website} />
      </Flex>
    </BasePromptCard>
  );
};

export const UserCard = React.memo(UserCardComponent);
