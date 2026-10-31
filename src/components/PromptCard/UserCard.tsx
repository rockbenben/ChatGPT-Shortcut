import React, { useCallback, ReactNode } from "react";
import { Typography, Flex, Statistic, Tooltip } from "antd";
import { BasePromptCard, ClampBox, PromptSourceLink } from "./Base";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { IconAction } from "@site/src/components/IconAction";
import { CopyButton } from "@site/src/components/CopyButton";
import { EditOutlined, DeleteOutlined, GlobalOutlined, HolderOutlined, LikeFilled, LockOutlined } from "@ant-design/icons";
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

// 文案提到模块作用域：translate() 每次都要查一遍构建期生成的词表再插值，
// 这两条每张卡片每次渲染都要用一次（列表几十张卡，投票/收藏各触发一次全量重渲）。
// 模块作用域是安全的：@generated/codeTranslations 是**按 locale 在构建期生成**的，
// 每个 locale 一份独立 bundle，切语言会换一整套模块，模块里的常量跟着重新求值。
const PUBLIC_LABEL = translate({ id: "label.shareStatePublic", message: "已公开：其他人可在社区页面浏览和收藏（点「编辑」可改为仅自己可见）" });
const PUBLIC_LABEL_NO_EDIT = translate({ id: "label.shareStatePublicNoEdit", message: "已公开：其他人可在社区页面浏览和收藏" });
const PRIVATE_LABEL = translate({ id: "label.shareStatePrivate", message: "仅自己可见" });

const UserCardComponent = ({ data: user, sortable, onEdit, onDelete, onOpenModal, extraActions }: UserCardProps) => {
  // 状态标识用陈述句，不用开关那句动作措辞（label.sharePrompt 归创建/编辑表单）：
  // 地球图标点不动，写成「分享到社区页面」会被当成一个分享按钮，用户点了没反应。
  // 探索/搜索视图复用本卡片但不接 onEdit（见下面 actions 的同名注释），那里根本没有
  // 「编辑」按钮可点，所以按 onEdit 分两条完整句 —— 不拼接，屈折语拼动词会出破碎句。
  const publicLabel = onEdit ? PUBLIC_LABEL : PUBLIC_LABEL_NO_EDIT;
  const privateLabel = PRIVATE_LABEL;

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
      ref={sortable?.setNodeRef}
      style={{ height: "100%", ...sortable?.style }}
      {...sortable?.attributes}
      title={
        <Flex align="start" style={{ overflow: "hidden" }}>
          {sortable && (
            <div {...sortable.listeners} style={{ cursor: "grab", marginInlineEnd: 8, display: "flex", alignItems: "center", flexShrink: 0, paddingTop: 6 }}>
              <HolderOutlined style={{ color: "var(--site-color-text-tertiary)" }} />
            </div>
          )}
          <ClampBox>
            <Typography.Title level={3} style={{ margin: 0, fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.4 }} ellipsis={{ rows: 2 }}>
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
          {user.share ? (
            <Tooltip title={publicLabel}>
              <GlobalOutlined aria-label={publicLabel} style={{ color: "var(--site-color-text-tertiary)" }} />
            </Tooltip>
          ) : (
            <Tooltip title={privateLabel}>
              <LockOutlined aria-label={privateLabel} style={{ color: "var(--site-color-text-tertiary)" }} />
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
